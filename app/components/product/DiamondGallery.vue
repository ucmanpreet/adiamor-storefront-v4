<template>
  <div class="flex flex-col-reverse sm:flex-row gap-x-1 sm:gap-x-6 flex-1"
    :class="threeSixtyPreviewArr && threeSixtyPreviewArr?.length ? 'gap-y-12' : 'gap-y-4'">
    <!-- Image selector -->
    <div class="sm:mx-auto sm:w-24 flex-none">
      <img :src="getPosterImage" :alt="product?.name || 'Product front view'" ref="imgEl" @load="onImageLoad"
        crossorigin="anonymous" style="display: none;" />
      <p v-if="threeSixtyPreviewArr && threeSixtyPreviewArr?.length && activeTab === 1"
        class="py-2 text-xs sm:text-sm mx-2 font-medium text-center relative -top-3 sm:hidden">
        Real Diamond Video
      </p>
      <div class="flex flex-wrap items-center justify-center sm:grid grid-cols-4 sm:grid-cols-1 gap-1 sm:gap-4"
        role="tablist" aria-label="Product image views">
        <!-- Front Image Preview -->
        <button id="tabs-1-tab-1"
          class="relative flex-none sm:flex-1 flex w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-2 focus:ring-primary/40 focus:outline-none border border-gray-200 overflow-hidden"
          :class="{ 'ring-2 ring-primary': activeTab === 1 }" type="button" :aria-selected="activeTab === 1"
          :aria-controls="`tabs-1-panel-1`" @click="activeTab = 1"
          :aria-label="product?.name ? `View ${product.name} front image` : 'View front image'" role="tab">
          <ImagePreview :image="getDataByPosition('front')" ref="viewerFront" :key="getDynamicKey('front')" :attributes="getLWRatio"
            :mobile="true" :type="'button'" :shapeClass="`bg-cover`" :altLabel="''" :hide-preview="true" />
        </button>

        <!-- 360° Pair Preview -->
        <template v-if="threeSixtyPreviewArr?.length && checkPairProductFamily">
          <button :id="`tabs-1-tab-360-${index}`" aria-controls="tabs-1-panel-3"
            class="relative flex-none sm:flex-1 flex flex-col w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-2 focus:ring-primary/40 focus:outline-none border border-gray-200 overflow-hidden"
            v-for="(el, index) in threeSixtyPreviewArr" :key="`pair_${index}`" @click="assign360View(el)" type="button"
            :aria-label="`360 degree pair view ${index + 1}`" :aria-selected="activeTab === 3 && jsonUrl === el" role="tab">
            <Icon name="eos-360" class="w-8 h-8 text-primary" aria-hidden="true" />
            <span aria-hidden="true" class="block">360°</span>
            <span aria-hidden="true" class="block">View</span>
          </button>
        </template>

        <!-- Video Preview -->
        <template v-if="videoPreviewArr?.length">
          <button :id="`tabs-1-tab-video-${index}`" aria-controls="tabs-1-panel-5"
            class="relative flex-none sm:flex-1 flex flex-col w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-2 focus:ring-primary/40 focus:outline-none border border-gray-200 overflow-hidden"
            v-for="(el, index) in videoPreviewArr" :key="`video_${index}`" @click="activeTab = 5" type="button"
            :aria-label="`Video preview ${index + 1}`" :aria-selected="activeTab === 5" role="tab">
            <Icon name="video" class="w-8 h-8" aria-hidden="true" />
            <span aria-hidden="true" class="block">video</span>
          </button>
        </template>

        <!-- iFrame 360 Video Preview -->
        <template v-if="iFramePreviewArr?.length">
          <button :id="`tabs-1-tab-iframe-${index}`"
            class="relative flex-none sm:flex-1 flex flex-col w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-2 focus:ring-primary/40 focus:outline-none border border-gray-200 overflow-hidden"
            v-for="(el, index) in iFramePreviewArr" :key="`iframe_${index}`" @click="assign360ViewModal(el)"
            type="button" aria-selected="false" :aria-label="`360 degree video view ${index + 1}`" role="tab">
            <div
              class="flex flex-col text-[9px] sm:text-base items-center justify-center gap-1 overflow-hidden pointer-events-none"
              aria-hidden="true">
              <Icon name="video" class="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
              360&deg; video
            </div>
          </button>
        </template>

        <!-- Dimension Preview -->
        <template v-if="shapeAvailable && product?.attributes?.length">
          <button
            class="relative flex-none sm:flex-1 flex flex-col w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-white focus:ring-2 focus:ring-primary/40 focus:outline-none border border-gray-200 overflow-hidden"
            v-for="(el, index) in dimensionArr" :key="`${el}_${index}`"
            :id="`tabs-1-tab-dimension-${index}`"
            :class="{ 'ring-1 ring-primary border-primary': viewType === el && activeTab === 4 }"
            @click="assignDimenionValue(el)" type="button" :aria-selected="viewType === el && activeTab === 4"
            :aria-label="`${el.charAt(0).toUpperCase()}${el.slice(1)} dimension preview`"
            :aria-controls="`tabs-1-panel-4`"
            role="tab">
            <ImagePreview :image="getDiamonsionImage(el)" ref="dimensionPreview" :key="getDiamonsionImage(el)"
              :mobile="true" :type="'button'" :gradient="false" :altLabel="''" :hide-preview="true" />
          </button>
        </template>

        <!-- Certificates -->
        <template v-if="certificatesPreviewArr && certificatesPreviewArr.length && product?.is_available">
          <button
            class="relative flex-none sm:flex-1 flex w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-2 focus:ring-primary/40 focus:outline-none border border-gray-200 overflow-hidden"
            v-for="(el, index) in certificatesPreviewArr" :key="index" @click="handleCertificateClick(el)" type="button"
            :aria-label="`View certificate ${index + 1}`" role="tab">
            <ImagePreview :image="getThumbnail" ref="giaCertificatePreview"
              :key="getDynamicKey(`certificates_${index}`)" :mobile="true" :type="'button'" :altLabel="''" :hide-preview="true" />
          </button>
        </template>

        <!-- On hand preview -->
        <button id="tabs-1-tab-2" v-if="checkProductFamily"
          class="relative flex-none sm:flex-1 flex w-14 h-14 sm:w-24 sm:h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none border border-gray-200 overflow-hidden"
          :class="{ 'ring-2 ring-primary': activeTab === 2 }" type="button"
          :aria-selected="activeTab === 2" @click="activeTab = 2" role="tab"
          aria-label="Preview on hand" aria-controls="tabs-1-panel-2">
          <nuxt-img provider="cdn" v-if="!checkSliderShow"
            src="/landing-pages/heros/female_hand_visualizer_zo_light_updated.webp?updatedAt=1748413513903"
            alt="" aria-hidden="true" class="absolute top-0 left-0 w-full h-full pointer-events-none" />
          <nuxt-img provider="cdn" v-else src="/landing-pages/heros/r3099.jpg?updatedAt=1748413654508"
            alt="" aria-hidden="true" class="absolute top-0 left-0 w-full h-full pointer-events-none" />
          <span
            class="absolute inset-0 px-0.5 sm:m-2 py-1 capitalize bg-white/80 text-xs sm:text-base flex flex-col justify-center"
            aria-hidden="true">
            <Icon name="hand" class="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
            Preview
          </span>
        </button>
      </div>
    </div>

    <!-- Tabs content (role="tabpanel") remain unchanged, all tab panels have tabindex="0" and role="tabpanel" -->
    <div class="flex-1">
      <div id="tabs-1-panel-1" role="tabpanel" class="relative" aria-labelledby="tabs-1-tab-1" v-if="activeTab === 1">
        <div class="aspect-square">
          <div class="absolute right-0 ml-auto mt-3 mr-3 z-20 sm:hidden">
            <Heart :item="product" :selectedVariant="{}" @click="active = !active" :size="`w-5 h-5`"
              :key="product.sku" />
          </div>
          <template v-if="threeSixtyPreviewArr && threeSixtyPreviewArr?.length && checkProductFamily">
            <DiamondViewer :path="threeSixtyPreviewArr[0]" :showAttributes="true" :isProduct="true"
              :productImage="getPosterImage" />
            <p class="py-2 text-xs hidden sm:block sm:text-sm mx-2 font-medium absolute bottom-0 inset-x-0">
              Real diamond Video
            </p>
          </template>
          <template v-else>
            <div :style="`background-color: ${avgColor};`">
              <ImagePreview :image="getDataByPosition('front')" ref="viewerFront" :gradient="true"
                :key="getDynamicKey('front-second-primary')" :transformProp="canvasWidth" :attributes="getLWRatio"
                @error="onImageError = true" :altLabel="product?.name" />
              <SampleImage v-if="isSampleImage(getPosterImage)" />
            </div>
            <ImageZoom @zoom="setCanvasWidth" v-if="checkProductFamily" v-show="!onImageError" />
          </template>
        </div>
      </div>

      <div id="tabs-1-panel-2" role="tabpanel" aria-labelledby="tabs-1-tab-2" v-if="activeTab === 2 && checkProductFamily">
        <Slider :isCaratSlider="checkSliderShow" :product="product" />
      </div>

      <div id="tabs-1-panel-3" role="tabpanel" class="relative aspect-square" tabindex="0" aria-label="360 degree pair view" :key="jsonUrl"
        v-if="activeTab === 3">
        <DiamondViewer :showAttributes="true" :isProduct="true" :path="jsonUrl" :productImage="getPosterImage" />
      </div>

      <div id="tabs-1-panel-4" role="tabpanel" class="relative aspect-square" tabindex="0" aria-labelledby="tabs-1-tab-dimension-0" :key="dimensionImage"
        v-if="activeTab === 4 && dimensionImage">
        <ImagePreview :image="dimensionImage" ref="dimensionPreviewTab" :shapeClass="getShapeClass"
          :key="getDynamicKey('dimension-image')" :gradient="true" :alt="`${viewType} dimension preview`" />
        <ul class="absolute inset-0 z-10">
          <li v-for="(dim, index) in attrForDiamensions[viewType]" :key="index"
            class="absolute text-xs sm:text-sm lg:text-xs xl:text-sm" :class="getDimensionClass(dim?.code)">
            <template v-if="getDiamondAttribute(dim?.code, true)?.value">
              {{ getDiamondAttribute(dim?.code, true)?.label ?? dim?.label }} : {{ getDiamondAttribute(dim?.code,
              true)?.value }}
            </template>
          </li>
        </ul>
      </div>

      <div id="tabs-1-panel-5" role="tabpanel" class="relative aspect-square" tabindex="0" aria-label="Video preview" :key="jsonUrl"
        v-if="activeTab === 5">
        <div id="tabs-2-panel-1" class="h-full w-full relative group" @touchstart="handleTouchStart"
          @touchend="handleTouchEnd" aria-labelledby="tabs-2-tab-1" role="tabpanel" tabindex="0"
          :key="`${getDynamicKey('mp4')}_${selectedIndex}`">
          <button
            class="text-black absolute bg-white p-2 rounded-full z-10 sm:ml-[17px] top-1/2 sm:-translate-x-full -translate-y-1/2 sm:hidden border border-gray-500 group-hover:text-gray-500 group-hover:block"
            @click="prevImg" v-if="videoPreviewArr?.length > 1 && selectedIndex > 0" aria-label="Previous video">
            <Icon name="arrow" class="w-3 h-3 sm:w-4 sm:h-4 rotate-180 text-current" aria-hidden="true" />
          </button>
          <transition :name="transitionDirection === 'right' ? 'fade-right' : 'fade-left'" mode="out-in">
            <component :is="ImageVideo" :key="getDynamicKey('mp4')"
              v-bind="{ videoSrcs: videoPreviewArr[selectedIndex], item: product, poster: getPosterImage }" />
          </transition>
          <button
            class="text-black absolute bg-white p-2 rounded-full z-10 sm:mr-[17px] top-1/2 sm:translate-x-full -translate-y-1/2 sm:hidden border border-gray-500 group-hover:text-gray-500 group-hover:block right-0"
            @click="nextImg" v-if="videoPreviewArr?.length > 1 && selectedIndex < videoPreviewArr?.length - 1"
            aria-label="Next video">
            <Icon name="arrow" class="w-3 h-3 sm:w-4 sm:h-4 text-current" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <PdfViewer :pdfSrc="certificatePath" v-if="certificatePath" @close="certificatePath = ''" />
    <VideoModal maxWidthClass="max-w-3xl xl:max-w-5xl" :videoUrl="modalUrl" v-if="iFramePreviewArr?.length && modalUrl"
      @close="closeModal" />
  </div>
