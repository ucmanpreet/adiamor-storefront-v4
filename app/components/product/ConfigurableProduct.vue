<template>
  <form v-if="product">
    <div class="mt-5 border-t border-gray-200">
      <template v-if="validProductVariants && validProductVariants.length">
        <!-- Shape & material Variations -->
        <div :class="[
            'relative grid grid-cols-1 mt-4 gap-4',
            { 'sm:grid-cols-2 lg:flex flex-wrap': !caratAndGrowthAvailable }
          ]">
          <template v-for="(superAttr, index1) in product.super_attributes" :key="index1">
<div :class="{'flex-1 min-w-[247px] lg:max-w-sm' : !radioButtonCodes?.includes(superAttr?.code)}"
              v-if="getValidSuperAttrVariants(superAttr)?.length">
            <template v-if="radioButtonCodes?.includes(superAttr?.code)">
              <CaratWeightSelector :attribute="superAttr" :value="attributesData[superAttr?.code]" :caratOptions="getValidSuperAttrVariants(superAttr)" @input="event => updateSelectedVariant(event, superAttr?.code)"/> 
            </template>
            <template v-else>
              <div>
                <DropDownProduct
                  :variants="getValidSuperAttrVariants(superAttr)"
                  :selectedVariant="selectedVariant" :attribute="superAttr"
                  @change="event => updateSelectedVariant(event, superAttr?.code)"
                  :productVariant="validProductVariants" 
                  @updateCount="dropDownCount++"/>
              </div>
            </template>
          </div>
</template>
          <!-- Carat Variation -->
          <div class="flex-1 space-y-1 col-span-full" v-if="product.configurable_variants && setCurrentProductPrice?.length">
            <Dropdown :variants="setCurrentProductPrice" :defaultName="`Variation`" :className="['truncate', dropDownCount == 1 ? 'sm:w-[180px]' : '']"
              :selectedSku="selectedVariant?.sku || product.sku" @option-selected="onVariantSelected" />
          </div>
          <!-- Ring Size -->
          <div class="flex-1 flex flex-col sm:min-w-[247px]" v-if="ringOptions && ringOptions.length">
            <Dropdown class="w-full" :defaultName="`Ring Size`" :variants="formattedRingOptions"
              :selectedSku="selectedRingSize" @option-selected="updateSelectedRingSize" @change="modifyPrice" />
          </div>
          <!-- Prong Style -->
          <div class="flex flex-col flex-1 col-span-full sm:min-w-[247px]" v-if="prongStyleOptions && prongStyleOptions.length">
            <Dropdown class="w-full"
            
              :defaultName="selectedProngStyle?.value ? `Prong Style: ${selectedProngStyle?.value}` : 'Prong Style'"
              :variants="modifiedProngs" :selectedSku="selectedProngStyle?.sku"
              @option-selected="(value) => setProngStyle(value)" />
          </div>
        </div>
      </template>
    </div>
    <ProductPrice :product="product" :selectedVariant="selectedVariant" :priceObject="priceObject" />
    <ProductButtons @clickSubmit="updateModalValues" :product="product" :selectedVariant="selectedVariant" />
  </form>
</template>
<script setup>
import DropDownProduct from '~/components/product/DropDownProduct.vue';
import Dropdown from '~/components/ui/Dropdown.vue';
import ProductPrice from '~/components/product/ProductPrice.vue';
import ProductButtons from '~/components/product/ProductButtons.vue';
import { productRedirection, getCategoryType } from "~/utils/universalHelper.js";
import CaratWeightSelector from "~/components/ui/CaratWeightSelector.vue";
import { STATIC_ROUTES } from '~/utils/staticRoutes.js';

const props = defineProps({
  product: Object,
});
const emit = defineEmits(['update:selectedVariant', 'update:priceObject', 'hitGtmEvent', 'addToCart', 'clicked', 'storeCookie']);

const store = useMainStore();
const bundle = useBundleStore();
const route = useRoute();
const router = useRouter();
const api = useApi();
const { createSwalAlert } = useAlert();
const { $bus, $formatPrice } = useNuxtApp();

