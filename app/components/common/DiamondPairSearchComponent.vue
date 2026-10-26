<template>
    <div>
        <!-- Top panel -->
        <SearchBanner :filterList="filterList" :originCode="getOriginCode" :key="updateResetKey" />

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-8">
            <div class="flex xl:gap-6">
                <!-- Filter Side menu -->
                <CustomFilter v-show="isFilterShow && filterList" :filterList="filterList" v-model:isFilter="isFilterShow"
                    @closeFilter="isFilterShow = false" v-model:filterData="filterData" />

                <!-- Diamond List -->
                <div class="w-full relative" ref="productContainer">
                    <!-- FIlter Sticky Header -->
                    <div class="flex flex-col sticky z-40 bg-white border-b border-gray-200 top-0">
                        <!-- Shipping -->
                        <div
                            class="flex gap-1 sm:gap-3 items-center py-3 sm:min-h-[65px] border-b border-gray-200 justify-between">
                            <!-- Desktop -->
                            <Button type="button" colorType="primary" class="font-normal hidden sm:block xl:hidden"
                                @click="toggleFilter()" aria-label="Open filters">
                                <span class="inline-block">Filters</span>
                            </Button>
                            <div class="flex items-center gap-1 sm:gap-4 w-full sm:w-auto xl:ml-auto"
                                v-show="!selectedTab">
                                <div class="flex gap-1 sm:gap-3 w-full">
                                    <div class="text-sm flex gap-2 items-center cursor-pointer relative">
                                        <label for="shippingSoon"
                                            class="text-sm flex gap-2 items-center cursor-pointer relative"
                                            @click.self.stop>
                                            <input type="checkbox" id="shippingSoon" name="shippingSoon"
                                                class="peer h-4 w-4 appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto cursor-pointer"
                                                v-model="shipping" @keypress="shippingUpdated()"
                                                @input="shippingUpdated()" />
                                            <Icon name="truck" class="w-5 h-5 text-custom-green" />
                                            <svg class="hidden absolute peer-checked:block z-20 pointer-events-none w-4 h-4 self-center justify-self-center text-white"
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                            <span class="hidden sm:block lg:hidden xl:block">Shipping Soon</span>
                                            <span class="block sm:hidden">Ships Soon</span>
                                        </label>

                                        <!-- Tooltip -->
                                        <div v-if="showFastShippingTooltip"
                                            v-click-outside="showFastShippingTooltip = false"
                                            class="absolute border border-black shadow-xl rounded-md bg-white translate-y-full sm:translate-y-0 sm:-translate-x-full sm:-left-5 p-2 flex gap-2 min-w-[16.6rem] after:content-[''] after:bg-white after:border-l-0 after:border-t-0 after:border after:border-black after:h-[15px] after:-bottom-[8px] after:top-0 sm:after:top-1/2 after:-translate-y-1/2 after:sm:right-[-8px] after:absolute after:w-[15px] after:transform after:rotate-[227deg] sm:after:rotate-[-45deg] z-30"
                                            role="dialog" aria-modal="false">
                                            <icon name="fast-shipping" class="size-8 flex-none" aria-hidden="true" />
                                            <div class="space-y-1 relative pr-6">
                                                <button type="button" @click="showFastShippingTooltip = false"
                                                    class="absolute top-0 right-0 cursor-pointer"
                                                    aria-label="Close shipping tooltip">
                                                    <icon name="close" class="size-4" aria-hidden="true" />
                                                </button>
                                                <h2 class="!font-semibold">On a deadline?</h2>
                                                <p class="text-xs">Show me what arrives the soonest.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tabs + Reset -->
                        <div class="flex sm:items-center flex-row gap-2 justify-between -mt-1 py-4">
                            <!-- Tabs -->
                            <TabComponent class="block" :tabs="tabs" v-model:selectedTab="selectedTab"
                                @update:selectedTab="selectedTab = $event" :key="selectedTab" />
                            <!-- Mobile reset Button -->
                            <button type="button" aria-label="Reset applied filters" @click="clearFilters"
                                class="text-xs font-light flex items-center gap-1"
                                :class="{ 'hidden': !Object.keys(appliedFilterJson)?.length || !$isMobile }">Reset
                                <Icon name="reset" class="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                        <!-- Applied Filters -->
                        <AppliedFilter :appliedFilterJson="appliedFilterJson" @removeFilter="removeFilter"
                            @clearFilter="clearFilters" :filterList="filterList"
                            v-if="Object.keys(appliedFilterJson)?.length" v-show="!selectedTab" />

                        <!-- Add Header with Sortign Icon -->
                        <SortingHeader :filterList="filterList" @sortdata="sortFilterList" :isComapreTab="selectedTab"
                            v-model:sortByColumn="sortByColumn" v-model:sortByDir="sortByDir"
                            :key="`${sortByColumn}-${sortByDir}`" />
                    </div>
                    <!-- Custom Loader -->
                    <!-- Compare Search -->
                    <div class="min-h-screen" v-show="selectedTab" role="region" aria-label="Compare diamonds">
                        <CompareSearchComponent :type="type" :viewMode="'list'" />
                    </div>

                    <!-- Results -->
                    <div class="min-h-screen" v-show="!selectedTab" role="region" aria-label="Diamond search results">
                        <client-only>
                            <div v-if="loader" role="status" aria-busy="true" aria-label="Loading diamonds"
                                class="divide-y divide-gray-200">
                                <span class="sr-only">Loading diamonds...</span>
                                <DiamondPairSearchInsideSkeleton v-for="n in 10" :key="n" />
                            </div>
                            <template v-else-if="filteredList?.length">
                                <div ref="listContainer" class="relative"
                                    :style="{ height: `${listVirtualizer.getTotalSize()}px` }">
                                    <div v-for="virtualRow in listVirtualRows" :key="virtualRow.key"
                                        :data-index="virtualRow.index"
                                        :ref="(el) => listVirtualizer.measureElement(el)"
                                        class="absolute top-0 left-0 w-full"
                                        :style="{ transform: `translateY(${virtualRow.start - listScrollMargin}px)` }">
                                        <template v-for="item in [filteredList[virtualRow.index]].filter(Boolean)" :key="item.pair_id">
                                    <!-- ROW WRAPPER -->
                                    <div class="w-full" :class="{
                                        'bg-gray-100': virtualRow.index % 2 === 0,
                                        'bg-primary/7': expandedSku === item.sku
                                    }">
                                        <div class="flex flex-col w-full cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-primary/7 relative min-w-full"
                                            @click.stop="toggleItem(item)">
                                            <!-- Header -->
                                            <DiamondPairListHeader :product="item" />
                                        </div>

                                        <!-- Expandable content -->
                                        <div v-if="expandedSku === item.sku">
                                            <DiamondPairListView :product="item" />
                                        </div>
                                    </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <div v-else-if="!loader && !filteredList?.length"
                                class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5">
                                <NoDataFound :type="type">
                                    <div class="max-w-sm mx-auto text-center">
                                        <p>Use the sliders above to search and compare diamonds, or call us at <a
                                                class="text-primary" :href="`tel:${telPhoneNumber}`">{{ phoneNumber
                                                }}</a>
                                            for assistance.</p>
                                        <Button type="button" colorType="primary" class="capitalize mx-auto mt-4"
                                            @click="router.push(customSearchPath)">Request a
                                            custom search</Button>
                                        <Button type="button" colorType="bordered-primary"
                                            class="capitalize mx-auto mt-4" @click="clearFilters()">Reset
                                            search</Button>
                                    </div>
                                </NoDataFound>
                            </div>
                        </client-only>

                        <!-- MOBILE -->
                        <div v-if="!loader" class="sm:hidden fixed inset-x-3 bottom-3 z-50 bg-white md:static">
                            <Button type="button" colorType="primary" aria-label="Open filters"
                                class="font-normal w-full flex items-center !text-base gap-1 !border-0"
                                @click="toggleFilter()">
                                <span class="inline-block">Filters </span>
                                <!-- <span v-if="correctFilterCount">({{ correctFilterCount }})</span> -->
                                <Icon name="filter" class="w-5 h-5 mt-1" aria-hidden="true" />
                            </Button>
                        </div>

                        <div v-if="bottomLoader" role="status" aria-live="polite">
                            <DiamondPairSearchInsideSkeleton v-for="n in 10" :key="n" />
                            <span class="sr-only">Loading more diamonds...</span>
                        </div>

                        <!-- infinite scroll trigger -->
                        <div ref="infiniteTrigger" id="infiniteTriggerId" style="height: 60px; margin-top: 60px"
                            aria-hidden="true"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from "~/api-client/rest-api/index.js";
