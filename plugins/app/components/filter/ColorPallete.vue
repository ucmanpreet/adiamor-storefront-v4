<template>
    <fieldset>
        <legend class="sr-only">
            {{ filter?.label || filter?.name }}
        </legend>
        <ul class="grid grid-cols-4 gap-4 sm:gap-x-0 place-content-start">
            <li class="flex justify-center" v-for="(variant, index) in filter.value" :key="variant.code">
                <!-- active color class 'ring-2 ring-primary' -->
                <label :for="`metal_${index}`" :aria-label="`${variant?.label} metal option`"
                    class="relative inline-flex flex-col text-center cursor-pointer items-center justify-start rounded-full p-0.5">
                    <input :id="`metal_${index}`" type="checkbox"
                        @input="handleInput($event, variant)" :name="filter.code"
                        class="peer absolute inset-0 opacity-0 z-10 focus:ring-2 focus:ring-primary" :checked="isChecked(variant)" :value="variant.code">
                    <span role="presentation" class="value hover:ring-2 hover:ring-primary rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    :class="[{ 'ring-2 ring-primary': isActiveClass(variant.code) }, getPalletColor(variant?.code)]"></span>
                    <span v-if="showName" class="mt-2 text-xs">
                        {{ variant?.label}}
                    </span>
                </label>
            </li>
        </ul>
    </fieldset>
</template>
<script>
export default {
    name : 'ColorPallete',
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
        showName: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedValue: [],
            filterData: null
        };
    },
    watch: {
        '$store.state.filterCount': {
            async handler(newValue, oldValue) {
                this.filterData = this.$store.getters.getFilters;
                let code = this.filter.code ? this.filter.code : this.filter.name?.toLowerCase().replace(/ /g, '_');
                let data = this.filterData ? this.filterData[code] : null;
                if (data && data.length) this.selectedValue = data;
            },
            deep: true,
            immediate: true
        }
    },
    async mounted() {
        this.filterData = await this.$store.getters.getFilters;
        let code = this.filter.code ? this.filter.code : this.filter.name?.toLowerCase().replace(/ /g, '_');
        let data = this.filterData ? this.filterData[code] : null;
        if (data && data.length) this.selectedValue = data;
    },
    methods: {
        getPalletColor(opt) {
			let name = (opt)?.toLowerCase();
			if (name) {
				if (name.includes('yellow')) return 'value-yellow';
				if (name.includes('silver') || name.includes('platinum') || name.includes('white')) return 'value-silver';
				if (name.includes('rose')) return 'value-rose';
				if (name.includes('titanium')) return 'value-titanium';
				if (name.includes('tantalum')) return 'value-tantalum';
			}
			return 'value-yellow'
		},
        isActiveClass(code) {
            return this.selectedValue?.some(item => item?.code === code) || false;
        },
        handleInput(event, data) {
            if (event.target.checked) {
                this.selectedValue = [...this.selectedValue, data]; // Add value
            } else {
                this.selectedValue = this.selectedValue.filter(item => item.code !== data.code); // Remove value
            }

            // If not mobile, commit the filters to the store
            let code = this.filter.code ? this.filter.code : this.filter.name?.toLowerCase().replace(/ /g, '_');
            if (!this.$isMobile) {
                this.$store.commit('setFilters', { key: code, value: this.selectedValue });
                this.$store.commit('setFilterCount');
                return;
            }
            // If not mobile, commit the filters to the parent object
            this.$emit('setMobileFilters', { key: code, value: this.selectedValue });
        },
        isChecked(value) {
            if (!Array.isArray(this.selectedValue)) return false;
            return this.selectedValue.some(item => item?.code === value?.code);
        }
    }
}
</script>