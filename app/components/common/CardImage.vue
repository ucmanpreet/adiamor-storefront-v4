<template>
    <NuxtLink v-if="images?.length && link" :to="link" class="relative flex items-center justify-center w-full h-full" :key="primartyImage"
      :class="[{ 'ring-gradient': type == 'setting' }]"
      @focus="onHoverStart"
      @blur="onHoverEnd"
      @mouseenter="onHoverStart"
      @mouseleave="onHoverEnd"
    >

      <!-- Out of stock label -->
      <p v-if="isUnavailable" role="status"
        aria-live="polite"
        class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10">
        {{ lang.outOfStock }} </p>
      <MediaImage v-if="primartyImage" :src="primartyImage" :alt="item?.name ? item.name : 'Product image'" class="w-full h-full object-cover mix-blend-multiply"
        :class="[{ 'p-4': type == 'setting' }]" fetchpriority="high" />
    </NuxtLink>

    <!-- Fallback image -->
    <NuxtLink v-else-if="link" :to="link" class="relative flex items-center justify-center w-full h-full">
      <p v-if="isUnavailable"
        class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10">
        {{ lang.outOfStock }}</p>
        
      <MediaImage :src="$asset('~/assets/images/no-image.webp')"
        alt="No image available for this product"
        className="aspect-square w-full rounded-md custom-gradient object-cover group-hover:opacity-75 cursor-pointer" />
    </NuxtLink>

    <div v-else class="relative flex items-center justify-center w-full h-full">        
      <MediaImage :src="$asset('~/assets/images/no-image.webp')"
        alt="No image available for this product"
        className="aspect-square w-full rounded-md custom-gradient object-cover group-hover:opacity-75 cursor-pointer" />
    </div>
</template>
<script setup>
import lang from "~/utils/commonLocale";
import MediaImage from '~/components/common/MediaImage.vue';

const props = defineProps(['type', 'item', 'link', 'images', 'className']);

const emit = defineEmits(['hover', 'endHover']);

// The slick carousel refs (`${sku}_slick`) were never rendered in the template, so next()/prev() were no-ops.
function onHoverStart() {
  if (props.type == 'diamond') emit('hover');
}
function onHoverEnd() {
  if (props.type == 'diamond') emit('endHover');
}

const isUnavailable = computed(() => (props.type == 'diamond') ? !(props.item?.in_stock && props.item?.is_sellable) : !props.item?.in_stock);
const primartyImage = computed(() => props.images[0]);
</script>

<style>
/* .card div[class*="slick-"],
.card div[class*="slick-"] div {
@apply !w-full !h-full
} */

.v-slider-settings .slick-list,
.v-slider-settings .slick-slide>div {
  width: 100% !important;
  height: 100% !important;
}

.v-slider-settings .slick-track {
  height: 100% !important;
}

.v-slider-settings+div .value::after {
  width: 14px !important;
  height: 14px !important;
}

.v-slider-settings+div .value::after {
  width: 14px !important;
  height: 14px !important;
}

@media (min-width: 640px) {
  .v-slider-settings+div .value::after {
    width: 18px !important;
    height: 18px !important;
  }
}
</style>