import { attributeCodes } from "~/utils/searchConstant";
import { diamondFilters } from '@/static/js/recommendedFilters';
import { useWindowVirtualizer } from '@tanstack/vue-virtual';
import DiamondPairListView from "./DiamondPairListView.vue";
import DiamondPairListHeader from "./DiamondPairListHeader.vue";
import SearchBanner from "~/components/common/SearchBanner.vue";
import TabComponent from "~/components/ui/TabComponent.vue";
import AppliedFilter from "~/components/common/AppliedFilter.vue";
import SortingHeader from "~/components/sorting/SortingHeader.vue";
import CompareSearchComponent from "~/components/common/CompareSearchComponent.vue";
import DiamondPairSearchInsideSkeleton from "~/components/skeleton/DiamondPairSearchInsideSkeleton.vue";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import NoDataFound from "~/components/common/NoDataFound.vue";
import CustomFilter from "../filter/CustomFilter.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

// Referenced by name from pages/search.vue (<component :is="'DiamondPairSearchComponent'">)
defineOptions({ name: 'DiamondPairSearchComponent' });

const props = defineProps(["filterList", "filterState"]);

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const { $bus, $isMobile, $isTabAndMobile } = useNuxtApp();

const type = ref("diamond-pair");
const page = ref(1);
const limit = ref(48);
const loader = ref(false);
const isFilterShow = ref(false);
const filteredList = shallowRef([]);
const shipping = ref(false);
const showFastShippingTooltip = ref(false);
const sortByColumn = ref('price');
const sortByDir = ref('asc');
const selectedTab = ref(0);
const totalProducts = ref(0);
const isFetching = ref(false);
const lastRenderedRowIndex = ref(-1);// Store the scroller's position
const bottomLoader = ref(false);
const fetchQueue = ref([]);
const updateResetKey = ref(0);
const expandedSku = ref(null);
const isMounted = ref(false);
const isRestoredFromSession = ref(false);
const diamondCaratCode = ref('diamond_carat_weight');
const queryString = ref(null);
const customSearchPath = ref(STATIC_ROUTES.CUSTOM_SEARCH);
const firedProducts = new Set();
let _lastFiredSku = null;
let _lastFiredCount = 0;

