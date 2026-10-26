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

<script>
 import Icon from "~/components/common/Icon.vue";
 export default {
  name : 'ScrollToTop',
  components: { Icon },
  data() {
    return {
      isVisible: false
    };
  },
  mounted() {
    if (import.meta.client) {
      window.addEventListener("scroll", this.toggleVisibility, { passive: true });
    }
  },
  beforeUnmount() {
    if (import.meta.client) {
      window.removeEventListener("scroll", this.toggleVisibility);
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>