const selectedVariant = ref({});
const material_variation = ref('');
const center_stone_shape = ref('');
const selectedRingSize = ref('');
const selectedShape = ref('');
const ringOptions = ref([]);
const priceObject = ref({});
const basePrice = ref('');
const configurableVariants = ref([]);
const selectedProngStyle = ref(null);
const dropDownCount = ref(0);
const shapeData = ref(null);
const attributesData = ref({});
const radioButtonCodes = ref(['carat_variation', 'growth_variation']);

const validProductVariants = computed(() => {
  let validProductVariants = props.product?.variants?.filter(item => item?.is_available);
  return validProductVariants?.sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    return priceA - priceB;
  });
});

const modifiedProngs = computed(() => {
  return selectedVariant.value?.prong_style_options?.map(item => {
    return {
      sku: item?.id, // Using the id as SKU
      name: item?.admin_name, // Label generation logic
    };
  });
});

const getMaterialLabel = computed(() => {
  return props.product?.type == 'configurable' && props.product.super_attributes.length ? props.product.super_attributes[0]?.options.find((item) => item.id == material_variation.value)?.label : "";
});

const getCenterStoneLabel = computed(() => {
  let el = props.product?.type == 'configurable' && props.product.super_attributes.length ? props.product.super_attributes[1]?.options.find((item) => item.id == center_stone_shape.value) : "";
  selectedShape.value = el?.admin_name;
  return el?.admin_name == 'unset' ? null : el?.label;
});

const getFinalPrice = computed(() => {
  if (priceObject.value && priceObject.value.current_price) return priceObject.value.current_price;
  return selectedVariant.value && selectedVariant.value.price ?
    selectedVariant.value.price :
    props.product.price;
});

const getDiscountedPriceRing = computed(() => {
  if (selectedVariant.value?.discounted_price && selectedVariant.value?.discounted_price < selectedVariant.value?.price) {
    return parseFloat(selectedVariant.value.discounted_price);
  }
  if (props.product?.discounted_price && props.product?.discounted_price < props.product?.price) {
    return parseFloat(props.product.discounted_price);
  }
  return null;
});

// Format the ring options to match what the Dropdown expects
const formattedRingOptions = computed(() => {
  return ringOptions.value.map(item => {
    let data = getCalculatedData(item);
    return {
      sku: data?.sku ?? data, // Using the ring size as SKU
      name: item?.label, // Label generation logic
    };
  });
});

const setCurrentProductPrice = computed(() => {
  return [...configurableVariants.value]
    .sort((a, b) => a.price - b.price) // ascending
    .map(item => ({
      ...item,
      name: item.short_description || item.name,
    }));
});

const prongStyleOptions = computed(() => selectedVariant.value?.prong_style_options);

const caratAndGrowthAvailable = computed(() => {
  return props.product.super_attributes?.find(item => radioButtonCodes.value.includes(item.code))?.code;
});

watch(selectedVariant, async () => {
  priceObject.value = {};
  selectedRingSize.value = '';
  if (selectedVariant.value && selectedVariant.value.price) {
    basePrice.value = selectedVariant.value.price;

    const metalLabel = getMaterialLabel.value;
    const shapeLabel = getCenterStoneLabel.value;
    const price = $formatPrice(parseFloat(selectedVariant.value.price), true);
    const parts = [metalLabel, shapeLabel, price].filter(Boolean);
    $bus.emit('aria-announce', `${parts.join(', ')} selected`);

    let indexObjRecentView = {
      id: selectedVariant.value && selectedVariant.value.id ? selectedVariant.value.id : props.product.id,
      sku: selectedVariant.value && selectedVariant.value.sku ? selectedVariant.value.sku : props.product.sku,
      family: props.product.attribute_family_code
    }
    const isEmpty = Object.values(indexObjRecentView).some(x => x == null || x == '' || x == undefined);
    if (isEmpty == false) {
      await useNuxtApp().$indexedDB.addProduct(indexObjRecentView);
    }
    emit('update:selectedVariant', selectedVariant.value);
    emit('update:priceObject', priceObject.value);
    if (selectedVariant.value?.sku) {
      const currentSku = route.query?.sku;
      const newSku = selectedVariant.value.sku;

      if (currentSku !== newSku || !currentSku) {
        router.replace({
          path: route.path,
          query: { ...route.query, sku: newSku }
        });
      }
    }
    if (props.product?.configurable_variants) {
      getConfigurableProductList();
    }
  }
});

