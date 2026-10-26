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

<script setup>
import CustomLoader from "~/components/ui/CustomLoader.vue";

const isLoading = ref(false);

function start() {
  isLoading.value = true
}
function finish() {
  isLoading.value = false
}
function fail() {
  isLoading.value = false
}

// Called from outside (Nuxt 2 loading-component API: start / finish / fail)
defineExpose({ start, finish, fail });
</script>
