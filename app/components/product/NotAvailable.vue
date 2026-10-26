<template>
    <div>
        <div class="py-6 text-center">
            <p class="text-[21px] font-medium text-primary leading-loose">This {{ product?.type == 'simple' || product?.type == 'bundle' ? 'diamond' : 'item' }} is no longer available.</p>
            <p class="text-sm" v-if="product?.type == 'bundle'">Choose another diamond to complete your ring, or contact us for assistance.</p>
            <p class="text-sm">Please call <strong class="font-semibold">{{phoneNumber}}</strong> for further assistance.</p>

        </div>
        <div class="mt-10">
            <NuxtLink :to="getUrl"
                class="flex-1 w-full uppercase flex items-center justify-center px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-white hover:bg-primary/90 focus:ring-primary">
              {{ product?.type == 'bundle' ? 'CHOOSE ANOTHER DIAMOND' : 'Search Similar' + getProductFamily }}</NuxtLink>
        </div>
        <div class="mt-5">
            <!-- Buttons Row -->
            <div class="flex flex-col md:flex-row gap-4 justify-between">
                <Button type="button" colorType="bordered-primary" @mouseover="shareIcon = true"
                    @mouseleave="shareIcon = false"
                    class="flex-1 border border-primary text-primary p-2 flex items-center justify-center"
                    :aria-label="'Share this product'"
                    aria-haspopup="menu"
                    :aria-expanded="shareIcon.toString()">
                    <span v-text="shareIcon ? '' : 'Share'"></span>
                    <template v-if="!shareIcon">
                        <svg class="ml-2 w-5 h-5" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_1326_10796)">
                                <rect x="1.5" width="24" height="24" rx="12" fill="white" />
                                <path
                                    d="M16.7302 8.86277L10.9268 12.4901C11.0286 12.814 11.0621 13.1556 11.0253 13.4932L16.409 15.5118C16.7529 15.0211 17.2639 14.6728 17.8463 14.532C18.4287 14.3912 19.0425 14.4676 19.5725 14.747C20.1026 15.0264 20.5126 15.4895 20.7256 16.0495C20.9386 16.6096 20.9401 17.2281 20.7297 17.7891C20.5193 18.3501 20.1115 18.8151 19.5828 19.097C19.0541 19.3789 18.4407 19.4582 17.8576 19.3202C17.2746 19.1821 16.7619 18.8362 16.4156 18.3472C16.0694 17.8582 15.9134 17.2596 15.9769 16.6638L10.5945 14.6453C10.3061 15.0567 9.89866 15.37 9.42699 15.5431C8.95531 15.7162 8.44196 15.7408 7.95588 15.6137C7.46979 15.4865 7.03426 15.2136 6.70777 14.8317C6.38127 14.4498 6.17946 13.9772 6.12943 13.4772C6.07939 12.9773 6.18354 12.474 6.42788 12.035C6.67221 11.596 7.04504 11.2422 7.49628 11.0212C7.94753 10.8003 8.45558 10.7227 8.95221 10.7989C9.44883 10.8751 9.91025 11.1015 10.2745 11.4475L16.0766 7.82025C15.8962 7.24891 15.9303 6.63138 16.1726 6.0834C16.4149 5.53541 16.8487 5.09461 17.3928 4.84361C17.9368 4.59261 18.5537 4.54865 19.1279 4.71996C19.702 4.89127 20.194 5.2661 20.5115 5.77418C20.8291 6.28227 20.9504 6.88872 20.8528 7.47988C20.7552 8.07103 20.4454 8.60629 19.9813 8.98534C19.5173 9.36438 18.931 9.56118 18.3322 9.53884C17.7335 9.5165 17.1635 9.27657 16.729 8.86401L16.7302 8.86277Z"
                                    fill="currentColor" />
                            </g>
                            <defs>
                                <filter id="filter0_d_1326_10796" x="0.5" y="0" width="26" height="27"
                                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="2" />
                                    <feGaussianBlur stdDeviation="0.5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix"
                                        result="effect1_dropShadow_1326_10796" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1326_10796"
                                        result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </template>
                    <template v-if="shareIcon">
                        <ul class="ml-3 flex gap-4 items-center">
                            <li>
                                <button type="button" class="block" @click="(showModal = true), (modalType = 'emailAFriend')" aria-label="Email a friend">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                        fill="currentColor">
                                        <path
                                            d="M424,80H88a56.06,56.06,0,0,0-56,56V376a56.06,56.06,0,0,0,56,56H424a56.06,56.06,0,0,0,56-56V136A56.06,56.06,0,0,0,424,80Zm-14.18,92.63-144,112a16,16,0,0,1-19.64,0l-144-112a16,16,0,1,1,19.64-25.26L256,251.73,390.18,147.37a16,16,0,0,1,19.64,25.26Z">
                                        </path>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <a :href="`https://www.facebook.com/sharer.php?u=${getCurrentPath}`" target="_blank" rel="noopener" aria-label="Share on Facebook">
                                    <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a :href="`https://twitter.com/share?url=${getCurrentPath}`" target="_blank" rel="noopener" aria-label="Share on Twitter">
                                    <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a :href="`https://pinterest.com/pin/create/button/?url=${getCurrentPath}`"
                                    target="_blank" rel="noopener" aria-label="Share on Pinterest">
                                    <svg class="w-4 h-4" fill="#E60019" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 496 512">
                                        <path
                                            d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </template>
                    <template v-else>Connect with Us</template>
                </Button>
                <Button type="button" colorType="bordered-primary" @mouseover="connectIcon = true"
                    @mouseleave="connectIcon = false"
                    class="flex-1 border border-primary text-primary p-2 flex items-center justify-center"
                    :aria-label="'Connect with us'"
                    aria-haspopup="menu"
                    :aria-expanded="connectIcon.toString()">
                    <template v-if="connectIcon">
                        <ul class="ml-3 flex gap-4 items-center">
                            <li>
                                <a href="https://wa.me/message/VBFCYX4RZRGAH1" target="_blank" rel="noopener" aria-label="WhatsApp">
                                    <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:helpDesk.click()" aria-label="Live Help">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <path d="M12 17h.01"></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a :href="`tel:${telPhoneNumber}`" aria-label="Call Us">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                        fill="none" stroke="currentColor">
                                        <path
                                            d="M451,374c-15.88-16-54.34-39.35-73-48.76C353.7,313,351.7,312,332.6,326.19c-12.74,9.47-21.21,17.93-36.12,14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48,5.41-23.23,14.79-36c13.22-18,12.22-21,.92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9,44,119.9,47,108.83,51.6A160.15,160.15,0,0,0,83,65.37C67,76,58.12,84.83,51.91,98.1s-9,44.38,23.07,102.64,54.57,88.05,101.14,134.49S258.5,406.64,310.85,436c64.76,36.27,89.6,29.2,102.91,23s22.18-15,32.83-31a159.09,159.09,0,0,0,13.8-25.8C465,391.17,468,391.17,451,374Z"
                                            style="fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:32px">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <button type="button" class="block" @click="addFormToModal()" aria-label="Send Email">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path
                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                        </path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </template>
                </Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import Button from '~/components/common/Button.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import { urlWithCategory } from "~/utils/universalHelper";

