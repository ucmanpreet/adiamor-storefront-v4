<template>
    <FocusTrap :active="true" :initial-focus="() => $refs.lightboxRoot">
        <div class="fixed inset-0 z-[999] h-screen w-full flex items-center justify-center" role="dialog"
            aria-modal="true" aria-label="Product image preview" tabindex="-1" ref="lightboxRoot"
            @keydown.esc="closeModal">
            <div class="fixed inset-0 bg-black/40 touch-none xl:touch-auto" aria-hidden="true" @click="closeModal"
                @touch.stop></div>
            <div class="relative z-10 flex items-center justify-center touch-none" :class="modalClass || 'w-dvw xl:w-auto xl:h-dvh sm:p-12'">
                <button type="button" @click="closeModal" aria-label="Close image preview"
                    class="block bg-gray-600 absolute top-0 right-0 p-2 sm:p-3 z-10 sm:m-12 opacity-60 hover:opacity-100">
                    <Icon name="close" class="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                </button>
                <div title="count" class="bg-[#e3e3e3]/60 flex absolute bottom-0 m-12 inset-x-0 px-2 py-1" v-if="selectedImage?.flavor_text || images?.length > 1">
                    <div class="px-3 flex-1 capitalize text-center" v-if="selectedImage?.flavor_text">{{
                        selectedImage?.flavor_text }}</div>
                    <div class="px-3" v-if="images.length > 1">{{ index + 1 }} / {{ images.length }}</div>
                </div>
                <MediaImage :src="[selectedImage]" :alt="selectedImage?.type ?? selectedImage?.view"
                    :ratio="sampleImageContainerStyle" className="w-full sm:h-full" loading="lazy" />
                <div class="flex items-center justify-between absolute top-1/2 inset-x-0 -translate-y-1/2 z-0">
                    <!-- default: opacity-40 | Active: opacity-100 -->
                    <button type="button" @click="prevFunction" :class="index == 0 ? 'opacity-40' : 'opacity-100'"
                        v-show="showButton">
                        <!-- previous -->
                        <Icon name="arrow" class="w-8 h-8 text-white rotate-180" />
                    </button>
                    <button type="button" @click="nextFunction"
                        :class="index == images.length - 1 ? 'opacity-40' : 'opacity-100'" v-show="showButton">
                        <!-- next -->
                        <Icon name="arrow" class="w-8 h-8 text-white" />
                    </button>
                </div>
            </div>
        </div>
    </FocusTrap>
</template>
<script>
import Icon from '~/components/common/Icon.vue';
import MediaImage from '~/components/common/MediaImage.vue';
import { FocusTrap } from 'focus-trap-vue';

export default {
    name: 'ImagePreviewComponent',
    components: { Icon, MediaImage, FocusTrap },
    props: {
        images: {
            type: [String, Array],
            required: true,
        },
        sampleImageContainerStyle: {
            type: Object,
            default: null
        },
        modalClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            index: 0,
            selectedImage: null,
        };
    },
    watch: {
        index() {
            this.selectedImage = this.images[this.index];
        },
    },
    mounted() {
        this.selectedImage = this.images[this.index];
        this.$nextTick(() => this.$refs.lightboxRoot?.focus());
    },
    computed: {
        showButton() {
            return this.images.length > 1;
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        prevFunction() {
            if (this.index > 0) {
                this.index--;
            }
        },
        nextFunction() {
            if (this.index < this.images.length - 1) {
                this.index++;
            }
        }
    },
};
</script>