// Properties that were set on the instance without being declared in data()
const filterData = ref();
let observer = null;
let hasFetchedOnce = false;

const productContainer = ref(null);
const listContainer = ref(null);
const listScrollMargin = ref(0);
const infiniteTrigger = ref(null);

const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));
const getOriginCode = computed(() => route.fullPath?.includes(attributeCodes.labGrownCode) ? attributeCodes.labGrownCode : attributeCodes.naturalCode);
const appliedFilterJson = computed(() => {
    let { finalFilterData } = getFilterValues();
    return finalFilterData || {};
});
const tabs = computed(() => {
    let data = [{ text: ($isMobile ? `Items` : `Results`) + ` ${totalProducts.value ? `(${totalProducts.value.toLocaleString()})` : ''} ` }];
    let compareCount = store.comparePairList?.length;
    if (!$isMobile) data.push({ text: `Compare` + ` ${compareCount ? `(${compareCount.toLocaleString()})` : ''}`, icon: 'compare-fill' });
    return data;
});

// List rows are virtualized on the window; scrollMargin is the list's distance from the top of the document.
const updateListScrollMargin = () => {
    if (!listContainer.value) return;
    listScrollMargin.value = listContainer.value.getBoundingClientRect().top + window.scrollY;
};
const listVirtualizer = useWindowVirtualizer(computed(() => ({
    count: filteredList.value?.length || 0,
    estimateSize: () => 80,
    overscan: Math.ceil(300 / 80),
    scrollMargin: listScrollMargin.value,
    getItemKey: (index) => filteredList.value?.[index]?.pair_id ?? index,
})));
const listVirtualRows = computed(() => listVirtualizer.value.getVirtualItems());
watch(() => [filteredList.value?.length, isFilterShow.value, loader.value], () => nextTick(updateListScrollMargin), { flush: 'post' });
watch(listVirtualRows, (rows) => {
    if (!rows.length) return;
    onScrollerUpdate(0, 0, rows[0].index, rows[rows.length - 1].index);
});

