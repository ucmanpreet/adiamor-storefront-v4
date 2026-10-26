<template>
	<div>
		<Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/home/adiamor-engagement-ring.jpeg?updatedAt=1776055624313`"
			:mobileImage="`https://cdn.adiamor.com/landing-pages/home/adiamor-engagement-ring-mobile.png`"
			:contentWidth="`max-w-[35rem] pt-44 pb-3 px-0 sm:p-6`"
			:contentClass="`!py-0`"
			:imgPosition="`object-[10%_top] md:object-[40%_bottom] lg:object-[35%_bottom]`"
			:contentBackgroundColor="`bg-transparent sm:bg-black/30`"
			:contentTextColor="`text-white`"
			:hrefLink="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
			alt="Design your perfect Engagement Ring"
		>
			<h1
				class="text-center sm:text-left text-3xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase font-normal mb-4">
				<span class="text-xl sm:text-3xl hidden sm:block">Design your perfect</span>
				<span class="text-xl sm:text-3xl sm:hidden">Design your ring</span>
				<span class="hidden sm:block">Engagement Ring</span>
			</h1>
			<p class="mb-4 sm:mb-8 text-xs md:text-base text-white whitespace-normal uppercase hidden sm:block">
				Made in Los Angeles &nbsp;·&nbsp; Free Shipping &nbsp;·&nbsp; 30-day Returns
			</p>
			<div class="flex flex-row items-center sm:items-stretch justify-start gap-2 sm:gap-4">
				<Link
                    :href="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
					:colorType="`dark`"
                    class="flex-1 font-normal !px-2 sm:!px-4 !py-3 font-gill-sans uppercase tracking-widest-xl hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    @click="$bus.emit('aria-announce', 'Navigating to Engagement Rings search')">
                    Engagement Rings
                </Link>
                <Link
                    :href="STATIC_ROUTES.DIAMONDS_SEARCH"
					:colorType="`dark`"
                    class="flex-1 font-normal !px-2 sm:!px-4 !py-3 font-gill-sans uppercase tracking-widest-xl hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    @click="$bus.emit('aria-announce', 'Navigating to Loose Diamonds search')">
                    Loose Diamonds
                </Link>
			</div>
		</Banner>

		<!-- As Featured In -->
		<ProductFeature type="home" />

		<!-- Shop Jewelery by Category -->
		<ShopJeweleryByCategory :items="items" />

		<!-- Shop by Shape -->
		<ShopDiamondByShape className="bg-stone-100"/>

		<!-- Your Design it, Web build it -->
		<BuildVideo />

		<!-- Photos From Our Community -->
		<PhotoGrid type="home"/>

		<!-- Certificate & Education -->
		<div
			class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-20">
			<!--Diamond Certificateion-->
			<DiamondCertifications className="space-y-6 lg:space-y-9 relative"/>

			<article class="space-y-6 lg:space-y-9" aria-labelledby="education-heading">
				<div>
					<h2 id="education-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Diamond Education</h2>
					<p class="mt-4 text-sm">Learn about the “4 C’s” to help you with your online diamond
						shopping:</p>
				</div>
				<nav aria-label="Diamond education topics" class="grid grid-cols-2 gap-2 lg:gap-x-6 md:gap-y-4">
					<Link
                        :href="STATIC_ROUTES.EDUCATION_DIAMOND_CUT"
                        colorType="bordered-primary"
                        class="flex gap-2 lg:!text-lg font-light !px-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        @click="$bus.emit('aria-announce', 'Navigated to Diamond Cut education')">
                        <Icon name="diamond" class="w-3 sm:w-5 h-3 sm:h-5 sm:hidden md:inline-flex" aria-hidden="true" />
                        <span>Diamond Cut</span>
                    </Link>
                    <Link
                        :href="STATIC_ROUTES.EDUCATION_DIAMOND_COLOR"
                        colorType="bordered-primary"
                        class="flex gap-2 lg:!text-lg font-light !px-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        @click="$bus.emit('aria-announce', 'Navigated to Diamond Color education')">
                        <Icon name="diamond" class="w-3 sm:w-5 h-3 sm:h-5 sm:hidden md:inline-flex" aria-hidden="true" />
                        <span>Diamond Color</span>
                    </Link>
                    <Link
                        :href="STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY"
                        colorType="bordered-primary"
                        class="flex gap-2 lg:!text-lg font-light !px-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        @click="$bus.emit('aria-announce', 'Navigated to Diamond Clarity education')">
                        <Icon name="diamond" class="w-3 sm:w-5 h-3 sm:h-5 sm:hidden md:inline-flex" aria-hidden="true" />
                        <span>Diamond Clarity</span>
                    </Link>
                    <Link
                        :href="STATIC_ROUTES.EDUCATION_CARAT_WEIGHT"
                        colorType="bordered-primary"
                        class="flex gap-2 lg:!text-lg font-light !px-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        @click="$bus.emit('aria-announce', 'Navigated to Carat Weight education')">
                        <Icon name="diamond" class="w-3 sm:w-5 h-3 sm:h-5 sm:hidden md:inline-flex" aria-hidden="true" />
                        <span>Carat Weight</span>
                    </Link>
				</nav>
			</article>
		</div>

		<!-- Product Reviews -->
		<section aria-labelledby="testimonials-heading"
			class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 text-center space-y-4 sm:space-y-9 home-carousel">
			<h2 id="testimonials-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Testimonials</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-16">
				<div>
					<NuxtLink
                        :to="STATIC_ROUTES.TESTIMONIALS"
                        target="_blank"
                        aria-label="Read customer testimonials"
                        class="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        @click="$bus.emit('aria-announce', 'Opened customer testimonials in new tab')">
                        <nuxt-img 
							provider="cdn"
                            src="/landing-pages/heros/home-testimonials.jpg"
                            alt="Customer testimonials image"
                            class="w-full h-full object-cover"
							format="webp"
							quality="80"
							loading="lazy"
							decoding="async"
							width="576"
							height="344"/>
                    </NuxtLink>
				</div>
				<ReviewBottom>
					<ClientOnly><div class="yotpo yotpo-reviews-carousel yotpo-size-3" data-header-customisation-enabled="1"
						data-header-customisation-color="#56575f" data-header-customisation-font-size="16"
						data-header-customisation-text="Testimonials" data-header-customisation-alignment="left"
						data-background-color="transparent" data-mode="top_rated" data-type="both" data-count="9"
						data-show-bottomline="1" data-autoplay-enabled="1" data-autoplay-speed="5000"
						data-show-navigation="1" data-testimonials-page-enabled="1"
						data-testimonials-page-text="Read customer testimonials"
						:data-testimonials-page-link="STATIC_ROUTES.TESTIMONIALS" data-yotpo-element-id="1"
						aria-label="Customer review carousel"></div></ClientOnly>
				</ReviewBottom>
			</div>
			<NuxtLink
                :to="STATIC_ROUTES.TESTIMONIALS"
                class="inline-flex items-center justify-center text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-normal px-4 py-3 font-gill-sans uppercase tracking-widest-xl bg-primary text-white hover:bg-primary/90"
                aria-label="Read more customer testimonials"
                @click="$bus.emit('aria-announce', 'Navigated to full testimonials page')">
                Read Customer Testimonials
            </NuxtLink>
		</section>

		<!-- Why Shop At Adiamor -->
		<section class="pt-8 lg:pt-16" aria-labelledby="why-shop-heading">
			<div class="py-8 bg-stone-100">
				<div
					class="relative max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 bg-stone-100/90 md:bg-transparent flex flex-col md:flex-row items-center gap-4 md:gap-8">
					<div class="w-full sm:w-96">
						<nuxt-img
							provider="cdn"
							src="/landing-pages/heros/encaseds_wooden_box.jpg"
							class="py-4 w-full h-full mix-blend-multiply"
							format="webp"
							quality="80"
							loading="lazy"
							decoding="async"
							width="576"
							height="344"
							alt="Adiamor jewelry box packaging"
						/>
					</div>
					<NuxtLink :to="STATIC_ROUTES.WHY_SHOP" @click="$bus.emit('aria-announce', 'Navigated to Why Shop At Adiamor page')">
						<div class="flex-1">
							<h2 id="why-shop-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Why Shop At Adiamor</h2>
							<ul role="list"
								class="mt-6 grid grid-cols-2 gap-4 max-w-lg md:max-w-xl lg:max-w-3xl 2xl:max-w-4xl text-xs md:text-sm lg:text-lg">
								<li class="flex gap-3 items-center">
									<Icon name="diamond" class="w-4 lg:w-6 h-4 lg:h-6 text-primary flex-none" />
									<span>Manufacturer Direct</span>
								</li>
								<li class="flex gap-3 items-center">
									<Icon name="diamond" class="w-4 lg:w-6 h-4 lg:h-6 text-primary flex-none" />
									<span>Complimentary Appraisal</span>
								</li>
								<li class="flex gap-3 items-center">
									<Icon name="diamond" class="w-4 lg:w-6 h-4 lg:h-6 text-primary flex-none" />
									<span>Complimentary Preventive Maintenance</span>
								</li>
								<li class="flex gap-3 items-center">
									<Icon name="diamond" class="w-4 lg:w-6 h-4 lg:h-6 text-primary flex-none" />
									<span>30-Days Return</span>
								</li>
								<li class="flex gap-3 items-center">
									<Icon name="diamond" class="w-4 lg:w-6 h-4 lg:h-6 text-primary flex-none" />
									<span>Complimentary Resizing for 90 Days</span>
								</li>
								<li class="flex gap-3 items-center">
									<Icon name="diamond" class="w-4 lg:w-6 h-4 lg:h-6 text-primary flex-none" />
									<span>Free Shipping Worldwide</span>
								</li>
							</ul>
						</div>
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- About & Financing -->
		<div
			class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-20">
			<article class="aspect-square relative">
				<nuxt-img
					provider="cdn"
					src="/landing-pages/home/about-adiamor"
					class="grayscale w-full h-full object-cover"
					format="webp"
					quality="80"
					loading="lazy"
					decoding="async"
					width="568"
					height="344"
					alt="About Adiamor jewelry craftsmanship"
				/>
				<div class="absolute inset-x-0 top-0 flex items-center justify-center">
					<div class="p-4 text-center bg-white/80 flex flex-col items-center gap-3">
						<h2 id="about-heading" class="font-normal text-lg md:text-xl lg:text-3xl">About Adiamor</h2>
						<p class="mt-2 text-sm">We are artisans, expert jewelers, jewelry consultants and GIA trained gemologists who are passionate about what we do. Our award winning services continue to win the loyalty of customers worldwide.</p>
						<NuxtLink
							:to="STATIC_ROUTES.ABOUT"
							class="!font-light md:!text-sm underline"
							aria-label="Learn more about Adiamor, our services and team"
                            @click="$bus.emit('aria-announce', 'Navigated to About Adiamor page')"
							>
							Learn More About Adiamor
						</NuxtLink>
					</div>
				</div>
			</article>
			<article class="aspect-square relative">
				<nuxt-img
					provider="cdn"
					src="/landing-pages/home/financing"
					class="grayscale w-full h-full object-cover"
					format="webp"
					quality="80"
					loading="lazy"
					decoding="async"
					width="568"
					height="344"
					alt="Adiamor financing options with Affirm"
				/>
				<div class="absolute inset-x-0 top-0 flex items-center justify-center">
					<div class="p-4 text-center bg-white/80 flex flex-col items-center gap-3">
						<h2 id="financing-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Financing</h2>
						<p class="mt-2 text-sm">We have partnered with Affirm to give you a simple way to make your purchase with no hidden fees.</p>
						<NuxtLink
                            :to="STATIC_ROUTES.EDUCATION_FINANCING_INSURANCE"
                            aria-label="Learn about financing options through Affirm"
                            class="inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            @click="$bus.emit('aria-announce', 'Learn about Affirm financing options')"
						>
							<Icon name="affirm-monthly" class="w-[205px] h-[42px]" />
						</NuxtLink>
					</div>
				</div>
			</article>
		</div>

		<!-- Contact Links -->
		<div class="pt-8 lg:pt-16"
			role="region"
            aria-label="Contact Assistance"
		>
			<ContactLink />
		</div>
	</div>
