<template>
    <client-only>
        <div class="relative max-w-7xl mx-auto w-full px-4 mt-12 md:pt-4 lg:pt-12 custom-slide-css lg:px-8" id="reviewBottom">
            <div class="bg-[#f6f6f6] px-6 py-4">
                <header class="flex flex-wrap gap-3 justify-between pb-4" v-show="!reviewEmpty">
                    <h2 class="flex-1 text-lg lg:text-2xl/9 font-normal tracking-widest-lg" :aria-label="'Item Reviews'">
                        Item Reviews
                    </h2>
                    <ul class="grid grid-cols-5 sm:flex sm:flex-wrap items-center gap-2 lg:gap-6">
                        <li class="bizrate">
                            <a href="http://www.bizrate.com/reviews/adiamor/97604/" target="_blank" rel="noopener noreferrer" aria-label="Bizrate reviews for Adiamor">
                                <img loading="lazy" alt="Bizrate logo"  width="70" height="70"
                                    :src="$asset('~/assets/images/product-review/coe_gold_2022.webp')">
                            </a>
                        </li>
                        <li class="bbb">
                            <a href="https://www.bbb.org/losangelessiliconvalley/business-reviews/jewelers-retail/adiamor-in-los-angeles-ca-13137794"
                                target="_blank" rel="noopener noreferrer"
                                aria-label="Better Business Bureau rating for Adiamor">
                                <img loading="lazy" alt="BBB Rating Logo" width="100" height="100"
                                    :src="$asset('~/assets/images/product-review/cbbb-badge-horz.webp')">
                            </a>
                        </li>
                        <li class="ivouch">
                            <a href="https://www.yelp.com/biz/adiamor-los-angeles" target="_blank" rel="noopener noreferrer" aria-label="Yelp reviews for Adiamor">
                                <img loading="lazy" alt="Yelp logo" width="100" height="100"
                                    :src="$asset('~/assets/images/product-review/yelp-2c.webp')">
                            </a>
                        </li>
                        <li class="google mt-2">
                            <a href="https://www.google.com/storepages?q=adiamor.com" target="_blank"
                             rel="noopener noreferrer" aria-label="Google Reviews for Adiamor">
                                <nuxt-img provider="cdn" alt="Google Reviews logo"  src="/landing-pages/logos/google-reviews.png"/>
                                <span ref="googleBadge"></span>
                            </a>
                        </li>
                        <li class="knot">
                            <a target="_blank" href="http://www.theknot.com/marketplace/adiamor-los-angeles-ca-972594" rel="noopener noreferrer"
                                aria-label="The Knot Best of Weddings - 2017 Pick">
                                <img loading="lazy"
                                    :src="$asset('~/assets/images/product-review/c8633e9d-8826-47cc-8e1b-2ade19b8df96~rs_180.180.webp')"
                                    width="70" height="70" alt="The Knot Best of Weddings - 2017 Pick Logo">
                            </a>
                        </li>
                    </ul>
                </header>
                <ClientOnly><div class="yotpo yotpo-main-widget" :data-product-id="getSku" :data-price="product.price"
                    data-currency="USD" :data-name="product.name" :data-url="product.url_key" :data-image-url="fetchFirstProductImage(product)"
                    :data-description="product.short_decsription" data-yotpo-element-id="1" role="region" :aria-label="'Customer reviews for ' + product.name"></div></ClientOnly>
            </div>
        </div>
    </client-only>
</template>
<script>
import KEYS from '~/utils/constant.js';
import { fetchFirstProductImage, getGTMProductImage } from '~/utils/universalHelper';
export default {
    name : 'ProductReviewBottom',
    props: {
        product: {},
        selectedVariant: {}
    },
    data() {
        return {
            reviewEmpty: false,
        }
    },
    computed: {
        getSku() {
            let product = this.product;
            return product?.type === 'configurable' && product.sku.includes('-')
                ? product.sku.split('-')[0]
                : product.sku;
        },
    },
    async created() {
        try {
            let url = KEYS.YOTPO_REVIEW_BASE_URL; // base URL
            const sku = this.getSku;
            if(!sku) return;
            const response = await this.$axios.get(`${url}/product/${sku}/top_reviews?reviewType=product`);
            let responseData = response.data;
            //(responseData?.reviews?.length == 0
            if (responseData && !responseData?.bottomline?.totalReview) {
                this.removeYotpoElements();
            }
            if(responseData?.bottomline?.totalReview > 0) {
                this.gtmProductEvent([this.product], null, 'view_item_reviews');
            }
        } catch (error) {
            console.error('API request failed:', error);
            this.removeYotpoElements();
        }
    },
    mounted() {
        if (!import.meta.client) return

        window.___gcfg = { lang: 'en-US' }

        const renderBadge = () => {
            if (!window.gapi || !this.$refs.googleBadge) return

            window.gapi.load('ratingbadge', () => {
                window.gapi.ratingbadge.render(this.$refs.googleBadge, {
                    merchant_id: KEYS.GOOGLE_LOGO_MERCHANT_ID,
                    position: 'INLINE'
                })
            })

            setTimeout(() => {
                const badge = this.$refs.googleBadge
                if (!badge) return
                const ratingbadge = document.getElementById('___ratingbadge_0')
                if (ratingbadge && !ratingbadge.getAttribute('title')) {
                    ratingbadge.setAttribute('title', 'Google Customer Reviews')
                }
            }, 1500)
        }

        if (!document.getElementById('google-platform-js')) {
            const script = document.createElement('script')
            script.id = 'google-platform-js'
            script.src = KEYS.GOOGLE_LOGO_SCRIPT
            script.async = true
            script.defer = true
            script.onload = renderBadge
            document.head.appendChild(script)
        } else {
            renderBadge()
        }
    },
    methods: {
        fetchFirstProductImage: item => fetchFirstProductImage(item),
        removeYotpoElements() {
            this.reviewEmpty = true;
            const element = document.getElementById('reviewBottom');
            this.$emit('setYotpoElements', false);
            if (element) {
                element.remove();
            }
        },
        async gtmProductEvent(filteredData = null, type = null, actionType = null) {
			const correctSku = (product) => product?.sku?.includes('-') ? product?.sku.split('-')[0] : product?.sku;
            await this.$store.commit('setProductGtmData', null);
            let filteredList = filteredData?.length ? filteredData : [];
			if(!filteredList?.length) return;
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
					item_image_url: getGTMProductImage('front', false, this.product,this.selectedVariant)
                };
            }
            });
            await this.$store.commit('setProductGtmData', gtmEventData);
            const additionalData = item_list_name ? { item_list_name } : {};
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : actionType ? actionType : 'view_item_list', txnId: null, additionalData });
        },
    }
}
</script>
<style>
    #___ratingbadge_1 {
        box-shadow: unset !important;
        /* position: unset !important; */
        border: unset !important;
        /* width: 120px !important; */
    }
</style>