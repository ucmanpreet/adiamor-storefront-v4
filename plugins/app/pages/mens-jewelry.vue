<template>
    <div>
		<Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/mensjewelery-wide.png?updatedAt=1746137278986`"
			:contentBackgroundColor="`bg-black/70`"
			:contentTextColor="`text-white`"
            alt="Men's Jewelry Collection Banner"
        >
			<h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Men's Jewelry</h1>
			<p class="mb-8 text-sm sm:text-lg lg:text-xl">Shop men's wedding rings available in Diamond, Classic, Dual Finish, and Contemporary styles.</p>
			<div class="flex gap-4">
				<NuxtLink
                    :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary text-white font-normal sm:text-sm px-8 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90"
                    @click="$bus.emit('aria-announce', 'Navigated to all men\'s wedding rings search')">
                    Search All Men&#39;s Rings
                </NuxtLink>
			</div>
		</Banner>

        <!-- Shop Jewelery by Category -->
		<ShopJeweleryByCategory :items="items" title="Men's Accessories" :description="`Discover key rings, money clips and cuff links in stainless steel and sterling silver.`" :classList="'sm:grid-cols-3'"/>

        <!-- Diamond Brand -->
		<section aria-labelledby="mens-collections-heading" class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16">
			<h2 id="mens-collections-heading" class="sr-only">Men's Jewelry Collections</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 gap-2 sm:gap-4 lg:gap-8">
				<article class="relative sm:row-span-3 flex flex-col border border-gray-200">
					<NuxtLink 
                        :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS" 
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Diamond Bands collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Diamond Bands collection')">
                    </NuxtLink>
					<div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/mens_diamondband.jpg?updatedAt=1746137279947" alt="Luxurious men&#39;s diamond bands collection showcase"/>
					</div>
					<div class="p-4 absolute backdrop-blur-sm bg-white/60 inset-x-0 bottom-0 flex flex-col items-center">
						<h3 class="font-normal text-sm sm:text-lg md:text-xl lg:text-3xl">Diamond Bands</h3>
						<p class="mt-1 text-xs lg:text-base">Luxurious men's bands in a variety of diamond styles.</p>
					</div>
				</article>
				<article class="relative sm:col-start-2 flex items-center">
					<NuxtLink 
                        :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_UNIQUE" 
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Unique Bands collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Unique Bands collection')">
                    </NuxtLink>
					<div class="relative w-full h-full flex-1 border border-gray-200">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/mens_uniqueband.jpg?updatedAt=1746137279933" alt="Unique men&#39;s wedding bands collection showcase"/>
					</div>
					<div class="relative flex flex-col flex-1 p-4 lg:p-6">
						<h3 class="font-normal text-sm sm:text-lg md:text-xl">Unique Bands</h3>
						<p class="mt-3 text-xs sm:text-sm line-clamp-2">Creative Ideas for Unforgettable Gifts for Your Loved Ones.</p>
                        <span class="mt-3 underline text-xs md:text-sm">Read More</span>
					</div>
				</article>
				<article class="relative sm:col-start-2 flex items-center">
					<NuxtLink 
                        :to="STATIC_ROUTES.BRACELETS_SEARCH_MENS" 
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Men's Bracelets collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Men\'s Bracelets collection')">
                    </NuxtLink>
					<div class="relative w-full h-full flex-1 border border-gray-200">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/mens_bracelet.jpg?updatedAt=1746137279789" alt="Men&#39;s bracelets collection showcase"/>
					</div>
					<div class="relative flex flex-col flex-1 p-4 lg:p-6">
						<h3 class="font-normal text-sm sm:text-lg md:text-xl">Men&#39;s Bracelets</h3>
						<p class="mt-3 text-xs sm:text-sm line-clamp-2">Explore our collection of men's bracelets in a variety of styles.</p>
                        <span class="mt-3 underline text-xs md:text-sm">Read More</span>
					</div>
				</article>
				<article class="relative sm:col-start-2 flex items-center">
					<NuxtLink 
                        :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS" 
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Explore Metal Bands collection"
                        @click="$bus.emit('aria-announce', 'Navigated to Metal Bands collection')">
                    </NuxtLink>
					<div class="relative w-full h-full flex-1 border border-gray-200">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/mens_metalband.jpg?updatedAt=1746137280092" alt="Men's metal wedding bands collection showcase"/>
					</div>
					<div class="relative flex flex-col flex-1 p-4 lg:p-6">
						<h3 class="font-normal text-sm sm:text-lg md:text-xl">Metal Bands</h3>
						<p class="mt-3 text-xs sm:text-sm line-clamp-2">Explore our collection of metal bands in a variety of metals and styles.</p>
                        <span class="mt-3 underline text-xs md:text-sm">Read More</span>
					</div>
				</article>
			</div>
		</section>

		<div class="pt-8 lg:pt-16" role="region"
            aria-label="Contact Assistance">
			<ContactLink />
		</div>
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import ShopJeweleryByCategory from "~/components/carousel/ShopJeweleryByCategory.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import staticData from "~/static/js/searchHeading";
export default {
	name: "MensJewelryPage",
	components: { Banner, ShopJeweleryByCategory, ContactLink },
	data() {
		return {
            STATIC_ROUTES,
			product: {},
			items: [
				{
					title: 'Money Clips',
					link: STATIC_ROUTES.GIFTS_SEARCH_MONEY_CLIPS,
					image: '/landing-pages/heros/money-clips.png'
				},
				{
					title: 'Cuff links',
					link: STATIC_ROUTES.GIFTS_SEARCH_CUFF_LINKS,
					image: '/landing-pages/heros/cuff-links.png'
				},
				{
					title: 'Key Rings',
					link: STATIC_ROUTES.GIFTS_SEARCH_KEY_RINGS,
					image: '/landing-pages/heros/key-rings.png'
				},
				// {
				// 	title: 'Chains',
				// 	link: 'https://www.adiamor.com',
				// 	image: assetUrl('~/assets/images/category/chains.webp')
				// }
			],
		};
	},
	mounted() {
        // Page load announcement for screen readers
        this.$nextTick(() => {
            this.$bus.emit('aria-announce', 'Welcome to Men\'s Jewelry page featuring diamond bands, unique bands, bracelets, and metal bands');
        });
    }
};
</script>