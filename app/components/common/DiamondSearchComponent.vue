<template>
  <div ref="root">
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-relevant="additions text"
      class="sr-only hidden sm:block"
      ref="ariaStatus"
    >{{ ariaStatusMessage }}</div>

    <div
      role="log"
      aria-live="polite"
      aria-atomic="false"
      aria-relevant="additions"
      class="sr-only"
      ref="ariaLog"
    >{{ ariaLogMessage }}</div>

    <!-- Top panel -->
    <SearchBanner :filterList="filterList" :originCode="getOriginCode" :key="updateResetKey" />

    <div class="max-w-7xl mx-auto w-full px-4 lg:px-8">
      <div class="flex xl:gap-6">

        <CustomFilter
          v-show="isFilterShow && filterList"
          :aria-hidden="!(isFilterShow && filterList)"
          aria-label="Diamond filters"
          :filterList="filterList"
          v-model:isFilter="isFilterShow"
          @closeFilter="closeFilter"
          v-model:filterData="filterData"
          @resetFilters="clearFilters"
        />

        <!-- ── Diamond List ────────────────────────────────────────────────── -->
        <div class="w-full relative" ref="productContainer">

          <!-- ── Sticky Header ─────────────────────────────────────────────── -->
          <div class="flex flex-col sticky z-40 bg-white border-b border-gray-200 top-0">

            <template v-if="!isMobile">
              <div class="flex gap-1 sm:gap-3 items-center py-3 sm:min-h-[65px] border-b border-gray-200 justify-between">
                <Button
                  type="button"
                  colorType="primary"
                  class="font-normal hidden sm:block xl:hidden"
                  @click="toggleFilter()"
                  :aria-expanded="isFilterShow ? 'true' : 'false'"
                  aria-controls="filter-panel"
                >
                  <span class="inline-block">Filters</span>
                </Button>

                <div class="flex items-center gap-1 sm:gap-4 w-full sm:w-auto xl:ml-auto" v-show="!selectedTab">
                  <div class="flex gap-1 sm:gap-3 w-full">
                    <div class="text-sm flex gap-2 lg:gap-3 items-center cursor-pointer relative">
                      <label
                        for="shippingSoon"
                        class="text-sm flex gap-2 items-center cursor-pointer relative"
                        @click.self.stop
                      >
                        <input
                          type="checkbox"
                          id="shippingSoon"
                          name="shippingSoon"
                          class="peer h-4 w-4 appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto cursor-pointer"
                          v-model="shipping"
                          @change="shippingUpdated()"
                          :aria-label="`Shipping Soon filter, currently ${shipping ? 'enabled' : 'disabled'}`"
                        />
                        <Icon name="truck" class="w-5 h-5 text-custom-green" aria-hidden="true" />
                        <svg
                          class="hidden absolute peer-checked:block z-20 pointer-events-none w-4 h-4 self-center justify-self-center text-white"
                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z" fill="currentColor"/>
                        </svg>
                        <span class="hidden sm:block lg:hidden xl:block" aria-hidden="true">Shipping Soon</span>
                        <span class="block sm:hidden" aria-hidden="true">Ships Soon</span>
                      </label>
                      <WithMediaCheckBox :className="'hidden sm:block'" />

                      <!-- Tooltip: trap focus inside and close on Escape -->
                      <div
                        v-if="showFastShippingTooltip"
                        v-click-outside="closeTooltip"
                        role="tooltip"
                        id="fast-shipping-tooltip"
                        class="absolute border border-black shadow-xl rounded-md bg-white translate-y-full sm:translate-y-0 sm:-translate-x-full sm:-left-5 p-2 flex gap-2 min-w-[16.6rem] after:content-[''] after:bg-white after:border-l-0 after:border-t-0 after:border after:border-black after:h-[15px] after:-bottom-[8px] after:top-0 sm:after:top-1/2 after:-translate-y-1/2 after:sm:right-[-8px] after:absolute after:w-[15px] after:transform after:rotate-[227deg] sm:after:rotate-[-45deg] z-30"
                        @keydown.esc="closeTooltip"
                      >
                        <icon name="fast-shipping" class="size-8 flex-none" aria-hidden="true" />
                        <div class="space-y-1 relative pr-6">
                          <button
                            type="button"
                            @click="closeTooltip"
                            class="absolute top-0 right-0 cursor-pointer"
                            aria-label="Close shipping tip"
                            ref="tooltipClose"
                          >
                            <icon name="close" class="size-4" aria-hidden="true" />
                          </button>
                          <p class="!font-semibold">On a deadline?</p>
                          <p class="text-xs">Show me what arrives the soonest.</p>
                        </div>
                      </div>
                    </div>

                    <SearchSorting
                      @change="handleChange($event)"
                      :sortOpt="sortOpt"
                      v-model:sortByColumn="sortByColumn"
                      v-model:sortByDir="sortByDir"
                    />
                  </div>
                </div>
              </div>

              <div class="flex sm:items-center flex-row gap-2 justify-between -mt-1 py-4">
                <div class="flex items-center gap-2">
                  <TabComponent
                    class="block"
                    :tabs="tabs"
                    v-model:selectedTab="selectedTab"
                    @update:selectedTab="selectedTab = $event"
                    :key="selectedTab"
                  />
                  <button
                    type="button"
                    @click="clearFilters"
                    class="text-xs font-light flex items-center gap-1"
                    :class="{ 'hidden': !Object.keys(appliedFilterJson)?.length || !isMobile }"
                    aria-label="Reset all filters"
                  >
                    Reset
                    <Icon name="reset" class="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <!-- Grid / List toggle — aria-pressed communicates current state -->
                <div
                  class="flex items-center justify-between text-sm font-normal -mx-2 sm:ml-auto sm:mr-0"
                  role="group"
                  aria-label="View mode"
                >
                  <button
                    type="button"
                    class="px-2 capitalize flex items-center gap-2 hover:text-black"
                    v-for="(item, index) in gridListArr"
                    :key="index"
                    @click="setVuexState(item)"
                    :aria-label="`${item} view`"
                    :aria-pressed="viewMode === item ? 'true' : 'false'"
                  >
                    <Icon :name="item" class="w-5 h-5" :class="viewMode == item ? 'text-black' : 'text-gray-400'" aria-hidden="true" />
                    <span class="hidden sm:block">{{ item }}</span>
                  </button>
                </div>
              </div>
            </template>

            <!-- ── Mobile layout (positions swapped) ──────────────────────── -->
            <template v-else>
              <div class="flex sm:items-center flex-row gap-2 justify-between -mt-1 py-4">
                <div class="flex items-center gap-2">
                  <TabComponent
                    class="block"
                    :tabs="tabs"
                    v-model:selectedTab="selectedTab"
                    @update:selectedTab="selectedTab = $event"
                    :key="selectedTab"
                  />
                  <button
                    type="button"
                    @click="clearFilters"
                    class="text-xs font-light flex items-center gap-1"
                    :class="{ 'hidden': !Object.keys(appliedFilterJson)?.length || !isMobile }"
                    aria-label="Reset all filters"
                  >
                    Reset
                    <Icon name="reset" class="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <div
                  class="flex items-center justify-between text-sm font-normal -mx-2 sm:ml-auto sm:mr-0"
                  role="group"
                  aria-label="View mode"
                >
                  <button
                    type="button"
                    class="px-2 capitalize flex items-center gap-2 hover:text-black"
                    v-for="(item, index) in gridListArr"
                    :key="index"
                    @click="setVuexState(item)"
                    :aria-label="`${item} view`"
                    :aria-pressed="viewMode === item ? 'true' : 'false'"
                  >
                    <Icon :name="item" class="w-5 h-5" :class="viewMode == item ? 'text-black' : 'text-gray-400'" aria-hidden="true" />
                    <span class="hidden sm:block">{{ item }}</span>
                  </button>
                </div>
              </div>

              <div class="flex gap-1 sm:gap-3 items-center py-3 sm:min-h-[65px] border-b border-gray-200 justify-between">
                <Button
                  type="button"
                  colorType="primary"
                  class="font-normal hidden sm:block xl:hidden"
                  @click="toggleFilter()"
                  :aria-expanded="isFilterShow ? 'true' : 'false'"
                  aria-controls="filter-panel"
                >
                  <span class="inline-block">Filters</span>
                </Button>

                <div class="flex items-center gap-1 sm:gap-4 w-full sm:w-auto xl:ml-auto" v-show="!selectedTab">
                  <div class="flex gap-1 sm:gap-3 w-full">
                    <div class="text-sm flex gap-2 lg:gap-3 items-center cursor-pointer relative">
                      <label
                        for="shippingSoon"
                        class="text-sm flex gap-2 items-center cursor-pointer relative"
                        @click.self.stop
                      >
                        <input
                          type="checkbox"
                          id="shippingSoon"
                          name="shippingSoon"
                          class="peer h-4 w-4 appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto cursor-pointer"
                          v-model="shipping"
                          @change="shippingUpdated()"
                          :aria-label="`Shipping Soon filter, currently ${shipping ? 'enabled' : 'disabled'}`"
                        />
                        <Icon name="truck" class="w-5 h-5 text-custom-green" aria-hidden="true" />
                        <svg
                          class="hidden absolute peer-checked:block z-20 pointer-events-none w-4 h-4 self-center justify-self-center text-white"
                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z" fill="currentColor"/>
                        </svg>
                        <span class="hidden sm:block lg:hidden xl:block" aria-hidden="true">Shipping Soon</span>
                        <span class="block sm:hidden" aria-hidden="true">Ships Soon</span>
                      </label>
                      <WithMediaCheckBox :className="'hidden sm:block'" />

                      <div
                        v-if="showFastShippingTooltip"
                        v-click-outside="closeTooltip"
                        role="tooltip"
                        id="fast-shipping-tooltip"
                        class="absolute border border-black shadow-xl rounded-md bg-white translate-y-full sm:translate-y-0 sm:-translate-x-full sm:-left-5 p-2 flex gap-2 min-w-[16.6rem] after:content-[''] after:bg-white after:border-l-0 after:border-t-0 after:border after:border-black after:h-[15px] after:-bottom-[8px] after:top-0 sm:after:top-1/2 after:-translate-y-1/2 after:sm:right-[-8px] after:absolute after:w-[15px] after:transform after:rotate-[227deg] sm:after:rotate-[-45deg] z-30"
                        @keydown.esc="closeTooltip"
                      >
                        <icon name="fast-shipping" class="size-8 flex-none" aria-hidden="true" />
                        <div class="space-y-1 relative pr-6">
                          <button
                            type="button"
                            @click="closeTooltip"
                            class="absolute top-0 right-0 cursor-pointer"
                            aria-label="Close shipping tip"
                            ref="tooltipCloseMobile"
                          >
                            <icon name="close" class="size-4" aria-hidden="true" />
                          </button>
                          <p class="!font-semibold">On a deadline?</p>
                          <p class="text-xs">Show me what arrives the soonest.</p>
                        </div>
                      </div>
                    </div>

                    <SearchSorting
                      @change="handleChange($event)"
                      :sortOpt="sortOpt"
                      v-model:sortByColumn="sortByColumn"
                      v-model:sortByDir="sortByDir"
                    />
                  </div>
                </div>
              </div>
            </template>

            <!-- Applied Filters -->
            <AppliedFilter
              :appliedFilterJson="appliedFilterJson"
              @removeFilter="removeFilter"
              @clearFilter="clearFilters"
              :filterList="filterList"
              v-if="Object.keys(appliedFilterJson)?.length"
              v-show="!selectedTab"
            />

            <SortingHeader
              @sortdata="sortFilterList"
              v-show="viewMode === 'list'"
              :filterList="filterList"
              :isComapreTab="selectedTab"
              v-model:sortByColumn="sortByColumn"
              v-model:sortByDir="sortByDir"
              :key="`${sortByColumn}-${sortByDir}`"
            />
          </div>

          <!-- ── Compare tab ─────────────────────────────────────────────── -->
          <div
            class="min-h-screen"
            v-show="selectedTab"
            :aria-hidden="!selectedTab ? 'true' : null"
            role="region"
            aria-label="Compare diamonds"
          >
            <CompareSearchComponent :type="type" :viewMode="viewMode" />
          </div>
          <div
            class="min-h-screen"
            v-show="!selectedTab"
            :aria-hidden="selectedTab ? 'true' : null"
            role="region"
            :aria-label="resultsRegionLabel"
            :aria-busy="loader ? 'true' : 'false'"
            ref="resultsRegion"
          >
            <!-- Loading skeleton -->
            <template v-if="loader">
              <div
                v-if="viewMode == 'grid'"
                class="pt-3 pb-4 sm:pb-6 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 md:gap-x-8 md:gap-y-10"
                role="status"
                aria-busy="true"
                aria-label="Loading diamonds, please wait"
              >
                <DiamondSearchInsideSkeleton v-for="n in 9" :key="n" aria-hidden="true" />
              </div>
              <div
                v-else
                class="divide-y divide-gray-200"
                role="status"
                aria-busy="true"
                aria-label="Loading diamonds, please wait"
              >
                <DiamondSearchListInsideSkeleton v-for="n in 10" :key="n" aria-hidden="true" />
              </div>
            </template>

            <!-- ── Grid view ─────────────────────────────────────────────── -->
            <template v-if="filteredList?.length">
              <DynamicScroller
                ref="dynamicScroller"
                :items="chunkedFilteredList"
                :min-item-size="320"
                key-field="id"
                page-mode
                :buffer="gridBuffer"
                v-show="viewMode == 'grid'"
                :prerender="6"
                emit-update
                @update="onScrollerUpdate"
              >
                <template v-slot="{ item, index, active }">
                  <DynamicScrollerItem :item="item" :active="active" :data-index="index">
                    <div class="pt-3 pb-4 sm:pb-6 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 md:gap-x-8 md:gap-y-10 grid-flow-row-dense lg:space-x-0 xl:grid-cols-3">
                      <div
                        v-for="diamond in item.data"
                        :key="`${diamond.sku ?? index}_parent_grid`"
                        class="h-full"
                        :ref="`gridCard_${diamond.sku}`"
                      >
                        <DiamondGridCardMobile
                          :key="`${diamond.sku ?? index}_mobile_grid`"
                          :diamond="diamond"
                          :nav="navRoute"
                          v-if="isMobile"
                        />
                        <DiamondGridCard
                          :key="`${diamond.sku ?? index}_desktop_grid`"
                          :diamond="diamond"
                          :nav="navRoute"
                          v-else
                        />
                      </div>
                    </div>
                  </DynamicScrollerItem>
                </template>
              </DynamicScroller>

              <!-- ── List view ─────────────────────────────────────────────── -->
              <div role="list" aria-label="Diamond search results" v-if="viewMode === 'list'">
                <DynamicScroller
                  ref="dynamicScrollerList"
                  :items="filteredList"
                  key-field="sku"
                  page-mode
                  :buffer="listBuffer"
                  :prerender="10"
                  :min-item-size="80"
                  emit-update
                  @update="onScrollerUpdate"
                >
                  <template #default="{ item, index, active }">
                    <DynamicScrollerItem
                      :item="item"
                      :active="active"
                      :data-index="index"
                      item-class="even:bg-gray-100"
                    >
                      <!-- ROW WRAPPER -->
                      <div
                        role="listitem"
                        class="w-full"
                        :class="{
                          'bg-gray-100': index % 2 === 0,
                          'bg-primary/7': expandedSku === item.sku
                        }"
                        :ref="`listRow_${item.sku}`"
                      >
                        <div
                          class="flex flex-col w-full cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-primary/7 relative min-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                          @click="toggleItem($event, item)"
                          @keydown.enter.prevent="toggleItem($event, item)"
                          @keydown.space.prevent="toggleItem($event, item)"
                          role="button"
                          tabindex="0"
                          :data-row-sku="item.sku"
                          :aria-expanded="expandedSku === item.sku ? 'true' : 'false'"
                          :aria-controls="`row-detail-${item.sku}`"
                          :aria-label="rowAriaLabel(item)"
                        >
                          <DiamondListHeader :diamond="item" :nav="navRoute" />
                        </div>

                        <!-- Expandable detail panel — id must match aria-controls above -->
                        <div
                          v-if="expandedSku === item.sku"
                          :id="`row-detail-${item.sku}`"
                          :key="`${item.sku ?? index}_parent_list`"
                          role="region"
                          :aria-label="`Details for ${item.name}`"
                        >
                          <DiamondListViewMobile
                            :key="`${item.sku ?? index}_mobile_list`"
                            :diamond="item"
                            :nav="navRoute"
                            v-if="isMobile"
                          />
                          <DiamondListView
                            :key="`${item.sku ?? index}_desktop_list`"
                            :diamond="item"
                            :nav="navRoute"
                            v-else
                          />
                        </div>
                      </div>
                    </DynamicScrollerItem>
                  </template>
                </DynamicScroller>
              </div>
            </template>

            <!-- Empty state -->
            <div
              v-if="isEmpty && !isFetching"
              class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5"
              role="status"
              aria-live="polite"
            >
              <NoDataFound :type="type">
                <div class="max-w-sm mx-auto text-center">
                  <p>Use the sliders above to search and compare diamonds, or call us at <a class="text-primary" :href="`tel:${telPhoneNumber}`">{{ phoneNumber }}</a> for assistance.</p>
                  <Button type="button" colorType="primary" class="capitalize mx-auto mt-4" @click="router.push(customSearchPath)">Request a custom search</Button>
                  <Button type="button" colorType="bordered-primary" class="capitalize mx-auto mt-4" @click="clearFilters()">Reset search</Button>
                </div>
              </NoDataFound>
            </div>
          </div>

          <!-- Mobile Filter Button (fixed) -->
          <div v-if="!loader" class="sm:hidden fixed inset-x-3 bottom-3 z-50 bg-white md:static">
            <Button
              type="button"
              colorType="primary"
              class="font-normal w-full flex items-center !text-base gap-1 !border-0"
              @click="toggleFilter()"
              :aria-expanded="isFilterShow ? 'true' : 'false'"
              aria-controls="filter-panel"
            >
              <span class="inline-block">Filters</span>
              <Icon name="filter" class="w-5 h-5 mt-1" aria-hidden="true" />
            </Button>
          </div>

          <!-- Infinite-scroll "load more" skeleton -->
          <template v-if="bottomLoader && totalProducts > filteredList?.length">
            <div
              v-if="viewMode == 'grid'"
              class="pt-3 pb-4 sm:pb-6 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 md:gap-x-8 md:gap-y-10"
              role="status"
              :aria-label="`Loading more diamonds, ${filteredList?.length} of ${totalProducts} shown`"
            >
              <DiamondSearchInsideSkeleton v-for="n in 9" :key="n" aria-hidden="true" />
            </div>
            <div
              v-else
              class="divide-y divide-gray-200"
              role="status"
              :aria-label="`Loading more diamonds, ${filteredList?.length} of ${totalProducts} shown`"
            >
              <DiamondSearchListInsideSkeleton v-for="n in 10" :key="n" aria-hidden="true" />
            </div>
          </template>

          <!-- Infinite scroll trigger (invisible sentinel) -->
          <div ref="infiniteTrigger" id="infiniteTriggerId" style="height: 60px; margin-top: 60px" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiClient from "~/api-client/rest-api/index.js";