async function onScrollerUpdate(start, end, visibleStartIndex, visibleEndIndex) {
    let newProducts = [];
    const products = filteredList.value.slice(visibleStartIndex, visibleEndIndex + 6);
    newProducts = products.filter(product => {
        if (firedProducts.has(product.sku))
            return false;
        firedProducts.add(product.sku);
        return true;
    });
    if (!newProducts.length)
        return;

    const MAX_TRACKED = 5000;

    if(firedProducts.size > MAX_TRACKED) {
        firedProducts.clear();
    }
    await nextTick();
    fireViewItemList(newProducts);
}

async function fireViewItemList(items) {
    const normalizedItems = Array.isArray(items) ? items : [items];
    const count = normalizedItems.length;
    if (!count) return;

    const lastSku = normalizedItems[count - 1]?.sku ?? null;

    // Skip if this looks like the same batch as last time (same last SKU + same size).
    if (lastSku && lastSku === _lastFiredSku && count === _lastFiredCount) {
        return;
    }

    // Set the guard BEFORE any await — must happen synchronously so a second
    // call arriving before this one finishes still sees the updated guard.
    _lastFiredSku = lastSku;
    _lastFiredCount = count;

    await store.setProductGtmData(null);

    const gtmEventData = normalizedItems.map((item, index) => ({
        item_id: item?.sku,
        item_name: item?.name,
        index,
        item_variant: null,
        price: item?.price?.raw?.amount,
        quantity: 1,
        item_url: item?.url_key,
        item_image_url: item?.media?.thumbnail_url
    }));
    await store.setProductGtmData(gtmEventData);
    const additionalData = { item_list_name: `search-${type.value}`, skipDuplicates: true };

    await store.runGtmEvent({ action_type: 'view_item_list', txnId: null, additionalData });
}
function shippingUpdated() {
    shipping.value = !shipping.value;
    router.replace({ query: { ...route.query, shipping: shipping.value } });
}
function getRouteState() {
    return {
        filters: filterData.value,
        page: page.value,
        limit: limit.value,
        scrollY: window.scrollY,
        query: queryString.value
    }
}
function toggleItem(item) {
    expandedSku.value = expandedSku.value === item.sku ? null : item.sku
}
function defaultOutsideFilter(query = null) {
    let queryParam = query || route.query;
    if (queryParam?.sort_column) {
        sortByColumn.value = queryParam?.sort_column;
        sortByDir.value = queryParam?.sort_direction;
    }
    let queryShippingParam = queryParam?.shipping;
    if (typeof queryShippingParam === 'string') {
        shipping.value = queryShippingParam == 'true' ? 1 : 0;
    } else {
        shipping.value = queryParam?.shipping == true ? 1 : 0;
    }
}
function sortFilterList(data) {
    if (data && Object.keys(data).length) {
        sortByColumn.value = data.key;
        sortByDir.value = data.order;
        store.setFilters({ key: 'sort_column', value: data.key });
        store.setFilters({ key: 'sort_direction', value: data.order });
        store.setFilterCount();
    }
}
function assignFilters(queryParams) {
    if (queryParams && Object.keys(queryParams).length) {

        const { finalFilterData } = getFilterValues(queryParams);

        if (finalFilterData && Object.keys(finalFilterData).length) {
            store.setFilters(null);
            Object.entries(finalFilterData).forEach(([key, value]) => {
                if (!value) return;
                let filterValue = value;
                if (Array.isArray(filterValue) && filterValue.length === 0) {
                    filterValue = null;
                }
                if (
                    Array.isArray(filterValue) &&
                    filterValue.length === 1 &&
                    (filterValue[0]?.min !== undefined || filterValue[0]?.max !== undefined)
                ) {
                    filterValue = filterValue[0];
                }
                store.setFilters({ key, value: filterValue });
            });
        }

        filterData.value = store.getFilters;
    }
}
function getFinalQuery() {
    let baseQuery = null;
    let queryPresent = Object.keys(route.query)?.length > 0;
    if (!_getSavedFilterState() && !queryPresent) {
        baseQuery = updateFilterRanges();
        assignFilters(baseQuery);
        return baseQuery;
    }
    // 1️⃣ Start with default / cookie / current query
    baseQuery = queryPresent ? route.query : _getSavedFilterState() ?? {};

    assignFilters(baseQuery);
    return baseQuery;
}
async function handleRouteQueryChange(newQuery) {
    if (isRestoredFromSession.value) {
        // Restore from session
        isRestoredFromSession.value = false;
        return;
    }
    // No query exists
    if (newQuery && !Object.keys(newQuery).length) {
        newQuery = _getSavedFilterState();
        router.replace({ query: newQuery });
    }
    page.value = 1
    loader.value = true;
    await assignFilters(newQuery);
    setCookies(newQuery);
    fetchDiamonds()
}
async function fetchDiamonds() {
    const fetchPromise = (async () => {
        try {
            if (page.value === 1) {
                filteredList.value = [];
                loader.value = true;
                scrollToSection();
            } else {
                bottomLoader.value = true;
                $bus.emit('aria-announce', 'Loading more diamonds, please wait.');
            }

            const defaultParams = {      // Default Params
                type: type.value ?? 'diamond-pair',
                limit: limit.value ?? 48,
                page: page.value ?? 1,
                sort_column: sortByColumn.value ?? 'price',
                sort_direction: sortByDir.value ?? 'asc',
                [attributeCodes.diamondOriginCode]: getOriginCode.value,
                shipping: shipping.value ? 1 : 0
            };

            const { filterValues } = getFilterValues();
            const merged = { ...defaultParams, ...filterValues };

            const queryParams = Object.fromEntries(
                Object.entries(merged).filter(([key, value]) => {
                    if (!value) return false;
                    if (Array.isArray(value) && value.length === 0) return false;
                    return true;
                })
            );

            //Assign global query params
            queryString.value = queryParams;
            const queryStr = new URLSearchParams(queryString.value).toString();  // Convert to query string

            const response = await apiClient.getFitleredProductList('product-search', queryStr);

            // Check for valid response and update state
            // if (response?.data?.data) {
            //     let responseList = response.data.data;
            //     // responseList = responseList.map(item => ({ ...item }));
            //     this.totalProducts = response.data?.pagination?.total_products;
            //     this.filteredList = (this.page != 1)
            //         ? [...(this.filteredList || []), ...(Array.isArray(responseList) ? responseList : [])]
            //         : (responseList || []);
            // }
            if (response?.data) {
                const rawData = response.data?.data;

                const lightweightData = rawData?.map(toLightweightDiamond);
                const frozenChunk = Object.freeze(lightweightData);

                totalProducts.value = response.data?.pagination?.total_products;
                if (page.value === 1) {
                    filteredList.value = frozenChunk;
                    nextTick(() => {
                        $bus.emit('aria-announce', `${filteredList.value?.length} diamonds found out of ${totalProducts.value} total.`);
                    });
                } else {
                    filteredList.value = Object.freeze([...filteredList.value, ...frozenChunk]);
                    if (lightweightData.length) {
                        nextTick(() => {
                            $bus.emit('aria-announce', `${lightweightData.length} more diamonds loaded. Now showing ${filteredList.value?.length} of ${totalProducts.value} total.`);
                        });
                    }
                }
            }
        } catch (err) {
            console.error('Fetch failed:', err)
        } finally {
            // Do NOT directly turn off loader here
            nextTick(() => {
                isFetching.value = false;
            });
        }
    })();

    // Add promise to queue
    fetchQueue.value.push(fetchPromise);

    // Wait for this specific fetch to finish
    await fetchPromise;

    // Remove from queue
    fetchQueue.value = fetchQueue.value.filter(p => p !== fetchPromise);

    // ✅ If no more fetches are running, turn off loaders
    if (fetchQueue.value.length === 0) {
        loader.value = false;
        bottomLoader.value = false;
    }
}
function toLightweightDiamond(item) {
    return {
        ...item
    };
}
function scrollToSection() {
    if (productContainer.value) {
        const top = productContainer.value.getBoundingClientRect().top;
        if (top > window.innerHeight || top < 0) {
            productContainer.value.scrollIntoView();
        }
    }
}
function initIntersectionObserver() {
    // Disconnect previous if exists
    if (observer) observer.disconnect();

    const options = {
        root: null,
        // "2500px" means: "Pretend the viewport extends 2500px lower than it does."
        // This triggers the callback significantly earlier.
        rootMargin: '0px 0px 200px 0px',
        threshold: 0
    };

    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching.value && filteredList.value?.length && totalProducts.value > filteredList.value.length && !isRestoredFromSession.value) {
            page.value++;
            fetchDiamonds();
        }
    }, options);

    if (infiniteTrigger.value) {
        observer.observe(infiniteTrigger.value);
    }
}
function setCookies(newQuery) {
    if (!import.meta.client) return;
    try {
        if (newQuery) {
            const serialized = JSON.stringify(newQuery);
            sessionStorage.setItem(type.value, serialized);
            localStorage.setItem(type.value, serialized);
        } else {
            sessionStorage.removeItem(type.value);
            localStorage.removeItem(type.value);
        }
    } catch { }
}
function _getSavedFilterState() {
    if (!import.meta.client) return null;
    try {
        const session = sessionStorage.getItem(type.value);
        if (session) return JSON.parse(session);
        const local = localStorage.getItem(type.value);
        if (local) return JSON.parse(local);
    } catch { }
    return null;
}
function clearFilters() {
    filterData.value = {};
    setCookies(null);
    store.setFilters(null);
    store.setFilters({ key: 'type', value: type.value });
    store.setFilters({ key: attributeCodes.diamondOriginCode, value: getOriginCode.value });
    store.setFilters({ key: 'sort_column', value: 'price' });
    store.setFilters({ key: 'sort_direction', value: 'asc' });
    store.setFilterCount();
    if ($isMobile) updateResetKey.value++;
}
async function addNewQueryParams() {
    let queryParams = {};
    if (filterData.value && typeof filterData.value == 'object' && Object.keys(filterData.value).length > 0) {
        Object.entries(filterData.value).forEach(([key, value]) => {
            let val = '';
            if (key && key != 'type') {
                if (value) {
                    if (Array.isArray(value) && value.length) {
                        val = value
                            .map(item => item?.code)
                            .filter(code => typeof code === 'string' && code !== undefined) // (`filterType` was never defined on the component, so this is always true)
                            .join(',');
                    } else if (typeof value == 'object') {
                        val = JSON.stringify(value);
                    } else {
                        val = value;
                    }
                    if (val) queryParams[key] = val;
                }
                if (!value) queryParams[key] = value;
            }
        });
        if (queryParams && Object.keys(queryParams).length) {
            const isKeywordSearch = !!filterData.value?.search;
            store.runGtmEvent({
                action_type: isKeywordSearch
                ? "keyword_search"
                : "filter_item_list",
                additionalData: {
                filters: buildGtmFilters()
                }
            });
            let persistQuery = _getSavedFilterState();
            router.push({ query: { ...persistQuery, ...queryParams } });
        }
    }
}
function buildGtmFilters() {
    const filters = [];

    Object.entries(filterData.value || {}).forEach(([key, value]) => {
        if (!value) return;
        const filter = Object.values(props.filterList || {}).find(item => item.code === key);
        if (!filter && key != "search") return;
        let values = [];
        if (Array.isArray(value)) {
        values = value.map(v => v.label || v.value || v.code);
        } else if (typeof value === "object") {
        if (value.min !== undefined || value.max !== undefined) {
            values = [
            `${value.min}`,
            `${value.max}`
            ];
        }
        } else {
        values = [String(value)];
        }
        filters.push({
        product_type:
            key === "search"
            ? "keyword"
            : type.value,
        name:
            key === "search" ? "keyword" : filter?.label || filter?.name || key,
        values
        });
    });
    return filters;
}
function getFilterValues(preAppliedFilters = null) {
    const queryParams = preAppliedFilters ?? route.query;
    const filterValues = {};
    const finalFilterData = {};

    if (!props.filterList) {
        return { filterValues, finalFilterData };
    }

    Object.entries(queryParams).forEach(([key, value]) => {
        const filterItemData = Object.values(props.filterList)
            .find(item => item.code === key);

        if (!filterItemData || !value) return;

        const appliedFilters = [];
        // MIN / MAX FILTER
        if (
            (typeof value === 'string' && (value.includes('min') || value.includes('max'))) ||
            (typeof value === 'object' && (value.min !== undefined || value.max !== undefined))
        ) {
            let minMaxParams = value;

            if (typeof value === 'string') {
                try {
                    minMaxParams = JSON.parse(value);
                } catch (e) {
                    minMaxParams = value;
                    console.error('Invalid min/max JSON:', value);
                    return;
                }
            }

            Object.keys(minMaxParams).forEach(k => {
                if (!isNaN(minMaxParams[k])) {
                    minMaxParams[k] = parseFloat(minMaxParams[k]);
                }
            });

            appliedFilters.push(minMaxParams);
            filterValues[key] = value;
            finalFilterData[key] = appliedFilters;
            return;
        }
        // MULTI SELECT (comma separated)
        if (typeof value === 'string' && value.includes(',')) {
            const valuesArray = value.split(',');

            filterValues[key] = valuesArray.map(v => {
                const matched = filterItemData.value?.find(f => f.code === v);
                if (matched) {
                    appliedFilters.push(matched);
                    return matched.value;
                }
                return v ? v : null;
            });

            finalFilterData[key] = appliedFilters;
            return;
        }
        // SINGLE VALUE
        const matched = filterItemData.value?.find(f => f.code === value);
        if (matched) {
            appliedFilters.push(matched);
            filterValues[key] = matched.value;
            finalFilterData[key] = appliedFilters;
        }
    });

    return { filterValues, finalFilterData };
}
function updateFilterRanges() {
    let attributeValues = props.filterList;
    for (let key in diamondFilters) {
        const filterValue = diamondFilters[key];
        const attribute = Object.values(attributeValues).find(attr => attr.code === key);

        if (attribute) {
            if (attribute.type === 'range') {
                const values = attribute.value.map(item => item.code);
                const startIndex = values.indexOf(filterValue);
                if (startIndex !== -1) {
                    const result = values.slice(startIndex).join(',');
                    diamondFilters[key] = result;
                }
            }
            if (filterValue && filterValue.min && attribute.type) {
                const values = attribute.value.map(item => item.value);
                let min = filterValue.min;
                let max = values[values.length - 1];
                if (key == diamondCaratCode.value) {
                    min = min.toFixed(2);
                    max = max.toFixed(2);
                }
                diamondFilters[key] = JSON.stringify({ 'min': min, 'max': max });
            }
        }
    }
    return diamondFilters;
}
function removeFilter(data) {
    const { item, key } = data;

    //Clone query object
    const queryParams = { ...route.query };

    if (item?.code && queryParams[key]?.includes(item.code)) {
        queryParams[key] = queryParams[key]
            .replace(item.code + ',', '')
            .replace(',' + item.code, '')
            .replace(item.code, '');

        // clean empty values
        if (!queryParams[key]) {
            delete queryParams[key];
        }
    } else if (key) {
        delete queryParams[key];
    }
    router.push({ query: queryParams });
}
function toggleFilter() {
    isFilterShow.value = !isFilterShow.value;
    document.body.style.overflow = isFilterShow.value ? 'hidden' : '';
}
async function restoreInfiniteList(lastPage, limitArg, scrollY, productUrlKey) {
    const PARALLEL_THRESHOLD = 20;

    if (lastPage <= PARALLEL_THRESHOLD) {
        await restoreShallow(lastPage, limitArg, scrollY, productUrlKey);
    } else {
        isRestoredFromSession.value = false;
        // 1️⃣ Assign filters and get the query to push
        const query = await getFinalQuery();
        handleRouteQueryChange(query);
    }
}
async function restoreShallow(lastPage, limitArg, scrollY, productUrlKey) {
    try {
        const promises = [];
        const params = new URLSearchParams(queryString.value);  // Convert to query string
        loader.value = true;

        // validate passed params
        let limitParam = limitArg || 48;

        for (let i = 1; i <= lastPage; i++) {
            params.set("limit", limitParam);
            params.set("page", i);

            const queryStr = params.toString();

            promises.push(
                apiClient.getFitleredProductList('product-search', queryStr)
            );
        }
        const responses = await Promise.all(promises);
        const allItems = responses.flatMap((r) => r.data?.data || []);

        totalProducts.value = responses?.length ? responses[0]?.data?.pagination?.total_products : 0;
        filteredList.value = Object.freeze(allItems);
        page.value = lastPage;
        loader.value = false;
        hasFetchedOnce = !filteredList.value.length;
        finishRestoration(scrollY, productUrlKey);
    } catch (e) {
        console.log(e);
        fetchDiamonds(); // fallback
    }
}
function finishRestoration(scrollY, productUrlKey) {
    nextTick(() => {
        setTimeout(() => {
            let rowIndex = 0;
            const getPairKeySegment = (url) => {
                const [path, query] = url.split('?');
                const params = new URLSearchParams(query);

                const first = params.get('first_pair_key');
                const second = params.get('second_pair_key');

                return `${path}?first_pair_key=${first}&second_pair_key=${second}`;
            };

            const normalizedProductKey = getPairKeySegment(productUrlKey);

            rowIndex = filteredList.value.findIndex(row => {
                return normalizedProductKey.includes(row.pair_url_key) || row.pair_url_key === normalizedProductKey;
            });

            if (rowIndex !== -1) {
                expandedSku.value = filteredList.value[rowIndex]?.sku;
            }
            // to show item in viewport
            rowIndex = rowIndex > 7 ? rowIndex - 7 : rowIndex;

            // (the original `if (this.isMobile) rowIndex -= 2` referenced an undefined property and never ran)
            if (rowIndex !== -1) {
                nextTick(() => {
                    listVirtualizer.value.scrollToIndex(rowIndex, { align: 'start' })
                })
            }
            // window.scrollTo(0, scrollY);
            // Unlock normal behavior AFTER restore
            nextTick(() => {
                isRestoredFromSession.value = false;
                initIntersectionObserver();
            });
        }, 100);
    });
}

