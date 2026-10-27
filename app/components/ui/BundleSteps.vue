<!-- BundleSteps.vue -->
<template>
	<div>
		<BundleStepsSkeleton v-if="!bundleSteps.length" />
		<div class="max-w-7xl mx-auto w-full lg:px-8 pb-4 sm:pb-2"
			v-show="checkBundleStepCondition && bundleSteps.length">
			<div class="flex sm:grid grid-cols-3 xl:grid-cols-4 bg-white overflow-hidden sm:divide-x border-t border-b sm:border border-[#ebebeb] divide-[#ebebeb] sm:rounded-full h-[56px] lg:h-auto"
				role="list" :aria-label="`Design your ${settingName == 'Earring' ? 'Earrings' : settingName} steps`">
				<!-- Step 1 -->
				<div class="relative py-3 px-3 sm:px-6 xl:px-10 hidden xl:flex items-center w-full sm:w-44 md:w-auto" aria-hidden="true">
					<div>
						<p>Design Your {{ settingName == 'Earring' ? 'Earrings' : settingName }}</p>
					</div>
				</div>

				<!-- Step 2 -->
				<div v-for="(item, index) in bundleSteps" :key="index" :class="[
					'relative flex-1 py-1 px-2 sm:py-3 md:px-3 lg:px-6 xl:px-10 flex items-center',
					index === 0 ? 'before:hidden' : '',
					index === 0 && checkRouteCondition(item)
						? 'after:bg-[#ebebeb] md:bg-black/7 before:z-20'
						: '',
					index === 1
						? [
							checkRouteCondition(bundleSteps[0]) ? 'before:hidden' : 'before:bg-white',
							!checkRouteCondition(item) ? 'after:bg-white ' : '',
							checkRouteCondition(item)
								? 'after:bg-[#ebebeb] border-black/11 pl-3.5 pr-2 md:bg-black/7'
								: 'px-2',
						]
						: '',
				]" role="listitem"
					:aria-current="checkRouteCondition(item) ? 'step' : undefined">
					<NuxtLink :to="redirectToItem(item?.data)" class="absolute inset-0 z-10 md:hidden"
						:aria-label="item.data ? `Step ${index + 1} of 3: ${item.data.name}. Tap to view details.` : null"
						:aria-hidden="item.data ? null : 'true'"
						:tabindex="item.data ? null : -1">
					</NuxtLink>
					<!-- curved background -->
					<div class="absolute inset-0 sm:hidden [clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]"
						:class="[checkRouteCondition(item) ? 'bg-[#ebebeb]' : '']" role="img" aria-hidden="true"></div>

					<!-- default arrow -->
					<svg v-if="[1, 2].includes(index)" class="absolute left-0 top-1/2 -translate-y-1/2 sm:hidden"
						:class="[index == 1 && checkRouteCondition(item) ? '' : 'hidden']" width="16" height="54"
						viewBox="0 0 16 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<g clip-path="url(#clip0_231_752)">
							<path d="M9 27.3665L1.2 54H0L6.0405e-07 4.72095e-08L1.2 0L5.1 13.6832L9 27.3665Z"
								fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_231_752">
								<rect width="16" height="54" fill="white" />
							</clipPath>
						</defs>
					</svg>

					<div :class="[checkRouteCondition(item) || (index == 0 && checkBundleRoute) ? '' : 'hidden']"
						class="absolute right-[7px] xs:hidden inset-y-0 h-[44px] after:content-[''] after:w-[1px] after:h-7 after:transform after:-rotate-[30deg] xs:after:-rotate-[40deg] after:absolute after:-top-[4px] after:bg-[#ebebeb] xs:after:hidden before:content-[''] before:w-[1px] before:h-7 before:transform before:rotate-[30deg] xs:before:rotate-[40deg] before:absolute before:bg-[#ebebeb] before:-bottom-[4px] xs:before:hidden"
						aria-hidden="true"></div>

					<div class="block mr-2 md:mr-5 z-10 text-center xl:absolute xl:left-0 xl:-translate-x-1/2" aria-hidden="true">
						<div
							class="xl:bg-white xl:shadow-md rounded-full xl:h-12 xl:w-12 flex items-center justify-center font-medium text-sm xs:text-2xl">
							{{ index + 1 }}
						</div>
					</div>

					<div class="flex-1 flex flex-col space-y-0.5 truncate relative">
						<!-- Interactive step text -->
						<button v-if="item.data == null" @click="searchRedirect(item)"
							class="text-left text-[13px] cursor-pointer relative z-10 bg-transparent px-0 py-0 sm:px-0 sm:py-0"
							:aria-label="`Step ${index + 1} of 3: Choose ${item.type == 'simple' && pairLabel ? '' : 'a'} ${item.text}. Not yet selected.`">
							<span class="hidden sm:inline-block">Choose {{ pairLabel && item.type == 'simple' ? '' : 'a'
								}}</span>
							<span class="sm:hidden">Select</span> {{ item.text }}
						</button>

						<p v-else class="font-normal text-xs sm:flex truncate items-center" :class="item?.data?.is_available ? 'text-gray-700' : 'text-gray-400'">
							<span class="hidden sm:inline-block truncate flex-1">{{ item.data.name }} -</span>
							<span class="sm:inline-block hidden">{{ getPriceData(item.data) }}</span>
							<span class="inline sm:hidden">
								<button type="button" @click="redirectToItem(item?.data)" class="text-xs underline"
									:aria-label="`Select ${item.data.name}`">
									{{ mobileCaseText(item) }}
								</button>
							</span>
						</p>

						<div class="flex justify-between sm:flex-row xs:justify-normal gap-x-1 xs:gap-x-3 lg:gap-x-4 text-xxs sm:text-xs relative z-20"
							v-if="item.data && item.data.name && item?.data?.is_available">
							<NuxtLink :to="redirectToItem(item?.data)"
								class="underline leading-tight md:text-left lg:text-right hidden md:inline-flex">
								View
							</NuxtLink>

							<NuxtLink :to="changeProduct(item)"
								class="underline leading-tight md:text-left lg:text-right">
								Change
							</NuxtLink>

							<button type="button" @click="removeProduct(item)"
								class="underline leading-tight md:text-left lg:text-right sm:ml-auto lg:ml-0 bg-transparent px-0 py-0"
								:aria-label="`Remove ${item.data?.name || item.text} from Step ${index + 1} of 3`">
								Remove
							</button>
						</div>
					</div>

					<!-- Product Image / Icon -->
					<div class="ml-4 flex-none hidden sm:block w-6 h-6 lg:w-9 lg:h-9">
						<template v-if="item.data">
							<MediaImage :src="getProductImageToShow(item.data)" v-if="getProductImageToShow(item.data)"
								:alt="item?.data?.name ?? ''"
								className="w-full h-full flex-none object-cover mix-blend-multiply" />
							<Icon v-else :name="getTrimmedValue(item.data)" class="w-6 h-6 lg:w-9 lg:h-9 flex-none"
								aria-hidden="true" />
						</template>
						<Icon v-else class="w-full h-full object-contain"
							:name="item.type == 'simple' ? `certified_diamond${pairLabel}` : getSettingSvg"
							aria-hidden="true" />
					</div>
				</div>

				<!-- Step 4 -->
				<div class="relative flex-1 md:flex-auto py-3 md:px-3 lg:px-6 xl:px-10 flex items-center"
					:class="checkBundleRoute ? 'border-black/11 bg-black/7 pl-3.5 pr-2' : 'pl-3 pr-2'" role="listitem"
					:aria-current="checkBundleRoute ? 'step' : undefined">
					<!-- Arrow -->
					<svg v-show="checkBundleRoute" class="absolute left-0 top-1/2 -translate-y-1/2" width="16"
						height="54" viewBox="0 0 16 54" fill="none" xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true">
						<g clip-path="url(#clip0_231_752)">
							<path d="M9 27.3665L1.2 54H0L6.0405e-07 4.72095e-08L1.2 0L5.1 13.6832L9 27.3665Z"
								fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_231_752">
								<rect width="16" height="54" fill="white" />
							</clipPath>
						</defs>
					</svg>

					<div v-if="bundleSteps.length > 1 && checkRouteCondition(bundleSteps[0])"
						class="absolute left-0 sm:hidden inset-y-0 h-[56px] after:content-[''] after:w-[1px] after:h-[34px] after:transform after:-rotate-[30deg] after:absolute after:-top-[4px] after:bg-[#ebebeb] sm:after:hidden before:content-[''] before:w-[1px] before:h-[34px] before:transform before:rotate-[30deg] before:absolute before:bg-[#ebebeb] before:-bottom-[4px] sm:before:hidden"
						aria-hidden="true"></div>

					<div class="block mr-1.5 md:mr-5 z-10 text-center xl:absolute left-0 xl:-translate-x-1/2" aria-hidden="true">
						<div
							class="xl:bg-white xl:shadow-md text-gray-700 rounded-full xl:h-12 xl:w-12 flex items-center justify-center font-medium text-sm xs:text-2xl">
							3
						</div>
					</div>

					<div class="flex-1 flex sm:block justify-center">
						<button type="button" v-on:click="completeSetting" class="text-[13px] lg:block"
							:aria-label="`Step 3 of 3: Review your ${settingName == 'Earring' ? 'Earrings' : settingName}. ${isCompleteBundle ? 'Ready to review.' : 'Complete all steps to review.'}`">
							<span class="hidden sm:inline-block">Review</span>
							Your <span class="leading-none">{{ settingName == 'Earring' ? 'Earrings' : settingName
								}}</span>
						</button>
					</div>

					<div class="hidden sm:block">
						<template v-if="isCompleteBundle">
							<MediaImage :src="getCompleteImg" :alt="'complete-product'"
								className="w-6 h-6 lg:w-9 lg:h-9 flex-none mix-blend-multiply" />
						</template>
						<Icon :name="completeSettingSVGName" v-else class="w-6 h-6 lg:w-9 lg:h-9 flex-none"
							aria-hidden="true" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import Icon from "~/components/common/Icon.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import BundleStepsSkeleton from "~/components/skeleton/BundleStepsSkeleton.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import { fetchPriceData, fetchFirstProductImage, correctUrl, urlWithCategory, cleanPostfix } from "~/utils/universalHelper";

const props = defineProps(['product', 'categoryEvent']);

const store = useMainStore();
const bundle = useBundleStore();
const route = useRoute();
const router = useRouter();
const { $bus, $formatPrice } = useNuxtApp();

const bundleSteps = ref([]);
// Families without their own SVG reuse a close icon (e.g. rings_and_bands has no svg file)
const FAMILY_SVG = { rings_and_bands: 'engagement_rings_family' };
const familySvg = (code) => FAMILY_SVG[code] ?? code;
const configProduct = ref(null);
const simpleProduct = ref(null);
const shortenText = ref({
	'engagement_rings_family': 'Ring',
	'necklace': 'Necklace',
	'engagement-rings': 'Ring',
	'earrings': 'Earring',
	'earring': 'Earring',
	'necklaces': 'Necklace',
	'certified_diamond': 'Diamond',
	'design-your-own-earrings': 'Earring',
	'design-your-own-necklaces': 'Necklace',
});
const prefix = ref('');
const postfix = ref('');
const routeName = ref('');
const pairLabel = ref('');
const categoryEventModified = ref('');
const categoryMap = ref({
	earring: { action: 'updateEarring', getter: 'getEarring', key: 'earring', search_url: STATIC_ROUTES.DESIGN_SEARCH_EARRINGS },
	ring: { action: 'updateRing', getter: 'getRing', key: 'ring', search_url: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH },
	necklace: { action: 'updateNecklace', getter: 'getNecklace', key: 'necklace', search_url: STATIC_ROUTES.DESIGN_SEARCH_NECKLACES },
});
const storedProductType = ref('');

const bundleData = computed(() => {
	return bundle[categoryEventModified.value?.getter ?? 'getRing'] || {};
});
const isBundleView = computed(() => route.name === 'yourSettingPage');
const isProductView = computed(() => {
	let product = props.product || store.getProduct;
	return product && product?.is_available;
});
const isCompleteBundle = computed(() => bundleSteps.value.every((el) => el.type != 'complete' && el.data));
const getCompleteImg = computed(() => {
	let configEl = bundleSteps.value.find((el) => el.type == 'configurable' && el.data);
	if (configEl) {
		return fetchFirstProductImage(configEl.data);
	}
	return '';
});
const settingName = computed(() => {
	let mainSetting = shortenText.value[props.product?.attribute_family_code != 'certified_diamond' ? props.product?.attribute_family_code : bundleSteps.value.find((el) => el.type == 'configurable' && el.data)?.data?.attribute_family_code];
	if (!mainSetting && routeName.value == 'searchPage') {
		mainSetting = shortenText.value[prefix.value] ?? shortenText.value[postfix.value];
	}
	if (!mainSetting) shortenText.value[categoryEventModified.value?.key] ?? shortenText.value[storedProductType.value];
	if (!mainSetting) mainSetting = shortenText.value[storedProductType.value];
	return mainSetting ? mainSetting : 'Ring';
});
const getSvgIfSearchPage = computed(() => {
	const setting = settingName.value?.toLowerCase();
	if (setting === 'earring') {
		return 'earring';
	}
	return setting === 'ring' ? 'engagement_rings_family' : setting === 'necklace' ? setting : 'engagement_rings_family';
});
const completeSettingSVGName = computed(() => {
	if (props.product && props.product?.type == 'configurable') {
		return `complete_${familySvg(props.product?.attribute_family_code)}`;
	}
	let configEl = bundleSteps.value.find((el) => el.type == 'configurable' && el.data);
	return configEl && configEl?.data ? `complete_${familySvg(configEl?.data?.attribute_family_code)}` : `complete_${getSvgIfSearchPage.value}`;
});
const getSettingSvg = computed(() => {
	if (props.product?.type != 'simple' && props.product?.attribute_family_code) return familySvg(props.product?.attribute_family_code);
	return getSvgIfSearchPage.value;
});
const checkBundleRoute = computed(() => route.name == 'yourSettingPage');
const checkBundleStepCondition = computed(() => {
	let bundleItem = bundle[categoryEventModified.value?.getter ?? 'getRing'];
	if (routeName.value == 'searchPage') {
		if (route.path?.includes('diamond-pair')) {
			return true;
		}
		// If any bundle item is present and diamond search view
		if (prefix.value == 'diamonds' && (bundleItem?.diamond || bundleItem?.setting)) {
			return true;
		}
		return ['engagement-rings', 'design-your-own-necklaces', 'design-your-own-earrings'].includes(prefix.value) || ['design-your-own-necklaces', 'design-your-own-earrings'].includes(postfix.value);
	}
	if (isProductView.value) {
		let bundleCond = props.product?.is_add_bundle;
		let isDiamondPair = route.path?.includes('diamond-pair');
		if (props.product?.type == 'simple' && !isDiamondPair && bundleCond) return (bundleItem?.diamond || bundleItem?.setting);
		return bundleCond;
	}
});
const getDiamondText = computed(() => pairLabel.value ? 'Diamonds' : 'Diamond');

onMounted(async () => {
	// Normalize route params
	const params = route.params || {};
	prefix.value = params.prefix?.toLowerCase();
	postfix.value = cleanPostfix(params.postfix?.toLocaleLowerCase()) || params.postfix?.toLowerCase();
	routeName.value = route.name;

	// Map engagement terms to "ring"
	const catMap = categoryMap.value;
	catMap['engagement-rings'] = catMap['ring'];
	catMap['engagement-ring'] = catMap['ring'];

	// Determine initial bundleType
	let bundleType = sessionStorage?.bundleType;
	if (routeName.value === 'searchPage' && prefix.value !== 'diamonds') {
		bundleType = prefix.value?.replace(/s$/, '');
	}
	if (bundleType === 'engagement-rings') bundleType = 'ring';

	// Determine stored product type
	storedProductType.value = bundleType || 'ring';

	// Override for specific product
	if (isProductView.value) {
		const family = props.product?.attribute_family_code;
		storedProductType.value = (family && family !== 'certified_diamond') ? family : sessionStorage?.bundleType || 'ring';
	}

	// Normalize and validate final product type
	const validTypes = ['ring', 'necklace', 'engagement-ring', 'earring', 'necklaces', 'earrings', 'engagement-rings'];
	if (!validTypes.includes(storedProductType.value)) {
		storedProductType.value = 'ring';
	}


	// Override for diamond search with missing or invalid type
	if (routeName.value === 'searchPage') {
		// Default logic
		if (prefix.value === 'diamonds' && (!storedProductType.value || storedProductType.value === 'earring')) {
			storedProductType.value = 'ring';
		}

		// Postfix-based overrides
		if (postfix.value === 'diamond-pair' || postfix.value?.includes('earrings')) {
			storedProductType.value = 'earring';
		} else if (postfix.value?.includes('necklaces')) {
			storedProductType.value = 'necklace';
		} else if (prefix.value?.includes('engagement-rings')) {
			storedProductType.value = 'ring';
		}
	}

	// Override for diamond pairs
	if (route.path?.includes('diamond-pair')) {
		pairLabel.value = '_pair';
		storedProductType.value = 'earring';
	}

	// Update session and event category
	await sessionStorage.setItem('bundleType', storedProductType.value);
	categoryEventModified.value = catMap[storedProductType.value];

	// Update label if needed
	if (settingName.value?.toLowerCase() === 'earring') {
		pairLabel.value = '_pair';
	}

	// Load data
	await assignData();
});

function getProductImageToShow(data) {
	let imgData = data?.selectedVariant ?? data;
	return fetchFirstProductImage(imgData);
}
function checkFilterApply(url) {
	return url && ['earring', 'earrings', 'necklace', 'necklaces', 'diamond-pair'].some(keyword => url.includes(keyword));
}
function getPriceData(item) {
	let finalprice = fetchPriceData(item, item?.selectedVariant);
	return formattedPrice(finalprice);
}
function mobileCaseText(item) {
	return item.type == 'configurable' ? 'Setting' : getDiamondText.value;
}
function formattedPrice(price) {
	if (price === 0) return $formatPrice(0);
	if (price) return $formatPrice(parseFloat(price), false);
}
function checkRouteCondition(item) {
	if (!['searchPage'].includes(routeName.value) || isBundleView.value) {
		if (isBundleView.value) {
			return false;
		}
		if (props.product?.type) {
			return item.type == props.product?.type;
		}
	}

	if (item?.type === 'simple') {
		return prefix.value === 'diamonds';
	}
	if (item?.type === 'configurable') {
		const valid = ['engagement-rings', 'design-your-own-necklaces', 'design-your-own-earrings'];
		return valid.includes(prefix.value) || valid.includes(postfix.value);
	}
	if (item?.data) {
		return item.data.attribute_family_code?.includes(prefix.value);
	}
	return false;
}
function getTrimmedValue(data) {
	return (data ? `${familySvg(data.attribute_family_code)}${data?.type == 'simple' ? pairLabel.value : ''}` : props.product ? `${familySvg(props.product?.attribute_family_code)}` : 'engagement_ring_family').trim();
}
function redirectToItem(data = null) {
	if (data && data?.url_key) {
		let url = data?.url_key;
		if (data?.type == 'configurable' && data?.selectedVariant) { url += `?sku=${data?.selectedVariant?.sku}`; }
		return `${correctUrl(url)}`;
	}
	return STATIC_ROUTES.HOME;
}
function changeProduct(data = null) {
	if (!data?.data) return STATIC_ROUTES.HOME;
	let redirectTo = data.type === 'simple'
		? data?.data?.redirect_diamond_search_link
		: data?.data?.redirect_search_link;
	let url = redirectTo?.category
		? urlWithCategory(redirectTo)
		: redirectTo ?? STATIC_ROUTES.HOME;
	let shape = null;
	if (data.type == 'configurable' && data?.data) {
		let variantData = data?.data?.selectedVariant;
		let selectedShape = variantData && variantData?.shape ? variantData?.shape?.toLowerCase() : '';
		shape = selectedShape;
	}
	if (data.type == 'simple' && data?.data) {
		shape = data?.data?.shape ?? '';
	}

	//Unset redirection
	if (shape?.toLowerCase() == 'unset') {
		shape = 'round';
	}

	let routeStr = shape ? `${url}${queryOrRoute(url)}${shape.toLowerCase()}` : url;

	const [path, query] = routeStr.split('?');

	routeStr = path.endsWith('/') ? path : `${path}/`;

	return query ? `${routeStr}?${query}` : routeStr;
}
function queryOrRoute(url) {
	const routes = [
		{ path: 'design-your-own-earrings', query: 'center_stone_shape=' },
		{ path: 'design-your-own-necklaces', query: 'center_stone_shape=' },
		{ path: 'diamond-pair', query: 'diamond_shape=' },
	];
	const found = routes.find((r) => url?.includes(r.path));
	return found ? `?${found.query}` : STATIC_ROUTES.HOME;
}
async function assignData() {
	// const data = await this.$store.getters[`bundle/${this.categoryEventModified?.getter ?? 'getRing'}`];
	// let presentProduct = null;
	// for (var key in data) {
	// 	let stepProduct = data[key];
	// 	if (stepProduct && stepProduct.family) {
	// 		presentProduct = stepProduct;
	// 		if (stepProduct?.type == 'simple') this.simpleProduct = stepProduct;
	// 		if (stepProduct?.type == 'configurable') this.configProduct = stepProduct;
	// 		this.bundleSteps.push({ text: this.shortenText[stepProduct?.attribute_family_code], type: stepProduct?.type, data: stepProduct });
	// 	}
	// }
	// if (this.bundleSteps.length == 1) {
	// 	this.bundleSteps.push({ text: presentProduct?.type == 'simple' ? 'Setting' : this.getDiamondText, type: presentProduct?.type == 'simple' ? 'configurable' : 'simple', data: null });
	// }
	// if (!this.simpleProduct && !this.configProduct) {
	// 	this.bundleSteps.push({ text: 'Setting', type: 'configurable', data: null, search_url: this.categoryEventModified?.search_url ?? STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH });
	// 	this.bundleSteps.push({ text: this.getDiamondText, type: 'simple', data: null, search_url: STATIC_ROUTES.DIAMONDS_SEARCH });
	// }

	// Announce current bundle state after loading
	nextTick(() => {
		const settingStep = bundleSteps.value.find(s => s.type === 'configurable');
		const diamondStep = bundleSteps.value.find(s => s.type === 'simple');
		const settingLabel = settingName.value === 'Earring' ? 'Earrings' : settingName.value;

		let announcement = `Design your ${settingLabel} builder loaded. `;
		if (settingStep?.data) {
			announcement += `Step 1: Setting selected — ${settingStep.data.name}, ${getPriceData(settingStep.data)}. `;
		} else {
			announcement += `Step 1: Setting not yet selected. `;
		}
		if (diamondStep?.data) {
			announcement += `Step 2: Diamond selected — ${diamondStep.data.name}, ${getPriceData(diamondStep.data)}. `;
		} else {
			announcement += `Step 2: Diamond not yet selected. `;
		}
		if (isCompleteBundle.value) {
			announcement += `Both steps complete. You can now review your ${settingLabel}.`;
		}
		$bus.emit('aria-announce', announcement);
	});
}
function completeSetting() {
	const isDiamondValid = simpleProduct.value?.sku && simpleProduct.value?.sku.trim() !== '';
	const isSettingValid = configProduct.value?.sku && configProduct.value?.sku.trim() !== '';
	if (isDiamondValid && isSettingValid) {
		let selectedSku = configProduct.value?.selectedVariant?.sku || configProduct.value?.sku;
		let diamondSku = simpleProduct.value?.sku;
		let url = STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', selectedSku).replace(':diamond', diamondSku);
		if (url && selectedSku && diamondSku) {
			$bus.emit(
				'aria-announce',
				`Reviewing your ${settingName.value === 'Earring' ? 'Earrings' : settingName.value}. Setting: ${configProduct.value?.name || selectedSku}. Diamond: ${simpleProduct.value?.name || diamondSku}. Redirecting to review page.`
			);
			router.push(url);
		}
	} else {
		const missing = [];
		if (!isSettingValid) missing.push('a setting');
		if (!isDiamondValid) missing.push('a diamond');
		$bus.emit(
			'aria-announce',
			`Cannot review yet. Please select ${missing.join(' and ')} to continue.`
		);
	}
}
async function removeProduct(data = null) {
	let inBundleIndex = bundleSteps.value.findIndex((el) => el.type == data.type);
	if (inBundleIndex > -1) {
		const removedName = data?.data?.name || data?.text || '';
		const stepLabel = data.type === 'configurable' ? 'Setting' : getDiamondText.value;
		$bus.emit(
			'aria-announce',
			`${removedName ? removedName : stepLabel} removed from Step ${inBundleIndex + 1}. Redirecting to select a new ${stepLabel}.`
		);
		let url = changeProduct(data);
		bundleSteps.value[inBundleIndex].data = null;
		await bundle.clearData({ type: data.type, category: categoryEventModified.value?.key ?? 'ring' });
		router.push(url);
	}
}
function searchRedirect(paramItem = null) {
	try {
		const stepLabel = paramItem?.type === 'simple' ? getDiamondText.value : 'Setting';
		$bus.emit(
			'aria-announce',
			`Redirecting to select a ${stepLabel} for your ${settingName.value === 'Earring' ? 'Earrings' : settingName.value}.`
		);
		let url = '';
		let redirectTo = null;
		let shape = null;
		let existUrl = null;
		if (!paramItem?.data) {
			let existingData = bundleSteps.value.find((el) => el.data != null);
			if (existingData) {
				if (existingData?.type == 'configurable' && existingData?.data) {
					let variantData = existingData?.data?.selectedVariant;
					shape = variantData && variantData?.shape ? variantData?.shape?.toLowerCase() : '';
					existUrl = existingData?.data?.redirect_diamond_search_link?.category ? urlWithCategory(existingData?.data?.redirect_diamond_search_link) : existingData?.data?.redirect_diamond_search_link ?? STATIC_ROUTES.HOME;
				}
				if (existingData?.type == 'simple' && existingData?.data) {
					shape = existingData?.data && existingData?.data?.shape ? existingData?.data?.shape?.toLowerCase() : '';
					existUrl = existingData?.data?.redirect_search_link?.category ? urlWithCategory(existingData?.data?.redirect_search_link) : existingData?.data?.redirect_search_link ?? STATIC_ROUTES.HOME;
				}

				redirectTo = `${existUrl}${checkFilterApply(existUrl) ? `?center_stone_shape=${shape}` : `/${shape}`}`;
			} else if (props.product) {
				redirectTo = paramItem?.type == 'simple' ? (props.product?.redirect_diamond_search_link?.category ? urlWithCategory(props.product?.redirect_diamond_search_link?.category) : props.product?.redirect_diamond_search_link) : props.product?.redirect_search_link;
			}
			url = redirectTo?.category
				? urlWithCategory(redirectTo)
				: redirectTo ?? STATIC_ROUTES.HOME;
		}
		if (paramItem?.search_url) {
			url = paramItem?.search_url;
			if (paramItem?.type == 'simple' && settingName.value?.toLowerCase() == 'earring') {
				url = url + `diamond-pair`;
			}
		} else if (!url?.includes('diamond')) {
			url = categoryEventModified.value?.search_url;
		}
		router.push(url);
	} catch (error) {
		console.log(error);
	}
}

watch(bundleData, (data) => {
	bundleSteps.value = [];
	simpleProduct.value = null;
	configProduct.value = null;

	let presentProduct = null;

	Object.values(data).forEach((stepProduct) => {
		if (!stepProduct?.family) return;

		presentProduct = stepProduct;

		if (stepProduct.type === 'simple') {
			simpleProduct.value = stepProduct;
		}

		if (stepProduct.type === 'configurable') {
			configProduct.value = stepProduct;
		}

		bundleSteps.value.push({
			text: shortenText.value[stepProduct.attribute_family_code],
			type: stepProduct.type,
			data: stepProduct
		});
	});

	if (bundleSteps.value.length === 1) {
		bundleSteps.value.push({
			text: presentProduct?.type === 'simple'
				? 'Setting'
				: getDiamondText.value,
			type: presentProduct?.type === 'simple'
				? 'configurable'
				: 'simple',
			data: null
		});
	}

	if (!simpleProduct.value && !configProduct.value) {
		bundleSteps.value.push({
			text: 'Setting',
			type: 'configurable',
			data: null,
			search_url: categoryEventModified.value?.search_url ?? STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH
		});

		bundleSteps.value.push({
			text: getDiamondText.value,
			type: 'simple',
			data: null,
			search_url: STATIC_ROUTES.DIAMONDS_SEARCH
		});
	}
}, { immediate: true, deep: true });
</script>
