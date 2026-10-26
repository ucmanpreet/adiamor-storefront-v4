<template>
  <HoverCard :link="`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${$hydrated ? getVisitorCode : ''}`" :ariaLabel="`View cart summary`"
    ref="cartHoverCard">
    <template #trigger>
      <button type="button" class="relative flex items-center p-2 -m-2"
        :aria-label="`Shopping cart, ${getOriginalCount || 0} items`"
        @click="redirect">
        <Tooltip :text="'Cart'" :placement="`top`">
          <Icon name="shopping-bag" class="w-4 h-4 cursor-pointer" aria-hidden="true" />
        </Tooltip>
        <Icon name="shopping-bag" class="w-4 h-4 cursor-pointer md:hidden" aria-hidden="true" />
        <span v-if="cartlistCount" aria-hidden="true"
          class="absolute top-0 right-0 -mt-0 -mr-1 w-4 h-4 text-xxs leading-4 text-primary border border-primary flex justify-center items-center rounded-full">{{
            getOriginalCount }}</span>
      </button>
    </template>

    <!-- List of items -->
    <template v-if="cartlist && cartlist.length > 0">
      <ul>
        <li v-for="(item, index) in limitedcart" :key="index" class="relative flex gap-2 border-b py-2">
          <NuxtLink :to="getRedirectUrl(item)" class="absolute inset-0"
            :aria-label="`${item.name}, ${formattedPrice(item.price)}`"></NuxtLink>
          <MediaImage :src="item" :alt="item?.name" :imgAttributes="getLWRatio(item)" className="w-full"
            :parentClass="'h-10 w-10 flex items-center justify-center'" />
          <div class="flex flex-col text-xs flex-1">
            <span class="text-sm">{{ getDescription(item) ?? item.name }}</span>
            <div class="flex justify-between">
              <span class="text-primary">#{{ getCartItemSku(item) }}</span>
              <span>{{ formattedPrice(fetchPriceData(item)) }}</span>
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center py-8" role="status">
        <NoDataFound :type="'cart'" iconClass="'w-6 h-6'" />
      </div>
    </template>

    <div v-if="cartlist && cartlist.length && getOriginalCount > 5" class="mt-2 text-blue-500 text-sm cursor-pointer">
      {{ getOriginalCount - 5 }} more
    </div>

    <!-- Add Button -->
    <template #button>
      <Button type="button" @click="redirect" colorType="primary"
        class="w-full uppercase font-gill-sans tracking-[0.125rem]">
        Continue to Cart
      </Button>
    </template>
  </HoverCard>
</template>

<script>
import HoverCard from '~/components/ui/HoverCard.vue';
import Tooltip from '~/components/ui/Tooltip.vue';
import Icon from '~/components/common/Icon.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import Link from '~/components/ui/Link.vue';
import { fetchPriceData, correctUrl, productRedirection, getDescription, fetchFirstProductImage, getAttr } from "~/utils/universalHelper.js";
import MediaImage from "~/components/common/MediaImage.vue";
import Button from '~/components/common/Button.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
  name: "CartButton",
  components: { HoverCard, Tooltip, Icon, NoDataFound, Link, MediaImage, Button },
  props: {
    cartlistCount: {
      type: Number,
      default: 0
    },
    cartlist: {
      type: Array,
      default: () => []
    },
    visitorCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      STATIC_ROUTES
    }
  },
  computed: {
    limitedcart() {
      let filtered = this.cartlist?.filter((item) => !item?.additional?.certificate);
      return filtered?.slice(0, 5);
    },
    getVisitorCode() {
      return this.$getVisitorCode();
    },
    getOriginalCount() {
      let excludeCertificates = this.cartlist?.filter((item) => !item?.additional?.certificate);
      return excludeCertificates?.length ?? this.cartlistCount;
    },
  },
  methods: {
    fetchPriceData: item => fetchPriceData(item),
    getDescription: item => getDescription(item),
    formattedPrice(price) {
      if (price) return this.$formatPrice(parseFloat(price));
    },
    getCartItemSku(item) {
      if (!item) return '';
      const { sku, additional } = item;
      if (additional) {
        let diamond_sku = additional.diamond_sku;
        if (Array.isArray(diamond_sku) && diamond_sku.length > 0) {
          return diamond_sku.length > 1 ? diamond_sku.join(', ') : diamond_sku[0];
        }
      }
      if (!sku) return null;
      const splitIndex = sku.toLowerCase().indexOf('-d-');
      if (splitIndex !== -1) {
        const setting = sku.substring(0, splitIndex);
        const diamond = sku.substring(splitIndex + 1); // includes 'd-'
        return `${diamond}, ${setting}`;
      }
      return sku;
    },
    getRedirectUrl(item) {
      let cartUrl = `${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.getVisitorCode}`;
      if (item && (item.product?.attribute_family_code?.includes('default') || item?.additional?.certificate)) {
        return cartUrl;
      }
      if (item && item?.additional?.certificate) {
        return cartUrl;
      }
      let url = item && item.product ? item?.product?.url_key : STATIC_ROUTES.HOME;
      if (url.includes('your-setting')) return `${correctUrl(url)}`;
      return productRedirection(item?.product ?? item);
    },
    redirect() {
      if (typeof this.$refs.cartHoverCard?.hidePopover == 'function') this.$refs.cartHoverCard.hidePopover();
      this.$router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.getVisitorCode}`);
    },
    getLWRatio(item) {
      const shape = (item?.product?.diamond_shape || item?.product?.shape || item?.diamond_shape || item?.shape || '').toLowerCase();
      if (shape === 'heart') return null;
      if (shape !== 'radiant') return null;

      const imgUrl = fetchFirstProductImage(item);
      if (typeof imgUrl === 'string' && imgUrl.includes('sample')) {
        const ratio = item?.product?.diamond_ratio || item?.diamond_ratio || null;
        if (!ratio) return null;

        const val = parseFloat(ratio);
        if (!val || isNaN(val)) return null;
        return { aspectRatio: `1 / ${val}` };
      }
      return null;
    }
  }
};
</script>