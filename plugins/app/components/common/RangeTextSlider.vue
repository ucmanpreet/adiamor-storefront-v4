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
      :ref="`slider${filter?.code}`"
      class="slider"
    ></div>

    <!-- Live announcement -->
    <span class="sr-only" aria-live="polite">
      {{ ariaValueText }}
    </span>
  </div>
</template>

<script>
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
export default {
  name : 'RangeTextSlider',
  props: ['filter', 'updateSlider', 'selectedFilterValue'],
  data() {
    return {
      sliderInstance: null,
      valueArr: [],
      selectedValue: null,
      filterData: null,
      allValues: []
    };
  },
  async mounted() {
    this.filterData = await this.$store.getters.getFilters;
    let code = this.filter?.code;
    this.selectedValue = this.filterData ? this.filterData[code] : null;
    await this.initializeSlider();
  },
  computed: {
    ariaValueNow() {
      if (!this.allValues?.length) return 0;
      return this.allValues.length;
    },

    ariaValueText() {
      if (!this.allValues?.length) {
        return `All ${this.filter?.text || 'values'} selected`;
      }

      const first = this.allValues[0]?.label;
      let last = this.allValues[this.allValues.length - 1]?.label;
      if(last?.includes('_none')){
        last = this.allValues[this.allValues.length - 2]?.label;
      }

      return `${this.filter?.text || 'Filter'} from ${first} to ${last}`;
    }
  },
  watch: {
    async selectedFilterValue (newValue, oldValue) {
        if(newValue?.length == oldValue?.length) return;

        this.selectedValue = newValue;
        if (!this.sliderInstance) {
           await this.initializeSlider();
           return;
        }
        if(!newValue) {
          let firstLabel = this.valueArr[0]?.label;
          let secondLabel = this.valueArr[this.valueArr.length - 1]?.label;
          this.sliderInstance?.set([firstLabel, secondLabel]);
          return;
        }
        this.assignSlider();
    },
    updateSlider() {
      if(this.sliderInstance) {
        this.sliderInstance.destroy();
        this.sliderInstance = null;
      }
      this.initializeSlider();
    }
  },
  methods: {
    assignSlider(){
          let valueArr = this.valueArr;
          let firstItem = this.selectedValue[0];
          let lastItem = this.selectedValue[this.selectedValue.length - 1];
          const firstLabelIndex = valueArr.findIndex(v => v.code === firstItem?.code);
          const lastLabelIndex = valueArr.findIndex(v => v.code === lastItem?.code);
          if(firstLabelIndex > lastLabelIndex) {
            firstItem = this.selectedValue[this.selectedValue.length - 1];
            lastItem = this.selectedValue[0];
          }
          let firstLabel = firstItem?.label;
          let secondLabel = lastItem?.label;
          if(valueArr) {
            const selectedCode = lastItem?.code;
            const index = valueArr.findIndex(v => v.code === selectedCode);
            if(index > 0) {
              secondLabel = valueArr[index + 1]?.label;
            }
          }
          this.sliderInstance?.set([firstLabel, secondLabel]);
    },
    async initializeSlider() {
      try {
        // Properly await the tick so the slider DOM element is ready
        await this.$nextTick();

        if (!this.filter || !this.filter.value || this.filter.value.length < 2) return;

        this.valueArr = this.filter.value;

        const filtered = this.valueArr.filter(v => v.code !== 'front_none');
        const lastRealLabel = filtered[filtered?.length - 1]?.label;

        this.valueArr = [
          ...this.valueArr.filter(v => v.code !== 'front_none'),
          { label: `${lastRealLabel} Max Value`, code: 'front_none', value: 0 }
        ];

        if (this.valueArr.length > 2) {
          let arbitraryValuesForSlider = this.valueArr.map(el => el?.label);
          var format = {
            to: function (value) {
              return arbitraryValuesForSlider[Math.round(value)];
            },
            from: function (value) {
              return arbitraryValuesForSlider.indexOf(value);
            }
          };

          if(!this.$refs[`slider${this.filter?.code}`]) return;

          this.sliderInstance = this.sliderInstance || noUiSlider.create(
            this.$refs[`slider${this.filter?.code}`],
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

          const handles = this.$refs[`slider${this.filter?.code}`]
            ?.querySelectorAll('.noUi-handle');

          handles.forEach((handle, index) => {
            handle.setAttribute(
              "aria-label",
              `${this.filter?.text || "Filter"} ${index === 0 ? "minimum value" : "maximum value"}`
            );
            handle.setAttribute(
              "aria-labelledby",
              `slider-label-${this.filter?.code}`
            );
          });

          this.sliderInstance.on('change', async (values) => {
            const labels = this.valueArr.map(d => d?.label);
            const [start, end] = values.map(label => labels.indexOf(label)).sort((a, b) => a - b);
            this.allValues = this.valueArr.slice(start, end);

            if (this.allValues && this.allValues.length === this.valueArr.length - 1) {
              this.allValues = null;
            }
            let code = this.filter.code ? this.filter.code : this.filter.text?.toLowerCase().replace(/ /g, '_');
            if(!this.$isMobile) {
              this.$store.commit('setFilters', { key: code, value: this.allValues });
              this.$store.commit('setFilterCount');
              return;
            }
            this.$emit('setMobileFilters', { key: code, value: this.allValues});
          });

          // Apply selected value now that slider is ready
          if (this.selectedValue?.length >= 1) {
            this.assignSlider();
          }
        }
      } catch (error) {
        console.error(error, 'error rangetextslider');
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
