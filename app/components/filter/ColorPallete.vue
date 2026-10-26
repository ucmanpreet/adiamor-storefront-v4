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
<script setup>
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
    showName: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['setMobileFilters']);

const store = useMainStore();
const { $isMobile } = useNuxtApp();

const selectedValue = ref([]);
const filterData = ref(null);

watch(() => store.filterCount, async () => {
    filterData.value = store.getFilters;
    let code = props.filter.code ? props.filter.code : props.filter.name?.toLowerCase().replace(/ /g, '_');
    let data = filterData.value ? filterData.value[code] : null;
    if (data && data.length) selectedValue.value = data;
}, { deep: true, immediate: true });

onMounted(async () => {
    filterData.value = await store.getFilters;
    let code = props.filter.code ? props.filter.code : props.filter.name?.toLowerCase().replace(/ /g, '_');
    let data = filterData.value ? filterData.value[code] : null;
    if (data && data.length) selectedValue.value = data;
});

function getPalletColor(opt) {
    let name = (opt)?.toLowerCase();
    if (name) {
        if (name.includes('yellow')) return 'value-yellow';
        if (name.includes('silver') || name.includes('platinum') || name.includes('white')) return 'value-silver';
        if (name.includes('rose')) return 'value-rose';
        if (name.includes('titanium')) return 'value-titanium';
        if (name.includes('tantalum')) return 'value-tantalum';
    }
    return 'value-yellow'
}
function isActiveClass(code) {
    return selectedValue.value?.some(item => item?.code === code) || false;
}
function handleInput(event, data) {
    if (event.target.checked) {
        selectedValue.value = [...selectedValue.value, data]; // Add value
    } else {
        selectedValue.value = selectedValue.value.filter(item => item.code !== data.code); // Remove value
    }

    // If not mobile, commit the filters to the store
    let code = props.filter.code ? props.filter.code : props.filter.name?.toLowerCase().replace(/ /g, '_');
    if (!$isMobile) {
        store.setFilters({ key: code, value: selectedValue.value });
        store.setFilterCount();
        return;
    }
    // If not mobile, commit the filters to the parent object
    emit('setMobileFilters', { key: code, value: selectedValue.value });
}
function isChecked(value) {
    if (!Array.isArray(selectedValue.value)) return false;
    return selectedValue.value.some(item => item?.code === value?.code);
}
</script>