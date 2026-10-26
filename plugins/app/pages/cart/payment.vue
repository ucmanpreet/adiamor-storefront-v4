<template>
  <div class="bg-gray-50">

    <!-- <ProgressStep /> -->
     <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-65 group-light" :class="loader || payLoader ? '' : 'hidden'"
      role="status"
      aria-live="polite"
      aria-label="Loading payment information"
      :aria-hidden="(loader || payLoader) ? 'false' : 'true'"
     >
        <CustomLoader />
    </div>
    <section class="max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 overflow-auto"
      aria-labelledby="payment-heading"
    > <!--v-show="!loader"-->
      <h1 id="payment-heading" class="sr-only">Choose Payment Method</h1>

      <form class="lg:flex space-y-4 sm:space-y-0 gap-y-4 gap-x-16 xl:gap-x-20 h-full justify-between" @submit.prevent="submitForm()">
        <div class="overflow-auto flex-1 min-w-0 space-y-3">

          <div>
            <div class="flex items-start gap-3">
              <Icon name="shield-check" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div class="flex flex-col">
                <h2 class="text-lg font-semibold text-gray-900 leading-tight uppercase">Choose Payment Method</h2>
                <p class="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Icon name="lock" class="h-3.5 w-3.5 text-custom-green flex-shrink-0" aria-hidden="true" />
                  All transactions are secured and encrypted
                </p>
              </div>
            </div>
          </div>

          <fieldset class="space-y-4">
            <legend class="sr-only hidden sm:block">Available payment methods</legend>
            <p id="payment-method-hint" class="sr-only hidden sm:block">Use the arrow keys to navigate between payment options.</p>

            <!-- Credit Card (Bolt) -->
            <div
              class="rounded-xl border bg-white transition-all duration-200 overflow-hidden"
              :class="selectedPaymentMethod === 'bolt_payment' ? 'border-primary shadow-md border-2' : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow'"
            >
              <label for="bolt_payment" class="flex items-center gap-3 text-sm cursor-pointer px-5 py-4">
                <input type="radio"
                  class="appearance-none h-[18px] w-[18px] shrink-0 rounded-full border-2 border-gray-300 bg-white cursor-pointer transition-all duration-150 checked:bg-primary checked:border-primary checked:ring-[3px] checked:ring-white checked:ring-inset focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  id="bolt_payment" name="paymentMethod" v-model="selectedPaymentMethod" value="bolt_payment"
                  v-on:change="storePaymentMethod()" v-validate="'required'"
                  aria-describedby="payment-method-hint payment-error"
                />
                <span class="flex-1 text-sm font-medium text-gray-900">Credit Card</span>
                <!-- Logo images are decorative — payment name already identifies the option -->
                <div class="flex items-center gap-2 flex-shrink-0" aria-hidden="true">
                  <img src="~/assets/images/services/visa_icon.webp" alt="" class="h-6 w-auto object-contain" />
                  <img src="~/assets/images/services/mastercard_icon.webp" alt="" class="h-6 w-auto object-contain" />
                  <img src="~/assets/images/services/amex_icon.webp" alt="" class="h-6 w-auto object-contain" />
                  <img src="~/assets/images/services/discover_icon.webp" alt="" class="h-6 w-auto object-contain" />
                </div>
              </label>

              <!-- Expanded Bolt info — aria-live so NVDA announces it on selection -->
              <div
                class="flex justify-between gap-3 text-xs border-t border-primary/10 bg-blue-50/40 px-5 py-3"
                v-if="selectedPaymentMethod == 'bolt_payment'"
                aria-live="polite"
                aria-atomic="true"
              >
                <p class="text-gray-600 leading-relaxed flex items-center gap-1.5">
                  <Icon name="lock" class="h-3.5 w-3.5 text-custom-green flex-shrink-0" aria-hidden="true" />
                  Secure checkout protected by Bolt, an industry-leading fraud prevention platform.
                  <Tooltip :text="'Bolt is a secure checkout and fraud prevention platform used by leading online retailers to help protect your payment information.'" className="hidden sm:inline-flex underline" :ariaDescribedby="`tooltip-bolt`" customClass="w-40">
                    Bolt.
                  </Tooltip>
                </p>
              </div>
            </div>

            <!-- Dynamic Payment Methods  -->
            <div
              class="rounded-xl border bg-white transition-all duration-200 overflow-hidden flex flex-col gap-0 text-sm"
              :class="selectedPaymentMethod === item.idKey ? 'border-primary shadow-md border-2' : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow'"
              v-for="item in paymentMethods" :key="item.idKey"
            >
              <label
                :for="item.idKey"
                class="flex gap-3 items-center cursor-pointer px-5 py-4"
                :class="{
                  '!py-2.5': item.idKey === 'split_payment',
                  '!py-2' : item.idKey === 'paypal_standard'
                }"
                v-if="item.idKey === 'affirm_payment' ? !isAffirmDisabled : true"
              >
              <!-- 'opacity-50 cursor-not-allowed': item.idKey === 'affirm_payment' && isAffirmDisabled, -->
                <input
                  type="radio"
                  class="appearance-none h-[18px] w-[18px] shrink-0 rounded-full border-2 border-gray-300 bg-white cursor-pointer transition-all duration-150 checked:bg-primary checked:border-primary checked:ring-[3px] checked:ring-white checked:ring-inset focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  :id="item.idKey"
                  name="paymentMethod"
                  v-model="selectedPaymentMethod"
                  v-bind:value="item.idKey"
                  v-on:change="storePaymentMethod()"
                  v-validate="'required'"
                />
                <span class="text-sm font-medium text-gray-900 flex-1">
                  {{ item.name }}
                  <template v-if="item.idKey == 'wire_payment'">
                    &mdash; 
                    <span class="text-custom-green font-semibold">
                      Save {{ order_summary ? order_summary.wire_discount_amount : '' }}{{ order_summary ? (order_summary.wire_action_type == 'by_percent' ? '%' : '') : '' }} {{ getWireAmount() }}
                    </span>
                  </template>
                </span>
                <!-- Logos are decorative — aria-hidden so NVDA skips them -->
                <div class="ml-auto flex items-center gap-2 flex-shrink-0" v-if="item.logos && item.logos.length" aria-hidden="true">
                  <template v-for="logo in item.logos">
                    <Icon v-if="logo.icon" :key="logo.alt" :name="logo.icon" :class="item.idKey === 'split_payment' ? 'h-8 w-8 text-gray-500' : 'h-5 w-5 text-gray-500'" />
                    <img v-else :key="logo.alt + '_img'" :src="logo.src" alt="" class="w-auto object-contain" :class="logo.alt == 'PayPal' ? 'h-9' : 'h-5'" />
                  </template>
                </div>
              </label>

              <!-- Expanded info panels — aria-live so NVDA announces content when payment is selected -->
              <!-- Wire info -->
               <template  v-if="item.idKey == 'wire_payment' && selectedPaymentMethod == 'wire_payment'">
                  <!-- <p class="text-sm px-5 py-4 text-gray-600 leading-relaxed font-normal border-t border-green-100 bg-green-50/60 lg:pr-20"
                    aria-live="polite" aria-atomic="true">
                    A {{ `${order_summary ? order_summary.wire_discount_amount : 0}${order_summary ? order_summary.wire_action_type == 'by_percent' ? '%' : '' : ''}` }} bank-wire discount will be applied to your order. After you place your order with Wire Transfer selected, we will email instructions for completing payment.
                  </p> -->
                <div class="px-5 py-3">
                  <p class="text-sm text-gray-700 italic">
                    Wire instructions will be emailed after your order is placed.
                  </p>
                </div>
              </template>

              <!-- Split info -->
              <p class="text-sm px-5 py-4 text-gray-600 leading-relaxed font-normal border-t border-primary/10 bg-blue-50/30 lg:pr-20"
                v-if="item.idKey == 'split_payment' && selectedPaymentMethod == 'split_payment'"
                aria-live="polite" aria-atomic="true">
                Need to split your purchase across multiple payment methods? This option allows you to combine credit cards, wire transfer, and other accepted payment methods. After completing your order, one of our customer service representatives will contact you to finalize payment by phone. Availability is subject to confirmation until payment has been completed.
                Questions? Call us toll free at <strong class="font-semibold text-gray-900">877-627-5094</strong> and reference your cart code: <strong class="font-semibold text-gray-900">{{ visitor_code }}</strong>.
              </p>

              <!-- Affirm -->
               <template v-if="item.idKey === 'affirm_payment' && isAffirmSelected">
                <div class="text-sm px-5 py-4 text-gray-600 leading-relaxed font-normal border-t border-primary/10 bg-blue-50/30"
                  aria-live="polite" aria-atomic="true">
                  <img src="https://cdn-assets.affirm.com/images/buttons/42x205-blue.svg"
                    alt="" class="mb-3" aria-hidden="true">
                  We have partnered with Affirm to give you a simple way to make your purchase with no hidden fees.
                </div>
                
                <!-- Affirm Disabled Notice -->
                <div
                  v-if="showAffirmInfo"
                  class="px-5 py-3"
                  role="alert"
                >
                  <p class="text-sm">Affirm is not available for purchases over $30,000. If you wish to pay with Affirm, please select "Split Pay / Phone Order" and discuss payment options with a customer service representative.</p>
                </div>
              </template>
              <!-- PayPal -->
              <div class="text-sm px-5 py-4 font-normal text-gray-600 leading-relaxed border-t border-primary/10 bg-blue-50/30"
                v-if="item.idKey == 'paypal_standard' && selectedPaymentMethod == 'paypal_standard'"
                aria-live="polite" aria-atomic="true">
                You’ll be redirected to PayPal to sign in or create an account and complete your payment.
              </div>

            </div>

            <!-- Error -->
            <span
              v-if="showAffirmInfo"
              id="affirm-disabled-msg"
              class="sr-only"
              aria-hidden="true"
            >
              Affirm is not available for purchases over $30,000. If you wish to pay with Affirm, please select "Split Pay / Phone Order" and discuss payment options with a customer service representative.
            </span>

            <div id="payment-error" class="space-y-2 mt-3" aria-live="assertive" aria-atomic="true">
              <small v-show="submitted || orderError" class="error !mt-0" role="alert">{{ errors?.first('paymentMethod') || orderError }}</small>
            </div>

          </fieldset>
        </div>

        <!-- Order summary -->
        <aside class="lg:max-w-[424px] w-full flex-none space-y-5"
          aria-labelledby="order-summary-heading"
        >
          <!-- Header — mirrors left-side heading style -->
          <div>
            <div class="flex items-start gap-3">
              <Icon name="clipboard" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div class="flex flex-col">
                <h2 class="text-lg font-semibold text-gray-900 leading-tight uppercase" id="order-summary-heading">Order Summary</h2>
                <p class="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Icon name="check-circle-fill" class="h-3.5 w-3.5 text-custom-green flex-shrink-0" aria-hidden="true" />
                  Review your items before checkout
                </p>
              </div>
            </div>
          </div>

          <div class="border border-gray-200 rounded-xl shadow-sm bg-white px-4 overflow-hidden">
            <OrderSummary
              :orderData="{ currentTab: 'payment' }"
              v-model:hideLoader="loader"
              :paymentType="selectedPaymentMethod"
              :key="orderSummaryKey"
              v-if="apiResponse"
            >
              <!-- Submit -->
              <div class="my-4 border-t border-gray-50" v-if="apiResponse">
                <CartSubmitButton
                  @submit="submitForm()"
                  :tab="'payment'"
                  :buttonText="getButtonText"
                  :paymentType="selectedPaymentMethod"
                  :grandTotal="grandTotal"
                  :className="`!max-w-full w-full`"
                  :cartResponse="apiResponse"
                />
              </div>
            </OrderSummary>
            <OrderSummarySkeleton v-else />
          </div>
        </aside>
      </form>
    </section>

    <!-- Payment modals -->
    <BoltPayment :cart_id="cartId" v-if="isBolt" @boltModalClose="closeModal" :key="callBoltMount" />

    <AffirmPayment :id="orderId" :amount="grandTotal" :tax="taxTotal" v-show="isAffirm" :key="callAffirmMount" />
  </div>
