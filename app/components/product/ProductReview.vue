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
<script setup>
import { fetchFirstProductImage as fetchFirstProductImageHelper } from '~/utils/universalHelper';

const props = defineProps(['product']);

const fetchFirstProductImage = item => fetchFirstProductImageHelper(item);

function scrollToReview() {
    const target = document.getElementById('reviewBottom');
    if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
    }
}

const getSku = computed(() => {
    let product = props.product;
    return product?.type === 'configurable' && product.sku.includes('-')
        ? product.sku.split('-')[0]
        : product.sku;
});
</script>

<style>
.yotpo-stars+a {
    @apply !mt-0.5 !ml-2
}
</style>