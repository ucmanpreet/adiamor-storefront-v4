<template>
	<div>
		<Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/diamond.webp?updatedAt=1747480602240`"
			:contentTextColor="`text-white`"
			:contentBackgroundColor="`bg-black/50`"
			:hrefLink="STATIC_ROUTES.DIAMONDS_SEARCH"
			alt="Search through over 200,000 GIA certified diamonds.
				Buy your diamond loose or mounted in one of our custom engagement ring, earring, or pendant
				settings."
			>
			<h1
				class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">
				Diamonds</h1>
			<p class="mb-8 text-sm sm:text-lg lg:text-xl">Search through over 200,000 GIA certified diamonds.
				Buy your diamond loose or mounted in one of our custom engagement ring, earring, or pendant
				settings.</p>
			<div class="flex flex-col justify-start gap-4">
				<NuxtLink
					:to="STATIC_ROUTES.DIAMONDS_SEARCH"
					class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 font-normal md:text-sm px-4 py-3 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
					aria-label="Search loose diamonds"
					@click="$bus.emit('aria-announce', 'Navigating to search loose diamonds')"
				>
					Search Loose Diamonds
				</NuxtLink>

				<NuxtLink
					:to="STATIC_ROUTES.DIAMONDS_SEARCH_PAIR"
					class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 font-normal md:text-sm px-4 py-3 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
					aria-label="Search for diamond pairs"
					@click="$bus.emit('aria-announce', 'Navigating to search diamond pairs')"
				>
					Search for Diamond Pairs
				</NuxtLink>
			</div>
		</Banner>

		<!-- Shop by Shape -->
		<ShopDiamondByShape />

		<!-- Design Your Own -->
		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-10" aria-labelledby="design-your-own-heading">
			<div class="col-span-full max-w-lg mx-auto text-center">
				<h2 id="design-your-own-heading" class="text-lg md:text-xl lg:text-3xl font-normal">Design Your Own</h2>
				<p class="mt-1 text-sm md:text-lg max-w-xl mx-auto">Choose a diamond and design your own unique piece
					of timeless diamond jewelry</p>
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 lg:gap-8">
				<div class="relative col-span-full sm:col-span-1 flex flex-col gap-3">
					<NuxtLink
						:to="STATIC_ROUTES.DESIGN_RING"
						class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
						aria-label="Create your custom diamond ring"
						@click="$bus.emit('aria-announce', 'Navigating to design your own diamond ring')"
					/>
					<div class="relative aspect-square sm:aspect-[2/3]">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-left sm:object-top"
							src="/landing-pages/diamonds/design-your-own-ring.jpg?tr=w-384,h-576,q-80&updatedAt=1746632834331" alt="Create Your Custom Diamond Ring"/>
						<div
							class="absolute bottom-0 inset-x-0 flex flex-col flex-1 bg-white/70 backdrop-blur p-2 text-center">
							<h3 class="font-normal text-sm sm:text-lg md:text-xl lg:text-2xl">
								<span class="hidden sm:inline-block" aria-hidden="true">Create Your</span>
								<span class="sr-only">Create Your</span> Custom Diamond Ring
							</h3>
						</div>
					</div>
				</div>
				<div class="relative flex flex-col gap-3">
					<NuxtLink
						:to="STATIC_ROUTES.DESIGN_PENDANT"
						class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
						aria-label="Create your custom diamond necklace"
						@click="$bus.emit('aria-announce', 'Navigating to design your own diamond necklace')"
					/>
					<div class="relative aspect-[2/3]">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-bottom"
							src="/landing-pages/diamonds/design-your-own-necklace.jpg?tr=w-384,h-576,q-80&updatedAt=1746632834330" alt="Create Your Custom Diamond Necklace"/>
						<div
							class="absolute bottom-0 inset-x-0 flex flex-col flex-1 bg-white/70 backdrop-blur p-2 text-center"
						>
							<h3 class="font-normal text-sm sm:text-lg md:text-xl lg:text-2xl">
								<span class="hidden sm:inline-block" aria-hidden="true">Create Your</span>
								<span class="sr-only">Create Your</span> Custom Diamond Necklace
							</h3>
						</div>
					</div>
				</div>
				<div class="relative flex flex-col gap-3">
					<NuxtLink
						:to="STATIC_ROUTES.DESIGN_EARRINGS"
						class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
						aria-label="Create your custom diamond earrings"
						@click="$bus.emit('aria-announce', 'Navigating to design your own diamond earrings')"
					/>
					<div class="relative aspect-[2/3]">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
							src="/landing-pages/diamonds/design-your-own-earrings.jpg?tr=w-384,h-576,q-80&updatedAt=1746632834309" alt="Create Your Custom Diamond Earrings"/>
						<div
							class="absolute bottom-0 inset-x-0 flex flex-col flex-1 bg-white/70 backdrop-blur p-2 text-center"
						>
							<h3 class="font-normal text-sm sm:text-lg md:text-xl lg:text-2xl">
								<span class="hidden sm:inline-block" aria-hidden="true">Create Your</span>
								<span class="sr-only">Create Your</span> Custom Diamond Earrings
							</h3>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Policy -->
		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-12" aria-label="Policies and certifications">
			<div class="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 lg:gap-8">
				<div
					class="p-4 sm:p-10 row-span-1 flex flex-col justify-center items-center space-y-4 bg-primary text-white">
					<div class="flex flex-col gap-4">
						<h3 class="font-normal text-lg md:text-xl lg:text-3xl">Conflict Free Policy</h3>
						<p class="mt-1 text-xs sm:text-base">At Adiamor, we adhere to a strict, zero-tolerance policy
							toward conflict diamonds. All of our diamonds are ethically sourced.</p>
						<Button
							type="button"
							@click="$router.push(STATIC_ROUTES.POLICIES_CONFLICT_FREE); $bus.emit('aria-announce', 'Navigating to conflict free policy page')"
							colorType="link"
							class="!font-semibold md:!text-base underline focus:outline-none focus:ring-2 focus:ring-white"
							aria-label="Read more about conflict free policy"
						>
							Read more
						</Button>
					</div>
				</div>

				<!--Diamond Certificateion-->
				<DiamondCertifications className="relative row-start-2 flex flex-col justify-center space-y-4 p-4 sm:p-10 border border-gray-200"/>

				<div class="relative row-span-2 col-start-2 flex flex-col text-white">
					<NuxtLink
						:to="STATIC_ROUTES.DIAMONDS_SEARCH_CANADIAN"
						class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-white"
						aria-label="Shop Canadian diamonds"
						@click="$bus.emit('aria-announce', 'Navigating to Canadian diamonds page')"
					/>
					<div class="relative w-full grow max-lg:mx-auto max-lg:max-w-sm flex-1">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
							src="/landing-pages/heros/education_diaed.jpg?tr=w-592,h-652,q-80&updatedAt=1746137196935" alt="Canadian Diamonds"/>
					</div>
					<div class="absolute inset-x-0 flex p-4 sm:px-10 sm:py-6 h-full flex-col">
						<h3 class="font-normal text-lg md:text-xl lg:text-3xl">CANADIAN Diamonds</h3>
						<p class="mt-1 text-xs sm:text-base">Exceptional beauty isn't the only reason our customers love
							Canadian diamonds.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Need Help Finding the Perfect Diamond -->
		<section class="relative pt-8 lg:pt-16">
			<div class="bg-no-repeat bg-cover bg-center"
				:style="{ 'background-image': `url(https://cdn.adiamor.com/landing-pages/diamonds/custom-diamond-search.jpg?tr=h-396,q-80,cm-pad_resize&updatedAt=1747060003905)` }">
				<div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 space-y-12 py-8 sm:py-24">
					<div class="sm:w-1/2 p-4 backdrop-blur-sm bg-white/60 shadow-banner.">
						<h2 class="font-normal text-lg md:text-xl lg:text-3xl">Need Help Finding The Perfect Diamond
						</h2>
						<p class="mt-4 text-xs sm:text-base">Get Personalized Advice From A Gemologist</p>
						<NuxtLink
							:to="STATIC_ROUTES.CUSTOM_SEARCH"
							class="mt-4 inline-flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium md:text-sm px-6 py-3 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
							aria-label="Request diamond help"
							@click="$bus.emit('aria-announce', 'Navigating to custom diamond search page')"
						>
							Request Diamond Help
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>

		<!-- Product Reviews -->
		<section class="pt-6 md:pb-8" aria-label="Product Reviews">
			<ReviewBottom>
				<ClientOnly><div class="yotpo yotpo-shoppers-say yotpo-size-6" data-product-id="R3050" data-yotpo-element-id="1"></div></ClientOnly>
			</ReviewBottom>
		</section>

		<!-- Diamond Education -->
		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:py-16 space-y-6 lg:space-y-24" aria-labelledby="diamond-education-heading">
			<div class="max-w-2xl mx-auto text-center w-full">
				<h2 id="diamond-education-heading" class="text-lg md:text-xl lg:text-3xl font-normal">
					<NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION">Diamond Education</NuxtLink>
				</h2>
				<p class="mt-3 text-sm md:text-lg">Whether you are shopping for loose diamonds or planning an engagement, education is the first step. Understanding the 4Cs will allow you to shop with clarity and confidence. Our how to guides can help you be sure that you are buying the perfect diamond and if you have any questions our diamond experts are available to help.</p>
			</div>
			<div class="relative grid md:grid-cols-3 grid-rows-3 grid-flow-col-dense gap-3 lg:gap-8 text-center">
				<div class="flex flex-col gap-4">
					<article>
						<h3 class="text-sm sm:text-lg lg:text-2xl font-normal">Diamond Cut</h3>
						<p class="mt-3 text-xs sm:text-base max-w-xs mx-auto">
							The sparkle factor. The first and foremost of the 4Cs, cut grade determines how your diamond
							shines.
						</p>
						<NuxtLink
							:to="STATIC_ROUTES.EDUCATION_DIAMOND_CUT"
							class="mt-4 inline-block text-xs sm:text-base underline text-primary lg:font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Learn more about Diamond Cut"
							@click="$bus.emit('aria-announce', 'Navigating to diamonds cut page')"
						>
							Learn More
						</NuxtLink>
					</article>
				</div>
				<div class="row-start-3 flex flex-col gap-4">
					<article>
						<h3 class="text-sm sm:text-lg lg:text-2xl font-normal">Diamond Color</h3>
						<p class="mt-3 text-xs sm:text-base max-w-xs mx-auto">
							The hue of the diamond. Color grade will affect your diamond's brilliance only less than the
							cut grade.
						</p>
						<NuxtLink
							:to="STATIC_ROUTES.EDUCATION_DIAMOND_COLOR"
							class="mt-4 inline-block text-xs sm:text-base underline text-primary lg:font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Learn more about Diamond Color"
							@click="$bus.emit('aria-announce', 'Navigating to diamonds color page')"
						>
							Learn More
						</NuxtLink>
					</article>
				</div>
				<div
					class="row-span-full absolute -mt-4 md:static flex items-center justify-center inset-0 w-36 sm:w-48 md:w-auto mx-auto pt-4 md:py-12 pointer-events-none">
					<Icon name="diamond-education" class="w-full h-full object-contain" aria-hidden="true" />
				</div>
				<div class="col-start-3 flex flex-col gap-4">
					<article>
						<h3 class="text-sm sm:text-lg lg:text-2xl font-normal">Diamond Clarity</h3>
						<p class="mt-3 text-xs sm:text-base max-w-xs mx-auto">
							The fingerprint. The blemishes and imperfections which make your diamond unique.
						</p>
						<NuxtLink
							:to="STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY"
							class="mt-4 inline-block text-xs sm:text-base underline text-primary lg:font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Learn more about Diamond Clarity"
							@click="$bus.emit('aria-announce', 'Navigating to diamonds clarity page')"
						>
							Learn More
						</NuxtLink>
					</article>
				</div>
				<div class="row-start-3 col-start-3 flex flex-col gap-4">
					<article>
						<h3 class="text-sm sm:text-lg lg:text-2xl font-normal">Carat Weight</h3>
						<p class="mt-3 text-xs sm:text-base max-w-xs mx-auto">
							The last of the 4Cs. Your diamond's size is determined not only by its carat weight but by
							its cut grade as well.
						</p>
						<NuxtLink :to="STATIC_ROUTES.EDUCATION_CARAT_WEIGHT"
							class="mt-4 inline-block text-xs sm:text-base underline text-primary lg:font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Learn more about Carat Weight"
							@click="$bus.emit('aria-announce', 'Navigating to carat weight page')"
						>
							Learn More
						</NuxtLink>
					</article>
				</div>
			</div>
		</section>

		<!-- Frequently Asked Questions -->
		<Faq :faqItems="faqItems" />

		<!-- Contact Links -->
		<section class="pt-8 lg:pt-16" aria-label="Contact Assistance">
			<ContactLink />
		</section>
	</div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import ShopDiamondByShape from "~/components/carousel/ShopDiamondByShape.vue";
import Button from "~/components/common/Button.vue";
import DiamondCertifications from "~/components/landing/DiamondCertifications.vue";
import ReviewBottom from "~/components/landing/ReviewBottom.vue";
import Icon from "~/components/common/Icon.vue";
import Faq from "~/components/landing/Faq.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
	name: "DiamondPage",
	components: {
		Banner,
		ShopDiamondByShape,
		Button,
		DiamondCertifications,
		ReviewBottom,
		Icon,
		Faq,
		ContactLink
	},
	data() {
		return {
            STATIC_ROUTES,
			faqItems: [
				{
					question: "What is the difference between a lab grown diamond and a diamond?",
					answer: "A lab grown diamond is grown in a laboratory. A natural diamond is grown in nature.",
					link: "https://www.adiamor.com/blog/diamonds/lab-diamonds-what-you-need-to-know",
					linkText: "Learn More"
				},
				{
					question: "Why are lab grown diamonds so much cheaper than natural diamonds?",
					answer: "Lab grown diamonds are less expensive than natural diamonds because they can be grown to meet or exceed demand.",
					link: STATIC_ROUTES.DIAMONDS_SEARCH_RECOMMENDED,
					linkText: "Shop Diamonds"
				}
			],
		};
	},
};
</script>

<style scoped>
::v-deep .yotpo a.more-reviews {
	display: none;
}
</style>