const props = defineProps(['product']);

const store = useMainStore();
const route = useRoute();
const config = useRuntimeConfig().public;

const active = ref(false);
const connectIcon = ref(false);
const shareIcon = ref(false);
const showPop = ref(false);
const showModal = ref(false);
const modalType = ref('');
const submitted = ref(false);
const btnLoader = ref(true);

const getProductFamily = computed(() => {
    const family = props.product?.family;
    if (!family) return '';
    const isPlural = family.endsWith('s');
    return isPlural ? family : family + 's';
});

const getCurrentPath = computed(() => {
    let finalURL = route.fullPath;

    if (finalURL?.startsWith('/')) {
        finalURL = finalURL.slice(1);
    }

    // Encode the route safely
    const encodedRoute = encodeURIComponent(finalURL);

    return `${config.adiamorHomeURL}${encodedRoute}`;
});

const phoneNumber = computed(() => store.phoneNumber);

const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));

const getUrl = computed(() => {
    let diamondproduct = props.product?.type == 'bundle' ? props.product?.diamond : props.product;
    let redirectTo = diamondproduct && diamondproduct?.attribute_family_code == "certified_diamond" ? diamondproduct?.redirect_diamond_search_link : diamondproduct?.redirect_search_link;
    let url = redirectTo?.category
        ? urlWithCategory(redirectTo)
        : redirectTo;
    if(diamondproduct?.attribute_family_code == "certified_diamond"){
        let price = diamondproduct?.price;
        const params = new URLSearchParams({
                diamond_cut_grade: getAttributeValue('diamond_cut_grade'),
                diamond_color_grade: getAttributeValue('diamond_color_grade'),
                diamond_clarity_grade: getAttributeValue('diamond_clarity_grade'),
                diamond_carat_weight: getSmartCaratRange(getAttributeValue('diamond_carat_weight')),
                diamond_origin: getAttributeValue('diamond_growth'),
                diamond_shape: getAttributeValue('diamond_shape'),
                price : JSON.stringify({ min: price * 0.80, max: price * 1.20 }),
                similar : 1
                // diamond_depth_percent: JSON.stringify({ min: getAttributeValue('diamond_depth_percent'), max: getAttributeValue('diamond_depth_percent') }),
                // diamond_table_percent: JSON.stringify({ min: getAttributeValue('diamond_table_percent'), max: getAttributeValue('diamond_table_percent') }),
                // diamond_polish: getAttributeValue('diamond_polish'),
                // diamond_symmetry: getAttributeValue('diamond_symmetry'),
                // diamond_fluorescence: getAttributeValue('diamond_fluorescence'),
                // diamond_authority: getAttributeValue('diamond_authority'),
        });

        let routeUrl = `${url}${diamondproduct?.shape ? `${queryOrRoute(url)}${diamondproduct?.shape?.toLowerCase()}` : ''}` ?? STATIC_ROUTES.HOME;
        return `${routeUrl}?${params.toString()}`;
    }
    return `${url}${diamondproduct?.shape ? `${queryOrRoute(url)}${diamondproduct?.shape?.toLowerCase()}` : ''}` ?? STATIC_ROUTES.HOME;
});