</template>
<script>
import { deepClone } from '~/utils/deepClone.js';
import KEYS from "~/utils/constant.js";
import api from "~/api-client/rest-api/index";
import customErrorMessages from "~/utils/customMessages.js";
// import ProgressStep from "~/components/checkout/ProgressStep.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import CartSubmitButton from "~/components/checkout/CartSubmitButton.vue";
import OrderSummary from "~/components/checkout/OrderSummary.vue";
import OrderSummarySkeleton from "~/components/skeleton/OrderSummarySkeleton.vue";
import BoltPayment from "~/components/payment/BoltPayment.vue";
import AffirmPayment from "~/components/payment/AffirmPayment.vue";
import Icon from "~/components/common/Icon.vue";
import mixin from "~/mixin/sweetAlert";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import landingData from "~/static/js/pageMetaHeading.js";
import Tooltip from "~/components/ui/Tooltip.vue";

export default {
  name : "PaymentPage",
  components: { Tooltip, CustomLoader, CartSubmitButton, OrderSummary, OrderSummarySkeleton, BoltPayment, AffirmPayment, Icon },
  data() {
    return {
      loader: true,
      paymentMethods: [
        { name: "Wire Transfer", idKey: "wire_payment", vHtml: ``, logos: [{ icon: 'bank', alt: 'Bank Transfer' }] },
        { name: "Split Payment / Phone Order", idKey: "split_payment", vHtml: ``, logos: [{ icon: 'credit-card', alt: 'Phone Order' }] },
        {
          name: "Affirm",
          idKey: "affirm_payment",
          logos: [{ src: 'https://cdn-assets.affirm.com/images/black_logo-white_bg.svg', alt: 'Affirm' }]
        },
        {
          name: "PayPal",
          idKey: "paypal_standard",
          logos: [{ src: assetUrl('~/assets/images/services/paypal_icon.webp'), alt: 'PayPal' }],
        }
      ],
      selectedPaymentMethod: "",
      apiResponse: '',
      visitor_code: '',
      order_summary: '',
      isAffirm: false,
      isBolt: false,
      orderId: '',
      grandTotal: 0,
      taxTotal: 0,
      callAffirmMount: 0,
      callBoltMount: 100,
      cartId: '',
      orderSummaryKey: 200,
      payLoader: false,
      submitted: false,
      sub_total: 0,
      orderError: null,
      showAffirmInfo: false
    };
  },
  computed: {
    errors() {
      return this.$validator ? this.$validator.errors : { first: () => null, has: () => false };
    },
   getButtonText() {
      if (this.selectedPaymentMethod === 'wire_payment' || this.selectedPaymentMethod === 'split_payment') {
        return 'Continue to Review';
      }
      if(this.selectedPaymentMethod === 'affirm_payment') {
        return 'CONTINUE WITH AFFIRM';
      }
      return `Continue to Secure Checkout`;
    },
    isAffirmDisabled() {
      // Disable Affirm if grandTotal >= 30000
      return parseInt(this.grandTotal) >= 30000;
    },
    isAffirmSelected() {
      return this.selectedPaymentMethod === 'affirm_payment';
    }
  },
  methods: {
    createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
    getWireAmount() {
      let amount = this.order_summary && parseInt(this.order_summary.wire_amount)
        ? this.formattedPrice(this.order_summary.wire_amount)
        : this.getDiscountedPrice(this.sub_total ?? 0);
      return amount ? `( ${amount} )` : '';
    },
    getDiscountedPrice(price) {
      let value = Math.round(parseFloat(price)) * KEYS.WIRE_DISCOUNT;
      return value ? this.formattedPrice(value) : '';
    },
    formattedPrice(price) {
        if (price === 0) return this.$formatPrice(0);
        if (price) return this.$formatPrice(parseFloat(price), true);
    },
    // moveBack() {
    //   this.$router.push(`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${this.visitor_code}`);
    // },
    toUpperCase(v) {
      return v ? v.toUpperCase() : '';
    },
    async submitForm() {
      // Prevent selecting Affirm if disabled
      if (this.isAffirmSelected && this.isAffirmDisabled) {
        this.showAffirmInfo = true;
         this.$bus.emit(
          'aria-announce',
          'Affirm is not available for orders over 30,000 dollars. Please select another payment method.'
        );
        return;
      }
      this.isAffirm = this.isBolt = this.showAffirmInfo = false;
      this.submitted = true;
      const isValid = await this.$validator.validateAll();
      if (!isValid) {
        this.$bus.emit(
          'aria-announce',
          'Please select a payment method before continuing.'
        );
        return;
      }
      this.submitted = false;
      this.loader = true;
      this.payLoader = false;
      if (this.isAffirmSelected) {
        this.isAffirm = true;
        this.$forceUpdate();
        this.callAffirmMount = this.callAffirmMount + 1;

        this.$bus.emit(
          'aria-announce',
          'Opening Affirm financing modal.'
        );
        return;
      }
      if (this.selectedPaymentMethod == 'bolt_payment') {
        this.isBolt = true;
        this.$forceUpdate();
        this.callBoltMount = this.callBoltMount + 1;

        this.$bus.emit(
          'aria-announce',
          'Opening secure credit card payment window.'
        );
        return;
      }

      this.$bus.emit(
        'aria-announce',
        'Proceeding to order review page.'
      );

      this.$router.push(`${STATIC_ROUTES.CART_REVIEW_WITH_VISITOR_CODE}${this.visitor_code}`);
    },
    getReadablePaymentName() {
      const map = {
        bolt_payment: "Credit Card",
        wire_payment: "Wire Transfer",
        split_payment: "Split Pay",
        affirm_payment: "Affirm financing",
        paypal_standard: "PayPal"
      }
      return map[this.selectedPaymentMethod] || "Payment method"
    },
    async storePaymentMethod() {
      this.submitted = false;
      this.$bus.emit(
        'aria-announce',
        `${this.getReadablePaymentName()} payment method selected. Updating order total.`
      );
      await this.updateCartApi();
      let validGTMPayments = {
        "affirm_payment": "viewed_financing_option",
        "wire_payment": "viewed_wire_transfer_option"
      };
      let paymentMethod = validGTMPayments[this.selectedPaymentMethod] ? validGTMPayments[this.selectedPaymentMethod] : null;
      if(paymentMethod) this.callGTMEvent(paymentMethod);
      // console.log(this.selectedPaymentMethod);
      // this.$store.commit("setPaymentMethod", this.selectedPaymentMethod);
    },
    async updateCartApi() {
      this.loader = true;
      const formData = { cart_id: this.apiResponse?.data?.id, payment_method: this.selectedPaymentMethod }
      let response = await api.updateCartItem(this.$axios, 'checkout/cart/update', formData, this.$cookies);
      if (!response) {
        this.$bus.emit(
          'aria-announce',
          'Server error while updating payment method.'
        );
        this.createSwalAlert('Internal Server Error', "error");
        this.loader = false;
        return;
      }
      let result = response.data?.data;
      if (result) {
        if (!result?.success) {
          this.$nextTick(() => {
            this.$bus.emit(
              'aria-announce',
              `${this.getReadablePaymentName()} selected.
              Updated order total is ${this.$formatPrice(this.grandTotal)}`
            );
          });
          this.createSwalAlert(result.message, "error")
        }
        if (result?.Error || result?.error) {
          this.$bus.emit(
            'aria-announce',
            'There was an error updating the payment method.'
          );
          this.createSwalAlert(result.Error ?? result?.error, "error")
        }
        if (result?.success) {
          this.createSwalAlert(result.message, "success");
          this.order_summary = result.order_summary;
          this.grandTotal = this.order_summary?.original_decimal_grand_price;
          this.sub_total = this.order_summary?.sub_total;
          this.taxTotal = this.order_summary?.original_decimal_tax_total;

          this.$store.commit("setPaymentMethod", result.payment_method);
          await this.$store.commit("setSummaryData", result.order_summary);
          this.orderSummaryKey = this.orderSummaryKey + 1;
          this.$nextTick(() => {
            this.$bus.emit(
              'aria-announce',
              `${this.getReadablePaymentName()} selected. New order total is ${this.$formatPrice(this.grandTotal)}`
            )
          })

          this.callGTMEvent('add_payment_info');
        }
        this.loader = false;
      }
    },
    async callGTMEvent(type = null) {
          await this.$store.commit('setGTMData');
          await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: type });
    },
    generateOrderId(str = null) {
      return `${Math.random().toString(36).substring(4, 9)}_${this.toUpperCase(str)}`;
    },
    closeModal() {
      this.isAffirm = this.isBolt = false;
      this.loader = false;

       this.$bus.emit(
        'aria-announce',
        'Payment window closed. Returned to payment page.'
      );
    },
    async txnSave(payload) {
      if (this.payLoader) {
        return;
      }
      this.loader = true;
      let order_id = await this.createOrder();
      if(!order_id) {
        this.loader = false;
        this.orderError = this.orderError || 'An unexpected error occurred while creating order.Please try again.';

        this.$bus.emit(
          'aria-announce',
          'Unable to create order. Please try again.'
        );

        return;
      }
      this.orderError = null;
      let txnObj = {
        cart_id: this.apiResponse ? this.apiResponse?.data?.id : '',
        transaction_id: payload.transaction_id ?? '',
        amount: payload.payment_method == "paypal_standard" ? payload.amount : (parseFloat(payload.amount) / 100),
        order_id: order_id,
        payment_method: payload.payment_method,
        authorization_id: payload.authorization_id ?? '',
        date: payload.date ?? '',
      };
      if (payload && (payload.card_last4 || payload.card_brand)) {
        txnObj = {
          ...txnObj,
          ...(payload.card_last4 ? { card_last4: payload.card_last4 } : {}),
          ...(payload.card_brand ? { card_brand: payload.card_brand.toLowerCase() } : {}),
        };
      }
      try {

        let response = await api.postRequest(this.$axios, 'order-transaction/store', txnObj);

        if (!response) {

          this.$bus.emit(
            'aria-announce',
            'Payment processing failed. Please try again.'
          );

          this.createSwalAlert('Internal Server Error', "error");
          this.loader = false;
          return;
        }
        if (response.data) {
          this.loader = this.payLoader = false;
          if (!response.data.message) {
            let result = response?.data;
            if (result || (result?.data && result?.data?.id)) {

              this.$bus.emit(
                'aria-announce',
                'Order created successfully. Redirecting to thank you page.'
              );


              this.createSwalAlert("Order created successfully", "success");
              this.$router.push(STATIC_ROUTES.THANKYOU);
              return;
            }
            if (result == null) {
              this.createSwalAlert(result.message ?? 'Server error', "error");
              return;
            }


          }
          if (response.data.message) {
            this.createSwalAlert(response.data.message ?? 'Server error', "error");
            return;
          }

        }
      } catch (error) {
        this.$bus.emit(
          'aria-announce',
          'Server error occurred while processing payment.'
        );
        this.loader = false;
        this.createSwalAlert('Server error', "error");
      }
    },
    async createOrder() {
      try {
        // this.submitLoader = true;
        this.loader = this.payLoader = true;
        let payload = {
            cart_id: this.apiResponse?.data?.id,
            custom_order_id: this.orderId
          };
        let token = localStorage.getItem('token');
        let config = null;
        if(token) {
          config = {
            headers: {
              'Authorization': `Bearer ${this.token}`,
            }
          };
        }
        let response = await api.postRequest(this.$axios, 'create-order',
          payload, null, config);
        if (!response) {
          this.orderError = 'Internal Server Error';
          // this.createSwalAlert('Internal Server Error', "error");
          // this.submitPayPalLoader = this.loader = false;
          this.$bus.emit(
            'aria-announce',
            'Order creation failed. Please check your information and try again.'
          );
          return null;
        }
        if (response) {
          if (response.data.error || response.data.Error) {
            // this.submitLoader = this.loader = false;
            this.orderError = response.data?.message;
            // this.createSwalAlert(response.data?.message, "error");
            return null;
          }
          let orderData = response.data?.data;
          await this.$store.commit('setOrderedData', orderData);
          return orderData?.id;
        }
        return null;
      } catch (error) {
        this.$bus.emit(
          'aria-announce',
          'Unexpected error while creating order.'
        );
        this.orderError = error?.message ?? 'An unexpected error occurred while creating order.Please try again.';
        return null;
      }
    },
    async assignData() {
      this.isAffirm = false;
      this.$validator.localize("en", customErrorMessages);
      this.selectedPaymentMethod = (await this.$store.getters.getPayment) || '';
      this.apiResponse = await this.$store.getters.getResponse;
      this.order_summary = await this.$store.getters.getSummaryData;
      this.visitor_code = await this.$store.getters.getVisitorCode;
      this.orderId = this.generateOrderId(this.apiResponse.data?.visitor_code);
      this.grandTotal = await this.order_summary?.original_decimal_grand_price;
      this.taxTotal = await this.order_summary?.original_decimal_tax_total;
      this.cartId = await this.apiResponse ? this.apiResponse?.data?.id : '';
      // this.subTotal = await this.order_summary?.original_sub_total;
      this.sub_total = await this.order_summary?.sub_total;
      this.$bus.on("ModalCloseEvent", async () => {
        this.isAffirm = this.isBolt = false;
        this.loader = false;
      });

      this.$bus.on("applyLoader", async () => {
        this.loader = true;
      });

      this.$bus.off("paymentResponse");
      this.$bus.on("paymentResponse", async (val) => {
        this.loader = true;
        await this.txnSave(val);
      });
      let addressObj = await deepClone(this.$store.getters.getAddress);
      if (!addressObj?.order_shipping?.address1 || !addressObj?.order_billing?.address1) {
        let visitor_code = this.apiResponse.data ? this.apiResponse?.data?.visitor_code : this.$cookies ? this.$cookies.get('visitorCode') : '';
        (visitor_code) ? this.$router.push(`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${visitor_code}`) : '';
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('getCart', (this.$store, this.$nuxt.context));
    await this.assignData();
    this.$nextTick(() => {
      this.$bus.emit(
        'aria-announce',
        `Payment page loaded. Current order total is ${this.$formatPrice(this.grandTotal)}. Please choose a payment method.`
      )
    })
  },
  unmounted() {
    this.$bus.off("submitPayment");
    this.$bus.off("paymentResponse");
  },
  watch: {
    '$store.getters.getSummaryData': {
      deep: true,
      handler(newVal) {
        this.grandTotal = newVal?.original_decimal_grand_price;
        this.taxTotal = newVal?.original_decimal_tax_total;
        // console.log(this.grandTotal,this.taxTotal);
      }
    },
  },
  head() {
      const scripts = [
        {
          hid: "tractTag",
          src: this.$config.public.boltTrackCDN,
          async: true,
          defer: false,
          id: "bolt-track"
        },
        {
          hid: "tractTag",
          src: this.$config.public.boltConnectCDN,
          async: true,
          defer: false,
          id: "bolt-connect"
        }
      ];
      scripts.forEach(script => {
        script["data-publishable-key"] = this.$config.public.boltDataPublishableKey;
      });
      return { ...landingData.CART_META, script: scripts }; // Return the scripts as an object with the "script" property
  },
};
</script>

