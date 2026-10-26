<template>
    <div class="w-full h-full">
        <div class="w-full h-full relative overflow-hidden" id="sliderDiv"
            role="group"
            aria-labelledby="carat-slider-label"
        >

            <!-- Accessible label -->
            <span id="carat-slider-label" class="sr-only">
                Diamond carat size selector
            </span>

            <!-- Bottom Controls -->
            <div class="flex absolute p-3 2xl:p-4 capitalize bg-white rounded-full bottom-3 left-2 right-2 items-center gap-2 xl:gap-3 z-10 max-w-lg mx-auto shadow-lg">
                <span aria-hidden="true">0.25 ct</span>

                <div class="flex-1 w-full relative">
                    <input
                        type="range"
                        :min="0"
                        :max="5"
                        :step="1"
                        v-model="sliderIndex"
                        class="range-slider"
                        aria-labelledby="carat-slider-label"
                        :aria-valuemin="caratKeys[0]"
                        :aria-valuemax="caratKeys[caratKeys.length - 1]"
                        :aria-valuenow="selectedCarat"
                        :aria-valuetext="`${selectedCarat} carat`"
                    />
                </div>

                <span aria-hidden="true">5 ct</span>
            </div>
            <img
                :src="`${$config?.public?.cdnPrefix}landing-pages/heros/hand-transparent-shadow.webp`"
                class="w-full h-full object-bottom"
                :alt="product?.name"
                aria-hidden="true"
            />
            <img
                :src="getImagUrl('shape')"
                class="absolute size-6 sm:size-9 top-[70%] left-[30.5%]"
                :style="`scale: ${selectedScale};`"
                :alt="`${shape} diamond preview at ${selectedCarat} carat`"
            />
        </div>

        <span class="sr-only" aria-live="polite">
            {{ selectedCarat }} carat selected
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    product: Object,
    selectedVariant: Object,
});

const config = useRuntimeConfig().public;

const sliderIndex = ref(5);
const shape = ref('round');

const transformValue = {
        round: { '0.25': 0.44, '0.5': 0.54, '0.75': 0.62, '1': 0.68, '1.5': 0.79, '2': 0.87, '3': 1.0, '4': 1.09, '5': 1.18 },
        princess: { '0.25': 0.44, '0.5': 0.55, '0.75': 0.62, '1': 0.68, '1.5': 0.8, '2': 0.87, '3': 1.0, '4': 1.12, '5': 1.19 },
        emerald: { '0.25': 0.47, '0.5': 0.58, '0.75': 0.63, '1': 0.68, '1.5': 0.79, '2': 0.89, '3': 1.0, '4': 1.10, '5': 1.21 },
        asscher: { '0.25': 0.46, '0.5': 0.54, '0.75': 0.62, '1': 0.68, '1.5': 0.79, '2': 0.86, '3': 1.0, '4': 1.11, '5': 1.19 },
        marquise: { '0.25': 0.46, '0.5': 0.54, '0.75': 0.61, '1': 0.75, '1.5': 0.86, '2': 0.93, '3': 1.0, '4': 1.14, '5': 1.21 },
        oval: { '0.25': 0.43, '0.5': 0.52, '0.75': 0.65, '1': 0.70, '1.5': 0.78, '2': 0.91, '3': 1.0, '4': 1.13, '5': 1.21 },
        radiant: { '0.25': 0.41, '0.5': 0.59, '0.75': 0.65, '1': 0.71, '1.5': 0.82, '2': 0.88, '3': 1.0, '4': 1.12, '5': 1.18 },
        pear: { '0.25': 0.44, '0.5': 0.56, '0.75': 0.64, '1': 0.68, '1.5': 0.8, '2': 0.84, '3': 1.0, '4': 1.08, '5': 1.2 },
        heart: { '0.25': 0.44, '0.5': 0.57, '0.75': 0.63, '1': 0.70, '1.5': 0.8, '2': 0.87, '3': 1.0, '4': 1.08, '5': 1.16 },
        cushion: { '0.25': 0.44, '0.5': 0.55, '0.75': 0.66, '1': 0.72, '1.5': 0.83, '2': 0.88, '3': 1.0, '4': 1.11, '5': 1.16 }
};

onMounted(() => {
    shape.value = props.selectedVariant?.shape?.toLowerCase() || 'round';
});

const caratKeys = computed(() => transformValue[shape.value]
    ? Object.keys(transformValue[shape.value]).map(Number).sort((a, b) => a - b)
    : []);

const selectedCarat = computed(() => caratKeys.value[sliderIndex.value] ?? 0.25);

const selectedScale = computed(() => transformValue[shape.value]?.[selectedCarat.value] * 2  ?? 1);

function assignDiamondCarat(value = 2) {
    const v = parseFloat(value);
    let nearest = 0;
    let diff = Infinity;

    caratKeys.value.forEach((k, i) => {
        const d = Math.abs(k - v);
        if (d < diff) {
            diff = d;
            nearest = i;
        }
    });

    sliderIndex.value = nearest;
}

function getImagUrl(type) {
    if (type === 'shape') {
        return `${config?.cdnPrefix}landing-pages/shapes/${shape.value}.png`;
    }
}

defineExpose({ assignDiamondCarat });
</script>
