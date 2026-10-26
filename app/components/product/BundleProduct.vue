<template>
    <!-- Product info -->
    <div class="xl:pb-6 lg:max-w-[424px] w-full flex flex-col flex-none ml-auto">
        <div class="text-lg">
            <h1>{{ getBundleName }}</h1>
        </div>
        <!-- Selection -->
        <div class="mt-6">
            <h3 class="sr-only hidden sm:block">Selection</h3>
            <div class="flex gap-3 w-full" :class="index == 1 ? 'mt-2' : ''" v-for="(item, index) in bundleOptions"
                :key="index">
                <NuxtLink :to="productRedirection(item)" class="flex w-full">
                    <template v-if="item?.images?.length">
                        <MediaImage :src="item" alt="" className="w-8 h-8 sm:w-9 sm:h-9 mt-1 flex-none object-contain" aria-hidden="true" />
                    </template>
                    <template v-else>
                        <Icon :name="product.attribute_family_code" v-if="item.attribute_family_code != 'certified_diamond'"
                            class="w-5 h-5 sm:w-9 sm:h-9 mt-1 flex-none" aria-hidden="true" />
                        <Icon :name="getPairedIcon" v-else class="w-5 h-5 sm:w-9 sm:h-9 mt-1 flex-none" aria-hidden="true" />
                    </template>

                    <div class="space-y-0.5 flex-1 ml-3">
                        <p class="text-sm leading-normal">{{ getItemName(item) }}</p>
                        <p class="font-extralight not-italic text-xs mb-2"><i class="not-italic">{{ getLableVlaue(item) }}</i> #: {{ skuToDisplay(item?.sku) ?? item.sku }}
                        </p>
                        <div class="text-right" v-if="item?.is_available">
                            <span v-if="showStrikeThroughPrice(item, item?.selectedVariant)" class="sr-only">
                                Original price {{ formattedPrice(showStrikeThroughPrice(item, item?.selectedVariant)) }}, discounted price {{ formattedPrice(fetchPriceData(item, item?.selectedVariant)) }}
                            </span>
                            <span v-else-if="item.price" class="sr-only">Price {{ formattedPrice(fetchPriceData(item, item?.selectedVariant)) }}</span>
                            <span aria-hidden="true">
                                <span v-if="showStrikeThroughPrice(item, item?.selectedVariant)" class="line-through text-gray-600 text-sm mr-1">{{ formattedPrice(showStrikeThroughPrice(item, item?.selectedVariant)) }}</span>
                                <span v-if="item.price" class="font-medium text-sm sm:text-base"
                                    :class="{ 'text-black': showStrikeThroughPrice(item, item?.selectedVariant) }">
                                    {{ formattedPrice(fetchPriceData(item, item?.selectedVariant)) }}
                                </span>
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <form>
            <template v-if="isAvailable">
                <!-- Ring Size -->
                <div class="flex flex-col mt-6" v-if="product && product.ring_options && product.ring_options.length">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium">Ring Size:</span>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_FIND_YOUR_RING_SIZE" target="_blank"
                            class="text-xs underline flex items-center gap-1">
                            <Icon name="info" class="w-4 h-4 cursor-pointer relative z-10" />
                            <span>Find your ring size</span>
                        </NuxtLink>
                    </div>
                    <Dropdown class="w-full" ariaLabel="Ring size" :defaultName="`Select Ring Size`" :variants="formattedRingOptions"
                        :selectedSku="selectedRingSize?.sku" @option-selected="(value) => selectedRingSize = value"
                        @change="(value) => selectedRingSize = value"/>
                </div>
                <!--Prong Style-->
                <div class="flex flex-col mt-6" v-if="product && product.prong_style_options && product.prong_style_options.length">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium">Prong Style:</span>
                    </div>
                    <Dropdown class="w-full" ariaLabel="Prong style" :defaultName="`Select Prong Style`" :variants="modifiedProngs"
                        :selectedSku="selectedProngStyle?.sku" @option-selected="(value) => selectedProngStyle = value"/>
                </div>
            </template>
            <ProductPrice :product="product" :selectedVariant="{}" :priceObject="priceObject" />
            <ProductButtons @clickSubmit="updateModalValues" :product="product" :selectedVariant="{}" />
        </form>
        <ExpertAdviceMobile/>
        <AttributeDetail :product="product" :diamond="diamond" />
    </div>
