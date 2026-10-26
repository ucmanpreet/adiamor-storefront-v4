<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/earrings-wide.png?updatedAt=1746137196099`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            alt="Diamond Stud Earrings Center"
        >
            <h1 class="text-4xl sm:text-[40px] font-normal mb-4">Diamond Stud Earrings Center</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">
                View our collection of diamond stud earrings suitable for every occasion and any budget.
            </p>
        </Banner>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-16 lg:gap-x-24 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16"
            :key="updateDiv" aria-live="polite">

            <div
                v-if="listLoader"
                class="fixed inset-0 flex items-center justify-center bg-black/30 z-60 group-light"
                role="status"
                aria-live="assertive"
                aria-label="Loading diamond stud earrings"
            >
                <CustomLoader />
            </div>

            <div v-if="Object.keys(earringStud).length === 0 && !listLoader"
                class="col-span-full">
                <NoDataFound :type="'Diamond Stud Earrings'" />
            </div>

            <article class="relative flex flex-col gap-y-4 items-center" v-for="(item, el) in earringStud"
                :key="item.code">

                <div class="w-full overflow-hidden bg-white border border-gray-200 aspect-video">
                    <MediaImage :src="getProductImage(item)" :alt="item.value || 'Diamond Stud Earrings'"
                        className="w-full h-full object-cover"/>
                </div>

                <div class="w-full text-center">
                    <h2 class="font-normal text-base sm:text-lg lg:text-2xl">
                        {{ item.value }}
                    </h2>
                    <div class="mt-6" v-if="item.material_variations && item.material_variations.length">
                        <h3 class="text-sm mb-2">
                            Metal:
                            <span> {{ selectedMetal[item.code]?.value || '14K White Gold' }}</span>
                            <!-- <span v-if="selectedPrice">{{ selectedPrice }}</span> -->
                        </h3>

                        <fieldset class="flex justify-center space-x-4 mt-1.5 material" :key="item?.code"
                            v-if="item.material_variations && item.material_variations.length">

                            <legend class="sr-only">
                                Select metal for {{ item.value }}
                            </legend>

                            <template v-for="(metal) in item.material_variations" :key="`${item.code}_${metal?.id}`">
                                <label
                                    class="relative inline-flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-2 ring-white"
                                    :for="`color-choice-${el}-${metal?.id}`"
                                    :class="{
                                        'border-2 border-primary': selectedMetal[item.code]?.id === metal?.id
                                    }"
                                >
                                    <input
                                        type="radio"
                                        :id="`color-choice-${el}-${metal?.id}`"
                                        :name="`color-choice-${item.code}`"
                                        @change="onMetalChange(el, metal)"
                                        class="sr-only"
                                        :aria-label="metal?.value"
                                    />
                                    <span class="value" :class="getPalletColor(metal?.value)" aria-hidden="true"></span>
                                </label>
                            </template>
                        </fieldset>

                        <ul class="grid grid-cols-3 sm:flex flex-wrap justify-center mt-1.5 material -mx-2">
                            <template v-if="item?.products && item?.products?.length">
                                <li
                                    v-for="(product, index) in item?.products"
                                    :key="`metal-${index}`"
                                    class="p-2"
                                    v-show="getProductAccrodingToMaterial(product, selectedMetal[item.code])"
                                >
                                    <NuxtLink
                                        :to="getRedirectUrl(product)"
                                        class="flex flex-col items-center text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        :aria-label="`${product.modify_name} - ${formattedPrice(product.price)}`"
                                        @click="$bus.emit('aria-announce', `Opening ${product.modify_name}`)"
                                    >
                                        <MediaImage
                                            :src="item.images"
                                            :alt="product.modify_name"
                                            className="block w-12 h-12 mb-5 rounded-full bg-cover"
                                            :style="`transform: scale(${extractCaratScale(item?.products.length, index)})`"
                                        />
                                        <span class="text-center">{{ product.modify_name }}</span>
                                        <span class="text-center">{{ formattedPrice(product.price) }}</span>
                                    </NuxtLink>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </article>
        </div>

        <!-- Design Your Own -->
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                <div class="relative flex flex-col justify-center items-center text-center space-y-4">
                    <header class="col-span-full mx-auto text-center">
                        <h2 class="text-lg md:text-xl lg:text-2xl font-normal">Design Your Own <span
                                class="block text-2xl lg:text-5xl">Diamond Earrings</span></h2>
                        <p class="mt-3 text-sm md:text-lg max-w-3xl mx-auto">Create your own unique pair of diamond
                            earrings.
                        </p>
                    </header>
                    <div>
                        <NuxtLink
                            :to="earringLink"
                            class="inline-block mt-4 px-8 font-medium mx-auto md:ml-0 py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white hover:bg-primary/90 uppercase font-gill-sans tracking-[0.125rem]"
                            aria-label="Start building your diamond earrings"
                            @click="$bus.emit('aria-announce', 'Navigating to design your own diamond earrings page')"
                        >
                            Start building your earrings
                        </NuxtLink>
                    </div>
                </div>
                <div
                    class="relative flex items-center justify-center w-full grow flex-1 overflow-hidden border border-gray-200">
                    <nuxt-img provider="cdn" class="w-full h-full mx-auto object-contain"
                        src="/landing-pages/heros/byo_earringsbg.jpg?updatedAt=1746137185879" alt="Design your own diamond earrings"/>
                </div>
            </div>
        </div>

        <div
            class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>
<script setup>
import NoDataFound from '~/components/common/NoDataFound.vue';
import Banner from '~/components/ui/Banner.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import ContactLink from '~/components/common/ContactLink.vue';
import MediaImage from '~/components/common/MediaImage.vue';
import { redirectionUrl } from '~/utils/universalHelper.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const api = useApi();
const { createSwalAlert } = useAlert();
const { $bus, $formatPrice } = useNuxtApp();

const earringStud = ref({});
const page = ref(1);
const limit = ref(16);
const listLoader = ref(false);
const selectedMetal = ref({});
const updateDiv = ref(0);
const earringLink = STATIC_ROUTES.DESIGN_EARRINGS;

onMounted(async () => {
    $bus.emit('aria-announce', 'Diamond Stud Earrings Center page loaded');
    await getEarringStudsItems();
});

// Inline replacement of api-client getRequest (adds currency/locale, alerts on error, resolves { data: { success: false } }).
async function getRequest(URL) {
    const countryData = useCookie('countryData').value;
    URL += `${URL.includes('?') ? '&' : '?'}currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
    try {
        return await api.request('get', URL, { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        if (error.status === 401) {
            createSwalAlert('Session expired. Please log in again.', 'error');
            window.location.href = STATIC_ROUTES.LOGIN;
        } else {
            createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
}

function getPalletColor(opt) {
    let name = (opt)?.toLowerCase();
    if (name) {
        if (name.includes('yellow')) return 'value-yellow';
        if (name.includes('silver') || name.includes('platinum') || name.includes('white')) return 'value-silver';
        if (name.includes('rose')) return 'value-rose';
        if (name.includes('titanium')) return 'value-titanium';
        if (name.includes('tantalum')) return 'value-tantalum';
    }
    return 'value-yellow'
}
function getRedirectUrl(item) {
    return redirectionUrl(item);
}
function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
async function getEarringStudsItems() {
    try {
        listLoader.value = true;
        const response = await getRequest(`get-stud-earring`);
        listLoader.value = false;
        if (!response) {
            console.log('Internal Server Error', "error");
            return;
        }
        if (response && response.data && response.data.success) {
            earringStud.value = response.data.data ?? {};
            if (earringStud.value && Object.keys(earringStud.value)?.length) {
                Object.keys(earringStud.value)?.forEach(key => {
                    selectedMetal.value[key] = earringStud.value[key].material_variations[0];
                });

                $bus.emit(
                    'aria-announce',
                    `${Object.keys(earringStud.value).length} diamond stud earring styles loaded`
                );
            }
        }
    } catch (error) {
        console.log('Get Similar Product Error' + error);
    }
}
function getProductAccrodingToMaterial(product, element) {
    return product?.variants?.some(el => el.material_variation === element?.id);
}

function extractCaratScale(productLength, index) {
    const minScale = 0.3;
    const maxScale = 1;
    const step = (maxScale - minScale) / (productLength - 1);
    return minScale + index * step;
}

function onMetalChange(el, metal) {
    selectedMetal.value[el] = metal;
    updateDiv.value = updateDiv.value + 1;

    // NOTE: `item` is not defined anywhere (pre-existing bug in the original); kept as-is to avoid a behaviour change.
    $bus.emit(
        'aria-announce',
        `Metal changed to ${metal?.value} for ${item?.value}`
    );
}
function getProductImage(product) {
    let productData = product?.products;
    const data = productData?.flatMap(el => el.variants).find(item => item.material_variation === selectedMetal.value[product?.code]?.id);
    return data ? data?.images : '';
}
</script>