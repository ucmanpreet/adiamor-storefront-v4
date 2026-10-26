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
                                        @click="$router.push(customSearchPath)">Request a
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
<script>
import api from "~/api-client/rest-api/index.js";
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

export default {
    name: "SettingSearchComponent",
    props: ["filterList", "filterState"],
    components: {
        DynamicScroller,
        DynamicScrollerItem,
        SearchBanner,
        CustomFilter,
        Button,
        SearchSorting,
        Icon,
        AppliedFilter,
        SettingInsideSearchSkeleton,
        SettingGridCard,
        NoDataFound,
        MediaImage
    },
    data() {
        return {
            page: 1,
            limit: 48,
            loader: false,
            isFilterShow: false,
            filteredList: [],
            sortOpt: settingSotingOptions,
            sortByColumn: 'sort_order',
            sortByDir: '',
            selectedTab: 0,
            totalProducts: 0,
            isFetching: false,
            lastRenderedRowIndex: -1,// Store the scroller's position
            bottomLoader: false,
            type: null,
            cursorToken: null,
            hasFetchedOnce: false,
            fetchQueue: [],
            isRestoredFromSession: false,
            queryString: null,
            pageCursors: [],
            selectedVariants: [],
            customSearchPath: STATIC_ROUTES.CUSTOM_SEARCH,
            firedProducts: new Set(),
            _lastFiredSku: null,
            _lastFiredCount: 0
        };
    },
    created() {
       this._lastFiredSku = null;
       this._lastFiredCount = 0;
    },
    async mounted() {
        this.type = this.preFix;
        const saved = this.filterState;
        console.log(saved, 'mounted');
        if (saved) {
            this.isRestoredFromSession = true;
            this.filterData = saved.filters;
            this.page = saved.page;
            this.limit = saved.limit;
            this.queryString = saved.query;
            this.pageCursors = saved.pageCursors;
            this.cursorToken = saved.pageCursors[saved.pageCursors?.length - 1];
            this.selectedVariants = saved.selectedVariants;


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
            this.handleRouteQueryChange(query);
        }

        // Default filter
        this.defaultOutsideFilter();

        await this.$nextTick(() => {
            console.log('intersection observer called immediately');
            this.initIntersectionObserver();   // Init Intersection Observer
        });
    },
    computed: {
        isMobile() {
            return this.$isMobile;
        },
        columns() {
            if (this.isMobile) return 2;
            return 4; // Desktop
        },
        gridBuffer() {
            const rows = Math.ceil(this.filteredList?.length / this.columns);
            return Math.max(rows * 400 + 600, 1200);
        },
        chunkedFilteredList() {
            if (!this.filteredList?.length) return []

            const cols = this.columns
            const result = []

            for (let i = 0; i < this.filteredList?.length; i += cols) {
                const first = this.filteredList[i]
                result.push({
                    id: `row-${first.sku}`,
                    data: this.filteredList.slice(i, i + cols)
                })
            }

            return result;
        },
        appliedFilterJson() {
            let { finalFilterData } = this.getFilterValues();
            return finalFilterData || {};
        },
        storedFilterKey() {
            const prefix  = this.$route.params?.prefix?.toLowerCase() || '';
            const postfix = this.$route.params?.postfix?.toLowerCase() || '';

            if (this.preFix === 'engagement-rings') {
                return prefix;
            }

            if (
                this.preFix === 'wedding-rings' &&
                (postfix.includes('mens') || postfix.includes('womens'))
            ) {
                return postfix || prefix;
            }

            return prefix;
        },
        phoneNumber() {
		  return this.$store.state.phoneNumber;
		},
		telPhoneNumber() {
		  return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
		},
        postFix() {
            return cleanPostfix(this.$route.params?.postfix?.toLowerCase()) || this.$route.params?.postfix?.toLowerCase();
        },
        preFix() {
		  let preFix = this.$route.params?.prefix;
		  return preFix ? preFix : null;
		},
    },
    methods: {
        async onScrollerUpdate(start, end, visibleStartIndex, visibleEndIndex) {
            let newProducts = [];
            const rows = this.chunkedFilteredList.slice(
                visibleStartIndex,
                visibleStartIndex == 0 ? visibleEndIndex : visibleEndIndex + 3
            );

            for (const row of rows) {
                if (!row?.data) continue;

                for (const product of row.data) {
                    const sku = product?.sku && product?.type != 'promo' ? product?.sku : null;

                    if (!sku || this.firedProducts.has(sku))
                        continue;

                    this.firedProducts.add(sku);
                    newProducts.push(product);
                }
            }
            if (!newProducts.length)
                return;
                        
            const MAX_TRACKED = 5000;
    
            if(this.firedProducts.size > MAX_TRACKED) {
                this.firedProducts.clear();
            }
            await this.$nextTick();
            await this.fireViewItemList(newProducts);
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
            
            this._lastFiredSku = lastSku;
            this._lastFiredCount = count;
            await this.$store.commit('setProductGtmData', null);
            const gtmEventData = normalizedItems.map((item, index) => {
                if(item?.type === 'promo') return;                
                const variantSku = this.selectedVariants?.[item?.sku];

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
            await this.$store.commit('setProductGtmData', gtmEventData);
            const additionalData = { item_list_name: `search-${this.type}`, skipDuplicates: true };

            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: 'view_item_list', txnId: null, additionalData });
        },
        fireEvent() {
          this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : 'view_item_list_product_details' });   
        },
        setVariantData(data) {
            this.selectedVariants[data?.sku] = data?.variant?.sku;
        },
        getRouteState() {
            return {
                filters: this.filterData,
                page: this.page,
                limit: this.limit,
                scrollY: window.scrollY,
                query: this.queryString,
                pageCursors: this.pageCursors,
                selectedVariants: this.selectedVariants
            }
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
            const promises = [];
            const params = new URLSearchParams(this.queryString);  // Convert to query string
            this.loader = true;

            for (let i = 1; i <= lastPage; i++) {
                params.set("limit", limit);
                this.pageCursors[i] ? params.set("cursor", this.pageCursors[i]) : '';

                const queryString = params.toString();

                promises.push(
                    api.getFitleredProductList(
                        "settings",
                        this.$axios,
                        queryString,
                        this.$cookies
                    )
                );
            }
            try {
                const responses = await Promise.all(promises);
                const allItems = responses.flatMap((r) => r.data?.data || []);

                this.totalProducts = responses?.length ? responses[0]?.data?.pagination?.total_products : 0;
                this.filteredList = Object.freeze(allItems);
                this.page = lastPage;
                this.loader = false;
                this.hasFetchedOnce = !this.filteredList?.length;

                this.finishRestoration(scrollY, productUrlKey);
            } catch (e) {
                this.fetchDiamonds(); // fallback
            }
        },
        finishRestoration(scrollY, productUrlKey) {
            this.$nextTick(() => {
                setTimeout(() => {
                    let rowIndex = this.chunkedFilteredList.findIndex(row =>
                        row.data.some(item => item.url_key === productUrlKey)
                    )

                    if (this.isMobile) {
                        rowIndex = rowIndex < 10 ? rowIndex - 1 : rowIndex - 2;
                    } else if (rowIndex !== -1) {
                        rowIndex = rowIndex - 1;
                    }
                    if (rowIndex !== -1) {
                        this.$nextTick(() => {
                            scrollToRow(this.$refs.dynamicScroller, rowIndex)
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
        defaultOutsideFilter() {
            if (this.$route.query.sort_column) {
                this.sortByColumn = this.$route.query.sort_column;
                this.sortByDir = this.$route.query.sort_direction;
            }
        },
        goTo(link) {
            window.open(link, '_blank');
        },
        assignFilters(queryParams) {
            if (queryParams && Object.keys(queryParams).length) {

                const { finalFilterData } = this.getFilterValues(queryParams);

                if (finalFilterData && Object.keys(finalFilterData).length) {
                    this.$store.commit('setFilters', null);
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

                        this.$store.commit('setFilters', { key, value: filterValue });
                    });
                }

                this.filterData = this.$store.getters.getFilters;
            }
        },
        getFinalQuery() {
            let baseQuery = null;
            let queryPresent = Object.keys(this.$route.query)?.length > 0;

            if (!this.$cookies.get(this.storedFilterKey) && !queryPresent) {
                baseQuery = this.updateFilterRanges();
                baseQuery = this.getPostFixQuery(baseQuery);
                this.assignFilters(baseQuery);
                return baseQuery;
            }
            // 1️⃣ Start with default / cookie / current query
            baseQuery = queryPresent ? this.$route.query : this.$cookies.get(this.storedFilterKey) ?? {};
            baseQuery = this.getPostFixQuery(baseQuery);
            this.assignFilters(baseQuery);
            return baseQuery;
        },

        getPostFixQuery(baseQuery) {
            if (!this.postFix) return baseQuery;
            // Loop through all filters
            Object.values(this.filterList).forEach(filter => {
                if (!filter?.value || !Array.isArray(filter.value)) return;

                // Collect all codes in this filter that include postFix
                const matchedCodes = filter.value
                    .filter(item => item?.code?.includes(this.postFix))
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
        },
        async handleRouteQueryChange(newQuery) {
            if (this.isRestoredFromSession) {
                // Restore from session
                this.isRestoredFromSession = false;
                return;
            }
            // No query exists
            if (newQuery && !Object.keys(newQuery).length) {
                newQuery = this.$cookies.get(this.storedFilterKey);
                this.$router.replace({ query: newQuery });
            }

            this.setCookies(newQuery);
            await this.assignFilters(newQuery);
            this.page = 1;
            this.loader = true;
            this.cursorToken = null;
            this.fetchSettings();

        },
        setCookies(newQuery) {
            this.$cookies.set(this.storedFilterKey, newQuery, {  // Set Filter State in Cookie
                path: STATIC_ROUTES.HOME,
                maxAge: 60 * 60 * 24 * 7
            })
        },
        async fetchSettings() {
            const fetchPromise = (async () => {
                try {
                    if (this.isFetching) return;  // Avoid multiple requests
                    const metaData = this.$store.state.metaData || this.$store.getters.getMetaData;;
                    let categoryId = null;
                    if (metaData?.filter_rule) {
                        let rules = (typeof metaData.filter_rule === 'string') ? JSON.parse(metaData.filter_rule) : metaData.filter_rule;
                        categoryId = rules?.style ?? null;
                    }
                    this.isFetching = true;
                    if (this.page === 1) {
                        this.filteredList = [];
                        // this.loader = true;
                        // this.cursorToken = null;
                        this.scrollToSection();
                    } else {
                        if (!this.cursorToken) return;
                        this.bottomLoader = true;
                    }

                    const defaultParams = {      // Default Params
                        type: this.type ?? this.preFix,
                        limit: this.limit ?? 48,
                        sort_column: this.sortByColumn ?? 'sort_order',
                        sort_direction: this.sortByDir ?? '',
                    };
                    // Add category id
                    if (categoryId) defaultParams.category_id = categoryId;

                    // On Sale
                    if (this.postFix == 'sale') defaultParams['on_sale'] = true;

                    const { filterValues } = this.getFilterValues();
                    const mergedParams = {
                        ...defaultParams,
                        ...filterValues,
                        cursor: this.cursorToken
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
                    this.queryString = rest;

                    const queryString = new URLSearchParams(queryParams).toString();  // Convert to query string

                    const response = await api.getFitleredProductList('settings', this.$axios, queryString, this.$cookies);
                    // Check for valid response and update state
                    if (response?.data) {
                        // let responseList = response.data.data;
                        // responseList = responseList.map(item => Object.freeze(item));
                        const rawData = response.data?.data;

                        const lightweightData = rawData?.map(this.toLighteightSetting);
                        const frozenChunk = Object.freeze(lightweightData);

                        if (this.page === 1) {
                            // Reset list
                            this.filteredList = frozenChunk;
                        } else {
                            // Append to list.
                            this.filteredList = Object.freeze([...this.filteredList, ...frozenChunk]);
                        }
                        this.totalProducts = response.data?.pagination?.total_products;
                        this.cursorToken = response.data?.next_cursor;
                        this.pageCursors[this.page + 1] = this.cursorToken;
                    }
                } catch (err) {
                    console.error('Fetch failed:', err)
                } finally {
                    // Do NOT directly turn off loader here
                    this.isFetching = false;
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
                this.hasFetchedOnce = !this.filteredList?.length;
            }
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
                rootMargin: '0px 0px 2500px 0px',
                threshold: 0
            };

            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !this.isFetching && this.filteredList?.length && this.cursorToken && !this.isRestoredFromSession) {
                    this.page++;
                    this.fetchSettings();
                }
            }, options);

            if (this.$refs.infiniteTrigger) {
                this.observer.observe(this.$refs.infiniteTrigger);
            }
        },
        clearFilters() {
            this.hasFetchedOnce = false;
            this.filterData = {};
            this.setCookies(null);
            this.$store.commit('setFilters', null);
            this.$store.commit('setFilters', { key: 'type', value: this.type });
            this.$store.commit('setFilters', { key: 'sort_column', value: 'sort_order' });
            this.$store.commit('setFilters', { key: 'sort_direction', value: null });
            this.$store.commit('setFilterCount');
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
                    this.$store.dispatch("runGtmEvent", {
                        store: this.$store,
                        action_type: "filter_item_list",
                        additionalData: {
                        filters: this.buildGtmFilters()
                        }
                    });
                    let persistQuery = this.$cookies.get(this.storedFilterKey);                    
                    this.$router.push({ query: { ...persistQuery, ...queryParams } });
                }
            }
        },
        buildGtmFilters() {
            const filters = [];

            Object.entries(this.filterData || {}).forEach(([key, value]) => {
                if (!value) return;
                const filter = Object.values(this.filterList || {}).find(item => item.code === key);
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
                product_type: this.type,
                name: filter?.label || filter?.name || key,
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
        },
        updateFilterRanges() {
            // Apply default shape only in rings
            if (this.preFix != 'engagement-rings') return;

            let attributeValues = this.filterList;
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
                        if (key == this.diamondCaratCode) {
                            min = min.toFixed(2);
                            max = max.toFixed(2);
                        }
                        ringFilters[key] = JSON.stringify({ 'min': min, 'max': max });
                    }
                }
            }
            return ringFilters;
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
            
            if(queryParams && !Object.keys(queryParams).length){
                this.filterData = null;
                this.setCookies(null);
                this.$store.commit('setFilters', null);
                this.$store.commit('setFilters', { key: 'type', value: this.type });
                this.$store.commit('setFilters', { key: 'sort_column', value: this.sortByColumn });
                this.$store.commit('setFilters', { key: 'sort_direction', value: this.sortByDir });
            }
            this.$router.push({ query: queryParams });
        },
        handleChange(event) {
            const selectedValue = event.target.value;
            const selectedItem = this.sortOpt[selectedValue];
            if (selectedItem && selectedItem?.colName) {
                this.sortByColumn = selectedItem.colName;
                this.sortByDir = selectedItem.colValue;
                this.$store.commit('setFilters', { key: 'sort_column', value: this.sortByColumn });
                this.$store.commit('setFilters', { key: 'sort_direction', value: this.sortByDir });
                this.$store.commit('setFilterCount');
            }
        },
        toggleFilter() {
            this.isFilterShow = !this.isFilterShow;
            document.body.style.overflow = this.isFilterShow ? 'hidden' : '';

            if(this.isFilterShow){         
                this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : 'viewed_search_filters' });
                
                this.$nextTick(() => {
                    const filterEl = this.$refs.customFilter?.$el;
                    if (filterEl) {
                        const focusable = filterEl.querySelector('[aria-label="Close filters"]');
                        if (focusable) focusable.focus();
                    }
                })
            }
        },
        handleFilterClose() {
            this.isFilterShow = false;
            document.body.style.overflow = '';
            this.$nextTick(() => {
                const isMobile = window.innerWidth < 640;
                const btnRef = isMobile
                    ? this.$refs.filterToggleBtnMobile
                    : this.$refs.filterToggleBtn;
                const el = btnRef?.$el ?? btnRef;
                if (el) el.focus();
            });
        },
        handleFilterKeydown(e) {
            if (e.key === 'Escape') {
                this.handleFilterClose();
                return;
            }

            if (e.key !== 'Tab') return;

            const filterEl = this.$refs.customFilter?.$el;
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
        },
        toLighteightSetting(item) {
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
        '$route.query': 'handleRouteQueryChange',
        isFilterShow(val) {
            if (val) {
                document.addEventListener('keydown', this.handleFilterKeydown);
            } else {
                document.removeEventListener('keydown', this.handleFilterKeydown);
            }
        }
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect()
            this.observer = null
        }
        document.removeEventListener('keydown', this.handleFilterKeydown);
        document.body.style.overflow = '';
    },
};
</script>