import { attributeCodes } from "~/utils/searchConstant";
import { scrollToRow } from '~/utils/virtualScroll.js';
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import { diamondFilters, diamondSortingOptions } from '@/static/js/recommendedFilters';
import DiamondGridCard from '~/components/common/DiamondGridCard.vue';
import SearchBanner from "~/components/common/SearchBanner.vue";
import CustomFilter from "~/components/filter/CustomFilter.vue";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import SearchSorting from "~/components/common/SearchSorting.vue";
import TabComponent from "~/components/ui/TabComponent.vue";
import AppliedFilter from "~/components/common/AppliedFilter.vue";
import SortingHeader from "~/components/sorting/SortingHeader.vue";
import CompareSearchComponent from "~/components/common/CompareSearchComponent.vue";
import DiamondSearchInsideSkeleton from "~/components/skeleton/DiamondSearchInsideSkeleton.vue";
import DiamondSearchListInsideSkeleton from "~/components/skeleton/DiamondSearchListInsideSkeleton.vue";
import NoDataFound from "~/components/common/NoDataFound.vue";
import DiamondListHeader from "~/components/common/DiamondListHeader.vue";
import DiamondListView from "~/components/common/DiamondListView.vue";
import WithMediaCheckBox from "../filter/WithMediaCheckBox.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import { cleanPostfix } from "~/utils/universalHelper";
import DiamondGridCardMobile from "./DiamondGridCardMobile.vue";
import DiamondListViewMobile from "./DiamondListViewMobile.vue";

