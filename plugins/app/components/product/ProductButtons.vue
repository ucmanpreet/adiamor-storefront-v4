<template>
    <div>
        <div v-if="getProductAvailability">
            <EstimatedPrices :product="product" :selectedVariant="selectedVariant" />

            <div class="mt-5 flex items-center gap-1" v-if="product.button_setting?.is_add_to_cart && product.button_setting?.is_add_to_cart?.is_show">
                
                    <div v-show="showFixedButton" aria-hidden="true"
                        class="sm:hidden fixed bottom-0 z-20 left-0 right-0 w-full px-4 py-4 bg-white border-t border-gray-200">
                        <Button class="flex-1 uppercase w-full !py-3" type="button" @click="submitForm" v-if="!btnLoader">{{ product &&
                            product.button_setting
                            && product.button_setting.is_add_to_cart ?
                            product.button_setting.is_add_to_cart.text : 'Add to Cart' }}
                        </Button>
                        <Button v-else class="flex-1 uppercase w-full !py-3" type="button" aria-busy="true" :disabled="true" :aria-disabled="true"> Loading ... </Button>
                    </div>
                
                <div class="flex flex-col gap-4 flex-1">
                    <p v-if="product?.is_add_bundle && getIsValidBundle" class="text-black">
                        Select a {{ currentProduct }} compatible with the {{ previousProduct }} shape. <br />
                        Please call <a :href="`tel:${telPhoneNumber}`">{{ phoneNumber }}</a> for further
                        assistance.
                    </p>
                    <div class="flex gap-5">
                        <Button v-if="!btnLoader" id="original-button" class="flex-1 uppercase w-full max-w-lg lg:max-w-sm !py-3.5"
                            type="button" @click="submitForm" :disabled="getIsValidBundle" :aria-disabled="getIsValidBundle"
                            :class="{ 'pointer-events-none cusrsor-not-allowed opacity-50': getIsValidBundle }">{{
                                product &&
                                    product.button_setting
                                    && product.button_setting.is_add_to_cart ?
                                    product.button_setting.is_add_to_cart.text : 'Add to Cart' }}</Button>
                        <Button v-else class="flex-1 uppercase w-full max-w-lg lg:max-w-sm !py-3.5" type="button"  aria-busy="true" :disabled="true" :aria-disabled="true"> Loading ... </Button>

                        <div class="hidden sm:flex items-center px-3 border border-gray-100 bg-gray-100">
                            <Heart :item="getBundleData" :selectedVariant="{}" @click="active = !active"
                                :size="`w-5 h-5`" :key="product.sku" v-if="isBundleView"/>
                            <Heart :item="product" :selectedVariant="selectedVariant" @click="active = !active"
                                :size="`w-5 h-5`" :key="selectedVariant?.sku || product.sku" v-else/>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="errorMsg && !btnLoader">
                <p class="text-red-500">{{ errorMsg }}</p>
            </div>

            <div class="mt-3 sm:mt-4">
                <!-- Buttons Row -->
                <div class="flex flex-row gap-2 sm:gap-4 justify-between">
                    <div class="flex flex-1 gap-4 !p-2 items-center justify-center sm:hidden px-4 py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-1 border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary font-gill-sans tracking-[0.125rem] uppercase">
                        <button type="button" colorType="bordered-secondary" @mouseover="compareIcon = true"
                            @mouseleave="compareIcon = false" @click="onShareClick" aria-label="Share product"
                            class="flex items-center justify-center sm:hidden">
                            <span class="sm:hidden" v-text="shareIcon ? '' : 'Share'"></span>
                            <Icon name="share" class="ml-2 w-5 h-5 sm:hidden" aria-hidden="true"/>
                        </button>
                        <!-- Pinterest -->
                        <a
                            :href="getPinterestPath"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share product on Pinterest"
                        >
                            <Icon name="pinterest" class="w-6 h-6" />
                        </a>
                        <!-- Email a friend Button -->
                        <button type="button" class="block" aria-label="Email a friend" @click="(showModal = true), (modalType = 'emailAFriend')">
                          <Icon name="mail-fill" class="w-6 h-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <!-- <Button type="button" colorType="bordered-secondary" @mouseover="compareIcon = true"
                        @mouseleave="compareIcon = false" @click="onShareClick" aria-label="Share product"
                        class="flex-1 !p-2 flex items-center justify-center sm:hidden">
                        <span class="sm:hidden" v-text="shareIcon ? '' : 'Share'"></span>
                        <Icon name="share" class="ml-2 w-5 h-5 sm:hidden" aria-hidden="true"/>
                    </Button> -->
                    <div class="relative flex-1 hidden sm:flex items-stretch"
                        @mouseenter="shareIcon = true"
                        @mouseleave="shareIcon = false">
                        <Button type="button" colorType="bordered-secondary"
                            @click="toggleShareMenu"
                            :aria-expanded="shareIcon ? 'true' : 'false'" aria-haspopup="true"
                            aria-label="Share product with a friend"
                            class="flex-1 !px-1 flex items-center justify-center w-full"
                            :class="shareIcon ? '!py-0': '!py-2'">
                            <span class="hidden sm:inline-flex" v-text="shareIcon ? '' : 'Share with a friend'"></span>
                            <span class="sm:hidden" v-text="shareIcon ? '' : 'Share'"></span>
                            <Icon v-if="!shareIcon" name="share" class="ml-2 w-5 h-5 sm:hidden" aria-hidden="true"/>
                        </Button>
                        <ul v-if="shareIcon" ref="shareMenu"
                            class="absolute inset-0 flex gap-4 items-center justify-center bg-white border border-gray-300 z-10"
                            @focusout="onMenuFocusOut($event, 'shareMenu', 'shareIcon')">
                            <li>
                                <button type="button" class="block" aria-label="Email a friend"
                                    @click="(showModal = true), (modalType = 'emailAFriend')">
                                    <Icon name="mail-fill" class="w-6 h-6" aria-hidden="true"/>
                                </button>
                            </li>
                            <li>
                                <a :href="`https://www.facebook.com/sharer.php?u=${getCurrentPath}`"
                                    target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                                    <Icon name="facebook-fill" class="w-6 h-6" aria-hidden="true" />
                                </a>
                            </li>
                            <li>
                                <a :href="`https://twitter.com/share?url=${getCurrentPath}`"
                                    target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                                    <Icon name="twitter" class="w-6 h-6" aria-hidden="true"/>
                                </a>
                            </li>
                            <li>
                                <a :href="getPinterestPath"
                                    target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest">
                                    <Icon name="pinterest" class="w-6 h-6" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- Mobile only: icons always visible -->
                    <ul class="sm:hidden flex-1 flex gap-3 items-center justify-center bg-white border border-gray-300 px-2 py-[0.563rem]"
                        aria-label="Connect with Us options">
                        <li>
                            <a href="https://wa.me/message/VBFCYX4RZRGAH1" target="_blank" aria-label="WhatsApp" class="block p-1">
                                <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 448 512">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" @click.prevent="openLiveChat" aria-label="Live Chat" class="block p-1">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a :href="`tel:${telPhoneNumber}`" aria-label="Call Us" class="block p-1">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path d="M451,374c-15.88-16-54.34-39.35-73-48.76C353.7,313,351.7,312,332.6,326.19c-12.74,9.47-21.21,17.93-36.12,14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48,5.41-23.23,14.79-36c13.22-18,12.22-21,.92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9,44,119.9,47,108.83,51.6A160.15,160.15,0,0,0,83,65.37C67,76,58.12,84.83,51.91,98.1s-9,44.38,23.07,102.64,54.57,88.05,101.14,134.49S258.5,406.64,310.85,436c64.76,36.27,89.6,29.2,102.91,23s22.18-15,32.83-31a159.09,159.09,0,0,0,13.8-25.8C465,391.17,468,391.17,451,374Z" style="fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:32px"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <button type="button" class="block p-1" @click="addFormToModal()" aria-label="Send Email">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                    <!-- Desktop only: exact same hover pattern as Share button -->
                    <div class="relative hidden sm:flex flex-1 items-stretch"
                        @mouseenter="connectIcon = true"
                        @mouseleave="connectIcon = false">
                        <Button type="button" colorType="bordered-secondary"
                            @click="toggleConnectMenu"
                            :aria-expanded="connectIcon ? 'true' : 'false'" aria-haspopup="true"
                            class="flex-1 !px-1 flex items-center justify-center w-full"
                            :class="connectIcon ? '!py-0' : '!py-2'"
                            aria-label="Connect with Us">
                            {{ connectIcon ? '' : 'Connect with Us' }}
                        </Button>
                        <ul v-if="connectIcon" ref="connectMenu"
                            class="absolute inset-0 flex gap-2 items-center justify-center bg-white border border-gray-300 z-10 px-2"
                            @keydown.esc="closeConnectMenu"
                            @focusout="onMenuFocusOut($event, 'connectMenu', 'connectIcon')">
                            <li>
                                <a href="https://wa.me/message/VBFCYX4RZRGAH1" target="_blank" aria-label="WhatsApp" class="block p-1">
                                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 448 512">
                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" @click.prevent="openLiveChat" aria-label="Live Chat" class="block p-1">
                                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a :href="`tel:${telPhoneNumber}`" aria-label="Call Us" class="block p-1">
                                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" aria-hidden="true">
                                        <path d="M451,374c-15.88-16-54.34-39.35-73-48.76C353.7,313,351.7,312,332.6,326.19c-12.74,9.47-21.21,17.93-36.12,14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48,5.41-23.23,14.79-36c13.22-18,12.22-21,.92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9,44,119.9,47,108.83,51.6A160.15,160.15,0,0,0,83,65.37C67,76,58.12,84.83,51.91,98.1s-9,44.38,23.07,102.64,54.57,88.05,101.14,134.49S258.5,406.64,310.85,436c64.76,36.27,89.6,29.2,102.91,23s22.18-15,32.83-31a159.09,159.09,0,0,0,13.8-25.8C465,391.17,468,391.17,451,374Z" style="fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:32px"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <button type="button" class="block p-1" @click="addFormToModal()" aria-label="Send Email">
                                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 sm:mt-4 text-sm" v-if="isBundleView">For phone orders, please mention: <span
                        class="font-semibold text-primary uppercase">{{ $hydrated ? getVisitorCode : '' }}</span></div>
                <!-- Order and Details Row -->
                <ProductOrderDetails :product="product" v-show="getProductData?.is_available"/>
            </div>

            <!-- Share a friend Modal -->
            <EmailAFriend v-if="showModal && modalType == 'emailAFriend'" @close="closeModal" :product="product" />

            <!-- Ask a Question Modal -->
            <AskAQuestion v-if="showModal && modalType == 'askAQuestion'" @close="closeModal" :product="product" />

        </div>
        <NotAvailable v-else :product="getProductData"/>
    </div>
