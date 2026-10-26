<template>
    <div :class="parentClass">
      <!-- Original Price — separate <p> = separate VoiceOver stop -->
      <p v-if="item?.price?.on_sale" class="inline m-0">
        <span class="sr-only">Original price {{ formattedPrice(getDiscountedPrice(item)) }}</span>
        <span :class="discountedClass" aria-hidden="true">{{ formattedPrice(getDiscountedPrice(item)) }}</span>
      </p>
      <!-- Discounted / Final Price — separate <p> = separate VoiceOver stop -->
      <p class="inline m-0">
        <span class="sr-only">{{ item?.price?.on_sale ? 'Discounted price' : 'Price' }} {{ formattedPrice(getRawPrice(item)) }}</span>
        <span :class="[priceClass, {'text-black': item?.price?.on_sale}]" aria-hidden="true">{{ formattedPrice(getRawPrice(item)) }}</span>
      </p>
    </div>
</template>
<script>
export default {
  name : 'DiscountedPrice',
  props: {
    item: Object,
    discountedClass: {
        type: String,
        default: 'line-through text-gray-600 text-xs sm:text-sm',
    },
    priceClass: {
        type: String,
        default: 'text-xs sm:text-sm text-black',
    },
    parentClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    isOnSale() {
      return this.item?.price?.on_sale;
    },
  },
  methods:{
    getDiscountedPrice(item) {
			let priceData = item?.price;
			return priceData?.raw?.amount;
		},
    getRawPrice(item) {
			let priceData = item?.price;
			if (priceData?.on_sale) return priceData?.special?.amount;
			return priceData?.raw?.amount ?? 0;
		},
    formattedPrice(price) {
        return this.$formatPrice(parseFloat(price) || 0, false);
    },
  }
};
</script>
