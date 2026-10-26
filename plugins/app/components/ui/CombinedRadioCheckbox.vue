<!-- Filename: AccessibleFilterOptions.vue -->
<template>
  <div :class="['grid w-full gap-4', className]">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="text-gray-black flex items-center gap-1.5 cursor-pointer relative"
    >
      <input
        :type="type"
        :name="type === 'radio' ? name : `${name}-${option.label}`"
        :id="`input-${name}-${index}`"
        :value="option.value"
        :checked="isChecked(option.value)"
        @input="handleInput($event, option)"
        :ref="`selectInput${option.label}`"
        :class="[
          type === 'radio'
            ? 'relative cursor-pointer w-4 h-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-primary checked:bg-primary focus-visible:outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden'
            : 'peer cursor-pointer h-4 w-4 appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto'
        ]"
        :aria-describedby="`error-${name}-${index}`"
      />
      <svg
        class="hidden absolute peer-checked:block z-20 pointer-events-none w-4 h-4 self-center justify-self-center text-white"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
          fill="currentColor"
        />
      </svg>
      <span>{{ option.label }}</span>
      <!-- Example error message, if you have validation logic -->
      <p
        v-if="option.error"
        :id="`error-${name}-${index}`"
        class="text-red-600 text-sm mt-1"
      >
        {{ option.error }}
      </p>
    </label>
  </div>
</template>
<script>
export default {
  name : 'CombinedRadioCheckbox',
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['radio', 'checkbox'].includes(val)
    },
    className: {
      type: String,
      default() {
        return 'grid-cols-1 sm:grid-cols-2';
      },
    },
    name: {
      type: String,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    filter: {
      type: [Array, Object],
      required: true
    },
    selectedFilterValue: {
      type: [Array, Object],
    }
  },
  data() {
    return {
      selectedValue: null,
      filterData: null,
      selectedValueUpdate: 0,
      options: [],
      code: null
    };
  },
  methods: {
    handleInput(event, data) {
      if (!Array.isArray(this.selectedValue)) {
        this.selectedValue = []; // Initialize as an empty array if it's undefined or not an array
      }
      // let value = data?.value;
      if (this.type === 'radio') {
        this.selectedValue = [data];
      } else if (this.type === 'checkbox') {
        if (event.target.checked) {
          this.selectedValue = [...this.selectedValue, data]; // Add value
        } else {
          this.selectedValue = this.selectedValue.filter(item => item !== data); // Remove value
        }
      }
      try {
        let filterType = this.$route.params?.prefix?.toLowerCase();
        if (this.code && this.code == 'price' && this.isMobile) {
          this.selectedValue = data?.value;
        }
      } catch (error) {
        this.selectedValue = data?.value;
      }

      let code = this.code ? this.code : this.name?.toLowerCase().replace(/ /g, '_');
      if(Array.isArray(this.selectedValue) && this.selectedValue.length == 0) this.selectedValue = null;

      if (data?.code?.includes('all')) this.selectedValue = null;
      if(!this.$isMobile) {
        this.$store.commit('setFilters', { key: code, value: this.selectedValue });
        this.$store.commit('setFilterCount');
        return;
      }
      // If not mobile, commit the filters to the parent object
      this.$emit('setMobileFilters', { key: code, value: this.selectedValue });
    },
    isChecked(value) {
      if (this.code == 'price' && !this.selectedValue && value == 0) {
        return true;
      }
      if (!this.selectedValue && value == 0) {
        return true;
      }
      return this.selectedValue?.some(item => item?.value === value) || false;
    },
    getRangeUsingRefs() {
      let minValue = Infinity;
      let maxValue = -Infinity;
      const checkedBoxes = document?.querySelectorAll('input[type=radio]:checked');
      checkedBoxes.forEach((box) => {
        const [start, end] = box.value.split(' - ').map(num => parseInt(num));
        if (start < minValue) minValue = start;
        if (end > maxValue) maxValue = end;
      });
      return { min: minValue, max: maxValue };
    }
  },
  async mounted() {
    this.options = this.filter?.value;
    this.code = this.filter?.code;
    this.filterData = await this.$store.getters.getFilters;
    this.selectedValue = this.filterData ? this.filterData[this.code] : null;
  },
  watch: {
    // Watch the computed property
    selectedFilterValue (newValue, oldValue) {
        this.selectedValue = newValue;
        this.selectedValueUpdate = this.selectedValueUpdate + 1;
    },
  }
};
</script>

<style scoped>
.radio-input:checked {
  accent-color: #2563eb;
  /* Blue */
}

.checkbox-input:checked {
  accent-color: #10b981;
  /* Green */
}
</style>
