<template>
    <figure class="aspect-square overflow-hidden relative border border-gray-200 v-slider-settings">
        <!-- Loading Overlay -->
        <div class="absolute inset-0 bg-black/5 flex items-center justify-center z-20 group-light" role="status"
            aria-live="polite" v-show="loadingReel"
        >
            <span class="sr-only">Loading 360 degree view</span>
            <CustomLoader />
        </div>

        <!-- 360 Badge -->
        <div class="absolute right-1.5 bottom-1.5 text-gray-500 z-10 flex bg-gray-300 px-1 py-[6px] rounded-full" aria-hidden="true">
            <Icon name="view-360" class="w-6 h-6 text-sm" aria-hidden="true" />
            <sub class="relative right-0.5 top-1">°</sub>
        </div>

        <!-- Reel Viewer -->
        <div class="w-full h-full cursor-pointer overflow-hidden relative hidden sm:block" v-if="isDiamondReelShow">
            <DiamondViewer
                :productImage="poster"
                :reelImages="images"
                :path="videoUrl"
                :isSearch="true"
                :altName="computedAlt"
                @diamondReelEmpty="isDiamondReelShow = false"
                @error="handleViewerError"
            />
        </div>

        <!-- Static Image -->
        <div class="w-full h-full" v-else>
            <img
                @mouseenter="hoverStart"
                @click="abortHover"
                @keydown.enter="hoverStart"
                @keydown.space.prevent="hoverStart"
                class="w-full h-full object-cover"
                :src="poster"
                :alt="computedAlt"
                @error="fallbackImage"
                @mouseleave="isDiamondReelShow = false"
                aria-hidden="true"
            />

            <!-- Sample badge visual only -->
            <SampleImage
                v-if="isSampleImage(poster)"
                aria-hidden="true"
            />

            <!-- Screen reader sample notice -->
            <span
                v-if="isSampleImage(poster)"
                class="sr-only"
            >
                This is a sample image.
            </span>
        </div>
    </figure>
</template>
<script setup>
import { debounce } from '~/utils/debounce.js';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import DiamondViewer from '~/components/common/DiamondViewer.vue';
import SampleImage from '~/components/product/SampleImage.vue';
import Icon from '~/components/common/Icon.vue';

const props = defineProps(['poster', 'altName', 'videoUrl']);

const config = useRuntimeConfig().public;
const { $isMobile } = useNuxtApp();

const diamondViewerKey = ref(0);
const isDiamondReelShow = ref(false);
const loadingReel = ref(false);
const images = ref([]);
const dataFetched = ref(false);
let abortController = null;

const computedAlt = computed(() => {
    if (!props.altName) {
        return 'Diamond product image';
    }
    return props.altName;
});

function isSampleImage(image) {
    return typeof image === 'string' && image?.includes('sample') && image?.includes(config.cdnPrefix);
}
function fallbackImage(e) {
    e.target.src = assetUrl('~/assets/images/no-image.webp');
}
async function lazyLoadImages() {
    abortController = new AbortController();
    const signal = abortController.signal;

    try {
        const res = await fetch(props.videoUrl, { signal });
        const base64Array = await res.json();
        return base64Array.map((b64) => {
            const img = new Image();
            img.src = 'data:image/jpeg;base64,' + b64;
            return img;
        });
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('Image load aborted');
        } else {
            console.error(err);
        }
        return [];
    } finally {
        abortController = null;
    }
}
async function hoverStart() {
    if($isMobile) return;
    if (props.videoUrl && !dataFetched.value) {
        loadingReel.value = true;

        // Create a debounced function
        const fetchImagesDebounced = debounce(async () => {
            images.value = await lazyLoadImages();
            loadingReel.value = false; // set loading to false after images are loaded
            isDiamondReelShow.value = images.value && images.value.length > 0;
        }, 200);

        dataFetched.value = true;
        fetchImagesDebounced(); // call the debounced function
    } else {
        isDiamondReelShow.value = images.value && images.value.length > 0;
    }
}
function abortHover() {
    if(abortController) {
        abortController.abort(); // cancel the API call
        loadingReel.value = false;
    }
    isDiamondReelShow.value = false; // hide diamond reel if hovered
}
function handleViewerError() {
    isDiamondReelShow.value = false;
    images.value = [];
}
</script>