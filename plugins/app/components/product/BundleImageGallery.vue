<!-- BundleImageViewer.vue -->
<template>
  <div class="flex-1">
    <div class="aspect-h-1 aspect-w-1 w-full relative lg:min-h-[38.813rem]">

      <div class="h-full w-full">
        <ImagePreview
          :image="getDataByPosition('front')"
          ref="viewerFront"
          altLabel="Front preview product image"
          :key="getDynamicKey('front')"
        />
      </div>

      <!-- Favorite / Heart (mobile only) -->
      <div
        class="absolute right-0 top-0 flex items-center gap-2 px-6 ml-auto mt-3 z-20 sm:hidden"
        v-if="setting?.sku && diamond?.sku"
      >
        <Heart
          :item="getBundleData"
          :selectedVariant="{}"
          :storeEvent="categoryEvent"
          :size="`w-5 h-5`"
        />
      </div>
    </div>

    <!-- Expert Advice -->
    <ExpertAdviceDesktop />
  </div>
</template>

<script>
import ImagePreview from '~/components/product/ImagePreview.vue';
import Heart from '~/components/ui/Heart.vue';
import ExpertAdviceDesktop from '~/components/common/ExpertAdviceDesktop.vue';
import { getProductImages } from '~/utils/universalHelper.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name : 'BundleImageGallery',
    components: {
        ImagePreview,
        Heart,
        ExpertAdviceDesktop
    },
    props: {
        product: {
            type: Object,
            default: {},
        },
        categoryEvent: Object,
        bundleItem: {
            type: [Object, Array],
            default: {},
        },
    },

  data() {
    return {
      setting: {},
      diamond: {},
    };
  },

  mounted() {
    this.setting = this.bundleItem?.setting || {};
    this.diamond = this.bundleItem?.diamond || {};
  },
  methods: {
     getDynamicKey(view) {
      return `${this.product?.sku}_${view}}`;
    },
    getDataByPosition(view, isCheckExtension = false) {
      return getProductImages(view, isCheckExtension, this.product);
    },
  },

  computed: {
    
    getBundleData() {
      const bundleData = this.bundleItem;
      const url_key = STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', this.setting?.sku).replace(':diamond', this.diamond?.sku);
      return {
        name: `${this.setting?.name} with ${this.diamond?.name}`,
        attribute_family_code: `${this.setting?.attribute_family_code}`,
        sku: `${this.setting?.sku}-${this.diamond?.sku}`,
        url_key,
        images: this.setting?.images,
        price: bundleData?.price,
        discounted_price: bundleData?.discounted_price,
        setting: this.setting,
        diamond: this.diamond,
        type: 'bundle',
      };
    },
  },
};
</script>