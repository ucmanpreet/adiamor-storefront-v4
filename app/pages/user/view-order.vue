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

<script setup>
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

const api = useApi();
const route = useRoute();
const router = useRouter();
const { $bus, $formatPrice } = useNuxtApp();
const { createSwalAlert } = useAlert();

const products = ref([]);
const open = ref(false);
const orderId = ref(null);
const loading = ref(true);
const orderData = ref('');
const billingAddress = ref('');
const shippingAddress = ref('');
const steps = {
  'pending': 0,
  'pending_payment': 0,
  'processing': 1,
  'shipped': 2,
  'completed': 3,
  'closed': 3,
  // 'canceled' : 6,
};
const queryToken = ref('');
const myAccountPath = STATIC_ROUTES.MY_ACCOUNT;
const showPop = ref(false);
const selectedStatus = ref('');
const token = ref(undefined);

onMounted(async () => {
  $bus.emit("aria-announce", "Order details page loaded");
  queryToken.value = route.query.token || null;
  if (queryToken.value) { await getSingleOrder(); return; }
  orderId.value = route.params.orderId;
  token.value = localStorage.getItem('token');
  if (!token.value) {
    $bus.emit(
      "aria-announce",
      "Redirecting to login page"
    );
    return router.push(STATIC_ROUTES.LOGIN);
  }
  if (orderId.value) await getOrders();
});

const getTrackingUrl = computed(() => {
  return KEYS.FEDEX_TRACKING_URL + orderData.value?.tracking_number;
});
const progressWidth = computed(() => {
  const total = progressColumns.value.length;

  if (shipmentStep.value === total) {
    return '100%';
  }

  return `calc(((${shipmentStep.value} - 0.5) / ${total}) * 100%)`;
});
const shipmentStep = computed(() => {
  const status = (orderData.value?.shipment_status || '').trim().toLowerCase();

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
      return hasDelayedStatus.value ? 6 : 5;

    case 'delayed':
    case 'delivery exception':
    case 'shipment exception':
    case 'clearance delay':
      return 5;

    default:
      return 4;
  }
});
const hasDelayedStatus = computed(() => {
  const status = (orderData.value?.shipment_status || '').trim().toLowerCase();

  return [
    'delayed',
    'delivery exception',
    'shipment exception',
    'clearance delay'
  ].includes(status);
});
const progressColumns = computed(() => {
  const columns = [
    'Order Placed',
    'Preparing for Shipment',
    'Shipped',
    'In Transit'
  ];

  if (hasDelayedStatus.value) {
    columns.push('Delayed');
  }

  columns.push('Delivered');

  return columns;
});
const areAddressesEqual = computed(() => {
  if (!billingAddress.value || !shippingAddress.value) return false;
  if (billingAddress.value === shippingAddress.value) return true;
  const keys1 = Object.keys(billingAddress.value);
  const keys2 = Object.keys(shippingAddress.value);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (key === 'id') continue;
    if (key === 'address1') {
      if (String(billingAddress.value[key]).trim() !== String(shippingAddress.value[key]).trim()) {
        return false;
      }
    } else if (billingAddress.value[key] !== shippingAddress.value[key]) {
      return false;
    }
  }
  return true;
});
const getSteps = computed(() => {
  return steps[orderData.value?.status] ?? 1;
});
const estimatedShipText = computed(() => {
  const est = orderData.value?.estimated_ship_date;
  if (!est?.start_date) return [];

  const start = new Date(est.start_date);
  const end = est.end_date ? new Date(est.end_date) : null;

  // start == end → single date
  if (!end || start.getTime() === end.getTime()) {
    return [est.start_date];
  }

  // range
  return [est.start_date, est.end_date];
});
const getPaymentMethod = computed(() => {
  const paymentObject = orderData.value?.payment;
  if (paymentObject?.additional?.card_brand && paymentObject?.additional?.card_last4) {
    return `${paymentObject?.additional?.card_brand} ending in ${paymentObject?.additional?.card_last4}`;
  }
  return orderData.value?.payment_title || 'N/A';
});

function displayPhone(phone = null, country = 'US') {
  return formatPhoneByCountry(phone, country);
}
function getRedirectUrl(item) {
  return redirectionUrl(item);
}
function formattedPrice(price) {
  if (price === 0) return $formatPrice(0);
  if (price) return $formatPrice(parseFloat(price), true);
}
// GET helper: same contract as the old axios `getRequest` wrapper (never throws; `withLocale` appends currency/locale from the countryData cookie)
async function getRequest(url, headers, withLocale = false) {
  if (withLocale) {
    const countryData = useCookie('countryData').value;
    url += url.includes('?') ? '&' : '?';
    url += `currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
  }
  try {
    return await api.request('get', url, { headers });
  } catch (error) {
    if (error.status === 401) {
      createSwalAlert('Session expired. Please log in again.', 'error');
      window.location.href = STATIC_ROUTES.LOGIN;
    } else {
      createSwalAlert(error.message || 'Internal Server Error', 'error');
    }
    return { data: { message: error.message, success: false } };
  }
}
async function getOrders() {
  try {
    const headers = {
      'Authorization': `Bearer ${token.value}`,
    };
    const response = await getRequest(`customer/order/${orderId.value}?token=true`, headers, true);
    loading.value = false;
    if (response.status !== 200 || !response.data) {
      console.log(response?.data?.message || 'Internal Server Error');
      return;
    }
    if (response?.data?.data) {
      orderData.value = response?.data?.data;
      billingAddress.value = response?.data?.data?.billing_address;
      shippingAddress.value = response?.data?.data?.shipping_address;
      products.value = orderData.value?.items;

      $bus.emit(
        "aria-announce",
        `Order ${orderData.value?.increment_id} details loaded.`
      );
    }
  } catch (error) {
    console.error(error);
    console.log('An unexpected error occurred');
  } finally {
    loading.value = false;
  }
}
async function getSingleOrder() {
  try {
    const headers = {
      'Authorization': `Bearer ${queryToken.value}`,
    };
    const response = await getRequest(`customer/verify-token`, headers);
    loading.value = false;
    if (response.status !== 200 || !response.data) {
      router.push(STATIC_ROUTES.LOGIN);
      console.log(response?.data?.message || 'Internal Server Error');
      return;
    }
    if (response?.data?.data) {
      orderData.value = response?.data?.data;
      billingAddress.value = response?.data?.data?.billing_address;
      shippingAddress.value = response?.data?.data?.shipping_address;
      products.value = orderData.value?.items;

      $bus.emit(
        "aria-announce",
        `Order ${orderData.value?.increment_id} details loaded`
      );
    }
  } catch (error) {
    console.error(error);
    router.push(STATIC_ROUTES.LOGIN);
    console.log('An unexpected error occurred');
  } finally {
    loading.value = false;
  }
}
function formattedOrderDate(date) {
  return (date) ? new Date(date).toLocaleString('en-us', {
    month: 'short', // Abbreviated month name (e.g., 'Jul')
    day: 'numeric', // Day of the month
    year: 'numeric' // Full year (e.g., '2021')
  }) : '-';
}

//VIEW ORDER SEO INDEXING OFF
useHead({
  meta: [
    { key: 'robots', name: 'robots', content: 'noindex' }
  ]
});
</script>
