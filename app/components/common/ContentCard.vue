<template>
    <section
      v-if="isVisible"
      class="prose first:prose-h2:mt-0 prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:mt-7 prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl md:leading-7 max-w-full"
      role="region"
      aria-live="polite"
    >
        <slot></slot>
    </section>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});
</script>