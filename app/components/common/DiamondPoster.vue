<template>
    <figure class="aspect-square overflow-hidden relative border border-gray-200 v-slider-settings flex items-center justify-center" :style="{backgroundColor: bgColor}">
        <MediaImage
            :src="poster"
            :ratio="isSampleImage(poster) ? ratio : {}"
            :parentClass="`flex items-cennter justify-center !h-auto`"
            :className="!isSampleImage(poster) ? 'object-contain h-full w-full' : 'w-full h-full'"
            :style="padding ? { padding: padding + 'px' } : {}"
            :alt="altName || 'diamond product image'"
            decoding="async" loading="lazy" aria-hidden="true"/>

        <!-- Sample Badge -->
        <SampleImage v-if="isSampleImage(poster)" aria-hidden="true"/>

        <!-- Screen-reader-only sample notice -->
        <span
            v-if="isSampleImage(poster)"
            class="sr-only"
        >
            This is a sample image.
        </span>
    </figure>
</template>
<script setup>
import SampleImage from '~/components/product/SampleImage.vue';
import { extractDominantColor } from '~/utils/universalHelper';
import MediaImage from '~/components/common/MediaImage.vue';

const props = defineProps(['altName', 'poster', 'ratio', 'padding']);

const config = useRuntimeConfig().public;

const bgColor = ref('#ffffff');

watch(() => props.poster, (newVal) => {
    if (newVal) extractColor();
});

onMounted(() => {
    if (props.poster) extractColor();
});

function isSampleImage(image) {
    return typeof image === 'string' && image?.includes('sample') && image?.includes(config.cdnPrefix);
}
async function extractColor() {
    if (!props.poster) return;
    bgColor.value = await extractDominantColor(props.poster);
}
</script>