<template>
	<div id="main-content">
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/wedding-ring-hero.png?updatedAt=1747979712534`"
                :contentBackgroundColor="`bg-black/70`"
                :contentTextColor="`text-white`"
            :hrefLink="STATIC_ROUTES.WEDDING_RINGS_SEARCH_WOMENS"
            alt="Wedding Rings And Bands"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Wedding Rings And Bands</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Browse our collection of eternity bands, classic metal, and diamond ring styles for men and women. You're sure to find a wedding ring that is the perfect fit for your special day.</p>
            <div class="flex flex-col sm:flex-row justify-start gap-4">
                <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_WOMENS"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 text-white font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90">Shop Women’s Bands</NuxtLink>
                <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 text-white font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90">Shop Men's Bands</NuxtLink>
            </div>
        </Banner>

        <!-- Shop Jewelery by Category -->
		<ShopJeweleryByCategory :items="items" :imagePosition="`object-left`"/>

        <!-- Explore Our Collections -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 md:space-y-12">
            <header class="col-span-full max-w-3xl mx-auto text-center">
                <h2 class="text-lg md:text-xl lg:text-3xl font-normal">Celebrate with Meaningful Gifts</h2>
                <p class="mt-1 text-sm lg:text-lg">Explore timeless jewelry and thoughtful gifts for the bride, groom, and beyond — perfect for marking every special moment.</p>
            </header>
            <div class="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">
                <div class="relative flex flex-col">
                    <NuxtLink :to="STATIC_ROUTES.DIAMOND_JEWELRY" aria-label="Explore Diamond Jewelry Collections" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/diamond%20jewelry.jpeg?updatedAt=1747981516223" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Diamond Jewelry</h2>
                    </div>
                </div>
                <div class="relative flex flex-col border border-gray-200">
                    <NuxtLink :to="STATIC_ROUTES.MENS_JEWELRY" aria-label="Explore Groom's Gift Collections" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/wedding_mensjewelry.jpg?updatedAt=1746137327856" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-black/7 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Groom's Gift</h2>
                    </div>
                </div>
                <div class="relative flex flex-col">
                    <NuxtLink :to="STATIC_ROUTES.JEWELRY_SEARCH_PEARL" aria-label="Explore Pearl Jewelry Collections" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/jewelry_pearl.jpg?updatedAt=1746137275070" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-black/7 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Pearl Jewelry</h2>
                    </div>
                </div>
                <div class="relative flex flex-col">
                    <NuxtLink :to="STATIC_ROUTES.EDUCATION_GIFT_GUIDE" aria-label="Explore Bride's Gift Collections" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/bridal%20gifts.jpeg?updatedAt=1747981603202" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Bride's Gift</h2>
                    </div>
                </div>
                <div class="relative col-end-auto col-span-2 row-span-2 flex flex-col">
                    <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_ETERNITY" aria-label="Explore Eternity Bands Collections" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/eternity_ty2.jpg?updatedAt=1746137264732" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-black/7 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Eternity Bands</h2>
                        <p class="mt-3 text-xs sm:text-sm line-clamp-2">Breathtaking eternity rings in pavé, channel and shared-prong styles.</p>
                    </div>
                </div>
            </div>
        </section>

        <Faq :faqItems="faqItems" />
	</div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import ShopJeweleryByCategory from "~/components/carousel/ShopJeweleryByCategory.vue";
import Faq from "~/components/landing/Faq.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
	name: "weddingRings",
    components: { Banner, ShopJeweleryByCategory, Faq },
	data() {
		return {
            STATIC_ROUTES,
			product: {},
			showReviewData: true,
			items: [
				{
					title: 'Men\'s Wedding Rings',
                    description: 'Shop the best online selection of quality, handcrafted men\'s wedding bands and rings for your special day.   ',
					link: STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS,
					image: '/landing-pages/update/mens_wb'
				},
				{
					title: 'Women\'s Wedding Rings',
					description: 'Search through our selection of eternity bands, classic metal and diamond ring styles to find your perfect wedding ring.',
					link: STATIC_ROUTES.WEDDING_RINGS_SEARCH_WOMENS,
					image: '/landing-pages/update/wedding_rings'
				},
				// {
				// 	title: 'Matching Bridal Sets',
				// 	description: 'Shop our collection of matching engagement rings and wedding bands.',
				// 	link: '/engagement-rings/search/matched-set',
				// 	image: '/landing-pages/update/matching_bridal?updatedAt=1746457981843'
				// },
				{
					title: 'Diamond Wedding Bands',
					description: 'Find the perfect diamond wedding band for your special day. Shop thin diamond rings or your create your own diamond wedding band.',
					link: STATIC_ROUTES.WEDDING_RINGS_SEARCH_DIAMOND_ACCENTED,
					image: '/landing-pages/update/diamond_wb'
				}
			],
            faqItems: [
                {
                    question: "What is the difference between a wedding ring and an engagement ring?",
                    answer: "A wedding ring is a ring or band that is exchanged during the wedding ceremony. An engagement ring is given at the time of proposal as a promise to marry.",
                    link: STATIC_ROUTES.WEDDING_RINGS,
                    linkText: "Shop Wedding Bands"
                },
                {
                    question: "How do I select a wedding ring that sits flush with my engagement ring?",
                    answer: "Finding a wedding band that sits flush with your engagement ring starts with the engagement ring design. Most of the rings at Adiamor are flush set, those that are not can be customized to be flush set if that is a concern. Flush set engagement rings will minimally increase the overall height of the engagement ring and are specifically built to accommodate a straight wedding band. Low basket settings and most 3 stone engagement rings are designed to sit close on the hand. These styles would require a custom shadow wedding ring in order to sit flush against the engagement ring. At Adiamor we can create the perfect custom wedding band for you.",
                    link: STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE,
                    linkText: "Learn More About Wedding Bands"
                },
                {
                    question: "Should a wedding band be worn on top of or under an engagement ring?",
                    answer: "Traditionally a wedding band is worn on the ring finger under the engagement ring. This placement signifies the importance of the wedding band as it is closest to the heart of both parties and symbolic of the commitment made during the wedding ceremony.",
                    link: "https://www.adiamor.com/blog/education/how-do-people-wear-wedding-bands",
                    linkText: "Learn More About Wedding Bands"
                },
                {
                    question: "Should a couple buy matching wedding rings?",
                    answer: "Ultimately the most important factor in selecting wedding bands is personal taste. When selecting a wedding band, the choice should be more about the personal style of the wearer vs matching your partner's band exactly. Let's face it, you have to love your wedding band in order to wear it every day for the rest of your life.",
                    link: "https://www.adiamor.com/blog/diamond-rings/matching-wedding-bands",
                    linkText: "Learn More About Matching Wedding Rings"
                },
                {
                    question: "What is the best width for a men's wedding band?",
                    answer: "When deciding on the width of a men's wedding band there are several things to consider. Narrow bands are typically more comfortable, especially for those that don't typically wear rings. Bands that are 4mm and under are on the narrow side. Bands that are 5mm-6mm wide are the most popular choice for a men's wedding band. Wider rings that are 7mm or more are usually selected based on personal preferences and style. When selecting a wider band you also need to consider the actual weight of the ring. The wider the ring, the heavier it will be. A dome style band or a men's wedding band with tapered edges will appear more narrow than a ring with flat edges.",
                    link: STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS,
                    linkText: "Buy Men's Wedding Bands"
                }
            ],
		};
	},
    mounted() {
        this.$bus.emit(
            'aria-announce',
            'Wedding Rings and Bands page loaded. Browse wedding rings, diamond jewelry, and gift collections.'
        )
    }
};
</script>

