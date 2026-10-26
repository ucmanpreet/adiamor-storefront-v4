<template>
    <div id="main-content">
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/jewelry-wide.png?updatedAt=1746137274180`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            alt="Fine Jewelry Including rings, earrings, pendants, and more crafted in a variety of metals and styles."
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4" tabindex="-1">
                Fine Jewelry
            </h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">
                Including rings, earrings, pendants, and more crafted in a variety of metals and styles.
            </p>
        </Banner>

        <!-- Shop Jewelry by Category -->
        <ShopJeweleryByCategory :items="items" :imagePosition="`!object-contain`"/>

        <!-- Explore Our Collections -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 md:space-y-12" aria-labelledby="collections-heading">
            <header class="col-span-full max-w-3xl mx-auto text-center">
                <h2 id="collections-heading" class="text-lg md:text-xl lg:text-3xl font-normal">Elegant Essentials & Signature Styles</h2>
                <p class="mt-1 text-sm lg:text-lg">Discover standout pieces from gemstone earrings to stackable rings and classic pearls — designed to elevate every look.</p>
            </header>
            <div class="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">
                <!-- Gemstone Earrings -->
                <article class="relative flex flex-col border border-gray-200 h-40 sm:h-auto group">
                    <NuxtLink
                        :to="STATIC_ROUTES.EARRINGS_SEARCH_GEMSTONE"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Gemstone Earrings collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Gemstone Earrings collection')">
                    </NuxtLink>
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-bottom"
                            src="/landing-pages/heros/jewelry_gemearrings.jpg?updatedAt=1746137274722"
                            alt="Gemstone earrings collection showcase"
                            width="400" height="300" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-xl">Gemstone Earrings</h3>
                    </div>
                </article>

                <!-- Fashion Pendants -->
                <article class="relative flex flex-col border border-gray-200 h-40 sm:h-auto group">
                    <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Fashion Pendants collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Fashion Pendants collection')">
                    </NuxtLink>
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-bottom"
                            src="/landing-pages/heros/jewelry_pendant3.jpg?updatedAt=1746137275089"
                            alt="Fashion pendants collection showcase"
                            width="400" height="300" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-xl">Fashion Pendants</h3>
                    </div>
                </article>

                <!-- Stackable Rings -->
                <article class="relative flex flex-col border border-gray-200 h-40 sm:h-auto group">
                    <NuxtLink
                        :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_DIAMOND_ACCENTED"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Stackable Rings collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Stackable Rings collection')">
                    </NuxtLink>
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-bottom"
                            src="/landing-pages/heros/jewelry_stackedrings.jpg?updatedAt=1746137276033"
                            alt="Stackable rings collection showcase"
                            width="400" height="300" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-xl">Stackable Rings</h3>
                    </div>
                </article>

                <!-- Pearl Jewelry -->
                <article class="relative flex flex-col border border-gray-200 h-40 sm:h-auto group">
                    <NuxtLink
                        :to="STATIC_ROUTES.JEWELRY_SEARCH_PEARL"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Pearl Jewelry collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Pearl Jewelry collection')">
                    </NuxtLink>
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-bottom"
                            src="/landing-pages/heros/jewelry_pearl.jpg?updatedAt=1746137275070"
                            alt="Pearl jewelry collection showcase"
                            width="400" height="300" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-xl">Pearl Jewelry</h3>
                    </div>
                </article>

                <!-- French Cut Halo Collection -->
                <article class="relative col-end-auto col-span-2 row-span-2 flex flex-col group">
                    <NuxtLink
                        :to="STATIC_ROUTES.FRENCH_CUT_HALO"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore French Cut Halo Collection"
                        @click="$bus.emit('aria-announce', 'Navigated to French Cut Halo Collection')">
                    </NuxtLink>
                    <div class="relative w-full h-full grow flex-1 max-h-full">
                        <nuxt-img provider="cdn"
                            class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/french_halo.jpg?updatedAt=1746137268466"
                            alt="French Cut Halo Collection featured showcase"
                            width="800" height="600" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center">
                        <h3 class="font-normal text-sm sm:text-lg lg:text-xl">French Cut Halo Collection</h3>
                        <p class="mt-3 text-xs sm:text-sm line-clamp-2">A gift of elegance</p>
                    </div>
                </article>
            </div>
        </section>

        <!-- Product Reviews -->
        <section class="pt-6 md:pb-8" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" class="sr-only">Customer Reviews</h2>
            <ReviewBottom>
                <ClientOnly><div
                    class="yotpo yotpo-shoppers-say yotpo-size-6"
                    data-product-id="EP101"
                    data-yotpo-element-id="1"
                    aria-label="Customer reviews and testimonials">
                </div></ClientOnly>
            </ReviewBottom>
        </section>
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import ShopJeweleryByCategory from "~/components/carousel/ShopJeweleryByCategory.vue";
import ReviewBottom from "~/components/landing/ReviewBottom.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
	name: "JewelryPage",
    components: { Banner, ShopJeweleryByCategory, ReviewBottom },
	data() {
		return {
			product: {},
			items: [
				{
					title: 'Rings & Bands',
					link: STATIC_ROUTES.RINGS_AND_BANDS,
					image: '/landing-pages/heros/c_ringbands.jpg'
				},
				{
					title: 'Earrings',
					link: STATIC_ROUTES.EARRINGS,
					image: '/landing-pages/heros/c_earrings.jpg'
				},
				{
					title: 'Pendants',
					link: STATIC_ROUTES.NECKLACES,
					image: '/landing-pages/heros/c_pendant.jpg'
				},
				{
					title: 'Bracelets',
					link: STATIC_ROUTES.BRACELETS,
					image: '/landing-pages/heros/c_bracelet.jpg'
				}
			],
            STATIC_ROUTES
		};
	},
    mounted() {
        // Page load announcement for screen readers
        this.$nextTick(() => {
            this.$bus.emit('aria-announce', 'Welcome to Fine Jewelry page featuring elegant essentials and signature styles');
        });
    }
};
</script>
