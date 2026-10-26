<template>
    <ProductCarousel v-if="recentViewedLiveData && recentViewedLiveData.length" :arrayData="recentViewedLiveData"
        :heading="heading" :description="'Here’s what you were loving earlier.'" type="recently-viewed" />
</template>

<script setup>
import ProductCarousel from '~/components/product/ProductCarousel.vue';

const props = defineProps(['recentViewedProp', 'heading']);

const { $indexedDB } = useNuxtApp();
const api = useApi();
const { createSwalAlert } = useAlert();

const recentViewedLiveData = ref([]);

async function getRecentViewedLive() {
    try {
        let allRecentProducts = await $indexedDB.getRecentViewedByFamily();
        if (Array.isArray(props.recentViewedProp) && props.recentViewedProp.length) {
            allRecentProducts = props.recentViewedProp;
        }
        if (!Array.isArray(allRecentProducts) || allRecentProducts.length === 0) {
            recentViewedLiveData.value = [];
            return;
        }
        let allSkus = allRecentProducts.map(obj => obj?.sku).join(',');
        const countryData = useCookie('countryData').value;
        let response;
        try {
            response = await api.request('get', `recently-viewed?skus=${encodeURIComponent(allSkus)}&currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`);
        } catch (err) {
            createSwalAlert(err.message || 'Internal Server Error', 'error');
            response = { data: { message: err.message, success: false } };
        }
        if (!response) {
            return;
        }
        if (response && response.data && response.data.success) {
            const liveData = response.data.data ?? [];
            const liveDataMap = new Map(liveData.map(item => [item.sku, item]));
            recentViewedLiveData.value = allRecentProducts.map(obj => liveDataMap.get(obj.sku)).filter(Boolean);
        }
    } catch (error) {
        console.log('Get Match Product Error' + error);
    }
}

onMounted(async () => {
    await getRecentViewedLive();
});
</script>