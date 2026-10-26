<template>
    <div 
        aria-label="Product pricing information" 
        class="mt-6" 
        v-if="getProductAvailability" 
        :class="{ 'text-right': isBundleView }"
    >
        <p class="font-normal text-xl" role="text">
            <span class="sr-only">{{ getPriceAnnouncement || getFinalPrice }}</span>
            <span class="line-through text-gray-600 text-lg" v-if="strikeThroughPrice" aria-hidden="true">{{ strikeThroughPrice }}</span>
            <span class="text-3xl tracking-wider" :class="{ 'text-black': strikeThroughPrice }" aria-hidden="true">{{ getFinalPrice }}</span>
            <span class="text-sm font-normal" v-if="checkProductType" aria-hidden="true">(Setting Only)</span>
        </p>
    </div>
</template>
<script setup>
import { showStrikeThroughPrice, fetchPriceData } from "~/utils/universalHelper.js";

const props = defineProps({
    product: Object,
    selectedVariant: {
        type: Object,
        default: {}, // Default to an empty string to avoid issues when empty
    },
    priceObject: {
        type: Object,
        default: {}, // Default to an empty string to avoid issues when empty
    },
});

const store = useMainStore();
const route = useRoute();
const { $formatPrice } = useNuxtApp();

const isBundleView = computed(() => route.name === 'yourSettingPage');

const getProductAvailability = computed(() => {
    // return product availability based on in_stock and is_active
    if(route.name != "yourSettingPage"){
        return props.product.is_available;
    }
    let bundleItem = store.getBundleItem;
    if (bundleItem && Object.keys(bundleItem).length > 0){
        let setting = bundleItem['setting'];
        let diamond = bundleItem['diamond'];
        return setting?.is_available && diamond?.is_available;
    }
    return true;
});

const isObjectNull = computed(() => !(props.selectedVariant && Object.keys(props.selectedVariant).length === 0 &&
    props.selectedVariant.constructor === Object));

const getFinalPrice = computed(() => {
    if (props.priceObject && props.priceObject?.current_price) { return props.priceObject.discounted_price && props.priceObject.discounted_price < props.priceObject.current_price ? $formatPrice(parseFloat(props.priceObject.discounted_price)) : $formatPrice(parseFloat(props.priceObject.current_price)); }
    return $formatPrice(fetchPriceData(props.product, isObjectNull.value && props.selectedVariant ? props.selectedVariant : null));
});

const strikeThroughPrice = computed(() => {
    if (props.priceObject && props.priceObject?.current_price && props.priceObject?.discounted_price && props.priceObject.discounted_price < props.priceObject.current_price) {
        return $formatPrice(parseFloat(props.priceObject.current_price));
    }
    return $formatPrice(showStrikeThroughPrice(props.product, isObjectNull.value && props.selectedVariant ? props.selectedVariant : null));
});

const checkProductType = computed(() => props.product && props.product?.type == 'configurable' && props.product?.is_add_bundle);

const getPriceAnnouncement = computed(() => {
    const parts = [];
    if (strikeThroughPrice.value) {
        parts.push(`Original price ${strikeThroughPrice.value}`);
    }
    if (getFinalPrice.value) {
        parts.push(`Current price ${getFinalPrice.value}`);
    }
    if (checkProductType.value) {
        parts.push('Setting Only');
    }
    return parts.join(', ');
});

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
</script>