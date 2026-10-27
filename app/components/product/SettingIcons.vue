<template>
    <div>
        <div class="flex flex-col items-center justify-center gap-1 text-xxs lg:text-xs overflow-hidden uppercase"
            v-if="imgData?.[0]?.path?.includes('mp4')" role="img" aria-label="360-degree video preview">
            <Icon name="video" class="size-4" aria-hidden="true"/>
            <span>
                360&deg; <span class="hidden sm:inline-block">video</span>
            </span>
        </div>
        <ImagePreview v-else :image="imgData" ref="viewerPurchasePreview" :key="imgData.length"
            className="border border-gray-200" :hidePreview="true" />
        <span v-if="imgData.length > 1" aria-hidden="true"
            class="bg-white border border-gray-300 sm:border-0 sm:bg-black/50 sm:text-white font-medium rounded-full sm:rounded-none text-xs absolute top-0 sm:top-auto sm:bottom-0 right-0 text-center px-1 py-0.5 sm:py-1 m-0.5 sm:m-1 capitalize z-10">
            +{{ imgData.length }}</span>
    </div>
</template>
<script setup>
import Icon from "~/components/common/Icon.vue";
import ImagePreview from "~/components/product/ImagePreview.vue";

const props = defineProps(['imgData']);
</script>