<template>
  <article class="relative h-full flex flex-col">
    <div class="absolute top-0 w-full flex items-center p-2 z-20">
      <div class="flex gap-2 justify-end sm:gap-3 w-full">
        <span
          class="inline-flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          tabindex="0"
        >
          <Icon
            name="truck"
            class="w-4 h-4 cursor-pointer"
            :class="isShippingSoon ? 'text-custom-green' : 'text-primary'"
            aria-hidden="true"
          />
          <span class="sr-only">{{ shippingText }}</span>
        </span>
        <Heart :item="wishlistData" class="flex-none" :key="diamond && diamond.sku" />
      </div>
    </div>

    <NuxtLink :to="redirectTo" class="block cursor-pointer" tabindex="-1" aria-hidden="true">
      <div class="relative aspect-square overflow-hidden bg-gray-50 border border-gray-100">
        <img
          :src="posterSrc"
          :alt="''"
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        <div
          v-if="isSampleImage"
          class="absolute bottom-0 left-0 z-10 w-full p-1 text-center text-sm opacity-40 bg-[#D2D1D4]"
          aria-hidden="true"
        >
          Sample Image
        </div>
      </div>
    </NuxtLink>

    <div class="mt-2.5 text-xs sm:text-sm text-center flex-1 flex flex-col">
      <div class="space-y-2">
        <div class="flex-1 flex flex-col">
          <NuxtLink
            :to="redirectTo"
            class="block text-sm flex-1 relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {{ diamond && diamond.name }}
          </NuxtLink>

          <div class="mt-1.5 flex gap-1 items-center justify-center" v-if="hasAttributes">
            <ul
              role="none"
              class="flex list-outside justify-center items-center text-xxs sm:text-[0.6875rem] leading-none"
            >
              <li
                role="none"
                class="first:list-none list-disc first:pl-0 pr-5 last:pr-0"
                v-for="(grade, type) in $options.DIAMOND_KEYS"
                :key="type"
                v-show="diamond && diamond.attributes && diamond.attributes[grade]"
              >
                <span class="sr-only">{{ type }}: {{ diamond && diamond.attributes && diamond.attributes[grade] }}</span>
                <span aria-hidden="true">{{ diamond && diamond.attributes && diamond.attributes[grade] }}</span>
              </li>
            </ul>
          </div>

          <DiscountedPrice :item="diamond" :parentClass="'mt-1.5 text-gray-900 space-x-2'" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { attributeCodes } from "~/utils/searchConstant";
import Heart from "~/components/ui/Heart.vue";
import DiscountedPrice from "~/components/common/DiscountedPrice.vue";
import Icon from "~/components/common/Icon.vue";
import { correctUrl } from "~/utils/universalHelper";
import noImage from '~/assets/images/no-image.webp';

const DIAMOND_KEYS = {
  Cut: attributeCodes.cut,
  Color: attributeCodes.color,
  Clarity: attributeCodes.clarity,
};

export default {
  name: 'DiamondGridCardMobile',
  DIAMOND_KEYS,
  NO_IMAGE: noImage,

  components: { Heart, DiscountedPrice, Icon },

  props: {
    diamond: {
      type: [Object, Number],
      default: null,
    },
    nav: {
      type: String,
      default: null,
    },
  },

  computed: {
    wishlistData() {
      const d = this.diamond;
      if (!d) return {};
      const priceData = d.price;
      return {
        name: `${d.name}`,
        id: `${d.id}`,
        attribute_family_code: `${d.attribute_family?.code ?? 'certified_diamond'}`,
        sku: `${d.sku}`,
        url_key: d.url_key,
        images: d.media?.thumbnail_url ? [d.media.thumbnail_url] : [],
        price: priceData?.raw?.amount,
        discounted_price: priceData?.on_sale ? priceData?.special?.amount : 0,
        attributes: d.attributes,
      };
    },

    isShippingSoon() {
      const days = this.diamond && this.diamond.shipping && this.diamond.shipping.days;
      return days > 0 && days < 4;
    },

    shippingText() {
      if (!this.diamond || !this.diamond.shipping || !this.diamond.shipping.message) {
        // `lang` was referenced in the original but never imported — guarded here.
        return typeof lang !== 'undefined' ? lang.moreThanSevenDays : 'More than 7 days';
      }
      let message = this.diamond.shipping.message;
      if (this.diamond.shipping.estimated_date) {
        message += `, estimated by ${this.diamond.shipping.estimated_date}`;
      }
      return message;
    },

    hasAttributes() {
      return !!(this.diamond && this.diamond.attributes);
    },

    redirectTo() {
      const urlKey = this.diamond && this.diamond.url_key;
      return `${correctUrl(urlKey)}?rfr=search&nav=${this.nav}&type=diamond`;
    },
    posterSrc() {
      return (this.diamond && this.diamond.media && this.diamond.media.thumbnail_url)
        || this.$options.NO_IMAGE;
    },
    isSampleImage() {
      return !!(this.posterSrc && this.posterSrc.includes('sample'));
    },
  },

  methods: {
    handleImageError(e) {
      e.target.onerror = null;
      e.target.src = this.$options.NO_IMAGE;
    },
  },
};
</script>