<template>
    <div class="w-full h-full">
        <div v-if="!isCaratSlider">
            <span class="sr-only" id="tone-slider-desc">Adjust slider to compare lighter and darker skin tones</span>
            <div class="absolute inset-0 overflow-hidden border border-gray-200">

                <!-- Decorative background images -->
                <nuxt-img provider="cdn" src="/landing-pages/heros/female_hand_visualizer_zo_dark2_updated.webp?updatedAt=1748413513680"
                    alt="Hand tone visualizer - Darkest option" id="image1" class="h-full w-full object-cover object-center" aria-hidden="true"/>
                <nuxt-img provider="cdn" src="/landing-pages/heros/female_hand_visualizer_zo_dark_updated.webp?updatedAt=1748413514021"
                    alt="Hand tone visualizer - Dark tone" id="image2" class="absolute top-0 left-0 w-full h-full" aria-hidden="true"/>
                <nuxt-img provider="cdn" src="/landing-pages/heros/female_hand_visualizer_zo_light_updated.webp?updatedAt=1748413513903"
                    alt="Hand tone visualizer - Light tone" id="image3" class="absolute top-0 left-0 w-full h-full" aria-hidden="true"/>
                <nuxt-img provider="cdn" src="/landing-pages/heros/BE1D6351_yellow_Round_hand_zo_2_carat.webp?updatedAt=1748413963624"
                    alt="Yellow gold round diamond preview on hand" class="absolute top-0 left-0 w-full h-full" aria-hidden="true"/>

                <!-- Slider -->
                <div
                    class="flex flex-col justify-around absolute inset-x-0 sm:left-auto sm:-right-8 sm:top-0 bottom-4 sm:bottom-0 items-center gap-3">
                    <span class="hidden sm:block" id="lighter-label">Lighter</span>
                    <div class="sm:rotate-90">
                        <input type="range" id="slider" min="0" max="1" step="0.1" value="0"
                            aria-label="Skin tone slider, lighter to darker"
                            aria-describedby="tone-slider-desc"
                            class="range-slider dark-light h-32 top-1" @input="sliderMove($event)">
                    </div>
                    <span class="hidden sm:block" id="darker-label">Darker</span>
                </div>
            </div>
            <span class="pointer-events-none absolute inset-0 ring-2 ring-transparent ring-offset-2"
                aria-hidden="true"></span>
        </div>

        <!-- CARAT SLIDER -->
        <div v-else class="w-full h-full relative overflow-hidden" id="sliderDiv">
            <div class="flex flex-col absolute p-3 2xl:p-4 bg-white bottom-2 left-2 right-2 items-center gap-1 xl:gap-3 z-10"
                @touchstart.stop>

                <!-- Metal Selector -->
                <div class="flex gap-2 justify-between items-center flex-wrap w-full"
                    role="group"
                    aria-label="Select metal type"
                >
                    <div class="flex gap-2 lg:gap-4 text-xs sm:text-lg md:text-xs"
                        v-if="sliderData && sliderData.metal">
                        <button
                            type="button"
                            class="capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
                            v-for="(item, index) in sliderData.metal"
                            :value="item.code"
                            :aria-pressed="selectedMetal === item.code"
                            :class="{ 'font-medium': selectedMetal == item.code }"
                            :key="index"
                            @click="selectedMetal = item.code"
                            @touchstart.stop="selectedMetal = item.code"
                        >
                            {{ item?.label }}
                        </button>
                    </div>

                    <!-- Carat Input -->
                    <div
                        class="flex items-center px-0.5 2xl:p-1 border border-gray-400 gap-1 text-xs sm:text-lg md:text-xs">
                        <label for="carat">Carat:</label>
                        <input
                            id="carat"
                            type="number"
                            :key="updateInput"
                            step="0.1"
                            min="0"
                            max="99.9"
                            class="w-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                            name=""
                            :value="selectedCarat"
                            @keypress.enter="assignDiamondCarat($event.target.value)"
                            @blur="assignDiamondCarat($event.target.value)"
                        />
                    </div>
                </div>

                <!-- Carat Range Slider -->
                <div class="flex-1 w-full relative">
                    <input
                        type="range"
                        :min="0"
                        :max="caratKeys.length - 1"
                        :step="1"
                        v-model="sliderIndex"
                        aria-label="Adjust diamond carat size"
                        class="range-slider cursor-pointer"
                        @mousedown="disableCarouselSwipe"
                        @mouseup="enableCarouselSwipe"
                    />
                </div>
            </div>

            <!-- Main Images -->
            <SampleImage
                className="absolute m-1 sm:m-0 sm:inset-x-0 sm:bottom-0 sm:translate-y-full text-xs sm:text-base sm:text-center px-1 bg-white/50 sm:bg-transparent sm:px-0 sm:py-1 py-2"
            />

            <MediaImage :src="getImagUrl('metal')"
                className="w-full h-full"
                :alt="`${product?.name} metal preview`"
            />
            <MediaImage :src="getImagUrl('shape')"
                :parentClass="`absolute inset-0 origin-[67%_54%]`"
                className="absolute w-full h-full"
                :style="`scale: ${getTransformProperty};`"
                :alt="`${product?.name} diamond shape preview`"
            />
        </div>
    </div>
