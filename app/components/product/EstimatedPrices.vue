<template>
  <div ref="root" class="mt-1">
    <!-- Wire Discount Info -->
    <div class="text-[0.8125rem]" v-if="calculatedWireDiscount">
      <div class="flex gap-2 items-center" :class="{ 'justify-end': isBundleView }">
        <span role="text" tabindex="0">Bank Wire Price: {{ calculatedWireDiscount }}</span>
        <div class="relative">
          <!-- Info Popover Trigger -->
          <button type="button"
                  class="text-current whitespace-nowrap flex items-center focus:ring-2 focus:ring-blue-500"
                  tabindex="-1"
                  @click="showPop = !showPop"
                  :aria-expanded="showPop.toString()"
                  aria-haspopup="dialog"
                  aria-label="More information about Bank Wire Price">
            <Icon name="info" class="w-4 h-4" aria-hidden="true"/>
          </button>

          <!-- Popover -->
          <Popover v-if="showPop" v-click-outside="closePopover" :heading="'Bank Wire Price'" @close="showPop = false">
            <p class="font-normal text-sm" id="wire-info-desc">
              All payments made by bank wires will receive a 1.5% discount. This discount is offered due
              to the elimination of clearinghouse charges imposed by credit card companies. Wire transfer
              instructions will be sent via email after order confirmation.
            </p>
          </Popover>
        </div>
      </div>
    </div>

    <!-- Affirm Promo -->
    <div class="mt-4 sm:mt-8">
      <div class="flex flex-wrap text-xs justify-between sm:text-sm">
        <AffirmPromotional :price="calculatedAffirmDiscount" :key="calculatedAffirmDiscount" />
      </div>

      <!-- Price Match Guarantee -->
      <div class="mt-5 text-[0.8125rem]" v-if="calculatedWireDiscount">
        <div class="ml-auto flex gap-2 items-center" v-if="isDiamondProduct">
          <button type="button"
                  class="flex gap-2 items-center text-primary focus:ring-2 focus:ring-blue-500"
                  @click="showModal = true"
                  aria-haspopup="dialog"
                  aria-label="Open Price Match Guarantee information">
            Price match guarantee
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.956 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004a7.728 7.728 0 00-.313.195 2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.245 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.692-.662.214-.32.329-.702.329-1.15 0-.76-.36-1.348-.863-1.725A2.76 2.76 0 008 4c-.631 0-1.155.16-1.572.438-.413.276-.68.638-.849.977a.75.75 0 101.342.67z">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Component -->
      <PriceMatchGuarantee v-if="showModal" @close="closeModal" :product="product" />
    </div>
  </div>
</template>
<script setup>
import KEYS from '~/utils/constant.js';
import Icon from '~/components/common/Icon.vue';
import Popover from '~/components/product/Popover.vue';
import AffirmPromotional from '~/components/payment/AffirmPromotional.vue';
import PriceMatchGuarantee from '~/components/payment/PriceMatchGuarantee.vue';
import { fetchPriceData } from '~/utils/universalHelper';

const props = defineProps({
    product: Object,
    selectedVariant: {
        type: Object,
        default: {}, // Default to an empty string to avoid issues when empty
    },
});

const store = useMainStore();
const route = useRoute();
const { $formatPrice } = useNuxtApp();

const root = ref(null);
const bundleProduct = ref({});
const showModal = ref(false);
const showPop = ref(false);

const isBundleView = computed(() => route.name === 'yourSettingPage');

const isObjectNull = computed(() => !(props.selectedVariant && Object.keys(props.selectedVariant).length === 0 &&
    props.selectedVariant.constructor === Object));

const calculatedWireDiscount = computed(() => {
    let price = isObjectNull.value && props.selectedVariant ? props.selectedVariant.price : bundleProduct.value && bundleProduct.value.price && isBundleView.value ? bundleProduct.value.price : props.product.price;
    let finalPrice = null;
    if (isBundleView.value) {
        finalPrice = bundleProduct.value && bundleProduct.value.price ? fetchPriceData(bundleProduct.value) : fetchPriceData(props.product);
    } else {
        finalPrice = fetchPriceData(props.product, isObjectNull.value && props.selectedVariant ? props.selectedVariant : null);
    }
    if (!finalPrice) finalPrice = price;
    let value = parseInt(finalPrice) > 1000 ? parseInt(finalPrice) * (1 - KEYS.WIRE_DISCOUNT) : '';
    return value ? $formatPrice(parseInt(value)) : '';
});

const calculatedAffirmDiscount = computed(() => {
    let finalPrice = props.product?.original_discounted_price ?? props.product?.original_price;
    if (isObjectNull.value && props.selectedVariant) {
        finalPrice = props.selectedVariant?.original_discounted_price ?? props.selectedVariant?.original_price;
    }
    if (isBundleView.value) {
        finalPrice = bundleProduct.value && bundleProduct.value.original_discounted_price ? bundleProduct.value.original_discounted_price : bundleProduct.value.original_price;
    }
    return finalPrice ? parseInt(finalPrice) : 0;
});

const isDiamondProduct = computed(() => props.product.attribute_family_code == 'certified_diamond' && props.product?.in_stock && props.product?.is_active);

function closeModal() {
    showModal.value = false;
}

function closePopover(event) {
    if (!(root.value === event.target || root.value.contains(event.target))) {
        showPop.value = false;
    }
}

onMounted(async () => {
    bundleProduct.value = await store.getBundleItem;
});
</script>