// Referenced by name from pages/search.vue (<component :is="'DiamondSearchComponent'">)
defineOptions({ name: 'DiamondSearchComponent' });

const props = defineProps(["filterList", "filterState"]);

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const { $bus, $isMobile, $formatPrice } = useNuxtApp();


const type = ref("diamonds");
const page = ref(1);
const limit = ref(48);
const loader = ref(false);
const isFilterShow = ref(false);
const filteredList = shallowRef([]);
const gridListArr = ref(['grid', 'list']);
const viewMode = ref('grid');
const shipping = ref(false);
const showFastShippingTooltip = ref(false);
const sortOpt = ref(diamondSortingOptions);
const sortByColumn = ref('price');
const sortByDir = ref('asc');
const selectedTab = ref(0);
const totalProducts = ref(0);
const isFetching = ref(false);
const bottomLoader = ref(false);
const isEmpty = ref(false);
const isRestoredFromSession = ref(false);
const queryString = ref(null);
const expandedSku = ref(null);
const updateResetKey = ref(0);
const customSearchPath = ref(STATIC_ROUTES.CUSTOM_SEARCH);
const filterData = ref({});
const ariaStatusMessage = ref('');
const ariaLogMessage = ref('');

// Non-reactive instance state
let isToggling = false;
let _focusGeneration = 0;
let _firstNewSku = null;
let _filterOpenerEl = null;
const firedProducts = new Set();
let _lastFiredSku = null;
let _lastFiredCount = 0;
let _fetchController = null;
let _routeDebounceTimer = null;
let _storageHandler = null;
// Debounce timer for aria announcements (prevents rapid-fire messages).
let _announceTimer = null;
let observer = null;

