<template>
  <div class="flex flex-col w-full cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-primary/7 relative min-w-full" v-if="item">
    <div
      class="py-4 flex group-hover:text-gray-black w-full gap-5 bg-white">
      <div
        class="hidden aspect-square w-36 sm:w-52 sm:flex flex-col items-center justify-center bg-gray-50 relative border border-gray-200 p-2 space-y-3"
      >
        <MediaImage :src="getImages"
          alt="Diamond Pair image"
          className="w-full h-full bg-gray-200 object-cover group-hover:opacity-75" />
        <p
          v-if="getInStockKey == false"
          class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10"
        >
          Out of Stock
        </p>
      </div>
      <div
        class="flex flex-col flex-1 gap-y-5"
        v-if="item.attributes && item.attributes.length"
      >
        <dl
          class="grid grid-cols-3 xl:grid-cols-5 grid-flow-dense flex-1 gap-3 sm:gap-y-5 sm:gap-x-6 text-xxs sm:text-xs font-normal"
        >
          <div class="row-span-2 col-span-full sm:hidden flex items-center gap-4">
            <div
              class="aspect-square w-24 h-24 flex items-center justify-center bg-gray-50 relative border border-gray-200 p-2"
            >
              <MediaImage :src="getImages"
                alt="Diamond Pair image"
                className="w-full h-full bg-gray-200 object-cover group-hover:opacity-75" />
              <p
                v-if="getInStockKey == false"
                class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10"
              >
                Out of Stock
              </p>
            </div>
          </div>
          <div v-for="(el, index) in getAllowedAttributes" :key="index">
            <dt>{{ el.name }} :</dt>
            <dd class="font-light">
              <span class="block">{{ el.value }}</span>
              <span class="block">{{
                getlableVlaue(product.diamond2, el.code, true)
              }}</span>
            </dd>
          </div>
          <div>
            <dt>Est. Ship Date :</dt>
            <dd class="font-light">
              {{ getShippingText(product) }}
            </dd>
          </div>
          <div
            class="sm:hidden col-start-1 col-span-3 flex items-center justify-between gap-12 pb-2"
          >
          <Tooltip :searchGrid="true" class="sm:hidden flex items-center gap-1 py-1 px-2 sm:text-xs rounded-full border border-custom-green text-custom-green bg-custom-green/20 uppercase" :text="getShippingText(product)" v-if="getInStockKey">
            <Icon
              name="truck"
              class="w-5 h-5 cursor-pointer"
              :class="checkDaysAhead(product) ? 'text-custom-green' : 'text-primary'"
            />
            <span class="inline-flex ml-1">Ships Soon</span>
          </Tooltip>
          <div class="flex items-center justify-center gap-4">
            <CreateBundle :item="product" type="diamond-pair" class="flex items-center sm:!hidden gap-2 py-1 px-6 border border-gray-200 text-primary uppercase" :key="item.sku" :disabled="!getInStockKey">
              <span class="inline-flex ml-1 uppercase"> Select </span>
            </CreateBundle>
          </div>
          </div>
        </dl>
        <div class="hidden sm:flex justify-end col-span-5 badge">
          <Tooltip :searchGrid="true" class="hidden items-center gap-2 py-1 px-2 text-xs rounded-full border border-custom-green text-custom-green bg-custom-green/20 uppercase" :text="getShippingText(product)" v-if="getInStockKey">
            <Icon
              name="truck"
              class="w-5 h-5 cursor-pointer"
              :class="checkDaysAhead(product) ? 'text-custom-green' : 'text-primary'"
            />
            <span>Ships Soon</span>
          </Tooltip>
        </div>
        <div class="hidden sm:flex gap-4 items-center justify-end">
          <CompareButton v-if="!isMobile" :item="product" class="items-center hidden sm:inline-flex gap-2 py-1 px-6 border border-gray-200 text-primary uppercase" :key="item.sku" :isPair="true">
            <span class="inline-flex ml-1 uppercase">Compare</span>
          </CompareButton>
          <CreateBundle :item="product" type="diamond-pair" class="items-center hidden sm:inline-flex gap-2 py-1 px-6 bg-primary text-white uppercase" :key="item.sku" :disabled="!getInStockKey">
           <span class="inline-flex ml-1 uppercase"> Select </span>
          </CreateBundle>
        </div>
      </div>
      <div v-else class="flex-1 flex items-center justify-center">
        <p>No Data Found</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import {  diamondAttributeToShow,   trimmedDiamondValues } from "@/utils/searchConstant.js";
