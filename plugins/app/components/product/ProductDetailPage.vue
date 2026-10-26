<template>
    <div>
        <template v-if="product?.sku">
            <!--Bundle Steps-->
            <BundleSteps :product="product" />
            <!-- Product -->
            <ProductLayout :product="product" @loader="setLoader" @selectedVariantWatch="setSelectedVariant"
                v-model:showYotpoReview="showYotpoReview" v-model:socialGallery="socialMediaGallery" />

            <section aria-label="Similar Products" class="pt-12"
                v-if="similarProduct && similarProduct.length && isNotBundle">
                <ProductCarousel :arrayData="similarProduct" :heading="dynamicHeadingForSimilar" :type="'similar'"
                    :description="'You May Also Like These Elegant Alternatives'" />
            </section>

            <ProductFeature />

            <section aria-label="Matched Products" class="pt-12"
                v-if="matchProduct && matchProduct.length && isNotBundle">
                <!--product.matching-->
                <ProductCarousel :arrayData="matchProduct" :heading="dynamicHeadingForMatched" :description="''"
                    type="matched" />
            </section>


            <section aria-labelledby="why-shop-heading" class="pt-12">
                <div class="custom-gradient pt-4 md:pt-0">
                    <div
                        class="max-w-7xl mx-auto w-full px-4 lg:px-8 relative flex flex-col md:gap-8 md:flex-row items-center justify-between">
                        <div class="flex justify-center w-auto md:w-1/3 lg:w-auto flex-none">
                            <nuxt-img provider="cdn" class="inline-block mix-blend-multiply w-full h-full object-cover"
                                src="/landing-pages/heros/encaseds_wooden_box.jpg?updatedAt=1748410733050"
                                alt="Packaged in an elegant wooden box" />
                        </div>
                        <div class="py-6 lg:py-12 w-full lg:w-auto">
                            <h2 id="why-shop-heading" class="text-lg lg:text-2xl/[50px] font-normal text-black">{{
                                productBasedTitle }}</h2>
                            <div class="mt-6 max-w-md lg:max-w-xl xl:max-w-3xl">
                                <p v-if="isBundleView">Adiamor believes in complete customer satisfaction. We gladly
                                    refund, replace or exchange any unworn item received back in our facility within 30
                                    days.</p>
                                <ul v-else class="grid grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-1 sm:gap-4">
                                    <li class="flex gap-4 items-center" v-for="(el, index) in whyShopArr" :key="index">
                                        <NuxtLink :to="el.link" class="flex flex-wrap gap-1 sm:gap-4 items-center">
                                            <Icon name="check" class="w-5 h-5 text-green-600" aria-hidden="true" />
                                            <span class="text-xs sm:text-sm font-normal">{{ el.text }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>

                            <article class="mt-6 lg:mt-16">
                                <h3
                                    class="text-lg lg:text-2xl/[50px] font-normal text-black font-gill-sans uppercase tracking-wider">
                                    Ships Overnight: <span>{{ getShippingText(product) }}</span>
                                </h3>
                                <NuxtLink :to="STATIC_ROUTES.WHY_SHOP" class="text-xs underline text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    Learn more about why shop at Adiamor
                                </NuxtLink>
                                <p class="mt-2 text-sm">Estimated Ship Date when ordered prior to 2pm
                                    PST.</p>

                                <div
                                    class="mt-6 flex flex-col sm:flex-row flex-wrap gap-2 text-xs xl:text-[13px] capitalize">
                                    <NuxtLink :to="STATIC_ROUTES.POLICIES_SHIPPING"
                                        class="flex items-center gap-2 md:justify-center bg-white p-3" target="_blank">
                                        <Icon name="truck" class="w-6 h-6 text-gray-black" aria-hidden="true" />
                                        <span>Free FedEx Overnight Shipping</span>
                                    </NuxtLink>
                                    <NuxtLink :to="STATIC_ROUTES.POLICIES_RETURN"
                                        class="flex items-center gap-3 sm:gap-2 md:justify-center bg-white p-3"
                                        target="_blank">
                                        <Icon name="return-box" class="w-6 h-6 text-gray-black" aria-hidden="true" />
                                        <span>30-Day Returns Policy</span>
                                    </NuxtLink>
                                    <NuxtLink :to="STATIC_ROUTES.POLICIES_GIFT_PACKAGING"
                                        class="flex items-center gap-2 md:justify-center bg-white p-3" target="_blank">
                                        <Icon name="wooden-box" class="w-5 h-5 text-gray-black" aria-hidden="true" />
                                        <span>Packaged in an elegant wooden box</span>
                                    </NuxtLink>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <div v-if="product?.type == 'simple' && !isBundleView" aria-label="Diamond Education">
                <DiamondEducation :diamondData="product" />
            </div>

            <!--Complete look Craousel-->
            <section aria-label="Complete Look" class="pt-6 sm:pt-12" v-if="showBlueCoreData">
                <CompleteLookCarousel />
            </section>

            <section v-if="socialMediaGallery?.length" aria-label="Adiamor on Social Media" class="pt-12 px-4"
                id="yotpoSocialMediaContainer">
                <ProductCarousel :arrayData="socialMediaGallery" :heading="'Adiamor on Social Media'"
                    :type="'yotpoSocialMedia'" />
            </section>

            <section aria-label="Product Review" v-if="checkReviewBottomType">
                <ProductReviewBottom :product="product" :selectedVariant="selectedVariant"
                    @setYotpoElements="setYotpoReview" />
            </section>

            <section aria-label="Recently Viewed" class="pt-6 sm:pt-12 pb-6"
                v-if="recentViewed && recentViewed.length && !$route.query.setting">
                <!--product.matching-->
                <RecentlyViewed :heading="'Recently Viewed'" :recentViewedProp="recentViewed" />
            </section>
        </template>
    </div>
</template>
<script>
import KEYS from '~/utils/constant.js';
import lang from '~/utils/commonLocale.js';
import api from '~/api-client/rest-api/index.js';
import BundleSteps from '~/components/ui/BundleSteps.vue';
import ProductLayout from '~/components/product/ProductLayout.vue';
import ProductCarousel from '~/components/product/ProductCarousel.vue';
import ProductFeature from '~/components/product/ProductFeature.vue';
import Icon from '~/components/common/Icon.vue';
import DiamondEducation from '~/components/product/DiamondEducation.vue';
import CompleteLookCarousel from '~/components/carousel/CompleteLookCarousel.vue';
import ProductReviewBottom from '~/components/product/ProductReviewBottom.vue';
import RecentlyViewed from '~/components/carousel/RecentlyViewed.vue';
import { correctUrl, getGTMProductImage } from '~/utils/universalHelper';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name: 'ProductDetailPage',
    components: { BundleSteps, ProductLayout, ProductCarousel, ProductFeature, Icon, DiamondEducation, CompleteLookCarousel, ProductReviewBottom, RecentlyViewed },
    data() {
        return {
            STATIC_ROUTES,
            product: {},
            loading: true,
            whyShopArr: [
                { text: 'Manufacturer Direct', link: STATIC_ROUTES.ABOUT },
                { text: 'Complimentary Resizing', link: STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER },
                { text: 'Free Lifetime Warranty', link: STATIC_ROUTES.POLICIES_WARRANTY },
                { text: 'Flexible Financing', link: STATIC_ROUTES.EDUCATION_FINANCING_INSURANCE },
                { text: 'Online Since 1998', link: STATIC_ROUTES.TESTIMONIALS },
                { text: 'Complimentary Appraisal', link: STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER },
            ],
            showReviewData: true,
            showBlueCoreData: false,
            gtmEventData: {
                item_id: "",
                item_name: "",
                item_brand: "",
                item_category: "",
                item_variant: "",
                price: 0,
                quantity: 1
            },
            similarProduct: [],
            matchProduct: [],
            recentViewed: [],
            dispatchEvent: 'getProductData',
            showYotpoReview: true,
            lang,
            selectedVariant: null,
            socialMediaGallery: [],
            heading: {
                main: 'Recently Viewed',
                sub: 'Here’s what you were loving earlier.'
            }
        }
    },
    async mounted() {
        try {
            this.product = await this.$store.getters.getProduct;
            this.loading = false;
            this.assignData();
        } catch (error) {
            console.error('An error occurred in beforeMount:', error);
        }
    },
    computed: {
        isBundleView() {
            return this.$route.name === 'yourSettingPage';
        },
        checkReviewBottomType() {
            return this.product && this.product.is_active && this.isNotBundle && this.product?.type != 'simple';
        },
        dynamicHeadingForMatched() {
            return this.product?.attribute_family_code != "engagement_rings_family" ? 'Complete the Look' : 'Matching Bands';
        },
        isNotBundle() {
            return !this.isBundleView;
        },
        productBasedTitle() {
            return this.isBundleView ? 'Enjoy 30-Day Returns And Free FedEx Overnight Shipping' : 'Why shop at Adiamor?';
        },
        dynamicHeadingForSimilar() {
            let family = this.product?.attribute_family_code;
            let label = lang.similarLabels[family] ?? 'Products';
            if (family.includes('diamond')) {
                let diamondGrowth = null;
                if (this.product?.attributes?.length) {
                    diamondGrowth = this.product.attributes.find(el => el.code == 'diamond_growth')?.value;
                }
                label = 'Diamonds';
                if (diamondGrowth) {
                    label = `${diamondGrowth} Diamonds`;
                }
            }
            return `Similar ${label}`;
        },
        getUrl() {
            return `${this.$config.public.storeFrontHomeURL}${correctUrl(this.product?.url_key)}` ?? '';
        },
    },
    methods: {
        getShippingText(product) {
            return product?.shipping?.message ? product.shipping?.message : lang.moreThanSevenDays;
        },
        async setSelectedVariant(val) {
            this.selectedVariant = val;
            this.$emit(
                'variant-discounted-price',
                this.selectedVariant?.discounted_price ?? 0
            );
            await this.$nextTick(); // wait for reactivity to flush
            await this.callGtmEvent();
            if (this.selectedVariant && this.selectedVariant.sku) {
                this.getSimilarProduct(this.selectedVariant?.id);
                this.getMatchProduct(this.selectedVariant?.id);
            }
        },

        setLoader(val) {
            this.loading = val;
        },
        async assignData() {
            if (this.product?.sku) {
                // View item event
                if (this.product.id && this.product?.type == 'simple') {
                    this.callGtmEvent();
                    this.getSimilarProduct(this.product.id);
                    this.getMatchProduct(this.product.id);
                }
                let allRecentProducts = await this.$indexedDB.getRecentViewedByFamily();
                this.recentViewed = allRecentProducts.filter(obj => (!obj.sku?.includes(this.product.sku))) ?? [];
                if (this.product?.type == 'configurable') {
                    this.getYotpoSocialMedia();
                }
            }
        },
        async callGtmEvent(type = null) {
            let eventType = type ? type : 'view_item';
            await this.$store.commit('setProductGtmData', null);
            let bundleProduct = this.isBundleView ? await this.$store.getters.getBundleItem : null;
            let product = this.isBundleView ? { ...this.product, ...bundleProduct, sku: `${bundleProduct?.setting?.sku}-${bundleProduct?.diamond?.sku}` } : this.selectedVariant?.sku ? this.selectedVariant : this.product;
            let basePrice = this.selectedVariant?.price ?? product?.price;
            let discountedPrice = this.selectedVariant?.discounted_price ?? product?.discounted_price;
            let salePrice = basePrice - discountedPrice;
            this.gtmEventData = {
                "affiliation": KEYS.AFFILIATION_NAME,
                "index": 0,
                "item_id": this.product?.sku || product?.sku,
                "item_list_name": this.$route.fullPath,
                "item_name": product?.name,
                "item_brand": KEYS.BRAND_NAME,
                "item_variant": this.selectedVariant?.sku,
                "item_category": KEYS.ITEM_CATEGORY, // "Apparel & Accessories",
                "item_category2": KEYS.ITEM_CATEGORY2, // "Jewelry",
                "item_category3": ["engagement_rings_family", "complete_ring"].includes(this.product?.attribute_family_code) ? "Ring" : this.product?.family,
                "item_category4": "",
                "item_category5": "",
                "price": basePrice,
                "quantity": 1,
                "coupon": salePrice > 0 ? "on-sale" : null,
                "discount": salePrice,
                "item_url": this.isBundleView ? this.getGTMProductPath(this.$route.fullPath) : this.getGTMProductPath(`${this.product?.url_key}${this.selectedVariant?.sku ? `?sku=${this.selectedVariant?.sku}` : ''}`),
                "item_image_url": getGTMProductImage('front', false, this.product, this.selectedVariant)
            };
            await this.$store.commit('setProductGtmData', this.gtmEventData);
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: eventType });
        },
        getGTMProductPath(url = '') {
            return this.$config.public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + url?.replace(/^\/|\/$/g, '');
        },
        showNextFunc(type = null) {
            if (type == 'similar') {
                if (this.$refs.carouselsimilar) {
                    this.$refs.carouselsimilar.next();
                }
            }
            if (type == 'match') {
                if (this.$refs.carouselmatch) {
                    this.$refs.carouselmatch.next();
                }
            }
        },
        showPrevFunc(type = null) {
            if (type == 'similar') {
                if (this.$refs.carouselsimilar) {
                    this.$refs.carouselsimilar.prev();
                }
            }
            if (type == 'match') {
                if (this.$refs.carouselmatch) {
                    this.$refs.carouselmatch.prev();
                }
            }
        },
        isBot() {
            return /bot|crawler|spider|googlebot|bingbot|slurp|duckduckbot|ia_archiver|facebot|semrush|ahrefsbot|yandex/i
                .test(navigator?.userAgent ?? '');
        },
        async getSimilarProduct(id) {
            if (this.isBot()) return;
            try {
                const response = await api.getRequest(this.$axios, this.$cookies, `get-similar-products?product_id=${id}`);
                if (!response) {
                    console.log('Internal Server Error', "error");
                    return;
                }
                if (response && response.data && response.data.success) {
                    this.similarProduct = response.data.data ?? [];
                    this.gtmProductEvent(this.similarProduct, 'similar');
                }
            } catch (error) {
                console.log('Get Similar Product Error' + error);
            }
        },
        async getMatchProduct(id) {
            try {
                const response = await api.getRequest(this.$axios, this.$cookies, `get-matches-products?product_id=${id}`);
                if (!response) {
                    console.log('Internal Server Error', "error");
                    return;
                }
                if (response && response.data && response.data.success) {
                    this.matchProduct = response.data.data ?? [];
                    this.gtmProductEvent(this.matchProduct, 'matching');
                }
            } catch (error) {
                console.log('Get Match Product Error' + error);
            }
        },
        async gtmProductEvent(filteredData = null, type = null, actionType = null) {
            const correctSku = (product) => product?.sku?.includes('-') ? product?.sku.split('-')[0] : product?.sku;
            await this.$store.commit('setProductGtmData', null);
            let filteredList = filteredData?.length ? filteredData : [];
            if (!filteredList?.length) return;
            if (type === null && (this.$route.name === 'yourSettingPage') && Array.isArray(filteredList) && filteredList.length === 1) {
                const bundleItem = this.$store?.getters?.getBundleItem;
                const settingSku = bundleItem?.setting?.sku;
                const diamondSku = bundleItem?.diamond?.sku;

                if (bundleItem && settingSku && diamondSku) {
                    filteredList[0] = {
                        ...(typeof filteredList[0] === 'object' && !Array.isArray(filteredList[0]) ? filteredList[0] : {}),
                        ...(typeof bundleItem === 'object' && !Array.isArray(bundleItem) ? bundleItem : {}),
                        sku: `${settingSku}-${diamondSku}`
                    };
                }
            }
            const getGTMProductPath = (url = '') => {
                return this.$config.public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + url?.replace(/^\/|\/$/g, '');
            }

            let productType = this.product?.family ? this.product?.family?.replace(' ', '-') : "jewelry";
            let item_list_name = type ? `${type}-items-${productType?.toLowerCase()}` : null;
            let gtmEventData = filteredList?.map((item, index) => {
                if (item) {
                    let isDiamond = item?.attribute_family_code == 'certified_diamond';
                    return {
                        item_id: item?.type != 'simple' && !isDiamond ? correctSku(item) ?? item?.sku : item?.sku,
                        item_name: item?.name ?? item?.title,
                        index,
                        item_variant: type && !isDiamond ? item?.sku : item?.type != 'simple' && !isDiamond ? this.selectedVariant?.sku ?? item?.sku : null,
                        price: item?.price,
                        quantity: 1,
                        item_url: getGTMProductPath(type && item?.href ? `${item?.href}${item?.sku && !isDiamond ? `?sku=${item?.sku}` : ''}` : `${item?.url_key}${this.selectedVariant?.sku ? `?sku=${this.selectedVariant?.sku}` : ''}`),
                        item_image_url: getGTMProductImage('front', false, this.product, this.selectedVariant)
                    };
                }
            });
            await this.$store.commit('setProductGtmData', gtmEventData);
            const additionalData = item_list_name ? { item_list_name } : {};
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: actionType ? actionType : 'view_item_list', txnId: null, additionalData });
        },
        setYotpoReview(val) {
            this.showYotpoReview = val;
        },
        async getYotpoSocialMedia() {
            try {
                const sku = this.product?.sku;
                if (!sku) return;
                let url = KEYS.YOTPO_SOCIAL_MEDIA_BASE_URL; // base URL
                let storeId = this.$config.public.yotpoSiteKey;
                const response = await this.$axios.get(`${url}${storeId}/albums/product/${sku}`);
                if (response?.status === 200 && response?.data?.response?.images?.length > 0) {
                    let images = response?.data?.response?.images;
                    this.socialMediaGallery = images?.map((item) => {
                        return item?.original_image_url ? { img_url: item?.original_image_url, source: item?.source || 'yotpo' } : null;
                    }).filter(item => item !== null);
                }
            } catch (error) {
                console.error('API request failed:', error);
            }
        }
    }
}
</script>