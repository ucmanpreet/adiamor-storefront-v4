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

<script>
export default {
    name: "AddressAutoComplete",
    props: {
        // addressRef: { type: String, required: true },
        submitted: { type: Boolean, default: false },
        isDisabled: { type: Boolean, default: false },
        autoAttr: { type: String, default: "off" },
        address: { type: Object, default: () => ({}) },
        loader: { type: Boolean, default: false },
        id: { type: String, default: '' },
    },
    data() {
        return {
            isFocused: false,
            autoComplete: null,
        };
    },
    computed: {
        autocompleteStyle() {
            // Disabled State
            if (this.isDisabled) {
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
            return this.submitted && !this.address.address1
                ? { backgroundColor: '#fff', color: '#000', borderRadius: '8px', border: '1px solid red',  fontSize: '.875rem', lineHeight: '1.25rem' }
                : { backgroundColor: '#fff', color: '#000', borderRadius: '8px', border: '1px solid rgb(229 231 235 / 1)', fontSize: '.875rem', lineHeight: '1.25rem' };
        },
        labelClasses() {
        return this.isFocused || this.address?.address1 ? ['top-2', '-translate-y-0', 'text-[11px]'] : ['top-1/2', '-translate-y-1/2'];
      },  },
    async mounted() {
        // if (typeof google !== 'undefined') {
        //     await this.initAutocomplete()
        // } else {
        //     const interval = setInterval(() => {
        //         if (typeof google !== 'undefined') {
        //             clearInterval(interval)
        //             this.initAutocomplete()
        //         }
        //     }, 100);
        // }
            const waitForGoogle = setInterval(() => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    clearInterval(waitForGoogle);
                    this.initAutocomplete();
                }
            }, 100);
    },
    watch: {
        'address.address1' : function (newVal) {
            if (newVal && this.$refs.addressInput) {
                this.$refs.addressInput.value = newVal
            }
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value);
        },
        async initAutocomplete() {
            const input = this.$refs.addressInput;
            if (!input) return;

            this.autoComplete = new google.maps.places.Autocomplete(input, {
                types: ["geocode"],
            });

            this.autoComplete.setFields([
                "address_components",
                "geometry",
                "formatted_address",
            ]);

            this.autoComplete.addListener("place_changed", () => {
                const place = this.autoComplete.getPlace();
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

                this.$emit('updateAddress', googleAddress);

                input.value = googleAddress.address1;
            });
        },
        // async initAutocompleteGMP() {
        //     this.autoComplete = this.$refs[this.addressRef];
        //     if (!this.autoComplete) return;

        //     // Initialize input value
        //     this.autoComplete.value = this.address.address1 || '';            

        //     // Event: Place selected
        //     this.autoComplete.addEventListener('gmp-select', async ({ placePrediction }) => {
        //         const place = placePrediction.toPlace();
        //         await place.fetchFields({
        //             fields: ["displayName", "formattedAddress", "location", "addressComponents"],
        //         });

        //         const getComponent = (place, type, short = false) => {
        //             const comp = place.addressComponents?.find(c => c.types.includes(type));
        //             return comp ? (short ? comp.shortText : comp.longText) : '';
        //         };

        //         const googleAddress = {
        //             address1: [
        //                 getComponent(place, 'street_number'),
        //                 getComponent(place, 'route')
        //             ].filter(Boolean).join(' '),
        //             city: getComponent(place, 'locality') || getComponent(place, 'administrative_area_level_3'),
        //             state: getComponent(place, 'administrative_area_level_1', true),
        //             postcode: getComponent(place, 'postal_code'),
        //             country: getComponent(place, 'country', true),
        //         };

        //         // Emit to parent
        //         this.$emit('updateAddress', googleAddress);

        //         // Update input manually
        //         this.autoComplete.value = googleAddress.address1;
        //     });

        //     // Event: this.autoComplete error
        //     this.autoComplete.addEventListener('gmp-error', ({ error }) => {
        //         console.error('this.autoComplete error:', error);
        //     });

        //     this.autoComplete.addEventListener('input', () => {
        //         setTimeout(() => {
        //             this.$emit('input', this.autoComplete.value);
        //         }, 100);
        //     });
        // },

        onFocus() {
            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;
            if(this.submitted && !this.address?.address1) {
                this.$bus.emit('aria-announce', 'Address required');
            }
        },
    },
};
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