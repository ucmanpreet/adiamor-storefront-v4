<template>
    <div>
        <ProductPrice :product="product" :selectedVariant="{}" :priceObject="{}" />
        <ProductButtons @clickSubmit="updateModalValues" :product="product" :selectedVariant="{}" />
    </div>
</template>
<script>
import ProductPrice from '~/components/product/ProductPrice.vue';
import ProductButtons from '~/components/product/ProductButtons.vue';

export default {
    name : "SimpleProduct",
    components: { ProductPrice, ProductButtons },
    data() {
        return {
            imgPreviewKey: 0,
        }
    },
    props: {
        product: Object,
    },
    mounted() {
        if (this.product) {
            let indexObjRecentView = {
                id: this.product.id,
                sku: this.product.sku,
                family: this.product.attribute_family_code,
            };
            const isEmpty = Object.values(indexObjRecentView).some(x => x == null || x == '' || x == undefined);
            if (isEmpty == false) {
                this.$indexedDB.addProduct(indexObjRecentView);
            }
        }
    },
    methods: {
        isObjEmpty(obj) {
            return Object.values(obj).length === 0 && obj.constructor === Object;
        },
        updateModalValues() {
            if (this.product && this.product?.button_setting && this.product?.button_setting?.is_modal_open === false) {
                this.product.is_add_bundle ? this.$emit('storeCookie', this.product.button_setting.is_add_to_cart.url) : '';
                return;
            };

            this.$emit('clicked', {
                buttonModalBool: this.product?.button_setting && this.product?.button_setting?.is_modal_open ? this.product?.button_setting?.is_modal_open : true, selectedVariant: {}
            });
        },
    }
}
</script>