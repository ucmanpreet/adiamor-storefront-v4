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
<script>
import CustomLoader from '~/components/ui/CustomLoader.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import ProductDetailPage from '~/components/product/ProductDetailPage.vue';
export default {
    name : "BundleProductPage",
    components: { CustomLoader, NoDataFound, ProductDetailPage },
    data() {
        return {
            loader: true,
            isValidProduct: false,
            product: null
        }
    },
    async created() {
        try {
            this.$bus.emit(
                'aria-announce',
                'Loading product details'
            )
            this.$store.commit('setProduct', null);
            this.$store.commit('setBundleItem', null);
            
            const productData = await this.$store.dispatch("fetchBundleProductData", { payload: { params: this.$route.query } });
            let setting = productData?.setting;
            let diamond = productData?.diamond;
            this.loader = false;
            this.isValidProduct = setting?.sku && diamond?.sku;
            if (!this.isValidProduct) {
                // 🔹 Announce Not Found
                this.$bus.emit(
                'aria-announce',
                'Product not found'
                )
                return;
            }
            // 🔹 Announce Success
            this.$bus.emit(
                'aria-announce',
                `Your engagement ring has been successfully created with ${setting?.name} and ${diamond?.name}. The total cost of the product is ${productData?.formatted_discounted_price}.`
            )

            //Assign product obj
            this.product = {...setting, productData };
            await this.$store.commit('setProduct', setting);
            await this.$store.commit('setBundleItem', productData);
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
                await this.$store.dispatch(`bundle/update${event}`, settingClone);
                await this.$store.dispatch(`bundle/update${event}`, diamond);                
            }
        } catch (error) {
            console.log('Error while fetching bundle product data', error);
            // 🔹 Announce Error
            this.$bus.emit(
                'aria-announce',
                'Error loading product details'
            )
        }
    },
    head() {
        // P4 SEO Fix: Prevent search engines from indexing 404 pages.
        if (!this.loader && !this.isValidProduct) {
            return {
                meta: [
                    { hid: 'robots', name: 'robots', content: 'noindex' }
                ]
            };
        }

        if (!this.loader && this.isValidProduct) {
            const product = this.product || {};
            const canonicalUrl =  this.$route.fullPath;
            const getPrimaryImage = (product) => {
                let images = product?.images || [];
                // 2. Try image with type === 'front'
                const frontImage = images.find(img => img.view === 'front');
                if (frontImage?.path) return frontImage.path;
                // 3. Fallback to first image
                return images[0]?.path || '';
            };

            const title = product?.meta_title || product?.name || 'Default Title';
            const description = product?.meta_description || '';
            const keywords = product?.meta_keywords || '';
            const image = product?.og_image_url || getPrimaryImage(product);
            const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const buildOffers = () => {
                if (product?.variants?.length) {
                    return product.variants.map(v => ({
                        '@type': 'Offer',
                        'url': canonicalUrl,
                        'sku': v.sku,
                        'priceCurrency': product.currency || 'USD',
                        'price': String(v.price || product.price || 0),
                        'priceValidUntil': priceValidUntil,
                        'availability': `https://schema.org/${v.is_available ? 'InStock' : 'OutOfStock'}`
                    }));
                }
                return [{
                    '@type': 'Offer',
                    'url': canonicalUrl,
                    'priceCurrency': product.currency || 'USD',
                    'price': String(product.price || 0),
                    'priceValidUntil': priceValidUntil,
                    'availability': `https://schema.org/${product?.is_available ? 'InStock' : 'OutOfStock'}`
                }];
            };

            const structuredData = {
                '@context': 'https://schema.org/',
                '@type': 'Product',
                'name': product.name,
                'image': image,
                'description': product.description || '',
                'sku': product.sku,
                'mpn': product.sku,
                'category': product.category_name || 'Jewelry',
                'inLanguage': 'en-US',
                'brand': {
                    '@type': 'Brand',
                    'name': 'Adiamor',
                    'logo': 'https://cdn.adiamor.com/landing-pages/icons/favicon.svg'
                },
                ...(product.rating ? {
                    'aggregateRating': {
                        '@type': 'AggregateRating',
                        'ratingValue': product.rating,
                        'reviewCount': product.reviewCount || 1
                    }
                } : {}),
                'offers': buildOffers()
            };

            return {
            title,

            meta: [
                { hid: 'description', name: 'description', content: description },
                { hid: 'keywords', name: 'keywords', content: keywords },

                // OG tags
                { hid: 'og:type', property: 'og:type', content: 'product' },
                { hid: 'og:title', property: 'og:title', content: title },
                { hid: 'og:description', property: 'og:description', content: description },
                { hid: 'og:url', property: 'og:url', content: canonicalUrl },
                { hid: 'og:image', property: 'og:image', content: image },

                // Optional extras
                { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
                { hid: 'og:image:height', property: 'og:image:height', content: '630' },

                // Product OG tags (Facebook/Pinterest use these)
                { hid: 'product:availability', property: 'product:availability', content: product?.is_available ? 'in stock' : 'out of stock' },
                { hid: 'product:price:amount', property: 'product:price:amount', content: String(product.price || 0) },
                { hid: 'product:price:currency', property: 'product:price:currency', content: product.currency || 'USD' },

                // Pinterest
                { name: 'pinterest-rich-pin', content: 'true' },

                // Robots
                { name: 'robots', content: 'index,follow' }
            ],

            link: [
                { hid: 'canonical', rel: 'canonical', href: canonicalUrl }
            ],

            script: [
                {
                hid: 'ld-json-product',
                type: 'application/ld+json',
                json: structuredData
                }
            ]
            };
        }
        return {};
    },
}
</script>