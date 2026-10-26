<template>
    <ProductCarousel v-if="recentViewedLiveData && recentViewedLiveData.length" :arrayData="recentViewedLiveData"
        :heading="heading" :description="'Here’s what you were loving earlier.'" type="recently-viewed" />
</template>

<script>
import api from '~/api-client/rest-api/index.js';
import ProductCarousel from '~/components/product/ProductCarousel.vue';
export default {
    name: 'RecentlyViewed',
    props: ['recentViewedProp', 'heading'],
    components: { ProductCarousel },
    data() {
        return {
            recentViewedLiveData: [],
        };
    },
    methods: {
        async getRecentViewedLive() {
            try {
                let allRecentProducts = await this.$indexedDB.getRecentViewedByFamily();
                if (Array.isArray(this.recentViewedProp) && this.recentViewedProp.length) {
                    allRecentProducts = this.recentViewedProp;
                }
                if (!Array.isArray(allRecentProducts) || allRecentProducts.length === 0) {
                    this.recentViewedLiveData = [];
                    return;
                }
                let allSkus = allRecentProducts.map(obj => obj?.sku).join(',');
                const response = await api.getRequest(this.$axios, this.$cookies, `recently-viewed?skus=${encodeURIComponent(allSkus)}`);
                if (!response) {
                    return;
                }
                if (response && response.data && response.data.success) {
                    const liveData = response.data.data ?? [];
                    const liveDataMap = new Map(liveData.map(item => [item.sku, item]));
                    this.recentViewedLiveData = allRecentProducts.map(obj => liveDataMap.get(obj.sku)).filter(Boolean);
                }
            } catch (error) {
                console.log('Get Match Product Error' + error);
            }
        },
    },
    async mounted() {
        await this.getRecentViewedLive();
    },
}
</script>