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

<script setup>
const props = defineProps(['link', 'ariaLabel']);

const showPopover = ref(false);
const hideTimeout = ref(null);

const popoverPosition = computed(() => ({
  'sm:right-0': true,
  'w-72': true,
  '-right-12': true
}));

function hideWithDelay() {
  hideTimeout.value = setTimeout(() => {
    showPopover.value = false;
  }, 200); // Delay prevents flickering
}
function hidePopover() {
  showPopover.value = false;
}
function cancelHide() {
  clearTimeout(hideTimeout.value);
}
</script>