const root = ref(null);
const productContainer = ref(null);
const dynamicScroller = ref(null);
const dynamicScrollerList = ref(null);
const infiniteTrigger = ref(null);
const tooltipClose = ref(null);
const tooltipCloseMobile = ref(null);

const navRoute = computed(() => {
  const segments = route.path.split('/');

  if (segments[2] === 'search') {
    return segments[3]
      ? `${segments[1]}-${segments[3]}`
      : segments[1];
  }

  return null;
});
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));
const isMobile = computed(() => $isMobile);
const columns = computed(() => {
  const width = window.innerWidth;
  if(width <= 1023) {
    return 2;
  }
  return 3; // Desktop
});
const gridBuffer = computed(() => !isMobile.value ? 1200 : 800);
const listBuffer = computed(() => !isMobile.value ? 1200 : 400);
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
const getOriginCode = computed(() => route.fullPath?.includes(attributeCodes.labGrownCode) ? attributeCodes.labGrownCode : attributeCodes.naturalCode);
const appliedFilterJson = computed(() => {
  let { finalFilterData } = getFilterValues();
  if(filterData.value?.search) {
    finalFilterData.search = filterData.value?.search;
  }
  return finalFilterData || {};
});
const tabs = computed(() => {
  let data = [{ text: ($isMobile ? `Items` : `Results`) + ` ${totalProducts.value ? `(${totalProducts.value.toLocaleString()})` : ''} ` }];
  let compareCount = store.compareList?.length;
  if (!$isMobile) data.push({ text: `Compare` + ` ${compareCount ? `(${compareCount.toLocaleString()})` : ''}`, icon: 'compare-fill' });
  return data;
});
const postFix = computed(() => cleanPostfix(route.params?.postfix?.toLowerCase()) || route.params?.postfix?.toLowerCase());
// Human-readable label for the results region landmark.
const resultsRegionLabel = computed(() => {
  if (loader.value) return 'Diamond search results, loading';
  if (isEmpty.value) return 'Diamond search results, no results found';
  return `Diamond search results, ${totalProducts.value ? totalProducts.value.toLocaleString() : 0} total`;
});

