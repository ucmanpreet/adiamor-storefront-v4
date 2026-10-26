<template>
    <div ref="root" class="max-w-7xl mx-auto w-full px-4 lg:px-8 sm:pb-2 overflow-hidden" role="region"
        aria-roledescription="carousel" :aria-labelledby="`carousel-heading-${uid}`"
        v-if="arrayData && arrayData.length">
        <div class="flex items-start">
            <h2 :id="`carousel-heading-${uid}`" class="flex-1 text-lg lg:text-2xl/[50px] font-normal">{{ heading }}
                <!-- <small class="mt-3 block text-sm font-light">{{ description }}</small> -->
            </h2>
            <div class="flex gap-3 items-center flex-row-reverse"
                v-if="(arrayData.length >= 5 && isDesktop) || (arrayData.length > 2 && !isDesktop)">
                <button class="flex items-center hover:text-white group" type="button" @click="showNextFunc()"
                    aria-label="Next products" @keydown.enter.prevent="showNextFunc()"
                    @keydown.space.prevent="showNextFunc()">
                    <svg class="w-6 h-6" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle class="text-white group-hover:text-primary" cx="13.5" cy="14" r="13.5"
                            transform="rotate(180 13.5 14)" fill="currentColor" />
                        <path
                            d="M10.1199 6.19134C10.0431 6.11539 10 6.01238 10 5.90498C10 5.79757 10.0431 5.69456 10.1199 5.61861C10.1966 5.54267 10.3007 5.5 10.4093 5.5C10.5178 5.5 10.622 5.54267 10.6987 5.61861L18.88 13.7136C18.9181 13.7512 18.9482 13.7959 18.9688 13.845C18.9894 13.8941 19 13.9468 19 14C19 14.0532 18.9894 14.1059 18.9688 14.155C18.9482 14.2041 18.9181 14.2488 18.88 14.2864L10.6987 22.3814C10.6607 22.419 10.6156 22.4488 10.5659 22.4692C10.5163 22.4895 10.463 22.5 10.4093 22.5C10.3555 22.5 10.3023 22.4895 10.2527 22.4692C10.203 22.4488 10.1579 22.419 10.1199 22.3814C10.0819 22.3438 10.0517 22.2991 10.0312 22.25C10.0106 22.2009 10 22.1482 10 22.095C10 22.0418 10.0106 21.9892 10.0312 21.94C10.0517 21.8909 10.0819 21.8463 10.1199 21.8087L18.0118 14L10.1199 6.19134Z"
                            fill="currentColor" />
                        <path
                            d="M10.1199 6.19134C10.0431 6.11539 10 6.01238 10 5.90498C10 5.79757 10.0431 5.69456 10.1199 5.61861C10.1966 5.54267 10.3007 5.5 10.4093 5.5C10.5178 5.5 10.622 5.54267 10.6987 5.61861L18.88 13.7136C18.9181 13.7512 18.9482 13.7959 18.9688 13.845C18.9894 13.8941 19 13.9468 19 14C19 14.0532 18.9894 14.1059 18.9688 14.155C18.9482 14.2041 18.9181 14.2488 18.88 14.2864L10.6987 22.3814C10.6607 22.419 10.6156 22.4488 10.5659 22.4692C10.5163 22.4895 10.463 22.5 10.4093 22.5C10.3555 22.5 10.3023 22.4895 10.2527 22.4692C10.203 22.4488 10.1579 22.419 10.1199 22.3814C10.0819 22.3438 10.0517 22.2991 10.0312 22.25C10.0106 22.2009 10 22.1482 10 22.095C10 22.0418 10.0106 21.9892 10.0312 21.94C10.0517 21.8909 10.0819 21.8463 10.1199 21.8087L18.0118 14L10.1199 6.19134Z"
                            stroke="currentColor" />
                    </svg>
                </button>
                <button class="flex items-center rotate-180 hover:text-white group" type="button"
                    @click="showPrevFunc()" aria-label="Previous products" @keydown.enter.prevent="showPrevFunc()"
                    @keydown.space.prevent="showPrevFunc()">
                    <svg class="w-6 h-6" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle class="text-white group-hover:text-primary" cx="13.5" cy="14" r="13.5"
                            transform="rotate(180 13.5 14)" fill="currentColor" />
                        <path class="group-hover:text-white"
                            d="M10.1199 6.19134C10.0431 6.11539 10 6.01238 10 5.90498C10 5.79757 10.0431 5.69456 10.1199 5.61861C10.1966 5.54267 10.3007 5.5 10.4093 5.5C10.5178 5.5 10.622 5.54267 10.6987 5.61861L18.88 13.7136C18.9181 13.7512 18.9482 13.7959 18.9688 13.845C18.9894 13.8941 19 13.9468 19 14C19 14.0532 18.9894 14.1059 18.9688 14.155C18.9482 14.2041 18.9181 14.2488 18.88 14.2864L10.6987 22.3814C10.6607 22.419 10.6156 22.4488 10.5659 22.4692C10.5163 22.4895 10.463 22.5 10.4093 22.5C10.3555 22.5 10.3023 22.4895 10.2527 22.4692C10.203 22.4488 10.1579 22.419 10.1199 22.3814C10.0819 22.3438 10.0517 22.2991 10.0312 22.25C10.0106 22.2009 10 22.1482 10 22.095C10 22.0418 10.0106 21.9892 10.0312 21.94C10.0517 21.8909 10.0819 21.8463 10.1199 21.8087L18.0118 14L10.1199 6.19134Z"
                            fill="currentColor" />
                        <path
                            d="M10.1199 6.19134C10.0431 6.11539 10 6.01238 10 5.90498C10 5.79757 10.0431 5.69456 10.1199 5.61861C10.1966 5.54267 10.3007 5.5 10.4093 5.5C10.5178 5.5 10.622 5.54267 10.6987 5.61861L18.88 13.7136C18.9181 13.7512 18.9482 13.7959 18.9688 13.845C18.9894 13.8941 19 13.9468 19 14C19 14.0532 18.9894 14.1059 18.9688 14.155C18.9482 14.2041 18.9181 14.2488 18.88 14.2864L10.6987 22.3814C10.6607 22.419 10.6156 22.4488 10.5659 22.4692C10.5163 22.4895 10.463 22.5 10.4093 22.5C10.3555 22.5 10.3023 22.4895 10.2527 22.4692C10.203 22.4488 10.1579 22.419 10.1199 22.3814C10.0819 22.3438 10.0517 22.2991 10.0312 22.25C10.0106 22.2009 10 22.1482 10 22.095C10 22.0418 10.0106 21.9892 10.0312 21.94C10.0517 21.8909 10.0819 21.8463 10.1199 21.8087L18.0118 14L10.1199 6.19134Z"
                            stroke="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="mt-4 -mx-2 sm:-mx-4 custom-slide">
            <EmblaCarousel v-bind="settings" ref="commonCarousel" :arrows="false" :dots="false">
                <div v-for="(value, indexMatch) in arrayData" :key="indexMatch" class="flex h-full" role="group"
                    :aria-label="`Product ${indexMatch + 1} of ${arrayData.length}`">
                    <div class="relative px-2 sm:px-4 h-full" v-if="isCleaningProduct">
                        <div rel="noopener noreferrer">
                            <div
                                class="relative h-auto w-full overflow-hidden bg-gray-50 border border-grey aspect-square">
                                <div v-if="value.match_label"
                                    class="bg-white py-1 px-1 absolute inset-x-0 z-0 text-xs text-center">{{
                                        value.match_label }}</div>
                                <MediaImage :src="value" :alt="value.title || value.name || 'Product image'"
                                    className="h-full w-full object-cover object-center"
                                    :attributes="getLWRatio(value)" :gradient="true" />
                            </div>
                            <div class="relative text-center mt-4">
                                <h2 class="mt-2 !text-sm uppercase font-gill-sans tracking-wider">{{ value.name }}</h2>
                                <p class="relative text-base" role="text" :aria-label="getPriceAriaLabel(value)">
                                    <span class="line-through text-gray-600 text-[0.8125rem]"
                                        v-if="showStrikeThroughPrice(value)" aria-hidden="true">{{
                                            formattedPrice(showStrikeThroughPrice(value)) }}</span>
                                    <span class="font-medium text-sm sm:text-base" aria-hidden="true"
                                        :class="{ 'text-black': showStrikeThroughPrice(value) }">{{
                                            formattedPrice(fetchPriceData(value))
                                        }}</span>
                                </p>
                            </div>
                            <Button type="button" colorType="bordered-primary" class="mt-4 w-full"
                                :disabled="loadingId === value.id" @click="emit('addToCartEmit', value)"
                                @focus="announceSlide(indexMatch, value)">
                                <span v-if="loadingId === value.id" class="inline-flex items-center gap-2">
                                    <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"
                                        aria-hidden="true">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4" />
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Adding...
                                </span>
                                <span v-else>Add to Cart</span>
                            </Button>
                        </div>
                    </div>
                    <div class="px-2 sm:px-4 w-full" v-else-if="type == 'yotpoSocialMedia'">
                        <div class="relative w-full aspect-square overflow-hidden rounded-lg">
                            <MediaImage v-if="value.img_url" :src="value.img_url"
                                :alt="`${value.source} Yotpo Image ${indexMatch + 1}` || 'Yotpo Product image'"
                                className="absolute inset-0 w-full h-full object-cover" />
                            <nuxt-img v-else provider="cdn"
                                src="/landing-pages/logos/placeholder.svg?updatedAt=1750436690367"
                                :alt="`Yotpo-media-fallback`"
                                class="absolute inset-0 w-full h-full object-contain p-6 bg-gray-50" />
                        </div>
                    </div>
                    <div class="relative px-2 sm:px-4 h-full" v-else>
                        <NuxtLink :to="getProductLink(value)" rel="noopener noreferrer" class="h-full" :aria-label="getProductAriaLabel(value)">
                            <div class="border border-grey h-full ring-gradient" aria-hidden="true">
                                <div class="relative h-auto w-full overflow-hidden"
                                    :class="[value.attribute_family_code === 'certified_diamond', type == 'similar' ? '' : 'aspect-square']">
                                    <div v-if="value.match_label"
                                        class="bg-primary text-white font-normal py-1.5 px-1 text-[0.62rem] sm:text-xs text-center tracking-widest-lg">
                                        {{ value.match_label }}</div>
                                    <div v-if="value.src"
                                        :style="value.attribute_family_code === 'certified_diamond' 
                                            ? { backgroundColor: bgColors[value.src] }
                                            : { backgroundImage: 'linear-gradient(#eee, white, #eee)' }"
                                    >
                                        <MediaImage :src="value.src"
                                            :alt="value?.title || value?.name || 'Product image'"
                                            :ratio="getLWRatio(value)"
                                            :parentClass="'sm:max-h-[278px] m-auto aspect-square'"
                                            :className="['max-w-full max-h-full h-full m-auto', value.attribute_family_code !== 'certified_diamond' && 'mix-blend-normal']"
                                            :classDynamic="[
                                                type == 'similar' && checkSampleImage(value) ? '' : 'object-cover',
                                                type == 'similar' && !checkSampleImage(value) && value.attribute_family_code == 'certified_diamond' ? 'aspect-square' : ''
                                            ]" />
                                    </div>
                                    <nuxt-img provider="cdn" v-else
                                        src="/landing-pages/logos/placeholder.svg?updatedAt=1750436690367"
                                        alt="product-fallback-image"
                                        class="h-full w-full object-center aspect-square p-6" />
                                </div>
                                <div v-if="checkSampleImage(value)"
                                    class="text-[#333] font-normal px-3 text-[10px] text-center tracking-widest-lg m-auto">
                                    Sample </div>
                                <div class="relative text-center pb-4 px-2 sm:px-6 space-y-3"
                                    v-show="type != 'yotpoSocialMedia'">
                                    <p class="mt-2 text-sm tracking-wider">{{ value.title }}</p>
                                    <ul class="flex justify-center items-center divide-x divide-black text-xxs sm:text-[0.6875rem] leading-none"
                                        v-if="getlableVlaue(value, diamondKeysToShow[0])">
                                        <template v-for="(grade, type) in diamondKeysToShow" :key="type">
