<template>
  <article class="py-4 grid grid-cols-2 w-full gap-3 bg-white" :aria-labelledby="`diamond-title-${diamond.sku}`"
    :aria-disabled="isUnavailable ? 'true' : 'false'">

    <!-- Thumbnail -->
    <div class="space-y-3 relative">
      <div
        class="aspect-square flex-none flex items-center justify-center bg-gray-50 relative border border-gray-200 p-2">
        <MediaImage :src="imageSource" :alt="diamond.name" className="w-full h-full object-cover" />
        <p v-if="isUnavailable" role="status" aria-live="polite"
          class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1 px-2 text-xxs z-10">
          {{ lang.outOfStock }}
          <span class="sr-only">{{ diamond.name }} is currently out of stock.</span>
        </p>
      </div>
      <!-- Shipping badge -->
      <div v-if="!isUnavailable"
        class="absolute top-0.5 right-2 inline-flex items-center gap-1 py-1 px-2  text-custom-green text-xxs"
        :aria-label="shippingText">
        <Icon name="truck" class="w-4 h-4" :class="isFastShipping ? 'text-custom-green' : 'text-primary'" />
        <!-- <span class="uppercase">Ships Soon</span> -->
      </div>
    </div>


    <!-- Content -->
    <div class="flex flex-col flex-1 gap-y-3 min-w-0 text-[10px]">
      <!-- Title -->
      <h2 :id="`diamond-title-${diamond.sku}`" class="text-xs">{{ diamond.name }}</h2>

      <!-- Attributes -->
      <template v-if="getValidAttributes">
        <dl class="grid grid-cols-2">
          <dt>Item #: </dt>
          <dd class="font-light break-words">{{ diamond.sku }}</dd>
        </dl>
        <dl class="grid grid-cols-2">
          <dt>Measurements :</dt>
          <dd class="font-light break-words">{{ diamond?.attributes?.measurements }}</dd>
        </dl>
        <dl class="grid grid-cols-2">
          <dt>Est. Ship Date :</dt>
          <dd class="font-light break-words">{{ shippingText }}</dd>
        </dl>
      </template>
      <template v-else>
        <p class="text-xs text-gray-400">No Data Found</p>
      </template>

      <!-- Mobile action row — no Tooltip wrappers needed on touch -->
      <div class="flex items-center justify-between gap-2 pt-1">

        <!-- Save + Select — Tooltip removed: no hover on mobile -->
        <div class="flex items-center gap-2 ml-auto">
          <Heart :item="wishlistData"
            class="flex items-center py-1 px-3 min-h-[30px] text-xs border border-primary text-primary"
            :key="diamond.sku">
            <span class="inline-flex ml-1 uppercase">Save</span>
          </Heart>
          <CreateBundle :item="diamond"
            class="flex items-center py-1 px-3 min-h-[30px] text-xs border border-primary text-primary"
            :key="diamond.sku" :disabled="isUnavailable" :aria-disabled="isUnavailable.toString()">
            <span class="inline-flex ml-1 uppercase">Select</span>
          </CreateBundle>
        </div>
      </div>

    </div>
  </article>
</template>

<script>
import lang from "~/utils/commonLocale.js";
import DiamondAttributes from "~/components/common/DiamondAttributes.vue";
import Heart from "~/components/ui/Heart.vue";
import CreateBundle from "~/components/common/CreateBundle.vue";
import Icon from "~/components/common/Icon.vue";
import MediaImage from "~/components/common/MediaImage.vue";
const NO_IMAGE = assetUrl('~/assets/images/no-image.webp');

export default {
  name: 'DiamondListViewMobile',
  components: { DiamondAttributes, Heart, CreateBundle, Icon, MediaImage },
  props: {
    diamond: {
      type: [Object, Number, Array],
      required: true,
    },
    nav: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      lang
    };
  },
  computed: {
    getValidAttributes() {
      const attrs = this.diamond?.attributes;
      return attrs && Object.keys(attrs).length > 0;
    },
    isUnavailable() {
      return !(this.diamond?.in_stock && this.diamond?.is_sellable && this.diamond?.status);
    },
    imageSource() {
      return this.diamond?.media?.thumbnail_url
        ? [this.diamond.media.thumbnail_url]
        : NO_IMAGE;
    },
    shippingText() {
      return this.diamond?.shipping?.message || lang.moreThanSevenDays;
    },
    isFastShipping() {
      const days = this.diamond?.shipping?.days;
      return days > 0 && days < 4;
    },
    wishlistData() {
      const target = this.diamond;
      if (!target) return {};
      const priceData = target?.price;
      return {
        name: `${target.name}`,
        id: `${target.id}`,
        attribute_family_code: `${target?.attribute_family?.code ?? 'certified_diamond'}`,
        sku: `${target.sku}`,
        url_key: target.url_key,
        images: this.imageSource,
        price: priceData?.raw?.amount,
        discounted_price: priceData?.on_sale ? priceData?.special?.amount : 0,
        attributes: target.attributes,
      };
    },
  },
};
</script>
