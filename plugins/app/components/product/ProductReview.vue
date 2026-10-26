<template>
    <div class="mt-1">
        <h2 class="sr-only">Reviews</h2>
        <div class="flex gap-2 items-center star">
            <ClientOnly><div class="yotpo bottomLine" data-appkey="6f1F0OnNtSWyuxiDZMUPAGCbmxH1RBZrv06s7Kx8"
                data-domain="adiamor.com" :data-product-id="getSku" :data-name="getSku"
                :data-url="product.url_key" :data-image-url="fetchFirstProductImage(product)"
                :data-description="product.short_description" @click="scrollToReview" @keydown.enter.prevent="scrollToReview"
                :aria-label="'Scroll to reviews for ' + product.name">
            </div></ClientOnly>
        </div>
    </div>
</template>
<script>
import { fetchFirstProductImage } from '~/utils/universalHelper';
export default {
    name : 'ProductReview',
    props: ['product'],
    methods: {
        fetchFirstProductImage: item => fetchFirstProductImage(item),
        scrollToReview() {
            const target = document.getElementById('reviewBottom');
            if (target && typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
            }
        }
    },
    computed: {
        getSku() {
            let product = this.product;
            return product?.type === 'configurable' && product.sku.includes('-')
                ? product.sku.split('-')[0]
                : product.sku;
        }
    }
}
</script>

<style>
.yotpo-stars+a {
    @apply !mt-0.5 !ml-2
}
</style>