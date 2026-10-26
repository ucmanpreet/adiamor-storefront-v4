<template>
  <article class="overflow-visible pb-4" :key="componentKey" aria-label="Order Summary">
    <!-- <div v-if="!cartItems.length">No Data Found</div> -->
    <div class="w-full flex flex-col relative" :class="validProductView ? 'pb-4' : ''">
      <div class="flex-1">

        <!-- ORDER SUMMARY -->
        <template v-if="validProductView">
          <ul role="list" class="mt-4">
            <li v-for="(item, index) in cartItems" :key="index" class="py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded"
              :class="index > 0 ? 'border-t border-gray-200' : ''"
              tabindex="0"
              :aria-label="`Item ${index + 1}: ${getDescription(item) ?? item.name}, ${formattedPrice(fetchPriceData(item))}`"
              >
              <div class="flex flex-1 flex-col">
                <div class="flex justify-between">
                  <CartItemName :item="item" />
                  <p class="ml-4 flow-root flex-shrink-0 text-sm" :aria-label="`Price ${ formattedPrice(fetchPriceData(item)) }`">
                    {{ formattedPrice(fetchPriceData(item)) }}
                  </p>
                </div>
                <AdditionalData :item="item" />
              </div>
            </li>
          </ul>
        </template>

        <!-- PRICE SUMMARY -->
        <section
          v-if="order_summary"
          class="pt-4 text-sm"
          :class="validProductView ? 'mt-4 border-t border-gray-200' : 'pb-4'"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3 class="sr-only hidden sm:block">Items in your cart</h3>

          <dl class="space-y-4 text-dim-black-500">

            <div class="flex items-center justify-between" tabindex="0" :aria-label="`Subtotal ${formattedPrice(order_summary.sub_total)}`">
              <dt>Subtotal</dt>
              <dd>
                {{
                  order_summary ? formattedPrice(order_summary.sub_total) : "-"
                }}
              </dd>
            </div>

            <div class="flex items-center justify-between" tabindex="0" aria-label="FedEx Insured Shipping: Free">
              <dt>FedEx Insured Shipping</dt>
              <dd>Free</dd>
            </div>

            <div class="flex items-center justify-between" v-if="order_summary.coupon_amount > 0"
              tabindex="0"
              :aria-label="`Coupon code: ${couponVal}, ${order_summary ? formattedPrice(order_summary.coupon_amount) : '-'}`"
              >
              <dt class="flex items-center gap-2">
                Discount
                <span v-if="couponVal" class="flex items-center gap-1 text-xs rounded-md uppercase bg-green-50 text-green-600 py-1 px-2 font-medium">
                  {{ couponVal }}
                  <button
                    v-if="orderData.currentTab === 'summary'"
                    type="button"
                    class="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove promo code"
                    @click="removeCoupon"
                  >
                    <Icon name="close" class="size-3 text-green-600" />
                  </button>
                </span>
              </dt>
              <dd>
                -
                {{
                  order_summary
                    ? formattedPrice(order_summary.coupon_amount)
                    : "-"
                }}
              </dd>
            </div>

            <div class="flex items-center justify-between" v-if="paymentCase == 'wire_payment'"
              tabindex="0"
              :aria-lablel="`Wire discount : ${ order_summary ? formattedPrice(order_summary.wire_amount) : '-' }`"
            >
              <dt>Wire Discount</dt>
              <dd>
                - {{ order_summary ? formattedPrice(order_summary.wire_amount) : "-" }}
              </dd>
            </div>

            <div class="flex items-center justify-between" v-if="order_summary.tax_total > 0"
              tabindex="0"
              :aria-lablel="`Sales Tax : ${ order_summary ? order_summary.tax_percentage : '-' }%, ${order_summary ? formattedPrice(order_summary.tax_total) :  '-'}`"
            >
              <dt>
                Sales Tax
                <span>({{
                  order_summary ? order_summary.tax_percentage : "-"
                }}%)</span>
              </dt>
              <dd>
                {{
                  order_summary ? formattedPrice(order_summary.tax_total) : "-"
                }}
              </dd>
            </div>

            <div class="flex items-center text-gray-black text-lg font-normal justify-between border-t border-gray-200 pt-4"
              tabindex="0"
              :aria-label="`Total : ${order_summary ? formattedPrice(order_summary.grand_total) : '-'}`"
            >
              <dt class="">Total</dt>
              <dd>
                {{
                  order_summary
                    ? formattedPrice(order_summary.grand_total)
                    : "-"
                }}
              </dd>
            </div>

          </dl>
        </section>
      </div>
    </div>

    <!--Coupon Slot Prop -->
    <slot></slot>

    <!-- SHIPPING SECTION -->
    <section class="space-y-4 pt-4 mt-6 border-t border-gray-200" aria-labelledby="shipping-heading">
      <h2 for="shipping" id="shipping-heading" class="text-lg">Shipping</h2>

      <div class="flex flex-col sm:flex-row flex-wrap justify-between gap-3 text-sm">
        <!-- Estimated Date -->
        <div class="flex gap-3 flex-1">
          <div>
            <Icon name="calendar" class="w-5 h-5 text-primary" />
          </div>
          <div class="flex sm:block items-center gap-1" tabindex="0">
            <p class="text-secondary-800 sm:text-xs">
              Estimated Ship Date:
            </p>
            <p class="text-sm font-medium">
              {{ getShippingText(apiResponse?.data) }}
            </p>
          </div>
        </div>

        <!-- Shipping Method -->
        <div class="flex gap-3 flex-1">
          <div>
            <Icon name="truck" class="w-6 h-6 text-primary" />
          </div>
          <div class="flex sm:block items-center gap-1" tabindex="0">
            <p class="text-secondary-800 sm:text-xs">Shipping Method:</p>
            <p class="text-sm font-medium">{{ apiResponse?.data?.shipping_method ?? "Free FedEx Overnight" }} </p>
          </div>
        </div>

        <!-- Shipping Help Box -->
        <div class="mt-2 p-4 border border-gray-200 bg-[#f8f8f8] col-span-full text-sm space-y-4">
          <p>
            For Saturday delivery, call customer service at
            <a
              class="font-medium inline-block"
              :href="`tel:${telPhoneNumber}`"
              :aria-label="`for Saturday delivery, call customer service at ${phoneNumber}`"
              @click="$bus.emit('aria-announce', 'Calling customer service at ' + phoneNumber)"
            >
              {{ phoneNumber }}
            </a>.
              APO/FPO orders will ship via USPS Priority Mail.
          </p>
          <p>
            View our
            <NuxtLink
              :to="STATIC_ROUTES.POLICIES_SHIPPING"
              class="text-primary font-medium"
              @click="$bus.emit('aria-announce', 'Opening Shipping Policy and Expedite Options page.')"
            >
              Shipping Policy and Expedite Options.
              <span class="sr-only" aria-live="polite"></span>
            </NuxtLink>
            <span tabindex="0">
              For phone orders please mention:
              <span class="font-medium">{{
                apiResponse.data
                  ? toUpperCase(apiResponse.data.visitor_code)
                  : "-"
              }}</span>
            </span>
          </p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-3 w-full">
          <div class="flex items-center gap-1 text-xs text-gray-500">
            <Icon name="shield-check" class="size-4 text-custom-green" aria-hidden="true" />
            Secure Checkout
          </div>
          <div class="flex items-center gap-1.5 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>30-Day Returns</span>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <span>Free Insured Shipping</span>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
