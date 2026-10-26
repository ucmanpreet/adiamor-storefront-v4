<template>
    <div :class="className ? className : defaultClass" role="img" aria-hidden="true">
        Sample Image</div>
</template>
<script setup>
const props = defineProps(['className']);

const defaultClass = computed(() => "absolute bottom-0 left-0 z-10 w-full p-1 text-center text-sm opacity-40 bg-[#D2D1D4]");
</script>