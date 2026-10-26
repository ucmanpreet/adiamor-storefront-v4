<template>
    <div aria-labelledby="design-earrings-heading">
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/design-your-own-stud-earrings.jpg`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
			alt="Design Your Own Earrings"
			>
            <h1
                id="design-earrings-heading"
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase font-normal mb-4">
                Design Your Own Earrings</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">
                Design a custom diamond earrings in 3 easy steps: select the shape of diamond and setting style,
                choose a diamond for your earrings and then place your order.
            </p>
        </Banner>

        <!-- Design Your Own -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 md:space-y-12"
            aria-labelledby="earring-design-steps"
        >
            <header class="col-span-full mx-auto text-center">
                <h2 id="earring-design-steps" class="text-lg md:text-xl lg:text-5xl font-normal">Design Your Own Earrings</h2>
                <p class="mt-3 text-sm md:text-lg max-w-3xl mx-auto">
                    Select the style and shape you like - traditional,
                    four-prong, modern three-prong, or sleek bezel set then set your budget to begin searching for the
                    perfect matched pair of certified diamonds to fit your setting.
                </p>
            </header>

            <div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                <!-- Diamond Pair -->
                <article class="relative flex flex-col space-y-4">
                    <div class="relative aspect-video w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/dyoring_diamondpair.jpeg?updatedAt=1748316627369" alt="Start with a Diamond"/>
                    </div>
                    <div class="relative flex flex-col text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-3xl truncate">Start with a Diamond Pair
                        </h3>
                        <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md mx-auto">Search through our vast selection of AGS & GIA certified diamonds to find your perfect diamond pair.</p>
                        <div>
                            <NuxtLink
                                :to="STATIC_ROUTES.DIAMONDS_SEARCH_PAIR"
                                class="inline-block mt-4 px-8 py-[0.563rem] text-xs sm:text-sm
                                        font-medium uppercase tracking-[0.125rem]
                                        bg-primary text-white hover:bg-primary/90
                                        focus-visible:outline-none focus-visible:ring-2
                                        focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                Search Diamonds
                            </NuxtLink>
                        </div>
                    </div>
                </article>

                <!-- Start with a Setting -->
                <article class="relative flex flex-col space-y-4">
                    <div class="relative aspect-video w-full grow flex-1 overflow-hidden">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/dyoring_earrings.jpeg?updatedAt=1748316627309"
                            alt="Diamond stud earring setting without center stones"
                            loading="lazy"
                        />
                    </div>
                    <div class="relative flex flex-col text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-3xl">Start with a Setting</h3>
                        <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md mx-auto md:min-h-[48px]">Browse our
                            assortment of unique earring settings.</p>
                        <div>
                            <NuxtLink
                                :to="STATIC_ROUTES.DESIGN_SEARCH_EARRINGS"
                                class="inline-block mt-4 px-8 py-[0.563rem] text-xs sm:text-sm
                                        font-medium uppercase tracking-[0.125rem]
                                        bg-primary text-white hover:bg-primary/90
                                        focus-visible:outline-none focus-visible:ring-2
                                        focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                Search Earring Settings
                            </NuxtLink>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <!-- Presets -->
        <div class="py-8 md:py-16 space-y-4 sm:space-y-9">
            <!-- Preset Diamond Stud Earrings -->
            <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2" aria-labelledby="preset-earrings-heading">
                <div class="max-h-80 overflow-hidden border border-gray-200">
                    <nuxt-img provider="cdn" class="w-full h-full object-contain"
                        src="/landing-pages/heros/diamond-earrings-home-block.jpg?updatedAt=1746137188361"
                        alt="Preset Diamond Stud Earrings"/>
                </div>
                <div class="pl-4 sm:p-6 flex flex-col justify-center">
                    <h2 id="preset-earrings-heading" class="font-normal text-sm sm:text-lg lg:text-2xl">Preset Diamond Stud Earrings</h2>
                    <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md min-h-[48px]">Add the perfect touch of
                        sparkle to any outfit with these diamond studs.</p>
                    <NuxtLink
                        :to="STATIC_ROUTES.EARRINGS_SEARCH_PRE_SET"
                        class="mt-4 inline-block underline text-primary font-semibold
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Search Now
                    </NuxtLink>
                </div>
            </section>

            <!-- Search through our selection of classic diamond stud earrings and fashion earrings. -->
            <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2" aria-labelledby="search-earrings-heading">
                <div class="pr-4 sm:p-6 flex flex-col justify-center">
                    <h2 id="search-earrings-heading" class="font-normal text-sm sm:text-lg lg:text-2xl">
                        Search through our selection of classic diamond stud earrings and fashion earrings.
                    </h2>
                    <NuxtLink
                        :to="STATIC_ROUTES.EARRINGS_SEARCH_STUD"
                        class="mt-4 inline-block underline text-primary font-semibold
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Search Now
                    </NuxtLink>
                </div>
                <div class="max-h-80 overflow-hidden border border-gray-200">
                    <nuxt-img provider="cdn" class="w-full h-full object-cover"
                        src="/landing-pages/heros/diajel_earrings.jpg?updatedAt=1746137188387"
                        alt="Collection of classic and fashion diamond earrings"
                        loading="lazy"
                    />
                </div>
            </section>
        </div>

        <!-- Contact Links -->
        <ContactLink />
    </div>
</template>
<script>
import Banner from "~/components/ui/Banner.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : "EarringsPage",
    components: { Banner, ContactLink },
    data() {
        return {
            STATIC_ROUTES
        }
    },
    mounted() {
        if (import.meta.client) {
            this.$bus.emit(
                "aria-announce",
                "Design Your Own Earrings page loaded. Choose a diamond pair or setting to begin."
            )
        }
    }
}
</script>