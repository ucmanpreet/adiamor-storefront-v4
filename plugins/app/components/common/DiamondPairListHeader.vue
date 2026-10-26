<template>
  <div class="flex items-center w-full">
    <div class="flex items-center gap-2 p-1 sm:p-2 whitespace-nowrap"
      :class="['w-12 sm:w-32', { 'opacity-40': getInStockKey == false }]"
      :title="getInStockKey == false ? 'Out of stock' : ''">
      <div class="size-6 flex items-center relative">
        <Icon v-if="getInStockKey == false" name="stock-out" class="flex-none w-full h-full text-gray-400" />
        <Icon v-else :name="getShapeName" class="flex-none w-full h-full rounded-md" />
      </div>
      <p class="hidden sm:inline-block capitalize">{{ getShapeName }}</p>
    </div>
    <template v-for="column in sortColumns">
      <div :class="[
        column.className,
        'p-1 sm:p-2 whitespace-nowrap',
        {
          'opacity-40': getInStockKey == false,
          'hidden sm:inline-flex': !column.mobile,
        },
      ]" :title="getInStockKey == false ? 'Out of stock' : ''" v-if="column.label && column.key != 'shape'"
        :key="column.label">
        <div v-if="column.key == 'price'">
          <div class="line-through text-gray-400 text-[0.8125rem]" v-if="showStrikeThroughPrice(product)">
            {{
              formattedPrice(
                showStrikeThroughPrice(product)
              )
            }}
          </div>
          <div class="text-xs sm:text-sm" :class="{
            'text-black': showStrikeThroughPrice(
              product
            ),
          }" v-if="item?.price">
            {{ formattedPrice(fetchPriceData(product)) }}
          </div>
        </div>
        <div v-else class="text-xs sm:text-sm">
          {{ getlableVlaue(item, column.key, false, true) }}
          <div v-if="column.key != diamondCaratCode">
            {{ getlableVlaue(product?.diamond2, column.key, false, true) }}
          </div>
        </div>
      </div>
    </template>
    <div class="p-2 whitespace-nowrap flex justify-end gap-4 items-center relative z-10 w-auto xl:w-[182px] flex-auto">
      <button
        type="button"
        colorType="link"
        class="capitalize text-primary"
        :aria-label="getPairAriaLabel"
        @click.stop="redirectTo(item)"
      >
        <div class="flex gap-2 items-center" aria-hidden="true">
          <span class="text-xs sm:text-sm capitalize">{{ lang.viewDetails }}</span>
          <Icon name="certified_diamond_pair" class="w-5 h-5 hidden sm:inline-block" />
        </div>
      </button>
    </div>
  </div>
</template>
<script>
import {
  diamondSortColumns,
  diamondAttributeToShow,
  trimmedDiamondValues
} from "@/utils/searchConstant.js";
import lang from "~/utils/commonLocale.js";
import Icon from "~/components/common/Icon.vue";
import { showStrikeThroughPrice, fetchPriceData, correctUrl } from "~/utils/universalHelper.js";


export default {
  props: {
    product: {
      type: [Object, Number, Array],
    },
  },
  components: { Icon },
  data() {
    return {
      filterType: "",
      showBox: false,
      sortColumns: diamondSortColumns ?? [],
      allowedDiamondKeys: diamondAttributeToShow ?? [],
      item: null,
      diamondCaratCode: 'diamond_carat_weight',
      lang
    };
  },
  computed: {
    getShipSoon() {
      return (this.product && this.product?.sku) ? this.product.ship_soon : this.item?.ship_soon;
    },
    getInStockKey() {
      return this.product?.pair_in_stock;
    },

    getShapeName() {
      return this.product?.pair_shape.toLowerCase() || 'round';
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
    isMobile() {
      return this.$isMobile;
    },
    getPairAriaLabel() {
      const shape = this.getShapeName;
      const ctTw = this.product?.pair_total_carat_weight || 'N/A';

      const d1 = this.item;
      const d2 = this.product?.diamond2;

      const getAttr = (diamond, code) => this.getlableVlaue(diamond, code, true);

      const d1Cut = getAttr(d1, 'diamond_cut_grade');
      const d1Color = getAttr(d1, 'diamond_color_grade');
      const d1Clarity = getAttr(d1, 'diamond_clarity_grade');

      const d2Cut = getAttr(d2, 'diamond_cut_grade');
      const d2Color = getAttr(d2, 'diamond_color_grade');
      const d2Clarity = getAttr(d2, 'diamond_clarity_grade');

      const originalPrice = this.showStrikeThroughPrice(this.product);
      const finalPrice = this.fetchPriceData(this.product);
      const priceText = originalPrice
        ? `Original price ${this.formattedPrice(originalPrice)}, Discounted price ${this.formattedPrice(finalPrice)}.`
        : `Price ${this.formattedPrice(finalPrice)}.`;

      return [
        `View details. Shape: ${shape}.`,
        `Total carat weight: ${ctTw}.`,
        priceText,
        `Diamond 1 — Cut: ${d1Cut}, Color: ${d1Color}, Clarity: ${d1Clarity}.`,
        `Diamond 2 — Cut: ${d2Cut}, Color: ${d2Color}, Clarity: ${d2Clarity}.`,
      ].join(' ');
    },
  },
  mounted() {
    this.filterType = this.$route.params?.prefix?.toLowerCase();
    this.item = this.product?.diamond1;
  },
  methods: {
    showStrikeThroughPrice: item => showStrikeThroughPrice(item),
    fetchPriceData: item => fetchPriceData(item),
    getlableVlaue(item, label, getFullName = false, isSecondCombine = false) {
      // Helper function to get value from an item by label
      if (!item || !item.attributes) return "N/A";

      if(isSecondCombine && label == this.diamondCaratCode) {
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
    formattedPrice(price) {
      if (price === 0) return this.$formatPrice(0);
      if (price) return this.$formatPrice(parseFloat(price), false);
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
  },
};
</script>