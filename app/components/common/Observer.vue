<template>
  <div ref="observerElement" :style="{ minHeight: computedMinHeight }" :class="className" role="region"
    aria-live="polite"
    :aria-busy="(!intersected).toString()"
  >
    <!-- Screen reader loading message -->
    <span v-if="!intersected" class="sr-only">
      Content loading. Please wait.
    </span>

    <!-- Lazy loaded content -->
    <slot v-if="intersected" />

    <!-- Screen reader loaded message -->
    <span v-if="intersected" class="sr-only">
      Content loaded.
    </span>
  </div>
</template>
<script setup>
const props = defineProps({
  // A placeholder height to prevent jarring layout shifts while the real component loads.
  // Pass 'auto' if you don't want a minimum height.
  minHeight: {
    type: String,
    default: "420px",
  },
  className: {
    type: [String, Array],
    default: ""
  }
});

const observerElement = ref(null);
const intersected = ref(false);
let observer = null;

// Allows disabling the min-height if needed.
const computedMinHeight = computed(() => props.minHeight === "auto" ? null : props.minHeight);

onMounted(() => {
  // Initialize the Intersection Observer
  observer = new IntersectionObserver(
    ([entry]) => {
      // isIntersecting is true when the element enters the viewport
      if (entry && entry.isIntersecting) {
        console.log('Observer component has entered the viewport.');

        // Set our data property to true, which will render the slot content
        intersected.value = true;
        // The component has done its job, so we disconnect the observer for performance.
        observer.disconnect();
      }
    },
    {
      // This makes the observer trigger when the element is 200px from the bottom of the viewport,
      // ensuring content loads slightly before the user scrolls to it.
      rootMargin: "0px 0px 200px 0px",
      threshold: 0, // Trigger as soon as a single pixel is visible
    }
  );

  // Start observing the component's root element
  observer.observe(observerElement.value);
});

onBeforeUnmount(() => {
  // Clean up the observer when the component is destroyed
  if (observer) {
    observer.disconnect();
  }
});
</script>
