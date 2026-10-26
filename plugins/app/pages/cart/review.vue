<template>
    <div aria-labelledby="review-heading" class="bg-gray-50">

        <!-- add progress step -->
        <!-- <ProgressStep /> -->

        <!-- loader -->
        <div
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-65 group-light"
            :class="loader ? '' : 'hidden'"
            aria-live="assertive"
            aria-busy="true"
        >
            <CustomLoader />
            <span class="sr-only">Processing your order. Please wait.</span>
        </div>

        <section class="w-full" :key="componentKey">
            <h1 id="review-heading" class="sr-only">Review Order</h1>

            <form class="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8" @submit.prevent="submitForm()">

                <!-- Left column -->
                <div class="flex-grow space-y-4">

                    <!-- Cart items header -->
                    <div class="flex items-center gap-3">
                        <Icon name="shopping-bag" class="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                        <div class="flex flex-col gap-0.5">
                            <h2 class="text-base font-semibold text-gray-900" style="text-transform: none;">Your Order</h2>
                            <p class="text-xs text-gray-500">Review your items before placing</p>
                        </div>
                        <p class="ml-auto mt-0.5 flex items-center gap-1 text-xs text-gray-500 py-2 px-3 bg-gray-100 rounded-full" aria-hidden="true">
                            <Icon name="check" class="h-3.5 w-3.5" aria-hidden="true" />
                            {{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }}
                        </p>
                    </div>

                    <!-- Cart items card -->
                    <div class="overflow-hidden">
                        <!-- Skeleton -->
                        <ul v-if="loader" class="divide-y divide-gray-100 px-5" role="list" aria-busy="true">
                            <li v-for="n in 3" :key="n" class="flex flex-row gap-4 py-5">
                                <div class="skeleton-shimmer flex-shrink-0 w-16 h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-lg"></div>
                                <div class="flex flex-1 flex-col gap-2 pt-1">
                                    <div class="skeleton-shimmer h-4 rounded w-3/4"></div>
                                    <div class="skeleton-shimmer h-3 rounded w-1/2"></div>
                                    <div class="skeleton-shimmer h-3 rounded w-1/3"></div>
                                </div>
                                <div class="skeleton-shimmer h-4 rounded w-16 flex-shrink-0 mt-1"></div>
                            </li>
                        </ul>
                        <ul v-else class="space-y-4" role="list">
                            <li class="px-5 py-4 bg-white rounded-xl border border-gray-200 shadow-sm" v-for="(item, index) in cartItems" :key="index">
                                <div class="flex flex-row gap-4 justify-between">
                                    <div class="flex-none flex flex-col">
                                        <div class="relative flex-shrink-0 aspect-square w-16 h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-lg border border-gray-100">
                                            <Icon name="no-image" v-if="item.product?.images && !item.product?.images?.length" class="w-full h-full object-cover" />
                                            <ImagePreview v-else :image="fetchFirstProductImage(item)" style="cursor:pointer" :key="`${item.name}_${index}`"
    modal-class="w-[92vw] sm:w-[75vw] lg:w-[min(82dvh,780px)] max-w-[780px] max-h-[90dvh] aspect-square bg-white shadow-2xl p-1 lg:p-1 [&_img]:!object-contain [&>button]:!m-3 [&>[title=count]]:!m-0 [&>div:last-child]:!px-2 [&>div:last-child_svg]:!text-gray-800" />
    <!-- <ImagePreview v-else :image="fetchFirstProductImage(item)" style="cursor:pointer" :key="`${item.name}_${index}`"
    modal-class="w-[92vw] sm:w-[75vw] lg:w-[min(82dvh,780px)] max-w-[780px] max-h-[90dvh] aspect-square bg-white rounded-xl shadow-2xl [&_img]:!w-full [&_img]:!h-full [&_img]:!max-w-full [&_img]:!object-contain [&>button]:!m-2 sm:[&>button]:!m-3 [&>button]:!opacity-100 [&>[title=count]]:!m-0 [&>div:last-child]:!px-2 [&>div:last-child_svg]:!text-gray-800" /> -->
                                        </div>
                                        <!-- <button
                                            type="button"
                                            :aria-label="`Remove ${item.name} from cart`"
                                            class="flex text-xs hover:text-primary underline items-center gap-1 mt-1 w-full"
                                            @click="removeItem(index, item.id)"
                                        >
                                            <Icon name="close" class="h-3.5 w-3.5" aria-hidden="true" />
                                            Remove
                                        </button> -->
                                    </div>
                                    <div class="flex flex-1 flex-col">
                                        <div class="flex justify-between gap-4">
                                            <div class="flex flex-col space-y-1">
                                                <CartItemName :item="item" :className="'flex-1 !capitalize font-medium text-gray-900'" />
                                            </div>
                                            <div class="flex flex-col gap-1 text-right flex-shrink-0">
                                                <span class="sr-only">
                                                    {{ showStrikeThroughPrice(item)
                                                        ? `Original price ${formattedPrice(showStrikeThroughPrice(item))}, discounted price ${formattedPrice(fetchPriceData(item))}`
                                                        : `Price is ${formattedPrice(fetchPriceData(item))}`
                                                    }}
                                                </span>
                                                <div aria-hidden="true" class="flex flex-col gap-1">
                                                    <span
                                                        class="text-sm font-semibold"
                                                        v-if="typeof item.price !== 'undefined'"
                                                        :class="{ '!text-gray-900': showStrikeThroughPrice(item) }">
                                                            {{ formattedPrice(fetchPriceData(item)) }}
                                                    </span>
                                                    <span class="line-through text-gray-500 text-xs" v-if="showStrikeThroughPrice(item)">
                                                        {{ formattedPrice(showStrikeThroughPrice(item)) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <AdditionalData :item="item" :itemId="`item-config-${index}`" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- Addresses & Payment header -->
                    <div class="flex items-center gap-3 pt-2">
                        <Icon name="document" class="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                        <div class="flex flex-col gap-0.5">
                            <h2 class="text-base font-semibold text-gray-900" style="text-transform: none;">Delivery & Payment</h2>
                            <p class="text-xs text-gray-500">Confirm your details</p>
                        </div>
                    </div>

                    <!-- Addresses & Payment card -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <!-- Shipping Address -->
                        <div class="bg-white shadow-sm border border-gray-200 p-5 sm:p-6 rounded-lg">
                            <div class="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <div class="flex gap-2">
                                    <Icon name="truck" class="mt-1 h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                                    <h3 class="text-sm font-semibold text-gray-900 hover:text-primary transition-colors">Shipping Address
                                    </h3>
                                </div>
                                <NuxtLink
                                    :to="`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${apiResponse.data ? apiResponse.data.visitor_code : ''}`"
                                    class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    aria-label="Edit shipping address"
                                    @focus="$bus.emit('aria-announce', 'Shipping Address. ' + formatAddressAnnouncement(order_shipping))"
                                    @click="$bus.emit('aria-announce', 'Navigating to edit shipping address')"
                                >
                                    <span class="text-xs font-normal text-primary underline ml-1">Edit</span>
                                </NuxtLink>
                            </div>
                            <OrderAddress :address="order_shipping" />
                        </div>


                        <!-- Billing Address -->
                        <div class="bg-white shadow-sm border border-gray-200 p-5 sm:p-6 rounded-lg">
                            <div class="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <div class="flex gap-2">
                                    <Icon name="document" class="mt-1 h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                                    <h3 class="text-sm font-semibold text-gray-900 hover:text-primary transition-colors">Billing Address
                                    </h3>
                                </div>
                                <NuxtLink
                                    :to="`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${apiResponse.data ? apiResponse.data.visitor_code : ''}`"
                                    class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    aria-label="Edit billing address"
                                    @focus="$bus.emit('aria-announce', 'Billing Address. ' + formatAddressAnnouncement(order_billing))"
                                    @click="$bus.emit('aria-announce', 'Navigating to edit billing address')"
                                >
                                    <span class="text-xs font-normal text-primary underline ml-1">Edit</span>
                                </NuxtLink>
                            </div>
                            <OrderAddress :address="order_billing" />
                        </div>

                        <!-- Payment Method -->
                        <div class="bg-white shadow-sm border border-gray-200 p-5 sm:p-6 rounded-lg">
                            <div class="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <div class="flex gap-2">
                                    <Icon name="credit-card" class="h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                                    <h3 class="text-sm font-semibold text-gray-900 hover:text-primary transition-colors">Payment Method
                                    </h3>
                                </div>
                                <NuxtLink
                                    :to="`${STATIC_ROUTES.CART_PAYMENT_WITH_VISITOR_CODE}${apiResponse.data ? apiResponse.data.visitor_code : ''}`"
                                    class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    aria-label="Edit payment method"
                                    @focus="$bus.emit('aria-announce', 'Payment Method. ' + (paymentName || 'Not selected'))"
                                    @click="$bus.emit('aria-announce', 'Navigating to edit payment method')"
                                >
                                    <span class="text-xs font-normal text-primary underline ml-1">Edit</span>
                                </NuxtLink>
                            </div>
                            <p class="text-sm text-gray-600">{{ paymentName }}</p>
                            <div class="py-3" v-if="apiResponse?.data?.payment?.method == 'wire_payment'">
                                <p class="text-sm text-gray-700 italic">
                                    Wire instructions will be emailed after your order is placed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right column -->
                <div class="lg:max-w-[400px] flex-none w-full">
                    <div class="sticky top-4 space-y-4">

                        <!-- Order Summary header -->
                        <div class="flex items-center gap-3">
                            <Icon name="clipboard" class="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                            <div class="flex flex-col gap-0.5">
                                <h2 class="text-base font-semibold text-gray-900" style="text-transform: none;">Order Summary</h2>
                                <p class="text-xs text-gray-500">Price details & totals</p>
                            </div>
                        </div>

                        <!-- Order Summary card -->
                        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div class="px-5">
                                <OrderSummary :orderData="{ currentTab: 'review' }" v-if="apiResponse">
                                    <div class="pt-4">
                                        <CartSubmitButton @submit="submitForm()" :tab="'review'" :buttonText="'Place Order'" :className="`!max-w-full w-full`" :cartResponse="apiResponse"/>
                                    </div>
                                </OrderSummary>
                                <OrderSummarySkeleton v-else />
                            </div>
                        </div>

                        <!-- Special Instructions -->
                        <div class="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden" v-if="special_instruction">
                            <div class="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                <Icon name="email" class="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                                <h3 class="text-sm font-semibold text-gray-900" style="text-transform: none;">Comments / Special Instructions</h3>
                            </div>
                            <p class="px-5 py-4 text-sm text-gray-600">{{ special_instruction }}</p>
                        </div>

                    </div><!-- end sticky wrapper -->
                </div><!-- end right column -->

            </form>
        </section>
    </div>
</template>
<script>
import { deepClone } from '~/utils/deepClone.js';
import api from "~/api-client/rest-api/index";
import lang from "~/utils/commonLocale.js";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import Icon from "~/components/common/Icon.vue";
import ImagePreview from "~/components/product/ImagePreview.vue";
import AdditionalData from "~/components/checkout/AdditionalData.vue";
import OrderAddress from "~/components/checkout/OrderAddress.vue";
import CartSubmitButton from "~/components/checkout/CartSubmitButton.vue";
import OrderSummary from "~/components/checkout/OrderSummary.vue";
import OrderSummarySkeleton from "~/components/skeleton/OrderSummarySkeleton.vue";
import { showStrikeThroughPrice, fetchPriceData, correctUrl, productRedirection, fetchFirstProductImage } from "~/utils/universalHelper.js";
import mixin from "~/mixin/sweetAlert";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import landingData from "~/static/js/pageMetaHeading.js";
import CartItemName from "~/components/checkout/CartItemName.vue";

export default {
    name : 'CartReview',
    components: { CustomLoader, Icon, ImagePreview, AdditionalData, OrderAddress, CartSubmitButton, OrderSummary, OrderSummarySkeleton, CartItemName },
    data() {
        return {
            STATIC_ROUTES,
            cartItems: [],
            loader: true,
            paymentCase: "",
            paymentName: "",
            orderId: "",
            step: 0,
            objectSteps: {
                bolt_payment: { step: 1, name: "Credit Card (Bolt)" },
                paypal_standard: { step: 2, name: "Paypal" },
                affirm_payment: { step: 3, name: "Affirm" },
                wire_payment: { step: 4, name: "Wire Transfer" },
                split_payment: { step: 5, name: "Split Payment" }
            },
            order_billing: {},
            order_shipping: {},
            addressObj: '',
            apiResponse: '',
            order_summary: '',
            componentKey: 50,
            cartId: '',
            lang,
            special_instruction: "",
        };
    },
    async mounted() {
        this.$bus.emit("aria-announce", "Review your order details before submitting.");
        await this.$store.dispatch('getCart', (this.$store, this.$nuxt.context));
        await this.assignData();
        await $bus.emit("tabChangeEvent", { isClickable: false, currentRoute: this.$router.currentRoute.value.name });
        this.$store.commit('setItemIndex', null);
    },
    methods: {
        fetchPriceData: item => fetchPriceData(item),
        showStrikeThroughPrice: item => showStrikeThroughPrice(item),
        fetchFirstProductImage: item => fetchFirstProductImage(item),
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        formatAddressAnnouncement(address) {
            if (!address) return '';
            const parts = [
                address.first_name && address.last_name ? `${address.first_name} ${address.last_name}` : '',
                Array.isArray(address.address1) ? address.address1[0] : address.address1,
                Array.isArray(address.address2) ? address.address2[0] : address.address2,
                address.city ? `${address.city}, ${address.state || ''} ${address.postcode || ''}`.trim() : `${address.state || ''} ${address.postcode || ''}`.trim(),
                address.phone || '',
                address.email || '',
            ];
            return parts.filter(Boolean).join(', ');
        },
        getRedirectUrl(item) {
            if (item && (item.product?.attribute_family_code?.includes('default') || item?.additional?.certificate)) {
                return this.$route.fullPath;
            }
            if (item && item?.additional?.certificate) {
                return this.$route.fullPath;
            }
            let url = item && item.product ? item?.product?.url_key : '';
            if (url.includes('your-setting')) return `${correctUrl(url)}`;
            return productRedirection(item.product ?? item) || STATIC_ROUTES.HOME;
        },
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), true);
        },
        toUpperCase(v) {
            return v ? v.toUpperCase() : '';
        },
        async createOrder() {
            this.loader = true;
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
                this.createSwalAlert('Internal Server Error', "error");
                this.submitPayPalLoader = this.loader = false;
                return;
            }
            
            if (response) {
                if (!response?.data?.data && (response.data.error || response.data.Error || !response?.data?.success)) {
                    this.submitLoader = this.loader = false;
                    this.createSwalAlert(response?.message || response.data?.message, "error");
                    return;
                }
                let orderData = response.data?.data;
                await this.$store.commit('setOrderedData', orderData);
                return orderData?.id;
            }
        },
        async submitForm() {
            this.$bus.emit("aria-announce", "Submitting your order. Please wait.");
            let orderId = await this.createOrder();
            if(!orderId){
               this.submitPayPalLoader = this.loader = false;
               return; 
            }
            this.$router.push(STATIC_ROUTES.THANKYOU);
        },
        async assignData() {
            this.cartItems = await deepClone(this.$store.getters.getCartItems);
            this.apiResponse = await this.$store.getters.getResponse;
            this.special_instruction = await this.apiResponse?.data?.special_instruction;
            this.cartId = await this.apiResponse?.data?.id;
            this.orderId = this.generateOrderId(this.apiResponse.data?.visitor_code);
            this.paymentCase = await this.$store.getters.getPayment;
            const paymentName = this.objectSteps[this.paymentCase]?.name;
            this.paymentName = paymentName === "Split Payment" ? `${paymentName} / phone order` : paymentName;
            // this.paymentName = await this.objectSteps[this.paymentCase]?.name;
            this.step = this.objectSteps[this.paymentCase]?.step;
            this.order_summary = await this.$store.getters.getSummaryData;
            this.loader = false;
            if (!this.order_summary) {
                this.order_summary = await this.apiResponse.data;
            }
            this.addressObj = await deepClone(this.$store.getters.getAddress);
            if (this.addressObj.hasOwnProperty("order_shipping") && this.addressObj.hasOwnProperty("order_billing")) {
                this.order_billing = this.addressObj.order_billing;
                this.order_shipping = this.addressObj.order_shipping;
            }
            let data = this.apiResponse.data;
            if (!this.addressObj?.order_shipping?.address1 || !this.addressObj?.order_billing?.address1) {
                return this.$router.push(`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${data ? data.visitor_code : ''}`)
            }
            if (!this.paymentCase || [1, 2, 3].includes(this.step)) {
                return this.$router.push(`${STATIC_ROUTES.CART_PAYMENT_WITH_VISITOR_CODE}${data ? data.visitor_code : ''}`)
            }

            // this.loader = this.apiResponse ? false : true;
        },
        generateOrderId(str = null) {
            return `${Math.random().toString(36).substring(4, 9)}_${this.toUpperCase(str)}`;
        },
        shouldHideSku(item) {
            if (!item) return false;
            const sku = item.sku || this.getCartItemSku(item);
            const hiddenSkus = ['Foaming-Cleaner', 'Cleaning-Pen', 'Polishing-Cloth'];
            return hiddenSkus.includes(sku);
        },
        getCartItemSku(item) {
            if (!item) return '';
            const { sku, additional } = item;
            if(additional){
            let diamond_sku  =  additional.diamond_sku;
            if (Array.isArray(diamond_sku) && diamond_sku.length > 0) {
                return diamond_sku.length > 1 ? diamond_sku.join(', ') : diamond_sku[0];
                }
            }
            if (!sku) return null;
            const splitIndex = sku.toLowerCase().indexOf('-d-');
            if (splitIndex !== -1) {
                const setting = sku.substring(0, splitIndex);
                const diamond = sku.substring(splitIndex + 1); // includes 'd-'
                return `${diamond}, ${setting}`;
            }
            return sku;
        },
    },
    head() {
        return landingData.CART_META;
    }
};
</script>