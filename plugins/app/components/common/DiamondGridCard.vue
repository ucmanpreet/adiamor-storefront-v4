<template>
  <article class="relative h-full flex flex-col">
    <div class="absolute top-0 w-full flex items-center p-2 z-20">
      <div class="flex gap-2 sm:gap-3 w-full">
          <Tooltip :text="'Compare'" className="hidden sm:inline-flex" :ariaDescribedby="`tooltip-${diamond.sku}`">
            <CompareButton :item="diamond" class="flex-none cursor-pointer text-gray-black" :key="diamond?.sku"/>
          </Tooltip>
          <Tooltip :text="getShippingText(diamond)" className="inline-flex ml-auto">
            <span
              class="inline-flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              tabindex="0"
            >
              <Icon
                name="truck"
                class="w-4 h-4 cursor-pointer"
                :class="checkDaysAhead(diamond) ? 'text-custom-green' : 'text-primary'"
                aria-hidden="true"
              />
              <span class="sr-only">{{ getShippingText(diamond) }}</span>
            </span>
          </Tooltip>
          <Tooltip :text="'Wishlist'" className="inline-flex sm:ml-0" :ariaDescribedby="`tooltip-${diamond.sku}`">
            <Heart :item="getWishListDataCommon(diamond)" class="flex-none" :key="diamond?.sku"/>
          </Tooltip>
      </div>
    </div>

    <NuxtLink :to="redirectTo" class="block cursor-pointer" tabindex="-1" aria-hidden="true">
      <DiamondPoster :poster="getPoster" :ratio="getLWRatio" :altName="''" :padding="isEmerald ? 20 : 0" v-if="isMobile || !getVideoUrl"/>
      <DiamondReel   :poster="getPoster" :videoUrl="getVideoUrl" :altName="''" v-else/>
    </NuxtLink>
    <div class="mt-2.5 text-xs sm:text-sm text-center flex-1 flex flex-col">
      <div class="space-y-2" :class="{
          'flex-1 flex flex-col': !isCompareData,
        }">
        <div class="flex-1 flex flex-col">
          <NuxtLink :to="redirectTo" class="block text-sm flex-1 relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            {{ diamond?.name }}
            <span class="sr-only">, {{ priceSrText }}</span>
          </NuxtLink>
          <div class="mt-1.5 flex gap-1 items-center justify-center" v-if="getValidAttributes">
            <ul
              class="flex list-outside justify-center items-center text-xxs sm:text-[0.6875rem] leading-none" aria-label="Diamond grades">
              <li class="first:list-none list-disc first:pl-0 pr-5 last:pr-0" v-for="(grade, type) in diamondKeysToShow" :key="type" :aria-label="`${type}: ${diamond?.attributes[grade]}`">
                <span aria-hidden="true">{{ diamond?.attributes[grade] }}</span>
              </li>
            </ul>
          </div>
          <DiscountedPrice :item="diamond" :parentClass="'mt-1.5 text-gray-900 space-x-2'"/>
        </div>
      </div>
      <dl v-if="getValidAttributes && isCompareData" :class="[
          'p-2 border border-gray-200 text-left flex-1',
          isCompareData
            ? 'flex flex-col mt-2.5 text-xxs sm:text-xs font-normal sm:space-y-2 max-h-96 overflow-auto'
            : 'text-[9.5px] sm:text-xs space-y-0.5 absolute overflow-auto inset-0 bg-white z-10 h-[calc(100%-80px)] md:h-[calc(100%-88px)]',
        ]">
        <DiamondAttributes :diamond="diamond" layout="inline"/>
      </dl>
    </div>
  </article>
</template>