function queryOrRoute(url) {
    const routes = [
        { path: 'design-your-own-earrings', query: 'center_stone_shape=' },
        { path: 'design-your-own-necklaces', query: 'center_stone_shape=' },
        { path: 'diamond-pair', query: 'diamond_shape=' },
    ];
    const route = routes.find((r) => url?.includes(r.path));
    return route ? `?${route.query}` : STATIC_ROUTES.HOME;
}

function getSmartCaratRange(currentCarat) {
    let buffer;

    if (currentCarat < 1.0) {
        // High density: Keep it tight (e.g., 0.50ct -> 0.48 to 0.52)
        buffer = 0.05;
    } else if (currentCarat >= 1.0 && currentCarat < 3.0) {
        // Medium density: (e.g., 1.50ct -> 1.35 to 1.65)
        buffer = 0.10;
    } else {
        // Rare/Sparse: (e.g., 5.00ct -> 4.00 to 6.00)
        buffer = 0.20;
    }

    return JSON.stringify({
        min: (currentCarat * (1 - buffer)).toFixed(2),
        max: (currentCarat * (1 + buffer)).toFixed(2)
    });
}

function getAttributeValue(code) {
    const attrs = props.product?.type == 'bundle' ? props.product?.diamond?.attributes : props.product?.diamondAttributeDetail?.[0]?.data || props.product?.attributes || [];
    if(!attrs.length) return null;
    let val = attrs?.find((attr) => attr?.code === code)?.value?.toLowerCase();
    if(val?.includes('lab')) val = 'lab-grown';
    if(val?.includes('%')) val = val?.replace(/%| /g, '');
    if(['diamond_carat_weight', 'diamond_depth_percent', 'diamond_table_percent'].includes(code)) val = parseFloat(val);
    return val;
}

// The original template called addFormToModal() on the "Send Email" button but the component never defined it
// (clicking threw a TypeError). Kept as an explicit no-op so the template compiles.
function addFormToModal() {}
</script>