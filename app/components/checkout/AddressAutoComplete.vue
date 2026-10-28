<template>
    <client-only>
        <div class="mt-1 relative group" :class="{ 'pointer-events-none cursor-not-allowed': isDisabled }">

            <!-- ✅ GMP removed, normal input -->
            <input
                ref="addressInput"
                :id="id"
                :value="address?.address1"
                type="text"
                placeholder=" "
                :autocomplete="autoAttr"
                :aria-required="true"
                :aria-invalid="submitted && !address?.address1 ? 'true' : 'false'"
                :disabled="isDisabled"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput"
                class="peer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary w-full px-4 pt-6 pb-2"
                :style="autocompleteStyle"
                style=""
            />

            <!-- Accessible Label (unchanged) -->
            <label :for="id"
                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute left-2 px-2 transition-all pointer-events-none peer-[&:not(:placeholder-shown)]:text-[11px] peer-focus:text-[11px]"
                :class="labelClasses">
                Address
                <span class="sr-only"> (required)</span>
            </label>

        </div>
    </client-only>
</template>

<script setup>
import { loadScript } from '~/utils/loadScript.js';
const props = defineProps({
    submitted: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    autoAttr: { type: String, default: "off" },
    address: { type: Object, default: () => ({}) },
    loader: { type: Boolean, default: false },
    id: { type: String, default: '' },
});
const emit = defineEmits(['input', 'updateAddress']);
const { $bus } = useNuxtApp();

const addressInput = ref(null);
const isFocused = ref(false);
const autoComplete = ref(null);

const autocompleteStyle = computed(() => {
    // Disabled State
    if (props.isDisabled) {
        return {
            backgroundColor: 'rgb(249 250 251 / 1)',
            color: '#000',
            borderRadius: '8px',
            border: '1px solid rgb(229 231 235 / 1)',
            cursor: 'not-allowed',
            fontSize: '.875rem',
            lineHeight: '1.25rem'
        };
    }
    return props.submitted && !props.address.address1
        ? { backgroundColor: '#fff', color: '#000', borderRadius: '8px', border: '1px solid red',  fontSize: '.875rem', lineHeight: '1.25rem' }
        : { backgroundColor: '#fff', color: '#000', borderRadius: '8px', border: '1px solid rgb(229 231 235 / 1)', fontSize: '.875rem', lineHeight: '1.25rem' };
});
const labelClasses = computed(() => isFocused.value || props.address?.address1 ? ['top-2', '-translate-y-0', 'text-[11px]'] : ['top-1/2', '-translate-y-1/2']);

onMounted(() => {
    const config = useRuntimeConfig().public;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&libraries=places`).catch(() => {});
    const waitForGoogle = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
            clearInterval(waitForGoogle);
            initAutocomplete();
        }
    }, 100);
});

watch(() => props.address.address1, (newVal) => {
    if (newVal && addressInput.value) {
        addressInput.value.value = newVal
    }
});

function onInput(e) {
    emit('input', e.target.value);
}
async function initAutocomplete() {
    const input = addressInput.value;
    if (!input) return;

    autoComplete.value = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
    });

    autoComplete.value.setFields([
        "address_components",
        "geometry",
        "formatted_address",
    ]);

    autoComplete.value.addListener("place_changed", () => {
        const place = autoComplete.value.getPlace();
        if (!place.geometry) return;

        const getComponent = (type, short = false) => {
            const comp = place.address_components?.find(c =>
                c.types.includes(type)
            );
            return comp ? (short ? comp.short_name : comp.long_name) : '';
        };

        const googleAddress = {
            address1: [
                getComponent('street_number'),
                getComponent('route')
            ].filter(Boolean).join(' '),
            city: getComponent('locality') || getComponent('administrative_area_level_3'),
            state: getComponent('administrative_area_level_1', true),
            postcode: getComponent('postal_code'),
            country: getComponent('country', true),
        };

        emit('updateAddress', googleAddress);

        input.value = googleAddress.address1;
    });
}
function onFocus() {
    isFocused.value = true;
}
function onBlur() {
    isFocused.value = false;
    if (props.submitted && !props.address?.address1) {
        $bus.emit('aria-announce', 'Address required');
    }
}
</script>

<!-- <style>
gmp-place-autocomplete::part(input):focus {
    outline: none !important;
    box-shadow: none !important;
}

gmp-place-autocomplete::part(prediction-list) {
    background-color: #fff !important;
}

gmp-place-autocomplete::part(prediction-item-main-text) {
    color: #333 !important;
}

gmp-place-autocomplete::part(prediction-item-match) {
    font-weight: bold !important;
    color: #000 !important;
}

gmp-place-autocomplete::part(prediction-item):hover {
    background-color: rgb(243 244 246) !important;
}

gmp-place-autocomplete::part(input):focus {
    outline: none !important;
    box-shadow: none !important;
}
</style> -->