</template>
<script setup>
import KEYS from "~/utils/constant.js";
import dimensionData from "~/static/js/diamondDimensions.js";
import ImagePreview from "~/components/product/ImagePreview.vue";
import Icon from "~/components/common/Icon.vue";
import Heart from "~/components/ui/Heart.vue";
import DiamondViewer from "~/components/common/DiamondViewer.vue";
import SampleImage from "~/components/product/SampleImage.vue";
import ImageZoom from "~/components/common/ImageZoom.vue";
import Slider from "~/components/common/Slider.vue";
import PdfViewer from "~/components/ui/PdfViewer.vue";
import VideoModal from "~/components/common/VideoModal.vue";
import ImageVideo from "~/components/product/ImageVideo.vue";
import { getProductImages } from "~/utils/universalHelper.js";

const props = defineProps({
  product: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(['callGTMEvent']);

const route = useRoute();
const config = useRuntimeConfig().public;

const imgEl = ref(null);

const threeSixtyPreviewArr = ref([]);
const videoPreviewArr = ref([]);
const iFramePreviewArr = ref([]);
const certificatesPreviewArr = ref([]);
const dataImages = ref(0);
const certificatePath = ref("");
const showRequestImageModal = ref(false);
const showViewText = ref(false);
const activeTab = ref(1);
const loadingReel = ref(true);
const pairJsonImages = ref([]);
const dimensionArr = ref(["side", "top"]);
const viewType = ref("side");
const dimensionImage = ref(null);
const diamondCertificateCode = ref("diamond_certificate_number");
const active = ref(false); // toggled from the template (Heart @click) but never declared in the old data()
const attrForDiamensions = ref({
  side: [
    {
      code: "diamond_depth_percent",
      label: "Depth",
    },
    {
      code: "diamond_table_percent",
      label: "Table",
    },
    {
      code: "diamond_height",
      label: "Depth",
    },
    {
      code: "diamond_girdle",
      label: "Girdle",
    },
    {
      code: "diamond_culet",
      label: "Culet",
    },
  ],
  top: [
    {
      code: "diamond_width",
      label: "Width",
    },
    {
      code: "diamond_length",
      label: "Length",
    },
  ],
});
const shapeClass = ref({
  heart: {
    diamond_depth_percent: "left-1.5 sm:left-6 md:left-3.5 xl:left-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_table_percent: "top-12 sm:top-28 lg:top-16 xl:top-32 left-1/2 ml-[5%] -translate-x-1/2",
    diamond_height: "right-1.5 sm:right-6 md:right-3.5 xl:right-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_girdle: "bottom-12 sm:bottom-24 lg:bottom-20 xl:bottom-32 left-0 w-16 left-1/2 -translate-x-1/2 -ml-[12%]",
    diamond_culet: "bottom-12 sm:bottom-24 lg:bottom-20 xl:bottom-32 left-1/2 ml-[8%] -translate-x-1/2",
  },
  pear: {
    diamond_depth_percent: "left-1.5 sm:left-6 md:left-3.5 xl:left-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_table_percent: "top-12 sm:top-28 lg:top-16 xl:top-32 left-1/2 ml-[5%] -translate-x-1/2",
    diamond_height: "right-1.5 sm:right-6 md:right-3.5 xl:right-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_girdle: "bottom-12 sm:bottom-24 lg:bottom-20 xl:bottom-32 left-0 w-16 left-1/2 -translate-x-1/2 -ml-[12%]",
    diamond_culet: "bottom-12 sm:bottom-24 lg:bottom-20 xl:bottom-32 left-1/2 ml-[8%] -translate-x-1/2",
  },
  emerald: {
    diamond_depth_percent: "left-1.5 sm:left-6 md:left-3.5 xl:left-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_table_percent: "top-12 sm:top-28 lg:top-16 xl:top-32 left-1/2 ml-[5%] -translate-x-1/2",
    diamond_height: "right-1.5 sm:right-6 md:right-3.5 xl:right-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_girdle: "bottom-11 sm:bottom-24 lg:bottom-16 xl:bottom-28 left-0 w-16 left-1/2 -translate-x-1/2 -ml-[9%]",
    diamond_culet: "bottom-12 sm:bottom-24 lg:bottom-20 xl:bottom-36 left-1/2 ml-[7%] -translate-x-1/2",
  },
  oval: {
    diamond_depth_percent: "left-1.5 sm:left-6 md:left-3.5 xl:left-7 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_table_percent: "top-12 sm:top-28 lg:top-16 xl:top-32 left-1/2 ml-[5%] -translate-x-1/2",
    diamond_height: "right-1.5 sm:right-6 md:right-3.5 xl:right-4 top-1/2 -mt-10 w-10 sm:w-12",
    diamond_girdle: "bottom-11 sm:bottom-24 lg:bottom-16 xl:bottom-28 left-0 w-16 left-1/2 -translate-x-1/2 -ml-[9%]",
    diamond_culet: "bottom-12 sm:bottom-24 lg:bottom-20 xl:bottom-36 left-1/2 ml-[7%] -translate-x-1/2",
  },
  asscher: {
    diamond_girdle: "bottom-6 sm:bottom-4 left-0 w-16 left-1/2 -translate-x-1/2 ml-[12.5%]",
    diamond_culet: "bottom-20 sm:bottom-20 left-1/2 -ml-[8.5%] -translate-x-1/2",
  },
});
const diamondAuthority = ref(null);
const canvasWidth = ref(1);
const avgColor = ref(null);
const jsonUrl = ref(null);
const transitionDirection = ref('right');
const selectedIndex = ref(0);
const modalUrl = ref(null);
const onImageError = ref(false);
let startX; // was an implicit instance property set in handleTouchStart

const getPosterImage = computed(() => getDataByPosition('front')?.path || '');

const shapeAvailable = computed(() => props.product?.shape?.toLowerCase());

const getShapeClass = computed(() => dimensionData[shapeAvailable.value][viewType.value]?.['shape_class']);

const checkPairRoute = computed(() => route.path?.includes('diamond-pair'));

const checkProductFamily = computed(() => (
  props.product.attribute_family_code == "certified_diamond" &&
  !checkPairRoute.value
));

const checkPairProductFamily = computed(() => (
  props.product.attribute_family_code == "certified_diamond" &&
  checkPairRoute.value
));

const checkSliderShow = computed(() => props.product.attribute_family_code == "certified_diamond");

const checkSingleImage = computed(() => (
  props.product &&
  props.product.images &&
  (props.product.images.length == 1 || !props.product.images.length)
));

const getThumbnail = computed(() => {
  let diamondAuth = getDiamondAttribute("diamond_authority");
  if (diamondAuth) {
    return getCertificateThumbnail(diamondAuth);
  }
  return null;
});

const getLWRatio = computed(() => {
  if (!isSampleImage(getPosterImage.value)) return {};
  if (shapeAvailable.value === 'heart') return {};
  const shapeKey = Object.keys(KEYS.DIAMOND_SHAPE_LW_RATIOS).find(
    key => key === shapeAvailable.value?.toLowerCase()
  );
  const measurements = getDiamondAttribute('diamond_lwr');
  if (!measurements) return {};
  if (shapeKey) {
    const lwRatio = KEYS.DIAMOND_SHAPE_LW_RATIOS[shapeKey];
    if (!lwRatio) return {};
    const m = parseFloat(measurements);
    if (
      shapeAvailable.value?.toLowerCase() === 'radiant' ||
      shapeAvailable.value?.toLowerCase() === 'pear' ||
      shapeAvailable.value?.toLowerCase() === 'emerald' ||
      shapeAvailable.value?.toLowerCase() === 'cushion') {
      return { aspectRatio: `${lwRatio} / ${m}` };
    }
    return { aspectRatio: `${m} / ${lwRatio}` };
  }
  // return { aspectRatio: `${parseFloat(measurements)}` };
});

watch(activeTab, () => {
  emit('callGTMEvent');
});

onMounted(() => {
  if (props.product && props.product.images && props.product.images.length) {
    let threeSixtyArr = [], certificatesArr = [], videoArr = [], iFrameArr = [];

    props.product.images.forEach((el) => {
      let isCheckValue = el.type;

      switch (isCheckValue) {
        case "certificates":
          certificatesArr.push(el.path);
          break
        case "v360":
          threeSixtyArr.push(el.path);
          break;
        case "videos":
          videoArr.push(el.path);
          break;
        case "iframe":
          iFrameArr.push(el.path);
          break;
      }
    });

    threeSixtyPreviewArr.value = threeSixtyArr;
    certificatesPreviewArr.value = certificatesArr;
    videoPreviewArr.value = videoArr;
    iFramePreviewArr.value = iFrameArr;
  }

  diamondAuthority.value = getDiamondAttribute("diamond_authority");
});

function handleCertificateClick(path) {
  const externalDomains = ['https://www.igi.org/', 'https://www.gia.edu/'];
  if (externalDomains.some(d => path.startsWith(d))) {
    window.open(path, '_blank', 'noopener,noreferrer');
  } else {
    certificatePath.value = path;
  }
}

function getCertificateThumbnail(element) {
  if (!element) return null;
  let matched = KEYS.CERTIFICATE_TYPE.find(el => element?.toLowerCase().includes(el));
  if (!matched) {
    matched = KEYS.NON_PROVIDED_CERTIFICATE_TYPES.find(el => element?.toLowerCase().includes(el));
    if (matched) matched = 'gcal'
  }
  return matched ? `${config.cdnPrefix}${KEYS.CERTIFICATE_PATH}${matched}button` : null;
}

function isSampleImage(image) {
  return image?.includes('sample') && image?.includes(config.cdnPrefix);
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
  // The old code read `this.getArrLength`, which was never defined (undefined), so the comparison below was
  // always false and "next" never advanced. Kept identical.
  let arrLength = undefined;
  if (selectedIndex.value < arrLength - 1) {
    transitionDirection.value = 'right';
    selectedIndex.value++;
  }
}

function onImageLoad() {
  try {
    const avg = getAverageRGB(imgEl.value)
    if (avg) {
      const hexColor = rgbToHex(avg.r, avg.g, avg.b)
      avgColor.value = hexColor;
    }
  } catch (err) {
    console.error("Error computing average color", err)
  }
}

function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length === 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    componentToHex(r) +
    componentToHex(g) +
    componentToHex(b)
  )
}

