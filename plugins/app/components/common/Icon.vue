<template>
  <div>
    <!-- Dynamically render the SVG component using `component` -->
    <component v-if="currentIcon && name" :is="currentIcon" class="w-full h-full cursor-pointer" />
  </div>
</template>

<script>
import { markRaw } from 'vue'

// Lazy loaders for every SVG (supports nested names such as `flags/us`)
const icons = import.meta.glob('/assets/svg/**/*.svg')
export default {
  props: {
    name: {
      type: String,
      // required: true
    },
    attributes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentIcon: null
    };
  },
  watch: {
    name: {
      immediate: true,
      handler(newName) {
        this.loadIcon(newName);
      }
    }
  },
  methods: {
    async loadIcon(iconName) {
      if (!iconName) return;
      try {
        const loader = icons[`/assets/svg/${iconName}.svg`];
        if (!loader) throw new Error('missing');
        this.currentIcon = markRaw((await loader()).default);
      } catch (e) {
        console.error(`Icon ${iconName} not found`, e);
        this.currentIcon = null;
      }
    }
  }
}
</script>