<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
    <div v-if="loading" class="py-24 fixed z-65 inset-0 flex items-center justify-center bg-black/50 group-light"
      role="alert"
      aria-busy="true"
      aria-live="assertive"
    >
      <CustomLoader />
    </div>
    <div v-else class="space-y-2 px-4 mb-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
      <div class="flex sm:items-baseline sm:space-x-4">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex items-center">
          <NuxtLink
            :to="myAccountPath"
            title="Back to my account"
            v-show="orderId"
            class="focus:ring-2 focus:ring-primary"
            aria-label="Back to my account"
            @click="$bus.emit('aria-announce','Navigating back to My Account')"
          >
            <Icon
              name="arrow-right"
              class="rotate-180 w-6 h-6 mr-4"
              aria-hidden="true"
            />
          </NuxtLink>
          <span>
            Order #{{ orderId ? orderId : orderData?.increment_id }}
          </span>
        </h1>
      </div>
      <p class="text-sm text-gray-600">
        Order Placed
        <time :datetime="orderData?.created_at || ''" class="font-medium text-gray-900">
          {{ formattedOrderDate(orderData?.created_at) }}
        </time>
      </p>
    </div>

    <!-- Order Status -->
    <div class="p-4 sm:px-6 bg-gray-100" v-if="orderData && orderData?.status != 'canceled'"
      role="region"
      aria-label="Order status"
    >
      <h2 class="sr-only">Order Status</h2>
      <div class="flex justify-between">
        <p class="text-sm lg:text-base font-medium">
          <!-- Completed -->
          <template v-if="orderData?.status === 'completed'">
            Shipped On:
            <time :datetime="orderData.delivery_date">
              {{ formattedOrderDate(orderData.delivery_date) }}
            </time>
          </template>

          <!-- All other statuses -->
          <template v-else>
            Estimated Ship Date :
            <span v-for="(d, i) in estimatedShipText" :key="i" v-show="estimatedShipText?.length">
              <time :datetime="d">{{ formattedOrderDate(d) }}</time>
              <span v-if="i === 0 && estimatedShipText.length === 2"> - </span>
            </span>
            <span v-show="!estimatedShipText?.length">
              N/A
            </span>
          </template>
        </p>
        <template v-if="orderData?.tracking_number">
            <a :href="getTrackingUrl" target="_blank" class="text-primary underline mt-2 inline-block">
              {{ orderData?.tracking_number }}
            </a>
        </template>
      </div>

      <!-- Order Progress -->
      <div class="mt-4" aria-hidden="true" v-show="orderData">
        <div class="overflow-hidden rounded-full bg-gray-200">
          <div
            class="h-2 rounded-full bg-primary"
            :style="{ width: progressWidth }"
          />
        </div>
       <div
          class="mt-3 grid gap-2 text-xs sm:text-sm font-medium"
          :class="`grid-cols-${progressColumns.length}`"
        >
          <div
            v-for="(label, index) in progressColumns"
            :key="label"
            :class="[
              shipmentStep >= index + 1 ? 'text-primary' : 'text-gray-500',
              index === progressColumns.length - 1
                ? 'text-right'
                : index === 0
                ? 'text-left'
                : 'text-center'
            ]"
          >
            <div class="inline-flex items-center gap-1 justify-center">
              {{ label }}
               <div class="relative">
                      <Tooltip :text="orderData?.shipment_status" v-if="label !== 'Order Placed' && shipmentStep == index + 1">
                        <Icon
                              name="info"
                              class="w-4 h-4"
                              aria-hidden="true"
                            />
                    </Tooltip>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products -->
    <section aria-labelledby="products-heading" class="mt-6 flex flex-col sm:flex-row gap-4 lg:gap-12" v-if="!loading && orderData">

      <!-- Sidebar -->
      <div class="border-t border-gray-200 pt-4 sm:max-w-xs w-full order-1 sm:order-0">
        <dl class="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-6 text-sm">
          <div>
            <dt class="font-medium">Contact Information</dt>
            <dd class="mt-3">
                <div class="mt-2 rounded-lg text-sm">
                  <address class="not-italic break-words">
                    {{ billingAddress?.first_name }} {{ billingAddress?.last_name }}<br />
                    {{ displayPhone(billingAddress?.phone, billingAddress?.country) }}<br />
                    {{ billingAddress?.email }}
                  </address>
                </div>
            </dd>
          </div>
          <div v-if="billingAddress">
            <dt class="font-medium">Billing Address</dt>
            <dd class="mt-3">
              <OrderAddress :address="billingAddress" />
            </dd>
          </div>
          <div v-if="shippingAddress">
            <dt class="font-medium">Shipping Address</dt>
            <dd class="mt-3">
              <OrderAddress :address="shippingAddress" />
            </dd>
          </div>
          <div class="sm:border-t border-gray-200 sm:pt-6">
            <dt class="font-medium">Payment Information</dt>
            <dd class="-ml-4 -mt-1 flex flex-wrap">
              <div class="ml-4 mt-4">
                <p>{{ getPaymentMethod }}</p>
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Product List -->
      <div class="flex-1 order-0 sm:order-1">
        <h2 id="products-heading" class="sr-only">Products purchased</h2>
        <div class="sm:space-y-4">
          <div v-for="(item, index) in products" :key="index" class="border-t border-gray-200 bg-white sm:border">
            <div class="py-3 sm:py-6 sm:px-6 flex gap-x-8">
              <MediaImage :src="item" :alt="item?.product?.name"
                className="aspect-square shrink-0 object-cover w-16 h-16 sm:w-32 sm:h-32 border border-gray-200" />
              <div class="flex flex-1 flex-col sm:ml-6">
                <div class="flex justify-between">
                  <div class="flex gap-3">
                    <div>
                      <h3 class="text-base font-gill-sans">
                        <NuxtLink
                          :to="getRedirectUrl(item?.product)"
                          :title="item?.product?.url_key"
                          class="focus:ring-2 focus:ring-primary"
                          :aria-label="`View product ${item?.product?.name}, SKU: ${item?.product?.sku}, Price: ${ item?.additional?.certificate
                            ? 'Free'
                            : formattedPrice(item.price)
                          }`"
                          @click="$bus.emit('aria-announce','Opening product details for ' + item?.product?.name)"
                        >
                          {{ item?.product?.name }}
                        </NuxtLink>
                      </h3>
                      <p class="mt-2 text-sm" v-show="!item?.additional?.certificate">
                        <span class="font-normal">Item :</span>
                        {{ item?.product?.sku }}
                      </p>
                    </div>
                  </div>
                  <div class="ml-auto">
                    <p class="sm:mt-2 text-sm">
                      {{ item?.additional?.certificate
                        ? 'Free'
                        : formattedPrice(item.price)
                      }}
                    </p>
                  </div>
                </div>

                <AdditionalData :item="item" />
              </div>
            </div>
          </div>
        </div>

        <ViewOrderSummary :orderData="orderData" :loading="loading" :className="'sm:hidden'" />
      </div>
    </section>

    <ViewOrderSummary :orderData="orderData" :loading="loading" :className="'hidden sm:block mt-16'" />
  </div>
</template>

<script>
import api from '~/api-client/rest-api/index';
import { formatPhoneByCountry } from '@/utils/phoneFormatter.js';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import Icon from '~/components/common/Icon.vue';
import OrderAddress from '~/components/checkout/OrderAddress.vue';
import AdditionalData from '~/components/checkout/AdditionalData.vue';
import ViewOrderSummary from '~/components/common/ViewOrderSummary.vue';
import MediaImage from "~/components/common/MediaImage.vue";
import { redirectionUrl } from "~/utils/universalHelper";
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import KEYS from '~/utils/constant';
import Tooltip from '~/components/ui/Tooltip.vue';
import sweetAlert from "~/mixin/sweetAlert";

export default {
  name : "ViewOrderPage",
  mixins: [sweetAlert],
  components: { CustomLoader, Icon, OrderAddress, AdditionalData, ViewOrderSummary, MediaImage, Tooltip },
  data() {
    return {
      products: [],
      open: false,
      orderId: null,
      loading: true,
      orderData: '',
      billingAddress: '',
      shippingAddress: '',
      steps: {
        'pending': 0,
        'pending_payment': 0,
        'processing': 1,
        'shipped': 2,
        'completed': 3,
        'closed': 3,
        // 'canceled' : 6,
      },
      queryToken: '',
      myAccountPath: STATIC_ROUTES.MY_ACCOUNT,
      showPop: false,
      selectedStatus: ''
    };
  },
  async mounted() {
    this.$bus.emit("aria-announce", "Order details page loaded");
    this.queryToken = this.$route.query.token || null;
    if (this.queryToken) { await this.getSingleOrder(); return; }
    this.orderId = this.$route.params.orderId;
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.$bus.emit(
        "aria-announce",
        "Redirecting to login page"
      );
      return this.$router.push(STATIC_ROUTES.LOGIN);
    }
    if (this.orderId) await this.getOrders();
  },
  computed: {
    getTrackingUrl() {
      return KEYS.FEDEX_TRACKING_URL + this.orderData?.tracking_number;
    },
    progressWidth() {
      const total = this.progressColumns.length;

      if (this.shipmentStep === total) {
        return '100%';
      }

      return `calc(((${this.shipmentStep} - 0.5) / ${total}) * 100%)`;
    },
    shipmentStep() {
      const status = (this.orderData?.shipment_status || '').trim().toLowerCase();

      switch (status) {
        case '':
        case 'shipping':
        case 'preparing for shipment':
          return 2;

        case 'shipped':
          return 3;

        case 'in transit':
        case 'picked up':
        case 'ready for pickup':
          return 4;

        case 'delivered':
          return this.hasDelayedStatus ? 6 : 5;

        case 'delayed':
        case 'delivery exception':
        case 'shipment exception':
        case 'clearance delay':
          return 5;

        default:
          return 4;
      }
    },

    hasDelayedStatus() {
      const status = (this.orderData?.shipment_status || '').trim().toLowerCase();

      return [
        'delayed',
        'delivery exception',
        'shipment exception',
        'clearance delay'
      ].includes(status);
    },

    progressColumns() {
      const columns = [
        'Order Placed',
        'Preparing for Shipment',
        'Shipped',
        'In Transit'
      ];

      if (this.hasDelayedStatus) {
        columns.push('Delayed');
      }

      columns.push('Delivered');

      return columns;
    },
    areAddressesEqual() {
      if (!this.billingAddress || !this.shippingAddress) return false;
      if (this.billingAddress === this.shippingAddress) return true;
      const keys1 = Object.keys(this.billingAddress);
      const keys2 = Object.keys(this.shippingAddress);
      if (keys1.length !== keys2.length) return false;
      for (let key of keys1) {
        if (key === 'id') continue;
        if (key === 'address1') {
          if (String(this.billingAddress[key]).trim() !== String(this.shippingAddress[key]).trim()) {
            return false;
          }
        } else if (this.billingAddress[key] !== this.shippingAddress[key]) {
          return false;
        }
      }
      return true;
    },
    getSteps() {
      return this.steps[this.orderData?.status] ?? 1;
    },
    estimatedShipText() {
      const est = this.orderData?.estimated_ship_date;
      if (!est?.start_date) return [];

      const start = new Date(est.start_date);
      const end = est.end_date ? new Date(est.end_date) : null;

      // start == end → single date
      if (!end || start.getTime() === end.getTime()) {
        return [est.start_date];
      }

      // range
      return [est.start_date, est.end_date];
    },
    getPaymentMethod() {
      const paymentObject = this.orderData?.payment;
      if(paymentObject?.additional?.card_brand && paymentObject?.additional?.card_last4) {
        return `${paymentObject?.additional?.card_brand} ending in ${paymentObject?.additional?.card_last4}`;
      }
      return this.orderData?.payment_title || 'N/A';
    }
  },
  methods: {
    displayPhone(phone = null, country = 'US') {
      return formatPhoneByCountry(phone, country);
    },
    getRedirectUrl(item) {
      return redirectionUrl(item);
    },
    formattedPrice(price) {
        if (price === 0) return this.$formatPrice(0);
        if (price) return this.$formatPrice(parseFloat(price), true);
    },
    async getOrders() {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        };
        const response = await api.getRequest(this.$axios,this.$cookies, `customer/order/${this.orderId}?token=true`, {}, config);
        this.loading = false;
        if (response.status !== 200 || !response.data) {
          console.log(response?.data?.message || 'Internal Server Error');
          return;
        }
        if (response?.data?.data) {
          this.orderData = response?.data?.data;
          this.billingAddress = response?.data?.data?.billing_address;
          this.shippingAddress = response?.data?.data?.shipping_address;
          this.products = this.orderData?.items;

          this.$bus.emit(
            "aria-announce",
            `Order ${this.orderData?.increment_id} details loaded.`
          );
        }
      } catch (error) {
        console.error(error);
        console.log('An unexpected error occurred');
      } finally {
        this.loading = false;
      }
    },
    async getSingleOrder() {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${this.queryToken}`,
          }
        };
        const response = await api.getRequest(this.$axios,null, `customer/verify-token`, {}, config);
        this.loading = false;
        if (response.status !== 200 || !response.data) {
          this.$router.push(STATIC_ROUTES.LOGIN);
          console.log(response?.data?.message || 'Internal Server Error');
          return;
        }
        if (response?.data?.data) {
          this.orderData = response?.data?.data;
          this.billingAddress = response?.data?.data?.billing_address;
          this.shippingAddress = response?.data?.data?.shipping_address;
          this.products = this.orderData?.items;

          this.$bus.emit(
            "aria-announce",
            `Order ${this.orderData?.increment_id} details loaded`
          );
        }
      } catch (error) {
        console.error(error);
        this.$router.push(STATIC_ROUTES.LOGIN);
        console.log('An unexpected error occurred');
      } finally {
        this.loading = false;
      }
    },
    formattedOrderDate(date) {
			return (date) ? new Date(date).toLocaleString('en-us', {
				month: 'short', // Abbreviated month name (e.g., 'Jul')
				day: 'numeric', // Day of the month
				year: 'numeric' // Full year (e.g., '2021')
			}) : '-';
		}
  },
  head() {
        //VIEW ORDER SEO INDEXING OFF
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex' }
            ]
        };
    },
}
</script>