function getAverageRGB(imgEl) {
  const blockSize = 1
  const defaultRGB = { r: 0, g: 0, b: 0 }
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d", { willReadFrequently: true })
  let data, width, height, i = -4, length
  const rgb = { r: 0, g: 0, b: 0 }
  let count = 0

  if (!context) return defaultRGB

  height = canvas.height = imgEl.naturalHeight || imgEl.height
  width = canvas.width = imgEl.naturalWidth || imgEl.width

  context.drawImage(imgEl, 0, 0);

  try {
    data = [
      context.getImageData(0, 0, width, 5),
      context.getImageData(0, 0, 5, height)
    ]
  } catch (e) {
    return defaultRGB
  }

  for (let j = 0; j < data.length; j++) {
    length = data[j].data.length
    i = -4
    while ((i += blockSize * 4) < length) {
      count++
      rgb.r += data[j].data[i]
      rgb.g += data[j].data[i + 1]
      rgb.b += data[j].data[i + 2]
    }
  }

  rgb.r = ~~(rgb.r / count)
  rgb.g = ~~(rgb.g / count)
  rgb.b = ~~(rgb.b / count)

  return rgb;
}

function setCanvasWidth(val) {
  canvasWidth.value = val;
}

function getDynamicKey(view) {
  return `${props.product?.sku}_${view}}`;
}

