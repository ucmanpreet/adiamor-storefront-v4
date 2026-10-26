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

<script>
import CustomLoader from '~/components/ui/CustomLoader.vue';
import Modal from '~/components/ui/Modal.vue';

export default {
    name: 'VideoViewer',
    components: { CustomLoader, Modal },
    props: ['videoSrcs', 'item', 'poster'],
    data() {
        return {
            isMobile: false,
            showModal: false,
            renderDelay: true
        };
    },
    computed: {
        getVideoSrc() {
            let src = this.videoSrcs;
            if (Array.isArray(src) && src.length) src = src[0];
            return src?.path || src?.url || src || '';
        },
        getFlavourText() {
            let src = this.videoSrcs;
            if (Array.isArray(src) && src.length) src = src[0];
            return src?.flavour_text;
        }
    },
    mounted() {
        this.isMobile = window.innerWidth <= 768;
    },
    methods: {
        handleVideoClick() {
            if (this.isMobile) {
                window.open(this.getVideoSrc, '_blank');
            } else {
                this.showModal = true;
            }
        },
        closeModal() {
            this.showModal = false;
        }
    }
};
</script>