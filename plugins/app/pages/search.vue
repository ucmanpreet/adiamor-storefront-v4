<template>
  <div class="min-h-dvh" ref="targetSection">
    <h1 class="sr-only">{{ pageHeading }}</h1>
    <!-- Dynamically render search component based on route -->
    <BreadcrumbSkeleton v-if="!isReady"/>
    <DiamondSearchSkeleton v-if="!isReady && currentSearchComponent === 'DiamondSearchComponent'" />
    <DiamondPairSearchSkeleton v-else-if="!isReady && currentSearchComponent === 'DiamondPairSearchComponent'" />
    <SettingSearchSkeleton v-else-if="!isReady" />
    <component v-if="isReady && currentSearchComponent" :is="currentSearchComponent" :filterList="filterList"
      :key="$route.path" ref="searchView" :filterState="filterState" />
  </div>
</template>

<script>
import DiamondSearchSkeleton from '~/components/skeleton/DiamondSearchSkeleton.vue'
import DiamondPairSearchSkeleton from '~/components/skeleton/DiamondPairSearchSkeleton.vue'
import SettingSearchSkeleton from '~/components/skeleton/SettingSearchSkeleton.vue'
import DiamondSearchComponent from '~/components/common/DiamondSearchComponent.vue'
import DiamondPairSearchComponent from '~/components/common/DiamondPairSearchComponent.vue'
import SettingSearchComponent from '~/components/common/SettingSearchComponent.vue'
import BreadcrumbSkeleton from '~/components/skeleton/BreadcrumbSkeleton.vue'
import { defaultValues, reverseOrder, diamondPairLabels } from '@/static/js/recommendedFilters';
import { AppDB } from '~/utils/db.js';
import { cleanPostfix } from '~/utils/universalHelper';
// Indexed DB — wrapped in try/catch for mobile browsers where IndexedDB
// may be unavailable (private browsing, storage quota exceeded, etc.)
let db = null;
try {
  db = import.meta.client ? new AppDB() : null;
} catch (e) {
  console.warn('IndexedDB unavailable, search state persistence disabled:', e);
}

