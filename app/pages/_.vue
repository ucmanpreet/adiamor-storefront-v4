<template>
    <!-- Skeleton Loader -->
    <DiamondDetailSkeleton v-if="loader && skeletonType === 'diamond'" />
    <ProductDetailSkeleton v-else-if="loader && skeletonType !== 'diamond'" />

    <!-- Product Detail -->
    <ProductDetailPage v-else-if="isValidProduct && !loader" :key="$route.path" @variant-discounted-price="receiveDiscountedPrice"/>

    <!--No Product found-->
    <div v-else-if="product && !isValidProduct && !loader"
        role="status"
        aria-live="polite"
        aria-label="Product not found"
    >
        <div class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5">
            <NoDataFound :type="'product'" />
        </div>
    </div>

    <!-- No Page found -->
    <div v-else>
        <aside class="text-center max-w-lg mx-auto px-4 sm:px-6 pb-16 pt-6 lg:px-8 space-y-4"
            role="region"
            aria-labelledby="page-not-found-heading"
        >
            <Icon name="custom-search" class="w-72 h-72 m-auto text-gray-400" />

            <h1 id="page-not-found-heading" class="text-lg md:text-4xl font-normal">404 - Page Not Found</h1>

            <p>The page you are looking for does not exist.</p>

            <div class="flex gap-4">
                <Button
                    type="button"
                    class="mx-auto flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="handleGoHome"
                    aria-label="Go to homepage"
                >
                    Go Home
                </Button>

                <Button
                    type="button"
                    colorType="bordered-primary"
                    class="mx-auto flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="handleGoBack"
                    aria-label="Go back to previous page"
                >
                    Go Back
                </Button>
            </div>
        </aside>

        <!-- Shop Jewelery by Category -->
        <ShopJeweleryByCategory :items="items" />

        <div class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>

<script setup>
import DiamondDetailSkeleton from '~/components/skeleton/DiamondDetailSkeleton.vue';
import ProductDetailSkeleton from '~/components/skeleton/ProductDetailSkeleton.vue';
import ProductDetailPage from '~/components/product/ProductDetailPage.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import Icon from '~/components/common/Icon.vue';
import Button from '~/components/common/Button.vue';
import ShopJeweleryByCategory from '~/components/carousel/ShopJeweleryByCategory.vue';
import ContactLink from '~/components/common/ContactLink.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig().public;
const { $bus } = useNuxtApp();

const items = ref([
    {
        title: 'Engagement Rings',
        link: STATIC_ROUTES.ENGAGEMENT_RINGS,
        image: '/landing-pages/heros/marbtest.jpg'
    },
    {
        title: 'Wedding Rings',
        link: STATIC_ROUTES.WEDDING_RINGS,
        image: '/landing-pages/heros/wedding_rings_script.jpg'
    },
    {
        title: 'Diamond Earrings',
        link: STATIC_ROUTES.EARRINGS,
        image: '/landing-pages/heros/diamond-earrings-home-block.jpg'
    },
    {
        title: 'Diamond Pendants',
        link: STATIC_ROUTES.NECKLACES,
        image: '/landing-pages/update/c_pendant.webp'
    }
]);
const loader = ref(true);
const isValidProduct = ref(false);
const product = ref(null);
const variantDiscountedPrice = ref(0);

const skeletonType = computed(() => {
    const { path, query } = route;
    if (query.type === 'diamond' || path.includes('diamond-pair')) return 'diamond';
    return 'product';
});

