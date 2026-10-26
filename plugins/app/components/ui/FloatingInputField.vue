<template>
    <div class="relative">
        <input :id="inputId" :type="type" :name="name" :value="modelValue !== undefined ? modelValue : value" placeholder=" " :disabled="disabled"
            :autocomplete="autocomplete" :class="[
                'peer block w-full pt-2 pb-1 px-0 bg-transparent border-0 border-b-2 focus:outline-none',
                error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-100 focus:border-primary',
                disabled ? 'bg-gray-100 cursor-not-allowed' : '',
                inputClass
            ]" @input="$emit('input', $event.target.value); $emit('update:modelValue', $event.target.value)" @blur="$emit('blur')" @focus="$emit('focus')" />

        <label :for="inputId" class="absolute left-0 pointer-events-none text-gray-500
           top-1/2 -translate-y-1/2 transition-all duration-200
           peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary
           peer-[&:not(:placeholder-shown)]:top-0
           peer-[&:not(:placeholder-shown)]:text-xs">
            {{ label }}

            <span v-if="required" class="text-red-500">
                *
            </span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'FloatingInputField',

    emits: ['update:modelValue', 'input', 'blur', 'focus'],
    props: {
        modelValue: {
            type: [String, Number],
            default: undefined
        },
        value: {
            type: [String, Number],
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        error: {
            type: [String, Boolean],
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        inputClass: {
            type: [String, Array],
            default: ''
        },
        id: {
            type: String,
            default: ''
        }
    },

    computed: {
        inputId() {
            return this.id || this.name;
        }
    }
};
</script>