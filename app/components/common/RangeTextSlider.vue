<template>
  <div class="sm:mt-2 range-slider range-slider-custom" role="group"
    :aria-labelledby="`slider-label-${filter?.code}`"
  >
    <!-- Screen reader label -->
    <span
      class="sr-only"
      :id="`slider-label-${filter?.code}`"
    >
      {{ filter?.text || filter?.code }} filter range
    </span>

    <div
      :ref="setSliderRef"
      class="slider"
    ></div>

    <!-- Live announcement -->
    <span class="sr-only" aria-live="polite">
      {{ ariaValueText }}
    </span>
  </div>
</template>

<script setup>
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const props = defineProps(['filter', 'updateSlider', 'selectedFilterValue']);

const emit = defineEmits(['setMobileFilters']);

const store = useMainStore();
const { $isMobile } = useNuxtApp();

// noUiSlider instance (client-only lib object, kept un-proxied)
const sliderInstance = shallowRef(null);
const valueArr = ref([]);
const selectedValue = ref(null);
const filterData = ref(null);
const allValues = ref([]);

// Slider host elements, keyed by filter code
const sliderRefs = {};
function setSliderRef(el) {
  sliderRefs[props.filter?.code] = el;
}

const ariaValueNow = computed(() => {
  if (!allValues.value?.length) return 0;
  return allValues.value.length;
});

const ariaValueText = computed(() => {
  if (!allValues.value?.length) {
    return `All ${props.filter?.text || 'values'} selected`;
  }

  const first = allValues.value[0]?.label;
  let last = allValues.value[allValues.value.length - 1]?.label;
  if(last?.includes('_none')){
    last = allValues.value[allValues.value.length - 2]?.label;
  }

  return `${props.filter?.text || 'Filter'} from ${first} to ${last}`;
});

watch(() => props.selectedFilterValue, async (newValue, oldValue) => {
  if(newValue?.length == oldValue?.length) return;

  selectedValue.value = newValue;
  if (!sliderInstance.value) {
     await initializeSlider();
     return;
  }
  if(!newValue) {
    let firstLabel = valueArr.value[0]?.label;
    let secondLabel = valueArr.value[valueArr.value.length - 1]?.label;
    sliderInstance.value?.set([firstLabel, secondLabel]);
    return;
  }
  assignSlider();
});

watch(() => props.updateSlider, () => {
  if(sliderInstance.value) {
    sliderInstance.value.destroy();
    sliderInstance.value = null;
  }
  initializeSlider();
});

onMounted(async () => {
  filterData.value = await store.getFilters;
  let code = props.filter?.code;
  selectedValue.value = filterData.value ? filterData.value[code] : null;
  await initializeSlider();
});

function assignSlider(){
  let list = valueArr.value;
  let firstItem = selectedValue.value[0];
  let lastItem = selectedValue.value[selectedValue.value.length - 1];
  const firstLabelIndex = list.findIndex(v => v.code === firstItem?.code);
  const lastLabelIndex = list.findIndex(v => v.code === lastItem?.code);
  if(firstLabelIndex > lastLabelIndex) {
    firstItem = selectedValue.value[selectedValue.value.length - 1];
    lastItem = selectedValue.value[0];
  }
  let firstLabel = firstItem?.label;
  let secondLabel = lastItem?.label;
  if(list) {
    const selectedCode = lastItem?.code;
    const index = list.findIndex(v => v.code === selectedCode);
    if(index > 0) {
      secondLabel = list[index + 1]?.label;
    }
  }
  sliderInstance.value?.set([firstLabel, secondLabel]);
}

