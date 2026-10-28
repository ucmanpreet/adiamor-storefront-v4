<template>
    <div class="flex-1 relative w-full mx-auto">
        <div class="aspect-square w-full relative lg:min-h-[38.813rem]" v-if="checkSingleImage"
        @click="checkGLBExistence()">
            <div class="absolute right-0 ml-auto mt-3 mr-3 z-30 top-0 sm:hidden">
                <Heart :item="product" :selectedVariant="selectedVariant" @click="active = !active" :size="`w-5 h-5`" :key="selectedVariant?.sku || product.sku"
                    />
                <span class="sr-only hidden sm:block">Add to Favorites</span>
            </div>
            <CompleteLookBanner />
            <button v-if="getDataByPosition('glb', true)"
                class="absolute right-0 top-0 m-3 shadow-md bg-white rounded-full z-30 flex items-center space-x-2">
                <span v-show="showViewText" class="pl-3">360 View</span>
                <span @mouseover="showViewText = true" @mouseleave="showViewText = false">
                    <Icon name="three-sixty" class="w-6 h-6" />
                </span>
            </button>
            <div id="tabs-2-panel-1" class="h-full w-full" aria-labelledby="tabs-2-tab-1" role="tabpanel" tabindex="0">
                <ImagePreview :image="getDataByPosition('front')" ref="viewerFront" :altLabel="`${product?.name ? product.name + ' ' : ''}Front view`" :key="getDynamicKey('front')" />
            </div>
        </div>
        <div class="mx-auto w-full" v-else-if="galleryReady && mainImage">
            <div class="flex flex-col md:flex-row lg:flex-col gap-3 sm:gap-6">
                <div @click="checkGLBExistence()"
                    class="relative flex aspect-square cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 flex-1">
                    <div class="absolute right-0 ml-auto mt-3 mr-3 z-30 top-0 sm:hidden">
                        <Heart :item="product" :selectedVariant="selectedVariant" @click="active = !active" :size="`w-5 h-5`" :key="selectedVariant?.sku || product.sku"
                            />
                        <span class="sr-only hidden sm:block">Add to Favorites</span>
                    </div>
                    <!--Complete look Banner-->
                    <CompleteLookBanner />

                    <!-- full screen icon -->
                    <button v-if="getDataByPosition('glb', true)"
                        class="absolute right-0 top-0 m-3 shadow-md bg-white rounded-full z-30 flex items-center space-x-2">
                        <span v-show="showViewText" class="pl-3">360 View</span>
                        <span @mouseover="showViewText = true" @mouseleave="showViewText = false">
                            <Icon name="three-sixty" class="w-6 h-6" />
                        </span>
                    </button>

                    <!-- Tab panel, show/hide based on tab state. -->
                    <div
                        :id="`panel-main-${product?.sku}`"
                        class="h-full w-full relative group"
                        @touchstart="handleTouchStart"
                        @touchend="handleTouchEnd"
                        :class="{'big-ring-gradient border border-gray-200': !isVideoType && validType}"
                        :aria-labelledby="`tab-front-${product?.sku}`"
                        role="tabpanel"
                        :key="mainImageKey"
                    >
                        <button class="text-black absolute bg-white p-2 rounded-full z-10 sm:ml-[17px] top-1/2 sm:-translate-x-full -translate-y-1/2 sm:hidden border border-gray-500 group-hover:text-gray-500 group-hover:block" @click="prevImg" v-if="getArrLength > 1 && selectedIndex > 0">
                            <Icon name="arrow" class="w-3 h-3 sm:w-4 sm:h-4 rotate-180 text-current" />
                        </button>
                        <transition :name="transitionDirection === 'right' ? 'fade-right' : 'fade-left'" mode="out-in">
                            <component
                                :is="isVideoType ? ImageVideo : ImagePreview"
                                :key="isVideoType ? getDynamicKey('mp4') : selectedIndex"
                                v-bind="isVideoType
                                ? { videoSrcs: getImageData, item: product  }
                                : { image: getImageData, ref: 'viewerFrontMain', hidePreview: false, badge: true, altLabel: getImageData?.view ? `${product?.name} ${getImageData?.view} preview product image.` : 'View product image' }"
                            />
                        </transition>
                        <button class="text-black absolute bg-white p-2 rounded-full z-10 sm:mr-[17px] top-1/2 sm:translate-x-full -translate-y-1/2 sm:hidden border border-gray-500 group-hover:text-gray-500 group-hover:block right-0" @click="nextImg" v-if="getArrLength > 1 && selectedIndex < getArrLength - 1">
                            <Icon name="arrow" class="w-3 h-3 sm:w-4 sm:h-4 text-current" />
                        </button>
                    </div>
                </div>

                <!-- Product tab views -->
                <div class="flex flex-row md:flex-col lg:flex-row flex-wrap justify-center gap-1.5 sm:gap-3" role="tablist" aria-label="Product image views"
                    aria-orientation="horizontal" aria-describedby="tab-instructions" @keydown="handleTabKeydown">
                    <p id="tab-instructions" class="sr-only hidden sm:block">
                        Use left and right arrow keys to navigate between product image tabs.
                    </p>
                    <button :id="`tab-front-${product?.sku}`"
                        v-if="getDataByPosition('front')"
                        @click="callImagePreviwer(getDataByPosition('front'), 'front')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 col-span-full"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'front' ? 'true' : 'false'"
                        :tabindex="activeTab === 'front' ? 0 : -1"
                        aria-label="Front view"
                        role="tab"
                        type="button"
                    >
                        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <ImagePreview :image="getDataByPosition('front')" ref="viewerfront" altLabel=""
                                :key="getDynamicKey('front')" className="border border-gray-200" :hidePreview="true"/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'front' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-side-${product?.sku}`"
                        v-if="getDataByPosition('side')"
                        @click="callImagePreviwer(getDataByPosition('side'), 'side')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 col-span-full"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'side' ? 'true' : 'false'"
                        :tabindex="activeTab === 'side' ? 0 : -1"
                        aria-label="Side view"
                        role="tab"
                        type="button"
                    >
                        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <ImagePreview :image="getDataByPosition('side')" ref="viewerSide" altLabel=""
                                :key="getDynamicKey('side')" className="border border-gray-200" :hidePreview="true"/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'side' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-flat-${product?.sku}`"
                        v-if="getDataByPosition('flat')"
                        @click="callImagePreviwer(getDataByPosition('flat'), 'flat')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'flat' ? 'true' : 'false'"
                        :tabindex="activeTab === 'flat' ? 0 : -1"
                        aria-label="Product in hand view"
                        role="tab"
                        type="button"
                    >
                        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <ImagePreview :image="getDataByPosition('flat')" ref="viewerFlat" altLabel=""
                                :key="getDynamicKey('flat')" className="border border-gray-200" :hidePreview="true"/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'flat' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-video-${product?.sku}`"
                        v-if="videoArr?.length"
                        @click="callImagePreviwer(videoArr, 'video')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-gray-100 text-xs sm:text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 col-span-full border border-gray-200"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'video' ? 'true' : 'false'"
                        :tabindex="activeTab === 'video' ? 0 : -1"
                        :aria-label="videoArr.length > 1 ? `360° video view, ${videoArr.length} videos` : '360° video view'"
                        role="tab"
                        type="button"
                    >
                        <div class="flex flex-col items-center justify-center gap-1 text-xxs lg:text-xs overflow-hidden" aria-hidden="true">
                            <Icon name="video" class="size-4"/>
                            <span>360&deg; <span class="hidden sm:inline-block">video</span></span>
                        </div>
                        <span v-if="videoArr.length > 1" aria-hidden="true" class="bg-black/50 text-white font-medium text-xs absolute top-0 right-0 py-1 px-1 sm:py-0.5 m-0 sm:m-1 capitalize">
                            +{{ videoArr.length }}
                        </span>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'video' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-purchase-${product?.sku}`"
                        v-if="purchasePreviewArr && purchasePreviewArr.length"
                        @click="callImagePreviwer(purchasePreviewArr, 'purchase')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'purchase' ? 'true' : 'false'"
                        :tabindex="activeTab === 'purchase' ? 0 : -1"
                        role="tab"
                        type="button"
                        :key="`${selectedVariant?.sku ?? product?.sku}_purchase`"
                        aria-label="Purchase view"
                    >
                        <div aria-hidden="true" class="absolute inset-0 overflow-hidden"><SettingIcons :imgData="purchasePreviewArr"/></div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'purchase' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-hand-${product?.sku}`"
                        v-if="handPreviewArr && handPreviewArr.length"
                        @click="callImagePreviwer(handPreviewArr, 'hand')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'hand' ? 'true' : 'false'"
                        :tabindex="activeTab === 'hand' ? 0 : -1"
                        role="tab"
                        type="button"
                        :key="`${selectedVariant?.sku ?? product?.sku}_hand`"
                        aria-label="On hand view"
                    >
                        <div aria-hidden="true" class="absolute inset-0 overflow-hidden"><SettingIcons :imgData="handPreviewArr"/></div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'hand' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-lifestyle-${product?.sku}`"
                        v-if="lifestylePreviewArr && lifestylePreviewArr.length"
                        @click="callImagePreviwer(lifestylePreviewArr, 'lifestyle')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'lifestyle' ? 'true' : 'false'"
                        :tabindex="activeTab === 'lifestyle' ? 0 : -1"
                        role="tab"
                        type="button"
                        :key="`${selectedVariant?.sku ?? product?.sku}_lifestyle`"
                        aria-label="Lifestyle view"
                    >
                        <div aria-hidden="true" class="absolute inset-0 overflow-hidden"><SettingIcons :imgData="lifestylePreviewArr"/></div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'lifestyle' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <div v-if="checkProductFamily && product"
                        role="presentation"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-xs hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4">
                        <Slider :isCaratSlider="checkSliderShow" :product="product" />
                    </div>

                    <button :id="`tab-socialMedia-${product?.sku}`" v-show="dataImages && dataImages > 0" @click="scrollToMedia"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'socialMedia' ? 'true' : 'false'"
                        :tabindex="activeTab === 'socialMedia' ? 0 : -1"
                        :aria-label="`Social media photos, ${dataImages} images`"
                        role="tab"
                        type="button">
                        <div class="absolute inset-0 overflow-hidden border border-gray-200" aria-hidden="true">
                            <nuxt-img provider="cdn" src="/landing-pages/instagram.webp?updatedAt=1748413170297" class="w-full h-full object-cover" alt=""/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'socialMedia' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                        <span aria-hidden="true"
                            class="bg-white border border-gray-300 sm:border-0 sm:bg-black/50 sm:text-white font-medium rounded-full sm:rounded-none text-xs absolute top-0 sm:top-auto sm:bottom-0 right-0 text-center px-1 py-0.5 sm:py-1 m-0.5 sm:m-1 capitalize z-10">+{{ dataImages }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-span-full" v-if="product.is_requested_image">
            <button @click="showRequestImageModal = true"
                class="inline-flex py-1 px-4 items-center gap-2 text-primary font-normal text-sm shadow rounded border border-gray-200">
                <Icon name="hand-up" class="w-5 h-5" />
                <span>Request More Images</span>
            </button>
        </div>

        <!--Three Sixty Modal-->
        <ThreeSixtyViewer v-if="isThreeSixtyPreview" @close="closeModal"
            :frontViewPath="this.getDataByPosition('front')" :modelPath="this.getDataByPosition('glb', true)" />
        <RequestImage v-if="showRequestImageModal" :product="product" @close="closeModal" />
    </div>
</template>
<script setup>
import KEYS from '~/utils/constant.js';
import Heart from '~/components/ui/Heart.vue';
import CompleteLookBanner from '~/components/banners/CompleteLookBanner.vue';
import Icon from '~/components/common/Icon.vue';
import ImagePreview from '~/components/product/ImagePreview.vue';
import SettingIcons from '~/components/product/SettingIcons.vue';
// Modals load when first opened
const ThreeSixtyViewer = defineAsyncComponent(() => import('~/components/modal/ThreeSixtyViewer.vue'));
const RequestImage = defineAsyncComponent(() => import('~/components/modal/RequestImage.vue'));
import Slider from '~/components/common/Slider.vue';
import { getProductImages, fetchFirstProductImage } from '~/utils/universalHelper.js';
import ImageVideo from './ImageVideo.vue';
import Button from '../common/Button.vue';

const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
    selectedVariant: {
        type: Object,
        default: { sku : null},
    },
    imgPreviewKey: {
        type: Number
    },
    socialGallery: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(['callGTMEvent']);

const route = useRoute();

const isThreeSixtyPreview = ref(false);
const handPreviewArr = ref([]);
const purchasePreviewArr = ref([]);
const lifestylePreviewArr = ref([]);
const videoArr = ref([]);
const tabItems = ref([]);
const dataImages = ref(0);
const showRequestImageModal = ref(false);
const showViewText = ref(false);
const mainImage = ref(null);
const mainImageKey = ref(0);
const selectedIndex = ref(0);
const transitionDirection = ref('right');
const activeTab = ref('front');
const galleryReady = ref(false);
const active = ref(false); // toggled from the template (Heart @click) but never declared in the old data()
let startX; // was an implicit instance property set in handleTouchStart

watch(() => props.selectedVariant?.sku, () => {
    prepareGallery();
});

watch(mainImageKey, () => {
    emit('callGTMEvent');
});

// Each slide only starts downloading once it mounts (ImagePreview), i.e. after the click on next/prev.
// Fetch the rest of the set as soon as it is shown so the browser cache already has them.
const preloaded = new Set();
function preloadSlides() {
    if (!import.meta.client || !Array.isArray(mainImage.value)) return;
    mainImage.value.forEach((item) => {
        if ((item?.path || item?.url || '').toLowerCase().includes('.mp4')) return;
        const url = fetchFirstProductImage([item]);
        if (!url || typeof url !== 'string' || preloaded.has(url)) return;
        preloaded.add(url);
        new Image().src = url;
    });
}
watch(mainImage, preloadSlides, { flush: 'post' });

watch(selectedIndex, () => {
    emit('callGTMEvent');
});

watch(() => props.socialGallery?.length, () => {
    dataImages.value = props.socialGallery.length;
});

const getImageData = computed(() => {
    let img = mainImage.value;

    if (img?.length) {
        img = img[selectedIndex.value];
    }

    return img;
});

const checkProductFamily = computed(() => {
    //props.product.attribute_family_code == 'engagement_rings_family' ||
    return props.product.attribute_family_code == 'certified_diamond' && route.params.slug != "diamond-pair";
});

const checkSliderShow = computed(() => props.product.attribute_family_code == 'certified_diamond');

const checkSingleImage = computed(() => {
    if(dataImages.value) return false;
    const variantImages = props.selectedVariant?.images || [];
    const productImages = props.product?.images || [];

    const unique = new Set();

    // child first
    variantImages.forEach(el => {
        const key = el.path || el.url;
        if (key) unique.add(key);
    });

    // parent fills only if not duplicate
    productImages.forEach(el => {
        const key = el.path || el.url;
        if (key && !unique.has(key)) {
            unique.add(key);
        }
    });

    // single OR no image
    return unique.size <= 1;
});

const getArrLength = computed(() => {
    let arr = mainImage.value;
    return arr?.length;
});

const validType = computed(() => {
    let validImageType = KEYS.GRADIENT_IMAGE_TYPE;
    let skipProductType = KEYS.GRADIENT_SKIP_PRODUCT_TYPES;
    return getImageData.value?.view && validImageType.includes(getImageData.value?.view) && !skipProductType.includes(props.product?.attribute_family_code);
});

const isVideoType = computed(() => {
    let item = mainImage.value?.length ? mainImage.value[selectedIndex.value] : null;
    if(item && item?.path?.toLowerCase().includes('.mp4')) {
        return true;
    }
    return false;
});

onMounted(() => {
    prepareGallery();
});

async function prepareGallery() {
    galleryReady.value = false;

    mainImage.value = null;
    clearStates();

    handPreviewArr.value = [];
    purchasePreviewArr.value = [];
    lifestylePreviewArr.value = [];
    videoArr.value = [];

    // force front first
    const frontImg =
        getProductImages('front', false, props.product, props.selectedVariant) ||
        getProductImages('side', false, props.product, props.selectedVariant) ||
        getProductImages('flat', false, props.product, props.selectedVariant);

    mainImage.value = frontImg;
    activeTab.value = 'front';

    await nextTick();

    // then load rest
    assignMedia(props.selectedVariant?.images);
    assignMedia(props.product?.images);

    galleryReady.value = true;
}

function scrollToMedia() {
    let el = document.getElementById('yotpoSocialMediaContainer');
    if (el) {
        const rect = el.getBoundingClientRect();
        const offset = 80; // header height

        if (rect.top > window.innerHeight || rect.top < 0) {
            window.scrollTo({
                top: window.scrollY + rect.top - offset,
                behavior: 'smooth'
            });
        }
    }
    emit('callGTMEvent', 'view_item_social_media');
}

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) { // swipe threshold
        if (diff > 0) {
            nextImg(); // swipe left -> next
        } else {
            prevImg(); // swipe right -> prev
        }
    }
}

