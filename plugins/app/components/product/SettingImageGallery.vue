<template>
    <div class="flex-1 relative w-full mx-auto">
        <div class="aspect-square w-full relative lg:min-h-[38.813rem]" v-if="checkSingleImage"
        @click="checkGLBExistence()">
            <div class="absolute right-0 ml-auto mt-3 mr-3 z-30 top-0 sm:hidden">
                <Heart :item="product" :selectedVariant="selectedVariant" @click="active = !active" :size="`w-5 h-5`" :key="selectedVariant?.sku || product.sku"
                    />
                <span class="sr-only hidden sm:block">Add to Favorites</span>
            </div>
            <CompleteLookBanner />
            <button v-if="getDataByPosition('glb', true)"
                class="absolute right-0 top-0 m-3 shadow-md bg-white rounded-full z-30 flex items-center space-x-2">
                <span v-show="showViewText" class="pl-3">360 View</span>
                <span @mouseover="showViewText = true" @mouseleave="showViewText = false">
                    <Icon name="three-sixty" class="w-6 h-6" />
                </span>
            </button>
            <div id="tabs-2-panel-1" class="h-full w-full" aria-labelledby="tabs-2-tab-1" role="tabpanel" tabindex="0">
                <ImagePreview :image="getDataByPosition('front')" ref="viewerFront" :altLabel="`${product?.name ? product.name + ' ' : ''}Front view`" :key="getDynamicKey('front')" />
            </div>
        </div>
        <div class="mx-auto w-full" v-else-if="galleryReady && mainImage">
            <div class="flex flex-col md:flex-row lg:flex-col gap-3 sm:gap-6">
                <div @click="checkGLBExistence()"
                    class="relative flex aspect-square cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 flex-1">
                    <div class="absolute right-0 ml-auto mt-3 mr-3 z-30 top-0 sm:hidden">
                        <Heart :item="product" :selectedVariant="selectedVariant" @click="active = !active" :size="`w-5 h-5`" :key="selectedVariant?.sku || product.sku"
                            />
                        <span class="sr-only hidden sm:block">Add to Favorites</span>
                    </div>
                    <!--Complete look Banner-->
                    <CompleteLookBanner />

                    <!-- full screen icon -->
                    <button v-if="getDataByPosition('glb', true)"
                        class="absolute right-0 top-0 m-3 shadow-md bg-white rounded-full z-30 flex items-center space-x-2">
                        <span v-show="showViewText" class="pl-3">360 View</span>
                        <span @mouseover="showViewText = true" @mouseleave="showViewText = false">
                            <Icon name="three-sixty" class="w-6 h-6" />
                        </span>
                    </button>

                    <!-- Tab panel, show/hide based on tab state. -->
                    <div
                        :id="`panel-main-${product?.sku}`"
                        class="h-full w-full relative group"
                        @touchstart="handleTouchStart"
                        @touchend="handleTouchEnd"
                        :class="{'big-ring-gradient border border-gray-200': !isVideoType && validType}"
                        :aria-labelledby="`tab-front-${product?.sku}`"
                        role="tabpanel"
                        :key="mainImageKey"
                    >
                        <button class="text-black absolute bg-white p-2 rounded-full z-10 sm:ml-[17px] top-1/2 sm:-translate-x-full -translate-y-1/2 sm:hidden border border-gray-500 group-hover:text-gray-500 group-hover:block" @click="prevImg" v-if="getArrLength > 1 && selectedIndex > 0">
                            <Icon name="arrow" class="w-3 h-3 sm:w-4 sm:h-4 rotate-180 text-current" />
                        </button>
                        <transition :name="transitionDirection === 'right' ? 'fade-right' : 'fade-left'" mode="out-in">
                            <component
                                :is="isVideoType ? 'ImageVideo' : 'ImagePreview'"
                                :key="isVideoType ? getDynamicKey('mp4') : selectedIndex"
                                v-bind="isVideoType
                                ? { videoSrcs: getImageData, item: product  }
                                : { image: getImageData, ref: 'viewerFrontMain', hidePreview: false, badge: true, altLabel: getImageData?.view ? `${product?.name} ${getImageData?.view} preview product image.` : 'View product image' }"
                            />
                        </transition>
                        <button class="text-black absolute bg-white p-2 rounded-full z-10 sm:mr-[17px] top-1/2 sm:translate-x-full -translate-y-1/2 sm:hidden border border-gray-500 group-hover:text-gray-500 group-hover:block right-0" @click="nextImg" v-if="getArrLength > 1 && selectedIndex < getArrLength - 1">
                            <Icon name="arrow" class="w-3 h-3 sm:w-4 sm:h-4 text-current" />
                        </button>
                    </div>
                </div>

                <!-- Product tab views -->
                <div class="flex flex-row md:flex-col lg:flex-row flex-wrap justify-center gap-1.5 sm:gap-3" role="tablist" aria-label="Product image views"
                    aria-orientation="horizontal" aria-describedby="tab-instructions" @keydown="handleTabKeydown">
                    <p id="tab-instructions" class="sr-only hidden sm:block">
                        Use left and right arrow keys to navigate between product image tabs.
                    </p>
                    <button :id="`tab-front-${product?.sku}`"
                        v-if="getDataByPosition('front')"
                        @click="callImagePreviwer(getDataByPosition('front'), 'front')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 col-span-full"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'front' ? 'true' : 'false'"
                        :tabindex="activeTab === 'front' ? 0 : -1"
                        aria-label="Front view"
                        role="tab"
                        type="button"
                    >
                        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <ImagePreview :image="getDataByPosition('front')" ref="viewerfront" altLabel=""
                                :key="getDynamicKey('front')" className="border border-gray-200" :hidePreview="true"/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'front' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-side-${product?.sku}`"
                        v-if="getDataByPosition('side')"
                        @click="callImagePreviwer(getDataByPosition('side'), 'side')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 col-span-full"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'side' ? 'true' : 'false'"
                        :tabindex="activeTab === 'side' ? 0 : -1"
                        aria-label="Side view"
                        role="tab"
                        type="button"
                    >
                        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <ImagePreview :image="getDataByPosition('side')" ref="viewerSide" altLabel=""
                                :key="getDynamicKey('side')" className="border border-gray-200" :hidePreview="true"/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'side' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-flat-${product?.sku}`"
                        v-if="getDataByPosition('flat')"
                        @click="callImagePreviwer(getDataByPosition('flat'), 'flat')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'flat' ? 'true' : 'false'"
                        :tabindex="activeTab === 'flat' ? 0 : -1"
                        aria-label="Product in hand view"
                        role="tab"
                        type="button"
                    >
                        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <ImagePreview :image="getDataByPosition('flat')" ref="viewerFlat" altLabel=""
                                :key="getDynamicKey('flat')" className="border border-gray-200" :hidePreview="true"/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'flat' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-video-${product?.sku}`"
                        v-if="videoArr?.length"
                        @click="callImagePreviwer(videoArr, 'video')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-gray-100 text-xs sm:text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4 col-span-full border border-gray-200"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'video' ? 'true' : 'false'"
                        :tabindex="activeTab === 'video' ? 0 : -1"
                        :aria-label="videoArr.length > 1 ? `360° video view, ${videoArr.length} videos` : '360° video view'"
                        role="tab"
                        type="button"
                    >
                        <div class="flex flex-col items-center justify-center gap-1 text-xxs lg:text-xs overflow-hidden" aria-hidden="true">
                            <Icon name="video" class="size-4"/>
                            <span>360&deg; <span class="hidden sm:inline-block">video</span></span>
                        </div>
                        <span v-if="videoArr.length > 1" aria-hidden="true" class="bg-black/50 text-white font-medium text-xs absolute top-0 right-0 py-1 px-1 sm:py-0.5 m-0 sm:m-1 capitalize">
                            +{{ videoArr.length }}
                        </span>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'video' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-purchase-${product?.sku}`"
                        v-if="purchasePreviewArr && purchasePreviewArr.length"
                        @click="callImagePreviwer(purchasePreviewArr, 'purchase')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'purchase' ? 'true' : 'false'"
                        :tabindex="activeTab === 'purchase' ? 0 : -1"
                        role="tab"
                        type="button"
                        :key="`${selectedVariant?.sku ?? product?.sku}_purchase`"
                        aria-label="Purchase view"
                    >
                        <div aria-hidden="true" class="absolute inset-0 overflow-hidden"><SettingIcons :imgData="purchasePreviewArr"/></div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'purchase' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-hand-${product?.sku}`"
                        v-if="handPreviewArr && handPreviewArr.length"
                        @click="callImagePreviwer(handPreviewArr, 'hand')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'hand' ? 'true' : 'false'"
                        :tabindex="activeTab === 'hand' ? 0 : -1"
                        role="tab"
                        type="button"
                        :key="`${selectedVariant?.sku ?? product?.sku}_hand`"
                        aria-label="On hand view"
                    >
                        <div aria-hidden="true" class="absolute inset-0 overflow-hidden"><SettingIcons :imgData="handPreviewArr"/></div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'hand' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <button
                        :id="`tab-lifestyle-${product?.sku}`"
                        v-if="lifestylePreviewArr && lifestylePreviewArr.length"
                        @click="callImagePreviwer(lifestylePreviewArr, 'lifestyle')"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'lifestyle' ? 'true' : 'false'"
                        :tabindex="activeTab === 'lifestyle' ? 0 : -1"
                        role="tab"
                        type="button"
                        :key="`${selectedVariant?.sku ?? product?.sku}_lifestyle`"
                        aria-label="Lifestyle view"
                    >
                        <div aria-hidden="true" class="absolute inset-0 overflow-hidden"><SettingIcons :imgData="lifestylePreviewArr"/></div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'lifestyle' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                    </button>

                    <div v-if="checkProductFamily && product"
                        role="presentation"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-xs hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4">
                        <Slider :isCaratSlider="checkSliderShow" :product="product" />
                    </div>

                    <button :id="`tab-socialMedia-${product?.sku}`" v-show="dataImages && dataImages > 0" @click="scrollToMedia"
                        class="relative flex aspect-square size-12 sm:size-[70px] xl:size-24 cursor-pointer items-center justify-center bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-0 sm:focus:ring-offset-4"
                        :aria-controls="`panel-main-${product?.sku}`"
                        :aria-selected="activeTab === 'socialMedia' ? 'true' : 'false'"
                        :tabindex="activeTab === 'socialMedia' ? 0 : -1"
                        :aria-label="`Social media photos, ${dataImages} images`"
                        role="tab"
                        type="button">
                        <div class="absolute inset-0 overflow-hidden border border-gray-200" aria-hidden="true">
                            <nuxt-img provider="cdn" src="/landing-pages/instagram.webp?updatedAt=1748413170297" class="w-full h-full object-cover" alt=""/>
                        </div>
                        <span class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                            :class="activeTab === 'socialMedia' ? 'ring-primary' : 'ring-transparent'"
                            aria-hidden="true"></span>
                        <span aria-hidden="true"
                            class="bg-white border border-gray-300 sm:border-0 sm:bg-black/50 sm:text-white font-medium rounded-full sm:rounded-none text-xs absolute top-0 sm:top-auto sm:bottom-0 right-0 text-center px-1 py-0.5 sm:py-1 -m-2.5 sm:m-1 capitalize z-10">+{{ dataImages }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-span-full" v-if="product.is_requested_image">
            <button @click="showRequestImageModal = true"
                class="inline-flex py-1 px-4 items-center gap-2 text-primary font-normal text-sm shadow rounded border border-gray-200">
                <Icon name="hand-up" class="w-5 h-5" />
                <span>Request More Images</span>
            </button>
        </div>

        <!--Three Sixty Modal-->
        <ThreeSixtyViewer v-if="isThreeSixtyPreview" @close="closeModal"
            :frontViewPath="this.getDataByPosition('front')" :modelPath="this.getDataByPosition('glb', true)" />
        <RequestImage v-if="showRequestImageModal" :product="product" @close="closeModal" />
    </div>
</template>
<script>
import KEYS from '~/utils/constant.js';
import Heart from '~/components/ui/Heart.vue';
import CompleteLookBanner from '~/components/banners/CompleteLookBanner.vue';
import Icon from '~/components/common/Icon.vue';
import ImagePreview from '~/components/product/ImagePreview.vue';
import SettingIcons from '~/components/product/SettingIcons.vue';
import ThreeSixtyViewer from '~/components/modal/ThreeSixtyViewer.vue';
import RequestImage from '~/components/modal/RequestImage.vue';
import Slider from '~/components/common/Slider.vue';
import { getProductImages } from '~/utils/universalHelper.js';
import ImageVideo from './ImageVideo.vue';
import Button from '../common/Button.vue';

export default {
    name : 'SettingImageGallery',
    components: { Heart, CompleteLookBanner, Icon, ImagePreview, SettingIcons, ThreeSixtyViewer, RequestImage, Slider, ImageVideo, Button },
    props: {
        product: {
            type: Object,
            default: {},
        },
        selectedVariant: {
            type: Object,
            default: { sku : null},
        },
        imgPreviewKey: {
            type: Number
        },
        socialGallery: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isThreeSixtyPreview: false,
            handPreviewArr: [],
            purchasePreviewArr: [],
            lifestylePreviewArr: [],
            videoArr: [],
            tabItems: [],
            dataImages: 0,
            showRequestImageModal: false,
            showViewText: false,
            mainImage: null,
            mainImageKey: 0,
            selectedIndex: 0,
            transitionDirection: 'right',
            activeTab: 'front',
            galleryReady: false,
        }
    },
    watch: {
        'selectedVariant.sku'() {
            this.prepareGallery();
        },
        'mainImageKey'() {
            this.$emit('callGTMEvent');
        },
        'selectedIndex'() {
            this.$emit('callGTMEvent');
        },
        'socialGallery.length'(){
            this.dataImages = this.socialGallery.length;
        }
    },
    computed: {
        getImageData() {
            let img = this.mainImage;

            if (img?.length) {
                img = img[this.selectedIndex];
            }

            return img;
        },
        checkProductFamily() {
            //this.product.attribute_family_code == 'engagement_rings_family' ||
            return this.product.attribute_family_code == 'certified_diamond' && this.$route.params.slug != "diamond-pair";
        },
        checkSliderShow() {
            return this.product.attribute_family_code == 'certified_diamond';
        },
        checkSingleImage() {
            if(this.dataImages) return false;
            const variantImages = this.selectedVariant?.images || [];
            const productImages = this.product?.images || [];

            const unique = new Set();

            // 👉 child first
            variantImages.forEach(el => {
                const key = el.path || el.url;
                if (key) unique.add(key);
            });

            // 👉 parent fills only if not duplicate
            productImages.forEach(el => {
                const key = el.path || el.url;
                if (key && !unique.has(key)) {
                    unique.add(key);
                }
            });

            // ✅ single OR no image
            return unique.size <= 1;
        },
        getArrLength () {
            let arr = this.mainImage;
            return arr?.length;
        },
        validType() {
            let validImageType = KEYS.GRADIENT_IMAGE_TYPE;
            let skipProductType = KEYS.GRADIENT_SKIP_PRODUCT_TYPES;
            return this.getImageData?.view && validImageType.includes(this.getImageData?.view) && !skipProductType.includes(this.product?.attribute_family_code);
        },
        isVideoType() {
            let item = this.mainImage?.length ? this.mainImage[this.selectedIndex] : null;
            if(item && item?.path?.toLowerCase().includes('.mp4')) {
                return true;
            }
            return false;
        }
    },
    mounted() {
       this.prepareGallery();
    },
    methods: {
        async prepareGallery() {
            this.galleryReady = false;

            this.mainImage = null;
            this.clearStates();

            this.handPreviewArr = [];
            this.purchasePreviewArr = [];
            this.lifestylePreviewArr = [];
            this.videoArr = [];

            // force front first
            const frontImg =
                getProductImages('front', false, this.product, this.selectedVariant) ||
                getProductImages('side', false, this.product, this.selectedVariant) ||
                getProductImages('flat', false, this.product, this.selectedVariant);

            this.mainImage = frontImg;
            this.activeTab = 'front';

            await this.$nextTick();

            // then load rest
            this.assignMedia(this.selectedVariant?.images);
            this.assignMedia(this.product?.images);

            this.galleryReady = true;
        },
        scrollToMedia() {
            let el = document.getElementById('yotpoSocialMediaContainer');
            if (el) {
                const rect = el.getBoundingClientRect();
                const offset = 80; // header height

                if (rect.top > window.innerHeight || rect.top < 0) {
                    window.scrollTo({
                    top: window.scrollY + rect.top - offset,
                    behavior: 'smooth'
                    });
                }
            }
            this.$emit('callGTMEvent', 'view_item_social_media');
        },
        handleTouchStart(e) {
            this.startX = e.touches[0].clientX;
        },
        handleTouchEnd(e) {
            let endX = e.changedTouches[0].clientX;
            let diff = this.startX - endX;

            if (Math.abs(diff) > 50) { // swipe threshold
                if (diff > 0) {
                this.nextImg(); // swipe left → next
                } else {
                this.prevImg(); // swipe right → prev
                }
            }
        },
        prevImg() {
            if (this.selectedIndex > 0) {
                this.transitionDirection = 'left';
                this.selectedIndex--;
            }
        },
        nextImg() {
            let arrLength = this.getArrLength;
            if (this.selectedIndex < arrLength - 1) {
                this.transitionDirection = 'right';
                this.selectedIndex++;
            }
        },
        getDynamicKey(view) {
            return `${this.selectedVariant?.sku ?? this.product?.sku}_${view}}`;
        },
        getDataByPosition(view, isCheckExtension = false) {
           return getProductImages(view, isCheckExtension, this.product, this.selectedVariant);
        },
        checkGLBExistence() {
            console.log('checkGLBExistence');
            // Check if variant images includes .glb file
            // this.isThreeSixtyPreview = this.getDataByPosition('glb', true);
            // (!this.isThreeSixtyPreview || this.isThreeSixtyPreview == false) ? this.callImagePreviwer('viewerFront') : "";
        },
        callImagePreviwer(imgData, tabName) {
            this.mainImage = imgData;
            this.activeTab = tabName;
            this.clearStates();
        },
        getVisibleTabs() {
            const all = [
                { name: 'front', data: this.getDataByPosition('front') },
                { name: 'side', data: this.getDataByPosition('side') },
                { name: 'flat', data: this.getDataByPosition('flat') },
                { name: 'video', data: this.videoArr?.length ? this.videoArr : null },
                { name: 'purchase', data: this.purchasePreviewArr?.length ? this.purchasePreviewArr : null },
                { name: 'hand', data: this.handPreviewArr?.length ? this.handPreviewArr : null },
                { name: 'lifestyle', data: this.lifestylePreviewArr?.length ? this.lifestylePreviewArr : null },
            ];
            return all.filter(t => !!t.data);
        },
        handleTabKeydown(e) {
            if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
            e.preventDefault();
            const visible = this.getVisibleTabs();
            const currentIdx = visible.findIndex(t => t.name === this.activeTab);
            let nextIdx = currentIdx;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (currentIdx + 1) % visible.length;
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (currentIdx - 1 + visible.length) % visible.length;
            else if (e.key === 'Home') nextIdx = 0;
            else if (e.key === 'End') nextIdx = visible.length - 1;
            const next = visible[nextIdx];
            // Update selected state FIRST so aria-selected is already "true"
            // before focus lands — prevents NVDA announcing focus + state change separately.
            this.callImagePreviwer(next.data, next.name);
            this.$nextTick(() => {
                document.getElementById(`tab-${next.name}-${this.product?.sku}`)?.focus();
            });
        },
        clearStates() {
            this.selectedIndex = 0;
            this.mainImageKey++;
        },
        closeModal() {
            this.isThreeSixtyPreview = false;
            this.showRequestImageModal = false;
        },
        assignMedia(images = []) {
            if (!images?.length) return;
            const existsInAnyArray = (el) => {
                const key = el.path || el.url;

                return [
                    ...this.handPreviewArr,
                    ...this.purchasePreviewArr,
                    ...this.lifestylePreviewArr,
                    ...this.videoArr
                ].some(item => (item.path || item.url) === key);
            };

            images.forEach((el) => {
                const type = el.view || el.type;

                // 🚫 skip duplicate media
                if (existsInAnyArray(el)) return;

                switch (type) {
                    case 'hand':
                        this.handPreviewArr.push(el);
                        break;
                    case 'purchase':
                        this.purchasePreviewArr.push(el);
                        break;
                    case 'lifestyle':
                        this.lifestylePreviewArr.push(el);
                        break;
                    case 'mp4':
                        this.videoArr.push(el);
                        break;
                }
            });
        }
    },
}
</script>

<style>
@media (prefers-reduced-motion: reduce) {
  .fade-right-enter-active,
  .fade-right-leave-active,
  .fade-left-enter-active,
  .fade-left-leave-active {
    @apply transition-none duration-0;
  }
}

.fade-right-enter-active,
.fade-right-leave-active,
.fade-left-enter-active,
.fade-left-leave-active {
  @apply absolute w-full h-full transition-all duration-500 ease-in-out;
}

/* Right Direction */
.fade-right-enter,
.fade-left-leave-to {
  @apply translate-x-5 opacity-0;
}

.fade-right-leave-to,
.fade-left-enter {
  @apply -translate-x-5 opacity-0;
}
</style>