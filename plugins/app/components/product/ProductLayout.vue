<template>
    <div>
        <!-- Product -->
        <div class="flex flex-col lg:flex-row gap-y-2 sm:gap-y-8 xl:gap-y-0 gap-x-14 max-w-7xl mx-auto w-full px-4 lg:px-8 sm:pb-2 sm:pt-6">
            <!-- Image gallery -->
            <DiamondGallery :product="product" v-if="product.attribute_family_code == 'certified_diamond'" @callGTMEvent="callParentEvent"/>
            <BundleImageGallery v-else-if="isBundleView" :product="product" :categoryEvent="categoryEvent" :bundleItem="getBundleItem" @callGTMEvent="callParentEvent"/>
            <SettingImageGallery v-else :product="product" :selectedVariant="selectedVariant" @callGTMEvent="callParentEvent" :socialGallery="getGallery"/>
            <!-- Product info -->
            <BundleProduct :product="product" ref="bundleProductComponent" v-if="product && isBundleView" @clicked="onClickChild" @addToCart="addToCartCommon" @loader="setLoader" />
            <div v-else class="xl:pb-6 w-full flex-none mx-auto"
                :class="{ 'lg:max-w-[424px] mt-2 sm:mt-6 lg:mt-0': product.attribute_family_code == 'certified_diamond', 'lg:max-w-[510px] lg:mt-0': product.attribute_family_code != 'certified_diamond' }">
                <!-- Product name -->
                <ProductName :product="product" v-model:selectedVariant="selectedVariant"
                    v-model:priceObject="priceObject" />
                <!-- Reviews -->
                <ProductReview :product="product" v-show="checkReviewBottomType"/>
                <!-- Simple Product -->
                <SimpleProduct :product="product" v-if="product?.type == 'simple'" @clicked="onClickChild"
                    @storeCookie="storeCookieCommon" />
                <!-- Configurable Product -->
                <ConfigurableProduct :product="product" v-model:selectedVariant="selectedVariant"
                    v-if="product?.type == 'configurable'" @clicked="onClickChild" @addToCart="addToCartCommon"
                    @storeCookie="storeCookieCommon" v-model:priceObject="priceObject" />
                <!-- AttributeDetail Product -->
                <AttributeDetail v-if="product.sku" :product="product" />
            </div>
        </div>
        <div v-if="product?.type == 'simple' && !isBundleView">
            <DiamondDescription v-if="product.diamond_description" :diamondData="product.diamond_description" />
            <!-- <DiamondEducation :diamondData="product" /> -->
        </div>
        <div v-if="buttonModalBool">
            <SubmitModal :buttonModalBool="buttonModalBool" @close="modalClose" :product="product"
                :selectedVariant="selectedVariant" @addToCart="addToCartCommon" @storeCookie="storeCookieCommon" @callBundleEvent="callBundleParentEvent"/>
        </div>
    </div>
