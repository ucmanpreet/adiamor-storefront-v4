<!-- File: AppButtonLink.vue -->
<template>
    <!-- Disabled State (NuxtLink cannot be disabled) -->
    <span
        v-if="href && disabled"
        class="inline-flex items-center justify-center text-xs sm:text-sm font-normal px-8 py-2 cursor-not-allowed opacity-50"
        :class="colorClasses"
        aria-disabled="true"
        role="link"
        tabindex="-1"
    >
        <slot></slot>
    </span>

    <!-- Active Link -->
    <NuxtLink
        v-else-if="href"
        :to="href"
        class="inline-flex items-center justify-center text-xs sm:text-sm font-normal px-8 py-2
               focus:ring-2 focus:ring-offset-1 focus:ring-primary"
        :class="colorClasses"
        :aria-label="ariaLabel || null"
    >
        <slot></slot>
    </NuxtLink>
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
    },
    href: {
        type: String,
        default: '',
    },
    ariaLabel: {
        type: String,
        default: '',
    }
});

const colorClasses = computed(() => [
    props.colorType === 'primary' ? 'bg-primary text-white hover:bg-primary/90 focus:ring-primary' : '',
    props.colorType === 'secondary' ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary' : '',
    props.colorType === 'danger' ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500' : '',
    props.colorType === 'dark' ? 'bg-black/80 text-white hover:bg-black/90 focus:ring-black/90' : '',
    props.colorType === 'bordered-primary' ? 'border border-primary text-primary hover:bg-primary/5 focus:ring-primary' : '',
    props.colorType === 'bordered-secondary' ? 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary' : '',
    props.colorType === 'bordered-primary-fill' ? 'bg-primary/5 border border-primary text-primary hover:bg-primary/50 focus:ring-primary' : '',
    props.colorType === 'bordered-danger' ? 'border border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500' : '',
    props.colorType === 'link' ? 'text-left !justify-start !px-0' : '',
]);
</script>