watch(() => store.filterCount, async () => {
    filterData.value = store.getFilters;
    await addNewQueryParams();
}, { deep: true, immediate: true });
watch(() => route.query, handleRouteQueryChange);

onMounted(async () => {
    isMounted.value = true;
    isFilterShow.value = !$isTabAndMobile; // Show Filter on Desktop

    const saved = props.filterState;
    if (saved) {
        isRestoredFromSession.value = true;
        filterData.value = saved.filters;
        page.value = saved.page;
        limit.value = saved.limit;
        queryString.value = saved.query;
        restoreInfiniteList(saved.page, saved.limit, saved.scrollY, saved.productUrlKey);
        initIntersectionObserver();
        defaultOutsideFilter();
        store.setFilters(filterData.value);
        store.setFilterCount();
        return;
    }
    // 1️⃣ Assign filters and get the query to push
    const query = await getFinalQuery();
    // 2️⃣ Push query once (defaults + postfix merged)
    if (query && Object.keys(query).length && !Object.keys(route.query)?.length) {
        router.push({ query });
    } else {
        // 3️⃣ Fetch diamonds manually after route is finalized
        handleRouteQueryChange(query);
    }

    isFilterShow.value = !$isMobile; // Show Filter on Desktop

    // Tooltip logic (unchanged)
    if (import.meta.client) {
        const hasSeenTooltip = sessionStorage?.shownFastShippingTooltip;
        const otherTabTriggered = localStorage.getItem('tooltipShownThisSession');

        if (!hasSeenTooltip && !otherTabTriggered) {
            showFastShippingTooltip.value = true;

            // Set flags in both session and local storage
            sessionStorage.setItem('shownFastShippingTooltip', 'true');
            localStorage.setItem('tooltipShownThisSession', 'true');
        }

        // Listen for storage changes from other tabs (to avoid duplicate popups)
        window.addEventListener('storage', (event) => {
            if (event.key === 'tooltipShownThisSession') {
                showFastShippingTooltip.value = false;
            }
        });
    }

    // Default filter
    defaultOutsideFilter();

    await nextTick(() => {
        console.log('intersection observer called immediately');
        initIntersectionObserver();   // Init Intersection Observer
    });
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
});

// pages/search.vue reads this through the component ref to persist the search state before navigating to a product
defineExpose({ getRouteState });
</script>
<style scoped>
.scroller {
    min-height: 100vh;
}
</style>
