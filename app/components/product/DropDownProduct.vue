<template>
    <div ref="root" class="relative block text-left font-normal w-full">
        <!-- ARIA Live Region -->
        <div
            ref="ariaLive"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            class="sr-only"
        ></div>

        <!-- Dropdown Trigger -->
        <div v-click-outside="onClickOutside">
            <button type="button"
                @click="toggle"
                @focus="onButtonFocus"
                @keydown.down.prevent="openByKey(false)"
                @keydown.up.prevent="openByKey(true)"
                class="inline-flex items-center justify-between w-full text-left bg-gray-100 p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 min-h-10"
                :aria-expanded="isOpen.toString()"
                aria-haspopup="listbox">
                <span v-if="selectedVariant && (isMaterialVariant || isShapeVariant)" class="flex gap-2 items-center">
                    <span class="value text-xs" v-if="isMaterialVariant" :class="getPalletColor(selectedOption)" aria-hidden="true"></span>
                    <template v-else>
                        <!-- If shape exists -->
                        <Icon v-if="getShape !== 'unset'" :name="selectedOption?.admin_name" class="w-6 h-6" aria-hidden="true"/>

                        <!-- If UNSET (no shape) -->
                        <Icon v-else name="engagement_rings_family" class="w-6 h-6 text-[#aaa]" aria-hidden="true" />
                    </template>
                    <span>{{ selectedOption?.label || defaultName }}</span>
                    <span v-if="defaultPrice"> - {{ formattedPrice(defaultPrice) }}</span>
                </span>
                <span class="font-normal" v-else>{{ defaultName || '' }}</span>
                <svg class="-mr-1 ml-2 h-5 w-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- Dropdown Menu -->
        <div v-show="isOpen"
            ref="listbox"
            class="origin-top-right absolute z-20 inset-x-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            role="listbox"
            :aria-activedescendant="selectedOption?.id"
            aria-label="Select a variant"
            @keydown.esc.prevent="closeDropdown"
            @keydown.down.prevent="trapFocus(false)"
            @keydown.up.prevent="trapFocus(true)"
            @keydown.tab.exact.prevent="trapFocus(false)"
            @keydown.shift.tab.prevent="trapFocus(true)">
            <div class="py-1 divide-y divide-gray-100 max-h-96 overflow-auto">
                <button type="button"
                    v-for="(el, index) in variants"
                    :key="el?.id || index"
                    @click="selectOption(el)"
                    @focus="onOptionFocus(el)"
                    :class="[
                        el?.id == selectedOption?.id ? 'bg-gray-100' : '',
                        'flex gap-2 items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500'
                    ]"
                    role="option"
                    :aria-selected="el?.id == selectedOption?.id">
                    <span class="value text-xs" v-if="isMaterialVariant" :class="getPalletColor(el)" aria-hidden="true"></span>
                    <Icon :name="el?.admin_name" v-if="isShapeVariant" class="w-6 h-6" aria-hidden="true"/>
                    <span>{{ el?.label }}</span>
                    <span v-if="isMaterialVariant && getVariantPrice(el)" class="text-sm font-semibold">
                        - {{ formattedPrice(getVariantPrice(el)) }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from "~/components/common/Icon.vue";

const props = defineProps({
    variants: {
        type: Array,
        required: true,
    },
    selectedVariant: {
        type: Object,
        // required: true,
    },
    attribute: {
        type: Object,
        default: () => {},
    },
    productVariant: {
        type: Array,
        default: () => [],
    }
});
const emit = defineEmits(['updateCount', 'change']);

const { $formatPrice } = useNuxtApp();

const root = ref(null);
const ariaLive = ref(null);
const listbox = ref(null);
const isOpen = ref(false);

onMounted(() => {
    if(props.variants.length > 0) {
        emit('updateCount');
    }
});

const defaultName = computed(() => `Select ${props.attribute?.name}`);
const defaultPrice = computed(() => isMaterialVariant.value ? props.selectedVariant?.price : null);
const selectedOption = computed(() => {
    const code = props.attribute?.code;
    return props.variants?.find(v => v?.id == props.selectedVariant?.[code]) || null;
    //return props.variants.find((item) => isMaterialVariant.value ? item.id == props.selectedVariant?.material_variation : item.id == props.selectedVariant?.center_stone_shape);
});
const getShape = computed(() => props.selectedVariant?.shape?.toLowerCase() ?? '');
const isMaterialVariant = computed(() => props.attribute?.code == 'material_variation');
const isShapeVariant = computed(() => props.attribute?.code == 'center_stone_shape');

function announce(message) {
    const el = ariaLive.value;
    if (!el) return;
    el.textContent = '';
    nextTick(() => { el.textContent = message; });
}

function toggle() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        nextTick(() => {
            const options = listbox.value?.querySelectorAll('button[role="option"]');
            if (options?.length) options[0].focus();
            const current = selectedOption.value?.label || defaultName.value;
            announce(
                `Dropdown expanded. Press Tab to move down, Shift+Tab to move up, Enter to select. Current value: ${current}`
            );
        });
    } else {
        announce('Dropdown collapsed.');
    }
}

