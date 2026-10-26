<template>
    <div class="relative h-full flex flex-col" v-if="setting?.sku" :id="correctUrl(setting?.url_key)">
      <!-- Wishlist Button -->
      <div class="absolute top-0 w-full flex item-center p-2">
        <div class="flex gap-2 sm:gap-3 ml-auto">
          <Tooltip :text="'Wishlist'">
            <Heart :item="getWishListDataCommon(setting, true)"
            :selectedVariant="getWishListDataCommon(selectedVariantValue)"
            class="flex-none"
            :key="selectedVariantValue?.sku || setting?.sku"
            aria-label="Add to wishlist"/>
          </Tooltip>
        </div>
      </div>

      <!-- Product Image / 3D Model -->
      <div class="aspect-square overflow-hidden relative border border-gray-200 v-slider-settings shadow-sm">
        <!-- 3D Viewer -->
        <div class="w-full h-full cursor-pointer overflow-hidden relative" v-if="checkGLBPresent">
          <model-viewer
            ref="modelViewer"
            id="primary-model-viewer"
            camera-controls
            touch-action="pan-y"
            :src="checkGLBPresent"
            :poster="getImages[0]"
            tone-mapping="aces"
            shadow-intensity="1"
            :alt="selectedVariantValue?.name || setting?.name"
            :key="selectedVariantValue?.sku"
            class="w-full h-full object-cover"
            style="cursor: default"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            role="img"
            :aria-label="selectedVariantValue?.name || setting?.name">
          </model-viewer>
          <Icon name="view-360" class="w-6 h-6 text-sm absolute right-1.5 bottom-1.5 text-gray-500" aria-hidden="true" />
        </div>

        <!-- Image Fallback -->
        <div class="w-full h-full" v-else>
          <SettingCardImage type="setting" :item="setting" :images="getImages" :link="redirectTo" :key="setting.sku" />
        </div>
      </div>

      <!-- Product Info -->
      <div class="mt-2.5 flex flex-col">
            <NuxtLink
              :to="redirectTo"
              class="block font-medium text-sm sm:text-base flex-1 relative cursor-pointer"
              tabindex="0"
              :aria-label="`View details for ${setting?.name}`"
            >
              {{ setting?.name }}
            </NuxtLink>

            <!-- Variant Dropdown -->
            <SettingDropDown
              v-if="getValidMetalVariants?.length"
              :selectedVariantValue="selectedVariantValue"
              :getValidMetalVariants="getValidMetalVariants"
              @change="assignVariantData($event)" :key="setting?.sku"
            />
            <DiscountedPrice :item="setting" v-else/>
      </div>
    </div>
</template>

<script>
import lang from "~/utils/commonLocale.js";
import Tooltip from "~/components/ui/Tooltip.vue";
import Heart from "~/components/ui/Heart.vue";
import Icon from "~/components/common/Icon.vue";
import SettingCardImage from "~/components/common/SettingCardImage.vue";
import SettingDropDown from "~/components/common/SettingDropDown.vue";
import DiscountedPrice from "~/components/common/DiscountedPrice.vue";
import { correctUrl, cleanPostfix } from "~/utils/universalHelper";