function getDimensionClass(code) {
  return dimensionData[shapeAvailable.value]?.[viewType.value]?.[code] ?? '';
}

function getDiamondAttribute(code, withLabel = false) {
  let attrs = props.product?.diamondAttributeDetail?.length ? props.product.diamondAttributeDetail[0]?.data : props.product?.attributes || [];
  if (!attrs.length) {
    return [];
  }
  let diamondValue = attrs?.find((el) => el.code == code);
  if (diamondValue) return withLabel ? diamondValue : diamondValue?.value;
  return "";
}

function assignDimenionValue(el) {
  viewType.value = el;
  dimensionImage.value = getDiamonsionImage(el);
  activeTab.value = 4;
}

function getDiamonsionImage(el) {
  return `${config.cdnPrefix}${KEYS.DIMENSION_PATH}${shapeAvailable.value}${KEYS.DIMENSION_SHAPE_POSTFIX}${el}`;
}

function assign360View(el) {
  jsonUrl.value = el;
  loadingReel.value = false;
  activeTab.value = 3;
}

function assign360ViewModal(el) {
  modalUrl.value = el;
}

function getDataByPosition(view, isCheckExtension = false) {
  return getProductImages(view, isCheckExtension, props.product);
}

function closeModal() {
  showRequestImageModal.value = false;
  modalUrl.value = null;
}
</script>

<style>
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
