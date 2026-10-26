<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/Custom%20Search/banner_customdiamondsearch.jpg?updatedAt=1747804190927`"
            :contentBackgroundColor="`bg-black/70 sm:bg-transparent`"
            :contentTextColor="`text-white`"
            alt="Custom Diamond Search Banner"
			>
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Custom Diamond Search</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">We have access to far more than just the diamonds
                listed on our website. Simply provide the information listed below and a diamond consultant will
                perform a search and contact you, typically within a few hours.</p>
        </Banner>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-8 lg:py-16" aria-labelledby="diamond-search-heading">
            <h2 id="diamond-search-heading"
                class="text-sm md:text-xl lg:text-3xl font-normal text-center"
            >
                For a complimentary diamond search performed by one of our expert gemologists, please fill in the required information below:
            </h2>
            <div class="mt-8 flex items-center md:items-stretch flex-col md:flex-row relative">
                <!-- Form Box -->
                <div class="flex-1 w-full gap-2 flex flex-col p-6">
                    <CustomLiveAgentForm type="custom-diamond-search" />
                </div>
                <!-- Image -->
                <div class="flex-1 relative" aria-hidden="true">
                    <nuxt-img 
                        provider="cdn" 
                        src="/landing-pages/Custom%20Search/concierge-diamond-search.jpg"
                        alt="Custom Diamond Search" 
                        class="md:absolute inset-0 w-full h-full object-cover object-center" 
                    />
                </div>
            </div>
            <p class="mt-8 text-sm md:text-lg text-center">You may also call a diamond consultant at
                <a
                    href="tel:8776275094"
                    class="underline text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Call diamond consultant at 877-627-5094"
                >
                    877-627-5094
                </a>
                for immediate help with your search.
                <span class="block">See our
                    <NuxtLink
                        :to="STATIC_ROUTES.POLICIES_PRIVACY"
                        class="underline text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="View Privacy Policy"
                        @click="$bus.emit('aria-announce', 'Navigating to Privacy Policy page')"
                    >
                        Privacy Policy
                    </NuxtLink>.
                </span>
            </p>
        </section>

        <!-- Contact Link -->
        <ContactLink />

    </div>
</template>
<script setup>
import KEYS from '~/utils/constant.js';
import Banner from '~/components/ui/Banner.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import ContactLink from '~/components/common/ContactLink.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import CustomLiveAgentForm from '~/components/form/CustomLiveAgentForm.vue';

const emit = defineEmits(['close']);
const { $bus } = useNuxtApp();

const diamondFormId = computed(() => KEYS.CUSTOM_DIAMOND_SEARCH);

onMounted(() => {
    $bus.emit(
        'aria-announce',
        'Custom Diamond Search page loaded. The contact form is loading.'
    );
});

function closeModal() {
    emit("close");
    $bus.emit('aria-announce', 'Modal closed');
}
</script>

<style>
.ContactForm .TextBox {
    border: 1px solid #ccc !important;
}
</style>