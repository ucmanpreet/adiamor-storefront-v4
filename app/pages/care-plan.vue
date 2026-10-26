<template>
	<div>
		<Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/2021winter.jpg?updatedAt=1746137176768`"
			:contentBackgroundColor="`bg-black/70`"
			:contentTextColor="`text-white`"
			alt="Jewelry Care Plans Banner"
        >
			<h1 class="text-4xl sm:text-[40px] font-normal mb-4">Jewelry Care Plans</h1>
			<p class="mb-8 text-sm sm:text-lg lg:text-xl">Adiamor has partnered with Jeweler's Mutual to provide
				care plans for your purchase. With the right plan, repairing or replacing your jewelry can be
				fast and easy.</p>
		</Banner>

		<!-- Available Plans -->
		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6"
			aria-labelledby="available-plans-heading"
		>
			<header class="col-span-full max-w-3xl mx-auto text-center">
				<h2 id="available-plans-heading" class="text-lg md:text-xl lg:text-3xl xl:text-5xl font-normal">Available Plans</h2>
				<p class="mt-3 text-sm lg:text-lg">Enter the price of your purchase below to view available plans. From
					there, you can also view a sample of the terms of service for each applicable plan.</p>
			</header>

			<div>
				<client-only>
					<form @submit.prevent="formSubmit" class="flex-1">
						<div class="max-w-md mx-auto">
							<label class="mb-2 block" for="purchase-price">Purchase Price</label>
							<div class="flex">
								<div class="relative flex-1">
									<div aria-hidden="true"
										class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pl-3 pointer-events-none">
										{{ getSymbolOnly }}</div>
									<InputField
										type="text"
										id="purchase-price"
										name="purchasePrice"
										placeholder="Your Price"
										:rules="'required'"
										v-model="price"
										:error="submitted && priceError"
										:disabled="loading"
										:inputClass="'pl-14 focus:ring-2 focus:ring-primary'"
										aria-required="true"
										:aria-describedby="submitted && priceError ? 'price-error' : null"
									/>
									<p
										v-if="submitted && priceError"
										id="price-error"
										class="text-red-600 text-sm mt-1"
										>
										{{ priceError }}
									</p>
								</div>
								<Button type="submit" aria-label="View available care plans" :disabled="loading">{{ loading ? 'loading..' : 'View Plans' }}</Button>
							</div>
						</div>
					</form>
				</client-only>
				<div class="mt-4 sm:mt-8 max-w-2xl mx-auto text-center space-y-4" aria-live="polite">
					<template v-if="plans && plans.length">
						<p class="text-xs sm:text-sm lg:text-base">The Following options are available for Purchase.</p>
						<div class="grid grid-cols-2 gap-6" role="list">
							<PlanCard v-for="(plan, index) in plans" :key="index" :title="formatCarePlan(plan?.applicablePlanDuration)"
								:amount="formattedPrice(plan?.price)" :sku="plan?.planSku" />
						</div>
					</template>
					<template v-if="plans && !plans.length">
						<p>No Plans Available</p>
					</template>
				</div>
			</div>
		</section>

		<!-- How It Works -->
		<section class="relative mt-8 lg:mt-16 space-y-6 text-white text-center" aria-labelledby="how-it-works-heading">
			<nuxt-img provider="cdn" src="/landing-pages/heros/care-plan-how-it-works-banner.webp?updatedAt=1747988562697" alt="How It Works"
				class="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
			<div
				class="relative z-0 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-8 lg:py-16 space-y-6 lg:space-y-12">
				<header class="col-span-full max-w-3xl mx-auto text-center">
					<h2 id="how-it-works-heading" class="text-lg md:text-xl lg:text-3xl xl:text-5xl font-normal">How It Works</h2>
				</header>

				<div class="grid grid-cols-2 gap-y-6 sm:gap-4 md:gap-6 lg:gap-y-20">
					<article v-for="item in carePlan" :key="item.id" class="max-w-sm mx-auto">
						<h3 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">{{ item.title }}</h3>
						<p class="mt-2 text-sm lg:text-base" v-html="$sanitize(item.description)"></p>
					</article>
				</div>
			</div>
		</section>

		<section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12" aria-labelledby="whats-covered-heading">
			<div class="overflow-hidden bg-white">
				<div class="flex">
					<div class="max-w-full sm:max-w-sm lg:max-w-md xl:max-w-2xl">
						<h2 id="whats-covered-heading" class="text-lg md:text-xl lg:text-3xl xl:text-5xl font-normal">
							What's Covered</h2>
						<p class="mt-3 text-sm lg:text-lg">For specific plan details, please refer to your Terms and
							Conditions.
						</p>
						<dl class="mt-6 max-w-xl space-y-2 text-sm sm:text-base/7 lg:max-w-none">
							<div class="relative pl-9" v-for="item in coverage" :key="item.id">
								<dt class="inline">
									<Icon name="diamond"
										class="w-4 lg:w-5 h-4 lg:h-5 text-primary absolute left-1 top-1" />
								</dt>
								<dd class="inline">{{ item }}</dd>
							</div>
						</dl>

						<ul class="mt-6 space-y-2 bg-primary/5 p-4 text-xs sm:text-sm">
							<li>* Loss of diamonds due to a defective setting is covered.</li>
							<li>* Exclusions and limitations apply.</li>
							<li>* Only available in the United States</li>
						</ul>
					</div>
					<div class="hidden sm:flex relative flex-1 sm:pl-4 md:pl-12 lg:pl-24 xl:pl-40">
						<nuxt-img provider="cdn" src="/landing-pages/heros/er-hidden-halo-rings-box.jpg?updatedAt=1747988761099"
							alt="Jewelry ring in presentation box" class="w-full h-full object-cover"/>
					</div>
				</div>
			</div>

		</section>

		<!-- "Frequently Asked Questions -->
		<Faq :faqItems="faqItems" />

		<ContactLink />
	</div>
</template>

<script setup>
import api from '~/api-client/rest-api/index.js';
import KEYS from '~/utils/constant.js';
import Banner from '~/components/ui/Banner.vue';
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import PlanCard from '~/components/landing/PlanCard.vue';
import Icon from '~/components/common/Icon.vue';
import Faq from '~/components/landing/Faq.vue';
import ContactLink from '~/components/common/ContactLink.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import { useForm, useField } from 'vee-validate';

const store = useMainStore();
const { $bus, $formatPrice, $getCurrencySymbol } = useNuxtApp();

// vee-validate 4: rules are registered globally (plugins/26.veeValidate.js); validation is explicit (no blur/change/input)
const { validate } = useForm();
const { value: price, errorMessage: priceError, validate: validatePrice } = useField('purchasePrice', 'required', {
	label: 'purchasePrice',
	initialValue: null,
});

const plans = ref(null);
const carePlan = ref({
				purchaseCoverage: {
					title: "Purchase Coverage",
					description:
						"Purchase your Care Plan at the same time you purchase your jewelry. Keep your receipt as proof of purchase. You’ll need it if you file a claim."
				},
				wearWorryFree: {
					title: "Wear Worry-Free",
					description:
						"You do you, without worry. Rest assured you’re protected from the unexpected."
				},
				fileAClaim: {
					title: "File a Claim",
					description:
						`Contact your Adiamor to begin the process. Simply <a class='underline' href="tel:${store.phoneNumber?.replace(/[^+\d]/g, '')}" target='_blank'>call</a>, <a class='underline' href='mailto:Service@Adiamor.com'>email</a> or <NuxtLink class='underline' to=${STATIC_ROUTES.CONTACT} target='_blank'>chat</NuxtLink> with us to get started.`
				},
				restEasy: {
					title: "Rest Easy",
					description:
						"Once you've filed your claim, you can sit back and let Adiamor take over. We will contact Jeweler's Mutual to get the process started."
				}
			});
const faqItems = ref([
				{
					question: "What are the terms of service?",
					answer: "Each care plan will include a terms of service tailored to the purchase. However, you can view sample terms using the links below:",
					links: [
                        { text: "3 Year", url: KEYS.THREE_YEAR_PLAN_LINK },
                        { text: "Lifetime", url: KEYS.LIFE_TIME_PLAN_LINK }
                    ]
				},
				{
					question: "How can I purchase a plan?",
					answer: "Applicable items will include the option to add a care plan directly from your shopping cart. Currently care plans are offered on all jewelry items but are not offered for cleaners, loose diamonds or gemstones or accessories."
				},
				{
					question: "Can I get coverage for loss and theft, too?",
					answer: "While a JM Care Plan provides peace of mind when your jewelry is damaged, it does not include coverage for loss and theft. However, Jeweler's Mutual does additionally offer insurance plans to cover for this possibility.",
					link: STATIC_ROUTES.EDUCATION_FINANCING_INSURANCE,
					linkText: "insurance plans"
				},
				{
					question: "How much does a JM Care Plan cost?",
					answer: "The price of a JM Care Plan depends on which type of plan you choose and the value of what you’re protecting. Complete the form above to receive a quote."
				},
				{
					question: "Are routine inspections required to maintain coverage?",
					answer: "All required care, maintenance, and inspection services specified in our manufacturer’s warranty must occur to maintain coverage.",
					link: STATIC_ROUTES.POLICIES_WARRANTY,
					linkText: "manufacturer’s warranty"
				},
				{
					question: "How do I file a claim?",
					answer: "Within the first 30 days of purchase, return your item to Adiamor for a refund or replacement. After 30 days, contact Adiamor to initiate a claim. You must have your receipt and JM Care Plan brochure as proof of coverage."
				},
				{
					question: "How long will it take for my claim to be settled?",
					answer: "As soon as something happens to your jewelry, initiate your claim with Adiamor and we will do our best to handle your claim quickly. Our goal is to get your jewelry restored as soon as possible."
				},
				{
					question: "Will my item be repaired or replaced?",
					answer: "Your item will be repaired, assuming the damage is repairable, so long as the cost to repair does not exceed the cost of the original product. Otherwise, it will be replaced."
				},
				{
					question: "I can’t find my receipt. Now what?",
					answer: "Unfortunately, your receipt and JM Care Plan brochure are your only record of having purchased coverage. There is no alternate way to file a claim. However, we may have a copy of your receipt on file. Contact Adiamor and we will review your order."
				},
				{
					question: "What if I’m purchasing a JM Care Plan to protect a gift?",
					answer: "3-year plans are transferrable throughout the life of the plan. Lifetime plans must be transferred to the gift recipient within the first 180 days. Contact Adiamor to update the care plan record."
				},
				{
					question: "Can I renew my coverage?",
					answer: "JM Care Plans are not renewable after the term expires. For additional coverage options, contact Adiamor. See Jeweler's Mutual Personal Insurance Plans for additional protection options.",
					link: "https://www.jewelersmutual.com/jewelry-engagement-ring-insurance-quote",
					linkText: "Jeweler's Mutual Personal Insurance Plans"
				},
				{
					question: "How do I cancel my coverage?",
					answer: "Contact Adiamor to discuss cancelling your coverage. You may receive a full or partial refund according to your Terms and Conditions."
				}
			]);
const coverage = ref([
				"Broken, bent, or worn prongs",
				"Broken earring posts",
				"Cracked or thinning band or shank on rings",
				"Broken chain, bracelet links or clasp",
				"Loss of diamonds and gemstones due to a defective setting",
				"Ring re-sizing",
				"Pearl restringing"
			]);
const loading = ref(false);
const submitted = ref(false);

// after the first submit, the field re-validates live while typing
watch(price, () => { if (submitted.value) validatePrice(); });

onMounted(() => {
	$bus.emit(
		"aria-announce",
		"Jewelry Care Plans page loaded. Enter your purchase price to view available protection plans."
	);
});

function formatCarePlan(str){
	if(str && str?.includes('Year')){
		return str.replace('Year', 'Years');
	}
	return str;
}
async function formSubmit() {
	submitted.value = true;
	const { valid: isValid } = await validate();
	if (!isValid) {
		$bus.emit(
			"aria-announce",
			"Form submission failed. Please enter a valid purchase price."
		);
		return;
	}
	submitted.value = false;
	try {
		loading.value = true;
		let payload = {price : price.value};
		const response = await api.postRequest('care-plan-quote', payload);
		if (response.status !== 200 || !response.data) {
			console.log(response?.data?.message || 'Internal Server Error');
			$bus.emit(
				"aria-announce",
				"Unable to retrieve plans. Please try again later."
			);
			return;
		}
		plans.value = response?.data?.quotes && response?.data?.quotes?.length ? response?.data?.quotes : [];
		$bus.emit(
			"aria-announce",
			plans.value.length
				? `${plans.value.length} care plans available.`
				: "No care plans available for the entered amount."
		);
	} catch (error) {
		console.error(error);
		$bus.emit(
			"aria-announce",
			"An unexpected error occurred while retrieving care plans."
		);
		console.log('An unexpected error occurred');
	} finally {
		loading.value = false;
		price.value = null;
		submitted.value = false;
	}
}
function formattedPrice(value) {
	return value ? $formatPrice(value) : '';
}

const getSymbolOnly = computed(() => {
	if($getCurrencySymbol && typeof $getCurrencySymbol === 'function'){
		return $getCurrencySymbol();
	}
	let cookieCountry = useCookie('countryData').value;
	if(!cookieCountry) return KEYS.CURRENCY;
	let currency = cookieCountry?.currency || KEYS.CURRENCY;
	let locale = 'en-US';
	let config = {
		style: 'currency',
		currency,
	};
	// Get the symbol from the currency formatting
	let symbol = new Intl.NumberFormat(locale, config).formatToParts(1234).find(part => part.type === 'currency')?.value;
	return symbol || '';
});
</script>