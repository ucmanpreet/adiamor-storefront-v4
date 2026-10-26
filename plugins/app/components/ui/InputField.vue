<!-- File: BaseInput.vue -->
<template>
    <div class="space-y-1">
        <!-- Label -->
        <label
            v-if="label"
            :for="inputId"
            class="block text-sm font-medium text-gray-700"
        >
            {{ label }}
            <span
                v-if="rules.includes('required')"
                class="ml-0.5 text-red-500"
                aria-hidden="true"
            >*</span>
        </label>

        <!-- Input Field -->
        <input
            :id="inputId"
            :type="type"
            v-validate="rules"
            :ref="refProp ? refProp : name"
            :name="name"
            v-model="inputValue"
            :placeholder="placeholder"
            :class="[
                'peer border p-3 w-full',
                error ? 'border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-1' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                disabled ? 'bg-gray-100 cursor-not-allowed' : '',
                inputClass,
                mobileClass
            ]"
            :disabled="disabled"
            :aria-invalid="error ? 'true' : undefined"
            :aria-describedby="error ? `${inputId}-error` : undefined"
            :aria-label="!label ? name : null"
            :autocomplete="autocomplete"
            :maxlength="maxlength"
            :step="type === 'number' ? 0.000001 : undefined"
            :min="min ? min : null"
            :max="max ? max : null"
            :inputmode="inputMode"
            @input="handleInput"
            @keypress="validateKeyPress"
            @blur="$emit('blur')"
            @focus="$emit('focusEvent')"
            @keydown.enter="handleEnter"
        />
        <p
            v-if="error"
            :id="`${inputId}-error`"
            role="alert"
            class="text-red-600 text-xs mt-1"
        >{{ error }}</p>
    </div>
</template>

<script>
export default {
    name : 'InputField',
    inheritAttrs: false,  // Prevent attributes from being automatically inherited by the root element (div)
    // v-model contract (Vue 3): `modelValue` / `update:modelValue`; `input` is still emitted for existing `@input` listeners,
    // and `value` is kept for callers that bind `:value`.
    emits: ['update:modelValue', 'input', 'blur', 'focusEvent', 'redirect', 'enter'],
    props: {
        modelValue: {
            type: [String, Number],
            default: undefined,
        },
        value: {
            type: [String, Number],
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        error: {
            type: [String, Boolean],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        rules: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        inputClass: {
            type: [String, Array],
            default: '',
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
        refProp: {
            type: String,
            default: '',
        },
        maxlength: {
            type: [Number, String],
            default: '',
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
        inputMode: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            inputValue: this.modelValue !== undefined ? this.modelValue : this.value,
        };
    },
    computed: {
        inputId() {
            if (this.name === "search") return 'input_field';
            if(this.id) return this.id;
            return this.label
                ? this.label.toLowerCase().replace(/\s+/g, '_')
                : `input_${this.uid}`;
        },
        mobileClass() {
            return this.$isMobile ? 'text-base' : 'text-sm';
        }
    },
    watch: {
        value(newValue) {
            this.inputValue = newValue;
        },
        modelValue(newValue) {
            this.inputValue = newValue;
        },
    },
    methods: {
        formatMessage(message) {
            return message?.replace(/([a-z])([A-Z])/g, '$1 $2')?.replace(/-/g, ' ')?.toLowerCase();
        },
        handleInput(event) {
            let value = event.target.value;
            if (this.name === 'phone') {
                const cleaned = ('' + value).replace(/\D/g, '');
                const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
                if (match) {
                    value = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
                } else if (cleaned.length > 10) {
                    const match2 = cleaned.slice(0, 10).match(/^(\d{3})(\d{3})(\d{4})$/);
                    if (match2) {
                        value = `(${match2[1]}) ${match2[2]}-${match2[3]}`;
                    }
                }
                this.inputValue = value;
                event.target.value = value;
            }
            this.$emit('input', value);
            this.$emit('update:modelValue', value);
        },
        validateKeyPress(event) {
            const charCode = event.keyCode;

            if (this.name === 'search' && charCode === 13) {
                this.$emit('redirect');
                return;
            }

            if (this.type === 'number' && this.min && this.max) {
                let value = event.target.value;

                if (event.key === '.') return;

                const futureValue = parseFloat(value) + parseInt(event.key);

                const min = Number(event.target.min);
                const max = Number(event.target.max);

                if (value?.includes('.')) {
                    const decimals = value?.split('.')[1];
                    if (decimals?.length >= 2) {
                        event.preventDefault();
                    }
                }

                if (Number(futureValue) < min || Number(futureValue) > max) {
                    event.preventDefault();
                }
            }

            if (this.name !== 'phone') return;

            const allowed = [32, 40, 41, 45]; // space, (, ), -
            if ((charCode < 48 || charCode > 57) && !allowed.includes(charCode)) {
                event.preventDefault();
            }
        },
        handleEnter(event) {
            event.preventDefault();
            this.$emit('enter', this.inputValue);
        },
    }
};
</script>

<style>
input::-webkit-input-placeholder {
    @apply !text-sm;
}

input:-moz-placeholder {
    @apply !text-sm;
}

input::-moz-placeholder {
    @apply !text-sm;
}

input:-ms-input-placeholder {
    @apply !text-sm;
}

input::placeholder {
    @apply !text-sm;
}
</style>