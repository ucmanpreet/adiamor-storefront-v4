<template>
    <div class="relative w-full h-full">
        <!-- Initial Video Display -->
        <div class="absolute inset-0 overflow-hidden flex justify-center items-baseline cursor-pointer" v-if="!showModal" @click="handleVideoClick" role="button"
         tabindex="0"  @keydown.enter.prevent="handleVideoClick" :aria-label="getFlavourText || `Play video for item #${item?.sku}`">
            <div class="absolute inset-0 bg-black/5 flex items-center justify-center z-20 group-light" :class="renderDelay ? '' : 'hidden'">
              <CustomLoader />
            </div>
            <div class="aspect-square h-full w-full flex items-center" aria-hidden="true">
                <video :src="getVideoSrc" :poster="poster"  autoplay muted loop playsinline class="w-full h-full object-cover object-center" @loadeddata="renderDelay = false"></video>
                <div class="absolute inset-x-0 bottom-0 flex justify-center items-center" v-if="getFlavourText">
                    {{  getFlavourText }}
                </div>
            </div>
        </div>

        <!-- Modal for Desktop -->
        <Modal v-if="showModal && !isMobile" maxWidthClass="max-w-5xl"
            :heading="getFlavourText || `Item #: ${item?.sku}`" @close="closeModal" role="dialog" aria-modal="true">
            <div class="relative w-full h-full">
                <video :src="getVideoSrc"  :poster="poster" controls autoplay playsinline class="w-full max-h-[80vh] bg-black" :aria-label="getFlavourText || `Video for ${item?.name}`" :title="getFlavourText || `Video for ${item?.name}`"></video>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import CustomLoader from '~/components/ui/CustomLoader.vue';
import Modal from '~/components/ui/Modal.vue';

const props = defineProps(['videoSrcs', 'item', 'poster']);

const isMobile = ref(false);
const showModal = ref(false);
const renderDelay = ref(true);

const getVideoSrc = computed(() => {
    let src = props.videoSrcs;
    if (Array.isArray(src) && src.length) src = src[0];
    return src?.path || src?.url || src || '';
});

const getFlavourText = computed(() => {
    let src = props.videoSrcs;
    if (Array.isArray(src) && src.length) src = src[0];
    return src?.flavour_text;
});

onMounted(() => {
    isMobile.value = window.innerWidth <= 768;
});

function handleVideoClick() {
    if (isMobile.value) {
        window.open(getVideoSrc.value, '_blank');
    } else {
        showModal.value = true;
    }
}

function closeModal() {
    showModal.value = false;
}
</script>