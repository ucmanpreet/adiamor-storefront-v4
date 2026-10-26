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

// Former `created` hook: runs un-awaited at setup time (same ordering as before).
async function loadBundleProduct() {
    try {
        $bus.emit(
            'aria-announce',
            'Loading product details'
        )
        store.setProduct(null);
        store.setBundleItem(null);

        const productData = await store.fetchBundleProductData({ payload: { params: route.query } });
        let setting = productData?.setting;
        let diamond = productData?.diamond;
        loader.value = false;
        isValidProduct.value = setting?.sku && diamond?.sku;
        if (!isValidProduct.value) {
            // 🔹 Announce Not Found
            $bus.emit(
                'aria-announce',
                'Product not found'
            )
            return;
        }
        // 🔹 Announce Success
        $bus.emit(
            'aria-announce',
            `Your engagement ring has been successfully created with ${setting?.name} and ${diamond?.name}. The total cost of the product is ${productData?.formatted_discounted_price}.`
        )

        //Assign product obj
        product.value = {...setting, productData };
        await store.setProduct(setting);
        await store.setBundleItem(productData);
        let currentFamily = setting?.attribute_family_code;
        let bundleType = currentFamily?.includes('earring') ? 'earring' : currentFamily?.includes('ring') ? 'ring' : currentFamily?.includes('necklace') ? 'necklace' : 'ring';
        // Next product url
        if (bundleType) {
            let event = bundleType.charAt(0).toUpperCase() + bundleType.slice(1);
            let selectedVariant = null;
            let settingClone = JSON.parse(JSON.stringify(setting));
            settingClone['type'] = 'configurable';
            if (setting && setting?.variants && setting.variants.length > 0) {
                selectedVariant = setting.variants.find(variant => variant?.sku === setting?.sku);
                settingClone['selectedVariant'] = selectedVariant;
            }
            await bundle[`update${event}`](settingClone);
            await bundle[`update${event}`](diamond);
        }
    } catch (error) {
        console.log('Error while fetching bundle product data', error);
        // 🔹 Announce Error
        $bus.emit(
            'aria-announce',
            'Error loading product details'
        )
    }
}
loadBundleProduct();

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