</template>

<script setup>
import Icon from '~/components/common/Icon.vue';
import Dropdown from '~/components/ui/Dropdown.vue';
import ProductPrice from '~/components/product/ProductPrice.vue';
import ProductButtons from '~/components/product/ProductButtons.vue';
import ExpertAdviceMobile from '~/components/common/ExpertAdviceMobile.vue';
import AttributeDetail from '~/components/product/AttributeDetail.vue';
import { showStrikeThroughPrice as showStrikeThroughPriceHelper, fetchPriceData as fetchPriceDataHelper, skuToDisplay as skuToDisplayHelper, productRedirection as productRedirectionHelper } from "~/utils/universalHelper.js";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const props = defineProps({
    product: Object,
});
const emit = defineEmits(['clicked', 'loader', 'addToCart']);

const store = useMainStore();
const api = useApi();
const { createSwalAlert } = useAlert();
const { $formatPrice } = useNuxtApp();

const selectedVariant = ref('');
const bundleOptions = ref([]);
const bundleFormatedPrice = ref('');
const selectedRingSize = ref('');
const bundleProduct = ref('');
const setting = ref('');
const diamond = ref({});
const selectedProngStyle = ref(null);
const priceObject = ref({});
const bundleProductData = ref(null);
const attributesData = ref({});

onMounted(async () => {
    bundleProductData.value = await store.getBundleItem;
    console.log('bundleProductData', bundleProductData.value);
    
    setBundleOptions();
});

const getPairedIcon = computed(() => {
    if(diamond.value?.attribute_family_code) {
        return `${diamond.value?.attribute_family_code}${diamond.value?.sku?.includes('|') ? '_pair' : ''}`;
    }
    return 'certified_diamond';
});

const getBundleName = computed(() => `Your Completed ${props.product?.family}`);

const formattedRingOptions = computed(() => {
    return props.product.ring_options.map(item => {
        return {
            sku: item, // Using the ring size as SKU
            name: getRingLabel(item), // Label generation logic
        };
    });
});

const modifiedProngs = computed(() => {
    let prevProng = null;
    if(attributesData.value && attributesData.value?.prong_style) {
        prevProng = attributesData.value?.prong_style;
    }
    return props.product.prong_style_options.map(item => {
        if(prevProng && prevProng === item?.admin_name) {
            selectedProngStyle.value = {
                sku: item?.id, // Using the id as SKU
                name: item?.admin_name, // Label generation logic
            };
        }
        return {
            sku: item?.id, // Using the id as SKU
            name: item?.admin_name, // Label generation logic
        };
    });
});

const isAvailable = computed(() => bundleProductData.value?.setting?.is_available && bundleProductData.value?.diamond?.is_available);

const fetchPriceData = item => fetchPriceDataHelper(item);
const showStrikeThroughPrice = item => showStrikeThroughPriceHelper(item);
const skuToDisplay = item => skuToDisplayHelper(item);
const productRedirection = value => productRedirectionHelper(value);

function getLableVlaue(item) {
    return item?.attribute_family_code  == 'certified_diamond' ? 'Item' : 'Style';
}

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}

function getItemName(item) {
    let attributes = attributesData.value;
    if (attributes && attributes?.backing && item?.attribute_family_code == "earring") {
        return item?.name + ' with ' + attributes.backing;
    }
    return item?.name;
}

function updateModalValues() {
    if(!props.product?.is_backing) {
        createBundleItem();
        return;
    }
    let attributes = attributesData.value;
    if(attributes && attributes?.backing) {
        createBundleItem();
        return;
    }
    emit('clicked', {
        buttonModalBool: props.product?.button_setting?.is_modal_open, selectedVariant: {}
    });
    console.log('bundleProductData', bundleProductData.value);
}

