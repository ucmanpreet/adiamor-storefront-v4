<template>
  <article class="py-4 flex group-hover:text-gray-black w-full gap-5 bg-white"
    :aria-labelledby="`diamond-title-${diamond.sku}`"
    :aria-disabled="isUnavailable ? 'true' : 'false'"
  >
    <h2
      :id="`diamond-title-${diamond.sku}`"
      class="sr-only"
    >
      {{ diamond.name }}
    </h2>
    <div
      class="aspect-square w-52 flex flex-col items-center justify-center bg-gray-50 relative border border-gray-200 p-2 space-y-3">
      <!-- <Icon name="heart" class="w-24 h-24 rounded-md object-contain group-hover:opacity-75" /> -->
      <button type="button" @click="redirectTo()" :aria-label="`View details for ${diamond.name}`">
        <MediaImage :src="getImages" :alt="diamond.name" v-if="getImages?.length"
          className="w-full h-full bg-gray-200 object-cover group-hover:opacity-75" />
        <MediaImage :src="$asset('~/assets/images/no-image.webp')" alt="No product image available" v-else
          className="w-full h-full bg-gray-200 object-cover group-hover:opacity-75" />
        <p v-if="isUnavailable" role="status" aria-live="polite"
          class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10">
          {{ lang.outOfStock }}
          <span v-if="isUnavailable" class="sr-only">
            {{ diamond.name }} is currently out of stock.
          </span>
        </p>
      </button>
    </div>
    <div class="flex flex-col flex-1 gap-y-5">
      <template v-if="getValidAttributes">
        <dl class="text-xs font-normal space-y-3 sm:space-y-5">
          <DiamondAttributes :diamond="diamond" layout="block" :filter="true" :allowed-keys="allowedDiamondKeys">
            <dl>
              <dt>Est. Ship Date :</dt>
              <dd class="font-light">
                {{ getShippingText(diamond) }}
              </dd>
            </dl>
          </DiamondAttributes>
        </dl>
      </template>
      <template v-else>
        <div class="items-center justify-center">
          <p>No Data Found</p>
        </div>
      </template>
      <div class="mt-auto space-y-5">
        <div class="flex justify-end col-span-5 badge" v-if="!isUnavailable">
          <Tooltip :searchGrid="true"
            class="inline-flex items-center gap-2 py-1 px-2 text-xs rounded-full border border-custom-green text-custom-green bg-custom-green/20 uppercase"
            :text="getShippingText(diamond)" :aria-label="getShippingText(diamond)">
            <Icon name="truck" class="w-5 h-5 cursor-pointer"
              :class="checkDaysAhead(diamond) ? 'text-custom-green' : 'text-primary'" />
            <span>Ships Soon</span>
          </Tooltip>
        </div>
        <div class="flex gap-4 items-center justify-end">
            <Tooltip :searchGrid="true" :disableOnDesktop="true" class="inline-flex items-center gap-2 py-1 px-6 border border-gray-200 text-primary uppercase" :text="'Compare'">
              
                <CompareButton :item="diamond" class="flex items-center" :key="diamond.sku">
                <span class="inline-flex ml-1">Compare</span>
                </CompareButton>
              
            </Tooltip>
            <Tooltip :searchGrid="true" :disableOnDesktop="true" class="inline-flex items-center gap-2 py-1 px-6 border border-gray-200 text-primary uppercase" :text="'Wishlist'">
              <Heart :item="wishlistData" class="flex items-center" :key="diamond.sku">
               <span class="inline-flex ml-1"> Save </span>
              </Heart>
            </Tooltip>
            <Tooltip :searchGrid="true" :disableOnDesktop="true" class="inline-flex items-center gap-2 py-1 px-6 bg-primary text-white uppercase" :text="'Select'">
              <CreateBundle :item="diamond" class="flex items-center" :key="diamond.sku" :disabled="isUnavailable">
               <span class="inline-flex ml-1 uppercase"> Select </span>
              </CreateBundle>
            </Tooltip>
          </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import {
  diamondSortColumns,
  diamondAttributeToShow,
  attributeCodes,
} from "@/utils/searchConstant.js";
import lang from "~/utils/commonLocale.js";
import DiamondAttributes from "~/components/common/DiamondAttributes.vue";
import Tooltip from "~/components/ui/Tooltip.vue";
import Heart from "~/components/ui/Heart.vue";
import CreateBundle from "~/components/common/CreateBundle.vue";
import CompareButton from "~/components/ui/CompareButton.vue";
import Icon from "~/components/common/Icon.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { correctUrl } from "~/utils/universalHelper";

const props = defineProps({
  diamond: {
    type: [Object, Number, Array],
  },
  nav: {
    type: String,
    default: null,
  }
});

const emit = defineEmits(['showImageModal', 'callParentGTMEvent']);

const route = useRoute();
const router = useRouter();

const filterType = ref("");
const showBox = ref(false);
const allowedDiamondKeys = diamondAttributeToShow ?? [];

const getValidAttributes = computed(() => props.diamond?.attributes && Object.keys(props.diamond.attributes).length > 0);
const isUnavailable = computed(() => !(props.diamond?.in_stock && props.diamond?.is_sellable && props.diamond?.status));
const getCertificateUrl = computed(() => props.diamond?.certificate?.image_url);
const getImages = computed(() => [props.diamond?.media?.thumbnail_url]);
const getVideoUrl = computed(() => props.diamond?.media?.video_url);
const redirectPath = computed(() => {
  const urlKey = props.diamond && props.diamond.url_key;
  return `${correctUrl(urlKey)}?rfr=search&nav=${props.nav}&type=diamond`;
});
const wishlistData = computed(() => {
  const d = props.diamond;
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
});

onMounted(() => {
  filterType.value = route.params?.prefix?.toLowerCase();
});

function checkDaysAhead(product){
  return product?.shipping?.days > 0 && product?.shipping?.days < 4;
}
function getShippingText(product) {
  return product?.shipping?.message ? product.shipping?.message : lang.moreThanSevenDays;
}
function setParentData(isPoster = false) {
  emit("showImageModal", isPoster);
}
function redirectTo() {
  router.push(redirectPath.value);
}
function toggleBox() {
  showBox.value = !showBox.value;
  if (showBox.value) {
    emit('callParentGTMEvent', [props.diamond]);
  }
}
function formatValue(item) {
  if(item?.code){
    if(item?.code?.includes(`percent`)){
      return `${item?.value}%`;
    }
  }
  return item?.value ? item.value : "";
}
</script>