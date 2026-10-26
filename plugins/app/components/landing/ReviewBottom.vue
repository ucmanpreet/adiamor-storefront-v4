<template>
    <div class="custom-slide-css">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name : 'ReviewBottom'
}
</script>
<style>
.yotpo-shoppers-say .shoppers-say-title {
    @apply !font-gill-sans tracking-wider uppercase !font-normal
}

.carousel-display-wrapper {
    display: none !important;
}

.custom-slide-css .glide__slide {
    @apply !mb-0 !mt-3
}
</style>
