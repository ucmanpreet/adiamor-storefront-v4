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
<script setup>
const props = defineProps({
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
});

const emit = defineEmits(['setMobileFilters']);

const store = useMainStore();
const route = useRoute();
const nuxtApp = useNuxtApp();

const selectedValue = ref(null);
const filterData = ref(null);
const selectedValueUpdate = ref(0);
const options = ref([]);
const code = ref(null);

function handleInput(event, data) {
  if (!Array.isArray(selectedValue.value)) {
    selectedValue.value = []; // Initialize as an empty array if it's undefined or not an array
  }
  // let value = data?.value;
  if (props.type === 'radio') {
    selectedValue.value = [data];
  } else if (props.type === 'checkbox') {
    if (event.target.checked) {
      selectedValue.value = [...selectedValue.value, data]; // Add value
    } else {
      selectedValue.value = selectedValue.value.filter(item => item !== data); // Remove value
    }
  }
  try {
    let filterType = route.params?.prefix?.toLowerCase();
    if (code.value && code.value == 'price' && props.isMobile) {
      selectedValue.value = data?.value;
    }
  } catch (error) {
    selectedValue.value = data?.value;
  }

  let filterCode = code.value ? code.value : props.name?.toLowerCase().replace(/ /g, '_');
  if (Array.isArray(selectedValue.value) && selectedValue.value.length == 0) selectedValue.value = null;

  if (data?.code?.includes('all')) selectedValue.value = null;
  if (!nuxtApp.$isMobile) {
    store.setFilters({ key: filterCode, value: selectedValue.value });
    store.setFilterCount();
    return;
  }
  // If not mobile, commit the filters to the parent object
  emit('setMobileFilters', { key: filterCode, value: selectedValue.value });
}
function isChecked(value) {
  if (code.value == 'price' && !selectedValue.value && value == 0) {
    return true;
  }
  if (!selectedValue.value && value == 0) {
    return true;
  }
  return selectedValue.value?.some(item => item?.value === value) || false;
}
function getRangeUsingRefs() {
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

onMounted(async () => {
  options.value = props.filter?.value;
  code.value = props.filter?.code;
  filterData.value = await store.getFilters;
  selectedValue.value = filterData.value ? filterData.value[code.value] : null;
});

// Watch the computed property
watch(() => props.selectedFilterValue, (newValue, oldValue) => {
  selectedValue.value = newValue;
  selectedValueUpdate.value = selectedValueUpdate.value + 1;
});

defineExpose({ getRangeUsingRefs });
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