<li class="px-1"  
                                            v-if="getlableVlaue(value, grade)">
                                            {{ getlableVlaue(value, grade) }} <span class="hidden sm:inline-block">- {{
                                                type
                                            }}</span>
                                        </li>
</template>
                                    </ul>
                                    <p class="relative text-base font-normal" role="text" :aria-label="getPriceAriaLabel(value)">
                                        <span class="line-through text-gray-600 text-[0.8125rem]"
                                            v-if="showStrikeThroughPrice(value)" aria-hidden="true">{{
                                                formattedPrice(showStrikeThroughPrice(value)) }}</span>
                                        <span class="font-medium text-sm sm:text-base" aria-hidden="true"
                                            :class="{ 'text-black': showStrikeThroughPrice(value) }">{{
                                                formattedPrice(fetchPriceData(value))
                                            }}</span>
                                    </p>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </EmblaCarousel>
        </div>
    </div>
</template>
<script setup>
import Button from "~/components/common/Button.vue";
import EmblaCarousel from '~/components/common/EmblaCarousel.vue'
import { showStrikeThroughPrice as showStrikeThroughPriceHelper, fetchPriceData as fetchPriceDataHelper, productRedirection, extractDominantColor } from "~/utils/universalHelper.js";
import MediaImage from "~/components/common/MediaImage.vue";
import KEYS from "~/utils/constant.js";

