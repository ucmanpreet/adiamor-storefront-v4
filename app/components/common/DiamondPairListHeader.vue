<template>
  <div class="flex items-center w-full">
    <div class="flex items-center gap-2 p-1 sm:p-2 whitespace-nowrap"
      :class="['w-12 sm:w-32', { 'opacity-40': getInStockKey == false }]"
      :title="getInStockKey == false ? 'Out of stock' : ''">
      <div class="size-6 flex items-center relative">
        <Icon v-if="getInStockKey == false" name="stock-out" class="flex-none w-full h-full text-gray-400" />
        <Icon v-else :name="getShapeName" class="flex-none w-full h-full rounded-md" />
      </div>
      <p class="hidden sm:inline-block capitalize">{{ getShapeName }}</p>
    </div>
    <template v-for="column in sortColumns">
      <div :class="[
        column.className,
        'p-1 sm:p-2 whitespace-nowrap',
        {
          'opacity-40': getInStockKey == false,
          'hidden sm:inline-flex': !column.mobile,
        },
      ]" :title="getInStockKey == false ? 'Out of stock' : ''" v-if="column.label && column.key != 'shape'"
        :key="column.label">
        <div v-if="column.key == 'price'">
          <div class="line-through text-gray-400 text-[0.8125rem]" v-if="showStrikeThroughPrice(product)">
            {{
              formattedPrice(
                showStrikeThroughPrice(product)
              )
            }}
          </div>
          <div class="text-xs sm:text-sm" :class="{
            'text-black': showStrikeThroughPrice(
              product
            ),
          }" v-if="item?.price">
            {{ formattedPrice(fetchPriceData(product)) }}
          </div>
        </div>
        <div v-else class="text-xs sm:text-sm">
          {{ getlableVlaue(item, column.key, false, true) }}
          <div v-if="column.key != diamondCaratCode">
            {{ getlableVlaue(product?.diamond2, column.key, false, true) }}
          </div>
        </div>
      </div>
    </template>
    <div class="p-2 whitespace-nowrap flex justify-end gap-4 items-center relative z-10 w-auto xl:w-[182px] flex-auto">
      <button
        type="button"
        colorType="link"
        class="capitalize text-primary"
        :aria-label="getPairAriaLabel"
        @click.stop="redirectTo(item)"
      >
        <div class="flex gap-2 items-center" aria-hidden="true">
          <span class="text-xs sm:text-sm capitalize">{{ lang.viewDetails }}</span>
          <Icon name="certified_diamond_pair" class="w-5 h-5 hidden sm:inline-block" />
        </div>
      </button>
    </div>
  </div>
</template>
<script setup>
import {
  diamondSortColumns,
  diamondAttributeToShow,
  trimmedDiamondValues
} from "@/utils/searchConstant.js";
import lang from "~/utils/commonLocale.js";
import Icon from "~/components/common/Icon.vue";
import { showStrikeThroughPrice, fetchPriceData, correctUrl } from "~/utils/universalHelper.js";

const props = defineProps({
  product: {
    type: [Object, Number, Array],
  },
});

const emit = defineEmits(['showImageModal']);

const route = useRoute();
const router = useRouter();
const { $formatPrice, $isMobile } = useNuxtApp();

const filterType = ref("");
const showBox = ref(false);
const sortColumns = diamondSortColumns ?? [];
const allowedDiamondKeys = diamondAttributeToShow ?? [];
const item = ref(null);
const diamondCaratCode = 'diamond_carat_weight';

const getShipSoon = computed(() => (props.product && props.product?.sku) ? props.product.ship_soon : item.value?.ship_soon);
const getInStockKey = computed(() => props.product?.pair_in_stock);
const getShapeName = computed(() => props.product?.pair_shape.toLowerCase() || 'round');
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
const isMobile = computed(() => $isMobile);
const getPairAriaLabel = computed(() => {
  const shape = getShapeName.value;
  const ctTw = props.product?.pair_total_carat_weight || 'N/A';

  const d1 = item.value;
  const d2 = props.product?.diamond2;

  const getAttr = (diamond, code) => getlableVlaue(diamond, code, true);

  const d1Cut = getAttr(d1, 'diamond_cut_grade');
  const d1Color = getAttr(d1, 'diamond_color_grade');
  const d1Clarity = getAttr(d1, 'diamond_clarity_grade');

  const d2Cut = getAttr(d2, 'diamond_cut_grade');
  const d2Color = getAttr(d2, 'diamond_color_grade');
  const d2Clarity = getAttr(d2, 'diamond_clarity_grade');

  const originalPrice = showStrikeThroughPrice(props.product);
  const finalPrice = fetchPriceData(props.product);
  const priceText = originalPrice
    ? `Original price ${formattedPrice(originalPrice)}, Discounted price ${formattedPrice(finalPrice)}.`
    : `Price ${formattedPrice(finalPrice)}.`;

  return [
    `View details. Shape: ${shape}.`,
    `Total carat weight: ${ctTw}.`,
    priceText,
    `Diamond 1 — Cut: ${d1Cut}, Color: ${d1Color}, Clarity: ${d1Clarity}.`,
    `Diamond 2 — Cut: ${d2Cut}, Color: ${d2Color}, Clarity: ${d2Clarity}.`,
  ].join(' ');
});

onMounted(() => {
  filterType.value = route.params?.prefix?.toLowerCase();
  item.value = props.product?.diamond1;
});

function getlableVlaue(item, label, getFullName = false, isSecondCombine = false) {
  // Helper function to get value from an item by label
  if (!item || !item.attributes) return "N/A";

  if(isSecondCombine && label == diamondCaratCode) {
    return props.product?.pair_total_carat_weight;
  }

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
function formattedPrice(price) {
  if (price === 0) return $formatPrice(0);
  if (price) return $formatPrice(parseFloat(price), false);
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
</script>