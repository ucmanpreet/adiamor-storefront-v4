<template>
  <div class="mt-0 sm:mt-3 range-slider" role="group"
    :aria-labelledby="`range-label-${filter?.code}`"
  >
     <!-- Hidden heading for screen readers -->
    <span
      class="sr-only"
      :id="`range-label-${filter?.code}`"
    >
      {{ filter?.text || filter?.code }} range filter
    </span>

    <!-- noUiSlider -->
    <div
      :ref="setSliderRef"
      class="slider"
      tabindex="0"
      :aria-labelledby="`range-label-${filter?.code}`"
    >
    </div>

    <!-- Live region for announcing changes -->
    <span class="sr-only" aria-live="polite">
      Selected range: {{ minValue }} to {{ maxValue }}
    </span>


    <!-- Min & Max Input Fields -->
    <div class="flex justify-between gap-4 mt-6" v-if="valueArr?.length == 2">
      <div class="relative" v-if="filter.code == priceFilterCode">
        <label class="absolute top-1/2 -translate-y-1/2 ml-2" :for="`min-input-${filter?.code}`">
          <span class="sr-only">Min:</span></label>
        <InputField :id="`min-input-${filter?.code}`" :type="'text'" name="min" ref="minInput"
          inputClass="!py-1 !pl-4" inputMode="numeric"
          :value="showMinPriceInput ? displayFormattedPrice(minValue) : formattedPrice(minValue)"
          @input="updateMinSliderFromInput"
          @blur="checkForMinValidation"
          @focusEvent="showMinPriceInput = false"
          @enter="checkForMinValidation"
          :aria-describedby="`range-label-${filter?.code}`"/>
      </div>

      <div class="relative" v-else>
        <InputField type="number" name="min" inputClass="!py-1 !pl-4" @input="updateMinSliderFromInput"
          :value="formattedPrice(minValue, true)" @blur="checkForMinValidation" @enter="checkForMinValidation" inputMode="decimal"/>
      </div>

      <div class="relative" v-if="filter.code == priceFilterCode">
        <label class="absolute top-1/2 -translate-y-1/2 ml-2" :for="`max-input-${filter?.code}`">
          <span class="sr-only">Max:</span> </label>
        <InputField :id="`max-input-${filter?.code}`" :type="'text'" name="max" ref="maxInput"
          inputClass="!py-1 !pl-4 text-right" inputMode="numeric"
          :value="showMaxPriceInput ? `${displayFormattedPrice(maxValue)}` : formattedPrice(maxValue)"
          @input="updateMaxSliderFromInput"
          @blur="checkForMaxValidation"
          @focusEvent="showMaxPriceInput = false"
          @enter="checkForMaxValidation"
          :aria-describedby="`range-label-${filter?.code}`"/>
      </div>
      <div class="relative" v-else>
        <InputField type="number" name="max" :inputClass="['!py-1 !pl-4 text-right']"
          :value="formattedPrice(maxValue)" @input="updateMaxSliderFromInput" @blur="checkForMaxValidation" @enter="checkForMaxValidation" inputMode="decimal"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import KEYS from '@/utils/constant.js';
import InputField from '~/components/ui/InputField.vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const props = defineProps(['filter', 'selectedFilterValue']);

const emit = defineEmits(['setMobileFilters']);

const store = useMainStore();
const { $formatPrice, $isMobile } = useNuxtApp();

const minValue = ref(0); // Default min
const maxValue = ref(0); // Default max
// noUiSlider instance (client-only lib object, kept un-proxied)
const sliderInstance = shallowRef(null);
const valueArr = ref([]);
const filterData = ref(null);
const selectedValue = ref(null);
const oldMin = ref(0);
const oldMax = ref(0);
const showMinPriceInput = ref(true);
const showMaxPriceInput = ref(true);
const currentStep = ref(0.01);
const hasHandledEqualSlider = ref(false);
const initialMin = ref(0);
const initialMax = ref(0);
const caratFilterCode = 'diamond_carat_weight';
const lwRatioFilterCode = 'length/width';
const priceFilterCode = 'price';
const tableFilterCode = 'diamond_table_percent';
const depthFilterCode = 'diamond_depth_percent';
const maxCaratRange = KEYS.DIAMOND_CARAT_MAX_VALUE;
const minValueObj = ref(null);
const maxValueObj = ref(null);
const userMinInput = ref(false);
const userMaxInput = ref(false);

