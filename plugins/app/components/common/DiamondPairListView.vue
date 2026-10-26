<template>
  <div class="flex flex-col w-full cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-primary/7 relative min-w-full" v-if="item">
    <div
      class="py-4 flex group-hover:text-gray-black w-full gap-5 bg-white">
      <div
        class="hidden aspect-square w-36 sm:w-52 sm:flex flex-col items-center justify-center bg-gray-50 relative border border-gray-200 p-2 space-y-3"
      >
        <MediaImage :src="getImages"
          alt="Diamond Pair image"
          className="w-full h-full bg-gray-200 object-cover group-hover:opacity-75" />
        <p
          v-if="getInStockKey == false"
          class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10"
        >
          Out of Stock
        </p>
      </div>
      <div
        class="flex flex-col flex-1 gap-y-5"
        v-if="item.attributes && item.attributes.length"
      >
        <dl
          class="grid grid-cols-3 xl:grid-cols-5 grid-flow-dense flex-1 gap-3 sm:gap-y-5 sm:gap-x-6 text-xxs sm:text-xs font-normal"
        >
          <div class="row-span-2 col-span-full sm:hidden flex items-center gap-4">
            <div
              class="aspect-square w-24 h-24 flex items-center justify-center bg-gray-50 relative border border-gray-200 p-2"
            >
              <MediaImage :src="getImages"
                alt="Diamond Pair image"
                className="w-full h-full bg-gray-200 object-cover group-hover:opacity-75" />
              <p
                v-if="getInStockKey == false"
                class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10"
              >
                Out of Stock
              </p>
            </div>
          </div>
          <div v-for="(el, index) in getAllowedAttributes" :key="index">
            <dt>{{ el.name }} :</dt>
            <dd class="font-light">
              <span class="block">{{ el.value }}</span>
              <span class="block">{{
                getlableVlaue(product.diamond2, el.code, true)
              }}</span>
            </dd>
          </div>
          <div>
            <dt>Est. Ship Date :</dt>
            <dd class="font-light">
              {{ getShippingText(product) }}
            </dd>
          </div>
          <div
            class="sm:hidden col-start-1 col-span-3 flex items-center justify-between gap-12 pb-2"
          >
          <Tooltip :searchGrid="true" class="sm:hidden flex items-center gap-1 py-1 px-2 sm:text-xs rounded-full border border-custom-green text-custom-green bg-custom-green/20 uppercase" :text="getShippingText(product)" v-if="getInStockKey">
            <Icon
              name="truck"
              class="w-5 h-5 cursor-pointer"
              :class="checkDaysAhead(product) ? 'text-custom-green' : 'text-primary'"
            />
            <span class="inline-flex ml-1">Ships Soon</span>
          </Tooltip>
          <div class="flex items-center justify-center gap-4">
            <CompareButton :item="product" :isPair="true" class="flex items-center sm:!hidden" :key="item.sku">
              <span class="inline-flex ml-1 uppercase">Compare</span>
            </CompareButton>
            <CreateBundle :item="product" type="diamond-pair" class="flex items-center sm:!hidden gap-2 py-1 px-6 border border-gray-200 text-primary uppercase" :key="item.sku" :disabled="!getInStockKey">
              <span class="inline-flex ml-1 uppercase"> Select </span>
            </CreateBundle>
          </div>
          </div>
        </dl>
        <div class="hidden sm:flex justify-end col-span-5 badge">
          <Tooltip :searchGrid="true" class="hidden items-center gap-2 py-1 px-2 text-xs rounded-full border border-custom-green text-custom-green bg-custom-green/20 uppercase" :text="getShippingText(product)" v-if="getInStockKey">
            <Icon
              name="truck"
              class="w-5 h-5 cursor-pointer"
              :class="checkDaysAhead(product) ? 'text-custom-green' : 'text-primary'"
            />
            <span>Ships Soon</span>
          </Tooltip>
        </div>
        <div class="hidden sm:flex gap-4 items-center justify-end">
          <CompareButton v-if="!isMobile" :item="product" class="items-center hidden sm:inline-flex gap-2 py-1 px-6 border border-gray-200 text-primary uppercase" :key="item.sku" :isPair="true">
            <span class="inline-flex ml-1 uppercase">Compare</span>
          </CompareButton>
          <CreateBundle :item="product" type="diamond-pair" class="items-center hidden sm:inline-flex gap-2 py-1 px-6 bg-primary text-white uppercase" :key="item.sku" :disabled="!getInStockKey">
           <span class="inline-flex ml-1 uppercase"> Select </span>
          </CreateBundle>
        </div>
      </div>
      <div v-else class="flex-1 flex items-center justify-center">
        <p>No Data Found</p>
      </div>
    </div>
  </div>
