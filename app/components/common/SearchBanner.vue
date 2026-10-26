<template>
    <div>
        <SearchHeader />
        <BundleSteps :key="route.path" />
        <div class="flex items-center justify-center mt-4 mb-6 sm:mt-6 sm:mb-8 max-w-xs mx-auto text-sm sm:text-base bg-gray-100 rounded-full border border-gray-200"
            v-show="isDiamondFilter" role="group"
            aria-label="Diamond origin selection"
        >
            <Button type="button" @click="redirectTo('natural')" class="rounded-full flex-1"
                :aria-pressed="getOriginCode === 'natural'"
                :colorType="getOriginCode == 'natural' ? 'primary' : 'transparent'">
                Natural
            </Button>

            <Button type="button" @click="redirectTo('lab-grown')" class="rounded-full flex-1"
                :aria-pressed="getOriginCode === 'lab-grown'"
                :colorType="getOriginCode == 'lab-grown' ? 'primary' : 'transparent'">
                Lab Grown
            </Button>
        </div>

        <nav
            v-if="getTopPanelFilters"
            aria-label="Filter options"
        >
            <!-- Mobile Top panel Filters -->
            <IconFilter :filter="getTopPanelFilters" v-if="getTopPanelFilters" :key="`${iconfilterComponent}_mobile`"
                className="flex lg:justify-start xl:justify-between gap-2.5 py-1 px-3 lg:hidden overflow-x-auto no-scrollbar" />
        </nav>

        <span class="sr-only" aria-live="polite">
            {{ getOriginCode === 'natural'
                ? 'Natural diamonds selected'
                : 'Lab grown diamonds selected' }}
        </span>
    </div>
</template>
<script setup>
import SearchHeader from '~/components/layout/search/index.vue';
import BundleSteps from '~/components/ui/BundleSteps.vue';
import Button from '~/components/common/Button.vue';
import IconFilter from '~/components/filter/IconFilter.vue';
import { topPanelFilter } from '@/static/js/recommendedFilters';
import { attributeCodes } from '~/utils/searchConstant';
import { cleanPostfix } from '~/utils/universalHelper';

const props = defineProps({
    filterList: {
        type: Object,
        default: () => ({}),
    },
    originCode: {
        type: String,
        default: '',
    }
});

const route = useRoute();
const router = useRouter();
const { $isMobile } = useNuxtApp();

const iconfilterComponent = ref(0);

const isDiamondFilter = computed(() => route.params?.prefix === 'diamonds');
const getTopPanelFilters = computed(() => {
    if ($isMobile) {
        return Object.values(props.filterList).find((filter) => topPanelFilter?.includes(filter.code));
    }
    return null;
});
const getOriginCode = computed(() => props.originCode);
const isOnlyDiamondFilter = computed(() => route.params?.prefix === 'diamonds' && cleanPostfix(route.params?.postfix) != 'diamond-pair');

async function redirectTo(code) {
    if (isOnlyDiamondFilter.value) {
        await router.replace(`/diamonds/search/${code}`);
        return;
    }
    const updatedQuery = { ...route.query, [attributeCodes.diamondOriginCode]: code };
    try {
        await router.replace({ query: updatedQuery });
    } catch (err) {
        console.error('Navigation error:', err);
    }
}

onMounted(() => {
    iconfilterComponent.value++;
});
</script>