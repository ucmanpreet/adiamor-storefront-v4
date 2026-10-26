<template>
  <div
    v-if="caratOptions && caratOptions.length"
    class="flex-1 space-y-2 col-span-full"
    role="group"
    aria-labelledby="carat-weight-label"
  >
    <p class="text-sm text-black" id="carat-weight-label">
      {{ attribute?.name || 'Select' }}:
      <span class="font-semibold" aria-live="polite" aria-atomic="true">
        {{ selectedLabel }}
      </span>
    </p>

    <div class="flex flex-wrap gap-2">
      <label
        v-for="carat in caratOptions"
        :key="carat.id"
        :for="`carat-${carat.id}`"
        class="relative"
      >
        <input
          type="radio"
          :id="`carat-${carat.id}`"
          name="carat_weight"
          :value="carat.id"
          :checked="internalValue === carat.id"
          class="cursor-pointer peer absolute inset-0 opacity-0 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary z-0"
          :aria-label="`${carat.label} carat`"
          @change="onSelect(carat)"
        />
        <span
          :class="[
            'inline-flex items-center justify-center px-4 py-2 rounded border text-sm font-medium transition-all duration-150 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-50 peer-focus:ring-primary',
            internalValue === carat.id
              ? 'bg-gray-100 text-black border-primary'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-100 hover:text-black '
          ]"
          aria-hidden="true"
        >
          {{ carat.label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaratWeightSelector',
  props: {
    value: {
      type: [ String, Number ],
      default: ''
    },
    defaultCarat: {
      type: String,
      default: ''
    },
    caratOptions: {
      type: Array,
      default: () => []
    },
    attribute:{
        type: Object,
        default: () => {}
    }
  },

  data () {
    return {
      // Priority: v-model value → defaultCarat prop → first option
      internalValue: this.value || this.defaultCarat || (this.caratOptions[0]?.id ?? '')
    }
  },

  computed: {
    selectedLabel () {
      const found = this.caratOptions.find(c => c.id === this.internalValue)
      return found ? found.label : '—'
    }
  },

  watch: {
    // Sync internalValue if parent updates v-model externally
    value (newVal) {        
      if (newVal !== this.internalValue) {
        this.internalValue = newVal
      }
    }
  },

  methods: {
    onSelect (val) {      
      this.internalValue = val?.id
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>