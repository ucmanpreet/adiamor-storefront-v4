<template>
  <HoverCard :link="wishListPath">
    <template #trigger>
      <button
        type="button"
        class="relative flex items-center p-2 -m-2"
        :aria-label="`Wishlist, ${wishlistCount || 0} items`"
        @click="$router.push(wishListPath)"
      >
        <Tooltip :text="'Wishlist'" :placement="`top`">
          <Icon name="heart-solid" class="w-4 h-4 cursor-pointer" />
        </Tooltip>
      </button>

      <!-- Visual Badge -->
      <span v-if="wishlistCount" aria-hidden="true"
        class="absolute top-0 right-0 -mt-2 -mr-3 w-4 h-4 text-xxs leading-4 text-primary border border-primary flex justify-center items-center rounded-full">{{
          wishlistCount }}</span>
    </template>

    <!-- List of items -->
    <template v-if="wishlist && wishlist.length > 0">
      <ul>
        <li v-for="(item, index) in limitedWishlist" :key="index" class="relative flex border-b py-2">
          <NuxtLink :to="getRedirectUrl(item)" class="absolute inset-0" :aria-label="`${item?.name}, ${formattedPrice(fetchPriceData(item))}`"></NuxtLink>
          <MediaImage
            :src="item"
            :alt="item?.name" class="w-10 h-10 object-cover mr-2" :className="`w-full h-full`"
            :imgAttributes="getLWRatio(item)" />
          <div class="flex flex-col text-xs flex-1">
            <span class="text-sm">{{ item?.name }}</span>
            <div class="flex justify-between">
              <span class="text-primary">#{{ skuToDisplay(item?.sku) ?? item?.sku }}</span>
              <div class="space-y-1 text-right">
                <span class="font-medium text-sm" v-if="item.price"
                    :class="{ 'text-black': showStrikeThroughPrice(item) }">{{
                        formattedPrice(fetchPriceData(item)) }}</span>
                <span class="line-through text-gray-600 text-xs"
                    v-if="showStrikeThroughPrice(item)">{{
                        formattedPrice(showStrikeThroughPrice(item))
                    }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center py-8" role="status">
        <NoDataFound :type="'wishlist'" iconClass="'w-6 h-6'" />
      </div>
    </template>

    <div v-if="wishlist && wishlist.length > 5" class="mt-2 text-blue-500 text-sm cursor-pointer">
      {{ wishlist?.length - 5 }} more
    </div>

    <!-- Continue Button -->
    <template #button>
      <Link :href="wishListPath" class="w-full uppercase font-gill-sans tracking-[0.125rem] !px-2">
      Continue To Wishlist
      </Link>
    </template>
  </HoverCard>
</template>

<script setup>
import HoverCard from '~/components/ui/HoverCard.vue';
import Tooltip from '~/components/ui/Tooltip.vue';
import Icon from '~/components/common/Icon.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import Link from '~/components/ui/Link.vue';
import { showStrikeThroughPrice, fetchPriceData, redirectionUrl, skuToDisplay, fetchFirstProductImage, getAttr } from "~/utils/universalHelper.js";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps({
  wishlistCount: {
    type: Number,
    default: 0
  },
  wishlist: {
    type: [Array, Object],
    default: () => []
  }
});

const { $formatPrice } = useNuxtApp();

const wishListPath = STATIC_ROUTES.WISHLIST;

const limitedWishlist = computed(() => {
  return props.wishlist.slice(0, 5)?.reverse();
});

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
function getRedirectUrl(item) {
  return redirectionUrl(item);
}
function getLWRatio(item) {
  const shape = getAttr(
      item?.attributes,
      'diamond_shape'
  )?.toLowerCase();

  if (shape === 'heart') return null;
  if (shape !== 'radiant') return null;

  const imgUrl = fetchFirstProductImage(item);

  if (typeof imgUrl === 'string' && imgUrl.includes('sample')) {

    const ratio = getAttr(
        item?.attributes,
        'diamond_lwr'
    );

    if (!ratio) return null;

    const val = parseFloat(ratio);

    if (!val || isNaN(val)) return null;

    return {
        aspectRatio: `1 / ${val}`
    };
  }

  return null;
}
</script>