</template>
<script>
import {  diamondAttributeToShow,   trimmedDiamondValues } from "@/utils/searchConstant.js";
import Tooltip from "../ui/Tooltip.vue";
import Icon from "~/components/common/Icon.vue";
import CompareButton from "../ui/CompareButton.vue";
import CreateBundle from "../common/CreateBundle.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { correctUrl } from "~/utils/universalHelper.js";

export default {
  props: {
    product: {
      type: [Object, Number, Array],
    },
  },
  components: { Tooltip, Icon, CompareButton, CreateBundle, MediaImage },
  data() {
    return {
      filterType: "",
      showBox: false,
      allowedDiamondKeys: diamondAttributeToShow ?? [],
      item: null,
    };
  },
  computed: {
    getShipSoon() {
      return (this.product && this.product?.sku) ? this.product.ship_soon : this.item?.ship_soon;
    },
    getInStockKey() {
      return this.product?.pair_in_stock;
    },

    getAllowedAttributes() {
      if (this.item?.attributes?.length) {
        return this.item.attributes.filter((attr) =>
          this.allowedDiamondKeys.includes(attr.code)
        );
      }
    },
    getCertificateUrl() {
      if (
        this.item &&
        Array.isArray(this.item.images) &&
        this.item.images.length > 0
      ) {
        const certificateImage = (this.item.images || []).find((image) => image.type === "certificates");
        if (certificateImage) {
          return certificateImage.path;
        }
      }
      return "";
    },
    getImages() {
      if (this.product?.images) {
        let images = this.product.images;
        if (images && images?.small) {
          return images.small;
        }
      }
      if (
        this.item &&
        Array.isArray(this.item.images) &&
        this.item.images.length > 0
      ) {
        const img = (this.item.images || []).find((image) => image.type === "images");
        if (img) {
          return img.path;
        }
      }
      return "";
    },
    getButtonLabel() {
      if (this.filterType)
        return this.filterType == "diamonds"
          ? "Add to Setting"
          : `Select this ${this.filterType.split("").slice(0, -1).join("")}`;
      return `Select this setting`;
    },
    isMobile(){
      return this.$isMobile;
    }
  },
  mounted() {
    this.filterType = this.$route.params?.prefix?.toLowerCase();
    this.item = this.product?.diamond1;
  },
  methods: {
    checkDaysAhead(product){
      return product?.shipping?.days > 0 && product?.shipping?.days < 4;
		},
    getShippingText(product) {
      return product?.shipping?.message ? product.shipping?.message : lang.moreThanSevenDays;
    },
    getlableVlaue(item, label, getFullName = false, isSecondCombine = false) {
      // Helper function to get value from an item by label
      if (!item || !item.attributes) return "N/A";

      if(this.isPairData && isSecondCombine && label == this.diamondCaratCode) {
        return this.product?.pair_total_carat_weight;
      }

      if(item.attributes && Array.isArray(item.attributes)) {
        if (Array.isArray(label)) {
          const values = label.map((lab) => {
            let el = item.attributes?.find((el) => el.code === lab);
            if (el == null || el === "") return "N/A";
            return el && trimmedDiamondValues[el.value] && !getFullName
              ? trimmedDiamondValues[el.value]
              : el.value;
          });
          return values.join(" / ");
        } else {
          let el = item.attributes?.find((el) => el.code === label);
          if (el == null || el === "") return "N/A";
          return el && trimmedDiamondValues[el.value] && !getFullName
            ? trimmedDiamondValues[el.value]
            : el.value;
        }
      }
      return '';
    },
    setParentData() {
      this.$emit("showImageModal", false);
    },
    transformRoute() {
      const segments = this.$route.path.split("/").filter(Boolean);
      if (segments.length > 1 && segments[1] === "search") {
        return segments[2] ? `${segments[0]}-${segments[2]}` : `${segments[0]}`;
      }
      return null;
    },
    redirectTo() {
      let basePath = `${correctUrl(this.product?.pair_url_key)}`;
      const params = new URLSearchParams();
      params.set("rfr", "search");
      params.set("nav", this.transformRoute());
      const queryString = params.toString();
      const separator = basePath.includes('?') ? '&' : '?';
      const path = queryString ? `${basePath}${separator}${queryString}` : basePath;
      this.$router.push(path);
    },
    toggleBox() {
      this.showBox = !this.showBox;
    },
  },
};
</script>