<template>
    <div aria-labelledby="design-pendant-heading">
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/design-your-own-halo-pendant.jpg`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            :imgPosition="`object-left`"
			alt="Custom diamond pendant design banner"
			>
            <h1
                id="design-pendant-heading"
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase font-normal mb-4">
                Design Your Own Pendant
            </h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">
                Design a custom diamond pendant in 3 easy steps: select the shape of
                diamond and setting style, choose a diamond for your pendant and then place your order.
            </p>
        </Banner>

        <!-- Design Your Own -->
		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 md:space-y-12"
            aria-labelledby="design-steps-heading"
        >
			<header class="col-span-full mx-auto text-center">
				<h2 id="design-steps-heading" class="text-lg md:text-xl lg:text-5xl font-normal">Design Your Own Pendant</h2>
				<p class="mt-3 text-sm md:text-lg max-w-3xl mx-auto">
                    Choose a truly unique diamond and pair it with one of our beautifully crafted settings to
                    design a pendant that reflects your personal style. A timeless piece made just for you—or someone special—that will be treasured forever.
                </p>
			</header>

			<div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
				<div class="relative flex flex-col space-y-4">
					<div class="relative w-full grow flex-1">
						<nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/dyoring_diamond.jpeg?updatedAt=1748318281837"
                            alt="Loose certified diamond ready for pendant selection"
                            loading="lazy"
                        />
					</div>

					<div class="relative flex flex-col text-center">
						<h3 class="font-normal text-sm sm:text-lg md:text-xl lg:text-3xl">Start with a Diamond</h3>
						<p class="mt-1 text-xs sm:text-base max-w-md mx-auto">
                            Search through our vast selection of AGS & GIA certified diamonds
                            to find your perfect match.
                        </p>
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
				</div>

                <!-- Start with a Setting -->
				<div class="relative flex flex-col space-y-4">
					<div class="relative w-full grow flex-1 max-h-[427.42px] overflow-hidden">
						<nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/neweduc_finejewelry.jpg?updatedAt=1746137281605"
                            alt="Diamond pendant setting without center stone"
                            loading="lazy"
                        />
					</div>
					<div class="relative flex flex-col text-center">
						<h2 class="font-normal text-sm sm:text-lg md:text-xl lg:text-3xl">Start with a Setting</h2>
						<p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md mx-auto md:min-h-[48px]">Browse our assortment of unique pendant settings.</p>
						<div>
                            <NuxtLink
                                :to="STATIC_ROUTES.DESIGN_SEARCH_NECKLACES"
                                class="inline-block mt-4 px-8 py-[0.563rem] text-xs sm:text-sm
                                        font-medium uppercase tracking-[0.125rem]
                                        bg-primary text-white hover:bg-primary/90
                                        focus-visible:outline-none focus-visible:ring-2
                                        focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                Search Pendant Settings
                            </NuxtLink>
                        </div>
					</div>
				</div>
			</div>
		</section>

        <section class="py-8 md:py-16 space-y-6 sm:space-y-9" aria-labelledby="preset-pendant-heading">
            <!-- Preset Diamond Pendants -->
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2">
                <div class="max-h-80 overflow-hidden">
                    <nuxt-img provider="cdn" class="w-full h-full object-cover" src="/landing-pages/heros/preset.png?updatedAt=1748324849913" alt="Preset Diamond Pendants"/>
                </div>
                <div class="pl-4 sm:p-6 flex flex-col justify-center">
                    <h2 id="preset-pendant-heading" class="font-normal text-sm sm:text-lg lg:text-2xl">Preset Diamond Pendants</h2>
                    <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md min-h-[48px]">Simply stunning, these pre-set diamond pendants will take your breath away.</p>
                    <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH_PRE_SET"
                        class="mt-4 inline-block underline text-primary font-semibold
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Search Now
                    </NuxtLink>
                </div>
            </div>

            <!-- Search through our selection of classic diamond Pendants and fashion earrings. -->
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 grid grid-cols-2">
                <div class="pr-4 sm:p-6 flex flex-col justify-center">
                    <h2 class="font-normal text-sm sm:text-lg lg:text-2xl">Our collection of pendants features classic and modern designs.</h2>
                    <p class="mt-1 text-xs sm:text-base line-clamp-2 max-w-md min-h-[48px]">Discover an exquisite range of styles that suit every taste and occasion.</p>
                    <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH_PRE_SET"
                        class="mt-4 inline-block underline text-primary font-semibold
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Search Now
                    </NuxtLink>
                </div>
                <div class="max-h-80 overflow-hidden border border-gray-200">
                    <nuxt-img provider="cdn" class="w-full h-full object-contain"
                        src="/landing-pages/heros/dyopendant_searchpendant.jpg?updatedAt=1748325077482"
                        alt="Collection of classic and modern diamond pendants"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>

        <!-- Contact Links -->
		<ContactLink />
    </div>
</template>
<script setup>
import Banner from "~/components/ui/Banner.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const { $bus } = useNuxtApp();

onMounted(() => {
    if (import.meta.client) {
        $bus.emit(
            "aria-announce",
            "Design Your Own Pendant page loaded. Choose a diamond or setting to begin."
        )
    }
});
</script>
