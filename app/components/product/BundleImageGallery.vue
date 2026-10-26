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

<script setup>
import ImagePreview from '~/components/product/ImagePreview.vue';
import Heart from '~/components/ui/Heart.vue';
import ExpertAdviceDesktop from '~/components/common/ExpertAdviceDesktop.vue';
import { getProductImages } from '~/utils/universalHelper.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
    categoryEvent: Object,
    bundleItem: {
        type: [Object, Array],
        default: {},
    },
});

const setting = ref({});
const diamond = ref({});

onMounted(() => {
    setting.value = props.bundleItem?.setting || {};
    diamond.value = props.bundleItem?.diamond || {};
});

function getDynamicKey(view) {
    return `${props.product?.sku}_${view}}`;
}

function getDataByPosition(view, isCheckExtension = false) {
    return getProductImages(view, isCheckExtension, props.product);
}

const getBundleData = computed(() => {
    const bundleData = props.bundleItem;
    const url_key = STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', setting.value?.sku).replace(':diamond', diamond.value?.sku);
    return {
        name: `${setting.value?.name} with ${diamond.value?.name}`,
        attribute_family_code: `${setting.value?.attribute_family_code}`,
        sku: `${setting.value?.sku}-${diamond.value?.sku}`,
        url_key,
        images: setting.value?.images,
        price: bundleData?.price,
        discounted_price: bundleData?.discounted_price,
        setting: setting.value,
        diamond: diamond.value,
        type: 'bundle',
    };
});
</script>