export default {
  name: 'SearchPage',
  components: {
    DiamondSearchSkeleton,
    DiamondPairSearchSkeleton,
    SettingSearchSkeleton,
    DiamondSearchComponent,
    DiamondPairSearchComponent,
    SettingSearchComponent,
    BreadcrumbSkeleton
  },
  data() {
    return {
      filterList: {},
      currentComponentKey: 0,
      filterState: null,
      isReady: false
    }
  },
  async mounted() {
    await this.fetchData();

  },
  computed: {
    pageHeading() {
      let metaData = this.$store.state.metaData || this.$store.getters.getMetaData;
      return metaData?.meta_title || metaData?.title || 'Search Adiamor';
    },
    currentSearchComponent() {
      const type = this.$route.params.prefix?.toLowerCase();
      const subType = cleanPostfix(this.$route.params.postfix?.toLowerCase());

      // Map route params to component names
      const componentMap = {
        diamonds: 'DiamondSearchComponent',
        'diamond-pair': 'DiamondPairSearchComponent',
        settings: 'SettingSearchComponent' // fallback type
      };

      // First try subType, then type, then default
      return componentMap[subType] || componentMap[type] || 'SettingSearchComponent';
    }
  },
  methods: {
    async fetchData() {
      try {
        const params = this.$route.path;
        const type = this.$route.params.prefix?.toLowerCase()
        const subType = cleanPostfix(this.$route.params.postfix?.toLowerCase())
        const isOnlyDiamond = type === 'diamonds' && subType != 'diamond-pair';
        const isPair = subType === 'diamond-pair';

        if (
          isOnlyDiamond &&
          this.$store.state.diamondsFilters
        ) {
          this.filterList = this.$store.state.diamondsFilters;
          await this.processFilters();
          this.isReady = true;
          return
        }
  
        if (isOnlyDiamond) {
          this.$store.commit('setFilterList', {
            state: type,
            value: null
          });
        }
  
        const filters = await this.$axios.$get(`get-filter-list?type=${params}`)
  
        this.filterList = filters?.data ?? {};
        this.currentComponentKey++;
  
        if (isOnlyDiamond) {
          // Process after fetch
          await this.processFilters();
          this.$store.commit('setFilterList', {
            state: type,
            value: filters?.data ?? null
          });
        }
        // Process after fetch for diamond-pair
        if(isPair) {
          await this.processFilters(isPair);
        }
        this.isReady = true;
      } catch (err) {
        console.error('fetch error:', err)
        this.filterList = {};
        this.isReady = true;
      }
    },
    assignFilterState(filters) {
      this.filterState = filters;
    },
    async processFilters(isPair = false) {
      try {
        if (!this.filterList || (typeof this.filterList === 'object' && Object.keys(this.filterList).length == 0)) {
          return;
        }

        if (Object.keys(reverseOrder)?.length) {
          Object.keys(reverseOrder).forEach((key) => {
            this.reverseFilterOrder(key);
          })
        }
        if (Object.keys(defaultValues)?.length) {
          Object.keys(defaultValues).forEach((key) => {
            this.updateDefaultFilter(key);
          })
        }
        // Change key labels in filter list
        if(isPair){
          Object.values(this.filterList).forEach((item) => {
            if(diamondPairLabels[item.code]){
              item.text = diamondPairLabels[item.code];
            }
          })
        };
      } catch (error) {
        console.log('Get Filter List Error ' + error);
      }
    },
    reverseFilterOrder(filterCode) {
      if (reverseOrder[filterCode]) {
        const filter = Object.values(this.filterList).find(item => item.code === filterCode);
        if (filter && Array.isArray(filter.value) && filter.value.length > 0) {
          if(filter.value[0].code != 'none' && filterCode == 'diamond_fluorescence') return;
          filter.value = [...filter.value].reverse();
        }
      }
    },
    updateDefaultFilter(filterCode) {
      const filter = Object.values(this.filterList)?.find(item => item.code === filterCode);
      if (filter?.value && filter.value.length > 0) {
        let minMaxPostfix = {
          'length/width': 'length/width',
          'diamond_depth_percent': 'depth',
          'diamond_table_percent': 'table',
          'diamond_carat_weight': 'carat'
        }
        const minItem = filter.value.find(v => v.code === `low-${minMaxPostfix[filterCode]}`) ?? {};
        const maxItem = filter.value.find(v => v.code === `high-${minMaxPostfix[filterCode]}`) ?? {};
        let defaultRange = defaultValues[filterCode] ?? {};
        if (minItem) minItem.value = defaultRange.min;
        if (maxItem) maxItem.value = defaultRange.max;
      }
    },
  },
  async beforeRouteEnter(to, from, next) {

    if (!db || !import.meta.client) return next();

    // Timeout guard: on mobile, IndexedDB can hang indefinitely (never
    // resolve or reject).  A try/catch won't help with a hanging promise,
    // so we race against a 2-second timeout to guarantee next() is called.
    let called = false;
    const callNext = (fn) => { if (!called) { called = true; next(fn); } };

    const timer = setTimeout(() => callNext(), 2000);

    try {
      const saved = await db.get(to.path);
      if (saved) await db.delete(to.path);
      clearTimeout(timer);

      callNext(vm => {
        if (saved && from.name === 'all' && from.query?.rfr === 'search' && to.meta?.isBack) {
          vm.filterState = saved;
        }
      });
    } catch (err) {
      clearTimeout(timer);
      console.error('Failed to restore search state from IndexedDB:', err);
      callNext();
    }
  },
  async beforeRouteLeave(to, from, next) {
    if (!db || !import.meta.client) return next();

    if (to.name === 'all' && to.query?.rfr === 'search') {
      try {
        let view = this.$refs.searchView;

        // 1. Handle Vue 2 edge case where ref returns an array
        if (Array.isArray(view) && view.length > 0) {
          view = view[0];
        }

        // 2. Strict check + Optional Chaining safety
        if (view && typeof view.getRouteState === 'function') {
          const state = view.getRouteState();

          if (state) {
            this.filterState = state;
            this.filterState.productUrlKey = from.path?.includes('diamond-pair') ? to.fullPath : to.path;
            // distinct await to ensure DB write doesn't block nav if it fails
            if (db) {
              await db.set(from.path, this.filterState).catch(e => console.warn('DB Write failed', e));
            }
          }
        }
      } catch (error) {
        // 3. Log error but DO NOT block navigation
        console.warn('Search state save failed, but proceeding with navigation:', error);
      }
    }

    next()
  }
}
</script>