<script>
import { deepClone } from '~/utils/deepClone.js';
import api from "~/api-client/rest-api/index";
import lang from "~/utils/commonLocale.js";
import AdditionalData from "~/components/checkout/AdditionalData.vue";
import Icon from "~/components/common/Icon.vue";
import mixin from "~/mixin/sweetAlert.js";
import { fetchPriceData, getDescription } from "~/utils/universalHelper";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import CartItemName from "./CartItemName.vue";
export default {
  name : 'OrderSummary',
  components: { AdditionalData, Icon, CartItemName },
  data() {
    return {
      cartItems: [],
      couponVal: "",
      apiResponseBool: false,
      apiResponse: "",
      order_summary: "",
      componentKey: 0,
      paymentCase: "",
      grandTotal: 0,
      lang,
      STATIC_ROUTES
    };
  },
  props: {
    orderData: Object,
    hideLoader: Boolean,
    paymentType: String,
  },
  async mounted() {
    try {
      this.cartItems = await deepClone(this.$store.getters.getCartItems);
      this.apiResponse = await deepClone(this.$store.getters.getResponse);
      this.order_summary = await this.$store.getters.getSummaryData;
      this.grandTotal = await this.order_summary?.decimal_grand_price;
      this.apiResponseBool = this.apiResponse ? true : false;
      this.couponVal = await this.$store.getters.getCouponCode;
      this.paymentCase = await this.$store.getters.getPayment;
      if (this.apiResponseBool) {
        this.$emit("update:hideLoader", false);

      }
    } catch (error) {
      console.error("An error occurred while watching getResponse:", error);
    }
  },
  computed: {
    validProductView() {
     return ['contact', 'payment'].includes(this.orderData.currentTab);
    },
    phoneNumber() {
      return this.$store.state.phoneNumber;
    },
    telPhoneNumber() {
      return this.$store.state.phoneNumber?.replace(/[^+\d]/g, "");
    },
  },
  methods: {
    fetchPriceData: item => fetchPriceData(item),
    getDescription: item => getDescription(item),
    createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
    getShippingText(product) {
			return product?.shipping?.message ? product.shipping?.message : lang.moreThanSevenDays;
		},
    formattedPrice(price) {
      if (price === 0) return this.$formatPrice(0, true);
      if (price) return this.$formatPrice(parseFloat(price), true);
    },
    toUpperCase(v) {
      return v ? v.toUpperCase() : "";
    },
    emitCall() {
      this.orderData.currentTab == "contact"
        ? $bus.emit("submitContact")
        : $bus.emit("submitPayment");
    },
    async updateCartApi(keyToUpdate) {
      const requiredKeys = { cart_id: this.apiResponse?.data?.id };
      let formData = { ...requiredKeys, ...keyToUpdate };
      this.$emit("update:hideLoader", true);
      let response = await api.updateCartItem(
        this.$axios,
        "checkout/cart/update",
        formData,
        this.$cookies
      );
      if (!response) {
        this.createSwalAlert("Internal Server Error", "error");
        this.$bus.emit(
          "aria-announce",
          "Unable to update your cart. Please try again."
        );
        this.$emit("update:hideLoader", false);
        return;
      }
      let result = response.data?.data;
      this.$emit("update:hideLoader", false);
      if (!response.data?.success) {
        this.createSwalAlert(response.data.message, "error");
        this.$bus.emit(
          "aria-announce",
          response.data?.message || "Unable to update your cart."
        );
      }
      if (response.data?.Error || response.data?.error) {
        this.createSwalAlert(result.Error ?? result?.error, "error");
        this.$bus.emit(
          "aria-announce",
          result?.Error || result?.error || "Unable to update your cart."
        );
      }

      if (result) {
        if (!result?.success) {
          this.createSwalAlert(result.message, "error");
          this.$bus.emit(
            "aria-announce",
            result?.message || "Unable to update your cart."
          );
        }
        if (result?.Error || result?.error) {
          this.createSwalAlert(result.Error ?? result?.error, "error");
          this.$bus.emit(
            "aria-announce",
            result?.Error || result?.error || "Unable to update your cart."
          );
        }
        if (result?.success) {
          await this.$store.commit(
            "setSummaryData",
            deepClone(result.order_summary)
          );
          await this.$store.commit(
            "setCouponCode",
            deepClone(result.coupon_code)
          );
          this.order_summary = result.order_summary;
          this.couponVal = result.coupon_code;
          // this.apiResponse?.data ? this.apiResponse?.data.coupon_code = result.coupon_code : '';
          this.grandTotal = await this.order_summary?.decimal_grand_price;
          this.componentKey = this.componentKey + 1;
          this.createSwalAlert(result.message, "success");
          this.$bus.emit(
            'aria-announce',
            `Cart updated. New order total: ${this.formattedPrice(this.order_summary?.grand_total)}.`
          );
        }
        this.$emit("update:hideLoader", false);
      }
    },
    async removeCoupon() {
      await this.updateCartApi({ coupon_code: '' });
    },
    couponExist() {
      return this.$store.getters.getCouponCode;
    },
  },
  watch: {
    paymentCase(newVal) {
      const method = newVal === 'wire_payment' ? 'Wire Transfer' : newVal;
      // this.$bus.emit('aria-announce', `Payment method updated to ${method}. Order total has been recalculated. Amount is ${this.formattedPrice(this.order_summary?.grand_total)}`);
    }
  }
};
</script>
