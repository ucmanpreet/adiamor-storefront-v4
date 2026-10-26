<template>
    <button
        :class="[
             'flex items-center justify-center px-4 py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-offset-2',
            colorType === 'primary' ? 'bg-primary text-white hover:bg-primary/90 focus:ring-primary border border-primary font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'secondary' ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'black' ? 'bg-black border-black text-white hover:bg-black/90 focus:ring-black font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'transparent' ? 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'danger' ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500' : '',
            colorType === 'bordered-primary' ? 'border border-primary text-primary hover:border-primary/50 hover:bg-primary/5 focus:text-primary hover:text-primary focus:bg-primary/5 focus:border-primary/50 focus:ring-primary font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'bordered-white' ? 'border border-gray-200 text-gray-black bg-white hover:bg-gray-50 focus:bg-gray-50 focus:ring-gray-50 font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'bordered-secondary' ? 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'bordered-primary-fill' ? 'bg-primary/5 border border-primary text-primary hover:border-primary/50 focus:border-primary/50 focus:ring-primary font-gill-sans tracking-[0.125rem] uppercase' : '',
            colorType === 'bordered-danger' ? 'border border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500 hover:border-red-500 focus:bg-red-500 focus:border-red-500' : '',
            colorType === 'link' ? 'text-left !justify-start !px-0' : '',
            disabled ? 'cursor-not-allowed opacity-50' : '',
        ]"
        :disabled="disabled"
        :aria-disabled="disabled ? 'true' : null"
        @click="emit('click')"
        @focus="emit('focus', $event)"
        @mouseover="emit('mouseover')"
        @mouseleave="emit('mouseleave')"
    >
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    colorType: {
        type: String,
        default: 'primary',
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(['click', 'focus', 'mouseover', 'mouseleave']);
</script>

