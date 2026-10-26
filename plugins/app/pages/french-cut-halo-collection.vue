<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/French%20Cut%20Halo%20Collection/cushion_cut_halo_diamond_ring_5carat_land.webp?updatedAt=1747970589830`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
			alt="French Cut Halo Collection"
			>
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercasefont-normal mb-4">French
                Cut Halo Collection</h1>
            <p class="mb-8 text-sm sm:text-lg">"French cut" refers to the way the small pave diamonds are set
                into the metal. The diamond setter hand cuts small "V"s or "U's into the metal allowing the
                light to shine through each diamond with the ultimate sparkle.</p>
            <div class="flex gap-4">
                <NuxtLink
                    :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_FRENCH_CUT_RING_COLLECTION"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary text-white font-normal sm:!text-sm px-8 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90"
                    aria-label="Shop French Cut Halo Jewelry collection"
                    @click="$bus.emit('aria-announce','Navigating to French Cut Halo Jewelry collection')"
                >
                    Shop Halo Jewelry
                </NuxtLink>
            </div>
        </Banner>

        <!-- French Cut Halo Engagement Rings -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="french-cut-halo-engagement-rings-heading">
            <div class="relative h-80 lg:h-[398px] flex items-center">
                <NuxtLink
                    :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_FRENCH_CUT_RING_COLLECTION"
                    class="absolute inset-0 z-10"
                    aria-label="Shop French Cut Halo Engagement Rings"
                    @click="$bus.emit('aria-announce','Navigating to French Cut Halo Engagement Rings collection')"
                />
                <div
                    class="absolute p-4 left-0 m-4 sm:ml-8 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center md:justify-start shadow-banner">
                    <div class="max-w-sm w-full px-4 text-center md:text-left">
                        <h2 id="french-cut-halo-engagement-rings-heading" class="text-lg md:text-xl lg:text-3xl font-normal">French Cut Halo Engagement Rings</h2>
                        <p class="mt-2 text-sm sm:text-base">French Cut Pavé setting style is meant to show as little metal as
                            possible. Surrounding a center diamond with a halo in this setting style, enlarges the
                            appearance of the center stone and maximizes the sparkle.</p>
                        <Link
                            :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_FRENCH_CUT_RING_COLLECTION"
                            class="text-sm sm:text-base text-primary font-medium mt-3 uppercase font-gill-sans tracking-[0.125rem] focus:outline-none focus:ring-2 focus:ring-primary inline-block"
                            aria-label="Shop French Cut Halo Rings"
                            @click="$bus.emit('aria-announce','Navigating to French Cut Halo Rings collection')"
                        >
                            Shop Halo Ring
                        </Link>
                    </div>
                </div>
                <nuxt-img provider="cdn" src="/landing-pages/French%20Cut%20Halo%20Collection/french-cut-halo-engagement-ring-banner.webp?updatedAt=1747970770600"
                    class="w-full h-full object-cover" alt="French Cut Halo Engagement Rings"/>
            </div>
        </section>

        <!-- Thin Band Engagement Rings -->
        <section class="pt-8 lg:pt-16 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 space-y-5 sm:space-y-9" aria-labelledby="french-cut-halo-jewelry-heading">
            <h2 id="french-cut-halo-jewelry-heading" class="sr-only">
                French Cut Halo Earrings and Pendants
            </h2>
            <div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                <div class="relative flex flex-col">
                    <NuxtLink
                        :to="STATIC_ROUTES.EARRINGS_SEARCH_FRENCH_CUT"
                        class="absolute inset-0 z-10"
                        aria-label="Shop French Cut Halo Earrings"
                        @click="$bus.emit('aria-announce','Navigating to French Cut Halo Earrings collection')"
                    />
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/French%20Cut%20Halo%20Collection/french-cut-halo-earrings.webp?updatedAt=1747970769218"
                            alt="French Cut Halo Earrings"/>
                    </div>
                    <div class="bg-white/70 backdrop-blur p-2 sm:pt-4">
                        <h2 class="font-normal text-sm sm:text-lg md:text-xl truncate">French Cut Halo Earrings</h2>
                        <NuxtLink
                            :to="STATIC_ROUTES.EARRINGS_SEARCH_FRENCH_CUT"
                            class="text-sm sm:text-base underline text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Shop French Cut Halo Earrings"
                            @click="$bus.emit('aria-announce','Navigating to French Cut Halo Earrings collection')"
                        >
                            Shop Halo Earrings
                        </NuxtLink>
                    </div>
                </div>
                <div class="relative flex flex-col">
                    <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH_FRENCH_CUT"
                        class="absolute inset-0 z-10"
                        aria-label="Shop French Cut Halo Pendants"
                        @click="$bus.emit('aria-announce','Navigating to French Cut Halo Pendants collection')"
                    />
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/French%20Cut%20Halo%20Collection/pear_diamond_halo_necklace_sq.webp?updatedAt=1747970769035"
                            alt="French Cut Halo Pendantse"/>
                    </div>
                    <div class="bg-white/70 backdrop-blur p-2 sm:pt-4">
                        <h2 class="font-normal text-sm sm:text-lg md:text-xl truncate">French Cut Halo Pendants</h2>
                        <NuxtLink
                            :to="STATIC_ROUTES.NECKLACES_SEARCH_FRENCH_CUT"
                            class="text-sm sm:text-base underline text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Shop French Cut Halo Pendants"
                            @click="$bus.emit('aria-announce','Navigating to French Cut Halo Pendants collection')"
                        >
                            Shop Halo Pendants
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- "Frequently Asked Questions -->
        <Faq heading="French Cut Halo Diamond Jewelry" :faqItems="faqItems" />
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import Link from "~/components/ui/Link.vue";
import Faq from "~/components/landing/Faq.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name: "FrenchCutHaloCollection",
    components: { Banner, Link, Faq },
    data() {
        return {
            STATIC_ROUTES,
            faqItems: [
                {
                    question: "Are Halo Engagement Rings a Trend?",
                    answer:
                        "Halo engagement rings have been on trend for decades. Some of our favorite celebrity halo engagement rings include Princess Diana's sapphire and diamond halo engagement ring, Khloé Kardashian's radiant halo ring, and Sofia Vergara's dainty halo ring. The halos on these rings are very different from each other, yet each one is elegant and has since become a classic look. So while you may consider Halo Engagement Rings a trend, we consider engagement rings with a halo classic beauties that will never go out of style.",
                    link: "https://www.adiamor.com/blog/style-and-fashion/will-engagement-rings_halo-go-out-of-style-what-you-need-to-know-before-you-buy",
                    linkText: "Halo Rings Learn More",
                },
                {
                    question: "What Is French Cut Pavé?",
                    answer:
                        'French Cut Pavé is a setting style in which the metal of the ring is hand carved into "U"s or "V"s in the exact size of the diamond that is being used. Prongs are formed at the top of the U or V and secure the diamond in place. This allows light to pass through more of the diamond, producing maximum sparkle and minimal appearance of metal. At Adiamor, this technique is completed entirely by hand and takes 2-3 times longer to complete than traditional pave.',
                    link: "https://www.adiamor.com/blog/education/what-is-french-cut-pave",
                    linkText: "Learn More",
                },
                {
                    question: "What is a Diamond Halo?",
                    answer:
                        "A diamond halo is made of smaller diamonds encircling a larger center stone. At Adiamor, all of our diamond halos are custom made specifically to the size of the center stone that is being set. This guarantees a seamless fit.",
                    link: "https://www.adiamor.com/blog/engagement-rings/5-tips-to-choose-the-perfect-halo-engagement-ring",
                    linkText: "Learn More",
                },
            ]
        };
    },
    mounted() {
        this.$bus.emit(
            "aria-announce",
            "French Cut Halo Collection page loaded"
        );
    },
};
</script>