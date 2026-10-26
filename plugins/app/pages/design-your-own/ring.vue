<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/design-your-own-halo-ring.jpg`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
			alt="Design Your Own Earrings"
			>
            <h1
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase font-normal mb-4">
                Design Your Own Ring</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Design a custom diamond ring in 3 easy steps: select the shape of diamond and setting style, choose a diamond for your ring and then place your order.</p>
        </Banner>

        <!-- Design Your Own -->
		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 md:space-y-12"
            aria-labelledby="design-steps-heading"
        >
			<header class="col-span-full mx-auto text-center">
				<h2 id="design-steps-heading" class="text-lg md:text-xl lg:text-5xl font-normal">Design Your Own Engagement Ring</h2>
				<p class="mt-3 text-sm md:text-lg max-w-3xl mx-auto">Match a one-of-a-kind diamond with one of our unique engagement settings to create a timeless diamond engagement ring that will be adored for years to come.</p>
			</header>

            <div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">

                <!-- Start with a Diamond -->
				<article class="relative flex flex-col space-y-4">
					<div class="relative w-full h-full grow flex-1">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/dyoring_diamond7.jpeg?updatedAt=1748329347741" alt="Loose certified diamond ready for selection"/>
					</div>
					<div class="relative flex flex-col text-center">
						<h3 class="font-normal text-sm sm:text-lg md:text-xl lg:text-3xl">Start with a Diamond</h3>
						<p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md mx-auto">Search through our vast selection of AGS & GIA certified diamonds to find your perfect diamond.</p>
						<div>
                            <NuxtLink
                                :to="STATIC_ROUTES.DIAMONDS_SEARCH"
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
					<div class="relative w-full h-full grow flex-1 overflow-hidden">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/dyoring_ring2.jpeg?updatedAt=1748329347776" alt="Start with a Setting"/>
					</div>
					<div class="relative flex flex-col text-center">
						<h2 class="font-normal text-sm sm:text-lg md:text-xl lg:text-3xl">Start with a Setting</h2>
						<p class="mt-1 text-xs sm:text-base line-clamp-2 mx-auto max-w-md md:min-h-[48px]">Browse our assortment of unique engagement ring settings.</p>
						<div>
                            <NuxtLink
                                :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
                                class="inline-block mt-4 px-8 py-[0.563rem] text-xs sm:text-sm
                                    font-medium uppercase tracking-[0.125rem]
                                    bg-primary text-white hover:bg-primary/90
                                    focus-visible:outline-none focus-visible:ring-2
                                    focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Search Ring Settings
                            </NuxtLink>
                        </div>
					</div>
				</article>
			</div>
		</section>

        <!-- Diamond Engagement Rings Section -->
        <section class="py-8 md:py-16 space-y-4 sm:space-y-9" aria-labelledby="diamond-engagement-heading">
            <!-- Diamond Engagement Rings -->
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2">
                <div class="pr-4 sm:p-6 flex flex-col justify-center">
                    <h2 id="diamond-engagement-heading" class="font-normal text-sm sm:text-lg md:text-2xl">Diamond Engagement Rings</h2>
                    <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md min-h-[48px]">Search through our vast assortment of handcrafted engagement ring settings.</p>
                    <NuxtLink
                        :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_DIAMOND"
                        class="mt-4 inline-block text-xs sm:text-base underline text-primary font-semibold
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Learn More
                        <span class="sr-only"> about Diamond Engagement Rings</span>
                    </NuxtLink>
                </div>
                <div>
                    <nuxt-img provider="cdn"
                        class="w-full h-full object-cover"
                        src="/landing-pages/heros/educ_newengagement.jpg?updatedAt=1746137196865"
                        alt="Handcrafted diamond engagement ring setting"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>

        <!-- Contact Links -->
		<ContactLink />
    </div>
</template>
<script>
import Banner from "~/components/ui/Banner.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : "RingPage",
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
            "Design Your Own Ring page loaded. Choose a diamond or setting to begin."
        )
        }
    }
}
</script>