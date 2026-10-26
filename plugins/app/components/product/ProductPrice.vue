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
<script>
import { showStrikeThroughPrice, fetchPriceData } from "~/utils/universalHelper.js";

export default {
    name : 'ProductPrice',
    props: {
        product: Object,
        selectedVariant: {
            type: Object,
            default: {}, // Default to an empty string to avoid issues when empty
        },
        priceObject: {
            type: Object,
            default: {}, // Default to an empty string to avoid issues when empty
        },
    },
    computed: {
        isBundleView() {
			return this.$route.name === 'yourSettingPage';
		},
        getProductAvailability() {
            // return product availability based on in_stock and is_active
            if(this.$route.name != "yourSettingPage"){
                return this.product.is_available;
            }
            let bundleItem = this.$store.getters.getBundleItem;
            if (bundleItem && Object.keys(bundleItem).length > 0){
                let setting = bundleItem['setting'];
                let diamond = bundleItem['diamond'];
                return setting?.is_available && diamond?.is_available;
            }
            return true;
        },
        isObjectNull: function () {
            return !(this.selectedVariant && Object.keys(this.selectedVariant).length === 0 &&
                this.selectedVariant.constructor === Object)
        },
        getFinalPrice() {
            if (this.priceObject && this.priceObject?.current_price) { return this.priceObject.discounted_price && this.priceObject.discounted_price < this.priceObject.current_price ? this.$formatPrice(parseFloat(this.priceObject.discounted_price)) : this.$formatPrice(parseFloat(this.priceObject.current_price)); }
            return this.$formatPrice(fetchPriceData(this.product, this.isObjectNull && this.selectedVariant ? this.selectedVariant : null));
        },
        strikeThroughPrice() {
            if (this.priceObject && this.priceObject?.current_price && this.priceObject?.discounted_price && this.priceObject.discounted_price < this.priceObject.current_price) {
                return this.$formatPrice(parseFloat(this.priceObject.current_price));
            }
            return this.$formatPrice(showStrikeThroughPrice(this.product, this.isObjectNull && this.selectedVariant ? this.selectedVariant : null));
        },
        checkProductType() {
            return this.product && this.product?.type == 'configurable' && this.product?.is_add_bundle;
        },
        getPriceAnnouncement() {
            const parts = [];
            if (this.strikeThroughPrice) {
                parts.push(`Original price ${this.strikeThroughPrice}`);
            }
            if (this.getFinalPrice) {
                parts.push(`Current price ${this.getFinalPrice}`);
            }
            if (this.checkProductType) {
                parts.push('Setting Only');
            }
            return parts.join(', ');
        },
    },
    methods: {
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), false);
        },
    }
}
</script>