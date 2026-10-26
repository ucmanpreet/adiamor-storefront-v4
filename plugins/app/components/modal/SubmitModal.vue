<template>
    <div>
        <Modal @close="closeModal" maxWidthClass="max-w-sm" aria-modal="true" aria-labelledby="backing-modal-title">
            <template v-if="product && product.is_backing && !showNextModal">
             <!-- Accessible modal title -->
            <h2 id="backing-modal-title" class="sr-only">
                Backing selection dialog
            </h2>
            <div class="mb-4">
                <p class="text-lg font-light text-gray-900" id="backing-question">What type of backing would you like?</p>
            </div>
            <fieldset
                class="grid grid-cols-2 gap-3 py-4" role="radiogroup" aria-labelledby="backing-question">
                <legend class="sr-only">Select backing type</legend>
                <label v-for="(el, index) in backingType" :key="index"
                    class="relative border border-primary aspect-square flex flex-col items-center justify-center hover:bg-primary/10 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-sm">
                    <input type="radio" name="backing" :value="el" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" :aria-label="`Select ${el} backing`"
                        @change="setBackingType(el)" />
                    <img class="flex-1" :src="getImageForBacking(el)" :alt="`${el} backing option`" loading="lazy">
                    <div class="py-2 uppercase text-center text-sm font-semibold">{{ el }}</div>
                </label>
            </fieldset>
            </template>
            <template v-if="product?.is_backing ? showNextModal : (product?.button_setting?.is_modal_open && visibleModalButtons?.length)">
                <!-- Accessible modal title -->
               <div class="mb-4">
                   <p class="text-lg font-light text-gray-900" id="backing-modal-title">What would you like to do?</p>
               </div>
               <div class="grid grid-cols-1 gap-2">
                   <Button type="button" @click="checkURL(el?.url)"
                       v-for="(el, index) in visibleModalButtons" :key="index"
                       :colorType="index == 0 ? 'primary' : 'bordered-primary'" :aria-label="el?.text || 'Action button'">{{ el?.text}}
                   </Button>
               </div>
            </template>
        </Modal>
    </div>
</template>
<script>
import Modal from "~/components/ui/Modal.vue";
import Button from "~/components/common/Button.vue";
import { urlWithCategory, getCategoryType } from "~/utils/universalHelper";
export default {
    name : 'SubmitModal',
    components: { Modal, Button },
    props: {
        buttonModalBool: Boolean,
        product: Object,
        selectedVariant: Object
    },
    data() {
        return {
            backingType: ['Screw Back', 'Push Back'],
            showNextModal: false
        }
    },
    methods: {
        setBackingType(type) {
            const productSku = this.product?.sku;
            this.$store.commit('setProductAttribute', {
                [productSku]: { backing: type }
            });
            if(this.$route.name == 'yourSettingPage'){
                this.$emit('callBundleEvent');
                this.closeModal();
                return;
            }
            if(typeof this.product?.button_setting?.modal_button === 'object' && Object.keys(this.product?.button_setting?.modal_button).length){
                this.showNextModal = true;
                return;
            }
            this.checkURL('no_url');
        },
        async checkURL(url = null) {
            if (url) {
                if (url == 'no_url') {
                    this.addToCart();
                    return;
                }
                if (url?.category) {
                    url = urlWithCategory(url);
                }
                this.$emit('storeCookie', url);
            }
        },
        closeModal() {
            this.showNextModal = false;
            this.$emit('close');
        },
        async addToCart() {

            let item = this.product;
            let data = {};
            let attributesData = await this.$store.getters.getProductAttribute;

            if (item.type == 'configurable') {
                data = {
                    product_id: item.id,
                    selected_configurable_option: this.selectedVariant.id,
                    quantity: 1,
                    visitor_code: this.$cookies ? this.$cookies.get('visitorCode') : '',
                    attributes : attributesData[this.product.sku] ?? {}
                }
                data[`super_attribute[${this.selectedVariant.material_variation}]`] = this.selectedVariant.center_stone_shape;
            }
            if (item.type == 'simple') {
                data = {
                    product_id: item.id,
                    quantity: 1,
                    visitor_code: this.$cookies ? this.$cookies.get('visitorCode') : ''
                }
            }
            this.closeModal();
            this.$emit('addToCart', data);
        },
        getImageForBacking(backing) {
            // Example image switching logic based on backing type
            if (backing === 'Screw Back') {
                return 'https://cdn.adiamor.com/landing-pages/heros/extra_screw_backing.jpeg?updatedAt=1748339195436';
            } else if (backing === 'Push Back') {
                return 'https://cdn.adiamor.com/landing-pages/heros/extra_push_backing.jpeg?updatedAt=1748339195241';
            }
            return ''; // fallback
        },
        getModifiedText(text = null) {            
            if (!text) return '';
            let eventType = getCategoryType(this.product?.attribute_family_code);
            if(sessionStorage?.bundleType) eventType = sessionStorage?.bundleType ?? 'ring';
            if (typeof eventType === 'string' && eventType.includes('engagement')) {
                eventType = 'ring';
            }            
            
            if (typeof eventType === 'string' || eventType?.getter) {                 
                const previousProduct = this.$store.getters[`bundle/${eventType?.getter || 'get' + eventType?.charAt(0).toUpperCase() + eventType?.slice(1)}`];
                let skuToReplace = '';
                let diamondSku = previousProduct?.diamond?.sku;
                let settingSku = previousProduct?.setting?.parent_sku || previousProduct?.setting?.sku;
                const normalizedText = text.toLowerCase();
                let eventTextToMatch = eventType?.key === 'necklace' || eventType === 'necklace' ? 'pendant' : 'ring';                
                let diamondTextToMatch = 'diamond';
                // Check if we are adding a diamond to a ring setting
                if (
                    diamondSku &&
                    diamondSku !== this.product.sku &&
                    this.product?.type === 'simple' &&
                    normalizedText.includes(eventTextToMatch)
                ) {
                    skuToReplace = diamondSku;
                }

                // Check if we are adding a setting to a diamond
                if (
                    settingSku &&
                    settingSku !== this.product.sku &&
                    this.product?.type === 'configurable' &&
                    normalizedText.includes(diamondTextToMatch)
                ) {
                    skuToReplace = settingSku;
                }                

                if (this.product?.type === 'simple' && settingSku && (eventTextToMatch === 'pendant' && text?.toLowerCase().includes('ring') || eventTextToMatch === 'ring' && text?.toLowerCase().includes('pendant'))) return null;

                // Return replacement text if applicable
                return skuToReplace ? `REPLACE ${skuToReplace}` : text;   
          }
          return text;
        },
    },
    computed: {
        visibleModalButtons() {            
            const buttons = this.product?.button_setting?.modal_button;
            let result = Object.values(buttons).filter(button => this.getModifiedText(button.text));
            if(!result.length) return Object.values(buttons);
            result.map(button => { button.text = this.getModifiedText(button.text); })
            return result || Object.values(buttons);
        }
    }
}
</script>