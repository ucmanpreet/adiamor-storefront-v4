<!-- File: ScrollToTopButton.vue -->
<template>
  <button
    type="button"
    v-show="isVisible"
    @click.prevent="scrollToTop"
    class="z-40 mb-16 fixed bottom-4 right-4 flex items-center justify-center  text-white bg-primary rounded-full w-12 h-12 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
    aria-label="Scroll to top"
    name="scroll-to-top"
  >
    <!-- Decorative icon -->
    <Icon
      name="scroll-top"
      class="w-8 h-8 pointer-events-none"
      aria-hidden="true"
    />
    <!-- Screen reader text -->
    <span class="sr-only">Scroll to top</span>
  </button>
</template>

<script setup>
import Icon from "~/components/common/Icon.vue";

const isVisible = ref(false);

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
  }
});
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", toggleVisibility);
  }
});

function toggleVisibility() {
  isVisible.value = window.scrollY > 300;
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>