function getRingLabel(item) {
    if (!item || !item.size) return item;
    // The original read `this.getFinalPrice` / `this.basePrice` / `this.ringOptions`, which never existed on the
    // component (always undefined), so the dynamic price branch was never executed.
    const currentPrice = '';
    const calPrice = item.current_price;
    const formattedPrice = calPrice !== 0
        ? `${calPrice > 0 ? '-' : '+'}${$formatPrice(Math.abs(calPrice))}`
        : '';
    return `${item.size}${formattedPrice ? ` (${formattedPrice})` : ''}`;
}

async function setBundleOptions() {
    let bundleItem = bundleProductData.value;
    if (bundleItem && Object.keys(bundleItem).length > 0) {
        priceObject.value.current_price = bundleItem['price'];
        priceObject.value.discounted_price = bundleItem['discounted_price'];
        bundleFormatedPrice.value = $formatPrice(bundleItem['price']);
        bundleOptions.value.push(bundleItem['setting'], bundleItem['diamond']);
        setting.value = bundleItem['setting'];
        diamond.value = bundleItem['diamond'];
    }

    // Default value for ring_size
    let attributeSKUData = await store.getProductAttribute;
    let attributes = attributeSKUData[props.product.parent_sku];
    attributesData.value = attributes ?? {};

    if(attributes && attributes?.ring_size) {
        selectedRingSize.value = { sku : attributes?.ring_size };
    }
}

// Same behaviour as the old rest-api postRequest(): 401/422/403 and other failures resolve to { data: { message, success: false } }
async function postRequest(url, formData) {
    try {
        return await api.request('post', url, { body: formData, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        const status = error.status;
        if (status === 401 || status === 422 || status === 403) {
            let msg = error.data?.error || error.data?.message || 'Internal Server Error';
            let code = error.data?.code || null;
            return { data: { message: msg, success: false, status, code } };
        }
        return { data: { message: error.message ?? error, success: false } };
    }
}

async function createBundleItem() {
    try {
        let data = {
            // selected_configurable_option: setting.value?.id,
            // selected_diamond_option: diamond.value?.id
            selected_configurable_option: setting.value?.sku,
            selected_diamond_option: diamond.value?.sku
        };
        emit('loader', true);
        let response = await postRequest('create-bundle-product', data);
        if (!response) {
            createSwalAlert('Internal Server Error', "error");
            emit('loader', false);
            return;
        }
        let result = response.data?.data;
        if (result) {
            if (result?.Error || result?.error) {
                createSwalAlert(result.Error ?? result?.error, "error")
            }
            if (response?.status == 200) {
                bundleProduct.value = result;
                addToCart();
                emit('loader', false);
                // createSwalAlert(response?.data?.message, "success");
            }
        }
        emit('loader', false);
    } catch (error) {
        emit('loader', false);
        createSwalAlert('Internal Server Error', "error");
    }
}

async function addToCart() {
    let bundle_options = {}, bundle_option_qty = {};
    let attributes = {};

    if (bundleProduct.value && bundleProduct.value.bundleOptions) {
        bundleProduct.value.bundleOptions.forEach((el, index) => {
            if (!bundle_options[el.id]) {
                bundle_options[el.id] = {};
            }
            bundle_options[el.id][`index_0`] = bundleProduct.value?.productBundleOptions[index]?.product_id;
            bundle_option_qty[el.id] = bundleProduct.value?.productBundleOptions[index]?.qty ?? 1;
        });
    }
    if (selectedProngStyle.value) {
        attributes['prong_style'] = selectedProngStyle.value?.name ?? selectedProngStyle.value;
    }
    if (selectedRingSize.value && selectedRingSize.value?.name) {
        attributes['ring_size'] = selectedRingSize.value?.name;
    }
    let data = {
        product_id: bundleProduct.value?.id,
        quantity: 1,
        bundle_options,
        bundle_option_qty,
        attributes
    };
    emit('addToCart', data);
}

// ProductLayout calls bundleProductComponent.createBundleItem() through a template ref
defineExpose({ createBundleItem });
</script>