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
<script>
import lang from "~/utils/commonLocale";
import MediaImage from '~/components/common/MediaImage.vue';
export default {
  name: 'CardImage',
  components: { MediaImage },
  props: ['type', 'item', 'link', 'images', 'className'],
  data() {
    return {
      settings: {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false, // Enable autoplay
        useCSS: false,
        autoplaySpeed: 2000, // Adjust the interval time (in ms) between slides, here it's 3000ms (3 seconds)
      },
      lang
    }
  },
  methods: {
    onHoverStart() {
      const slickRef = this.$refs[`${this.item.sku}_slick`];
      if (slickRef && typeof slickRef.next === "function") {
        slickRef.next();
      } else if (
        Array.isArray(slickRef) &&
        slickRef[0] &&
        typeof slickRef[0].next === "function"
      ) {
        slickRef[0].next();
      }
      if (this.type == 'diamond') this.$emit('hover');
    },
    onHoverEnd() {
      const slickRef = this.$refs[`${this.item.sku}_slick`];
      if (slickRef && typeof slickRef.prev === "function") {
        slickRef.prev();
      } else if (
        Array.isArray(slickRef) &&
        slickRef[0] &&
        typeof slickRef[0].prev === "function"
      ) {
        slickRef[0].prev();
      }
      if (this.type == 'diamond') this.$emit('endHover');

    },
  },
  computed: {
    isUnavailable() {
      return (this.type == 'diamond') ? !(this.item?.in_stock && this.item?.is_sellable) : !this.item?.in_stock;
    },
    primartyImage() {
      return this.images[0];
    }
  }
}
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