async function onScrollerUpdate(start, end, visibleStartIndex, visibleEndIndex) {
    let newProducts = [];
    if(viewMode.value == 'grid'){
      const rows = chunkedFilteredList.value.slice(
          visibleStartIndex,
          visibleStartIndex == 0 ? visibleEndIndex : visibleEndIndex + 3
      );

      for (const row of rows) {
          if (!row?.data) continue;

          for (const product of row.data) {
              const sku = product?.sku;

              if (!sku || firedProducts.has(sku))
                  continue;

              firedProducts.add(sku);
              newProducts.push(product);
          }
      }
    }else {
      const products = filteredList.value.slice(visibleStartIndex, visibleEndIndex + 6);
      newProducts = products.filter(product => {
          if (firedProducts.has(product.sku))
              return false;
          firedProducts.add(product.sku);
          return true;
      });

    }
    if (!newProducts.length)
        return;

    const MAX_TRACKED = 5000;

    if(firedProducts.size > MAX_TRACKED) {
        firedProducts.clear();
    }
    await nextTick();
    fireViewItemList(newProducts);
}

async function fireViewItemList(items, action_type = 'view_item_list') {
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
  const additionalData = action_type == 'view_item_list' ? { item_list_name: `search-${type.value}`, skipDuplicates: true } : {};

  await store.runGtmEvent({ action_type, txnId: null, additionalData });
}
function announce(message) {
  clearTimeout(_announceTimer);
  _announceTimer = setTimeout(() => {
    ariaStatusMessage.value = '';
    nextTick(() => { ariaStatusMessage.value = message; });
  }, 50);
}
function announceLog(message) {
  ariaLogMessage.value = '';
  nextTick(() => { ariaLogMessage.value = message; });
}
function toggleFilter() {
  if (!isFilterShow.value) {
    // Panel is about to open — remember who opened it.
    _filterOpenerEl = document.activeElement;
  }
  isFilterShow.value = !isFilterShow.value;
  document.body.style.overflow = isFilterShow.value ? "hidden" : "";
}
function closeFilter() {
  isFilterShow.value = false;
  document.body.style.overflow = "";
  // Return focus to the button that opened the panel.
  nextTick(() => {
    if (_filterOpenerEl && typeof _filterOpenerEl.focus === 'function') {
      _filterOpenerEl.focus();
    }
    _filterOpenerEl = null;
  });
}

// ── Tooltip ────────────────────────────────────────────────────────────
function closeTooltip() {
  showFastShippingTooltip.value = false;
  // Return focus to the checkbox that triggered the tooltip.
  nextTick(() => {
    const cb = document.getElementById('shippingSoon');
    if (cb) cb.focus();
  });
}

// ── Row aria label ─────────────────────────────────────────────────────
function rowAriaLabel(item) {
  const fmt = (v) => $formatPrice(parseFloat(v) || 0, false);
  const p = item?.price;
  const priceText = p?.on_sale
    ? `Original price ${fmt(p?.raw?.amount)}, sale price ${fmt(p?.special?.amount)}`
    : fmt(p?.raw?.amount ?? p);
  const expandedState = expandedSku.value === item.sku ? ', expanded' : ', collapsed';
  return `${item.name}, ${priceText}${expandedState}`;
}
function toggleItem(event, item) {
  if (isToggling) return;
  const target = event?.target;
  if (target && (target.closest('button') || target.closest('a'))) {
    return;
  }
  // Guard passed — row div is handling the event. Prevent Space from scrolling the page.
  if (event?.type === 'keydown') event?.preventDefault();
  isToggling = true;
  // Capture scroll before DynamicScroller recalculates layout.
  const savedScrollY = window.scrollY;
  const wasExpanded = expandedSku.value === item.sku;
  expandedSku.value = wasExpanded ? null : item.sku;
  if(!wasExpanded) {
    fireViewItemList(item, 'view_item_list_product_details');
  }

  // Announce expand/collapse to AT immediately.
  announce(
    wasExpanded
      ? `${item.name} details collapsed`
      : `${item.name} details expanded`
  );

  setTimeout(() => { isToggling = false; }, 300);
  _focusGeneration = (_focusGeneration || 0) + 1;
  const gen = _focusGeneration;
  const restoreFocusAndScroll = () => {
    if (gen !== _focusGeneration) return;
    if (Math.abs(window.scrollY - savedScrollY) > 5) {
      window.scrollTo(0, savedScrollY);
    }
    const active = document.activeElement;
    if (active === document.body || active === null || !root.value?.contains(active)) {
      const el = root.value?.querySelector(`[data-row-sku="${item.sku}"]`);
      if (el) el.focus({ preventScroll: true });
    }
  };
  setTimeout(restoreFocusAndScroll, 400);
  setTimeout(restoreFocusAndScroll, 750);
}

