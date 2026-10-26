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

<script setup>
import DiscountedPrice from '~/components/common/DiscountedPrice.vue';
import Icon from '~/components/common/Icon.vue';

const props = defineProps({
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
});

const emit = defineEmits(['toggle', 'change']);

const { $formatPrice, $bus } = useNuxtApp();

const isOpen = ref(false);
const optionRefs = ref([]);
const dropdownId = `metal-dropdown-${Math.random().toString(36).slice(2)}`;
const dropdown = ref(null);
// No element in the template carries this ref (focus below is a no-op, as before)
const triggerButton = ref(null);

const buttonAriaLabel = computed(() => {
  if (!props.selectedVariantValue) return props.defaultLabel;
  return priceLabel(props.selectedVariantValue, 'Selected metal');
});

watch(isOpen, (val) => {
  if (!val) {
    optionRefs.value = [];
  }
});

function priceLabel(variant, prefix) {
  const metal = variant?.metal_type || '';
  const priceData = variant?.price;
  const label = prefix ? `${prefix} ${metal}` : metal;
  if (!priceData) return label;
  const rawAmount = parseFloat(priceData?.raw?.amount) || 0;
  if (priceData?.on_sale) {
    const specialAmount = parseFloat(priceData?.special?.amount) || 0;
    return `${label}. Original price ${$formatPrice(rawAmount, false)}, discounted price ${$formatPrice(specialAmount, false)}`;
  }
  return `${label}. Price ${$formatPrice(rawAmount, false)}`;
}
function optionAriaLabel(metal) {
  return priceLabel(metal, '');
}
function toggleDropdown() {
  isOpen.value = !isOpen.value;
  emit("toggle", isOpen.value);

  nextTick(() => {
    if (isOpen.value && optionRefs.value.length) {
      optionRefs.value[0]?.focus();
      $bus.emit('aria-announce', 'Dropdown expanded. Press Tab to move down, Shift Tab to move up, and Enter to select the value.');
    }
  });
}
function selectOption(metal) {
  isOpen.value = false;
  emit('change', metal);
  emit("toggle", false);

  nextTick(() => {
    triggerButton.value?.focus();
  });
}
function closeDropdown() {
  isOpen.value = false;
  emit("toggle", false);

  nextTick(() => {
    triggerButton.value?.focus();
  });
}

function setOptionRef(el) {
  if (el) optionRefs.value.push(el);
}

function focusNextOption(event) {
  const currentIndex = Number(event.target.dataset.index);
  const next = optionRefs.value[currentIndex + 1] || optionRefs.value[0];
  next?.focus();
}

function focusPrevOption(event) {
  const currentIndex = Number(event.target.dataset.index);
  const prev = optionRefs.value[currentIndex - 1] || optionRefs.value[optionRefs.value.length - 1];
  prev?.focus();
}
</script>
