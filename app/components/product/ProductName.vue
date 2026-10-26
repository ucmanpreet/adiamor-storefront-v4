<template>
    <div class="text-2xl">
        <div class="flex items-start gap-6">
            <h1 class="text-[17px] sm:text-[21.333px]/[30px] !text-black focus:outline-none focus:ring-2 focus:ring-primary" tabindex="0" :aria-label="getProductName">{{ getProductName }}</h1>
        </div>
        <ul v-if="isShowAttributes" role="presentation"
            class="flex text-sm sm:text-[13.333px] leading-none">
            <template v-for="(grade, type, index) in diamondKeysToShow">
                <li role="presentation" class="flex items-center first:pl-0 pr-2" :key="type" v-if="getlableValue(grade)">
                    <span aria-hidden="true" v-if="index > 0" class="mr-2 text-3xl text-black inline-block">•</span>
                    {{ getlableValue(grade) }}{{ grade != 'diamond_growth' ? ` ${type}` : '' }}
                </li>
            </template>
        </ul>
        <p class="text-base sm:text-[13.333px]" :aria-label="'SKU info for ' + product.name">{{ fetchLabel(product) }} <span class="uppercase"> {{ skuToDisplay(product.sku) ?? product.sku }} </span></p>
    </div>
</template>
<script setup>
import { skuToDisplay as skuToDisplayHelper, fetchSKULabel } from "~/utils/universalHelper.js";

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

const diamondKeysToShow = ref({ 'Diamond Growth': 'diamond_growth', 'Cut': 'diamond_cut_grade', 'Color': 'diamond_color_grade', 'Clarity': 'diamond_clarity_grade'});

const skuToDisplay = item => skuToDisplayHelper(item);
const fetchLabel = item => fetchSKULabel(item);

function getlableValue(label) {
    let attr = props.product.attributes;
    if( props.product?.diamondAttributeDetail && props.product?.diamondAttributeDetail?.length) {
        attr = props.product.diamondAttributeDetail[0]?.data;
    }
    if (props.product && Array.isArray(attr) && attr?.length > 0) {
        let el = attr?.find(el => el.code == label);
        return el ? el.value : '';  // Filter for elements where el.is_outside is truthy
    }
    return '';
}

const getProductName = computed(() => props.selectedVariant?.name || props.product?.name || '');

const isShowAttributes = computed(() => {
    if(props.product?.type == 'simple' && props.product?.attributes && props.product?.attributes?.length) {
        return props.product.attributes.some(attr => Object.values(diamondKeysToShow.value).includes(attr.code));
    }
    if(props.product?.type == 'simple' && props.product?.diamondAttributeDetail && props.product?.diamondAttributeDetail?.length) {
        return props.product.diamondAttributeDetail[0]?.data?.some(attr => Object.values(diamondKeysToShow.value).includes(attr.code));
    }
});
</script>