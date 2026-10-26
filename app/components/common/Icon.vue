<template>
  <div>
    <!-- Dynamically render the SVG component using `component` -->
    <component v-if="currentIcon && name" :is="currentIcon" class="w-full h-full cursor-pointer" />
  </div>
</template>

<script setup>
import { markRaw } from 'vue'

// Lazy loaders for every SVG (supports nested names such as `flags/us`)
const icons = import.meta.glob('/assets/svg/**/*.svg')

const props = defineProps({
  name: {
    type: String,
    // required: true
  },
  attributes: {
    type: Object,
    default: () => ({})
  }
});

const currentIcon = ref(null);

watch(() => props.name, (newName) => {
  loadIcon(newName);
}, { immediate: true });

async function loadIcon(iconName) {
  if (!iconName) return;
  try {
    const loader = icons[`/assets/svg/${iconName}.svg`];
    if (!loader) throw new Error('missing');
    currentIcon.value = markRaw((await loader()).default);
  } catch (e) {
    console.error(`Icon ${iconName} not found`, e);
    currentIcon.value = null;
  }
}
</script>