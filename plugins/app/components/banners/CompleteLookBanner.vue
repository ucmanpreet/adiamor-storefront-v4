<template>
  <div
    id="ctl-coupon-button"
    class="absolute inset-x-0 mt-3.5 mx-auto text-primary text-center py-1 px-4 bg-white text-lg border border-primary max-w-md rounded-full"
  >
    <div class="flex gap-2 items-center justify-center">

      <!-- Accessible Button Instead of Anchor -->
      <button
        class="ctl-coupon font-normal"
        type="button"
        @click="toggleModal"
        @keydown.enter="toggleModal"
        @keydown.space.prevent="toggleModal"
        aria-haspopup="dialog"
        :aria-expanded="showModal.toString()"
        aria-controls="coupon-modal"
      >
        <span>Complete the Look - Buy Two or More, </span>
        <span class="font-bold">Save 10%</span>
      </button>

    </div>

    <Modal
      v-if="showModal"
      id="coupon-modal"
      :heading="'Complete the look'"
      @close="closeModal"
      maxWidthClass="max-w-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coupon-modal-heading"
      aria-describedby="coupon-modal-description"
    >
      <p
        id="coupon-modal-description"
        class="modal-content"
      >
        Purchase any 2 jewelry items and take 10% off both.
        Add this item to your cart in progress and your discount
        will be automatically applied during checkout.

        <a
          class="block text-center underline mt-2"
          :href="promotionPath"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </p>
    </Modal>

  </div>
</template>

<script>
import Modal from '~/components/ui/Modal.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    data() { return { showModal: false, promotionPath: STATIC_ROUTES.PROMOTIONS } },
    components: { Modal },
    methods: {
        closeModal() {
            this.showModal = false;
        },
        toggleModal() {
            this.showModal = !this.showModal;
        }
    },
};
</script>

<style scoped>
#ctl-coupon-button {
  display: none;
}
</style>
