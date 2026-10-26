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
<script>
import Icon from '~/components/common/Icon.vue';
import MediaImage from '~/components/common/MediaImage.vue';
export default {
  name : 'IconFilter',
  components: { Icon, MediaImage },
  props: {
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
    }
  },
  data() {
    return {
      selectedValue: [],
      filterData: null,
      filterType: '',
    };
  },
  watch: {
    // Watch the computed property
    selectedFilterValue: {
      handler(newValue, oldValue) {        
        this.selectedValue = newValue?.length ? newValue : []; // If there is at least one selected value, assign the slide
      },
      deep: true,
      immediate: true
    },
    'selectedValue.value': {
      handler(newValue, oldValue) {
        if (this.$isMobile && this.selectedValue?.length == 1) {
          this.scrollToSelected()
        }
      },
      deep: true
    }
  },
  async mounted() {
    this.filterData = await this.$store.getters.getFilters;
    let code = this.filter.code ? this.filter.code : this.filter.name?.toLowerCase().replace(/ /g, '_');
    let data = this.filterData ? this.filterData[code] : null;
    if (data && data.length) this.selectedValue = data;
    this.filterType = this.$route.params?.prefix?.toLowerCase();
  },
  methods: {
    checkForCenterStone($event, el) {
      if (this.filter.code == "center_stone_shape" && this.filterData && Object.keys(this.filterData).length) {
        let dataValue = this.filterData[this.filter.code];
        if (dataValue && dataValue?.length) {
          if (el?.code == dataValue[0]?.code) {
            this.selectedValue = [];
            if(!this.$isMobile) {
              this.$store.commit('setFilters', { key: this.filter.code, value: null });
              this.$store.commit('setFilterCount');
              return;
            }
            // If not mobile, commit the filters to the parent object
            this.$emit('setMobileFilters', { key: this.filter.code, value: null });
          }
        }
      }
    },
    handleInputKeyboard(el) {
      const fakeEvent = {
        target: {
          checked: !this.isActiveClass(el.code),
        },
      };
      this.handleInput(fakeEvent, el);
    },
    getImageUrl(code) {
      try {
        return assetUrl(`@/assets/images/styles/${this.filterType}/${code}.webp`);
      } catch (e) {
        return assetUrl("~/assets/images/no-image.webp"); // or a fallback image
      }
    },
    isActiveClass(code) {
      if ((!this.selectedValue || (this.selectedValue && !this.selectedValue.length)) && code == 'all') {
        return true;
      }
      return this.selectedValue?.some(item => item?.code === code) || false;
    },
    handleInput(event, data) {
      if (this.filter.code == 'center_stone_shape') {
        this.selectedValue = [data];
      } else {
        if (event.target.checked) {
          this.selectedValue = [...this.selectedValue, data]; // Add value
          let isAllPresent = this.filter?.value?.find((el) => el.code == 'all');
          if (isAllPresent && data.code == 'all') {
            this.selectedValue = [];
          }
          if (isAllPresent && data.code != 'all') {
            this.selectedValue = this.selectedValue.filter(item => item.code !== 'all');
          }
        } else {
          this.selectedValue = this.selectedValue.filter(item => item.code !== data.code); // Remove value
        }
      }

      // Remove duplicates at the end by ensuring unique 'code' values
      this.selectedValue = (this.selectedValue?.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t?.code === value?.code
        ))
      )) || [];
      // If not mobile, commit the filters to the store
      let code = this.filter.code ? this.filter.code : this.filter.name?.toLowerCase().replace(/ /g, '_');
      let dataToSet = this.selectedValue;
      if(Array.isArray(dataToSet) && dataToSet.length == 0) dataToSet = null;
      this.$store.commit('setFilters', { key: code, value: dataToSet });
      this.$store.commit('setFilterCount');
    },
    isChecked(value) {
      return this.selectedValue?.some(item => item?.value === value);
    },
   scrollToSelected() {
      this.$nextTick(() => {
        const refs = this.$refs.optionRefs
        if (!Array.isArray(refs)) return

        const selectedCode = this.selectedValue[0].code;

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
  }
}
</script>

<style>
.word-break {
  word-break: break-word !important;
}
</style>