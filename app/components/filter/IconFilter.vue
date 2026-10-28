<template>
  <div :class="className">
    <template v-for="(el, innnerIndex) in filter.value" :key="el.code">
<label :for="isMobile ? `${el.code}_mobile` : `${el.code}_desktop`" 
      :aria-label="el.label"
       class="relative p-2 flex items-center border lg:hover:border-gray-300 cursor-pointer has-[:focus-visible]:ring-2
         has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2"
      :class="[{ 'flex-col': !isMobile }, { 'ring-1 ring-primary': isActiveClass(el.code) }, { 'border-white': !isActiveClass(el.code) }]"
      v-if="el.code != 'unset'" ref="optionRefs">
      <input :id="isMobile ? `${el.code}_mobile` : `${el.code}_desktop`"
        :name="filter.code == 'center_stone_shape' ? filter.code : `${filter.code}-${el.label}`"
        :type="filter.code == 'center_stone_shape' ? 'radio' : 'checkbox'"
        class="absolute z-0 inset-0 cursor-pointer sr-only focus-visible:iopacity-0" @input="handleInput($event, el)"
        :checked="isActiveClass(el.code)" @click="checkForCenterStone($event, el)">
      <Icon :name="el.code" :class="isMobile ? 'h-5 w-5 mr-2' : 'h-8 w-8 mx-auto'"
        v-if="(filter.code == 'diamond_shape' || filter.code == 'center_stone_shape')" :key="el?.code" aria-hidden="true" />
      <MediaImage :src="el.icon" v-else className="h-8 w-8 mr-2 sm:mr-0 object-contain" :tabIndex="-1" :key="el?.code" aria-hidden="true" />
      <span class="block text-xs text-center break-words" aria-hidden="true">{{ el.label }}</span>
    </label>
</template>
  </div>
</template>
<script setup>
import Icon from '~/components/common/Icon.vue';
import MediaImage from '~/components/common/MediaImage.vue';

const props = defineProps({
  className: {
    type: String,
    default() {
      return 'grid-cols-1 sm:grid-cols-2';
    },
  },
  filter: {
    type: [Array, Object],
    required: true,
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  selectedFilterValue: {
    type: [Array, Object],
  },
  // Inside the filter drawer on mobile, picks wait for "View Results" instead of hitting the store.
  deferOnMobile: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['setMobileFilters']);

const store = useMainStore();
const route = useRoute();
const { $isMobile } = useNuxtApp();

const optionRefs = ref(null);
const selectedValue = ref([]);
const filterData = ref(null);
const filterType = ref('');

// Watch the incoming selection
watch(() => props.selectedFilterValue, (newValue) => {
  selectedValue.value = newValue?.length ? newValue : []; // If there is at least one selected value, assign the slide
}, { deep: true, immediate: true });

// NOTE: the original watched 'selectedValue.value' (a property of the array, always undefined), so this never fires.
// Kept as-is to avoid a behaviour change.
watch(() => selectedValue.value?.value, () => {
  if ($isMobile && selectedValue.value?.length == 1) {
    scrollToSelected()
  }
}, { deep: true });

onMounted(async () => {
  filterData.value = await store.getFilters;
  let code = props.filter.code ? props.filter.code : props.filter.name?.toLowerCase().replace(/ /g, '_');
  let data = filterData.value ? filterData.value[code] : null;
  if (data && data.length) selectedValue.value = data;
  filterType.value = route.params?.prefix?.toLowerCase();
});

function checkForCenterStone($event, el) {
  if (props.filter.code == "center_stone_shape" && filterData.value && Object.keys(filterData.value).length) {
    let dataValue = filterData.value[props.filter.code];
    if (dataValue && dataValue?.length) {
      if (el?.code == dataValue[0]?.code) {
        selectedValue.value = [];
        if (!props.deferOnMobile || !$isMobile) {
          store.setFilters({ key: props.filter.code, value: null });
          store.setFilterCount();
          return;
        }
        // If not mobile, commit the filters to the parent object
        emit('setMobileFilters', { key: props.filter.code, value: null });
      }
    }
  }
}
function handleInputKeyboard(el) {
  const fakeEvent = {
    target: {
      checked: !isActiveClass(el.code),
    },
  };
  handleInput(fakeEvent, el);
}
function isActiveClass(code) {
  if ((!selectedValue.value || (selectedValue.value && !selectedValue.value.length)) && code == 'all') {
    return true;
  }
  return selectedValue.value?.some(item => item?.code === code) || false;
}
function handleInput(event, data) {
  if (props.filter.code == 'center_stone_shape') {
    selectedValue.value = [data];
  } else {
    if (event.target.checked) {
      selectedValue.value = [...selectedValue.value, data]; // Add value
      let isAllPresent = props.filter?.value?.find((el) => el.code == 'all');
      if (isAllPresent && data.code == 'all') {
        selectedValue.value = [];
      }
      if (isAllPresent && data.code != 'all') {
        selectedValue.value = selectedValue.value.filter(item => item.code !== 'all');
      }
    } else {
      selectedValue.value = selectedValue.value.filter(item => item.code !== data.code); // Remove value
    }
  }

  // Remove duplicates at the end by ensuring unique 'code' values
  selectedValue.value = (selectedValue.value?.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t?.code === value?.code
    ))
  )) || [];
  // If not mobile, commit the filters to the store
  let code = props.filter.code ? props.filter.code : props.filter.name?.toLowerCase().replace(/ /g, '_');
  let dataToSet = selectedValue.value;
  if (Array.isArray(dataToSet) && dataToSet.length == 0) dataToSet = null;
  if (props.deferOnMobile && $isMobile) {
    emit('setMobileFilters', { key: code, value: dataToSet });
    return;
  }
  store.setFilters({ key: code, value: dataToSet });
  store.setFilterCount();
}
function isChecked(value) {
  return selectedValue.value?.some(item => item?.value === value);
}
function scrollToSelected() {
  nextTick(() => {
    const refs = optionRefs.value
    if (!Array.isArray(refs)) return

    const selectedCode = selectedValue.value[0].code;

    const target = refs.find(el => {
      const input = el?.querySelector('input')
      return input && input.id.startsWith(selectedCode)
    })

    if (target) {
      target.scrollIntoView({
        behavior: 'auto', // or just remove behavior
        inline: 'center',
        block: 'nearest'
      })
    }
  })
}
</script>

<style>
.word-break {
  word-break: break-word !important;
}
</style>