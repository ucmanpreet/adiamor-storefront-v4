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
      :ref="`slider${filter?.code}`"
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

<script>
import KEYS from '@/utils/constant.js';
import InputField from '~/components/ui/InputField.vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
export default {
  name : 'RangeSlider',
  components: { InputField },
  props: ['filter', 'selectedFilterValue'],
  data() {
    return {
      minValue: 0, // Default min
      maxValue: 0, // Default max
      sliderInstance: null,
      valueArr: [],
      filterData: null,
      selectedValue: null,
      oldMin: 0,
      oldMax: 0,
      showMinPriceInput: true,
      showMaxPriceInput: true,
      currentStep: 0.01,
      hasHandledEqualSlider: false,
      initialMin: 0,
      initialMax: 0,
      caratFilterCode: 'diamond_carat_weight',
      lwRatioFilterCode: 'length/width',
      priceFilterCode: 'price',
      tableFilterCode: 'diamond_table_percent',
      depthFilterCode: 'diamond_depth_percent',
      maxCaratRange: KEYS.DIAMOND_CARAT_MAX_VALUE,
      minValueObj: null,
      maxValueObj: null,
      userMinInput : false,
      userMaxInput : false,
    };
  },
  async mounted() {
   await this.initSlider();
  },
  computed: {
    getStartPoints() {
      let minVal = this.minValue, maxVal = this.maxValue;
      if (this.filter?.code == this.priceFilterCode) {
        minVal = this.fetchMinForPrice(minVal);
      }
      return [minVal, maxVal];
    },
    getStepRange() {
      let min = this.minValue;
      let max = this.maxValue;
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

      switch (this.filter?.code) {
        case this.caratFilterCode:
          return sliderRange;

        case this.priceFilterCode:
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
          let range = this.generateNoUiSliderRange(min, max);
          return range;
        default:
          return {
            min: min,
            max: max,
          }
      }
    },
    getFloatValue() {
      return [this.caratFilterCode, this.lwRatioFilterCode].includes(this.filter.code);
    },
    getOneDecimalValue() {
      return [this.tableFilterCode, this.depthFilterCode].includes(this.filter.code);
    }
  },
  watch: {
    // Watch the computed property
    async selectedFilterValue(newValue, oldValue) {
        if(newValue?.max == oldValue?.max && newValue?.min == oldValue?.min) return;
                   
        this.selectedValue = newValue;        
        if (!this.sliderInstance) {
           await this.initializeSlider();
           return;
        }
        if(!newValue) {
          this.minValue = this.initialMin;
          this.maxValue = this.initialMax;
          this.sliderInstance?.set([this.initialMin, this.initialMax]);
          return;
        }
        let finalValue = await this.assignPreSelectValue();
        this.sliderInstance?.set([finalValue?.min, finalValue?.max]);
      },
  },
  methods: {
    async initSlider() {
       // Initialize the slider with default values
      this.filterData = await this.$store.getters.getFilters;
      let code = this.filter?.code;
      this.selectedValue = this.filterData ? this.filterData[code] : null;
      if (this.filter.code == this.priceFilterCode) this.currentStep = 10;
      if (this.getOneDecimalValue) this.currentStep = 0.1;
      await this.initializeSlider();
    },
    fetchMinForPrice(min) {
      if (this.filter?.code == this.priceFilterCode && min == this.initialMin) {
        let minData = this.minValueObj;
        if (minData && typeof minData.value === 'number' && minData.value % 10) {
          return Math.floor(minData.value / 10) * 10;
        }
        return min;
      }
      return min;
    },
    getStepForValue(value, steps) {
      for (let i = 0; i < steps.length; i++) {
        if (value < steps[i].until) {
          return steps[i].step;
        }
      }
      throw new Error(`No step found for value: ${value}`);
    },
    generateNoUiSliderRange(min, max) {
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
      let initMin = this.initialMin;
      initMin = this.fetchMinForPrice(initMin);

      const getStep = (value) => {
        const s = steps.find(({ until }) => value < until);
        if (!s) throw new Error(`No step found for value: ${value}`);
        return s.step;
      };

      const marks = new Map();

      // Ensure boundaries are consistent
      min = Math.min(min, initMin);
      max = Math.max(max, this.initialMax);

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
      if (!marks.has(this.initialMax)) {
        marks.set(this.initialMax, getStep(this.initialMax));
      }

      // Convert marks to range with percentage keys
      // const getPercent = (val) =>
      //   `${((val - initMin) / (this.initialMax - initMin) * 100).toFixed(4)}%`;

      const getPercent = (val) => {
        const lowStart = initMin;         // e.g., 200
        const focusStart = 1000;
        const focusEnd = 15000;
        const highEnd = this.initialMax;  // e.g., 180000

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
      range.max = [this.initialMax, getStep(this.initialMax)];

      return range;
    },
    checkForMinValidation() {
      this.minValue = Number(this.minValue);
      this.maxValue = Number(this.maxValue);
      
      //Prevent carat filter from setting min value
      if(this.userMinInput && this.filter?.code == this.caratFilterCode) {
        console.log('in return here', typeof this.minValue, typeof this.maxValue, this.minValue, this.maxValue);
        
        if(this.minValue > this.maxValue) {
          this.minValue = this.minValueObj?.value;
        }
        this.updateSliderFromInput();
        return;
      }
      this.userMinInput = false;
      if (this.minValueObj && this.maxValueObj && (parseFloat(this.minValue) < this.minValueObj?.value || parseFloat(this.minValue) > this.maxValueObj?.value || parseFloat(this.minValue) > parseFloat(this.maxValue))) {
        this.minValue = this.minValueObj?.value;
      } else {
        this.minValue = parseFloat(this.minValue);
      }
      if (!this.minValue) {
        this.minValue = this.minValueObj?.value;
      }
      if (this.filter?.code == this.priceFilterCode) {
        this.showMinPriceInput = true;
      }
      this.updateSliderFromInput();
    },
    checkForMaxValidation() {
      this.minValue = Number(this.minValue);
      this.maxValue = Number(this.maxValue);  
      //Prevent carat filter from setting max value
      if(this.userMaxInput && this.filter?.code == this.caratFilterCode) {
        // if (this.minValueObj && this.maxValueObj && (parseFloat(this.maxValue) < this.minValueObj?.value || parseFloat(this.minValue) > parseFloat(this.maxValue))) {
        //   this.maxValue = this.maxValueObj?.value;
        // }else {
        //   this.maxValue = parseFloat(this.maxValue);
        // }
        if(this.minValue > this.maxValue) {
          this.maxValue = this.maxValueObj?.value;
        }
        this.updateSliderFromInput();
        return;
      }
      this.userMaxInput = false;
      if (this.minValueObj && this.maxValueObj && (parseFloat(this.maxValue) < this.minValueObj?.value || parseFloat(this.maxValue) > this.maxValueObj?.value || parseFloat(this.minValue) > parseFloat(this.maxValue))) {
        this.maxValue = this.maxValueObj?.value;
      } else {
        this.maxValue = parseFloat(this.maxValue);
      }
      if (!this.maxValue) {
        this.maxValue = this.maxValueObj?.value;
      }
      if (this.filter?.code == this.priceFilterCode) {
        this.showMaxPriceInput = true;
      }
      this.updateSliderFromInput();
    },
    getStepSizeFromTicks(ticks) {
      if (!ticks || ticks.length < 2) return 0.01;
      let minDiff = Infinity;
      for (let i = 0; i < ticks.length - 1; i++) {
        const diff = ticks[i + 1] - ticks[i];
        if (diff < minDiff) minDiff = diff;
      }
      return parseFloat(minDiff.toFixed(4)); // Avoid floating-point issues
    },
    // Initialize or reinitialize the slider when needed
    async initializeSlider() {
      try {
        this.$nextTick(async () => {
          if (!this.filter || !this.filter.value || this.filter.value.length < 2) return;
          this.valueArr = this.filter.value;
          if (this.valueArr?.length) {
            this.minValueObj = this.valueArr.reduce((min, obj) =>
              obj.value < min.value ? obj : min
            );

            this.maxValueObj = this.valueArr.reduce((max, obj) =>
              obj.value > max.value ? obj : max
            );
          }
          this.initialMin = this.minValueObj ? this.minValueObj.value : undefined;
          this.initialMax = this.maxValueObj ? this.maxValueObj.value : undefined;
          this.minValue = this.initialMin;
          this.maxValue = this.initialMax;
          
          // Create the noUiSlider instance
          // if (this.sliderInstance) {
          //   this.sliderInstance.destroy();
          //   this.sliderInstance = null;
          // }

          let config = {
            start: this.getStartPoints,
            range: this.getStepRange,
            step: this.currentStep,
            connect: true,
            // snap: true,
            // keyboardDefaultStep: this.currentStep,
            // tooltip: true
          };


          if (this.getFloatValue) {
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

          if (this.getOneDecimalValue) {
            config.format = {
              to: function (value) {
                return parseFloat(value).toFixed(1);
              },
              from: function (value) {
                return parseFloat(value).toFixed(1);
              }
            };
          }
          if(!this.$refs[`slider${this.filter?.code}`]) return;     
          this.sliderInstance = this.sliderInstance || noUiSlider.create(this.$refs[`slider${this.filter?.code}`], config);

          let finalValue = await this.assignPreSelectValue();
          this.sliderInstance?.set([finalValue?.min, finalValue?.max]);

          /**
           * ACCESSIBILITY FIX
           * Add ARIA attributes to slider handles
           */
          const slider = this.$refs[`slider${this.filter?.code}`];
          const handles = slider?.querySelectorAll('.noUi-handle');

          if (handles?.length === 2) {
            handles[0].setAttribute(
              "aria-label",
              `Minimum ${this.filter?.text || this.filter?.code}`
            );

            handles[1].setAttribute(
              "aria-label",
              `Maximum ${this.filter?.text || this.filter?.code}`
            );

            handles.forEach((handle) => {
              handle.setAttribute("role", "slider");
              handle.setAttribute("tabindex", "0");
              handle.setAttribute("aria-valuemin", this.initialMin);
              handle.setAttribute("aria-valuemax", this.initialMax);
            });
          }

          /**
           * Update ARIA values dynamically
           */

          this.sliderInstance.on("update", (values, handle) => {

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
          this.sliderInstance.on('slide', (values) => {
            let minVal = Number(values[0]);
            let maxVal = Number(values[1]);
            if (maxVal <= this.minValue) maxVal = this.minValue;
            if (this.minValue == minVal && this.maxValue == maxVal && this.filter?.code == this.caratFilterCode) return;
            let initMin = this.initialMin;
            if (this.filter?.code == this.priceFilterCode) {
              initMin = this.fetchMinForPrice(initMin);
              if (minVal == initMin) {
                minVal = this.initialMin;
              }
            }

            this.minValue = minVal;
            this.maxValue = maxVal;

            this.updateFloatValue();
          });

          // Trigger API call only when dragging ends
          this.sliderInstance.on('change', (values) => {

            let value = JSON.stringify({ min: this.minValue, max: this.maxValue });
            if (this.minValue == finalValue?.min && this.maxValue == finalValue?.max) {
              return;
            }

            this.setFilterStates(value);
          });
        });
      } catch (error) {
        console.log(error, 'unable to set value rangeslider');
      }
    },
    async assignPreSelectValue() {
      if (this.selectedValue && this.selectedValue?.min && this.selectedValue?.max) {
        this.minValue = this.selectedValue?.min;
        this.maxValue = this.selectedValue?.max;
        return this.selectedValue;
      }
      let filterData = await this.$store.getters.getFilters;
      let selectedValue = filterData ? filterData[this.filter.code] : null;
      if (selectedValue) {
        try {
          const jsonValue = typeof selectedValue === "string"
            ? JSON.parse(selectedValue)
            : selectedValue;
          this.minValue = jsonValue?.min ?? this.minValue;
          this.maxValue = jsonValue?.max ?? this.maxValue;
          return jsonValue;
        } catch (error) {
          console.error("Failed to parse selectedValue:", error);
        }
      }
    },
    updateMinSliderFromInput(event) {      
      this.userMinInput = true;
      this.minValue = event;
    },
    updateMaxSliderFromInput(event) {
      this.userMaxInput = true;
      this.maxValue = event;
    },
    // Method to update the slider when input values change
    updateSliderFromInput() {
      this.updateFloatValue();
      this.sliderInstance?.set([this.minValue, this.maxValue]);
      let value = JSON.stringify({ min: this.minValue, max: this.maxValue });
      this.setFilterStates(value);
    },
    setFilterStates(value) {
      if(this.minValue == this.initialMin && this.maxValue == this.initialMax){
        value = null;
      }
      
      let code = this.filter.code ? this.filter.code : this.filter.text?.toLowerCase().replace(/ /g, '_');
      if(!this.$isMobile) {
        this.$store.commit('setFilters', { key: code, value });
        this.$store.commit('setFilterCount');
        return;
      }
      // If not mobile, commit the filters to the parent object
      this.$emit('setMobileFilters', { key: code, value });
    },
    formattedPrice(item, isMin = false) {
      if (this.filter?.code == this.priceFilterCode) {
        if (isNaN(item)) return 0;
        return item;
      }
      if (this.getOneDecimalValue && ((isMin && !this.userMinInput) || (!isMin && !this.userMaxInput))) return parseFloat(item).toFixed(1);
      if(this.getFloatValue && ((isMin && !this.userMinInput) || (!isMin && !this.userMaxInput))) return parseFloat(item).toFixed(2);
      return parseFloat(item) || 0;
    },
    displayFormattedPrice(item) {
      if (this.filter.code === this.priceFilterCode) {
        if (!isNaN(item) && item !== "") {
          if (item == 0) return '$0';
          return this.$formatPrice(parseFloat(item));
        } else {
          return "0";  // Fallback if the item is not a valid number
        }
      }
      return item;
    },
    updateFloatValue() {
      if (this.getOneDecimalValue) {
        if (this.minValue) this.minValue = parseFloat(this.minValue).toFixed(1);
        if (this.maxValue) this.maxValue = parseFloat(this.maxValue).toFixed(1);
      } else if (this.getFloatValue) {
        if (this.minValue) this.minValue = parseFloat(this.minValue).toFixed(2);
        if (this.maxValue) this.maxValue = parseFloat(this.maxValue).toFixed(2);
      }
    },
  }
};
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