watch(() => store.diamondsFilters, (newValue, oldValue) => {
  const val = newValue ?? oldValue;
  if (val && typeof val === 'object' && Object.keys(val).length) {
    const defaultShapeData = val['SHAPE'] ?? null;
    shapeData.value = defaultShapeData?.value ?? null;
  }
}, { deep: true, immediate: true });

function getAlignedData(section, code = null) {
  const menuItems = section?.items ?? section;
  if (!menuItems) return [];

  if (section?.code !== 'shape' && !code) return menuItems;

  if (Array.isArray(shapeData.value)) {
    const sortedMenuItems = shapeData.value
      .map(shape => menuItems.find(item => item.icon === shape.code || item?.admin_name === shape.code))
      .filter(Boolean);

    return sortedMenuItems.length ? sortedMenuItems : menuItems;
  }

  return menuItems;
}

function updateSelectedVariant(item, type = null) {
  if (!item?.id || !type) return;
  if(!prongStyleOptions.value?.length) {
    selectedProngStyle.value = null;
    attributesData.value.prong_style = null;
  }

  // Update selected attribute
  attributesData.value[type] = item?.id;

  // Keep derived states (if still needed elsewhere)
  material_variation.value = attributesData.value?.material_variation ?? material_variation.value;
  center_stone_shape.value = attributesData.value?.center_stone_shape ?? center_stone_shape.value;

  // Find matching variant dynamically
  selectedVariant.value = validProductVariants.value.find(variant => {
    return Object.entries(attributesData.value).every(([key, value]) => {
      // Skip null/undefined selections
      if (value === null || value === undefined) return true;

      return variant?.[key] == value;
    });
  }) || null;

  emit('hitGtmEvent');
}

function setProngStyle(value) {
  let productSku = props.product?.sku;
  if (value?.name) {
    selectedProngStyle.value = value;
    store.setProductAttribute({ [productSku]: { prong_style: selectedProngStyle.value?.name }});
  } else {
    selectedProngStyle.value = null;
    store.setProductAttribute({ [productSku]: { prong_style: null }});
  }
}