</template>
<script>
import SampleImage from '~/components/product/SampleImage.vue';
import MediaImage from '~/components/common/MediaImage.vue';
export default {
    name : 'Slider',
    components: { SampleImage, MediaImage },
    props: {
        isCaratSlider: Boolean,
        product: Object,
        selectedVariant: Object,
    },
    data() {
        return {
            slider: null,
            image1: null,
            // selectedCarat: 0.25,
            image2: null,
            image3: null,
            imageCarat: null,
            sliderData: null,
            sliderIndex: 0.25,
            selectedMetal: 'white',
            shape: 'round',
            transformValue: {
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
            },
            scaleValue: 1,
            diamondCarat: null,
            updateInput: 0,
        };
    },
    async mounted() {
        this.sliderData = await (this.product?.slider?.metal && this.product?.slider?.shape) ? this.product.slider : [];
        this.shape = this.product?.shape?.toLowerCase();
        if (this.product?.attributes?.length) {
            const caratAttribute = this.product.attributes.find(attr => attr.code.toLowerCase() === 'diamond_carat_weight');
            if (caratAttribute) {
                this.assignDiamondCarat(caratAttribute.value);
            }
        }
        this.slider = document.getElementById("slider");
        this.image1 = document.getElementById("image1");
        this.image2 = document.getElementById("image2");
        this.image3 = document.getElementById("image3");
    },
    computed: {
        getTransformProperty() {
            if (!this.transformValue || !this.shape || !this.selectedCarat) {
                return null;
            }
            return this.transformValue[this.shape] ? this.transformValue[this.shape]?.[this.selectedCarat] : null;
        },
        caratKeys() {
            return this.transformValue[this.shape] ? Object.keys(this.transformValue[this.shape])?.map(Number).sort((a, b) => a - b) : []; // Extract keys as numbers
        },
        selectedCarat() {
            return this.caratKeys[this.sliderIndex] ?? '0.25';
        },
        selectedScale() {
            return this.transformValue[this.shape] ? this.transformValue[this.shape][this.selectedCarat] : null; // Get scale value
        }
    },
    watch: {
        sliderIndex(newIndex) {
            this.sliderIndex = parseInt(newIndex); // Ensure it's an integer
        },
    },
    methods: {
        assignDiamondCarat(value) {
            this.diamondCarat = parseFloat(value) ?? parseFloat(this.selectedCarat);

            let nearestIndex = 0;
            let minDiff = Infinity;

            for (let i = 0; i < this.caratKeys.length; i++) {
                const current = this.caratKeys[i];
                const next = this.caratKeys[i + 1];

                if (next === undefined) {
                    nearestIndex = i;
                    break;
                }

                // If input is between current and next
                if (this.diamondCarat >= current && this.diamondCarat <= next) {
                    const middle = (current + next) / 2;
                    nearestIndex = this.diamondCarat <= middle ? i : i + 1;
                    break;
                }

                // For inputs beyond highest or below lowest
                const diff = Math.abs(current - this.diamondCarat);
                if (diff < minDiff) {
                    minDiff = diff;
                    nearestIndex = i;
                }
            }

            this.sliderIndex = nearestIndex;
            this.updateInput++;
        },

        disableCarouselSwipe() {
            this.$emit('update:carouselSwipe', false); // Disable carousel swipe
        },
        enableCarouselSwipe() {
            this.$emit('update:carouselSwipe', true); // Enable carousel swipe again
        },
        sliderMove(event) {
            const value = parseFloat(event.target.value);
            if (value <= 0.5) {
                this.image3.style.opacity = 1 - (value * 2);  // value * 2 because we need to map 0.5 to 1
                this.image2.style.opacity = 1;  // Keep image 2 fully visible while image 3 fades out
            } else {
                this.image3.style.opacity = 0;  // Make sure image 3 is completely transparent
                this.image2.style.opacity = 1 - ((value - 0.5) * 2);  // Fade out image 2
            }
        },
        getImagUrl(value) {
            switch (value) {
                case 'metal':
                    return this.sliderData?.metal ? this.sliderData?.metal[this.selectedMetal]?.url : '';
                case 'shape':
                    return this.product && this.product?.shape && this.sliderData?.shape ? this.sliderData?.shape[this.shape]?.url : '';
                default:
                    return '';
            }
        },
    }
}
</script>