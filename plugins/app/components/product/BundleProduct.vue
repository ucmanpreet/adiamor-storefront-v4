<template>
    <!-- Product info -->
    <div class="xl:pb-6 lg:max-w-[424px] w-full flex flex-col flex-none ml-auto">
        <div class="text-lg">
            <h1>{{ getBundleName }}</h1>
        </div>
        <!-- Selection -->
        <div class="mt-6">
            <h3 class="sr-only hidden sm:block">Selection</h3>
            <div class="flex gap-3 w-full" :class="index == 1 ? 'mt-2' : ''" v-for="(item, index) in bundleOptions"
                :key="index">
                <NuxtLink :to="productRedirection(item)" class="flex w-full">
                    <template v-if="item?.images?.length">
                        <MediaImage :src="item" alt="" className="w-8 h-8 sm:w-9 sm:h-9 mt-1 flex-none object-contain" aria-hidden="true" />
                    </template>
                    <template v-else>
                        <Icon :name="product.attribute_family_code" v-if="item.attribute_family_code != 'certified_diamond'"
                            class="w-5 h-5 sm:w-9 sm:h-9 mt-1 flex-none" aria-hidden="true" />
                        <Icon :name="getPairedIcon" v-else class="w-5 h-5 sm:w-9 sm:h-9 mt-1 flex-none" aria-hidden="true" />
                    </template>

                    <div class="space-y-0.5 flex-1 ml-3">
                        <p class="text-sm leading-normal">{{ getItemName(item) }}</p>
                        <p class="font-extralight not-italic text-xs mb-2"><i class="not-italic">{{ getLableVlaue(item) }}</i> #: {{ skuToDisplay(item?.sku) ?? item.sku }}
                        </p>
                        <div class="text-right" v-if="item?.is_available">
                            <span v-if="showStrikeThroughPrice(item, item?.selectedVariant)" class="sr-only">
                                Original price {{ formattedPrice(showStrikeThroughPrice(item, item?.selectedVariant)) }}, discounted price {{ formattedPrice(fetchPriceData(item, item?.selectedVariant)) }}
                            </span>
                            <span v-else-if="item.price" class="sr-only">Price {{ formattedPrice(fetchPriceData(item, item?.selectedVariant)) }}</span>
                            <span aria-hidden="true">
                                <span v-if="showStrikeThroughPrice(item, item?.selectedVariant)" class="line-through text-gray-600 text-sm mr-1">{{ formattedPrice(showStrikeThroughPrice(item, item?.selectedVariant)) }}</span>
                                <span v-if="item.price" class="font-medium text-sm sm:text-base"
                                    :class="{ 'text-black': showStrikeThroughPrice(item, item?.selectedVariant) }">
                                    {{ formattedPrice(fetchPriceData(item, item?.selectedVariant)) }}
                                </span>
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <form>
            <template v-if="isAvailable">
                <!-- Ring Size -->
                <div class="flex flex-col mt-6" v-if="product && product.ring_options && product.ring_options.length">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium">Ring Size:</span>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_FIND_YOUR_RING_SIZE" target="_blank"
                            class="text-xs underline flex items-center gap-1">
                            <Icon name="info" class="w-4 h-4 cursor-pointer relative z-10" />
                            <span>Find your ring size</span>
                        </NuxtLink>
                    </div>
                    <Dropdown class="w-full" ariaLabel="Ring size" :defaultName="`Select Ring Size`" :variants="formattedRingOptions"
                        :selectedSku="selectedRingSize?.sku" @option-selected="(value) => selectedRingSize = value"
                        @change="(value) => selectedRingSize = value"/>
                </div>
                <!--Prong Style-->
                <div class="flex flex-col mt-6" v-if="product && product.prong_style_options && product.prong_style_options.length">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium">Prong Style:</span>
                    </div>
                    <Dropdown class="w-full" ariaLabel="Prong style" :defaultName="`Select Prong Style`" :variants="modifiedProngs"
                        :selectedSku="selectedProngStyle?.sku" @option-selected="(value) => selectedProngStyle = value"/>
                </div>
            </template>
            <ProductPrice :product="product" :selectedVariant="{}" :priceObject="priceObject" />
            <ProductButtons @clickSubmit="updateModalValues" :product="product" :selectedVariant="{}" />
        </form>
        <ExpertAdviceMobile/>
        <AttributeDetail :product="product" :diamond="diamond" />
    </div>