</template>
<script>
import api from '~/api-client/rest-api/index.js';
import lang from "~/utils/commonLocale.js";
import DiamondGallery from "~/components/product/DiamondGallery.vue";
import BundleImageGallery from "~/components/product/BundleImageGallery.vue";
import SettingImageGallery from "~/components/product/SettingImageGallery.vue";
import BundleProduct from "~/components/product/BundleProduct.vue";
import ProductName from "~/components/product/ProductName.vue";
import ProductReview from "~/components/product/ProductReview.vue";
import SimpleProduct from "~/components/product/SimpleProduct.vue";
import ConfigurableProduct from "~/components/product/ConfigurableProduct.vue";
import AttributeDetail from "~/components/product/AttributeDetail.vue";
import DiamondDescription from "~/components/product/DiamondDescription.vue";
import SubmitModal from "~/components/modal/SubmitModal.vue";
import { urlWithCategory, getCategoryType, getGTMProductImage } from "~/utils/universalHelper";
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name : 'ProductLayout',
    components: { DiamondGallery, BundleImageGallery, SettingImageGallery, BundleProduct, ProductName, ProductReview, SimpleProduct, ConfigurableProduct, AttributeDetail, DiamondDescription, SubmitModal },
    data() {
        return {
            buttonModalBool: false,
            selectedVariant: {},
            priceObject: {},
        }
    },
    props: ['product', 'loading', 'categoryEvent', 'showYotpoReview', 'socialGallery'],
    methods: {
        callBundleParentEvent() {
            let childBundleProduct = this.$refs.bundleProductComponent;
            if(childBundleProduct && childBundleProduct.createBundleItem && typeof childBundleProduct.createBundleItem === 'function') {
                childBundleProduct.createBundleItem();
            }
        },
        queryOrRoute(url) {
			const routes = [
				{ path: 'design-your-own-earrings', query: 'center_stone_shape=' },
				{ path: 'design-your-own-necklaces', query: 'center_stone_shape=' },
				{ path: 'diamond-pair', query: 'diamond_shape=' },
			];
			const route = routes.find((r) => url?.includes(r.path));
			return route ? `?${route.query}` : STATIC_ROUTES.HOME;
		},
        callParentEvent(type) {
            this.gtmProductEvent([this.product], null, type || 'view_item_media');
        },
        async storeCookieCommon(subUrl = null) {
            try {
                if(subUrl?.category) {
                    subUrl = urlWithCategory(subUrl);
                }
                
                let eventType = getCategoryType(this.product?.attribute_family_code, subUrl);

                if (eventType?.action && this.product && this.product?.is_add_bundle) {
                    if (this.selectedVariant && this.selectedVariant?.sku) {
                        this.product['selectedVariant'] = this.selectedVariant;
                    }
                    await this.$store.dispatch(`bundle/${eventType?.action}`, this.product);
                    let item = this.$store.getters[`bundle/${eventType?.getter}`];

                    //Setting session data
                    let bundleType = eventType?.key ?? 'ring';
                    sessionStorage.setItem('bundleType', bundleType);

                    // Check for valid bundle item
                    const bothExists = item?.diamond?.sku && item?.diamond?.sku.trim() !== '' && item?.setting?.sku && item?.setting?.sku.trim() !== '';
                    if (bothExists) {
                        let diamondShape = item?.diamond?.shape?.toLowerCase();
                        let settingShape = item?.setting?.selectedVariant ? item?.setting?.selectedVariant?.shape?.toLowerCase() : null;
                        if (diamondShape !== settingShape && settingShape && diamondShape) {
                            let diamondOrientedVariant = item?.setting?.variants?.find(variant => variant?.shape?.toLowerCase() === diamondShape && variant?.material_variation == item?.setting?.selectedVariant?.material_variation);
                            let finalSetting = null;
                            // Check Unset Variant
                            let unsetVariant = item?.setting?.variants?.find(variant => variant?.shape?.toLowerCase() === 'unset' && variant?.material_variation == item?.setting?.selectedVariant?.material_variation);

                            if (diamondOrientedVariant && diamondOrientedVariant?.sku) {
                                item.setting.selectedVariant = diamondOrientedVariant;
                                finalSetting = item.setting;
                                await this.$store.dispatch(`bundle/${eventType?.action}`, finalSetting);
                                item = await this.$store.getters[`bundle/${eventType?.getter}`];
                            } else if(unsetVariant && unsetVariant?.sku) {
                              item.setting.selectedVariant = unsetVariant;
                              finalSetting = item.setting;
                              await this.$store.dispatch(`bundle/${eventType?.action}`, finalSetting);
                              item = await this.$store.getters[`bundle/${eventType?.getter}`];
                            }  
                            else{                                
                                await this.$store.dispatch('bundle/clearData', { type: 'configurable', category: eventType?.key ?? 'ring' });
                            }
                        }
                    }
                    const isDiamondValid = item?.diamond?.sku && item?.diamond?.sku.trim() !== '';
                    const isSettingValid = item?.setting?.sku && item?.setting?.sku.trim() !== '';
                    let redirectUrl = subUrl;
                    if(isDiamondValid){
                        redirectUrl += `${item?.diamond?.shape ? `${this.queryOrRoute(redirectUrl)}${item?.diamond?.shape?.toLowerCase()}` : ''}`;
                    }
                    if(isSettingValid){
                        let selectedVariantShape = item?.setting?.selectedVariant ? item?.setting?.selectedVariant?.shape?.toLowerCase() : null;
                        redirectUrl += `${selectedVariantShape ? `${this.queryOrRoute(redirectUrl)}${selectedVariantShape?.toLowerCase()}` : ''}`;
                    }
                    if (isDiamondValid && isSettingValid) {
                        let selectedSku = item?.setting?.selectedVariant?.sku || item?.setting?.sku;
                        let diamondSku = item?.diamond?.sku;
                        redirectUrl = STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', selectedSku).replace(':diamond', diamondSku);
                    }
                    this.gtmProductEvent([this.product], null, 'add_to_bundle');
                    this.$router.push(redirectUrl);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addToCartCommon(payload = null) {
            if (!payload) return;
            try {
                payload['visitor_code'] = this.$cookies ? this.$cookies.get('visitorCode') : '';
                let backingSelected = payload?.attributes?.backing;
                if(!this.product?.is_backing && backingSelected) {
                    payload.attributes.backing = null;
                }
                // Send the API request
                let response = await api.postRequest(this.$axios, 'checkout/cart/add-product', payload);
                // On successful response
                if (response && response.status === 200 && response.data) {
                    this.$router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${response.data?.data.visitor_code}`);
                    // Clear bundle step data
                    this.$store.dispatch('bundle/clearData', { type: 'simple', category: this.getStateRef ?? 'ring' });
                    this.$store.dispatch('bundle/clearData', { type: 'configurable', category: this.getStateRef ?? 'ring' });
                    this.$store.commit('setProductAttribute', {});
                    await this.gtmProductEvent([this.product], null, 'add_to_cart');
                    await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : 'add_to_cart' });
                    this.$bus.emit("addToCartResponse", { error : null });
                } else if (response?.data?.code === 'diamond_already_in_cart') {
                    this.$bus.emit("addToCartResponse", { error : response?.data?.code });
                    this.$router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${payload.visitor_code}`);
                } else {
                     this.$bus.emit("addToCartResponse", { error : lang.errorMsg});
                }             
            } catch (error) {
                this.$bus.emit("addToCartResponse", { error : lang.errorMsg});
            }
        },
        onClickChild(val) {
            this.buttonModalBool = val?.buttonModalBool;
            this.selectedVariant = val?.selectedVariant ?? {};
        },
        modalClose() {
            this.buttonModalBool = false;
        },
        setLoader(val) {
            this.$emit('loader', val);
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
    },
    watch: {
        'selectedVariant.sku'() {
            this.$emit('selectedVariantWatch', this.selectedVariant);
        }
    },
    computed: {
        getGallery() {
            return this.socialGallery;
        },
        isBundleView() {
			return this.$route.name === 'yourSettingPage';
		},
        checkReviewBottomType() {            
         return this.product && this.product.is_active && !this.isBundleView && this.showYotpoReview && this.product?.type != 'simple';
        },
        getStateRef() {
            const code = (this.product?.attribute_family_code).toLowerCase();
            return code?.includes('earring') ? 'earring' : code?.includes('ring') ? 'ring' : code?.includes('necklace') ? 'necklace' : '';
        },
        getBundleItem() {
            return this.$store.state.bundleItem;
        }
    },
}
</script>