</template>

<script setup>
import Banner from "~/components/ui/Banner.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import ShopJeweleryByCategory from "~/components/carousel/ShopJeweleryByCategory.vue";
import ShopDiamondByShape from "~/components/carousel/ShopDiamondByShape.vue";
import BuildVideo from "~/components/common/buildVideo.vue";
import PhotoGrid from "~/components/common/PhotoGrid.vue";
import Icon from "~/components/common/Icon.vue";
import DiamondCertifications from "~/components/landing/DiamondCertifications.vue";
import Link from "~/components/ui/Link.vue";
import ReviewBottom from "~/components/landing/ReviewBottom.vue";
import ProductFeature from '~/components/product/ProductFeature.vue';
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const { $bus } = useNuxtApp();

const product = ref({});
const items = ref([
        {
            title: 'Engagement Rings',
            link: STATIC_ROUTES.ENGAGEMENT_RINGS,
            image: '/landing-pages/heros/engagement-rings-home-block.jpg'
        },
        {
            title: 'Wedding Rings',
            link: STATIC_ROUTES.WEDDING_RINGS,
            image: '/landing-pages/heros/wedding-rings-home-block.jpg'
        },
        {
            title: 'Diamond Earrings',
            link: STATIC_ROUTES.EARRINGS,
            image: '/landing-pages/heros/diamond-earrings-home-block.jpg'
        },
        {
            title: 'Diamond Pendants',
            link: STATIC_ROUTES.NECKLACES,
            image: '/landing-pages/heros/diamond-pendants-home-block.jpg'
        }
]);

onMounted(() => {
    // Page load announcement for screen readers
    nextTick(() => {
        $bus.emit('aria-announce', 'Welcome to Adiamor homepage - Black Friday sale up to 25% off sitewide');
    });
});
</script>

<style>
#carousel-top-panel {
  display: none;
}
</style>