function closeDropdown() {
    isOpen.value = false;
    announce('Dropdown closed.');
    nextTick(() => root.value?.querySelector('button[aria-haspopup]')?.focus());
}

function openByKey(reverse) {
    isOpen.value = true;
    nextTick(() => {
        const options = Array.from(listbox.value?.querySelectorAll('button[role="option"]') || []);
        if (!options.length) return;
        reverse ? options[options.length - 1].focus() : options[0].focus();
        const current = selectedOption.value?.label || defaultName.value;
        announce(`Dropdown expanded. Press Arrow Down or Up to navigate. Current value: ${current}`);
    });
}

function trapFocus(reverse) {
    const options = Array.from(listbox.value?.querySelectorAll('button[role="option"]') || []);
    if (!options.length) return;
    const index = options.indexOf(document.activeElement);
    if (reverse) {
        (options[index - 1] || options[options.length - 1])?.focus();
    } else {
        (options[index + 1] || options[0])?.focus();
    }
}

function onButtonFocus() {
    if (!isOpen.value) {
        const current = selectedOption.value?.label || defaultName.value;
        announce(`${current}. Press Enter or Spacebar to expand the dropdown`);
    }
}

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}

function selectOption(option) {
    emit('change', option);
    isOpen.value = false;
    const label = option?.label || option?.admin_name || '';
    const price = getVariantPrice(option);
    const priceStr = price ? ` - ${formattedPrice(price)}` : '';
    announce(`${label}${priceStr} selected`);
}

function onOptionFocus(el) {
    const label = el?.label || el?.admin_name || '';
    const price = getVariantPrice(el);
    const priceStr = price ? ` - ${formattedPrice(price)}` : '';
    announce(`${label}${priceStr}. Press Enter to select`);
}

function onClickOutside() {
    isOpen.value = false;
}

function getPalletColor(opt) {
    let name = opt?.admin_name ?? opt;
    if (name) {
        if (name.includes('yellow')) return 'value-yellow';
        if (name.includes('silver') || name.includes('platinum') || name.includes('white')) return 'value-silver';
        if (name.includes('rose')) return 'value-rose';
        if (name.includes('titanium')) return 'value-titanium';
        if (name.includes('tantalum')) return 'value-tantalum';
    }
    return 'value-yellow'
}

function getVariantPrice(el) {
    if (!el?.id || !props.productVariant?.length) return null;

    const code = props.attribute?.code;
    const superAttrCodes = ['material_variation', 'center_stone_shape', 'carat_variation', 'growth_variation'];

    // Find the variant that would actually be selected if el were chosen:
    // match el.id for this attribute AND all other currently selected super-attr values.
    const candidate = props.productVariant.find(variant => {
        if (variant[code] != el?.id) return false;
        if (!props.selectedVariant) return true;

        return superAttrCodes.every(k => {
            if (k === code) return true;
            const selected = props.selectedVariant[k];
            if (selected == null || selected === undefined) return true;
            return variant[k] == selected;
        });
    });

    if (candidate) return candidate.price;

    // Fallback: min price for this option when no exact combined match exists
    return props.productVariant.find(v => v[code] == el?.id)?.price ?? null;
}
</script>