async function initializeSlider() {
  try {
    // Properly await the tick so the slider DOM element is ready
    await nextTick();

    if (!props.filter || !props.filter.value || props.filter.value.length < 2) return;

    valueArr.value = props.filter.value;

    const filtered = valueArr.value.filter(v => v.code !== 'front_none');
    const lastRealLabel = filtered[filtered?.length - 1]?.label;

    valueArr.value = [
      ...valueArr.value.filter(v => v.code !== 'front_none'),
      { label: `${lastRealLabel} Max Value`, code: 'front_none', value: 0 }
    ];

    if (valueArr.value.length > 2) {
      let arbitraryValuesForSlider = valueArr.value.map(el => el?.label);
      var format = {
        to: function (value) {
          return arbitraryValuesForSlider[Math.round(value)];
        },
        from: function (value) {
          return arbitraryValuesForSlider.indexOf(value);
        }
      };

      if(!sliderRefs[props.filter?.code]) return;

      sliderInstance.value = sliderInstance.value || noUiSlider.create(
        sliderRefs[props.filter?.code],
        {
          start: [
            arbitraryValuesForSlider[0],
            arbitraryValuesForSlider[arbitraryValuesForSlider.length - 1]
          ],
          range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
          step: 1,
          connect: true,
          format: format,
          margin: 1,
          pips: { mode: 'steps', format: format, density: 50 },
        }
      );

      const handles = sliderRefs[props.filter?.code]
        ?.querySelectorAll('.noUi-handle');

      handles.forEach((handle, index) => {
        handle.setAttribute(
          "aria-label",
          `${props.filter?.text || "Filter"} ${index === 0 ? "minimum value" : "maximum value"}`
        );
        handle.setAttribute(
          "aria-labelledby",
          `slider-label-${props.filter?.code}`
        );
      });

      sliderInstance.value.on('change', async (values) => {
        const labels = valueArr.value.map(d => d?.label);
        const [start, end] = values.map(label => labels.indexOf(label)).sort((a, b) => a - b);
        allValues.value = valueArr.value.slice(start, end);

        if (allValues.value && allValues.value.length === valueArr.value.length - 1) {
          allValues.value = null;
        }
        let code = props.filter.code ? props.filter.code : props.filter.text?.toLowerCase().replace(/ /g, '_');
        if(!$isMobile) {
          store.setFilters({ key: code, value: allValues.value });
          store.setFilterCount();
          return;
        }
        emit('setMobileFilters', { key: code, value: allValues.value});
      });

      // Apply selected value now that slider is ready
      if (selectedValue.value?.length >= 1) {
        assignSlider();
      }
    }
  } catch (error) {
    console.error(error, 'error rangetextslider');
  }
}
</script>

<style>
.range-slider {
  @apply h-auto;
}

.range-slider .slider {
  @apply w-[96%] m-auto;
}

.range-slider .noUi-handle {
  @apply rounded-full;
}

.range-slider .noUi-handle:before,
.range-slider .noUi-handle:after {
  @apply hidden;
  /* Hide the default handle styles */
}

.noUi-pips.noUi-pips-horizontal  {
  @apply pointer-events-none;
}

.noUi-pips-horizontal {
  @apply !py-4;
}

.range-slider-padding .range-slider-custom {
  @apply !pb-8;
}

.range-slider-custom {
  height: 4px;
  box-shadow: none;
  border: 0;
}
.range-slider-custom .noUi-value {
  color: inherit;
  font-size: 12px;
  line-height: 1em;
}
.range-slider-custom .noUi-handle:after,
.range-slider-custom .noUi-handle:before {
  display: none;
}
.range-slider-custom .noUi-base {
  z-index: inherit;
}
.range-slider-custom .noUi-connect {
  background-color: #306499;
}
.range-slider-custom .noUi-handle {
  width: 16px;
  height: 16px;
  right: -8px;
  top: -6px;
  border-radius: 10em;
  box-shadow: none;
  border: 0;
  cursor: pointer;
  @apply !bg-white !border !border-solid !border-primary
}
.range-slider-custom .noUi-value-horizontal {
  transform: translate(-50%, 0%);
}
.range-slider-custom .noUi-pips-horizontal {
  display: flex;
  height: auto;
  color: inherit;
}
.range-slider-custom .noUi-pips-horizontal .noUi-marker-horizontal.noUi-marker {
  color: inherit;
  width: 4px;
  height: 4px;
  margin-top: -19px;
  background-color: rgb(255, 255, 255);
}
.range-slider-custom .noUi-pips-horizontal .noUi-marker-large {
  display: none;
}
.range-slider-custom .noUi-pips-horizontal .noUi-marker-large,
.range-slider-custom .noUi-pips-horizontal .noUi-value-large:last-child {
  display: none;
}
.range-slider-custom .noUi-pips-horizontal .noUi-value,
.range-slider-custom .noUi-pips-horizontal .noUi-value-large {
  position: static;
  flex: 1;
  transform: translateX(0%);
}
.range-slider-custom [class*="noUi-value"]{
    color: inherit;
    font-size: 10px;
    line-height: 1em;
    white-space: pre-line;
}
</style>
