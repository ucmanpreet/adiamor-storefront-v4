<template>
  <NuxtLink
    :to="link"
    :aria-label="item?.name"
    class="group relative block w-full h-full overflow-hidden p-6"
    :class="[checkProductFamily ? 'ring-gradient' : 'bg-gray-100']"
    v-if="images?.length"
  >
    <!-- Out of stock badge -->
    <p
      v-if="isUnavailable"
      class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10"
    >
      {{ lang.outOfStock }}
    </p>
    <!-- Default image (visible normally) -->
    <MediaImage
      :src="images[0]"
      :alt="item.name"
      className="block object-contain w-full h-full transition-opacity duration-300 ease-in-out mix-blend-multiply focus-within:ring-2 focus-within:ring-primary"
      :classDynamic="[{ 'md:group-hover:opacity-0': images[1] && images[1] !== null, 'md:group-focus-within:opacity-0': images[1] && images[1] !== null }, 'rounded-md']"
      aria-hidden="true"
      :transformWidth="640"
      decoding="async" loading="lazy"
    />

    <!-- Hover image (visible on hover) -->
    <MediaImage
      v-if="hasHoverImage && !isMobileAndTab"
      :src="images[1]"
      :alt="item.name + ' alternate product view'"
      className="hidden md:block absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 mix-blend-multiply group-focus-within:opacity-100"
      aria-hidden="true"
      :transformWidth="640"
      decoding="async" loading="lazy"
    />
  </NuxtLink>
  <NuxtLink
    v-else
    :to="link"
    class="relative flex items-center justify-center w-full h-full"
    :class="[checkProductFamily ? 'ring-gradient' : 'bg-gray-100']"
  >
    <p
      v-if="isUnavailable"
      role="status"
      aria-live="polite"
      class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10"
    >
      {{ lang.outOfStock }}
    </p>
    <img
      :src="$asset('~/assets/images/no-image.webp')"
      decoding="async" loading="lazy"
      alt="No image available for this product"
      class="aspect-square w-full rounded-md custom-gradient object-cover group-hover:opacity-75 cursor-pointer mix-blend-multiply"
    />
  </NuxtLink>
</template>
<script setup>
import lang from "~/utils/commonLocale";
import KEYS from "~/utils/constant.js";
import MediaImage from "~/components/common/MediaImage.vue";

const props = defineProps(["type", "item", "link", "images"]);

const { $isTabAndMobile, $isMobile } = useNuxtApp();

const isMobileAndTab = computed(() => $isTabAndMobile);
const hasHoverImage = computed(() => !!props.images?.[1]);
const isUnavailable = computed(() => props.type == "diamond"
  ? !(props.item?.in_stock && props.item?.is_sellable)
  : !props.item?.in_stock);
const checkProductFamily = computed(() => {
  if(!props.item) return false;
  let productFamily = props.item?.attribute_family?.code;
  let skipProductTypes = KEYS.GRADIENT_SKIP_PRODUCT_TYPES;
  return productFamily && !skipProductTypes.includes(productFamily);
});
const isMobile = computed(() => $isMobile);
</script>