// Slider host elements, keyed by filter code
const sliderRefs = {};
function setSliderRef(el) {
  sliderRefs[props.filter?.code] = el;
}

const getStartPoints = computed(() => {
    let minVal = minValue.value, maxVal = maxValue.value;
    if (props.filter?.code == priceFilterCode) {
      minVal = fetchMinForPrice(minVal);
    }
    return [minVal, maxVal];
});

const getStepRange = computed(() => {
    let min = minValue.value;
    let max = maxValue.value;
    const rangeSize = max - min;
    const percent = (value) => `${((value - min) / rangeSize) * 100}%`;
    const caratPercent = (value) => {
      const minCarat = 1.0;
      const maxCarat = 15.0;
      if (value < minCarat) return '0%'; // optional
      const percentage = 50 + ((value - minCarat) / (maxCarat - minCarat)) * 50;
      return `${percentage.toFixed(2)}%`;
    };
    let caratRanges = {
      min: [min, 0.01],
      '50%': [1.00, 0.01],
      [caratPercent(1.1)]: [1.1, 0.05],
      [caratPercent(2.0)]: [2.0, 0.10],
      [caratPercent(3.5)]: [3.5, 0.25],
      [caratPercent(5.0)]: [5.0, 0.50],
      [caratPercent(15.0)]: [15.0, 1],
      max: [max, 1]
    };

    // This is the structure expected by noUiSlider
    let sliderRange = {
      'min': min,
      '15%': 1.00,
      '75%': 5.00,
      'max': max
    };

    switch (props.filter?.code) {
      case caratFilterCode:
        return sliderRange;

      case priceFilterCode:
        // return {
        //   min: [min, 50],
        //   [percent(500)]: [500, 100],
        //   [percent(5000)]: [5000, 250],
        //   [percent(10000)]: [10000, 500],
        //   [percent(15000)]: [15000, 1000],
        //   [percent(50000)]: [50000, 2500],
        //   [percent(100000)]: [100000, 10000],
        //   [percent(200000)]: [100000, 25000],
        //   [percent(500000)]: [100000, 50000],
        //   max: [max, 50000],
        // };
        let range = generateNoUiSliderRange(min, max);
        return range;
      default:
        return {
          min: min,
          max: max,
        }
    }
});

const getFloatValue = computed(() => {
    return [caratFilterCode, lwRatioFilterCode].includes(props.filter.code);
});

const getOneDecimalValue = computed(() => {
    return [tableFilterCode, depthFilterCode].includes(props.filter.code);
});

// Watch the selected filter value
watch(() => props.selectedFilterValue, async (newValue, oldValue) => {
    if(newValue?.max == oldValue?.max && newValue?.min == oldValue?.min) return;

    selectedValue.value = newValue;
    if (!sliderInstance.value) {
       await initializeSlider();
       return;
    }
    if(!newValue) {
      minValue.value = initialMin.value;
      maxValue.value = initialMax.value;
      sliderInstance.value?.set([initialMin.value, initialMax.value]);
      return;
    }
    let finalValue = await assignPreSelectValue();
    sliderInstance.value?.set([finalValue?.min, finalValue?.max]);
});

onMounted(async () => {
  await initSlider();
});

async function initSlider() {
     // Initialize the slider with default values
    filterData.value = await store.getFilters;
    let code = props.filter?.code;
    selectedValue.value = filterData.value ? filterData.value[code] : null;
    if (props.filter.code == priceFilterCode) currentStep.value = 10;
    if (getOneDecimalValue.value) currentStep.value = 0.1;
    await initializeSlider();
}

function fetchMinForPrice(min) {
    if (props.filter?.code == priceFilterCode && min == initialMin.value) {
      let minData = minValueObj.value;
      if (minData && typeof minData.value === 'number' && minData.value % 10) {
        return Math.floor(minData.value / 10) * 10;
      }
      return min;
    }
    return min;
}

function getStepForValue(value, steps) {
    for (let i = 0; i < steps.length; i++) {
      if (value < steps[i].until) {
        return steps[i].step;
      }
    }
    throw new Error(`No step found for value: ${value}`);
}

