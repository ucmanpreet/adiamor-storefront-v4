<template></template>
<script setup>
const props = defineProps({ id: String, amount: [Number, String], tax: [Number, String] });

const store = useMainStore();
const config = useRuntimeConfig().public;
const { $bus } = useNuxtApp();

useHead(() => {
  const scripts = [
    {
      key: "affirm-tag",
      src: config.affirmCdn,
      async: true,
      defer: false,
      id: "affirm-id"
    }
  ];
  scripts.forEach(script => {
    script["public_api_key"] = config.affirmPublicApiKey;
    script["locale"] = config.locale;
    script["country_code"] = config.affirmCountryCode;
  });
  return { script: scripts };
});

onMounted(async () => {
  if (props.id && props.amount) {
    affirmConfig();
  }
});

async function affirmConfig() {
  let addressData = await store.getAddress,
    orderData = await store.getCartItems,
    items = [];
  let cartItems = orderData;
  if (cartItems?.length) {
    cartItems?.forEach(element => {
    let finalUnitPrice = parseFloat(element.discounted_price ?? element.price);

    // Validation: if discounted_price is 0 or negative, use base price
    if (!finalUnitPrice || finalUnitPrice <= 0) {
    finalUnitPrice = parseFloat(element.price ?? 0);
    }

    // Convert to cents
    let priceInCents = toCents(finalUnitPrice);
      items.push({
        display_name: element.name,
        sku: element.sku,
        unit_price: priceInCents,
        qty: element.quantity ?? element.qty_ordered,
        // item_image_url: element.images ? element.images[0]?.path : "",
        // item_url: element.images ? element.images[0]?.url : ""
      });
    });
  }

  // Due to USA country some fields are kept static for now
  let visitor_code = await store.getVisitorCode;
  let checkoutConfig = {
    merchant: {
      user_confirmation_url: config.affirmUserConfirmationURL?.replace("review", 'thankyou'),
      user_cancel_url: `${(config.affirmUserCancelURL)}?visitor_code=${visitor_code}`,
      user_confirmation_url_action: "POST",
      use_vcn: false,
      name: config.affirmMerchantName,
      public_api_key: config.affirmPublicApiKey
    },
    shipping: {
      name: {
        first: addressData.order_shipping?.first_name,
        last: addressData.order_shipping?.last_name
      },
      address: {
        street1: addressData?.order_shipping?.address1,
        city: addressData?.order_shipping?.city,
        region1_code: addressData?.order_shipping?.state,
        postal_code: addressData?.order_shipping?.postcode,
        // country_code: config.affirmCountryCode
        country_code: addressData?.order_shipping?.country
      },
      phone_number: addressData?.order_shipping?.phone,
      email: addressData.order_shipping?.email
    },
    billing: {
      name: {
        first: addressData.order_billing?.first_name,
        last: addressData.order_billing?.last_name
      },
      address: {
        street1: addressData?.order_billing?.address1,
        city: addressData?.order_billing?.city,
        region1_code: addressData?.order_billing?.state,
        postal_code: addressData?.order_billing?.postcode,
        // country_code: config.affirmCountryCode
        country_code: addressData?.order_billing?.country
      },
      phone_number: addressData.order_billing?.phone,
      email: addressData.order_billing?.email
    },
    items,
    metadata: {
      shipping_type: "UPS Ground",
      mode: "modal"
    },
    order_id: props.id,
    currency: config.currency,
    total: toCents(parseFloat(props.amount)),
    // financing_program: "flyus_3z6r12r",
    // shipping_amount: 2,        
    tax_amount: toCents(parseFloat(props.tax)),
    // discounts: {
    //   RETURN5: {
    //     discount_amount: 2,
    //     discount_display_name: "Returning customer 2% discount"
    //   },
    //   PRESDAY10: {
    //     discount_amount: 2,
    //     discount_display_name: "President's Day 2% off"
    //   }
    // },
  };
  if (window.affirm) {
    let config = window.affirm.checkout(checkoutConfig);

    window.affirm.checkout.open({
      onFail: (error) => {
        console.log(error,'While checking affirm modal');
        
        // Error handling
        $bus.emit("ModalCloseEvent");
      },
      onSuccess: (checkout) => {
        // Success procedures
        $bus.emit("applyLoader");
        $fetch(`${config.baseUrl}affirm_authorize`, {
          method: 'POST',
          body: { checkout_token: checkout.checkout_token }
        })
          .then(response => {
            let transaction = response.data;

            try {
              if (transaction) {
                let transactionObject = {
                  // transaction_id : transaction.events[0].transaction_id,
                  transaction_id: transaction.id,
                  authorization_id: transaction.events[0]?.transaction_id ?? '',
                  date: transaction.created,
                  amount: transaction.events[0]?.amount ?? '',
                  custom_order_id: transaction.order_id,
                  payment_method: "affirm_payment"
                }
                $bus.emit("paymentResponse", transactionObject);
              }
            } catch (error) {
              $bus.emit("ModalCloseEvent")
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      onOpen: (token) => {
        // Initialization successful
        console.log(token,'While checking affirm modal');
        
      },
      onValidationError: (checkout_validation_error) => {
        console.log(checkout_validation_error,'While checking affirm modal');
        
        // Validation error handling
        $bus.emit("ModalCloseEvent");
      }
    });
  }
}

function toCents(aValue) {
  // As per Affirm Dashboard
  if (!aValue) return 0;
  const clean = Number(
    String(aValue).replace(/[^0-9.-]+/g, '')
  );
  return Math.round((clean + Number.EPSILON) * 100);
}
</script>