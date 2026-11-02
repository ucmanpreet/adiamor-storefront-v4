<template>
    <div :aria-busy="loader">

        <!-- 🔹 Loader -->
        <div v-if="loader"
            class="flex items-center justify-center z-50 h-screen" :class="loader ? '' : 'hidden'"
            role="status"
            aria-live="polite"
            aria-label="Loading product details"
        >
            <CustomLoader />
        </div>

        <!-- 🔹 No Product Found -->
        <div v-if="!isValidProduct && !loader"
            role="alert"
            aria-live="assertive"
        >
            <div class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5">
                <NoDataFound :type="'product'" />
            </div>
        </div>

        <!-- 🔹 Product Detail -->
        <ProductDetailPage :key="$route.fullPath" v-else-if="isValidProduct"/>
    </div>
</template>
<script setup>
import CustomLoader from '~/components/ui/CustomLoader.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import ProductDetailPage from '~/components/product/ProductDetailPage.vue';

const store = useMainStore();
const bundle = useBundleStore();
const route = useRoute();
const { $bus } = useNuxtApp();

const loader = ref(true);
const isValidProduct = ref(false);
const product = ref(null);

// Runs on the server too: the page waits for the bundle, so title/meta/canonical/JSON-LD are in the first HTML
// (no worker.js needed). On the client the server's result is reused from the payload instead of fetching again.
async function loadBundle() {
    try {
        return (await store.fetchBundleProductData({ payload: { params: route.query } })) ?? null;
    } catch (error) {
        console.log('Error while fetching bundle product data', error);
        return null;
    }
}

const announce = (msg) => { if (import.meta.client) $bus.emit('aria-announce', msg); };

announce('Loading product details');
store.setProduct(null);
store.setBundleItem(null);

const { data: productData } = await useAsyncData(`bundle:${route.fullPath}`, loadBundle);
const setting = productData.value?.setting;
const diamond = productData.value?.diamond;
loader.value = false;
isValidProduct.value = !!(setting?.sku && diamond?.sku);

if (!isValidProduct.value) {
    announce('Product not found');
} else {
    announce(`Your engagement ring has been successfully created with ${setting?.name} and ${diamond?.name}. The total cost of the product is ${productData.value?.formatted_discounted_price}.`);

    //Assign product obj
    product.value = { ...setting, productData: productData.value };
    store.setProduct(setting);
    store.setBundleItem(productData.value);
    const currentFamily = setting?.attribute_family_code;
    const bundleType = currentFamily?.includes('earring') ? 'earring' : currentFamily?.includes('ring') ? 'ring' : currentFamily?.includes('necklace') ? 'necklace' : 'ring';
    const event = bundleType.charAt(0).toUpperCase() + bundleType.slice(1);
    const settingClone = JSON.parse(JSON.stringify(setting));
    settingClone['type'] = 'configurable';
    if (setting?.variants?.length > 0) {
        settingClone['selectedVariant'] = setting.variants.find(variant => variant?.sku === setting?.sku);
    }
    bundle[`update${event}`](settingClone);
    bundle[`update${event}`](diamond);
}

useHead(() => {
    // P4 SEO Fix: Prevent search engines from indexing 404 pages.
    if (!loader.value && !isValidProduct.value) {
        return {
            meta: [
                { key: 'robots', name: 'robots', content: 'noindex' }
            ]
        };
    }

    if (!loader.value && isValidProduct.value) {
        const prod = product.value || {};
        const canonicalUrl =  route.fullPath;
        const getPrimaryImage = (prod) => {
            let images = prod?.images || [];
            // 2. Try image with type === 'front'
            const frontImage = images.find(img => img.view === 'front');
            if (frontImage?.path) return frontImage.path;
            // 3. Fallback to first image
            return images[0]?.path || '';
        };

        const title = prod?.meta_title || prod?.name || 'Default Title';
        const description = prod?.meta_description || '';
        const keywords = prod?.meta_keywords || '';
        const image = prod?.og_image_url || getPrimaryImage(prod);
        const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const buildOffers = () => {
            if (prod?.variants?.length) {
                return prod.variants.map(v => ({
                    '@type': 'Offer',
                    'url': canonicalUrl,
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
</script>