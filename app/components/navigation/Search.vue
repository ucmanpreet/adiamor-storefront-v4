<template>
  <div ref="root" class="sm:relative z-40" v-click-outside="onClickOutside"><!--v-on:focusout="handleFocusOut"-->
    <div class="relative">
      <button type="button" @click="openSearchInput" aria-label="Open search"
        class="absolute top-1/2 -translate-y-1/2 right-0 z-50 py-2 flex items-center">
        <Tooltip :text="`Search`">
          <Icon name="search" class="w-4 h-4" aria-hidden="true"/>
        </Tooltip>
      </button>
    </div>
    <div v-if="inputSearchShow">
      <div class="fixed -z-0 bottom-0 inset-x-0 top-auto h-[calc(100dvh-97px)] sm:hidden bg-black/20 touch-none" @click="inputSearchShow = false"></div>
      <div
        class="absolute -mt-[34px] pt-2.5 sm:pt-0 sm:-mt-0 sm:-mr-2.5 inset-x-0 sm:left-auto z-40 translate-y-full sm:translate-y-0 sm:-top-3 sm:right-0 bg-white sm:bg-transparent border-x border-gray-200 shadow-xl border-b sm:border-0" role="region" aria-label="Search results">
        <div class="relative p-2 sm:p-0">
          <InputField name="search" type="search" aria-label="Search products"
            inputClass="-mt-6 z-10 rounded-none outline-none bg-gray-200 text-black sm:!w-80 sm:!border-x-0 sm:!border-t-0 !border-primary sm:!pr-8 relative z-10 placeholder:text-gray-700 focus:!ring-0"
            placeholder="Search Here" :error="false" v-model="search" ref="searchInput" @redirect="redirectTo" @enter="redirectTo"/>
          <div v-if="search"
            class="flex flex-col absolute inset-x-0 z-40 right-0 bg-white text-sm mt-2 sm:mt-0 sm:w-80 divide-y divide-gray-200 shadow-2xl border-b border-primary sm:border-x sm:border-x-gray-200">
            <ul class="px-4 sm:px-2 max-h-80 overflow-auto" role="listbox" aria-label="Search suggestions">
              <li v-if="loading" aria-live="polite" aria-busy="true" class="py-2 space-y-3">
                <HeaderSearchSkeleton />
              </li>
              <li v-if="!loading && relatedSearch && relatedSearch.length">
                <h2 class="mb-2 mt-2 px-1 text-xs font-semibold text-gray-500">Related Search</h2>
                <ul class="text-sm text-gray-700">
                  <li v-for="(item, index) in relatedSearch" :key="index" class="group">
                    <NuxtLink v-if="item.slug" :to="`/${item.slug}/search`" @click="closeAfterRedirection()" :aria-label="`Search for ${item.name}`"
                      class="flex cursor-default select-none items-center px-1 py-2 hover:bg-primary/5 border border-white hover:border-primary">
                      <Icon name="search" class="w-4 h-4 mt-0.5" aria-hidden="true"/>
                      <span class="Resule ml-3 flex-auto">
                        <span v-html="$sanitize(highlightText(item?.name))"></span>
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <li v-if="!loading && productList && productList.length">
                <h2 class="mb-2 mt-2 px-1 text-xs font-semibold text-gray-500">Products</h2>
                <ul class="text-sm text-gray-700">
                  <li v-for="(product, index) in productList" :key="index" class="group">
                    <NuxtLink :to="`${correctUrl(product.url_key)}`" @click="closeAfterRedirection()"
                      :aria-label="hasDiscount(product)
                        ? `View product ${product.name}, original price ${product.price_formatted}, discounted price ${product.discount_price_formatted}`
                        : `View product ${product.name}, price ${product.price_formatted}`"
                      class="flex cursor-default select-none px-1 py-2 hover:bg-primary/5 border border-white hover:border-primary">
                      <MediaImage :src="product?.thumbnail_url" :bgColor="productBgColors[index]" :ratio="getLWRatio(product)" alt="" aria-hidden="true" :parentClass="`w-12 !h-12 border border-gray-200 flex items-center justify-center ${Object.keys(getLWRatio(product)).length ? '' : 'object-contain'}`" :className="`max-w-full max-h-full`" />
                      <span class="ml-3 flex-auto flex flex-col">
                        <span v-html="$sanitize(highlightText(product?.name))"></span>
                        <span>
                          <span class="line-through text-gray-400 text-sm" v-if="hasDiscount(product)">{{ product.price_formatted }}</span>
                          <span class="font-medium text-sm sm:text-base" :class="{ 'text-reddish-orange': hasDiscount(product) }">
                            {{ hasDiscount(product) ? product.discount_price_formatted : product.price_formatted }}
                          </span>
                        </span>
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="flex cursor-default select-none items-center px-2 py-3 border border-white"
                v-if="!loading && (productList && !productList.length) && (relatedSearch && !relatedSearch.length)" aria-live="polite">
                No Record Found
              </li>
            </ul>
            <div v-if="!loading && relatedSearch && relatedSearch.length || !loading && productList && productList.length"
              class="mt-auto">
              <NuxtLink :to="`/keyword?q=${encodeURIComponent(search)}`" @click="closeAfterRedirection()"
                class="flex items-center p-2 hover:bg-primary/5 border border-white hover:border-primary gap-1" :aria-label="`See more results for ${search}`">See more result for <q class="font-semibold">{{ search }}</q></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { debounce } from '~/utils/debounce.js';