function generateNoUiSliderRange(min, max) {
    const steps = [
      { until: 500, step: 10 },
      { until: 1000, step: 10 },
      { until: 5000, step: 100 },
      { until: 10000, step: 250 },
      { until: 25000, step: 500 },
      { until: 50000, step: 1000 },
      { until: 100000, step: 5000 },
      { until: 200000, step: 10000 },
      { until: 500000, step: 50000 },
      { until: Infinity, step: 100000 },
    ];
    let initMin = initialMin.value;
    initMin = fetchMinForPrice(initMin);

    const getStep = (value) => {
      const s = steps.find(({ until }) => value < until);
      if (!s) throw new Error(`No step found for value: ${value}`);
      return s.step;
    };

    const marks = new Map();

    // Ensure boundaries are consistent
    min = Math.min(min, initMin);
    max = Math.max(max, initialMax.value);

    // Step backward from min down to initialMin
    let backwardVal = min;
    while (backwardVal > initMin) {
      const step = getStep(backwardVal - 1); // Look at step for the value just below
      backwardVal -= step;
      if (backwardVal < initMin) break;
      marks.set(backwardVal, step);
    }

    // Step forward from min to max
    let forwardVal = min;
    while (forwardVal <= max) {
      const step = getStep(forwardVal);
      marks.set(forwardVal, step);
      forwardVal += step;
    }

    // Always ensure initialMin and initialMax are included
    if (!marks.has(initMin)) {
      marks.set(initMin, getStep(initMin));
    }
    if (!marks.has(initialMax.value)) {
      marks.set(initialMax.value, getStep(initialMax.value));
    }

    // Convert marks to range with percentage keys
    // const getPercent = (val) =>
    //   `${((val - initMin) / (initialMax.value - initMin) * 100).toFixed(4)}%`;

    const getPercent = (val) => {
      const lowStart = initMin;         // e.g., 200
      const focusStart = 1000;
      const focusEnd = 15000;
      const highEnd = initialMax.value;  // e.g., 180000

      if (val <= focusStart) {
        // Low range: initMin to 1000 → maps to 0%–30%
        const percent = ((val - lowStart) / (focusStart - lowStart)) * 30;
        return `${percent.toFixed(4)}%`;
      } else if (val <= focusEnd) {
        // Focus range: 1000 to 15000 → maps to 30%–70%
        const percent = 30 + ((val - focusStart) / (focusEnd - focusStart)) * 40;
        return `${percent.toFixed(4)}%`;
      } else {
        // High range: 15000 to initialMax → maps to 70%–100%
        const percent = 70 + ((val - focusEnd) / (highEnd - focusEnd)) * 30;
        return `${percent.toFixed(4)}%`;
      }
    };


    const range = {};
    Array.from(marks.entries())
      .sort((a, b) => a[0] - b[0])
      .forEach(([value, step]) => {
        const percent = getPercent(value);
        range[percent] = [value, step];
      });

    // Required noUiSlider `min` and `max`
    range.min = [initMin, getStep(initMin)];
    range.max = [initialMax.value, getStep(initialMax.value)];

    return range;
}

function checkForMinValidation() {
    minValue.value = Number(minValue.value);
    maxValue.value = Number(maxValue.value);
    
    //Prevent carat filter from setting min value
    if(userMinInput.value && props.filter?.code == caratFilterCode) {
      console.log('in return here', typeof minValue.value, typeof maxValue.value, minValue.value, maxValue.value);
      
      if(minValue.value > maxValue.value) {
        minValue.value = minValueObj.value?.value;
      }
      updateSliderFromInput();
      return;
    }
    userMinInput.value = false;
    if (minValueObj.value && maxValueObj.value && (parseFloat(minValue.value) < minValueObj.value?.value || parseFloat(minValue.value) > maxValueObj.value?.value || parseFloat(minValue.value) > parseFloat(maxValue.value))) {
      minValue.value = minValueObj.value?.value;
    } else {
      minValue.value = parseFloat(minValue.value);
    }
    if (!minValue.value) {
      minValue.value = minValueObj.value?.value;
    }
    if (props.filter?.code == priceFilterCode) {
      showMinPriceInput.value = true;
    }
    updateSliderFromInput();
}

