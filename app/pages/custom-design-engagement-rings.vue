<template>
    <div>
        <!-- Be Inspired -->
        <section class="flex flex-col gap-4 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="custom-design-heading">
            <header class="col-span-full max-w-3xl mx-auto text-center lg:mb-12">
                <h2 id="custom-design-heading" class="text-lg md:text-xl lg:text-3xl xl:text-5xl font-normal">Custom Design Engagement Rings</h2>
                <p class="mt-3 text-sm md:text-lg max-w-2xl mx-auto ">Adiamor specializes in custom design engagement
                    rings and wedding bands.
                    Our design experts are here to guide you step-by-step through the process to ensure that your design
                    is everything you dreamed it would be.</p>
            </header>
            <div class="flex flex-col items-center justify-center bg-gray-100">
                <div
                    class="max-w-xl w-full m-auto flex items-center justify-center md:justify-start">
                    <div class="w-full px-4 text-center flex flex-col justify-center py-12">
                        <h2 class="text-lg md:text-2xl font-normal">Be Inspired</h2>
                        <p class="mt-1.5 text-sm">View the rings that we have created for our customers.</p>
                        <NuxtLink :to="STATIC_ROUTES.CUSTOM_RINGS_GALLERY" @click="announceNavigation('Navigating to custom rings gallery')"
                            class="inline-block mt-4 px-8 font-medium mx-auto py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-1 bg-primary text-white hover:bg-primary/90 focus:ring-primary uppercase font-gill-sans tracking-[0.125rem]">View
                            Gallery</NuxtLink>
                    </div>
                </div>
                <div class="grid grid-cols-3 items-center justify-center">
                    <nuxt-img provider="cdn" class="mix-blend-multiply" src="/landing-pages/Custom%20Engagement%20Rings/inspired-custom_pink.jpg?updatedAt=1747805922875" alt="Custom pink sapphire engagement ring"/>
                    <nuxt-img provider="cdn" class="mix-blend-multiply" src="/landing-pages/Custom%20Engagement%20Rings/custom_3.jpg?updatedAt=1747805922699" alt="Custom diamond engagement ring design"/>
                    <nuxt-img provider="cdn" class="mix-blend-multiply" src="/landing-pages/Custom%20Engagement%20Rings/inspired-custom-blue2.jpg?updatedAt=1747805922673" alt="Custom blue gemstone engagement ring"/>
                </div>
            </div>
        </section>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="quote-heading">
            <h2 id="quote-heading" class="text-sm md:text-xl lg:text-3xl font-normal text-center">For a quote, please fill in the required information
                below:</h2>
            <div class="mt-2 lg:mt-8 flex relative overflow-hidden">
                <div class="w-full sm:w-1/2 sm:pr-4">
                    <CustomLiveAgentForm type="custom-jewelry-request" />
                </div>

                    <div class="hidden sm:block absolute top-0 right-0 w-1/2 h-full" aria-hidden="true">
                        <nuxt-img provider="cdn" src="/landing-pages/heros/custom-ring-splash.jpg?updatedAt=1746137187235" class="w-full h-full object-cover" alt="Custom diamond engagement ring"/>
                    </div>
            </div>
        </section>

        <div class="pt-8 lg:pt-16 space-y-6 sm:space-y-9">
            <!-- Timeless Elegance -->
            <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2" aria-labelledby="timeless-elegance-heading">
                <div>
                    <nuxt-img provider="cdn" class="w-full h-full object-cover" src="/landing-pages/heros/er-search-metal-rosegold.jpg?updatedAt=1746137204125" alt="Rose gold solitaire engagement ring"/>
                </div>
                <div class="pl-4 sm:p-6 flex flex-col justify-center">
                    <h2 id="timeless-elegance-heading" class="font-normal text-sm sm:text-lg md:text-2xl">Timeless Elegance</h2>
                    <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md min-h-[48px]">Choose from classic solitaires to the latest halo engagement settings.</p>
                    <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
                        class="mt-4 inline-block text-xs sm:text-base underline text-primary font-semibold"
                        aria-label="Search engagement rings"
                        @click="announceNavigation('Navigating to engagement rings search')"
                    >Search Now</NuxtLink>
                </div>
            </section>

            <!-- Preset Engagement Rings -->
            <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2" aria-labelledby="preset-engagement-heading">
                <div class="pr-4 sm:p-6 flex flex-col justify-center">
                    <h2 id="preset-engagement-heading" class="font-normal text-sm sm:text-lg md:text-2xl">Preset Engagement Rings</h2>
                    <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md min-h-[48px]">Timeless Classics.</p>
                    <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRE_SET"
                        class="mt-4 inline-block text-xs sm:text-base underline text-primary font-semibold"
                        aria-label="Search pre-set engagement rings"
                        @click="announceNavigation('Navigating to preset engagement rings search')"
                    >Search Now</NuxtLink>
                </div>
                <div>
                    <nuxt-img provider="cdn" class="w-full h-full object-cover"
                        src="/landing-pages/Custom%20Engagement%20Rings/preset-engagement-rings.webp?updatedAt=1747805508296"
                        alt="Pre-set diamond engagement rings"
                    />
                </div>
            </section>
        </div>

        <!-- Contact Links -->
        <div class="mt-8 lg:mt-16" role="region" aria-label="Contact Assistance">
            <ContactLink />
        </div>
    </div>
</template>

<script setup>
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import CustomLiveAgentForm from "~/components/form/CustomLiveAgentForm.vue";

const { $bus } = useNuxtApp();

onMounted(() => {
    $bus.emit(
        'aria-announce',
        'Custom Design Engagement Rings page loaded. You can explore inspiration, search rings, or request a custom design quote.'
    )
});

function announceNavigation(message) {
    $bus.emit('aria-announce', message)
}
</script>