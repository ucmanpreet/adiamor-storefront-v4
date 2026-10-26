<template>
  <div data-tid="instant-bolt-checkout-button" id="page-checkout-wrapper" style="display:none;">
    <object :data="BOLT_CHECKOUT_OBJECT" />
  </div>
</template>
<script>
  import mixin from '~/mixin/sweetAlert.js';

  export default {
    name : "BoltPayment",
    props: ['cart_id'],
    async mounted() {
      this.BOLT_CHECKOUT_OBJECT = this.$config.public.boltCheckoutObj;
      if (this.cart_id) {
        await this.boltPayment()
      };
    },
    methods: {
      async getOrderToken() {
        try {
          const response = await this.$axios.post("/payment/bolt/order-token", {
            cart_id: this.cart_id
          });
          
          if (!response || !response?.data?.data.token) {
            mixin.methods.createSwalAlert(response?.data?.message || response?.data?.error || response?.message || "Error fetching order token", "error");
            console.log("Error fetching order token");
            return "";
          }
          return response?.data?.data.token;
        } catch (error) {
          $bus.emit("ModalCloseEvent");
          mixin.methods.createSwalAlert(error?.response?.data?.message || error?.message || error, "error");
          console.log("Error fetching order token");
          return;
        }
      },
      async boltPayment() {
        let $this = this;
        let addressObjStore = await this.$store.getters.getAddress;
        let shippingAddress = addressObjStore.order_shipping ?? addressObjStore.order_billing ?? {};
        let orderFecthedToken = await this.getOrderToken();
        if (orderFecthedToken) {
          var cart = {
            orderToken: orderFecthedToken
          };
          var hints = {
            prefill: {
              firstName: shippingAddress?.first_name ?? '',
              lastName: shippingAddress?.last_name ?? '',
              email: shippingAddress?.email ?? '',
              phone: shippingAddress?.phone ?? '',
              addressLine1: shippingAddress?.address1 ?? '',
              // addressLine2: "Unit D",
              city: shippingAddress?.city ?? '',
              state: shippingAddress?.state ?? '',
              zip: shippingAddress?.postcode ?? '',
              country: shippingAddress?.country ?? ''
              // ISO Alpha-2 format expected
            }
          };
          var callbacks = {
            check: function () {
              // This function is called just before the checkout form loads.
              // This is a hook to determine whether Bolt can proceed
              // with checkout at this point. This function MUST return a boolean.
              return true;
            },

            onEmailEnter: function (email) {
              // This function is called after the user enters their email address.
            },

            onShippingDetailsComplete: function (address) {
              // This function is called when the user proceeds to the shipping options page.
              // This is applicable only to multi-step checkout.
              // When available the first parameter will contain a user's name and address info.
            },

            onShippingOptionsComplete: function () {
              // This function is called when the user proceeds to the payment details page.
              // This is applicable only to multi-step checkout.
            },

            onPaymentSubmit: function () {
              // This function is called after the user clicks the pay button.
            },

            success: async function (transaction, callback) {
              try {
                if (transaction) {
                  // Card details
                  const card = transaction?.from_credit_card || {};

                  let transactionObject = {
                    transaction_id: transaction.reference,
                    authorization_id: transaction.id,
                    date: new Date(transaction.date),
                    amount: transaction.amount ? transaction.amount.amount : '',
                    payment_method: "bolt_payment",
                    card_last4: card?.last4 || null,
                    card_brand: card?.network || null,
                  };
                  // 2. Call the parent method directly and AWAIT the result.      
                  // This forces the Bolt modal to stay open until Bagisto confirms the order.      
                  // We use $parent because $nuxt.$emit is fire-and-forget (cannot be awaited).
                      
                  if ($this.$parent && typeof $this.$parent.txnSave === 'function') {                    
                    await $this.$parent.txnSave(transactionObject);
                  }
                  else {
                    // Fallback if parent linkage fails (rare)          
                    $bus.emit("paymentResponse", transactionObject);
                    // Add a small artificial delay to give the emit a fighting chance          
                    await new Promise(r => setTimeout(r, 2000));
                  }
                }
              }
              catch (error) {
                console.error("Critical Payment Error:", error);
                $this.$emit("boltModalClose"); 
                $bus.emit("ModalCloseEvent");
              }
              // 3. ONLY call callback() once the Order is safely created.  
              callback();
            },

            // success: function (transaction, callback) {

            //   try {
            //     if (transaction) {
            //       let transactionObject = {
            //         transaction_id: transaction.reference,
            //         authorization_id: transaction.id,
            //         date: new Date(transaction.date),
            //         amount: transaction.amount ? transaction.amount.amount : '',
            //         payment_method: "bolt_payment"
            //         // order_id : transaction.cart?.order_reference,
            //       }
            //       $bus.emit("paymentResponse", transactionObject);
            //     }
            //   } catch (error) {
            //     $this.$emit("boltModalClose");
            //     $bus.emit("ModalCloseEvent")
            //   }
            //   // This function is called when the Bolt checkout transaction is successful.
            //   // ... Add your code here ...
            //   // **IMPORTANT** callback must be executed at the end of this function

            //   callback();
            // },

            close: function () {
              $this.$emit("boltModalClose");
              $bus.emit("ModalCloseEvent");
              if ($this.$parent && typeof $this.$parent.close === 'function') {
                $this.$parent.close();
              }
              return;
            }
          };
          try {
            if (window || window.BoltCheckout) {
              let boltVar = window.BoltCheckout.configure(cart, hints, callbacks);
              await boltVar.open();
            } else {
              $bus.emit("ModalCloseEvent");
              console.log('Bolt config error');
              return;
            }
          } catch (error) {
            $this.$emit("boltModalClose");
            $bus.emit("ModalCloseEvent")
            console.log('Bolt config error', error);
          }
        } else {
          $bus.emit("ModalCloseEvent");
          console.log('Bolt config error');
          return;
        }
      }
    },
    data() {
      return {
        BOLT_CHECKOUT_OBJECT: null
      }
    }
  };
</script>
<style scoped>
  #page-checkout-wrapper {
    display: none !important;
    /* background-color: rgb(100 151 205); */
  }
</style>