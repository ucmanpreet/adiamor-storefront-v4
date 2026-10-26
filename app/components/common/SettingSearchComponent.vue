<template>
    <div>
        <!-- Top panel -->
        <SearchBanner :filterList="filterList" />

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-8">
            <div class="flex xl:gap-6">
                <!-- Filter Side menu -->
                <CustomFilter id="filter-panel" v-show="isFilterShow && filterList" :filterList="filterList" v-model:isFilter="isFilterShow"
                    @closeFilter="handleFilterClose" v-model:filterData="filterData" ref="customFilter" />
                <!-- Setting List -->
                <div class="w-full relative" ref="productContainer">
                    <!-- FIlter Sticky Header -->
                    <div class="flex flex-col sticky z-40 bg-white  top-0" :class="{ 'border-b border-gray-200' : filteredList?.length }">
                        <!-- Shipping -->
                        <div
                            class="flex gap-1 sm:gap-3 items-center py-3 sm:min-h-[65px] border-b border-gray-200 justify-between">
                            <!-- Desktop -->
                            <Button type="button" colorType="primary" class="font-normal hidden sm:block"
                                ref="filterToggleBtn"
                                @click="toggleFilter()">
                                <span class="inline-block">Filters</span>
                            </Button>
                            <div class="flex items-center gap-1 sm:gap-4 w-full sm:w-auto xl:ml-auto">
                                <div class="flex gap-1 sm:gap-3 w-full">
                                    <!-- Sorting -->
                                    <SearchSorting @change="handleChange($event)" :sortOpt="sortOpt"
                                        v-model:sortByColumn="sortByColumn" v-model:sortByDir="sortByDir" @open="fireEvent"/>
                                </div>
                            </div>
                        </div>
                        <div class="flex sm:items-center flex-row gap-2 justify-between -mt-1 py-4">
                            <div
                                class="group relative min-w-0 flex items-center justify-between overflow-hidden px-2 sm:px-4 py-[0.563rem] text-xs sm:text-sm border-b focus:z-10 whitespace-nowrap font-medium border-black text-black hover:text-primary focus:text-primary text-center">
                                <button type="button" :aria-label="`Results ${Number(totalProducts).toLocaleString()}`"
                                    class="absolute inset-0 z-0"></button> <!---->
                                Results {{ Number(totalProducts).toLocaleString() }}
                            </div>
                             <!-- Mobile reset Button -->
                            <button type="button" @click="clearFilters" class="text-xs font-light flex items-center gap-1" :class="{ 'hidden': !Object.keys(appliedFilterJson)?.length || !$isMobile }" :aria-label="'Reset all filters'">Reset 
                            <Icon name="reset" class="w-4 h-4" /></button>
                        </div>
                        <!-- Applied Filters -->
                        <AppliedFilter :appliedFilterJson="appliedFilterJson" @removeFilter="removeFilter"
                            @clearFilter="clearFilters" :filterList="filterList"
                            v-if="Object.keys(appliedFilterJson)?.length" />
                    </div>
                    <!-- Skeleton Loader -->
                    <client-only>
                        <SettingInsideSearchSkeleton v-if="loader" />
                        <template v-else-if="filteredList?.length">
                            <DynamicScroller ref="dynamicScroller" :items="chunkedFilteredList" :min-item-size="380"
                                key-field="id" page-mode :buffer="gridBuffer" :prerender="20"  emit-update @update="onScrollerUpdate">
                                <template v-slot="{ item, index, active }">
                                    <DynamicScrollerItem :item="item" :active="active" :data-index="index">
                                        <div
                                            class="pt-3 pb-4 sm:pb-6 grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-8 sm:gap-x-4 md:gap-x-8 md:gap-y-10 grid-flow-row-dense lg:space-x-0">
                                            <div v-for="setting in item.data" :key="setting.sku ?? index"
                                                :class="[setting?.colspan ? `col-span-${setting?.colspan}` : '']"
                                                v-show="setting?.sku != 'placeholder'">
                                                
                                                    <div v-if="setting?.type == 'promo'">
                                                        <div @click="goTo(setting?.link)">
                                                            <MediaImage :src="setting?.image_url"
                                                                :alt="setting?.alt_text" className="w-full h-full" />
                                                        </div>
                                                    </div>
                                                    <SettingGridCard v-else :key="setting?.sku" :setting="setting"
                                                        @setDefaultVariant="setVariantData"
                                                        :selectedVariants="selectedVariants" 
                                                        v-model:filterData="filterData"/>
                                                
                                            </div>
                                        </div>
                                    </DynamicScrollerItem>
                                </template>
                            </DynamicScroller>
                            <!-- <div class="sr-only" role="status" aria-live="polite">
                                Showing {{ filteredList.length }} products
                            </div> -->
                        </template>
                        <div v-if="hasFetchedOnce"
                            class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5">
                            <NoDataFound :type="type">
                                <div class="max-w-sm mx-auto text-center">
                                    <p>Use the sliders above to search or call us at <a class="text-primary"
                                        :href="`tel:${telPhoneNumber}`" :aria-label="`Call support at ${phoneNumber}`">
                                        {{ phoneNumber }}</a> for assistance.</p>
                                    <Button type="button" colorType="primary" class="capitalize mx-auto mt-4"
                                        @click="router.push(customSearchPath)">Request a
                                        custom search</Button>
                                    <Button type="button" colorType="bordered-primary" class="capitalize mx-auto mt-4"
                                        @click="clearFilters()">Reset
                                        search</Button>
                                </div>
                            </NoDataFound>
                        </div>
                    </client-only>
                    <div v-if="!loader" class="sm:hidden fixed inset-x-3 bottom-3 z-50 bg-white md:static">
                        <!-- MOBILE -->
                        <Button type="button" colorType="primary"
                            class="font-normal w-full flex items-center !text-base gap-1 !border-0"
                            @click="toggleFilter()"
                            :aria-expanded="isFilterShow.toString()"
                            ref="filterToggleBtnMobile"
                            aria-controls="filter-panel">
                            <span class="inline-block">Filters </span>
                            <Icon name="filter" class="w-5 h-5 mt-1" />
                        </Button>
                    </div>
                    <div v-if="bottomLoader" class="flex justify-center py-6">
                        <SettingInsideSearchSkeleton />
                    </div>
                    <!-- infinite scroll trigger -->
                    <div ref="infiniteTrigger" id="infiniteTriggerId" style="height: 60px; margin-top: 60px" aria-hidden="true"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import apiClient from "~/api-client/rest-api/index.js";
