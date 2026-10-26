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
                                <DynamicScroller ref="dynamicScrollerList" :items="filteredList" key-field="pair_id"
                                    page-mode :buffer="300" :prerender="20" :min-item-size="80" emit-update  @update="onScrollerUpdate">
                                    <template #default="{ item, index, active }">
                                        <DynamicScrollerItem :item="item" :active="active"
                                            :data-index="index"
                                            item-class="even:bg-gray-100">
                                            <!-- ROW WRAPPER -->
                                            <div class="w-full" :class="{
                                                'bg-gray-100': index % 2 === 0,
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
                                        </DynamicScrollerItem>
                                    </template>
                                </DynamicScroller>
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
                                            @click="$router.push(customSearchPath)">Request a
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

<script>
import api from "~/api-client/rest-api/index.js";
import { attributeCodes } from "~/utils/searchConstant";
import { diamondFilters } from '@/static/js/recommendedFilters';
import { scrollToRow } from '~/utils/virtualScroll.js';
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
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

export default {
    name: 'DiamondPairSearchComponent',
    props: ["filterList", "filterState"],
    components: {
        SearchBanner, TabComponent, AppliedFilter, SortingHeader, CompareSearchComponent, DiamondPairSearchInsideSkeleton, Button, Icon, NoDataFound, CustomFilter,
        DynamicScroller,
        DynamicScrollerItem,
        DiamondPairListView,
        DiamondPairListHeader
    },
    data() {
        return {
            type: "diamond-pair",
            page: 1,
            limit: 48,
            loader: false,
            isFilterShow: false,
            filteredList: [],
            shipping: false,
            showFastShippingTooltip: false,
            sortByColumn: 'price',
            sortByDir: 'asc',
            selectedTab: 0,
            totalProducts: 0,
            isFetching: false,
            lastRenderedRowIndex: -1,// Store the scroller's position
            bottomLoader: false,
            fetchQueue: [],
            updateResetKey: 0,
            expandedSku: null,
            isMounted: false,
            isRestoredFromSession: false,
            diamondCaratCode: 'diamond_carat_weight',
            queryString: null,
            customSearchPath: STATIC_ROUTES.CUSTOM_SEARCH,
            firedProducts: new Set(),
            _lastFiredSku: null,
            _lastFiredCount: 0
        };
    },
    async mounted() {
        this.isMounted = true;
        this.isFilterShow = !this.$isTabAndMobile; // Show Filter on Desktop

        const saved = this.filterState;
        if (saved) {
            this.isRestoredFromSession = true;
            this.filterData = saved.filters;
            this.page = saved.page;
            this.limit = saved.limit;
            this.queryString = saved.query;
            this.restoreInfiniteList(saved.page, saved.limit, saved.scrollY, saved.productUrlKey);
            this.initIntersectionObserver();
            this.defaultOutsideFilter();
            this.$store.commit('setFilters', this.filterData);
            this.$store.commit('setFilterCount');
            return;
        }
        // 1️⃣ Assign filters and get the query to push
        const query = await this.getFinalQuery();
        // 2️⃣ Push query once (defaults + postfix merged)
        if (query && Object.keys(query).length && !Object.keys(this.$route.query)?.length) {
            this.$router.push({ query });
        } else {
            // 3️⃣ Fetch diamonds manually after route is finalized
            this.handleRouteQueryChange(query);
        }

        this.isFilterShow = !this.$isMobile; // Show Filter on Desktop

        // Tooltip logic (unchanged)
        if (import.meta.client) {
            const hasSeenTooltip = sessionStorage?.shownFastShippingTooltip;
            const otherTabTriggered = localStorage.getItem('tooltipShownThisSession');

            if (!hasSeenTooltip && !otherTabTriggered) {
                this.showFastShippingTooltip = true;

                // Set flags in both session and local storage
                sessionStorage.setItem('shownFastShippingTooltip', 'true');
                localStorage.setItem('tooltipShownThisSession', 'true');
            }

            // Listen for storage changes from other tabs (to avoid duplicate popups)
            window.addEventListener('storage', (event) => {
                if (event.key === 'tooltipShownThisSession') {
                    this.showFastShippingTooltip = false;
                }
            });
        }

        // Default filter
        this.defaultOutsideFilter();

        await this.$nextTick(() => {
            console.log('intersection observer called immediately');
            this.initIntersectionObserver();   // Init Intersection Observer
        });
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
        getOriginCode() {
            return this.$route.fullPath?.includes(attributeCodes.labGrownCode) ? attributeCodes.labGrownCode : attributeCodes.naturalCode;
        },
        appliedFilterJson() {
            let { finalFilterData } = this.getFilterValues();
            return finalFilterData || {};
        },
        tabs() {
            let data = [{ text: (this.$isMobile ? `Items` : `Results`) + ` ${this.totalProducts ? `(${this.totalProducts.toLocaleString()})` : ''} ` }];
            let compareCount = this.$store.state.comparePairList?.length;
            if (!this.$isMobile) data.push({ text: `Compare` + ` ${compareCount ? `(${compareCount.toLocaleString()})` : ''}`, icon: 'compare-fill' });
            return data;
        },
    },
    methods: {
        async onScrollerUpdate(start, end, visibleStartIndex, visibleEndIndex) {
            let newProducts = [];
            const products = this.filteredList.slice(visibleStartIndex, visibleEndIndex + 6);
            newProducts = products.filter(product => {
                if (this.firedProducts.has(product.sku))
                    return false;
                this.firedProducts.add(product.sku);
                return true;
            });
            if (!newProducts.length)
                return;
                        
            const MAX_TRACKED = 5000;
    
            if(this.firedProducts.size > MAX_TRACKED) {
                this.firedProducts.clear();
            }
            await this.$nextTick();
            this.fireViewItemList(newProducts);
        },

        async fireViewItemList(items) {
            const normalizedItems = Array.isArray(items) ? items : [items];
            const count = normalizedItems.length;
            if (!count) return;

            const lastSku = normalizedItems[count - 1]?.sku ?? null;

            // Skip if this looks like the same batch as last time (same last SKU + same size).
            if (lastSku && lastSku === this._lastFiredSku && count === this._lastFiredCount) {
                return;
            }

            // Set the guard BEFORE any await — must happen synchronously so a second
            // call arriving before this one finishes still sees the updated guard.
            this._lastFiredSku = lastSku;
            this._lastFiredCount = count;

            await this.$store.commit('setProductGtmData', null);

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
            await this.$store.commit('setProductGtmData', gtmEventData);
            const additionalData = { item_list_name: `search-${this.type}`, skipDuplicates: true };

            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: 'view_item_list', txnId: null, additionalData });
        },
        shippingUpdated() {
            this.shipping = !this.shipping;
            this.$router.replace({ query: { ...this.$route.query, shipping: this.shipping } });
        },
        getRouteState() {
            return {
                filters: this.filterData,
                page: this.page,
                limit: this.limit,
                scrollY: window.scrollY,
                query: this.queryString
            }
        },
        toggleItem(item) {
            this.expandedSku = this.expandedSku === item.sku ? null : item.sku
        },
        defaultOutsideFilter(query = null) {
            let queryParam = query || this.$route.query;
            if (queryParam?.sort_column) {
                this.sortByColumn = queryParam?.sort_column;
                this.sortByDir = queryParam?.sort_direction;
            }
            let queryShippingParam = queryParam?.shipping;
            if (typeof queryShippingParam === 'string') {
                this.shipping = queryShippingParam == 'true' ? 1 : 0;
            } else {
                this.shipping = queryParam?.shipping == true ? 1 : 0;
            }
        },
        sortFilterList(data) {
            if (data && Object.keys(data).length) {
                this.sortByColumn = data.key;
                this.sortByDir = data.order;
                this.$store.commit('setFilters', { key: 'sort_column', value: data.key });
                this.$store.commit('setFilters', { key: 'sort_direction', value: data.order });
                this.$store.commit('setFilterCount');
            }
        },
        assignFilters(queryParams) {
            if (queryParams && Object.keys(queryParams).length) {

                const { finalFilterData } = this.getFilterValues(queryParams);

                if (finalFilterData && Object.keys(finalFilterData).length) {
                    this.$store.commit('setFilters', null);
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
                        this.$store.commit('setFilters', { key, value: filterValue });
                    });
                }

                this.filterData = this.$store.getters.getFilters;
            }
        },
        getFinalQuery() {
            let baseQuery = null;
            let queryPresent = Object.keys(this.$route.query)?.length > 0;
            if (!this._getSavedFilterState() && !queryPresent) {
                baseQuery = this.updateFilterRanges();
                this.assignFilters(baseQuery);
                return baseQuery;
            }
            // 1️⃣ Start with default / cookie / current query
            baseQuery = queryPresent ? this.$route.query : this._getSavedFilterState() ?? {};

            this.assignFilters(baseQuery);
            return baseQuery;
        },
        async handleRouteQueryChange(newQuery) {
            if (this.isRestoredFromSession) {
                // Restore from session
                this.isRestoredFromSession = false;
                return;
            }
            // No query exists
            if (newQuery && !Object.keys(newQuery).length) {
                newQuery = this._getSavedFilterState();
                this.$router.replace({ query: newQuery });
            }
            this.page = 1
            this.loader = true;
            await this.assignFilters(newQuery);
            this.setCookies(newQuery);
            this.fetchDiamonds()
        },
        async fetchDiamonds() {
            const fetchPromise = (async () => {
                try {
                    if (this.page === 1) {
                        this.filteredList = [];
                        this.loader = true;
                        this.scrollToSection();
                    } else {
                        this.bottomLoader = true;
                        this.$bus.emit('aria-announce', 'Loading more diamonds, please wait.');
                    }

                    const defaultParams = {      // Default Params
                        type: this.type ?? 'diamond-pair',
                        limit: this.limit ?? 48,
                        page: this.page ?? 1,
                        sort_column: this.sortByColumn ?? 'price',
                        sort_direction: this.sortByDir ?? 'asc',
                        [attributeCodes.diamondOriginCode]: this.getOriginCode,
                        shipping: this.shipping ? 1 : 0
                    };

                    const { filterValues } = this.getFilterValues();
                    const merged = { ...defaultParams, ...filterValues };

                    const queryParams = Object.fromEntries(
                        Object.entries(merged).filter(([key, value]) => {
                            if (!value) return false;
                            if (Array.isArray(value) && value.length === 0) return false;
                            return true;
                        })
                    );

                    //Assign global query params
                    this.queryString = queryParams;
                    const queryString = new URLSearchParams(this.queryString).toString();  // Convert to query string

                    const response = await api.getFitleredProductList('product-search', this.$axios, queryString, this.$cookies);

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

                        const lightweightData = rawData?.map(this.toLightweightDiamond);
                        const frozenChunk = Object.freeze(lightweightData);

                        this.totalProducts = response.data?.pagination?.total_products;
                        if (this.page === 1) {
                            this.filteredList = frozenChunk;
                            this.$nextTick(() => {
                                this.$bus.emit('aria-announce', `${this.filteredList?.length} diamonds found out of ${this.totalProducts} total.`);
                            });
                        } else {
                            this.filteredList = Object.freeze([...this.filteredList, ...frozenChunk]);
                            if (lightweightData.length) {
                                this.$nextTick(() => {
                                    this.$bus.emit('aria-announce', `${lightweightData.length} more diamonds loaded. Now showing ${this.filteredList?.length} of ${this.totalProducts} total.`);
                                });
                            }
                        }
                    }
                } catch (err) {
                    console.error('Fetch failed:', err)
                } finally {
                    // Do NOT directly turn off loader here
                    this.$nextTick(() => {
                        this.isFetching = false;
                    });
                }
            })();

            // Add promise to queue
            this.fetchQueue.push(fetchPromise);

            // Wait for this specific fetch to finish
            await fetchPromise;

            // Remove from queue
            this.fetchQueue = this.fetchQueue.filter(p => p !== fetchPromise);

            // ✅ If no more fetches are running, turn off loaders
            if (this.fetchQueue.length === 0) {
                this.loader = false;
                this.bottomLoader = false;
            }
        },
        toLightweightDiamond(item) {
            return {
                ...item
            };
        },
        scrollToSection() {
            if (this.$refs.productContainer) {
                const top = this.$refs.productContainer.getBoundingClientRect().top;
                if (top > window.innerHeight || top < 0) {
                    this.$refs.productContainer.scrollIntoView();
                }
            }
        },
        initIntersectionObserver() {
            // Disconnect previous if exists
            if (this.observer) this.observer.disconnect();

            const options = {
                root: null,
                // "2500px" means: "Pretend the viewport extends 2500px lower than it does."
                // This triggers the callback significantly earlier.
                rootMargin: '0px 0px 200px 0px',
                threshold: 0
            };

            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !this.isFetching && this.filteredList?.length && this.totalProducts > this.filteredList.length && !this.isRestoredFromSession) {
                    this.page++;
                    this.fetchDiamonds();
                }
            }, options);

            if (this.$refs.infiniteTrigger) {
                this.observer.observe(this.$refs.infiniteTrigger);
            }
        },
        setCookies(newQuery) {
            if (!import.meta.client) return;
            try {
                if (newQuery) {
                    const serialized = JSON.stringify(newQuery);
                    sessionStorage.setItem(this.type, serialized);
                    localStorage.setItem(this.type, serialized);
                } else {
                    sessionStorage.removeItem(this.type);
                    localStorage.removeItem(this.type);
                }
            } catch { }
        },
        _getSavedFilterState() {
            if (!import.meta.client) return null;
            try {
                const session = sessionStorage.getItem(this.type);
                if (session) return JSON.parse(session);
                const local = localStorage.getItem(this.type);
                if (local) return JSON.parse(local);
            } catch { }
            return null;
        },
        clearFilters() {
            this.filterData = {};
            this.setCookies(null);
            this.$store.commit('setFilters', null);
            this.$store.commit('setFilters', { key: 'type', value: this.type });
            this.$store.commit('setFilters', { key: attributeCodes.diamondOriginCode, value: this.getOriginCode });
            this.$store.commit('setFilters', { key: 'sort_column', value: 'price' });
            this.$store.commit('setFilters', { key: 'sort_direction', value: 'asc' });
            this.$store.commit('setFilterCount');
            if (this.$isMobile) this.updateResetKey++;
        },
        async addNewQueryParams() {
            let queryParams = {};
            if (this.filterData && typeof this.filterData == 'object' && Object.keys(this.filterData).length > 0) {
                Object.entries(this.filterData).forEach(([key, value]) => {
                    let val = '';
                    if (key && key != 'type') {
                        if (value) {
                            if (Array.isArray(value) && value.length) {
                                val = value
                                    .map(item => item?.code)
                                    .filter(code => typeof code === 'string' && code !== this.filterType)
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
                    const isKeywordSearch = !!this.filterData?.search;
                    this.$store.dispatch("runGtmEvent", {
                        store: this.$store,
                        action_type: isKeywordSearch
                        ? "keyword_search"
                        : "filter_item_list",
                        additionalData: {
                        filters: this.buildGtmFilters()
                        }
                    });
                    let persistQuery = this._getSavedFilterState();
                    this.$router.push({ query: { ...persistQuery, ...queryParams } });
                }
            }
        },
        buildGtmFilters() {
            const filters = [];

            Object.entries(this.filterData || {}).forEach(([key, value]) => {
                if (!value) return;
                const filter = Object.values(this.filterList || {}).find(item => item.code === key);
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
                    : this.type,
                name:
                    key === "search" ? "keyword" : filter?.label || filter?.name || key,
                values
                });
            });
            return filters;
        },
        getFilterValues(preAppliedFilters = null) {
            const queryParams = preAppliedFilters ?? this.$route.query;
            const filterValues = {};
            const finalFilterData = {};

            if (!this.filterList) {
                return { filterValues, finalFilterData };
            }

            Object.entries(queryParams).forEach(([key, value]) => {
                const filterItemData = Object.values(this.filterList)
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
        },
        updateFilterRanges() {
            let attributeValues = this.filterList;
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
                        if (key == this.diamondCaratCode) {
                            min = min.toFixed(2);
                            max = max.toFixed(2);
                        }
                        diamondFilters[key] = JSON.stringify({ 'min': min, 'max': max });
                    }
                }
            }
            return diamondFilters;
        },
        removeFilter(data) {
            const { item, key } = data;

            //Clone query object
            const queryParams = { ...this.$route.query };

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
            this.$router.push({ query: queryParams });
        },
        toggleFilter() {
            this.isFilterShow = !this.isFilterShow;
            document.body.style.overflow = this.isFilterShow ? 'hidden' : '';
        },
        async restoreInfiniteList(lastPage, limit, scrollY, productUrlKey) {
            const PARALLEL_THRESHOLD = 20;

            if (lastPage <= PARALLEL_THRESHOLD) {
                await this.restoreShallow(lastPage, limit, scrollY, productUrlKey);
            } else {
                this.isRestoredFromSession = false;
                // 1️⃣ Assign filters and get the query to push
                const query = await this.getFinalQuery();
                this.handleRouteQueryChange(query);
            }
        },
        // restoreDeep(lastPage, limit, scrollY) {
        //   console.log("restoreDeep");
        // },
        async restoreShallow(lastPage, limit, scrollY, productUrlKey) {
            try {
                const promises = [];
                const params = new URLSearchParams(this.queryString);  // Convert to query string
                this.loader = true;

                // validate passed params
                let limitParam = limit || 48;

                for (let i = 1; i <= lastPage; i++) {
                    params.set("limit", limitParam);
                    params.set("page", i);

                    const queryString = params.toString();

                    promises.push(
                        api.getFitleredProductList(
                            'product-search',
                            this.$axios,
                            queryString,
                            this.$cookies
                        )
                    );
                }
                const responses = await Promise.all(promises);
                const allItems = responses.flatMap((r) => r.data?.data || []);

                this.totalProducts = responses?.length ? responses[0]?.data?.pagination?.total_products : 0;
                this.filteredList = Object.freeze(allItems);
                this.page = lastPage;
                this.loader = false;
                this.hasFetchedOnce = !this.filteredList.length;
                this.finishRestoration(scrollY, productUrlKey);
            } catch (e) {
                console.log(e);
                this.fetchDiamonds(); // fallback
            }
        },
        finishRestoration(scrollY, productUrlKey) {
            this.$nextTick(() => {
                setTimeout(() => {
                    let rowIndex = 0;
                    let scrollItem = null;
                    const getPairKeySegment = (url) => {
                        const [path, query] = url.split('?');
                        const params = new URLSearchParams(query);

                        const first = params.get('first_pair_key');
                        const second = params.get('second_pair_key');

                        return `${path}?first_pair_key=${first}&second_pair_key=${second}`;
                    };

                    const normalizedProductKey = getPairKeySegment(productUrlKey);

                    rowIndex = this.filteredList.findIndex(row => {
                        return normalizedProductKey.includes(row.pair_url_key) || row.pair_url_key === normalizedProductKey;
                    });

                    if (rowIndex !== -1) {
                        this.expandedSku = this.filteredList[rowIndex]?.sku;
                    }
                    scrollItem = this.$refs.dynamicScrollerList;
                    // to show item in viewport
                    rowIndex = rowIndex > 7 ? rowIndex - 7 : rowIndex;

                    if (this.isMobile) {
                        rowIndex = rowIndex - 2;
                    }
                    if (rowIndex !== -1) {
                        this.$nextTick(() => {
                            scrollToRow(scrollItem, rowIndex)
                        })
                    }
                    // window.scrollTo(0, scrollY);
                    // Unlock normal behavior AFTER restore
                    this.$nextTick(() => {
                        this.isRestoredFromSession = false;
                        this.initIntersectionObserver();
                    });
                }, 100);
            });
        },
    },
    watch: {
        '$store.state.filterCount': {
            async handler(newValue, oldValue) {
                this.filterData = this.$store.getters.getFilters;
                await this.addNewQueryParams();
            },
            deep: true,
            immediate: true
        },
        '$route.query': 'handleRouteQueryChange'
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect()
            this.observer = null
        }
    },

};
</script>
<style scoped>
.scroller {
    min-height: 100vh;
}
</style>
