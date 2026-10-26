<template>
    <div>
        <!-- Top Engagement Ring Styles -->
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/top-seller-hero.jpg?updatedAt=1746137326007`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
			alt="Top Engagement Ring Styles"
			>
            <h1
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">
                Top Engagement Ring Styles</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Adiamor's best engagement rings styles make it easy to design the perfect ring for you. From simple solitaires to halo and 3 stone rings, you can't go wrong with these Adiamor in house designs.</p>
        </Banner>

        <div
            class="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-4 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 relative">
            <div
                v-if="loader"
                class="absolute inset-0 flex items-center justify-center"
                role="status"
                aria-live="polite"
                aria-label="Loading top engagement ring styles"
            >
                <CustomLoader />
            </div>

            <template v-if="!loader && topPurchased && topPurchased.length">
                <article v-for="(item, index) in topPurchased" :key="index"
                    class="md:my-5 relative flex flex-col sm:flex-row">
                    <div class="sm:absolute left-0 inset-y-0 sm:w-4/12 overflow-hidden bg-white border border-gray-200">
                        <MediaImage :src="item"
                            className="w-full h-full object-contain" :alt="item.name" />
                    </div>
                    <div class="sm:w-8/12 sm:ml-auto pt-3 sm:pt-0 sm:pl-4 text-center sm:text-left">
                        <h2 class="text-sm sm:text-lg lg:text-xl line-clamp-2 h-10 sm:h-auto">
                            {{ item.name }}
                        </h2>
                        <p class="mt-1 sm:mt-3 text-xs sm:text-base">{{ item.description }}</p>
                        <p class="mt-1 sm:mt-3 text-xs sm:text-base font-normal lg:font-medium">Starting at {{
                            formattedPrice(item.discounted_price || item.price) }}</p>
                        <div class="mt-6">
                            <NuxtLink
                                :to="getProductLink(item)"
                                class="inline-flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary text-white font-normal sm:!text-sm px-8 py-2 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90"
                                :aria-label="`View more details for ${item.name}, starting at ${formattedPrice(item.discounted_price || item.price)}`"
                            >
                                View More
                            </NuxtLink>
                        </div>
                    </div>
                </article>
                <div class="col-span-full pt-2" v-if="topPurchased?.length > limit && totalProduct > topPurchased?.length">
                    <Button
                        @click="handleLoadMore"
                        type="button"
                        colorType="bordered-primary-fill"
                        class="max-w-xs w-full m-auto sm:max-w-screen-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        :aria-label="listLoader ? 'Loading more engagement rings' : 'Load more engagement rings'"
                    >
                        {{ listLoader ? `Loading......` : `Load More` }}
                    </Button>
                </div>
            </template>

            <template v-if="!loader && topPurchased && !topPurchased.length">
                <div class="col-span-full" role="status" aria-live="polite">
                    <NoDataFound :type="'engagement-rings'" />
                </div>
            </template>
        </div>

        <!-- Shop Our Socials -->
        <ShopSocials />

        <!-- Recently Viewed Products -->
        <section class="pt-6 sm:pt-12 pb-6">
            <!--product.matching-->
            <RecentlyViewed :heading="'Recently Viewed'" />
        </section>

        <!-- Contact Links -->
        <div>
            <ContactLink />
        </div>
    </div>
</template>
<script setup>
import Banner from "~/components/ui/Banner.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import Button from "~/components/common/Button.vue";
import NoDataFound from "~/components/common/NoDataFound.vue";
import ShopSocials from "~/components/common/ShopSocials.vue";
import RecentlyViewed from "~/components/carousel/RecentlyViewed.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { productRedirection } from "~/utils/universalHelper";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const api = useApi();
const { createSwalAlert } = useAlert();
const { $bus, $formatPrice } = useNuxtApp();

const topPurchased = ref([]);
const page = ref(1);
const limit = ref(16);
const listLoader = ref(false);
const loader = ref(true);
const totalProduct = ref(0);

onMounted(async () => {
    $bus.emit(
        'aria-announce',
        'Top Engagement Ring Styles page loaded. Browse our best selling engagement ring designs.'
    )
    await getTopEngagnementRingsItems();
});

watch(page, () => {
    getTopEngagnementRingsItems();
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

function handleLoadMore() {
    $bus.emit('aria-announce', 'Loading more engagement ring styles.')
    page.value++
}
function getProductLink(value) {
    return productRedirection(value);
}
function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
async function getTopEngagnementRingsItems() {
    try {
        page.value != 1 ? listLoader.value = true : '';
        const response = await getRequest(`get/gallery?product_type=top_engagement_rings&page=${page.value}&limit=${limit.value}`);
        (page.value != 1 && response) ? listLoader.value = false : '';
        (page.value == 1 && response) ? loader.value = false : '';
        if (!response) {
            $bus.emit('aria-announce', 'Internal server error while loading engagement rings.')
            return;
        }
        if (response && response.data && response.data.success) {
            topPurchased.value = page.value == 1 ? response.data.data ?? [] : topPurchased.value.concat(response.data.data) ?? [];
            totalProduct.value = response.data?.pagination?.total;
            nextTick(() => {
                $bus.emit(
                    'aria-announce',
                    `${response.data.data?.length || 0} engagement ring styles loaded.`
                )
            })
        }
    } catch (error) {
        console.log('Get Similar Product Error' + error);
        $bus.emit('aria-announce', 'An error occurred while fetching engagement rings.')
    }
}
function getDescription(item) {
    let showIn = item.material_variation ? `<p>Show in ${item.material_variation}</p>` : '';
    let showWith = `<p>Show with ${item.carat ? item.carat : ''} | ${item.shape ? item.shape : ''} | ${item.color ? item.color : ''} | ${item.clarity ? item.clarity : ''}</p>`;
    return `${showIn}${showWith}`;
}
</script>