import { scrollToRow } from '~/utils/virtualScroll.js';
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import { settingSotingOptions, ringFilters } from '@/static/js/recommendedFilters';
import SearchBanner from '~/components/common/SearchBanner.vue';
import CustomFilter from "~/components/filter/CustomFilter.vue";
import Button from "~/components/common/Button.vue";
import SearchSorting from "~/components/common/SearchSorting.vue";
import Icon from "~/components/common/Icon.vue";
import AppliedFilter from "~/components/common/AppliedFilter.vue";
import SettingInsideSearchSkeleton from "~/components/skeleton/SettingInsideSearchSkeleton.vue";
import SettingGridCard from "~/components/common/SettingGridCard.vue";
import NoDataFound from "~/components/common/NoDataFound.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import { cleanPostfix } from "~/utils/universalHelper";

// Referenced by name from pages/search.vue (<component :is="'SettingSearchComponent'">)
defineOptions({ name: 'SettingSearchComponent' });

const props = defineProps(["filterList", "filterState"]);

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const { $isMobile } = useNuxtApp();

const page = ref(1);
const limit = ref(48);
const loader = ref(false);
const isFilterShow = ref(false);
const filteredList = shallowRef([]);
const sortOpt = ref(settingSotingOptions);
const sortByColumn = ref('sort_order');
const sortByDir = ref('');
const selectedTab = ref(0);
const totalProducts = ref(0);
const isFetching = ref(false);
const lastRenderedRowIndex = ref(-1);// Store the scroller's position
const bottomLoader = ref(false);
const type = ref(null);
const cursorToken = ref(null);
const hasFetchedOnce = ref(false);
const fetchQueue = ref([]);
const isRestoredFromSession = ref(false);
const queryString = ref(null);
const pageCursors = ref([]);
const selectedVariants = ref([]);
const customSearchPath = ref(STATIC_ROUTES.CUSTOM_SEARCH);
const firedProducts = new Set();
let _lastFiredSku = null;
let _lastFiredCount = 0;

// Properties that were set on the instance without being declared in data()
const filterData = ref();
let observer = null;
// (`this.diamondCaratCode` was never defined on this component, so that comparison in updateFilterRanges is always false)
const diamondCaratCode = undefined;

