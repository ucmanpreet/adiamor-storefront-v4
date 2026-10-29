<template>
  <div class="min-h-dvh" ref="targetSection">
    <h1 class="sr-only">{{ pageHeading }}</h1>
    <!-- Dynamically render search component based on route -->
    <BreadcrumbSkeleton v-if="!isReady"/>
    <DiamondSearchSkeleton v-if="!isReady && currentSearchComponent === 'DiamondSearchComponent'" />
    <DiamondPairSearchSkeleton v-else-if="!isReady && currentSearchComponent === 'DiamondPairSearchComponent'" />
    <SettingSearchSkeleton v-else-if="!isReady" />
    <component v-if="isReady && currentSearchComponent" :is="searchComponents[currentSearchComponent]" :filterList="filterList"
      :key="$route.path" ref="searchView" :filterState="filterState" />
  </div>
</template>

<script>
import { AppDB } from '~/utils/db.js';
import { getRowAnchorTop } from '~/utils/restoreScroll.js';
// Indexed DB — wrapped in try/catch for mobile browsers where IndexedDB
// may be unavailable (private browsing, storage quota exceeded, etc.)
let db = null;
try {
  db = import.meta.client ? new AppDB() : null;
} catch (e) {
  console.warn('IndexedDB unavailable, search state persistence disabled:', e);
}

// `beforeRouteEnter` has no <script setup> equivalent (it needs the instance in the `next(vm => ...)` callback),
// so it stays as a component option; `filterState` is exposed from <script setup> so `vm.filterState = ...` works.
export default {
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
}
</script>

<script setup>
import DiamondSearchSkeleton from '~/components/skeleton/DiamondSearchSkeleton.vue'
import DiamondPairSearchSkeleton from '~/components/skeleton/DiamondPairSearchSkeleton.vue'
import SettingSearchSkeleton from '~/components/skeleton/SettingSearchSkeleton.vue'
import DiamondSearchComponent from '~/components/common/DiamondSearchComponent.vue'
import DiamondPairSearchComponent from '~/components/common/DiamondPairSearchComponent.vue'
import SettingSearchComponent from '~/components/common/SettingSearchComponent.vue'
import BreadcrumbSkeleton from '~/components/skeleton/BreadcrumbSkeleton.vue'
import { defaultValues, reverseOrder, diamondPairLabels } from '@/static/js/recommendedFilters';
import { cleanPostfix } from '~/utils/universalHelper';

const store = useMainStore();
const route = useRoute();
const api = useApi();

// String `<component :is>` names are not resolvable from <script setup> imports, so map name -> component.
const searchComponents = { DiamondSearchComponent, DiamondPairSearchComponent, SettingSearchComponent };

const searchView = ref(null);
const filterList = ref({});
const currentComponentKey = ref(0);
const filterState = ref(null);
const isReady = ref(false);

const pageHeading = computed(() => {
  let metaData = store.metaData || store.getMetaData;
  return metaData?.meta_title || metaData?.title || 'Search Adiamor';
});
const currentSearchComponent = computed(() => {
  const type = route.params.prefix?.toLowerCase();
  const subType = cleanPostfix(route.params.postfix?.toLowerCase());

  // Map route params to component names
  const componentMap = {
    diamonds: 'DiamondSearchComponent',
    'diamond-pair': 'DiamondPairSearchComponent',
    settings: 'SettingSearchComponent' // fallback type
  };

  // First try subType, then type, then default
  return componentMap[subType] || componentMap[type] || 'SettingSearchComponent';
});

onMounted(async () => {
  await fetchData();

});

async function fetchData() {
  try {
    const params = route.path;
    const type = route.params.prefix?.toLowerCase()
    const subType = cleanPostfix(route.params.postfix?.toLowerCase())
    const isOnlyDiamond = type === 'diamonds' && subType != 'diamond-pair';
    const isPair = subType === 'diamond-pair';

    if (
      isOnlyDiamond &&
      store.diamondsFilters
    ) {
      filterList.value = store.diamondsFilters;
      await processFilters();
      isReady.value = true;
      return
    }

    if (isOnlyDiamond) {
      store.setFilterList({
        state: type,
        value: null
      });
    }

    const filters = await api.get(`get-filter-list?type=${params}`)

    filterList.value = filters?.data ?? {};
    currentComponentKey.value++;

    if (isOnlyDiamond) {
      // Process after fetch
      await processFilters();
      store.setFilterList({
        state: type,
        value: filters?.data ?? null
      });
    }
    // Process after fetch for diamond-pair
    if(isPair) {
      await processFilters(isPair);
    }
    isReady.value = true;
  } catch (err) {
    console.error('fetch error:', err)
    filterList.value = {};
    isReady.value = true;
  }
}
function assignFilterState(filters) {
  filterState.value = filters;
}
async function processFilters(isPair = false) {
  try {
    if (!filterList.value || (typeof filterList.value === 'object' && Object.keys(filterList.value).length == 0)) {
      return;
    }

    if (Object.keys(reverseOrder)?.length) {
      Object.keys(reverseOrder).forEach((key) => {
        reverseFilterOrder(key);
      })
    }
    if (Object.keys(defaultValues)?.length) {
      Object.keys(defaultValues).forEach((key) => {
        updateDefaultFilter(key);
      })
    }
    // Change key labels in filter list
    if(isPair){
      Object.values(filterList.value).forEach((item) => {
        if(diamondPairLabels[item.code]){
          item.text = diamondPairLabels[item.code];
        }
      })
    };
  } catch (error) {
    console.log('Get Filter List Error ' + error);
  }
}
function reverseFilterOrder(filterCode) {
  if (reverseOrder[filterCode]) {
    const filter = Object.values(filterList.value).find(item => item.code === filterCode);
    if (filter && Array.isArray(filter.value) && filter.value.length > 0) {
      if(filter.value[0].code != 'none' && filterCode == 'diamond_fluorescence') return;
      filter.value = [...filter.value].reverse();
    }
  }
}
function updateDefaultFilter(filterCode) {
  const filter = Object.values(filterList.value)?.find(item => item.code === filterCode);
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
}

onBeforeRouteLeave(async (to, from) => {
  if (!db || !import.meta.client) return;

  if (to.name === 'all' && to.query?.rfr === 'search') {
    try {
      let view = searchView.value;

      // 1. Handle Vue 2 edge case where ref returns an array
      if (Array.isArray(view) && view.length > 0) {
        view = view[0];
      }

      // 2. Strict check + Optional Chaining safety
      if (view && typeof view.getRouteState === 'function') {
        const state = view.getRouteState();

        if (state) {
          filterState.value = state;
          filterState.value.productUrlKey = from.path?.includes('diamond-pair') ? to.fullPath : to.path;
          filterState.value.anchorTop = getRowAnchorTop(to.path, to.fullPath, from.path?.includes('diamond-pair'));
          // distinct await to ensure DB write doesn't block nav if it fails
          if (db) {
            // IndexedDB cannot clone Vue reactive proxies or functions; store a plain JSON copy
            const plainState = JSON.parse(JSON.stringify(filterState.value));
            await db.set(from.path, plainState).catch(e => console.warn('DB Write failed', e));
          }
        }
      }
    } catch (error) {
      // 3. Log error but DO NOT block navigation
      console.warn('Search state save failed, but proceeding with navigation:', error);
    }
  }
});

// Read/written by the beforeRouteEnter callback above (vm.filterState = saved).
defineExpose({ filterState });
</script>