</template>
<script>
import EstimatedPrices from '~/components/product/EstimatedPrices.vue';
import Button from '~/components/common/Button.vue';
import Heart from '~/components/ui/Heart.vue';
import Icon from '~/components/common/Icon.vue';
import ProductOrderDetails from '~/components/product/ProductOrderDetails.vue';
import EmailAFriend from '~/components/modal/EmailAFriend.vue';
import AskAQuestion from '~/components/modal/AskAQuestion.vue';
import NotAvailable from '~/components/product/NotAvailable.vue';
import { getCategoryType, getProductImages, getGTMProductImage } from "~/utils/universalHelper";
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name : 'ProductButtons',
    components: { EstimatedPrices, Button, Heart, Icon, ProductOrderDetails, EmailAFriend, AskAQuestion, NotAvailable },
    props: {
        product: Object,
        selectedVariant: {
            type: Object,
            default: {}, // Default to an empty string to avoid issues when empty
        },
    },
    data() {
        return {
            active: false,
            connectIcon: false,
            shareIcon: false,
            showModal: false,
            modalType: '',
            submitted: false,
            showFixedButton: true,
            btnLoader: false,
            errorMsg: null,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.checkButtonVisibility);
        this.$bus.on('addToCartResponse', (data) => {
            this.btnLoader = false;
            this.errorMsg = data?.error;
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.checkButtonVisibility);
    },
    methods: {
        toggleConnectMenu() {
            this.connectIcon = !this.connectIcon;
            if (this.connectIcon) {
                this.$bus.emit('aria-announce', 'Connect with Us options opened: WhatsApp, Live Chat, Call Us, Send Email. Use swipe to navigate.');
                // setTimeout more reliable than $nextTick for iOS VoiceOver focus
                setTimeout(() => {
                    const menu = this.$refs.connectMenu;
                    const first = menu?.querySelector('a, button');
                    first?.focus();
                }, 150);
            } else {
                this.$bus.emit('aria-announce', 'Connect with Us menu closed.');
            }
        },
        closeConnectMenu() {
            this.connectIcon = false;
            this.$bus.emit('aria-announce', 'Connect with Us menu closed.');
            this.$nextTick(() => {
                // Return focus to the trigger button
                const btn = this.$el.querySelector('[aria-label="Connect with Us"]');
                btn?.focus();
            });
        },
        openLiveChat() {
            this.$bus.emit('aria-announce', 'Opening live chat. Please wait.');
            if (typeof helpDesk !== 'undefined' && helpDesk.click) helpDesk.click();
        },
        onMenuFocusOut(event, refName, iconKey) {
            setTimeout(() => {
            const menu = this.$refs[refName];
            const focused = document.activeElement;
            if (!menu || !menu.contains(focused)) {
                this[iconKey] = false;
            }
            }, 150);
        },
        addFormToModal() {
            this.showModal = true;
            this.modalType = 'askAQuestion';
        },
        submitForm() {
            if (this.getIsValidBundle) return;
            this.btnLoader = this.product?.button_setting?.is_modal_open ? false : true;
            this.$emit('clickSubmit');
        },
        closeModal() {
            this.showModal = false;
        },
        checkButtonVisibility() {
            const originalBtn = document?.querySelector('#original-button');
            if (!originalBtn) return;

            const rect = originalBtn.getBoundingClientRect();
            this.showFixedButton = rect.top > window.innerHeight || rect.bottom < 0;
        },
        toggleShareMenu() {
            this.shareIcon = !this.shareIcon;
            if (this.shareIcon) this.gtmEvent();
        },
        gtmEvent() {
            this.gtmProductEvent([this.product], null, 'share_item');
        },
        async gtmProductEvent(filteredData = null, type = null, actionType = null) {	
			const correctSku = (product) => product?.sku?.includes('-') ? product?.sku.split('-')[0] : product?.sku;
            await this.$store.commit('setProductGtmData', null);
            let filteredList = filteredData?.length ? filteredData : [];
			if(!filteredList?.length) return;
			if (type === null && (this.$route.name === 'yourSettingPage') && Array.isArray(filteredList) && filteredList.length === 1) {
				const bundleItem = this.$store?.getters?.getBundleItem;
				const settingSku = bundleItem?.setting?.sku;
				const diamondSku = bundleItem?.diamond?.sku;

				if (bundleItem && settingSku && diamondSku) {
					filteredList[0] = {
						...(typeof filteredList[0] === 'object' && !Array.isArray(filteredList[0]) ? filteredList[0] : {}),
						...(typeof bundleItem === 'object' && !Array.isArray(bundleItem) ? bundleItem : {}),
						sku: `${settingSku}-${diamondSku}`
					};
				}
			}
			const getGTMProductPath = (url = '') => {
				return this.$config.public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + url?.replace(/^\/|\/$/g, '');
			}

            let productType = this.product?.family ? this.product?.family?.replace(' ', '-') : "jewelry";
            let item_list_name = type ? `${type}-items-${productType?.toLowerCase()}` : null;
            let gtmEventData = filteredList?.map((item, index) => {
            if (item) {
				let isDiamond = item?.attribute_family_code == 'certified_diamond';
                return {
                    item_id: item?.type != 'simple' && !isDiamond ? correctSku(item) ?? item?.sku : item?.sku,
                    item_name: item?.name ?? item?.title,
                    index,
                    item_variant: type && !isDiamond ? item?.sku : item?.type != 'simple' && !isDiamond ? this.selectedVariant?.sku ?? item?.sku : null,
                    price: item?.price,
                    quantity: 1,
					item_url: getGTMProductPath(type && item?.href ? `${item?.href}${item?.sku && !isDiamond ? `?sku=${item?.sku}` : ''}` : `${item?.url_key}${this.selectedVariant?.sku ? `?sku=${this.selectedVariant?.sku}` : ''}`),
					item_image_url: getGTMProductImage('front', false, this.product,this.selectedVariant)
                };
            }
            });            
            await this.$store.commit('setProductGtmData', gtmEventData);                    
            const additionalData = item_list_name ? { item_list_name } : {};
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : actionType ? actionType : 'view_item_list', txnId: null, additionalData });
        },
        async onShareClick() {
            this.gtmEvent && this.gtmEvent()

            // Native share (mobile)
            if (navigator.share) {
                try {
                    await navigator.share({
                        url: this.getCurrentPath
                    })
                } catch (_) {}
            } else {
            this.shareIcon = true
            }
        }
    },
    directives: {
        clickOutside: {
            bind(el, binding) {
                el.addEventListener('click', e => e.stopPropagation());
                document.body.addEventListener('click', binding.value);
            },
            unbind(el, binding) {
                document.body.removeEventListener('click', binding.value);
            },
        },
    },
    computed: {
        getProductData() {
            return this.isBundleView ? this.getBundleData : this.product;
        },
        isBundleView() {
			return this.$route.name === 'yourSettingPage';
		},
        getProductAvailability() {
            // return product availability based on in_stock and is_active
            if(this.$route.name != "yourSettingPage"){
                return this.product.is_available;
            }
            let bundleItem = this.$store.getters.getBundleItem;
            if (bundleItem && Object.keys(bundleItem).length > 0){
                let setting = bundleItem['setting'];
                let diamond = bundleItem['diamond'];
                return setting?.is_available && diamond?.is_available;
            }
            return true;
        },
        getBundleData() {
                let bundleData = this.$store.getters.getBundleItem;
                let setting = bundleData?.setting || {};
                let diamond = bundleData?.diamond || {};
                let url_key =  STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', setting?.sku).replace(':diamond', diamond?.sku);
                return {
                    name: bundleData['name'] || `${setting?.name} with ${diamond?.name}`,
                    attribute_family_code: `${setting?.attribute_family_code}`,
                    sku: `${setting?.sku}-${diamond?.sku}`,
                    url_key,
                    images: setting?.images,
                    price: bundleData['price'],
                    discounted_price: bundleData['discounted_price'],
                    setting: setting,
                    diamond: diamond,
                    type: 'bundle',
                    is_available: this.checkButtonVisibility
                };
        },
        previousProduct() {
            return this.product?.type == 'configurable' ? 'diamond' : 'setting';
        },
        currentProduct() {
            return this.product?.type == 'configurable' ? 'setting' : 'diamond';

        },
        getFromCurrentProduct() {
            if (this.product && this.product?.is_add_bundle) {
                if (this.product?.type == 'simple' && this.product?.attribute_family_code == 'certified_diamond') {
                    return this.product?.shape?.toLowerCase();
                }
                if (this.product?.type == 'configurable' && this.product?.variants?.length) {
                    return this.product?.variants?.map(variant => variant?.shape?.toLowerCase());
                }
            }
        },
        getFormattedDomain() {
            return this.$config.public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '');
        },
        getCurrentPath() {
            // Prefer SEO/product Conical URL if available
            let path = this.product?.url_key && !this.isBundleView ? this.product?.url_key : this.$route.fullPath;
            // Ensure it's a string
            path = String(path || '');
            if (path.startsWith('/')) {
                path = path.slice(1);
            }
            // Build absolute URL
            const fullURL = `${this.getFormattedDomain.replace(/\/$/, '')}/${path}`;
            return encodeURI(fullURL);
        },
        getProuductImage() {
            return encodeURIComponent(getProductImages('front', false, this.product, this.selectedVariant)?.path || this.product?.images[0]?.path);
        },
        getProductDescription() {
            return encodeURIComponent(this.product?.name);
        },
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
        getVisitorCode() {
         return this.$getVisitorCode();
        },
        getIsValidBundle() {
            try {
                let sessionStorageBundleType = sessionStorage.getItem('bundleType');
                let eventType = (this.product?.attribute_family_code == 'certified_diamond') ? getCategoryType(sessionStorageBundleType ?? this.product?.attribute_family_code) : getCategoryType(this.product?.attribute_family_code ?? sessionStorageBundleType);                
                if (eventType?.action && this.product && this.product?.is_add_bundle) {
                    let item = this.$store.getters[`bundle/${eventType?.getter}`];
                    // Check for valid bundle item
                    const singleExists = (item?.diamond?.sku && item?.diamond?.sku.trim() !== '') || (item?.setting?.sku && item?.setting?.sku.trim() !== '');
                    
                    if (singleExists) {
                        let singleExistedProduct = item?.setting?.sku ? item?.setting : item?.diamond;
                        if(singleExistedProduct?.attribute_family_code == this.product?.attribute_family_code) return false;
                        let diamondShape = item?.diamond?.shape?.toLowerCase() ?? this.getFromCurrentProduct;
                        let allShapes = item?.setting ? item?.setting?.variants?.map(variant => variant?.shape?.toLowerCase()) : this.getFromCurrentProduct;
                        if (diamondShape && allShapes?.length) {
                            let diamondOrientedVariant = allShapes?.find(el => el === diamondShape);
                            if (!diamondOrientedVariant) {
                                let isUnsetPresent = allShapes?.find(el => el === 'unset');                                
                                return isUnsetPresent ? false : true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
                return false;
            } catch (error) {
                console.log(error);
            }
        },
        getPinterestPath() {
            let path = this.product?.url_key && !this.isBundleView
                ? this.product.url_key
                : this.$route.fullPath;

            path = String(path || '');

            if (path.startsWith('/')) {
                path = path.slice(1);
            }

            const base = this.getFormattedDomain.replace(/\/$/, '');

            let url = `${base}/${path}`;

            // Preserve SKU
            if (this.selectedVariant?.sku) {
                const separator = url.includes('?') ? '&' : '?';
                url += `${separator}sku=${this.selectedVariant.sku}`;
            }

            // Add diamond inside the url (IMPORTANT)
            if (this.diamond?.sku) {
                const separator = url.includes('?') ? '&' : '?';
                url += `${separator}diamond=${this.diamond.sku}`;
            }

            const encodedURL = encodeURIComponent(url);
            const image = this.getProuductImage;
            const description = this.getProductDescription;

            return `https://www.pinterest.com/pin/create/button/?url=${encodedURL}&media=${image}&image_url=${image}&description=${description}`;
        }
    },
}
</script>