const dynamicScroller = ref(null);
const productContainer = ref(null);
// Root element of a child component instance (the public `$el` property)
const COMPONENT_ROOT_EL = '$' + 'el';
const customFilter = ref(null);
const filterToggleBtn = ref(null);
const filterToggleBtnMobile = ref(null);
const infiniteTrigger = ref(null);

const isMobile = computed(() => $isMobile);
const columns = computed(() => {
    if (isMobile.value) return 2;
    return 4; // Desktop
});
const gridBuffer = computed(() => {
    const rows = Math.ceil(filteredList.value?.length / columns.value);
    return Math.max(rows * 400 + 600, 1200);
});
const chunkedFilteredList = computed(() => {
    if (!filteredList.value?.length) return []

    const cols = columns.value
    const result = []

    for (let i = 0; i < filteredList.value?.length; i += cols) {
        const first = filteredList.value[i]
        result.push({
            id: `row-${first.sku}`,
            data: filteredList.value.slice(i, i + cols)
        })
    }

    return result;
});
const appliedFilterJson = computed(() => {
    let { finalFilterData } = getFilterValues();
    return finalFilterData || {};
});
const preFix = computed(() => {
    let value = route.params?.prefix;
    return value ? value : null;
});
const postFix = computed(() => cleanPostfix(route.params?.postfix?.toLowerCase()) || route.params?.postfix?.toLowerCase());
const storedFilterKey = computed(() => {
    const prefix  = route.params?.prefix?.toLowerCase() || '';
    const postfix = route.params?.postfix?.toLowerCase() || '';

    if (preFix.value === 'engagement-rings') {
        return prefix;
    }

    if (
        preFix.value === 'wedding-rings' &&
        (postfix.includes('mens') || postfix.includes('womens'))
    ) {
        return postfix || prefix;
    }

    return prefix;
});
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));