export default {
  name : 'SettingGridCard',
  components: { Tooltip, Heart, Icon, SettingCardImage, SettingDropDown, DiscountedPrice },
  props: {
    setting: {
      type: [Object, Array],
    },
    selectedVariants: {
      type: [ Object, Array ],
      default: () => ({}),
    },
    filterData: {
      type: [ Object, Array ],
      default: () => ({}),
    },
  },
  data() {
    return {
      selectedCode: "",
      selectedMetals: [],
      selectedPrice: null,
      selectedSort: null,
      selectedSortDir: null,
      updateSlickCarousel: 0,
      images: [],
      lang,
      onSaleVariants: [],
      selectedVariant: null,
      // isDropdownOpen: false,
    };
  },
  mounted() {    
    if (this.selectedVariants && this.selectedVariants?.[this.setting?.sku]) {
      this.selectedVariant = this.getItemVariants.find(variant => variant?.sku == this.selectedVariants?.[this.setting?.sku]);
    }
    this.assignData(this.filterData);
  },
  computed: {
    selectedVariantValue() {
      const variants = this.getValidMetalVariants;
      if(!variants?.length) return null;
      const selectedMetalIds = this.selectedMetals?.map(id => String(id).toLowerCase()) || [];
      const searchColor = this.selectedSort == 'price' ? null : this.setting?.search_color?.toLowerCase();

      if (this.selectedVariant) {
        return this.selectedVariant;
      }

      let filteredVariants = variants;

      // Apply filter if metal IDs or search color is present
      if (selectedMetalIds.length || searchColor) {
        filteredVariants = variants.filter(variant => {
          const metalType = String(variant.metal_type).toLowerCase();
          return selectedMetalIds.length
            ? selectedMetalIds.includes(metalType)
            : metalType.includes(searchColor);
        });        
      }
      if(!filteredVariants?.length) return variants[0];
      return filteredVariants[0] || variants[0];
    },    
    isSaleGridView() {
      return cleanPostfix(this.$route.params?.postfix?.toLowerCase()) === 'sale' || this.$route.params?.postfix?.toLowerCase() === 'sale';
    },
    isOnSale() {
      return this.selectedVariantValue ? this.selectedVariantValue?.price?.on_sale : this.setting?.price?.on_sale; 
    },
    getValidMetalVariants() {
      const variants = this.getItemVariants;
      const hasVariants = Array.isArray(variants) && variants.length > 0;
      if (!hasVariants) return null;
      
      const minPrice = !isNaN(Number(this.selectedPrice?.min)) ? this.selectedPrice?.min : 0;
      const maxPrice = !isNaN(Number(this.selectedPrice?.max)) ? this.selectedPrice?.max : Infinity;
      const shapeLower = this.selectedCode?.toLowerCase();
      const withoutUnsetVariants = variants.filter(v => v.shape?.toLowerCase() !== 'unset');

      let filteredVariants = withoutUnsetVariants;

      // Filter by shape, excluding 'unset'
      if (shapeLower) {
        filteredVariants = withoutUnsetVariants.filter((v) => v.shape?.toLowerCase() === shapeLower);
      }

      // Fallback to all variants if shape filter yields no results
      if (!filteredVariants.length) filteredVariants = withoutUnsetVariants;

      // Filter by price and optionally by metal type
      filteredVariants = filteredVariants.filter((v) => {
        const price = v.price.special?.amount ?? v.price.raw.amount;        

        // Price range check
        if (price < minPrice || price > maxPrice) return false;

        return true;
      });

      // Final fallback if no valid variants remain after filtering
      if (!filteredVariants.length) filteredVariants = withoutUnsetVariants;

      let sortArrByPrice = filteredVariants ?? withoutUnsetVariants ?? [];
      // const sortDir = this.selectedSortDir?.toLowerCase();
      // Select the lowest priced variant
      let finalArr = sortArrByPrice?.sort((a, b) => {
        const priceA = a.price.special?.amount ?? a.price.raw.amount;
        const priceB = b.price.special?.amount ?? b.price.raw.amount;
        // return sortDir === 'desc' ? priceB - priceA : priceA - priceB;
        return priceA - priceB;
      });

      return this.getUniqueMetals(finalArr) ?? finalArr;
    },
    getImages() {
      const { images = {} } = this.selectedVariantValue ?? this.setting?.media ?? {};
      return [images.primary_url, images.hover_url].filter(Boolean);
    },
    checkGLBPresent() {
      return this.selectedVariantValue?.images?.glb_url ?? this.setting?.media?.glb_url;
    },
    redirectTo() {
      let basePath = `${correctUrl(this.setting?.url_key)}`;
      const params = new URLSearchParams();
      if (this.selectedVariantValue?.sku) {
        params.set("sku", this.selectedVariantValue.sku);
      }
      params.set("rfr", "search");
      params.set("nav", this.transformRoute());
      const queryString = params.toString();
      return queryString ? `${basePath}?${queryString}` : basePath;
    },
    getItemVariants() {
      let variantList = this.setting?.variants ?? [];
      // Filter by sale
      if(this.isSaleGridView) {
        this.onSaleVariants = variantList.filter((v) => v.price.on_sale);
        if(this.onSaleVariants && this.onSaleVariants.length){
          variantList = this.onSaleVariants;
        }
      }
      return variantList;
    },
    checkIfBanner(){
      return this.setting?.type && this.setting?.link;
    }
  },
  methods: {
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
    correctUrl : item => correctUrl(item),
    assignData(filters = null){
      let filterData = filters ?? this.$store.getters.getFilters;
        if(filterData){
          let data = filterData["center_stone_shape"] ?? null;
          let materialData = filterData["material_variation"] ?? null;
          let priceData = filterData["price"] ?? null;
          let sortData = filterData["sort_column"] ?? null;
          let sortDir = filterData["sort_direction"] ?? null;
          if (data?.length) this.selectedCode = data[0]?.code?.toLowerCase();
          if (materialData?.length) this.selectedMetals = materialData?.map((m) => m?.label);
          if (sortData) this.selectedSort = sortData;
          if (sortDir) this.selectedSortDir = sortDir;
          if(priceData?.length){
            let priceObj = priceData[0]?.value;
            try{
              this.selectedPrice = JSON.parse(priceObj);
            }catch(e){
              this.selectedPrice = priceObj;
            }
          }
        }
    },
    assignVariantData(variant) {
      this.selectedVariant = variant;
      if(variant?.sku) {
        this.$emit('setDefaultVariant', {sku : this.setting?.sku, variant});  
      }
      let setting = JSON.parse(JSON.stringify(this.setting));
      setting['selectedVariant'] = variant;
      this.$emit('callParentGTMEvent', [setting]);
    },
    getUniqueMetals(arr) {
      const uniqueMetals = [...new Set(arr.map(item => item.metal_type))];

      return uniqueMetals.map(metal => {
        const items = arr.filter(item => item.metal_type === metal);
        
        return items.reduce((prev, current) => {
          const prevAmount = prev.price.special?.amount ?? prev.price.raw.amount;
          const currAmount = current.price.special?.amount ?? current.price.raw.amount;
          return prevAmount < currAmount ? prev : current;
        }, items[0]);
      });
    },
    transformRoute() {
      const segments = this.$route.path.split("/").filter(Boolean);
      if (segments.length > 1 && segments[1] === "search") {
        if (segments[0] == "engagement-rings") segments[0] = "rings";
        return segments[2] ? `${segments[0]}-${segments[2]}` : `${segments[0]}`;
      }
      return null;
    },
    isActive(iconName) {
      return (iconName && iconName?.toLowerCase() == this.selectedVariantValue.shape?.toLowerCase());
    },
    handleMouseEnter() {
      // Optional: pause poster or start interaction
      const viewer = this.$refs.modelViewer;
      if (viewer) {
        viewer.dismissPoster(); // Removes the poster and shows the model
      }
    },
    handleMouseLeave() {
      const viewer = this.$refs.modelViewer;
      if (viewer) {
        viewer.showPoster(); // Shows the poster again on mouse out
      }
    },
  },
  watch: {
    "$store.state.filterCount": {
      handler(newValue, oldValue) {
        this.assignData();
      },
      deep: true,
      immediate: true,
    },
    'selectedCode': {
      handler(newValue, oldValue) {
        this.assignVariantData(this.selectedVariantValue);
      },
      deep: true,
      immediate: true
    }
  },
};
</script>
