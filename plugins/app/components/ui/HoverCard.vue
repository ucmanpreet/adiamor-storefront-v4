<template>
  <div class="relative group">
    <!-- Popover Trigger -->
    <div @mouseover="showPopover = true" @mouseleave="hideWithDelay" class="flex items-center">
      <slot name="trigger"></slot>
      <NuxtLink :to="link" :aria-label="ariaLabel" class="sm:hidden absolute inset-0 z-10" tabindex="-1" aria-hidden="true"></NuxtLink>
    </div>

    <!-- Popover Content -->
    <div v-if="showPopover" class="hidden sm:block absolute mt-2 bg-white border shadow-xl rounded-md p-4 z-50 transition-all duration-300"
      :class="popoverPosition" @mouseenter="cancelHide" @mouseleave="hideWithDelay">
      <slot></slot> <!-- Dynamic content inside popover -->

      <!-- Button Slot (Optional) -->
      <div class="mt-3">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'HoverCard',
  props: ['link', 'ariaLabel'],
  data() {
    return {
      showPopover: false,
      hideTimeout: null,
    };
  },
  computed: {
    popoverPosition() {
      return {
        'sm:right-0': true,
        'w-72': true,
        '-right-12': true
      };
    }
  },
  methods: {
    hideWithDelay() {
      this.hideTimeout = setTimeout(() => {
        this.showPopover = false;
      }, 200); // Delay prevents flickering
    },
    hidePopover() {
      this.showPopover = false;
    },
    cancelHide() {
      clearTimeout(this.hideTimeout);
    }
  }
};
</script>
