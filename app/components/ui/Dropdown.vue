<!-- File: AccessibleDropdown.vue -->
<template>
    <div class="relative block text-left font-normal" :class="parentClass">
        <!-- Dropdown Trigger -->
        <div v-click-outside="onClickOutside">
            <button
                type="button"
                ref="triggerButton"
                :tabindex="isOpen ? '-1' : undefined"
                @click="toggle"
                @focus="onButtonFocus"
                @keydown.down.prevent="openByKey(false)"
                @keydown.up.prevent="openByKey(true)"
                class="inline-flex items-center justify-between w-full text-left px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 min-h-10
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="buttonClass"
                :aria-expanded="isOpen.toString()"
                :aria-label="ariaLabel ? `${ariaLabel}: ${currentValueLabel}` : undefined"
            >
                <span v-if="selectedVariant" :class="['block', className]">
                    <span>{{ selectedVariant?.name || selectedVariant?.sku || selectedVariant }}</span>
                    <span v-if="selectedVariant.price"> - {{ formattedPrice(selectedVariant.price) }}</span>
                </span>

                <span class="font-normal" v-else>{{ defaultName || '' }}</span>

                <!-- Decorative Icon -->
                <svg
                    class="-mr-1 ml-2 h-5 w-5 flex-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>

        <!-- Dropdown Menu -->
        <p :id="`listbox-label-${uid}`" class="sr-only">Select a value:</p>
        <div
            v-show="isOpen"
            ref="listbox"
            class="origin-top-right absolute z-50 inset-x-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            role="listbox"
            :aria-hidden="(!isOpen).toString()"
            :aria-labelledby="`listbox-label-${uid}`"
            @keydown.esc.prevent="closeDropdown"
            @keydown.down.prevent="trapFocus(false)"
            @keydown.up.prevent="trapFocus(true)"
            @keydown.tab.exact.prevent="trapFocus(false)"
            @keydown.shift.tab.prevent="trapFocus(true)"
        >
            <div class="py-1 divide-y divide-gray-100 max-h-72 overflow-auto">
                <button
                    v-for="(el, index) in variants"
                    :key="index"
                    type="button"
                    role="option"
                    :id="`variant-option-${uid}-${index}`"
                    :aria-selected="isSelected(el).toString()"
                    @click="selectOption(el)"
                    @keydown.esc.prevent="closeDropdown"
                    @focus="onOptionFocus(el)"
                    :class="[
                        'block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                        isSelected(el) ? 'bg-gray-100 font-semibold' : ''
                    ]"
                >
                    {{ el.name ? el.name : el.sku ? el.sku : el }}
                    <span v-if="el.price" class="text-sm font-semibold">
                        - {{ formattedPrice(el.price) }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    variants: {
        type: Array,
        required: true,
    },
    selectedSku: {
        type: [Object, String, Number],
    },
    defaultName: {
        type: [String, Number],
        default: 'Select an option',
    },
    ariaLabel: {
        type: String,
        default: '',
    },
    className: {
        type: [String, Array],
        default: '',
    },
    buttonClass: {
        type: String,
        default: '',
    },
    parentClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['option-selected', 'change']);

const { $bus, $formatPrice } = useNuxtApp();
const uid = useId();

const isOpen = ref(false);
const suppressFocusAnnounce = ref(false);
const pendingFocusReturn = ref(false);
const localSelectedValue = ref(null);
let _focusFallbackTimer = null;

const triggerButton = ref(null);
const listbox = ref(null);

watch(() => props.selectedSku, () => {
    if (pendingFocusReturn.value) {
        pendingFocusReturn.value = false;
        localSelectedValue.value = null;
        clearTimeout(_focusFallbackTimer);
        nextTick(() => {
            triggerButton.value?.focus();
        });
    }
});

const selectedVariant = computed(() => props.variants.find(variant => variant.sku === props.selectedSku));
const currentValueLabel = computed(() => {
    const source = localSelectedValue.value || selectedVariant.value;
    if (source) {
        const name = source?.name || source?.sku || '';
        const price = source?.price ? ` - ${formattedPrice(source.price)}` : '';
        return `${name}${price}`;
    }
    return props.defaultName || 'none';
});

function toggle() {
    isOpen.value = !isOpen.value;
    const label = props.ariaLabel || 'Dropdown';
    if (isOpen.value) {
        nextTick(() => {
            const options = listbox.value?.querySelectorAll('button[role="option"]');
            if (options?.length) options[0].focus();
            $bus.emit('aria-announce', `${label} expanded`);
        });
    } else {
        $bus.emit('aria-announce', `${label} collapsed`);
    }
}
function onButtonFocus() {
    if (suppressFocusAnnounce.value) {
        suppressFocusAnnounce.value = false;
        return;
    }
    if (!isOpen.value) {
        const label = props.ariaLabel || '';
        $bus.emit(
            'aria-announce',
            `Press Enter or Spacebar to open${label ? ' ' + label + ' dropdown' : ''}.`
        );
    }
}
function onOptionFocus(el) {
    // Announce each option label as user tabs through the list
    const label = el?.name || el?.sku || el;
    const price = el?.price ? ` - ${formattedPrice(el.price)}` : '';
    $bus.emit(
        'aria-announce',
        `${label}${price}. Press Enter to select`
    );
}
function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
function selectOption(option) {
    emit('option-selected', option);
    emit('change', option);
    isOpen.value = false;
    localSelectedValue.value = option;
    suppressFocusAnnounce.value = true;
    pendingFocusReturn.value = true;

    const optionLabel = option?.name || option?.sku || option;
    const price = option?.price ? ` - ${formattedPrice(option.price)}` : '';
    $bus.emit('aria-announce', `${optionLabel}${price} selected`);

    // Fallback: return focus if parent doesn't update selectedSku within 3s
    _focusFallbackTimer = setTimeout(() => {
        if (pendingFocusReturn.value) {
            pendingFocusReturn.value = false;
            localSelectedValue.value = null;
            triggerButton.value?.focus();
        }
    }, 3000);
}
function closeDropdown() {
    isOpen.value = false;
    const label = props.ariaLabel || 'Dropdown';
    $bus.emit('aria-announce', `${label} closed`);
    nextTick(() => triggerButton.value?.focus());
}
function openByKey(reverse) {
    isOpen.value = true;
    const label = props.ariaLabel || 'Dropdown';
    nextTick(() => {
        const options = Array.from(listbox.value?.querySelectorAll('button[role="option"]') || []);
        if (!options.length) return;
        reverse ? options[options.length - 1].focus() : options[0].focus();
        $bus.emit('aria-announce', `${label} expanded. Press Arrow Down or Up to navigate.`);
    });
}
function trapFocus(reverse) {
    const options = Array.from(listbox.value?.querySelectorAll('button[role="option"]') || []);
    if (!options.length) return;
    const current = document.activeElement;
    const index = options.indexOf(current);
    if (reverse) {
        const prev = options[index - 1] || options[options.length - 1];
        prev?.focus();
    } else {
        const next = options[index + 1] || options[0];
        next?.focus();
    }
}
function onClickOutside() {
    isOpen.value = false;
}
function isSelected(el) {
    if (el?.sku) return el.sku === props.selectedSku;
    return el === props.selectedSku;
}
</script>