<script>
  import { attributeCodes } from "~/utils/searchConstant";
  import Tooltip from "~/components/ui/Tooltip.vue";
  import Heart from "~/components/ui/Heart.vue";
  import CompareButton from "~/components/ui/CompareButton.vue";
  import DiscountedPrice from "~/components/common/DiscountedPrice.vue";
  import DiamondAttributes from "~/components/common/DiamondAttributes.vue";
  import DiamondReel from "~/components/common/DiamondReel.vue";
  import DiamondPoster from "~/components/common/DiamondPoster.vue";
  import Icon from "~/components/common/Icon.vue";
  import { correctUrl } from "~/utils/universalHelper";
  import KEYS from "~/utils/constant.js";

  export default {
    name : 'DiamondGridCard',
    components: { Tooltip, Heart, CompareButton, DiscountedPrice, DiamondAttributes, DiamondReel, DiamondPoster, Icon },
    props: {
      diamond: {
        type: [Object, Number],
      },
      isCompareData: {
        type: Boolean,
        default: false,
      },
      isFilter: {
        type: Boolean,
        default: false,
      },
      nav: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        showAttributes: false,
        diamondKeysToShow: {
          Cut: attributeCodes.cut,
          Color: attributeCodes.color,
          Clarity: attributeCodes.clarity,
        },
        attributeCodes : attributeCodes,
      };
    },
    computed: {
      getLWRatio() {
          const shape = (this.diamond?.attributes?.diamond_shape || this.diamond?.shape || '').toLowerCase();
          if (shape === 'heart') return {};
          const shapeKey = Object.keys(KEYS.DIAMOND_SHAPE_LW_RATIOS).find(key => key === shape);
          const measurements = this.diamond?.attributes?.diamond_lwr;
          if (!measurements || !shapeKey) return {};
          const lwRatio = KEYS.DIAMOND_SHAPE_LW_RATIOS[shapeKey];
          if (!lwRatio) return {};
          const m = parseFloat(measurements);
          if (shape === 'radiant' || shape === 'pear' || shape === 'emerald' || shape === 'cushion') {
              return { aspectRatio: `${lwRatio} / ${m}` };
          }
          return { aspectRatio: `${m} / ${lwRatio}` };
      },
      isMobile(){
        return this.$isMobile;
      },
      isEmerald() {
        const shape = (this.diamond?.attributes?.diamond_shape || this.diamond?.shape || '').toLowerCase();
        return shape === 'emerald';
      },
      priceSrText() {
        const priceData = this.diamond?.price;
        if (!priceData) return '';
        const raw = parseFloat(priceData.raw?.amount) || 0;
        if (priceData.on_sale) {
          const special = parseFloat(priceData.special?.amount) || 0;
          return `Original price ${this.$formatPrice(raw, false)}, discounted price ${this.$formatPrice(special, false)}`;
        }
        return `Price ${this.$formatPrice(raw, false)}`;
      },
      getValidAttributes() {
        return this.diamond?.attributes && Object.keys(this.diamond?.attributes).length > 0;
      },
      getCertificateUrl() {
        return this.diamond?.certificate?.image_url;
      },
      redirectTo() {
        const urlKey = this.diamond && this.diamond.url_key;
        return `${correctUrl(urlKey)}?rfr=search&nav=${this.nav}&type=diamond`;
      },
      getPoster() {
        return this.diamond?.media?.thumbnail_url;
      },
      getImages() {
        if (this.getPoster) return [this.getPoster] || [''];
      },
      getVideoUrl() {
        return this.diamond?.media?.video_url;
      }
    },
    methods: {
      checkDaysAhead(product){
          return product?.shipping?.days > 0 && product?.shipping?.days < 4;
		  },
      getShippingText(product) {
        if (!product?.shipping?.message) return lang.moreThanSevenDays;
        let message = product.shipping.message;
        if (product?.shipping?.estimated_date) {
          message += `, estimated by ${product.shipping.estimated_date}`;
        }
        return message;
      },
      formattedPrice(price) {
        return this.$formatPrice(parseFloat(price) || 0, false);
      },
      toggleAttributes() {
        this.showAttributes = !this.showAttributes; // Toggle visibility Check Comment
        if(this.showAttributes) {
          this.$emit('callParentGTMEvent', [this.diamond]);
        }
      },
      getWishListDataCommon(target, isSetting = false) {
          if (!target) return {};
          let priceData = target?.price;
          let price = priceData?.raw?.amount;
          let discounted_price = 0;
          if (priceData?.on_sale) discounted_price = priceData?.special?.amount;
          return {
            name: `${target?.name}`,
            id: `${target?.id}`,
            attribute_family_code: `${target?.attribute_family?.code ?? 'certified_diamond'}`,
            sku: `${target?.sku}`,
            url_key: target?.url_key,
            images: this.getImages,
            price,
            discounted_price,
            attributes : target?.attributes,
            ...(isSetting ? { parent_id: target?.id } : {})	
          };
        },
    },
  };
</script>