useHead(() => {
    // P4 SEO Fix: Prevent search engines from indexing 404 pages.
    // Defense-in-depth alongside the HTTP 404 status code — covers edge
    // cases where CDN/cache layers might inadvertently serve a 200.
    if (!loader.value && !isValidProduct.value) {
        return {
            meta: [
                { key: 'robots', name: 'robots', content: 'noindex' }
            ]
        };
    }

    if (!loader.value && isValidProduct.value) {
        const prod = product.value || {};

        const fallbackPath = `${config.storeFrontHomeURL}${route.path}`;
        // API sends a relative url_key (/diamonds/..); canonical must be absolute
        const toAbsolute = (u) => (u && u.startsWith('/') ? `${(config.storeFrontHomeURL || '').replace(/\/$/, '')}${u}` : u);
        const canonicalUrl = route.name === 'yourSettingPage' ? route.fullPath : toAbsolute(prod?.canonical_url || prod?.url_key) || fallbackPath;
        const getPrimaryImage = (product, routeSku) => {
            let images = product?.images || [];
            if(routeSku && product?.variants?.length){
                const matchedVariant = product?.variants?.find(el => el.sku === routeSku);
                if (matchedVariant?.sku) images = matchedVariant?.images || [];
            }
            // 2. Try image with type === 'front'
            const frontImage = images.find(img => img.view === 'front');
            if (frontImage?.path) return frontImage.path;
            // 3. Fallback to first image
            return images[0]?.path || '';
        };

        const title = prod?.meta_title || prod?.name || 'Default Title';
        // pairs come without meta_description, so fall back to the product description
        const description = prod?.meta_description || String(prod?.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const keywords = prod?.meta_keywords || '';
        const image = prod?.og_image_url || getPrimaryImage(prod, route.query.sku);
        const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const buildOffers = () => {
            if (prod?.variants?.length) {
                return prod.variants.map(v => ({
                    '@type': 'Offer',
                    'url': `${config.storeFrontHomeURL}${route.path}?sku=${v.sku}`,
                    'sku': v.sku,
                    'priceCurrency': prod.currency || 'USD',
                    'price': String(v.price || prod.price || 0),
                    'priceValidUntil': priceValidUntil,
                    'availability': `https://schema.org/${v.is_available ? 'InStock' : 'OutOfStock'}`
                }));
            }
            return [{
                '@type': 'Offer',
                'url': canonicalUrl,
                'priceCurrency': prod.currency || 'USD',
                'price': String(prod.price || 0),
                'priceValidUntil': priceValidUntil,
                'availability': `https://schema.org/${prod?.is_available ? 'InStock' : 'OutOfStock'}`
            }];
        };

        const structuredData = {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            'name': prod.name,
            'image': image,
            'description': prod.description || '',
            'sku': prod.sku,
            'mpn': prod.sku,
            'category': prod.category_name || 'Jewelry',
            'inLanguage': 'en-US',
            'brand': {
                '@type': 'Brand',
                'name': 'Adiamor',
                'logo': 'https://cdn.adiamor.com/landing-pages/icons/favicon.svg'
            },
            ...(prod.rating ? {
                'aggregateRating': {
                    '@type': 'AggregateRating',
                    'ratingValue': prod.rating,
                    'reviewCount': prod.reviewCount || 1
                }
            } : {}),
            'offers': buildOffers()
        };

        return {
            title,

            meta: [
                { key: 'description', name: 'description', content: description },
                { key: 'keywords', name: 'keywords', content: keywords },

                // OG tags
                { key: 'og:type', property: 'og:type', content: 'product' },
                { key: 'og:title', property: 'og:title', content: title },
                { key: 'og:description', property: 'og:description', content: description },
                { key: 'og:url', property: 'og:url', content: canonicalUrl },
                { key: 'og:image', property: 'og:image', content: image },

                // Optional extras
                { key: 'og:image:width', property: 'og:image:width', content: '1200' },
                { key: 'og:image:height', property: 'og:image:height', content: '630' },

                // Product OG tags (Facebook/Pinterest use these)
                { key: 'product:availability', property: 'product:availability', content: prod?.is_available ? 'in stock' : 'out of stock' },
                { key: 'product:price:amount', property: 'product:price:amount', content: String(prod.price || 0) },
                { key: 'product:price:currency', property: 'product:price:currency', content: prod.currency || 'USD' },

                // Pinterest
                { name: 'pinterest-rich-pin', content: 'true' },

                // Robots
                { name: 'robots', content: 'index,follow' }
            ],

            link: [
                { key: 'canonical', rel: 'canonical', href: canonicalUrl }
            ],

            script: [
                {
                    key: 'ld-json-product',
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(structuredData)
                }
            ]
        };
    }
    return {};
});

function handleGoHome() {
    $bus.emit('aria-announce', 'Navigating to homepage.');
    goBack(true);
}

function handleGoBack() {
    $bus.emit('aria-announce', 'Going back to previous page.');
    goBack(false);
}
function goBack(toHome = false) {
    if (toHome) return router.push(STATIC_ROUTES.HOME);
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push(STATIC_ROUTES.HOME);
    }
}
function receiveDiscountedPrice(price) {
    variantDiscountedPrice.value = price;
    const name = product.value?.name || 'Product';
    $bus.emit(
        'aria-announce',
        `${name} loaded successfully. Discounted price ${variantDiscountedPrice.value}`
    );
}

// Runs on the server too: the page waits for the product, so title/meta/canonical/JSON-LD are in the first HTML
// (no worker.js needed). On the client the server's result is reused from the payload instead of fetching again.
async function loadProduct() {
    const currentPath = route.path;
    const query = route.query;
    const isPair = currentPath.includes('diamond-pair');

    try {
        let params = isPair ? `${query?.first_pair_key}&${query?.second_pair_key}` : currentPath;
        const productData = await store.fetchProductData({
            payload: { isPair, params, sku: query?.sku }
        });
        return productData ?? null;
    } catch (err) {
        console.error("Fetch hook error while fetching single product:", err);
        return null;
    }
}

if (import.meta.client) {
    $bus.emit('aria-announce', 'Loading product page.');
    store.setProduct(null);
}
const { data: productData } = await useAsyncData(`pdp:${route.fullPath}`, loadProduct);
loader.value = false;
product.value = productData.value;
if (productData.value?.sku) {
    store.setProduct(productData.value);
    isValidProduct.value = true;
    if (import.meta.client) {
        nextTick(() => $bus.emit('aria-announce', `${productData.value.name || 'Product'} loaded successfully.`));
    }
} else if (import.meta.client) {
    $bus.emit('aria-announce', 'Product not found.');
}
</script>
