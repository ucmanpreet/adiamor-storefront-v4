<template>
    <div>
        <ProductPrice :product="product" :selectedVariant="{}" :priceObject="{}" />
        <ProductButtons @clickSubmit="updateModalValues" :product="product" :selectedVariant="{}" />
    </div>
</template>
<script setup>
import ProductPrice from '~/components/product/ProductPrice.vue';
import ProductButtons from '~/components/product/ProductButtons.vue';

const props = defineProps({
    product: Object,
});
const emit = defineEmits(['storeCookie', 'clicked']);

const imgPreviewKey = ref(0);

onMounted(() => {
    if (props.product) {
        let indexObjRecentView = {
            id: props.product.id,
            sku: props.product.sku,
            family: props.product.attribute_family_code,
        };
        const isEmpty = Object.values(indexObjRecentView).some(x => x == null || x == '' || x == undefined);
        if (isEmpty == false) {
            useNuxtApp().$indexedDB.addProduct(indexObjRecentView);
        }
    }
});

function isObjEmpty(obj) {
    return Object.values(obj).length === 0 && obj.constructor === Object;
}

function updateModalValues() {
    if (props.product && props.product?.button_setting && props.product?.button_setting?.is_modal_open === false) {
        props.product.is_add_bundle ? emit('storeCookie', props.product.button_setting.is_add_to_cart.url) : '';
        return;
    };

    emit('clicked', {
        buttonModalBool: props.product?.button_setting && props.product?.button_setting?.is_modal_open ? props.product?.button_setting?.is_modal_open : true, selectedVariant: {}
    });
}
</script>