// Same behaviour as the old rest-api getRequest(axios, cookies, URL): appends the visitor currency/locale,
// 401 -> session-expired toast + redirect to login, any other failure -> toast and { data: { message, success: false } }.
async function getRequest(URL) {
  let countryData = useCookie('countryData').value;
  (URL.includes('?')) ? URL += `&` : URL += `?`;
  URL += `currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
  try {
    return await api.request('get', URL, { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    if (error.status === 401) {
      createSwalAlert('Session expired. Please log in again.', 'error');
      window.location.href = STATIC_ROUTES.LOGIN;
    } else {
      createSwalAlert(error.message || 'Internal Server Error', 'error');
    }
    return { data: { message: error.message, success: false } };
  }
}

async function getConfigurableProductList() {
  try {
    let url = `/list/carat-variation?product_sku=${selectedVariant.value.sku}&parent_sku=${props.product.sku}`;
    const response = await getRequest(url);
    if (!response) {
      console.log('Internal Server Error', "error");
      return;
    }
    if (response && response.data && response.data.success) {
      configurableVariants.value = response.data.data ?? [];
    }
  } catch (error) {
    console.log('Get Config Variants Product Error' + error);
  }
}

function checkPresentData(code = null) {
  if (code) {
    return props.product && props.product.super_attributes && props.product.super_attributes.length && props.product.super_attributes.find((el) => el.code == code);
  }
}

function modifyPrice() {
  let productSku = props.product?.sku;
  store.setProductAttribute({ [productSku]: { ring_size: selectedRingSize.value != 'Not Sure' && selectedRingSize.value != '' ? selectedRingSize.value : null } });
  if (!selectedRingSize.value || !selectedRingSize.value.size) return;
  priceObject.value = selectedRingSize.value;
  emit('update:priceObject', priceObject.value);
}

function updateSelectedRingSize(option) {
  if (option.calPrice) {
    selectedRingSize.value = option;
  }
  selectedRingSize.value = option.sku;
}

function getCalculatedData(item) {
  if (!item || !item.size) return item;
  const basePriceValue = getFinalPrice.value;
  let currentPrice = '';
  if (basePrice.value) {
    const minimumDelta = ringOptions.value[0].delta;
    currentPrice = Math.round(basePrice.value * (item.delta / minimumDelta) / 10) * 10;
    item.current_price = currentPrice;
    item.formatted_price = $formatPrice(parseInt(currentPrice));
  }
  const calPrice = currentPrice ? parseInt(basePriceValue) - currentPrice : item.current_price;
  item.discounted_price = getDiscountedPriceRing.value ? getDiscountedPriceRing.value - (currentPrice ? parseInt(basePrice.value) - currentPrice : item.current_price) : null;
  item.calPrice = currentPrice - basePrice.value;

  const formattedPrice = calPrice !== 0
    ? `${calPrice > 0 ? '-' : '+'}${$formatPrice(Math.abs(calPrice))}`
    : '';
  item.label = `${item.size}${formattedPrice ? ` (${formattedPrice})` : ''}`;
  return item;
}

function pushRoute(slug = null) {
  try {
    router.push({ path: slug });
  } catch (err) {
    console.error('Error during pushRoute:', err);
  }
}

async function addToCart() {
  let item = props.product;
  let data = {
    product_id: item.id,
    selected_configurable_option: selectedVariant.value.id,
    quantity: 1,
    attributes: {
      ring_size: selectedRingSize.value,
      prong_style: selectedProngStyle.value?.name
    }
  }
  data[`super_attribute[${selectedVariant.value.material_variation}]`] = selectedVariant.value.center_stone_shape;
  emit('addToCart', data);
}

function updateModalValues() {
  if (props.product && props.product?.button_setting && props.product?.button_setting?.is_modal_open == false) {
    if (props.product.button_setting.is_add_to_cart) {
      let url = props.product.button_setting.is_add_to_cart.url;
      if (props.product.button_setting.is_add_to_cart?.text?.toLowerCase() === 'select this setting') {
        emit('clicked', {
          buttonModalBool: false, selectedVariant: selectedVariant.value
        });
        emit('storeCookie', url);
        return;
      }
    }
    addToCart();
    return;
  }
  emit('clicked', {
    buttonModalBool: props.product?.button_setting && props.product?.button_setting?.is_modal_open ? props.product?.button_setting?.is_modal_open : true, selectedVariant: selectedVariant.value
  });
}

function onVariantSelected(variant) {
  let url = productRedirection(variant);
  pushRoute(url);
}

function getSelectedVariant(metal, shape){
  let variantData = validProductVariants.value?.find(el => el?.material_variation == metal && el?.shape?.toLowerCase() === shape?.toLowerCase());
  if(!variantData) return validProductVariants.value?.find(el => el?.material_variation == metal);
  return variantData;
}

async function assignData() {
  if (!props.product) return;

  // Assign ring options
  const { ring_options_with_prices, ring_options, ringsize_with_price, super_attributes, attribute_family_code, is_add_bundle } = props.product;
  ringOptions.value = ringsize_with_price && ring_options_with_prices?.length
    ? ring_options_with_prices
    : ring_options;

  let firstSelectedVariant = null;
  let bundleItem = null;
  let hasDiamond = false;

  const sessionBundleType = sessionStorage.getItem('bundleType');
  const eventType = getCategoryType(sessionBundleType ?? attribute_family_code);

  // Extract first valid material (metal) and shape
  const materialAttr = super_attributes?.find(el => el?.code === 'material_variation');
  const validMetal = getValidSuperAttrVariants(materialAttr)?.[0];
  material_variation.value = validMetal?.id;

  const shapeAttr = super_attributes?.find(el => el?.code === 'center_stone_shape');
  const validShape = getValidSuperAttrVariants(shapeAttr)?.[0];

  // Bundle-related logic
  if (eventType?.action && is_add_bundle) {
    bundleItem = bundle[eventType.getter];
    hasDiamond = !!bundleItem?.diamond?.sku?.trim();
  }

  if (validProductVariants.value?.length) {
    const { sku } = route.query || {};
    const fromSearch = sessionStorage.getItem('fromSearch');

    // Case 1: SKU provided in route
    if (sku) {
      firstSelectedVariant = validProductVariants.value.find(item => item.sku?.toLowerCase() === sku.toLowerCase());

    // Case 2: DIY bundle with diamond
    } else if (hasDiamond) {
      const diamondShape = bundleItem?.diamond?.shape?.toLowerCase();
      const availableShapes = validProductVariants.value.map(v => v?.shape?.toLowerCase());
      const shapeMatch = availableShapes.includes(diamondShape);
      const unsetExists = availableShapes.includes('unset');

      if (shapeMatch) {
        firstSelectedVariant = getSelectedVariant(validMetal?.id, diamondShape);
      } else if (unsetExists && !fromSearch) {
        firstSelectedVariant = getSelectedVariant(validMetal?.id, 'unset');
      } else {
        firstSelectedVariant = getSelectedVariant(validMetal?.id, validShape?.admin_name ?? 'unset');
      }

    // Case 3: Default variant
    } else {
      firstSelectedVariant = getSelectedVariant(validMetal?.id, validShape?.admin_name ?? 'unset');
    }
  }

  // Update selection
  selectedVariant.value = firstSelectedVariant;
  material_variation.value = firstSelectedVariant?.material_variation ?? material_variation.value;
  center_stone_shape.value = firstSelectedVariant?.center_stone_shape ?? validShape?.id;

  // Store in IndexedDB (if valid)
  if (selectedVariant.value) {
    let superAttrCodes = super_attributes?.map(el => el?.code);
    superAttrCodes?.forEach(code => {
      attributesData.value[code] = selectedVariant.value[code];
    });

    const productToStore = {
      id: selectedVariant.value?.id ?? props.product.id,
      sku: selectedVariant.value?.sku ?? props.product.sku,
      family: attribute_family_code
    };

    const isValid = Object.values(productToStore).every(x => x !== null && x !== '' && x !== undefined);
    if (isValid) {
      await useNuxtApp().$indexedDB.addProduct(productToStore);
    }
  }
  sessionStorage.removeItem('fromSearch');
  // Default value for ring_size
  let attributeSKUData = await store.getProductAttribute;
  let attributes = attributeSKUData[props.product.sku];
  if (attributes && attributes?.ring_size) {
    selectedRingSize.value = { sku: attributes?.ring_size };
  }
  if(attributes && attributes?.prong_style) {
    let prevProng = attributes?.prong_style;
    selectedVariant.value?.prong_style_options?.map(item => {
      if (prevProng && prevProng === item?.admin_name) {
        selectedProngStyle.value = {
          sku: item?.id, // Using the id as SKU
          name: item?.admin_name, // Label generation logic
        };
      }
    });
  }
}

function getValidSuperAttrVariants(superAttr) {
  if (superAttr?.type == "select" && validProductVariants.value?.length) {
    return getValidVariantList(superAttr);
  }
  return [];
}

function getValidVariantList(attribute = {}) {
  const { code, options = [] } = attribute;

  if (!code || !Array.isArray(validProductVariants.value)) {
    return [];
  }

  const attrs = attributesData.value || {};

  // get active filters (ignore null/undefined)
  const activeFilters = Object.entries(attrs).filter(
    ([key, value]) =>
      value !== null &&
      value !== undefined &&
      key !== code // IMPORTANT: exclude current attribute
  );

  // dynamic filtering
  let matchedVariants = validProductVariants.value.filter(variant =>
    activeFilters.every(([key, value]) => {
      // skip if key not present in variant
      if (!(key in variant)) return true;

      return variant[key] === value;
    })
  );

  if(code == 'center_stone_shape') {
    matchedVariants = matchedVariants.filter(variant => variant?.shape?.toLowerCase() != "unset");
    if(matchedVariants?.length == 0) {
      return [];
    }
  }

  // fallback
  const sourceData = matchedVariants.length  ? matchedVariants : validProductVariants.value;

  // extract unique values
  const uniqueValues = [
    ...new Set(
      sourceData
        .map(variant => variant?.[code])
        .filter(value => value !== undefined && value !== null)
    )
  ];

  // map to options
  return uniqueValues
    .map(value => options.find(option => option?.id == value))
    .filter(Boolean)
    .sort((a, b) => (a?.position || 0) - (b?.position || 0));
}

onMounted(async () => {
  // selectedVariant = product;
  assignData();
});
</script>
<style scoped>
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
* {
  scrollbar-width: none;
  /* For Firefox */
}

/* Hide scrollbar for Internet Explorer and legacy browsers */
* {
  -ms-overflow-style: none;
  /* IE and Edge */
}
</style>