function prevImg() {
    if (selectedIndex.value > 0) {
        transitionDirection.value = 'left';
        selectedIndex.value--;
    }
}

function nextImg() {
    let arrLength = getArrLength.value;
    if (selectedIndex.value < arrLength - 1) {
        transitionDirection.value = 'right';
        selectedIndex.value++;
    }
}

function getDynamicKey(view) {
    return `${props.selectedVariant?.sku ?? props.product?.sku}_${view}}`;
}

function getDataByPosition(view, isCheckExtension = false) {
    return getProductImages(view, isCheckExtension, props.product, props.selectedVariant);
}

function checkGLBExistence() {
    console.log('checkGLBExistence');
    // Check if variant images includes .glb file
    // isThreeSixtyPreview.value = getDataByPosition('glb', true);
    // (!isThreeSixtyPreview.value || isThreeSixtyPreview.value == false) ? callImagePreviwer('viewerFront') : "";
}

function callImagePreviwer(imgData, tabName) {
    mainImage.value = imgData;
    activeTab.value = tabName;
    clearStates();
}

function getVisibleTabs() {
    const all = [
        { name: 'front', data: getDataByPosition('front') },
        { name: 'side', data: getDataByPosition('side') },
        { name: 'flat', data: getDataByPosition('flat') },
        { name: 'video', data: videoArr.value?.length ? videoArr.value : null },
        { name: 'purchase', data: purchasePreviewArr.value?.length ? purchasePreviewArr.value : null },
        { name: 'hand', data: handPreviewArr.value?.length ? handPreviewArr.value : null },
        { name: 'lifestyle', data: lifestylePreviewArr.value?.length ? lifestylePreviewArr.value : null },
    ];
    return all.filter(t => !!t.data);
}

