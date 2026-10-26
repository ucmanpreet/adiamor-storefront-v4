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
<script setup>
import Modal from "~/components/ui/Modal.vue";
import Button from "~/components/common/Button.vue";
import { urlWithCategory, getCategoryType } from "~/utils/universalHelper";

const props = defineProps({
    buttonModalBool: Boolean,
    product: Object,
    selectedVariant: Object
});
const emit = defineEmits(['callBundleEvent', 'close', 'storeCookie', 'addToCart']);

const store = useMainStore();
const bundle = useBundleStore();
const route = useRoute();

const backingType = ['Screw Back', 'Push Back'];
const showNextModal = ref(false);

const visibleModalButtons = computed(() => {
    const buttons = props.product?.button_setting?.modal_button;
    let result = Object.values(buttons).filter(button => getModifiedText(button.text));
    if (!result.length) return Object.values(buttons);
    result.map(button => { button.text = getModifiedText(button.text); })
    return result || Object.values(buttons);
});

function setBackingType(type) {
    const productSku = props.product?.sku;
    store.setProductAttribute({
        [productSku]: { backing: type }
    });
    if (route.name == 'yourSettingPage') {
        emit('callBundleEvent');
        closeModal();
        return;
    }
    if (typeof props.product?.button_setting?.modal_button === 'object' && Object.keys(props.product?.button_setting?.modal_button).length) {
        showNextModal.value = true;
        return;
    }
    checkURL('no_url');
}
async function checkURL(url = null) {
    if (url) {
        if (url == 'no_url') {
            addToCart();
            return;
        }
        if (url?.category) {
            url = urlWithCategory(url);
        }
        emit('storeCookie', url);
    }
}
function closeModal() {
    showNextModal.value = false;
    emit('close');
}
async function addToCart() {

    let item = props.product;
    let data = {};
    let attributesData = await store.getProductAttribute;

    if (item.type == 'configurable') {
        data = {
            product_id: item.id,
            selected_configurable_option: props.selectedVariant.id,
            quantity: 1,
            visitor_code: useCookie('visitorCode').value,
            attributes: attributesData[props.product.sku] ?? {}
        }
        data[`super_attribute[${props.selectedVariant.material_variation}]`] = props.selectedVariant.center_stone_shape;
    }
    if (item.type == 'simple') {
        data = {
            product_id: item.id,
            quantity: 1,
            visitor_code: useCookie('visitorCode').value
        }
    }
    closeModal();
    emit('addToCart', data);
}
function getImageForBacking(backing) {
    // Example image switching logic based on backing type
    if (backing === 'Screw Back') {
        return 'https://cdn.adiamor.com/landing-pages/heros/extra_screw_backing.jpeg?updatedAt=1748339195436';
    } else if (backing === 'Push Back') {
        return 'https://cdn.adiamor.com/landing-pages/heros/extra_push_backing.jpeg?updatedAt=1748339195241';
    }
    return ''; // fallback
}
function getModifiedText(text = null) {
    if (!text) return '';
    let eventType = getCategoryType(props.product?.attribute_family_code);
    if (sessionStorage?.bundleType) eventType = sessionStorage?.bundleType ?? 'ring';
    if (typeof eventType === 'string' && eventType.includes('engagement')) {
        eventType = 'ring';
    }

    if (typeof eventType === 'string' || eventType?.getter) {
        const previousProduct = bundle[`${eventType?.getter || 'get' + eventType?.charAt(0).toUpperCase() + eventType?.slice(1)}`];
        let skuToReplace = '';
        let diamondSku = previousProduct?.diamond?.sku;
        let settingSku = previousProduct?.setting?.parent_sku || previousProduct?.setting?.sku;
        const normalizedText = text.toLowerCase();
        let eventTextToMatch = eventType?.key === 'necklace' || eventType === 'necklace' ? 'pendant' : 'ring';
        let diamondTextToMatch = 'diamond';
        // Check if we are adding a diamond to a ring setting
        if (
            diamondSku &&
            diamondSku !== props.product.sku &&
            props.product?.type === 'simple' &&
            normalizedText.includes(eventTextToMatch)
        ) {
            skuToReplace = diamondSku;
        }

        // Check if we are adding a setting to a diamond
        if (
            settingSku &&
            settingSku !== props.product.sku &&
            props.product?.type === 'configurable' &&
            normalizedText.includes(diamondTextToMatch)
        ) {
            skuToReplace = settingSku;
        }

        if (props.product?.type === 'simple' && settingSku && (eventTextToMatch === 'pendant' && text?.toLowerCase().includes('ring') || eventTextToMatch === 'ring' && text?.toLowerCase().includes('pendant'))) return null;

        // Return replacement text if applicable
        return skuToReplace ? `REPLACE ${skuToReplace}` : text;
    }
    return text;
}
</script>