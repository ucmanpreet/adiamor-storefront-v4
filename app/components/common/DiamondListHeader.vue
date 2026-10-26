<template>
    <div class="flex items-center w-full" role="row"
      :aria-disabled="isUnavailable ? 'true' : 'false'">

    <!-- SHAPE COLUMN -->
    <div class="flex items-center gap-2 p-1 sm:p-2 whitespace-nowrap"
      :class="['w-12 sm:w-32', { 'opacity-40': isUnavailable }]"
      :title="isUnavailable ? lang.outOfStock : ''"
      role="cell"
      :aria-label="`${shapeLabel} shape ${isUnavailable ? 'Out of stock' : ''}`">
      <div class="size-6 flex items-center relative">
        <Icon v-if="isUnavailable" name="stock-out" class="flex-none w-full h-full text-gray-400" keep-alive/>
        <Icon v-else :name="shapeLabelLower" class="flex-none w-full h-full rounded-md" keep-alive/>
      </div>
      <p class="hidden sm:inline-block capitalize">{{ shapeLabel }}</p>
    </div>

    <!-- DATA COLUMNS -->
    <!-- FIX 1: Iterate computedColumns instead of calling getlableVlaue() per render.
         All label resolution is done once in the computed, not on every repaint. -->
    <template v-for="col in computedColumns" :key="col.label">
      <div
        :class="[col.className, 'p-1 sm:p-2 whitespace-nowrap',
          { 'opacity-40': isUnavailable, 'hidden sm:inline-flex': !col.mobile }]"
        :title="isUnavailable ? lang.outOfStock : ''"
        role="cell"
        :aria-label="`${col.label}: ${col.ariaValue}`"
      >
        <DiscountedPrice class="flex flex-col sm:flex-row flex-1" :item="diamond" v-if="col.isPrice"/>
        <div v-else class="text-xs sm:text-sm">{{ col.displayValue }}</div>
      </div>
    </template>

    <!-- ACTION COLUMN -->
    <div class="p-2 whitespace-nowrap flex justify-end gap-4 items-center relative z-10 w-auto" role="cell">
      <Button type="button" colorType="link" class="capitalize text-primary"
        @click="redirectTo"
        :aria-label="`View details for ${diamond.name}`">
        <div class="flex gap-2 items-center">
          <span class="text-xs sm:text-sm capitalize">{{ lang.viewDetails }}</span>
          <Icon name="certified_diamond" class="w-5 h-5 hidden sm:inline-block" />
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup>
import {
  diamondSortColumns,
  attributeCodes,
  trimmedDiamondValues
} from "@/utils/searchConstant.js";
import lang from "~/utils/commonLocale.js";
import Icon from "~/components/common/Icon.vue";
import Button from "~/components/common/Button.vue";
import DiscountedPrice from "~/components/common/DiscountedPrice.vue";
import { correctUrl } from "~/utils/universalHelper";

const SORT_COLUMNS = diamondSortColumns ?? [];
const SHAPE_KEY = attributeCodes.shape;

const props = defineProps({
  diamond: {
    type: [Object, Number, Array],
  },
  nav: {
    type: String,
    default: null,
  },
});

const router = useRouter();
const { $formatPrice } = useNuxtApp();

const isUnavailable = computed(() => !(props.diamond?.in_stock && props.diamond?.is_sellable && props.diamond?.status));
const hasAttributes = computed(() => props.diamond?.attributes && Object.keys(props.diamond.attributes).length > 0);
const shapeLabel = computed(() => resolveLabel(SHAPE_KEY));
const shapeLabelLower = computed(() => shapeLabel.value?.toLowerCase());
const computedColumns = computed(() => SORT_COLUMNS
  .filter(col => col.label && col.key !== 'shape')
  .map(col => {
    const isPrice = col.key === 'price';
    const displayValue = isPrice ? null : resolveLabel(col.key);
    return {
      label:        col.label,
      className:    col.className,
      mobile:       col.mobile,
      isPrice,
      displayValue,
      ariaValue:    isPrice ? formattedPrice(props.diamond.price) : displayValue,
    };
  }));
const redirectPath = computed(() => {
  const urlKey = props.diamond && props.diamond.url_key;
  return `${correctUrl(urlKey)}?rfr=search&nav=${props.nav}&type=diamond`;
});

function formattedPrice(price) {
  return $formatPrice(parseFloat(price) || 0, false);
}
function resolveLabel(key) {
  if (!hasAttributes.value) return '';
  if (Array.isArray(key) && key.length > 0) {
    return key.map(k => {
      const val = props.diamond.attributes[k];
      return val ? (trimmedDiamondValues[val] ?? formatValue({ code: k, value: val })) : '';
    }).join(' / ');
  }
  const val = props.diamond.attributes[key];
  return val ? (trimmedDiamondValues[val] ?? formatValue({ code: key, value: val })) : '';
}
function formatValue(item) {
  if (item?.code?.includes('percent')) return `${item.value}%`;
  return item?.value ?? '';
}
function redirectTo() {
  router.push(redirectPath.value);
}
</script>