// ── Shipping toggle ────────────────────────────────────────────────────
function shippingUpdated() {
  router.replace({ query: { ...route.query, shipping: shipping.value } });
  announce(`Shipping Soon filter ${shipping.value ? 'enabled' : 'disabled'}`);
}

// ── Filter/query helpers (unchanged logic, aria calls added) ──────────
async function getFilterRules() {
  const metaData = await store.metaData || store.getMetaData;
  let rules = metaData?.filter_rule;
  if (typeof rules === 'object' && Object.keys(rules)?.length) return rules;
  return null;
}
async function getFormattedFilterRules() {
  try {
    const rules = await getFilterRules() || {};
    return Object.fromEntries(
      Object.entries(rules).map(([key, value]) => {
        if (Array.isArray(value)) return [key, value.map(v => String(v).toLowerCase()).join(',')];
        if (value && typeof value === 'object') return [key, JSON.stringify(value)];
        return [key, value];
      })
    );
  } catch (error) {
    console.error('Error formatting filter rules:', error);
    return {};
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
async function getFinalQuery(isMounted = false) {
  let baseQuery = null;
  let queryPresent = Object.keys(route.query)?.length > 0;

  if (!_getSavedFilterState() && !queryPresent) {
    if(isMounted) {
      let filterRuleQuery = await getFormattedFilterRules();
        if(filterRuleQuery && Object.keys(filterRuleQuery)?.length){
          baseQuery = filterRuleQuery;
          return baseQuery;
        }
    }
    baseQuery = updateFilterRanges();
    baseQuery = getPostFixQuery(baseQuery);
    assignFilters(baseQuery);
    return baseQuery;
  }
  // 1️⃣ Start with default / cookie / current query
  baseQuery = queryPresent ? route.query : _getSavedFilterState() ?? {};
  baseQuery = getPostFixQuery(baseQuery);
  assignFilters(baseQuery);
  return baseQuery;
}
function defaultOutsideFilter() {
  if (route.query.sort_column) {
    sortByColumn.value = route.query.sort_column;
    sortByDir.value = route.query.sort_direction;
  }
  let queryShippingParam = route.query.shipping;
  if (typeof queryShippingParam === 'string') {
    shipping.value = queryShippingParam == 'true' ? 1 : 0;
  } else {
    shipping.value = route.query.shipping == true ? 1 : 0;
  }
}
function getPostFixQuery(baseQuery) {
  // 3️⃣ Merge postfix shape if exists
  if (postFix.value) {
    let shapeData = store.diamondsFilters?.['SHAPE']?.value ?? props.filterList['SHAPE']?.value;
    const itemInShape = shapeData?.find(item => item.code?.includes(postFix.value));
    const shapeKey = attributeCodes.diamondShapeCode;
    if (itemInShape) {
      const newShape = String(itemInShape?.code ?? postFix.value);
      if (!route.query[shapeKey]) {
        baseQuery = {
          ...baseQuery,
          [shapeKey]: newShape
        };
      } else {
        // Get existing shapes from baseQuery
        const alreadyShapes = baseQuery[shapeKey] || '';

        // Split into array, remove duplicates, and filter empty strings
        const shapeSet = new Set(
          alreadyShapes
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        );

        // Add new shape
        shapeSet.add(newShape);

        // Convert back to comma-separated string
        baseQuery = {
          ...baseQuery,
          [shapeKey]: Array.from(shapeSet).join(',')
        };
      }
    }
  }
  //Merge Natural or Lab Grown Code
  if ([attributeCodes.labGrownCode, attributeCodes.naturalCode].includes(postFix.value)) {
    baseQuery = { ...baseQuery, [attributeCodes.diamondOriginCode]: postFix.value };
  }
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
function setCookies(newQuery) {
  if (!import.meta.client) return;
  try {
    if (newQuery) {
      const serialized = JSON.stringify(newQuery);
      // sessionStorage: tab-isolated (prevents cross-tab state leaking)
      sessionStorage.setItem(type.value, serialized);
      // localStorage: cross-session restore (read only on fresh tab load)
      localStorage.setItem(type.value, serialized);
    } else {
      sessionStorage.removeItem(type.value);
      localStorage.removeItem(type.value);
    }
  } catch {}
}
function _getSavedFilterState() {
  if (!import.meta.client) return null;
  try {
    const session = sessionStorage.getItem(type.value);
    if (session) return JSON.parse(session);
    const local = localStorage.getItem(type.value);
    if (local) return JSON.parse(local);
  } catch {}
  return null;
}
async function getCategoryType() {
  let categoryId = null;
  try {
    const metaData = await store.metaData || store.getMetaData;
    let rawRules = metaData?.filter_rule;

    if (!rawRules) return null;

    const rules =
      typeof rawRules === 'string'
        ? JSON.parse(rawRules)
        : rawRules;

    if (rules && typeof rules === 'object') {
      categoryId = rules.style ?? null;
    }

  } catch (error) {
    console.warn('Failed to parse filter rules:', error);
    categoryId = null;
  }

  return categoryId;
}
async function fetchDiamonds() {
  // Page 1 = new filter/sort: abort the in-flight request so latest wins.
  if (page.value === 1) {
    if (_fetchController) {
      _fetchController.abort();
    }
    isFetching.value = false;
  }

  if (isFetching.value) return;
  const controller = new AbortController();
  _fetchController = controller;
  const signal = controller.signal;

  // Track the SKU that marks the start of newly appended items.
  const prevCount = filteredList.value?.length ?? 0;

  try {
    isFetching.value = true;

    if (page.value === 1) {
      filteredList.value = [];
      loader.value = true;
      // Announce search start — polite so it doesn't interrupt ongoing speech.
      announce('Searching for diamonds, please wait.');
      scrollToSection();
    } else {
      bottomLoader.value = true;
      announce(`Loading more diamonds, ${prevCount} of ${totalProducts.value} shown.`);
    }

    const defaultParams = {
      type: type.value ?? 'diamonds',
      limit: limit.value ?? 48,
      page: page.value ?? 1,
      sort_column: sortByColumn.value ?? 'price',
      sort_direction: sortByDir.value ?? 'asc',
      [attributeCodes.diamondOriginCode]: getOriginCode.value,
      shipping: shipping.value ? 1 : 0,
      with_media: route.query.with_media == 'true' ? 1 : 0
    };

    let categoryId = await getCategoryType();
    // Bail out early if aborted during the await above.
    if (signal.aborted) return;

    if (categoryId) defaultParams.style = categoryId;
    if (route.query.search) defaultParams.search = route.query.search;

    const { filterValues } = getFilterValues();
    const merged = { ...defaultParams, ...filterValues };

    const queryParams = Object.fromEntries(
      Object.entries(merged).filter(([key, value]) => {
        if (!value) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
    );

    queryString.value = queryParams;
    const queryStr = new URLSearchParams(queryString.value).toString();

    const response = await apiClient.getFitleredProductList('diamonds', queryStr, signal);

    // Aborted — a newer request superseded this one; discard silently.
    if (!response || response.aborted) return;

    if (response?.data) {
      const rawData = response.data?.data;
      const lightweightData = rawData?.map(toLightweightDiamond);
      const frozenChunk = Object.freeze(lightweightData);
      // Update total count
      totalProducts.value = response.data?.pagination?.total_products;

      if (page.value === 1) {
        filteredList.value = frozenChunk;
        nextTick(() => {
          // Announce total count after a fresh search/filter change.
          const count = filteredList.value?.length;
          const total = totalProducts.value;
          // this.onScrollerUpdate(0, 0, 0, 7);
          announce(
            count
              ? `${total.toLocaleString()} diamonds found. Showing first ${count.toLocaleString()}.`
              : 'No diamonds found matching your criteria.'
          );
        });
      } else {
        filteredList.value = [...filteredList.value, ...frozenChunk];
        if (lightweightData.length) {
          // Record the first newly appended SKU for focus management.
          _firstNewSku = lightweightData[0]?.sku ?? null;
          nextTick(() => {
            // Use the log region so it doesn't overwrite the status region.
            announceLog(
              `${lightweightData.length} more diamonds loaded. Now showing ${filteredList.value?.length.toLocaleString()} of ${totalProducts.value.toLocaleString()} total.`
            );
          });
        }
      }
    }
  } catch (err) {
    if (err.code === 'ERR_CANCELED' || err.name === 'CanceledError' || err.name === 'AbortError') return;
    console.error('Fetch failed:', err);
    announce('An error occurred loading diamonds. Please try again.');
  } finally {
    if (_fetchController === controller) {
      isFetching.value = false;
      loader.value = false;
      bottomLoader.value = false;
      isEmpty.value = !filteredList.value?.length;
    }
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
    rootMargin: '0px 0px 600px 0px',
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    if (
      entries[0].isIntersecting &&
      !isFetching.value &&
      totalProducts.value > filteredList.value?.length &&
      !selectedTab.value &&
      !isRestoredFromSession.value
    ) {
      page.value++;
      fetchDiamonds();
    }
  }, options);

  if (infiniteTrigger.value) {
    observer.observe(infiniteTrigger.value);
  }
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
  announce('All filters cleared. Searching with default settings.');
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
              .filter(code => typeof code === 'string')
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
  const queryParams = preAppliedFilters && Object.keys(preAppliedFilters).length ? preAppliedFilters : route.query;
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
          diamondFilters[key] = values.slice(startIndex).join(',');
        }
      }
      if (filterValue && filterValue.min && attribute.type) {
        const values = attribute.value.map(item => item.value);
        let min = filterValue.min;
        let max = values[values.length - 1];
        if (key == attributeCodes.diamondCaratCode) {
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
  announce(`Filter "${item?.label ?? key}" removed.`);
  router.push({ query: queryParams });
}
function handleChange(event) {
  const selectedValue = event.target.value;
  const selectedItem = sortOpt.value[selectedValue];
  if (selectedItem && selectedItem?.colName) {
    sortByColumn.value = selectedItem.colName;
    sortByDir.value = selectedItem.colValue;
    assignSortData(sortByColumn.value, sortByDir.value);
    announce(`Sorted by ${selectedItem.label ?? selectedValue}.`);
  }
}
function assignSortData(col, dir) {
  store.setFilters({ key: 'sort_column', value: col });
  store.setFilters({ key: 'sort_direction', value: dir });
  store.setFilterCount();
}
function setVuexState(item) {
  viewMode.value = item;
  if(item == 'list'){
      store.runGtmEvent({ action_type : 'viewed_search_filter_datalist' });
  }
  store.setViewMode(item);
  announce(`Switched to ${item} view.`);
}
function sortFilterList(data) {
  if (data && Object.keys(data).length) {
    sortByColumn.value = data.key;
    sortByDir.value = data.order;
    assignSortData(sortByColumn.value, sortByDir.value);
  }
}
function getRouteState() {
  return {
    filters: filterData.value,
    page: page.value,
    limit: limit.value,
    scrollY: window.scrollY,
    query: queryString.value,
  };
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
    announce('Restoring your previous search, please wait.');
    let limitParam = limitArg || 48;


    for (let i = 1; i <= lastPage; i++) {
      params.set("limit", limitParam);
      params.set("page", i);

      const queryStr = params.toString();

      promises.push(
        apiClient.getFitleredProductList("diamonds", queryStr)
      );
    }
    const responses = await Promise.all(promises);
    const allItems = responses.flatMap((r) => r.data?.data || []);

    totalProducts.value = responses?.length ? responses[0]?.data?.pagination?.total_products : 0;
    filteredList.value = Object.freeze(allItems);

    page.value = lastPage;
    loader.value = false;
    isEmpty.value = !filteredList.value?.length;
    announce(`${filteredList.value.length.toLocaleString()} diamonds restored.`);
    finishRestoration(scrollY, productUrlKey);
  } catch (e) {
    console.error(e);
    fetchDiamonds(); // fallback
  }
}
function finishRestoration(scrollY, productUrlKey) {
  nextTick(() => {
    setTimeout(() => {
      let rowIndex = 0;
      let scrollItem = null;
      if (viewMode.value === 'grid') {
        rowIndex = chunkedFilteredList.value.findIndex(row =>
          row.data.some(item => item.url_key === productUrlKey)
        )
        scrollItem = dynamicScroller.value;
      } else {
        rowIndex = filteredList.value.findIndex(row =>
          row.url_key === productUrlKey
        )
        if (rowIndex !== -1) {
          expandedSku.value = filteredList.value[rowIndex]?.sku;
        }
        scrollItem = dynamicScrollerList.value;
        // to show item in viewport
        rowIndex = rowIndex > 7 ? rowIndex - 7 : rowIndex;
      }

      if (isMobile.value) {
        rowIndex = rowIndex - 2;
      }
      console.log('rowIndex', rowIndex, 'PRODUCT URL KEY', productUrlKey);

      if (rowIndex !== -1) {
        nextTick(() => {
          scrollToRow(scrollItem, rowIndex)
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
function toLightweightDiamond(item) {

  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: item.price,
    url_key: item.url_key,
    media: {
      thumbnail_url: item.media?.thumbnail_url || '',
      video_url: item.media?.v360_url || item.media?.video_url || ''
    },
    attributes: item.attributes,
    shipping: item.shipping,
    in_stock: item.in_stock,
    is_sellable: item.is_sellable,
    status: item.status
  };
}

watch(() => store.filterCount, async () => {
  filterData.value = store.getFilters;

  if(filterData.value?.search) {
    filterData.value.with_media = 'false';
  }

  const existingCodes = Object.values(props.filterList || []).map(el => el.code);

  if (existingCodes.length && filterData.value?.search) {
    const hasOtherFilters = existingCodes.some(code => {
        return code !== 'search' && filterData.value[code];
    });

    if (hasOtherFilters) {
      filterData.value.search = null;
      filterData.value.with_media = 'true';
    }
  }
  await addNewQueryParams();
}, { deep: true, immediate: true });
watch(() => route.query, (newQuery) => {
  clearTimeout(_routeDebounceTimer);
  _routeDebounceTimer = setTimeout(() => {
    handleRouteQueryChange(newQuery);
  }, 150);
}, { deep: false });
watch(totalProducts, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue == 0) {
    filteredList.value = [];
    isEmpty.value = true;
  }
});
// Announce tooltip appearance so VoiceOver / NVDA users are aware of it.
watch(showFastShippingTooltip, (visible) => {
  if (visible) {
    announce('Tip: check Shipping Soon to see what arrives fastest.');
    // Move focus into the tooltip so keyboard users can dismiss it.
    nextTick(() => {
      const closeBtn = tooltipClose.value || tooltipCloseMobile.value;
      if (closeBtn) closeBtn.focus();
    });
  }
});

onMounted(async () => {
  isFilterShow.value = !$isMobile;

  // Wire up the global aria-announce event bus used by child components.
  // Children call: $bus.emit('aria-announce', 'message')
  $bus.on('aria-announce', announce);

  const saved = props.filterState;
  if (saved) {
    isRestoredFromSession.value = true;
    filterData.value = saved.filters;
    page.value = saved.page;
    limit.value = saved.limit;
    queryString.value = saved.query;
    viewMode.value = store.getViewMode || viewMode.value;
    restoreInfiniteList(saved.page, saved.limit, saved.scrollY, saved.productUrlKey);
    initIntersectionObserver();
    defaultOutsideFilter();
    store.setFilters(filterData.value);
    store.setFilterCount();
    return;
  }
  // 1️⃣ Assign filters and get the query to push
  // const query = await getFinalQuery();
  const query = await getFinalQuery(true);
  // 2️⃣ Push query once (defaults + postfix merged)
  const normalize = obj =>
    Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

  if (JSON.stringify(normalize(route.query)) !== JSON.stringify(normalize(query))) {
    await router.replace({ query });
  } else {
    // 3️⃣ Fetch diamonds manually after route is finalized
    handleRouteQueryChange(query);
  }
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
    _storageHandler = (event) => {
      if (event.key === 'tooltipShownThisSession') {
        showFastShippingTooltip.value = false;
      }
    };
    window.addEventListener('storage', _storageHandler);
  }
  // Default filter
  defaultOutsideFilter();

  await nextTick(() => {
    initIntersectionObserver();
  });

  // Assign viewmode
  store.setViewMode(viewMode.value);
});

onBeforeUnmount(() => {
  if (observer) { observer.disconnect(); observer = null; }
  if (_fetchController) { _fetchController.abort(); _fetchController = null; }
  if (_storageHandler) { window.removeEventListener('storage', _storageHandler); _storageHandler = null; }
  clearTimeout(_routeDebounceTimer);
  clearTimeout(_announceTimer);
  // Detach global event bus listener.
  $bus.off('aria-announce', announce);
});

// pages/search.vue reads this through the component ref to persist the search state before navigating to a product
defineExpose({ getRouteState });
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.vue-recycle-scroller__item-wrapper {
  overflow: unset !important;
}
</style>