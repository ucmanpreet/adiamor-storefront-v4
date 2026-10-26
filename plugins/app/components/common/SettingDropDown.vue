<template>
  <div class="relative block text-left font-normal">
    <!-- Trigger Button -->
    <div v-click-outside="closeDropdown">
      <button type="button" @click="toggleDropdown"
        class="inline-flex items-center text-left text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 w-full sm:w-auto justify-between sm:justify-start"
        aria-haspopup="listbox"
        :aria-expanded="isOpen.toString()"
        :aria-controls="dropdownId"
        :aria-label="buttonAriaLabel"
      >
        <span v-if="selectedVariantValue" class="flex items-center gap-2 justify-between sm:justify-normal w-full sm:w-auto">
          <span class="text-xs text-gray-600">{{ selectedVariantValue?.metal_type }}: </span>
          <DiscountedPrice
            :item="selectedVariantValue"
            :discountedClass="'line-through text-gray-600 text-xs'"
            :priceClass="'font-medium text-xs'"
            :parentClass="`text-right sm:text-left`"
          />
        </span>

        <span v-else class="text-xs text-gray-600">
          {{ defaultLabel }}
        </span>

        <Icon name="down-arrow" class="w-4 h-4 flex-none" aria-hidden="true" />
      </button>
    </div>

    <!-- Dropdown Options -->
    <div
      v-show="isOpen"
      :id="dropdownId"
      ref="dropdown"
      role="listbox"
      tabindex="-1"
      @keydown.esc.prevent="closeDropdown"
      @keydown.down.prevent="focusNextOption"
      @keydown.up.prevent="focusPrevOption"
      @keydown.tab.prevent="focusNextOption"
      @keydown.shift.tab.prevent="focusPrevOption"
      class="inline origin-top-right absolute bottom-7 z-20 inset-x-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 max-w-52"
    >
      <div class="py-1 max-h-96 overflow-auto divide-y divide-gray-100">
        <button
          type="button"
          v-for="(metal, index) in getValidMetalVariants"
          role="option"
          :aria-selected="metal.sku === selectedVariantValue?.sku"
          :key="metal.sku || metal.id"
          @click="selectOption(metal)"
          @keydown.enter.prevent="selectOption(metal)"
          :ref="setOptionRef"
          :data-index="index"
          :class="[{ 'bg-gray-50' : metal.sku === selectedVariantValue?.sku }]"
          class="flex items-center justify-between gap-2 py-1 px-2 sm:px-4 hover:bg-gray-50 w-full"
          :aria-label="optionAriaLabel(metal)"
        >
          <span class="text-xs text-gray-600">{{ metal.metal_type }}</span>
          <DiscountedPrice
            :item="metal"
            :discountedClass="'line-through text-gray-600 text-[0.67rem] sm:text-xs'"
            :priceClass="'font-medium text-xs'"
            :parentClass="'flex flex-col sm:flex-row gap-0.5'"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DiscountedPrice from '~/components/common/DiscountedPrice.vue';
import Icon from '~/components/common/Icon.vue';
export default {
  name : 'SettingDropDown',
  components: { DiscountedPrice, Icon },
  props: {
    selectedVariantValue: {
      type: Object,
      default: null,
    },
    getValidMetalVariants: {
      type: Array,
      required: true,
    },
    defaultLabel: {
      type: String,
      default: 'Select an option',
    },
  },
  data() {
    return {
      isOpen: false,
      optionRefs: [],
      dropdownId: `metal-dropdown-${Math.random().toString(36).slice(2)}`
    };
  },
  methods: {
    priceLabel(variant, prefix) {
      const metal = variant?.metal_type || '';
      const priceData = variant?.price;
      const label = prefix ? `${prefix} ${metal}` : metal;
      if (!priceData) return label;
      const rawAmount = parseFloat(priceData?.raw?.amount) || 0;
      if (priceData?.on_sale) {
        const specialAmount = parseFloat(priceData?.special?.amount) || 0;
        return `${label}. Original price ${this.$formatPrice(rawAmount, false)}, discounted price ${this.$formatPrice(specialAmount, false)}`;
      }
      return `${label}. Price ${this.$formatPrice(rawAmount, false)}`;
    },
    optionAriaLabel(metal) {
      return this.priceLabel(metal, '');
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.$emit("toggle", this.isOpen);

      this.$nextTick(() => {
        if (this.isOpen && this.optionRefs.length) {
          this.optionRefs[0]?.focus();
          this.$bus.emit('aria-announce', 'Dropdown expanded. Press Tab to move down, Shift Tab to move up, and Enter to select the value.');
        }
      });
    },
    selectOption(metal) {
      this.isOpen = false;
      this.$emit('change', metal);
      this.$emit("toggle", false);

      this.$nextTick(() => {
        this.$refs.triggerButton?.focus();
      });
    },
    closeDropdown() {
      this.isOpen = false;
      this.$emit("toggle", false);

      this.$nextTick(() => {
        this.$refs.triggerButton?.focus();
      });
    },

    setOptionRef(el) {
      if (el) this.optionRefs.push(el);
    },

    focusNextOption(event) {
      const currentIndex = Number(event.target.dataset.index);
      const next = this.optionRefs[currentIndex + 1] || this.optionRefs[0];
      next?.focus();
    },

    focusPrevOption(event) {
      const currentIndex = Number(event.target.dataset.index);
      const prev = this.optionRefs[currentIndex - 1] || this.optionRefs[this.optionRefs.length - 1];
      prev?.focus();
    },
  },
  computed: {
    buttonAriaLabel() {
      if (!this.selectedVariantValue) return this.defaultLabel;
      return this.priceLabel(this.selectedVariantValue, 'Selected metal');
    },
  },
  watch: {
    isOpen(val) {
      if (!val) {
        this.optionRefs = [];
      }
    }
  }
};
</script>