const props = defineProps({
    arrayData: {
        type: Array,
        default() {
            return [];
        },
    },
    heading: {
        type: String,
        default() {
            return '';
        },
    },
    description: {
        type: String,
        default() {
            return '';
        },
    },
    isCleaningProduct: {
        type: Boolean,
        default() {
            return false;
        },
    },
    isSummary: {
        type: Boolean,
        default() {
            return false;
        },
    },
    type: {
        type: String,
        default() {
            return '';
        },
    },
    loadingId: {
        type: [String, Number],
        default: null,
    },
    attributes: {
        type: Object,
        default() {
            return {};
        },
    },
});
const emit = defineEmits(['addToCartEmit']);

const { $bus, $formatPrice, $isMobile } = useNuxtApp();

const root = ref(null);
const commonCarousel = ref(null);

const settings = ref({
    "dots": false,
    "arrows": false,
    "infinite": false,
    "speed": 500,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "touchThreshold": 6,
    "responsive": [
        {
            "breakpoint": 480,
            "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
            }
        },
        {
            "breakpoint": 768,
            "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 1,
            }
        },
        {
            "breakpoint": 1024,
            "settings": {
                "slidesToShow": 4,
                "slidesToScroll": 1,
            }
        },
    ]
});
const diamondKeysToShow = ref({ 'Cut': 'diamond_cut_grade', 'Color': 'diamond_color_grade', 'Clarity': 'diamond_clarity_grade' });
const bgColors = ref({});
// carouselHeadingId: `carousel-${Math.random().toString(36).substr(2, 9)}`