function handleTabKeydown(e) {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const visible = getVisibleTabs();
    const currentIdx = visible.findIndex(t => t.name === activeTab.value);
    let nextIdx = currentIdx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (currentIdx + 1) % visible.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (currentIdx - 1 + visible.length) % visible.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = visible.length - 1;
    const next = visible[nextIdx];
    // Update selected state FIRST so aria-selected is already "true"
    // before focus lands — prevents NVDA announcing focus + state change separately.
    callImagePreviwer(next.data, next.name);
    nextTick(() => {
        document.getElementById(`tab-${next.name}-${props.product?.sku}`)?.focus();
    });
}

function clearStates() {
    selectedIndex.value = 0;
    mainImageKey.value++;
}

function closeModal() {
    isThreeSixtyPreview.value = false;
    showRequestImageModal.value = false;
}

function assignMedia(images = []) {
    if (!images?.length) return;
    const existsInAnyArray = (el) => {
        const key = el.path || el.url;

        return [
            ...handPreviewArr.value,
            ...purchasePreviewArr.value,
            ...lifestylePreviewArr.value,
            ...videoArr.value
        ].some(item => (item.path || item.url) === key);
    };

    images.forEach((el) => {
        const type = el.view || el.type;

        // skip duplicate media
        if (existsInAnyArray(el)) return;

        switch (type) {
            case 'hand':
                handPreviewArr.value.push(el);
                break;
            case 'purchase':
                purchasePreviewArr.value.push(el);
                break;
            case 'lifestyle':
                lifestylePreviewArr.value.push(el);
                break;
            case 'mp4':
                videoArr.value.push(el);
                break;
        }
    });
}
</script>

<style>
@media (prefers-reduced-motion: reduce) {
  .fade-right-enter-active,
  .fade-right-leave-active,
  .fade-left-enter-active,
  .fade-left-leave-active {
    @apply transition-none duration-0;
  }
}

.fade-right-enter-active,
.fade-right-leave-active,
.fade-left-enter-active,
.fade-left-leave-active {
  @apply absolute w-full h-full transition-all duration-500 ease-in-out;
}

/* Right Direction */
.fade-right-enter,
.fade-left-leave-to {
  @apply translate-x-5 opacity-0;
}

.fade-right-leave-to,
.fade-left-enter {
  @apply -translate-x-5 opacity-0;
}
</style>