function checkForMaxValidation() {
    minValue.value = Number(minValue.value);
    maxValue.value = Number(maxValue.value);  
    //Prevent carat filter from setting max value
    if(userMaxInput.value && props.filter?.code == caratFilterCode) {
      // if (minValueObj.value && maxValueObj.value && (parseFloat(maxValue.value) < minValueObj.value?.value || parseFloat(minValue.value) > parseFloat(maxValue.value))) {
      //   maxValue.value = maxValueObj.value?.value;
      // }else {
      //   maxValue.value = parseFloat(maxValue.value);
      // }
      if(minValue.value > maxValue.value) {
        maxValue.value = maxValueObj.value?.value;
      }
      updateSliderFromInput();
      return;
    }
    userMaxInput.value = false;
    if (minValueObj.value && maxValueObj.value && (parseFloat(maxValue.value) < minValueObj.value?.value || parseFloat(maxValue.value) > maxValueObj.value?.value || parseFloat(minValue.value) > parseFloat(maxValue.value))) {
      maxValue.value = maxValueObj.value?.value;
    } else {
      maxValue.value = parseFloat(maxValue.value);
    }
    if (!maxValue.value) {
      maxValue.value = maxValueObj.value?.value;
    }
    if (props.filter?.code == priceFilterCode) {
      showMaxPriceInput.value = true;
    }
    updateSliderFromInput();
}

function getStepSizeFromTicks(ticks) {
    if (!ticks || ticks.length < 2) return 0.01;
    let minDiff = Infinity;
    for (let i = 0; i < ticks.length - 1; i++) {
      const diff = ticks[i + 1] - ticks[i];
      if (diff < minDiff) minDiff = diff;
    }
    return parseFloat(minDiff.toFixed(4)); // Avoid floating-point issues
}

async function initializeSlider() {
    try {
      nextTick(async () => {
        if (!props.filter || !props.filter.value || props.filter.value.length < 2) return;
        valueArr.value = props.filter.value;
        if (valueArr.value?.length) {
          minValueObj.value = valueArr.value.reduce((min, obj) =>
            obj.value < min.value ? obj : min
          );

          maxValueObj.value = valueArr.value.reduce((max, obj) =>
            obj.value > max.value ? obj : max
          );
        }
        initialMin.value = minValueObj.value ? minValueObj.value.value : undefined;
        initialMax.value = maxValueObj.value ? maxValueObj.value.value : undefined;
        minValue.value = initialMin.value;
        maxValue.value = initialMax.value;
        
        // Create the noUiSlider instance
        // if (sliderInstance.value) {
        //   sliderInstance.value.destroy();
        //   sliderInstance.value = null;
        // }

        let config = {
          start: getStartPoints.value,
          range: getStepRange.value,
          step: currentStep.value,
          connect: true,
          // snap: true,
          // keyboardDefaultStep: currentStep.value,
          // tooltip: true
        };


        if (getFloatValue.value) {
          config.format = {
            to: function (value) {
              const formattedValue = parseFloat(value).toFixed(2);
              return formattedValue;
            },
            from: function (value) {
              const parsedValue = parseFloat(value).toFixed(2);
              return parsedValue;
            }
          };
        }

        if (getOneDecimalValue.value) {
          config.format = {
            to: function (value) {
              return parseFloat(value).toFixed(1);
            },
            from: function (value) {
              return parseFloat(value).toFixed(1);
            }
          };
        }
        if(!sliderRefs[props.filter?.code]) return;     
        sliderInstance.value = sliderInstance.value || noUiSlider.create(sliderRefs[props.filter?.code], config);

        let finalValue = await assignPreSelectValue();
        sliderInstance.value?.set([finalValue?.min, finalValue?.max]);

        /**
         * ACCESSIBILITY FIX
         * Add ARIA attributes to slider handles
         */
        const slider = sliderRefs[props.filter?.code];
        const handles = slider?.querySelectorAll('.noUi-handle');

        if (handles?.length === 2) {
          handles[0].setAttribute(
            "aria-label",
            `Minimum ${props.filter?.text || props.filter?.code}`
          );

          handles[1].setAttribute(
            "aria-label",
            `Maximum ${props.filter?.text || props.filter?.code}`
          );

          handles.forEach((handle) => {
            handle.setAttribute("role", "slider");
            handle.setAttribute("tabindex", "0");
            handle.setAttribute("aria-valuemin", initialMin.value);
            handle.setAttribute("aria-valuemax", initialMax.value);
          });
        }

        /**
         * Update ARIA values dynamically
         */

        sliderInstance.value.on("update", (values, handle) => {

          if (handles[handle]) {
            handles[handle].setAttribute(
              "aria-valuenow",
              Number(values[handle])
            );

            handles[handle].setAttribute(
              "aria-valuetext",
              `${values[handle]}`
            );
          }

        });

        // Update the UI values during dragging
        sliderInstance.value.on('slide', (values) => {
          let minVal = Number(values[0]);
          let maxVal = Number(values[1]);
          if (maxVal <= minValue.value) maxVal = minValue.value;
          if (minValue.value == minVal && maxValue.value == maxVal && props.filter?.code == caratFilterCode) return;
          let initMin = initialMin.value;
          if (props.filter?.code == priceFilterCode) {
            initMin = fetchMinForPrice(initMin);
            if (minVal == initMin) {
              minVal = initialMin.value;
            }
          }

          minValue.value = minVal;
          maxValue.value = maxVal;

          updateFloatValue();
        });

        // Trigger API call only when dragging ends
        sliderInstance.value.on('change', (values) => {

          let value = JSON.stringify({ min: minValue.value, max: maxValue.value });
          if (minValue.value == finalValue?.min && maxValue.value == finalValue?.max) {
            return;
          }

          setFilterStates(value);
        });
      });
    } catch (error) {
      console.log(error, 'unable to set value rangeslider');
    }
}

