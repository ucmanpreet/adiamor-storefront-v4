<template>
  <div v-if="isLoading" class="h-screen fixed inset-0 flex items-center justify-center z-60 bg-black/50 group-light">
    <!-- Screen Reader Live Region -->
    <div
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      Loading, please wait.
    </div>
    <CustomLoader aria-hidden="true" />
  </div>
</template>

<script>
import CustomLoader from "~/components/ui/CustomLoader.vue";
export default {
  name : 'Loader',
  components: { CustomLoader },
  data: () => ({ isLoading: false }),
  methods: {
    start() {
      this.isLoading = true
    },
    finish() {
      this.isLoading = false
    },
    fail() {
      this.isLoading = false
    },
  }
}
</script>