import Tooltip from '~/components/ui/Tooltip.vue';
import Icon from "~/components/common/Icon.vue";
import InputField from '~/components/ui/InputField.vue';
import Modal from '~/components/ui/Modal.vue';
import MediaImage from "~/components/common/MediaImage.vue";
import { correctUrl, extractDominantColor } from "~/utils/universalHelper";
import KEYS from "~/utils/constant.js";
import HeaderSearchSkeleton from '../skeleton/HeaderSearchSkeleton.vue';

const emit = defineEmits(['update:activeDropdown']);

const { $bus, $formatPrice } = useNuxtApp();
const store = useMainStore();
const router = useRouter();
const api = useApi();
const { createSwalAlert } = useAlert();

const root = ref(null);
const searchInput = ref(null);

const inputSearchShow = ref(false);
const search = ref('');
const relatedSearch = ref([]);
const productList = ref([]);
const loading = ref(true);
const productSkuMatch = ref(null);
const productBgColors = ref({});

watch(search, debounce((newVal, oldValue) => {
  if (newVal && inputSearchShow.value) {
    handleSearch();
  }
  else { loading.value = true; relatedSearch.value = []; productList.value = []; inputSearchShow.value = false; };
}, 1500));

function hasDiscount(product) {
  const parse = s => parseFloat((s || '').replace(/[^0-9.]/g, '')) || 0;
  const discount = parse(product?.discount_price_formatted);
  const regular = parse(product?.price_formatted);
  return discount > 0 && discount < regular;
}
async function redirectTo() {
  if (search.value && inputSearchShow.value) {
    let redirectUrl = `/keyword?q=${search.value}`;
    if (productSkuMatch.value){
       redirectUrl = `${correctUrl(productSkuMatch.value)}`;
    }else{
      let productUrl = await store.isProductAvailable({ q: search.value });
      if (productUrl) {
        redirectUrl = productUrl;
      }
    }
    gtmSearchEvent();
    sessionStorage.setItem('fromSearch', '1');
    router.push(correctUrl(redirectUrl));
    closeAfterRedirection();
  }
}
function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
function closeAfterRedirection() {
  sessionStorage.setItem('fromSearch', '1');
  inputSearchShow.value = false;
  onClickOutside();
}
function handleFocusOut(event) {
  const relatedTarget = event.relatedTarget;
  if (!root.value.contains(relatedTarget)) {
    inputSearchShow.value = false;
  }
}
function openSearchInput() {
  inputSearchShow.value = !inputSearchShow.value;  // Toggle the dropdown
  nextTick(() => {
    let el = document.getElementById('input_field');
    el ? el.focus() : '';
  });
  emit('update:activeDropdown', '');
}
function highlightText(text) {
  if (!search.value) return text;
  const regex = new RegExp(`(${search.value})`, 'gi');
  return text.replace(regex, `<span class="text-sm font-medium">$1</span>`);
}
async function handleSearch() {
  try {
    // Same request as the old api-client getRequest: currency/locale appended, errors alerted and swallowed
    const countryData = useCookie('countryData').value;
    let response;
    try {
      response = await api.request('get', `search?q=${search.value}&limit=10&currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`);
    } catch (err) {
      createSwalAlert(err.message || 'Internal Server Error', 'error');
      response = { data: { message: err.message, success: false } };
    }
    if (!response) {
      loading.value = false;
      return;
    }
    loading.value = false;

    if (response && response.data && response.status) {
      relatedSearch.value = response.data?.suggestions ?? [];
      productList.value = response.data?.data ?? [];
      if (productList.value && productList.value.length) {
        let productUrl = productList.value.find(item => item.sku?.toLowerCase().includes(search.value.toLowerCase()));
        productSkuMatch.value = productUrl?.url_key;
        extractProductColors();
      } else {
        productSkuMatch.value = null;
        productBgColors.value = {};
      }

      const total = productList.value.length + relatedSearch.value.length;
      const parts = [];
      if (productList.value.length) parts.push(`${productList.value.length} product${productList.value.length > 1 ? 's' : ''}`);
      if (relatedSearch.value.length) parts.push(`${relatedSearch.value.length} related search${relatedSearch.value.length > 1 ? 'es' : ''}`);
      const message = total > 0 ? `${parts.join(' and ')} found for ${search.value}` : `No results found for ${search.value}`;
      $bus.emit('aria-announce', message);

      // if (total > 0) {
      //   setTimeout(() => {
      //     const firstLink = root.value.querySelector('[role="listbox"] a');
      //     if (firstLink) firstLink.focus();
      //   }, 1500);
      // }
      // inputSearchShow.value = false;
      // search.value = '';
    }
  } catch (error) {
    loading.value = false;
  }
}
async function extractProductColors() {
  const colors = {};
  await Promise.all(
    productList.value.map(async (product, index) => {
      if (product?.thumbnail_url) {
        colors[index] = await extractDominantColor(product.thumbnail_url);
      }
    })
  );
  productBgColors.value = colors;
}
async function gtmSearchEvent() {
  let gtmEventData =  {
          "product_type": 'keyword',
          "name": 'keyword',
          "values": [search.value]
      };
  await store.runGtmEvent({ action_type: 'keyword_search', txnId: null, additionalData : { filters : [gtmEventData] } });
}
function onClickOutside() {
  search.value = '';
  inputSearchShow.value = false;
  loading.value = true;
  productSkuMatch.value = null;
  relatedSearch.value = [];
  productList.value = [];
  // search.value = '';
}
function getLWRatio(item) {
    if (!item) return {};
    const url = item?.thumbnail_url || '';
    if (!url.includes('sample')) return {};
    const shape = (item?.diamond_shape || '').toLowerCase();
    if (shape === 'heart') return {};
    const shapeKey = Object.keys(KEYS.DIAMOND_SHAPE_LW_RATIOS).find(key => key === shape);
    const measurements = item?.diamond_ratio;
    if (!measurements || measurements <= 0) return {};
    if (shapeKey) {
        const lwRatio = KEYS.DIAMOND_SHAPE_LW_RATIOS[shapeKey];
        if (!lwRatio) return {};
        const m = parseFloat(measurements);
        if (shape === 'radiant' || shape === 'pear' || shape === 'emerald') {
            return { aspectRatio: `${lwRatio} / ${m}` };
        }
        return { aspectRatio: `${m} / ${lwRatio}` };
    }
    return {};
}
</script>