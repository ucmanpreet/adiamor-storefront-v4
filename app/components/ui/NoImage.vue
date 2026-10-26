<template>
    <!-- Decorative placeholder icon -->
    <Icon
        name="no-image"
        class="w-full h-full"
        aria-hidden="true"
        focusable="false"
    />
</template>

<script setup>
import Icon from "~/components/common/Icon.vue";

defineProps({
    className: {
        type: [String, Array],
        default: ''
    }
});
</script>