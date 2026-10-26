<template>
    <div>
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16">
            <h1 class="text-lg md:text-2xl lg:text-4xl font-normal mb-4">Adiamor Customers on Social Media</h1>
            <p class="mb-8 text-sm sm:text-lg">Be featured in our gallery! Post your engagement ring, proposal story, or
                wedding photos on social media with the hashtag #adiamor or tag us directly on Instagram
                @adiamordiamonds!</p>
        </section>

        <!-- Shoppable Newsletter -->
        <Newsletter />

        <!-- Gallery -->
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 min-h-screen">
            <div class="py-24 w-full relative flex item-center justify-center" v-if="loading"
                role="status"
                aria-live="polite"
                aria-label="Loading social media gallery"
            >
                <CustomLoader/>
            </div>
            <ClientOnly v-else><div class="yotpo yotpo-pictures-gallery yotpo-size-7"
                data-layout="full_page"
                data-layout-scroll="1"
                data-spacing="0"
                data-source="instagram"
                data-title="0"
                data-hover-color="#FFFFFF"
                data-hover-opacity="0.8"
                data-hover-icon="true"
                data-cta-text="Shop Now"
                data-cta-color="#306499"
                data-yotpo-element-id="1"
                data-upload-button="1"
                data-upload-button-text="Add Your Photos"
                data-upload-button-background-color="#306499"
                data-upload-button-text-color="#FFFFFF"
                data-upload-button-font-family="Outfit"
                role="region"
                aria-label="Adiamor Instagram photo gallery. Browse customer photos and shop featured products."
            >
                <div class="yotpo yotpo-lightbox-wrapper" aria-hidden="true" data-acsb-hidden="true">
                    <div class="yotpo-lightbox-contents yotpo-hidden">
                        <div class="yotpo-slider-content-64f01c1533f1ec5b21b24782" data-source="instagram"> </div>
                    </div>
                </div>
            </div></ClientOnly>
        </div>
    </div>
</template>
<script setup>
import Newsletter from '~/components/landing/Newsletter.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';

const { $bus } = useNuxtApp();

const loading = ref(true);

onMounted(() => {
    $bus.emit(
        'aria-announce',
        'Adiamor Customers on Social Media page loaded. Browse Instagram photos and shop featured products.'
    )
    nextTick(() => {
        loading.value = false;
        $bus.emit(
            'aria-announce',
            'Instagram social media gallery has loaded. You can browse customer photos and use the Shop Now buttons.'
        )
    })
});
</script>

<style>
.yotpo-lightbox-product-button {
    color: #fff !important;
}
</style>