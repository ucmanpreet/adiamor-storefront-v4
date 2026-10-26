<template>
    <!-- GRID VIEW -->
    <div v-if="viewMode === 'grid' && compareList?.length" role="list"
        class="pt-3 pb-4 sm:pb-6 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 md:gap-x-8 md:gap-y-10 grid-flow-row-dense xl:grid-cols-3">
        <div v-for="item in compareList" :key="item.sku" class="h-full" role="listitem">
            <DiamondGridCard :diamond="item" :isCompareData="true" />
        </div>
    </div>

    <!-- LIST VIEW -->
    <div v-else-if="viewMode === 'list' && compareList?.length">
        <div v-for="item in compareList" :key="item.sku" class="even:bg-gray-100">
            <template v-if="type === 'diamonds'">
                <div role="table">
                    <div class="flex flex-col w-full cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-primary/7 relative min-w-full"
                        @click.stop="toggleItem(item)" role="rowgroup">
                        <!-- Header -->
                        <DiamondListHeader :diamond="item" />
                    </div>

                    <!-- Expandable content -->
                    <div>
                        <DiamondListView :diamond="item" />
                    </div>
                </div>
            </template>
            <!-- <DiamondListGrid v-if="type === 'diamonds'" :diamond="item" @showGIACertificate="giaPath = $event" /> -->
            <template v-else>
                <div>
                    <div class="flex flex-col w-full cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-primary/7 relative min-w-full"
                        >
                        <!-- Header -->
                        <DiamondPairListHeader :product="item" />
                    </div>

                    <!-- Expandable content -->
                    <div>
                        <DiamondPairListView :product="item" />
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div v-else class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5" role="status"
        aria-live="polite">
        <NoDataFound :type="type">
            <div class="max-w-sm mx-auto text-center">
                <p>Use the sliders above to search and compare diamonds, or call us at <a class="text-primary"
                        :href="`tel:${telPhoneNumber}`">{{ phoneNumber }}</a>
                    for assistance.</p>
                <Button type="button" colorType="primary" class="capitalize mx-auto mt-4"
                    @click="router.push(customSearchPath)">Request a
                    custom search</Button>
            </div>
        </NoDataFound>
    </div>
</template>

<script setup>
import DiamondGridCard from '~/components/common/DiamondGridCard.vue';
import DiamondListHeader from '~/components/common/DiamondListHeader.vue';
import DiamondListView from '~/components/common/DiamondListView.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import Button from '~/components/common/Button.vue';
import DiamondPairListHeader from '~/components/common/DiamondPairListHeader.vue';
import DiamondPairListView from '~/components/common/DiamondPairListView.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps({
    type: {
        type: String,
        default: 'diamonds',
    },
    viewMode: {
        type: String,
        default: 'grid',
    },
});

const store = useMainStore();
const router = useRouter();

const customSearchPath = ref(STATIC_ROUTES.CUSTOM_SEARCH);

const compareList = computed(() => {
    if (props.type == 'diamonds') return store.compareList;
    return store.comparePairList;
});
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));

// The template binds @click.stop="toggleItem(item)" but the original component never defined it (click was a no-op).
function toggleItem() {}
</script>