import lang from "~/utils/commonLocale.js";
import Tooltip from "../ui/Tooltip.vue";
import Icon from "~/components/common/Icon.vue";
import CompareButton from "../ui/CompareButton.vue";
import CreateBundle from "../common/CreateBundle.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { correctUrl } from "~/utils/universalHelper.js";

const props = defineProps({
  product: {
    type: [Object, Number, Array],
  },
});

const emit = defineEmits(['showImageModal']);

const route = useRoute();
const router = useRouter();
const { $isMobile } = useNuxtApp();

const filterType = ref("");
const showBox = ref(false);
const allowedDiamondKeys = diamondAttributeToShow ?? [];
const item = ref(null);

const getShipSoon = computed(() => (props.product && props.product?.sku) ? props.product.ship_soon : item.value?.ship_soon);
const getInStockKey = computed(() => props.product?.pair_in_stock);
const getAllowedAttributes = computed(() => {
  if (item.value?.attributes?.length) {
    return item.value.attributes.filter((attr) =>
      allowedDiamondKeys.includes(attr.code)
    );
  }
});
const getCertificateUrl = computed(() => {
  if (
    item.value &&
    Array.isArray(item.value.images) &&
    item.value.images.length > 0
  ) {
    const certificateImage = (item.value.images || []).find((image) => image.type === "certificates");
    if (certificateImage) {
      return certificateImage.path;
    }
  }
  return "";
});
const getImages = computed(() => {
  if (props.product?.images) {
    let images = props.product.images;
    if (images && images?.small) {
      return images.small;
    }
  }
  if (
    item.value &&
    Array.isArray(item.value.images) &&
    item.value.images.length > 0
  ) {
    const img = (item.value.images || []).find((image) => image.type === "images");
    if (img) {
      return img.path;
    }
  }
  return "";
});
const getButtonLabel = computed(() => {
  if (filterType.value)
    return filterType.value == "diamonds"
      ? "Add to Setting"
      : `Select this ${filterType.value.split("").slice(0, -1).join("")}`;
  return `Select this setting`;
});
const isMobile = computed(() => $isMobile);

onMounted(() => {
  filterType.value = route.params?.prefix?.toLowerCase();
  item.value = props.product?.diamond1;
});

function checkDaysAhead(product){
  return product?.shipping?.days > 0 && product?.shipping?.days < 4;
}
function getShippingText(product) {
  return product?.shipping?.message ? product.shipping?.message : lang.moreThanSevenDays;
}
function getlableVlaue(item, label, getFullName = false, isSecondCombine = false) {
  // Helper function to get value from an item by label
  if (!item || !item.attributes) return "N/A";

  // Original referenced `isPairData`/`diamondCaratCode`, which were never defined (branch never ran).

  if(item.attributes && Array.isArray(item.attributes)) {
    if (Array.isArray(label)) {
      const values = label.map((lab) => {
        let el = item.attributes?.find((el) => el.code === lab);
        if (el == null || el === "") return "N/A";
        return el && trimmedDiamondValues[el.value] && !getFullName
          ? trimmedDiamondValues[el.value]
          : el.value;
      });
      return values.join(" / ");
    } else {
      let el = item.attributes?.find((el) => el.code === label);
      if (el == null || el === "") return "N/A";
      return el && trimmedDiamondValues[el.value] && !getFullName
        ? trimmedDiamondValues[el.value]
        : el.value;
    }
  }
  return '';
}
function setParentData() {
  emit("showImageModal", false);
}
function transformRoute() {
  const segments = route.path.split("/").filter(Boolean);
  if (segments.length > 1 && segments[1] === "search") {
    return segments[2] ? `${segments[0]}-${segments[2]}` : `${segments[0]}`;
  }
  return null;
}
function redirectTo() {
  let basePath = `${correctUrl(props.product?.pair_url_key)}`;
  const params = new URLSearchParams();
  params.set("rfr", "search");
  params.set("nav", transformRoute());
  const queryString = params.toString();
  const separator = basePath.includes('?') ? '&' : '?';
  const path = queryString ? `${basePath}${separator}${queryString}` : basePath;
  router.push(path);
}
function toggleBox() {
  showBox.value = !showBox.value;
}
</script>