async function assignPreSelectValue() {
    if (selectedValue.value && selectedValue.value?.min && selectedValue.value?.max) {
      minValue.value = selectedValue.value?.min;
      maxValue.value = selectedValue.value?.max;
      return selectedValue.value;
    }
    let storedFilters = await store.getFilters;
    let stored = storedFilters ? storedFilters[props.filter.code] : null;
    if (stored) {
      try {
        const jsonValue = typeof stored === "string"
          ? JSON.parse(stored)
          : stored;
        minValue.value = jsonValue?.min ?? minValue.value;
        maxValue.value = jsonValue?.max ?? maxValue.value;
        return jsonValue;
      } catch (error) {
        console.error("Failed to parse selectedValue:", error);
      }
    }
}

function updateMinSliderFromInput(event) {
    userMinInput.value = true;
    minValue.value = event;
}

function updateMaxSliderFromInput(event) {
    userMaxInput.value = true;
    maxValue.value = event;
}

function updateSliderFromInput() {
    updateFloatValue();
    sliderInstance.value?.set([minValue.value, maxValue.value]);
    let value = JSON.stringify({ min: minValue.value, max: maxValue.value });
    setFilterStates(value);
}

function setFilterStates(value) {
    if(minValue.value == initialMin.value && maxValue.value == initialMax.value){
      value = null;
    }
    
    let code = props.filter.code ? props.filter.code : props.filter.text?.toLowerCase().replace(/ /g, '_');
    if(!$isMobile) {
      store.setFilters( { key: code, value });
      store.setFilterCount();
      return;
    }
    // If not mobile, commit the filters to the parent object
    emit('setMobileFilters', { key: code, value });
}

function formattedPrice(item, isMin = false) {
    if (props.filter?.code == priceFilterCode) {
      if (isNaN(item)) return 0;
      return item;
    }
    if (getOneDecimalValue.value && ((isMin && !userMinInput.value) || (!isMin && !userMaxInput.value))) return parseFloat(item).toFixed(1);
    if(getFloatValue.value && ((isMin && !userMinInput.value) || (!isMin && !userMaxInput.value))) return parseFloat(item).toFixed(2);
    return parseFloat(item) || 0;
}

function displayFormattedPrice(item) {
    if (props.filter.code === priceFilterCode) {
      if (!isNaN(item) && item !== "") {
        if (item == 0) return '$0';
        return $formatPrice(parseFloat(item));
      } else {
        return "0";  // Fallback if the item is not a valid number
      }
    }
    return item;
}

function updateFloatValue() {
    if (getOneDecimalValue.value) {
      if (minValue.value) minValue.value = parseFloat(minValue.value).toFixed(1);
      if (maxValue.value) maxValue.value = parseFloat(maxValue.value).toFixed(1);
    } else if (getFloatValue.value) {
      if (minValue.value) minValue.value = parseFloat(minValue.value).toFixed(2);
      if (maxValue.value) maxValue.value = parseFloat(maxValue.value).toFixed(2);
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

.range-slider .noUi-horizontal .noUi-handle {
  @apply w-4 h-4 !shadow-none cursor-pointer !bg-white !border !border-solid !border-primary;
}

.range-slider .noUi-horizontal {
  @apply h-1.5;
}

.range-slider .noUi-connect {
  @apply bg-[#306499];
}

.noUi-connects {
  @apply cursor-pointer;
}

.range-slider .noUi-base .noUi-connect {
  @apply cursor-pointer;
}

.range-slider .noUi-horizontal .noUi-handle {
  right: -7px;
  /* margin: -1px; */
}
</style>