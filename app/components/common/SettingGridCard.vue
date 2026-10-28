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

<script setup>
import Tooltip from "~/components/ui/Tooltip.vue";
import Heart from "~/components/ui/Heart.vue";
import Icon from "~/components/common/Icon.vue";
import SettingCardImage from "~/components/common/SettingCardImage.vue";
import SettingDropDown from "~/components/common/SettingDropDown.vue";
import DiscountedPrice from "~/components/common/DiscountedPrice.vue";
import { correctUrl, cleanPostfix } from "~/utils/universalHelper";
import { loadScript, MODEL_VIEWER_SRC } from "~/utils/loadScript.js";

const props = defineProps({
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
});

const emit = defineEmits(['setDefaultVariant', 'callParentGTMEvent']);

const store = useMainStore();
const route = useRoute();

const modelViewer = ref(null);

const selectedCode = ref("");
const selectedMetals = ref([]);
const selectedPrice = ref(null);
const selectedSort = ref(null);
const selectedSortDir = ref(null);
const updateSlickCarousel = ref(0);
const images = ref([]);
const onSaleVariants = ref([]);
const selectedVariant = ref(null);

const isSaleGridView = computed(() => cleanPostfix(route.params?.postfix?.toLowerCase()) === 'sale' || route.params?.postfix?.toLowerCase() === 'sale');
const getItemVariants = computed(() => {
  let variantList = props.setting?.variants ?? [];
  // Filter by sale
  if(isSaleGridView.value) {
    onSaleVariants.value = variantList.filter((v) => v.price.on_sale);
    if(onSaleVariants.value && onSaleVariants.value.length){
      variantList = onSaleVariants.value;
    }
  }
  return variantList;
});
const getValidMetalVariants = computed(() => {
  const variants = getItemVariants.value;
  const hasVariants = Array.isArray(variants) && variants.length > 0;
  if (!hasVariants) return null;

  const minPrice = !isNaN(Number(selectedPrice.value?.min)) ? selectedPrice.value?.min : 0;
  const maxPrice = !isNaN(Number(selectedPrice.value?.max)) ? selectedPrice.value?.max : Infinity;
  const shapeLower = selectedCode.value?.toLowerCase();
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
  // Select the lowest priced variant
  let finalArr = sortArrByPrice?.sort((a, b) => {
    const priceA = a.price.special?.amount ?? a.price.raw.amount;
    const priceB = b.price.special?.amount ?? b.price.raw.amount;
    return priceA - priceB;
  });

  return getUniqueMetals(finalArr) ?? finalArr;
});
const selectedVariantValue = computed(() => {
  const variants = getValidMetalVariants.value;
  if(!variants?.length) return null;
  const selectedMetalIds = selectedMetals.value?.map(id => String(id).toLowerCase()) || [];
  const searchColor = selectedSort.value == 'price' ? null : props.setting?.search_color?.toLowerCase();

  if (selectedVariant.value) {
    return selectedVariant.value;
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
});
const isOnSale = computed(() => selectedVariantValue.value ? selectedVariantValue.value?.price?.on_sale : props.setting?.price?.on_sale);
const getImages = computed(() => {
  const { images = {} } = selectedVariantValue.value ?? props.setting?.media ?? {};
  return [images.primary_url, images.hover_url].filter(Boolean);
});
const checkGLBPresent = computed(() => selectedVariantValue.value?.images?.glb_url ?? props.setting?.media?.glb_url);
const redirectTo = computed(() => {
  let basePath = `${correctUrl(props.setting?.url_key)}`;
  const params = new URLSearchParams();
  if (selectedVariantValue.value?.sku) {
    params.set("sku", selectedVariantValue.value.sku);
  }
  params.set("rfr", "search");
  params.set("nav", transformRoute());
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
});
const checkIfBanner = computed(() => props.setting?.type && props.setting?.link);

function getWishListDataCommon(target, isSetting = false) {
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
    images: getImages.value,
    price,
    discounted_price,
    attributes : target?.attributes,
    ...(isSetting ? { parent_id: target?.id } : {})
  };
}
function assignData(filters = null){
  let filterData = filters ?? store.getFilters;
  if(filterData){
    let data = filterData["center_stone_shape"] ?? null;
    let materialData = filterData["material_variation"] ?? null;
    let priceData = filterData["price"] ?? null;
    let sortData = filterData["sort_column"] ?? null;
    let sortDir = filterData["sort_direction"] ?? null;
    if (data?.length) selectedCode.value = data[0]?.code?.toLowerCase();
    if (materialData?.length) selectedMetals.value = materialData?.map((m) => m?.label);
    if (sortData) selectedSort.value = sortData;
    if (sortDir) selectedSortDir.value = sortDir;
    if(priceData?.length){
      let priceObj = priceData[0]?.value;
      try{
        selectedPrice.value = JSON.parse(priceObj);
      }catch(e){
        selectedPrice.value = priceObj;
      }
    }
  }
}
function assignVariantData(variant) {
  selectedVariant.value = variant;
  if(variant?.sku) {
    emit('setDefaultVariant', {sku : props.setting?.sku, variant});
  }
  let setting = JSON.parse(JSON.stringify(props.setting));
  setting['selectedVariant'] = variant;
  emit('callParentGTMEvent', [setting]);
}
function getUniqueMetals(arr) {
  const uniqueMetals = [...new Set(arr.map(item => item.metal_type))];

  return uniqueMetals.map(metal => {
    const items = arr.filter(item => item.metal_type === metal);

    return items.reduce((prev, current) => {
      const prevAmount = prev.price.special?.amount ?? prev.price.raw.amount;
      const currAmount = current.price.special?.amount ?? current.price.raw.amount;
      return prevAmount < currAmount ? prev : current;
    }, items[0]);
  });
}
function transformRoute() {
  const segments = route.path.split("/").filter(Boolean);
  if (segments.length > 1 && segments[1] === "search") {
    if (segments[0] == "engagement-rings") segments[0] = "rings";
    return segments[2] ? `${segments[0]}-${segments[2]}` : `${segments[0]}`;
  }
  return null;
}
function isActive(iconName) {
  return (iconName && iconName?.toLowerCase() == selectedVariantValue.value.shape?.toLowerCase());
}
function handleMouseEnter() {
  // Optional: pause poster or start interaction
  const viewer = modelViewer.value;
  if (viewer) {
    viewer.dismissPoster(); // Removes the poster and shows the model
  }
}
function handleMouseLeave() {
  const viewer = modelViewer.value;
  if (viewer) {
    viewer.showPoster(); // Shows the poster again on mouse out
  }
}

// Restore the variant the shopper picked before leaving the list. This must run before the immediate watcher below:
// that watcher emits setDefaultVariant, which would overwrite the saved sku in the parent with the default variant.
if (props.selectedVariants && props.selectedVariants?.[props.setting?.sku]) {
  selectedVariant.value = getItemVariants.value.find(variant => variant?.sku == props.selectedVariants?.[props.setting?.sku]) ?? null;
}

// Immediate watchers run during setup (same as the Options API `created` phase)
watch(() => store.filterCount, () => {
  assignData();
}, { deep: true, immediate: true });

watch(selectedCode, () => {
  assignVariantData(selectedVariantValue.value);
}, { deep: true, immediate: true });

onMounted(() => {
  assignData(props.filterData);
});
</script>

// <model-viewer> is only needed by cards that have a 3D model
watch(checkGLBPresent, (glb) => {
  if (glb && import.meta.client) loadScript(MODEL_VIEWER_SRC, { module: true }).catch(() => {});
}, { immediate: true });