const uid = useId();

const isDesktop = computed(() => !$isMobile);

onMounted(() => {
    fixHiddenSlideFocus();
});

onUpdated(() => {
    fixHiddenSlideFocus();
});

watch(() => props.arrayData, (newVal) => {
    extractColors(newVal);
}, { immediate: true });

async function extractColors(items) {
    if (!items || !items.length) return;
    for (const item of items) {
        if (item.src && !bgColors.value[item.src]) {
            const color = await extractDominantColor(item.src);
            bgColors.value[item.src] = color;
        }
    }
}

const fetchPriceData = item => fetchPriceDataHelper(item);
const showStrikeThroughPrice = item => showStrikeThroughPriceHelper(item);

function fixHiddenSlideFocus() {
    nextTick(() => {
        const hiddenSlides = root.value?.querySelectorAll('.slick-slide[aria-hidden="true"] a, .slick-slide[aria-hidden="true"] button');
        hiddenSlides?.forEach(el => {
            el.setAttribute('tabindex', '-1');
        });

        const visibleSlides = root.value?.querySelectorAll('.slick-slide[aria-hidden="false"] a, .slick-slide[aria-hidden="false"] button');
        visibleSlides?.forEach(el => {
            el.removeAttribute('tabindex');
        });
    });
}

function checkSampleImage(value) {
    if (props.type == 'similar' && value?.src?.includes('sample') && value?.attribute_family_code?.includes('diamond')) {
        return true;
    }
    return false;
}

