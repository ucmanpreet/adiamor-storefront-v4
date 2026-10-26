<template>
    <section class="mt-8 lg:mt-16" aria-labelledby="shop-socials-heading">
        <div :class="bgColor">
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 sm:pt-8 lg:pt-16 text-center flex flex-col sm:flex-row items-center gap-6" :class="textColor">
                <div class="flex-1 flex flex-col sm:flex-row gap-4 md:flex-col items-center sm:items-start md:items-center justify-center space-y-0 md:space-y-5 md:max-w-lg mx-auto">
                    <div class="space-y-3">
                        <h2 id="shop-socials-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Shop Our Socials</h2>
                        <p class="mt-1 text-sm leading-normal">Get inspired with the latest collection, surprise promotions, and styling tips!</p>
                        <NuxtLink :to="shoppablePath" aria-label="Visit Adiamor Diamonds on social media" class="text-lg sm:text-2xl text-inherit hover:text-inherit/90 font-normal whitespace-nowrap inline-block focus:ring-2 focus:ring-inherit focus:ring-offset-2">@adiamordiamonds</NuxtLink>
                    </div>
                </div>
                <!-- PhotoGrid -->
                <NuxtLink :to="shoppablePath" class="block flex-1">
                    <nuxt-img provider="cdn" src="/landing-pages/Top%20Engagement%20Ring%20Styles/see-us-on-social.png?updatedAt=1747975750655" alt="See us on social" class="w-full h-full" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps({
    bgColor: {
        type: String,
        default: 'bg-primary py-8 lg:py-16'
    },
    textColor: {
        type: String,
        default: 'text-white'
    }
});

const shoppablePath = STATIC_ROUTES.SHOPPABLE_SOCIALS;
</script>