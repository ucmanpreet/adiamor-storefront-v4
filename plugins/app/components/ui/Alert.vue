<template>
  <div
    :class="['p-4 flex border-l-4 rounded items-center', alertType.bg, alertType.border]"
    role="alert"
  >
    <div class="shrink-0" :class="alertType.icon">
      <Icon :name="type" class="size-5" aria-hidden="true" /> <!-- decorative icon -->
    </div>
    <div class="ml-3">
      <p :class="['text-sm', alertType.text]">
        {{ message }}
        <slot /> <!-- slot content should be semantic -->
      </p>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue';
export default {
  name: 'Alert',
  components: { Icon },
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success', // success, error
      validator: (v) => ['success', 'error'].includes(v)
    }
  },

  computed: {
    alertType() {
      switch (this.type) {
        case 'error':
          return {
            bg: 'bg-red-50',
            border: 'border-red-400',
            text: 'text-red-800', // dark for contrast
            icon: 'text-red-800'
          }
        default:
          return {
            bg: 'bg-green-50',
            border: 'border-green-400',
            text: 'text-green-800', // dark for contrast
            icon: 'text-green-800'
          }
      }
    }
  }
}
</script>