// reversedRatio(value) {
//     const ratio = getLWRatio(value);
//     if (!ratio || !ratio.aspectRatio) return {};
//     const val = parseFloat(ratio.aspectRatio);
//     if (!val || isNaN(val)) return {};
//     return { aspectRatio: `1 / ${val}` };
// },

function getLWRatio(value) {
    const shape = (value?.diamond_shape || value?.shape || '').toLowerCase();
    if (shape === 'heart') return {};
    const shapeKey = Object.keys(KEYS.DIAMOND_SHAPE_LW_RATIOS).find(key => key === shape);
    const measurements = value?.diamond_lwr || value?.diamond_ratio;
    if (!measurements || !shapeKey) return {};
    const lwRatio = KEYS.DIAMOND_SHAPE_LW_RATIOS[shapeKey];
    if (!lwRatio) return {};
    const m = parseFloat(measurements);
    if (shape === 'radiant' || shape === 'cushion') {
        return { aspectRatio: `${lwRatio} / ${m}` };
    }
    return { aspectRatio: `${m} / ${lwRatio}` };
}

function getlableVlaue(item, label) {
    if (item[label]) return item[label] ?? '';
}

function getProductLink(value) {
    return productRedirection(value);
}

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), props.isSummary);
}

function getPriceAriaLabel(value) {
    const current = formattedPrice(fetchPriceDataHelper(value));
    const original = formattedPrice(showStrikeThroughPriceHelper(value));
    if (original) return `Original price ${original}, discounted price ${current}`;
    return `Price ${current}`;
}

function getProductAriaLabel(value) {
    const name = value.title || value.name || 'Product';
    const current = formattedPrice(fetchPriceDataHelper(value));
    const original = formattedPrice(showStrikeThroughPriceHelper(value));
    if (original) return `${name}, original price ${original}, discounted price ${current}`;
    return `${name}, price ${current}`;
}

function showNextFunc() {
    if (commonCarousel.value) {
        commonCarousel.value.next();
        setTimeout(() => {
            fixHiddenSlideFocus();
            announceNavigation('next');
        }, 520);
    }
}

function showPrevFunc() {
    if (commonCarousel.value) {
        commonCarousel.value.prev();
        setTimeout(() => {
            fixHiddenSlideFocus();
            announceNavigation('previous');
        }, 520);
    }
}

function getImages(item) {
    const img = item?.images?.find(
        i => !['certificates', 'mp4', '3dm'].includes(i?.type)
    );

    return img?.path || assetUrl("~/assets/images/no-image.webp");
}

function announceNavigation(direction) {
    const carousel = commonCarousel.value;
    const currentIndex = typeof carousel?.currentSlide === 'function' ? carousel.currentSlide() : 0;
    const slidesToShow = settings.value.slidesToShow || 4;
    const first = currentIndex + 1;
    const last = Math.min(currentIndex + slidesToShow, props.arrayData.length);
    $bus.emit('aria-announce',
        `Moved ${direction}. ${props.heading}: showing items ${first} to ${last} of ${props.arrayData.length}.`
    );
}

function announceSlide(index, item = null) {
    const itemName = item?.name || item?.title || '';
    $bus.emit('aria-announce',
        `${props.heading}. Item ${index + 1} of ${props.arrayData.length}${itemName ? ': ' + itemName : ''}`
    );
}
</script>

<style>
.slick-track {
    display: flex !important;
    align-items: stretch !important;
}

.slick-slide {
    height: auto !important;
}

.slick-slide>div {
    height: 100%;
}
</style>