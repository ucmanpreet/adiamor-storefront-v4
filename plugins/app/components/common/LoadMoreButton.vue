<template>
  <div :class="className" aria-live="polite" :aria-busy="isLoading.toString()">
    <!-- Loader Visible But Controlled For Screen Readers -->
    <CustomLoader/>

    <!-- Screen Reader Loading Message -->
    <span v-if="isLoading" class="sr-only">
      Loading more content, please wait.
    </span>
  </div>
</template>
<script>
import CustomLoader from '../ui/CustomLoader.vue';
export default {
  name : 'LoadMoreButton',
  components: { CustomLoader },
  props: {
      className: {
        type: String,
        default: ''
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
}
</script>