</template>

<script>
import api from '~/api-client/rest-api/index';
import globalMixin from '~/mixin/sweetAlert.js';
import Icon from '~/components/common/Icon.vue';
import Dropdown from '~/components/ui/Dropdown.vue';
import ProductPrice from '~/components/product/ProductPrice.vue';
import ProductButtons from '~/components/product/ProductButtons.vue';
import ExpertAdviceMobile from '~/components/common/ExpertAdviceMobile.vue';
import AttributeDetail from '~/components/product/AttributeDetail.vue';
import { showStrikeThroughPrice, fetchPriceData, skuToDisplay, productRedirection } from "~/utils/universalHelper.js";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";


export default {
    name : "BundleProduct",
    components: {
        Icon,
        Dropdown,
        ProductPrice,
        ProductButtons,
        ExpertAdviceMobile,
        AttributeDetail,
        MediaImage
    },
    data() {
        return {
            STATIC_ROUTES,
            selectedVariant: '',
            bundleOptions: [],
            bundleFormatedPrice: '',
            selectedRingSize: '',
            bundleProduct: '',
            setting: '',
            diamond: {},
            selectedProngStyle: null,
            priceObject: {},
            bundleProductData: null,
            attributesData: {},
        }
    },
    props: {
        product: Object,
    },
    async mounted() {
        this.bundleProductData = await this.$store.getters.getBundleItem;
        this.setBundleOptions();
    },
    computed: {
        getPairedIcon() {
          if(this.diamond?.attribute_family_code) {
              return `${this.diamond?.attribute_family_code}${this.diamond?.sku?.includes('|') ? '_pair' : ''}`;
          }
          return 'certified_diamond';
        },
        getBundleName() {
            return `Your Completed ${this.product?.family}`;
        },
        formattedRingOptions() {
            return this.product.ring_options.map(item => {
                return {
                    sku: item, // Using the ring size as SKU
                    name: this.getRingLabel(item), // Label generation logic
                };
            });
        },
        modifiedProngs() {
            let prevProng = null;
            if(this.attributesData && this.attributesData?.prong_style) {
                prevProng = this.attributesData?.prong_style;
            }
            return this.product.prong_style_options.map(item => {
                if(prevProng && prevProng === item?.admin_name) {
                    this.selectedProngStyle = {
                    sku: item?.id, // Using the id as SKU
                    name: item?.admin_name, // Label generation logic
                };
                }
                return {
                    sku: item?.id, // Using the id as SKU
                    name: item?.admin_name, // Label generation logic
                };
            });
        },
        isAvailable() {
            return this.bundleProductData?.setting?.is_available && this.bundleProductData?.diamond?.is_available;
        }
    },
    methods: {
        fetchPriceData: item => fetchPriceData(item),
        showStrikeThroughPrice: item => showStrikeThroughPrice(item),
        skuToDisplay: item => skuToDisplay(item),
        productRedirection: value => productRedirection(value),
        getLableVlaue(item) {
             return item?.attribute_family_code  == 'certified_diamond' ? 'Item' : 'Style';
        },

        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), false);
        },
        getItemName(item) {
            let attributes = this.attributesData;            
            if (attributes && attributes?.backing && item?.attribute_family_code == "earring") {
                return item?.name + ' with ' + attributes.backing;
            }
            return item?.name;
        },
        updateModalValues() {
            if(!this.product?.is_backing) {
                this.createBundleItem();
                return;  
            }
            let attributes = this.attributesData;
            if(attributes && attributes?.backing) {
                this.createBundleItem();
                return; 
            }
            this.$emit('clicked', {
                buttonModalBool: this.product?.button_setting?.is_modal_open, selectedVariant: {}
            });
            console.log('bundleProductData', this.bundleProductData);
        },
        getRingLabel(item) {
            if (!item || !item.size) return item;
            const basePrice = this.getFinalPrice;
            let currentPrice = '';
            if (this.basePrice) {
                const minimumDelta = this.ringOptions[0].delta;
                currentPrice = Math.round(this.basePrice * (item.delta / minimumDelta) / 10) * 10;
                item.current_price = currentPrice;
                item.formatted_price = this.$formatPrice(parseInt(currentPrice));
            }
            const calPrice = currentPrice ? parseInt(basePrice) - currentPrice : item.current_price;
            const formattedPrice = calPrice !== 0
                ? `${calPrice > 0 ? '-' : '+'}${this.$formatPrice(Math.abs(calPrice))}`
                : '';
            return `${item.size}${formattedPrice ? ` (${formattedPrice})` : ''}`;
        },
        async setBundleOptions() {
            let bundleItem = this.bundleProductData;
            if (bundleItem && Object.keys(bundleItem).length > 0) {
                this.priceObject.current_price = bundleItem['price'];
                this.priceObject.discounted_price = bundleItem['discounted_price'];
                this.bundleFormatedPrice = this.$formatPrice(bundleItem['price']);
                this.bundleOptions.push(bundleItem['setting'], bundleItem['diamond']);
                this.setting = bundleItem['setting'];
                this.diamond = bundleItem['diamond'];
            }
            
            // Default value for ring_size
            let attributeSKUData = await this.$store.getters.getProductAttribute;
            let attributes = attributeSKUData[this.product.parent_sku];
            this.attributesData = attributes ?? {};
            
            if(attributes && attributes?.ring_size) {
                this.selectedRingSize = { sku : attributes?.ring_size };
            }
        },
        async createBundleItem() {
            try {
                let data = {
                    // selected_configurable_option: this.setting?.id,
                    // selected_diamond_option: this.diamond?.id
                    selected_configurable_option: this.setting?.sku,
                    selected_diamond_option: this.diamond?.sku
                };
                this.$emit('loader', true);
                let response = await api.postRequest(this.$axios, 'create-bundle-product', data);
                if (!response) {
                    globalMixin?.methods.createSwalAlert('Internal Server Error', "error");
                    this.$emit('loader', false);
                    return;
                }
                let result = response.data?.data;
                if (result) {
                    if (result?.Error || result?.error) {
                        globalMixin?.methods.createSwalAlert(result.Error ?? result?.error, "error")
                    }
                    if (response?.status == 200) {
                        this.bundleProduct = result;
                        this.addToCart();
                        this.$emit('loader', false);
                        // globalMixin?.methods.createSwalAlert(response?.data?.message, "success");
                    }
                }
                this.$emit('loader', false);
            } catch (error) {
                this.$emit('loader', false);
                globalMixin?.methods.createSwalAlert('Internal Server Error', "error");
            }
        },
        async addToCart() {
            let bundle_options = {}, bundle_option_qty = {};
            let attributes = {};

            if (this.bundleProduct && this.bundleProduct.bundleOptions) {
                this.bundleProduct.bundleOptions.forEach((el, index) => {
                    if (!bundle_options[el.id]) {
                        bundle_options[el.id] = {};
                    }
                    bundle_options[el.id][`index_0`] = this.bundleProduct?.productBundleOptions[index]?.product_id;
                    bundle_option_qty[el.id] = this.bundleProduct?.productBundleOptions[index]?.qty ?? 1;
                });
            }
            if (this.selectedProngStyle) {
                attributes['prong_style'] = this.selectedProngStyle?.name ?? this.selectedProngStyle;
            }
            if (this.selectedRingSize && this.selectedRingSize?.name) {
                attributes['ring_size'] = this.selectedRingSize?.name;
            }
            let data = {
                product_id: this.bundleProduct?.id,
                quantity: 1,
                bundle_options,
                bundle_option_qty,
                attributes
            };
            this.$emit('addToCart', data);
        },
    },
}
</script>