<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/Bold%20Gold%20Collection/bold-gold-banner.webp?updatedAt=1747970012958`"
			:contentPosition="'right'"
            :contentBackgroundColor="`bg-black/70 sm:bg-transparent`"
            :contentTextColor="`text-white`"
            alt="Bold Gold Collection Banner"
			>
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercasefont-normal mb-4">Bold Gold</h1>
            <p class="text-sm sm:text-lg">We've curated and designed the best on trend jewelry pieces to add to your collection. Statement rings, bold chains and the perfect hoops can be styled with everything from lounge wear to dressing up. Our Bold Gold Collection is made of 100% 14k Gold, not gold plated, and will not tarnish poolside or during your workout. We believe that luxury can be accessible. Just as we've done with engagement rings for over 20 years, this collection is offered to everyone without crazy markups.</p>
        </Banner>

        <!-- Bold Gold Collections -->
        <div class="pt-8 lg:pt-16 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 space-y-5 sm:space-y-9" aria-label="Bold Gold Jewelry Categories">
            <div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                <div class="relative flex flex-col sm:space-y-4">
                    <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH_BOLD_GOLD"
                        class="absolute inset-0 z-10"
                        aria-label="Shop Bold Gold Earrings Collection"
                        @click="announceNavigation('Bold Gold Earrings collection page loaded')"
                    ></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/Bold%20Gold%20Collection/bold-gold-earrings.webp?updatedAt=1747970012680" alt="Bold Gold Earrings"/>
                    </div>
                    <div class="bg-white/70 backdrop-blur p-2">
                        <h2 class="font-normal text-sm sm:text-lg md:text-xl">Bold Gold Earrings</h2>
                        <span class="text-sm sm:text-base underline text-primary font-medium">Shop Now</span>
                    </div>
                </div>
                <div class="relative flex flex-col sm:space-y-4">
                    <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH_BOLD_GOLD"
                        class="absolute inset-0 z-10"
                        aria-label="Shop Bold Gold Necklaces Collection"
                        @click="announceNavigation('Bold Gold Necklaces collection page loaded')"
                    ></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/Bold%20Gold%20Collection/bold-gold-necklaces.webp?updatedAt=1747970012537" alt="Bold Gold Necklaces"/>
                    </div>
                    <div class="bg-white/70 backdrop-blur p-2">
                        <h2 class="font-normal text-sm sm:text-lg md:text-xl">Bold Gold Necklaces</h2>
                        <span class="text-sm sm:text-base underline text-primary font-medium">Shop Now</span>
                    </div>
                </div>
                <div class="relative flex flex-col sm:space-y-4">
                    <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_BOLD_GOLD"
                        class="absolute inset-0 z-10"
                        aria-label="Shop Bold Gold Rings Collection"
                        @click="announceNavigation('Bold Gold Rings collection page loaded')"
                    ></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/Bold%20Gold%20Collection/bold-gold-rings.webp?updatedAt=1747970107724" alt="Bold Gold Rings"/>
                    </div>
                    <div class="bg-white/70 backdrop-blur p-2">
                        <h2 class="font-normal text-sm sm:text-lg md:text-xl">Bold Gold Rings</h2>
                        <span class="text-sm sm:text-base underline text-primary font-medium">Shop Now</span>
                    </div>
                </div>
                <div class="relative flex flex-col sm:space-y-4">
                    <NuxtLink :to="STATIC_ROUTES.BRACELETS_SEARCH_BOLD_GOLD"
                        class="absolute inset-0 z-10"
                        aria-label="Shop Bold Gold Bracelets Collection"
                        @click="announceNavigation('Bold Gold Bracelets collection page loaded')"
                    ></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/Bold%20Gold%20Collection/bold-gold-bracelets.webp?updatedAt=1747970012873" alt="Bold Gold Bracelets"/>
                    </div>
                    <div class="bg-white/70 backdrop-blur p-2">
                        <h2 class="font-normal text-sm sm:text-lg md:text-xl">Bold Gold Bracelets</h2>
                        <span class="text-sm sm:text-base underline text-primary font-medium">Shop Now</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shop Our Socials -->
        <div class="-mt-8 lg:-mt-16" aria-label="Shop Our Social Media">
            <ShopSocials :bgColor="'bg-white'" :textColor="'text-gray-black'" />
        </div>

        <!-- Engagement Ring Guide -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-8 lg:py-16" aria-labelledby="essentials-heading">
            <div class="relative h-60 lg:h-[398px] flex items-center">
                <div
                    class="absolute p-4 right-0 inset-y-0 bg-[#b7b7b7]/60 backdrop-blur-sm z-10 flex items-center justify-center w-1/2">
                    <div class="max-w-sm w-full px-4 text-center md:text-left">
                        <h2 class="text-lg md:text-xl lg:text-3xl font-normal" id="essentials-heading">The Essentials</h2>
                        <p class="mt-2 text-sm lg:text-base">Must have pieces that never sit in your jewelry box cuz you wear 'em so much!!</p>
                        <div>
                            <NuxtLink
                                :to="diamondJewelry"
                                class="inline-block mt-6 px-6 font-medium mx-auto md:ml-0 py-[0.563rem] text-xs focus:outline-none focus:ring-1 bg-primary text-white hover:bg-primary/90 focus:ring-primary uppercase font-gill-sans tracking-[0.125rem]" @click="announceNavigation('Diamond Jewelry collection page loaded')"
                            >Shop Now</NuxtLink>
                        </div>
                    </div>
                </div>
                <nuxt-img provider="cdn" src="/landing-pages/Bold%20Gold%20Collection/the-essentials.webp?updatedAt=1747970238103"
                    class="w-full h-full object-cover"
                    alt="Gold jewelry essentials collection showcase"/>
            </div>
        </section>
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import ShopSocials from "~/components/common/ShopSocials.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name: "BoldGoldCollectionPage",
    components: { Banner, ShopSocials },
    data() {
        return {
            STATIC_ROUTES,
            diamondJewelry: STATIC_ROUTES.DIAMOND_JEWELRY
        };
    },
    mounted() {
        this.$bus.emit(
            'aria-announce',
            'Bold Gold Collection page loaded. Browse earrings, necklaces, rings and bracelets.'
        )
    },
    methods: {
        announceNavigation(message) {
            this.$bus.emit('aria-announce', message)
        }
    }
};
</script>