<template>
    <section class="pt-8 lg:pt-16">
        <div class="py-8" :class="className">
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8">
                <div class="flex items-start justify-between">
                    <header>
                        <h2 class="font-normal text-lg md:text-xl lg:text-3xl">
                            Shop By Diamond Shapes
                        </h2>

                        <p class="mt-1 text-sm">
                            Explore our exquisite collection of diamonds categorized by shape to find your perfect gem.
                        </p>
                    </header>
                </div>

                <!-- Shape Navigation List -->
                <ul
                    class="mt-6 relative flex flex-wrap justify-between lg:justify-start xl:justify-between gap-4"
                    role="list"
                >

                    <template v-for="item in getData" :key="item.code">
<li
                        
                        
                        v-if="item.code"
                    >
                        <NuxtLink
                        class="text-center space-y-1 mt-1 hover:text-primary group flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg inline-block"
                        :to="hyphenatedRoutes(`${preFixPath}/search/${item.code}/`)"
                        :aria-label="`Shop ${item.label} diamond shape`"
                        >

                        <!-- Shape Icon Container -->
                        <span
                            class="relative inline-flex items-center justify-center rounded-full border border-white group-hover:bg-primary/5 group-hover:border-primary/20 p-2 md:p-3"
                            aria-hidden="true"
                        >
                            <Icon :name="item.code" class="w-8 h-8 lg:w-16 lg:h-16" />
                        </span>

                        <!-- Shape Label -->
                        <span class="block text-xs md:text-base font-normal tracking-widest">
                            {{ item.label }}
                        </span>

                        </NuxtLink>
                    </li>
</template>

                </ul>
            </div>
        </div>
    </section>
</template>
<script setup>
import Icon from "~/components/common/Icon.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const ENGAGEMENT_RINGS_BASE = STATIC_ROUTES.ENGAGEMENT_RINGS.replace(/\/$/, '');
const DIAMONDS_BASE = STATIC_ROUTES.DIAMONDS.replace(/\/$/, '');

const props = defineProps({
    className: {
        type: String,
        default: ''
    }
});

const route = useRoute();
const router = useRouter();
const store = useMainStore();

const shapes = ref([
    { label: 'Round', code: 'round' },
    { label: 'Princess', code: 'princess' },
    { label: 'Emerald', code: 'emerald' },
    { label: 'Marquise', code: 'marquise' },
    { label: 'Heart', code: 'heart' },
    { label: 'Pear', code: 'pear' },
    { label: 'Cushion', code: 'cushion' },
    { label: 'Oval', code: 'oval' },
    { label: 'Radiant', code: 'radiant' },
    { label: 'Asscher', code: 'asscher' },
]);
const shapeData = ref(null);
const ringData = ref(null);
const filter = ref(null);
const shapesFromState = ref(null);

const preFixPath = computed(() => {
    return route.name == 'engagementRingPage' ? ENGAGEMENT_RINGS_BASE : DIAMONDS_BASE;
});
const getData = computed(() => {
    return shapesFromState.value ?? shapes.value;
});

watch(filter, async (newValue, oldValue) => {
    if (newValue) {
        let arrData = shapeData.value ?? [];
        let preFixPath = route.name == 'engagementRingPage' ? ENGAGEMENT_RINGS_BASE : DIAMONDS_BASE;
        let item = arrData?.value?.find(el => el.code == newValue?.code)
        if (!item) return;
        router.push(`${preFixPath}/search/${item?.code}/`);
    }
}, { deep: true, immediate: true });

watch(() => store.diamondsFilters, (newValue, oldValue) => {
    const val = newValue ?? oldValue;
    if (val && typeof val === 'object' && Object.keys(val).length) {
        const defaultShapeData = val['SHAPE'] ?? null;
        shapesFromState.value = defaultShapeData?.value ?? null;
    }
}, { deep: true, immediate: true });

function hyphenatedRoutes(url) {
    return url.toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9/-]+/g, '').replace(/\/+/g, '/').replace(/^-+|-+$/g, '');
}
</script>
