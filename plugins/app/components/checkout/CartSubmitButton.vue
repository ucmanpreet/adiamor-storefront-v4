<template>
  <div v-if="checkIfButtonDisabled">
      <Button type="button" disabled :aria-label="buttonText" class="ml-auto py-3 min-w-full sm:min-w-80" :class="className">
        {{ buttonText }}
      </Button>
  </div>
  <div v-else>
    <!-- Address warning -->
    <div
      v-if="cartResponse?.data?.address_warning"
      role="alert"
      class="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 mb-2"
    >
      <svg
        class="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="leading-5">{{ cartResponse.data.address_warning }}</p>
    </div>
    <Button type="button" class="ml-auto py-3 min-w-full sm:min-w-80" :class="className" @click="$emit('submit')"
      v-if="!(paymentType == 'paypal_standard' && tab == 'payment')">
      {{ buttonText }}
    </Button>
    <div v-if="paymentType == 'paypal_standard' && tab == 'payment'">
      <PaypalPayment :amount="grandTotal" :id="`paypal-button-container-second`" :cart="cartResponse?.data"/>
    </div>
  </div>
</template>
<script>
import Button from "~/components/common/Button.vue";
import PaypalPayment from "~/components/payment/PaypalPayment.vue";
export default {
  name: "CartSubmitButton",
  components: { Button, PaypalPayment },
  props: ["grandTotal", "paymentType", "tab", "buttonText", "className", "cartResponse"],
  computed: {
   checkIfButtonDisabled() {
      let cartItems = this.cartResponse?.data?.items;
      let isAllItemAvailable = cartItems?.every(item => item?.is_available);
      return this.cartResponse?.data?.has_duplicate_diamond || !isAllItemAvailable;
    }
  },
};
</script>