async function onScrollerUpdate(start, end, visibleStartIndex, visibleEndIndex) {
    let newProducts = [];
    const rows = chunkedFilteredList.value.slice(
        visibleStartIndex,
        visibleStartIndex == 0 ? visibleEndIndex : visibleEndIndex + 3
    );

    for (const row of rows) {
        if (!row?.data) continue;

        for (const product of row.data) {
            const sku = product?.sku && product?.type != 'promo' ? product?.sku : null;

            if (!sku || firedProducts.has(sku))
                continue;

            firedProducts.add(sku);
            newProducts.push(product);
        }
    }
    if (!newProducts.length)
        return;

    const MAX_TRACKED = 5000;

    if(firedProducts.size > MAX_TRACKED) {
        firedProducts.clear();
    }
    await nextTick();
    await fireViewItemList(newProducts);
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

    _lastFiredSku = lastSku;
    _lastFiredCount = count;
    await store.setProductGtmData(null);
    const gtmEventData = normalizedItems.map((item, index) => {
        if(item?.type === 'promo') return;
        const variantSku = selectedVariants.value?.[item?.sku];

        return {
            item_id: item?.sku,
            item_name: item?.name,
            index,
            item_variant: variantSku,
            price: item?.price?.raw?.amount,
            quantity: 1,
            item_url: item?.url_key,
            item_image_url: item?.media?.primary_url
        };
    });
    await store.setProductGtmData(gtmEventData);
    const additionalData = { item_list_name: `search-${type.value}`, skipDuplicates: true };

    await store.runGtmEvent({ action_type: 'view_item_list', txnId: null, additionalData });
}
function fireEvent() {
    store.runGtmEvent({ action_type : 'view_item_list_product_details' });
}
function setVariantData(data) {
    selectedVariants.value[data?.sku] = data?.variant?.sku;
}
function getRouteState() {
    return {
        filters: filterData.value,
        page: page.value,
        limit: limit.value,
        scrollY: window.scrollY,
        query: queryString.value,
        pageCursors: pageCursors.value,
        selectedVariants: selectedVariants.value
    }
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
    const promises = [];
    const params = new URLSearchParams(queryString.value);  // Convert to query string
    loader.value = true;

    for (let i = 1; i <= lastPage; i++) {
        params.set("limit", limitArg);
        pageCursors.value[i] ? params.set("cursor", pageCursors.value[i]) : '';

        const queryStr = params.toString();

        promises.push(
            apiClient.getFitleredProductList("settings", queryStr)
        );
    }
    try {
        const responses = await Promise.all(promises);
        const allItems = responses.flatMap((r) => r.data?.data || []);

        totalProducts.value = responses?.length ? responses[0]?.data?.pagination?.total_products : 0;
        filteredList.value = Object.freeze(allItems);
        page.value = lastPage;
        loader.value = false;
        hasFetchedOnce.value = !filteredList.value?.length;

        finishRestoration(scrollY, productUrlKey);
    } catch (e) {
        fetchSettings(); // fallback (the original called a non-existent fetchDiamonds() here)
    }
}
function finishRestoration(scrollY, productUrlKey) {
    nextTick(() => {
        setTimeout(() => {
            let rowIndex = chunkedFilteredList.value.findIndex(row =>
                row.data.some(item => item.url_key === productUrlKey)
            )

            if (isMobile.value) {
                rowIndex = rowIndex < 10 ? rowIndex - 1 : rowIndex - 2;
            } else if (rowIndex !== -1) {
                rowIndex = rowIndex - 1;
            }
            if (rowIndex !== -1) {
                nextTick(() => {
                    scrollToRow(dynamicScroller.value, rowIndex)
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
function defaultOutsideFilter() {
    if (route.query.sort_column) {
        sortByColumn.value = route.query.sort_column;
        sortByDir.value = route.query.sort_direction;
    }
}
function goTo(link) {
    window.open(link, '_blank');
}
function assignFilters(queryParams) {
    if (queryParams && Object.keys(queryParams).length) {

        const { finalFilterData } = getFilterValues(queryParams);

        if (finalFilterData && Object.keys(finalFilterData).length) {
            store.setFilters(null);
            Object.entries(finalFilterData).forEach(([key, value]) => {
                let filterValue = value;
                if (!value) return;
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

    if (!useCookie(storedFilterKey.value).value && !queryPresent) {
        baseQuery = updateFilterRanges();
        baseQuery = getPostFixQuery(baseQuery);
        assignFilters(baseQuery);
        return baseQuery;
    }
    // 1️⃣ Start with default / cookie / current query
    baseQuery = queryPresent ? route.query : useCookie(storedFilterKey.value).value ?? {};
    baseQuery = getPostFixQuery(baseQuery);
    assignFilters(baseQuery);
    return baseQuery;
}

function getPostFixQuery(baseQuery) {
    if (!postFix.value) return baseQuery;
    // Loop through all filters
    Object.values(props.filterList).forEach(filter => {
        if (!filter?.value || !Array.isArray(filter.value)) return;

        // Collect all codes in this filter that include postFix
        const matchedCodes = filter.value
            .filter(item => item?.code?.includes(postFix.value))
            .map(item => item.code);

        // If any match, add to query under filter.code
        if (matchedCodes.length) {

            // Convert back to comma-separated string
            baseQuery = {
                ...baseQuery,
                [filter.code]: Array.from(matchedCodes).join(',')
            };
        }
    });

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
        newQuery = useCookie(storedFilterKey.value).value;
        router.replace({ query: newQuery });
    }

    setCookies(newQuery);
    await assignFilters(newQuery);
    page.value = 1;
    loader.value = true;
    cursorToken.value = null;
    fetchSettings();

}
function setCookies(newQuery) {
    const cookie = useCookie(storedFilterKey.value, {  // Set Filter State in Cookie
        path: STATIC_ROUTES.HOME,
        maxAge: 60 * 60 * 24 * 7
    });
    cookie.value = newQuery;
}
async function fetchSettings() {
    const fetchPromise = (async () => {
        try {
            if (isFetching.value) return;  // Avoid multiple requests
            const metaData = store.metaData || store.getMetaData;
            let categoryId = null;
            if (metaData?.filter_rule) {
                let rules = (typeof metaData.filter_rule === 'string') ? JSON.parse(metaData.filter_rule) : metaData.filter_rule;
                categoryId = rules?.style ?? null;
            }
            isFetching.value = true;
            if (page.value === 1) {
                filteredList.value = [];
                // this.loader = true;
                // this.cursorToken = null;
                scrollToSection();
            } else {
                if (!cursorToken.value) return;
                bottomLoader.value = true;
            }

            const defaultParams = {      // Default Params
                type: type.value ?? preFix.value,
                limit: limit.value ?? 48,
                sort_column: sortByColumn.value ?? 'sort_order',
                sort_direction: sortByDir.value ?? '',
            };
            // Add category id
            if (categoryId) defaultParams.category_id = categoryId;

            // On Sale
            if (postFix.value == 'sale') defaultParams['on_sale'] = true;

            const { filterValues } = getFilterValues();
            const mergedParams = {
                ...defaultParams,
                ...filterValues,
                cursor: cursorToken.value
                };

            const queryParams = Object.fromEntries(
                Object.entries(mergedParams).filter(([key, value]) => {
                    if (!value) return false;
                    if (Array.isArray(value) && value.length === 0) return false;
                    return true;
                })
            );

            // Assign query string without cursor
            const { cursor, ...rest } = queryParams;
            queryString.value = rest;

            const queryStr = new URLSearchParams(queryParams).toString();  // Convert to query string

            const response = await apiClient.getFitleredProductList('settings', queryStr);
            // Check for valid response and update state
            if (response?.data) {
                // let responseList = response.data.data;
                // responseList = responseList.map(item => Object.freeze(item));
                const rawData = response.data?.data;

                const lightweightData = rawData?.map(toLighteightSetting);
                const frozenChunk = Object.freeze(lightweightData);

                if (page.value === 1) {
                    // Reset list
                    filteredList.value = frozenChunk;
                } else {
                    // Append to list.
                    filteredList.value = Object.freeze([...filteredList.value, ...frozenChunk]);
                }
                totalProducts.value = response.data?.pagination?.total_products;
                cursorToken.value = response.data?.next_cursor;
                pageCursors.value[page.value + 1] = cursorToken.value;
            }
        } catch (err) {
            console.error('Fetch failed:', err)
        } finally {
            // Do NOT directly turn off loader here
            isFetching.value = false;
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
        hasFetchedOnce.value = !filteredList.value?.length;
    }
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
        rootMargin: '0px 0px 2500px 0px',
        threshold: 0
    };

    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching.value && filteredList.value?.length && cursorToken.value && !isRestoredFromSession.value) {
            page.value++;
            fetchSettings();
        }
    }, options);

    if (infiniteTrigger.value) {
        observer.observe(infiniteTrigger.value);
    }
}
function clearFilters() {
    hasFetchedOnce.value = false;
    filterData.value = {};
    setCookies(null);
    store.setFilters(null);
    store.setFilters({ key: 'type', value: type.value });
    store.setFilters({ key: 'sort_column', value: 'sort_order' });
    store.setFilters({ key: 'sort_direction', value: null });
    store.setFilterCount();
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
            store.runGtmEvent({
                action_type: "filter_item_list",
                additionalData: {
                filters: buildGtmFilters()
                }
            });
            let persistQuery = useCookie(storedFilterKey.value).value;
            router.push({ query: { ...persistQuery, ...queryParams } });
        }
    }
}
function buildGtmFilters() {
    const filters = [];

    Object.entries(filterData.value || {}).forEach(([key, value]) => {
        if (!value) return;
        const filter = Object.values(props.filterList || {}).find(item => item.code === key);
        if (!filter) return;
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
        product_type: type.value,
        name: filter?.label || filter?.name || key,
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
                // const matched = filterItemData.value?.find(f => f.code === v || f.code?.includes(v));
                let matched = filterItemData.value?.find(f => f.code === v);

                if (!matched) {
                    matched = filterItemData.value?.find(f => f.code?.includes(v));
                }
                if (matched) {
                    appliedFilters.push(matched);
                    return matched.value;
                }
                return v;
            });

            finalFilterData[key] = appliedFilters;
            return;
        }
        // SINGLE VALUE
        // const matched = filterItemData.value?.find(f => f.code === value || f.code?.includes(value));
        let matched = filterItemData.value?.find(f => f.code === value);

        if (!matched) {
            matched = filterItemData.value?.find(f => f.code?.includes(value));
        }
        if (matched) {
            appliedFilters.push(matched);
            filterValues[key] = matched.value;
            finalFilterData[key] = appliedFilters;
        }
    });

    return { filterValues, finalFilterData };
}
function updateFilterRanges() {
    // Apply default shape only in rings
    if (preFix.value != 'engagement-rings') return;

    let attributeValues = props.filterList;
    for (let key in ringFilters) {
        const filterValue = ringFilters[key];
        const attribute = Object.values(attributeValues).find(attr => attr.code === key);

        if (attribute) {
            if (attribute.type === 'range') {
                const values = attribute.value.map(item => item.code);
                const startIndex = values.indexOf(filterValue);
                if (startIndex !== -1) {
                    const result = values.slice(startIndex).join(',');
                    ringFilters[key] = result;
                }
            }
            if (filterValue && filterValue.min && attribute.type) {
                const values = attribute.value.map(item => item.value);
                let min = filterValue.min;
                let max = values[values.length - 1];
                if (key == diamondCaratCode) {
                    min = min.toFixed(2);
                    max = max.toFixed(2);
                }
                ringFilters[key] = JSON.stringify({ 'min': min, 'max': max });
            }
        }
    }
    return ringFilters;
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

    if(queryParams && !Object.keys(queryParams).length){
        filterData.value = null;
        setCookies(null);
        store.setFilters(null);
        store.setFilters({ key: 'type', value: type.value });
        store.setFilters({ key: 'sort_column', value: sortByColumn.value });
        store.setFilters({ key: 'sort_direction', value: sortByDir.value });
    }
    router.push({ query: queryParams });
}
function handleChange(event) {
    const selectedValue = event.target.value;
    const selectedItem = sortOpt.value[selectedValue];
    if (selectedItem && selectedItem?.colName) {
        sortByColumn.value = selectedItem.colName;
        sortByDir.value = selectedItem.colValue;
        store.setFilters({ key: 'sort_column', value: sortByColumn.value });
        store.setFilters({ key: 'sort_direction', value: sortByDir.value });
        store.setFilterCount();
    }
}
function toggleFilter() {
    isFilterShow.value = !isFilterShow.value;
    document.body.style.overflow = isFilterShow.value ? 'hidden' : '';

    if(isFilterShow.value){
        store.runGtmEvent({ action_type : 'viewed_search_filters' });

        nextTick(() => {
            const filterEl = customFilter.value?.[COMPONENT_ROOT_EL];
            if (filterEl) {
                const focusable = filterEl.querySelector('[aria-label="Close filters"]');
                if (focusable) focusable.focus();
            }
        })
    }
}
function handleFilterClose() {
    isFilterShow.value = false;
    document.body.style.overflow = '';
    nextTick(() => {
        const isMobileViewport = window.innerWidth < 640;
        const btnRef = isMobileViewport
            ? filterToggleBtnMobile.value
            : filterToggleBtn.value;
        const el = btnRef?.[COMPONENT_ROOT_EL] ?? btnRef;
        if (el) el.focus();
    });
}
function handleFilterKeydown(e) {
    if (e.key === 'Escape') {
        handleFilterClose();
        return;
    }

    if (e.key !== 'Tab') return;

    const filterEl = customFilter.value?.[COMPONENT_ROOT_EL];
    if (!filterEl) return;

    const focusable = Array.from(
        filterEl.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    ).filter(el => el.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    // Focus is outside the filter — pull it back in
    if (!filterEl.contains(active)) {
        e.preventDefault();
        e.shiftKey ? last.focus() : first.focus();
        return;
    }

    // Focus is at a boundary — wrap around
    if (e.shiftKey) {
        if (active === first) {
            e.preventDefault();
            last.focus();
        }
    } else {
        if (active === last) {
            e.preventDefault();
            first.focus();
        }
    }
}
function toLighteightSetting(item) {
    if(item?.type == 'promo') return item;
    return {
        id: item.id,
        sku: item.sku,
        name: item.name,
        price: item.price,
        url_key: item.url_key,
        media: {
            hover_url: item.media?.hover_url || '',
            primary_url: item.media?.primary_url || ''
        },
        search_color: item.search_color,
        attribute_family: item.attribute_family,
        shipping: item.shipping,
        variants: item.variants,
        in_stock: item.in_stock
    };
}

watch(() => store.filterCount, async () => {
    filterData.value = store.getFilters;
    await addNewQueryParams();
}, { deep: true, immediate: true });
watch(() => route.query, handleRouteQueryChange);
watch(isFilterShow, (val) => {
    if (val) {
        document.addEventListener('keydown', handleFilterKeydown);
    } else {
        document.removeEventListener('keydown', handleFilterKeydown);
    }
});

onMounted(async () => {
    type.value = preFix.value;
    const saved = props.filterState;
    console.log(saved, 'mounted');
    if (saved) {
        isRestoredFromSession.value = true;
        filterData.value = saved.filters;
        page.value = saved.page;
        limit.value = saved.limit;
        queryString.value = saved.query;
        pageCursors.value = saved.pageCursors;
        cursorToken.value = saved.pageCursors[saved.pageCursors?.length - 1];
        selectedVariants.value = saved.selectedVariants;


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
        handleRouteQueryChange(query);
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
    document.removeEventListener('keydown', handleFilterKeydown);
    document.body.style.overflow = '';
});

// pages/search.vue reads this through the component ref to persist the search state before navigating to a product
defineExpose({ getRouteState });
</script>