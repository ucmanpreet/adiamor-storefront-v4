<template>
    <!-- Footer -->
    <footer :class="['bg-[#383838] mt-auto', isIndexPage ? '' : 'border-t border-grey-200']"
        aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="bg-[#585858] text-white">
            <div class="mx-auto max-w-7xl px-4 py-8 lg:py-16 lg:px-8 text-center sm:text-left">
                <div class="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div class="gap-4 lg:gap-8 grid grid-cols-3 lg:grid-cols-1 grid-rows-[auto_auto_1fr]">
                        <NuxtLink :to="STATIC_ROUTES.HOME" class="mr-auto" aria-label="Go to homepage">
                            <Icon name="footer-logo" class="h-8 sm:h-12 lg:h-[3.3]" aria-hidden="true"/>
                        </NuxtLink>
                        <address
                            class="leading-relaxed space-y-1.5 not-italic sm:space-y-2 lg:space-y-5 col-span-2 text-xs sm:text-base text-right sm:text-left">
                            <p v-html="$sanitize(store.officeAddress)"></p>
                            <ul class="flex flex-col gap-1.5 justify-end sm:justify-start">
                                <li>
                                    <a :href="`tel:${telPhoneNumber}`" aria-label="Call us at 877-627-5094"
                                        class="flex items-center justify-end sm:justify-start gap-2 hover:underline focus:underline">
                                        <Icon name="phone-fill" class="w-4 lg:w-5 h-4 lg:h-5" />
                                        <span>{{ phoneNumber }}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:Service@Adiamor.com"
                                        class="flex items-center justify-end sm:justify-start gap-2 hover:underline focus:underline">
                                        <Icon name="email-fill" class="w-4 lg:w-5 h-4 lg:h-5" />
                                        <span>Email Us</span>
                                    </a>
                                </li>
                            </ul>
                        </address>
                    </div>
                    <div class="col-span-2 gap-4 sm:gap-8 lg:col-span-2 xl:mt-0">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-8">
                            <div class="text-left" v-for="(item, index) in accordions" :key="index"
                                :class="index != 0 ? '' : ''">
                                <div class="flex items-center gap-2">
                                    <NuxtLink :to="item.titleLink"
                                        class="hidden sm:block text-xs sm:text-lg leading-6 uppercase cursor-pointer w-full flex-1 font-medium sm:font-light hover:underline focus:underline"
                                        >{{ item.title }}
                                    </NuxtLink>
                                    <button
									  v-if="isMobile"
                                      :aria-controls="`footer-accordion-${index}`"
                                      :aria-expanded="is_accordian_visible[index] ? 'true' : 'false'"
                                      :aria-label="`Toggle accordion for ${item.title}`"
                                      :aria-hidden="!isMobile ? 'true' : 'false'"
                                      @click="toggleAccordianMenu(index)"
                                      class="block sm:hidden text-xs sm:text-lg leading-6 uppercase cursor-pointer w-full text-left flex-1 font-medium sm:font-light hover:underline focus:underline"
                                      type="button">
                                        {{ item.title }}
                                    </button>
                                    <button
									  v-if="isMobile"
                                      :aria-controls="`footer-accordion-${index}`"
                                      :aria-expanded="is_accordian_visible[index] ? 'true' : 'false'"
                                      :aria-label="`Toggle accordion for ${item.title}`"
                                      :aria-hidden="!isMobile ? 'true' : 'false'"
                                      @click="toggleAccordianMenu(index)"
                                      type="button">
                                        <Icon name="down-arrow" class="w-4 h-4 sm:hidden" />
                                    </button>
                                </div>
                                <ul v-show="is_accordian_visible[index]" role="list" :id="`footer-accordion-${index}`"
                                    class="mt-3 lg:mt-6 sm:!block">
                                    <li v-for="(el, index1) in item.items" :key="index1">
                                        <a v-if="el.externalLink" :href="el.link" target="_blank"
                                            class="text-sm leading-6 hover:underline focus:underline"
                                            >{{ el.text }}
                                            <span v-if="el.isNew"
                                                class="ml-2 bg-primary py-1 px-2 rounded-full text-white text-xs">New</span>
                                        </a>
                                        <a v-else-if="el.icon == 'accessible' && !el.isThirdParty" :href="el.link"
                                            class="text-sm leading-6 hover:underline focus:underline"
                                            data-acsb-custom-trigger="true">{{ el.text }}
                                            <span v-if="el.isNew"
                                                class="ml-2 bg-primary py-1 px-2 rounded-full text-white text-xs">New</span>
                                        </a>
                                        <template v-else-if="el.isThirdParty">
                                            <a :href='el.link' :class='el.class' class="text-sm leading-6 hover:underline focus:underline">{{  el.text }}</a>
                                        </template>
                                        <NuxtLink v-else-if="el.link != 'javascript:void(0)' && el.icon != 'accessible' && !el.isThirdParty" :to="el.link"
                                            class="text-sm leading-6 hover:underline focus:underline">{{
                                                 el.text }}
                                            <span v-if="el.isNew"
                                                class="ml-2 bg-primary py-1 px-2 rounded-full text-white text-xs no-underline hover:no-underline focus:no-underline">New</span>
                                        </NuxtLink>
                                        <span v-else-if="el.link == 'javascript:void(0)' && el.icon != 'accessible' && !el.isThirdParty"
                                            class="text-sm leading-6"
                                            :tabindex="el.text === 'visitor_code' ? '0' : null"
                                            :aria-label="el.text === 'visitor_code' ? `Visitor ID: ${visitor_code || ($hydrated ? getVisitorCode : '')}` : null">
                                            <template v-if="el.text === 'visitor_code'">
                                                <span aria-hidden="true">{{ visitor_code || ($hydrated ? getVisitorCode : '') }}</span>
                                            </template>
                                            <template v-else>{{ el.text }}</template>
                                            <span v-if="el.isNew"
                                                class="ml-2 bg-primary py-1 px-2 rounded-full text-white text-xs">New</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-white">
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-8">
                <div class="py-3 sm:py-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-between items-center">
                    <p class="text-sm font-normal leading-5">&copy; 1999-{{ getCurrentYear }} Adiamor.com</p>
                    <ul class="flex items-center gap-3 sm:gap-6">
                        <li v-for="(item, index) in security_icon" :key="index">
                            <a v-if="item.link.includes('http')" :href="item.link" target="_blank" :aria-label="item.label">
                                <MediaImage :src="item.image" :alt="item.label" :width="item.width" :height="item.height" />
                            </a>
                        </li>
                    </ul>
                    <ul class="flex items-center gap-3 sm:gap-6">
                        <li v-for="(item, index) in brand_icon" :key="index">
                            <a :href="item.link" :aria-label="item.label">
                                <span v-html="$sanitize(item.newSvg ? item.newSvg : item.html)"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
import KEYS from "~/utils/constant.js";
import Icon from "~/components/common/Icon.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const store = useMainStore();
const route = useRoute();
const config = useRuntimeConfig().public;
const { $isMobile, $getVisitorCode } = useNuxtApp();

const is_accordian_visible = ref([]);
const visitor_code = ref('');
const security_icon = ref([
        { link: 'https://www.bbb.org/us/ca/los-angeles/profile/jewelry-stores/adiamor-1216-13137794/', image: `https://cdn.adiamor.com/landing-pages/Footer/bbb_gray.png?updatedAt=1748410293928`, label: 'BBB Accredited', width: '74', height: '28' },
        { link: 'https://www.digicert.com/what-is-ssl-tls-and-https', image: `https://cdn.adiamor.com/landing-pages/Footer/norton_gray.png?updatedAt=1748410293982`, label: 'Norton Shopping Guarantee', width: '73', height: '30' },
        { link: 'https://bizratesurveys.com/reviews/adiamor-reviews', image: `https://cdn.adiamor.com/landing-pages/Footer/bizrate_gray.png?updatedAt=1748410294013`, label: 'Verified Reviews', width: '71', height: '15' },
    ]);
const brand_icon = ref([
        {
            link: 'https://www.facebook.com/Adiamor', icon: ['fab', 'facebook-f'], label: "Facebook",
            html: `<svg class="w-4 sm:w-5 h-4 sm:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="currentColor"></path></svg>`,
            newSvg: `<svg class="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <title>Facebook</title> <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"> </path </svg>`
        },
        {
            link: 'https://twitter.com/Adiamor', icon: ['fab', 'twitter'], label: "Twitter",
            html: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
    </svg> `,
            newSvg: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"  fill="currentColor"><title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z">
        </path>
      </svg>`
        },
        {
            link: 'https://www.pinterest.com/Adiamor/', icon: ['fab', 'pinterest'], label: "Pinterest",
            html: `<svg class="w-4 sm:w-5 h-4 sm:h-5" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 496 512" ><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path></svg>`,
            newSvg: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0"></path>
            </svg>`
        },
        {
            link: 'https://www.instagram.com/adiamordiamonds', icon: ['fab', 'instagram'], label: "Instagram",
            html: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
            newSvg: `<svg class="h-5 sm:h-6 w-5 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <title>Instagram</title>
        <path fill-rule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clip-rule="evenodd" />
      </svg>`
        },
        {
            link: 'https://www.youtube.com/AdiamorDiamonds', icon: ['fab', 'youtube'], label: "Youtube",
            html: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path>
    </svg>`
        },
        {
            link: 'https://www.adiamor.com/blog/', icon: ['fas', 'rss'], label: "RSS",
            html: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
    <path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd"></path>
  </svg>`,
            newSvg: `<svg class="w-4 sm:w-5 h-4 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
    </svg>`
        },
    ]);
const accordions = ref([
        {
            title: 'Customer Service',
            titleLink: STATIC_ROUTES.CUSTOMER_SERVICE,
            items: [
                {
                    text: 'Free FedEx Shipping®',
                    link: STATIC_ROUTES.POLICIES_SHIPPING,
                    icon: false,
                    tradeSign: '&#174'
                },
                {
                    text: '30-Day Returns',
                    link: STATIC_ROUTES.POLICIES_RETURN,
                    icon: false
                },
                {
                    text: 'Jewelry Insurance',
                    link: STATIC_ROUTES.POLICIES_FINANCING_INSURANCE,
                    icon: false,
                    isNew: false,
                },
                {
                    text: 'Privacy Policy',
                    link: `${KEYS.IUBENDA_PREFIX}privacy-policy/${config.iubendaCookiePolicyID}`,
                    icon: false,
                    class: 'iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iubenda-noiframe',
                    isThirdParty: true

                },
                {
                    text: 'Cookie Policy',
                    link: `${KEYS.IUBENDA_PREFIX}privacy-policy/${config.iubendaCookiePolicyID}/cookie-policy`,
                    icon: false,
                    class: 'iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iubenda-noiframe',
                    isThirdParty: true
                },
                {
                    text: 'Terms and Conditions',
                    link: `${KEYS.IUBENDA_PREFIX}terms-and-conditions/${config.iubendaCookiePolicyID}`,
                    icon: false,
                    class: 'iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iubenda-noiframe',
                    isThirdParty: true
                }
            ]
        },
        {
            title: 'About Us',
            titleLink: STATIC_ROUTES.ABOUT,
            items: [
                {
                    text: 'Why Buy From Adiamor',
                    link: STATIC_ROUTES.WHY_SHOP,
                    icon: false
                },
                {
                    text: 'Adiamor Reviews',
                    link: STATIC_ROUTES.TESTIMONIALS,
                    icon: false
                },
                {
                    text: 'Flexible Financing',
                    link: STATIC_ROUTES.FLEXIBLE_FINANCING,
                    icon: false
                },
                {
                    text: 'Conflict-Free Policy',
                    link: STATIC_ROUTES.POLICIES_CONFLICT_FREE,
                    icon: false
                },
                {
                    text: 'Social Media Gallery',
                    link: STATIC_ROUTES.SOCIAL_MEDIA_GALLERY,
                    icon: false
                },
                {
                    text: 'Sitemap',
                    link: STATIC_ROUTES.SITEMAP,
                    icon: false,
                },
                {
                    text: 'Blog',
                    link: 'https://www.adiamor.com/blog/',
                    icon: false,
                    externalLink: true
                },
            ]
        },
        {
            title: 'Contact',
            titleLink: STATIC_ROUTES.CONTACT,
            items: [
                {
                    text: 'Accessibility',
                    link: STATIC_ROUTES.POLICIES_ACCESSIBILITY,
                    icon: false
                },
                {
                    text: 'Your Privacy Choices',
                    link: '#',
                    icon: false,
                    class: 'iubenda-cs-preferences-link',
                    isThirdParty: true
                },
                {
                    text: 'Notice at Collection',
                    link: '#',
                    icon: false,
                    class: 'iubenda-cs-uspr-link',
                    isThirdParty: true
                },
                {
                    text: 'visitor_code',
                    link: 'javascript:void(0)',
                    icon: false
                },
            ]
        }
    ]);
const width = ref(0);

const isIndexPage = computed(() => route.path === STATIC_ROUTES.HOME);
const getCurrentYear = computed(() => new Date().getFullYear());
const getVisitorCode = computed(() => $getVisitorCode());
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));
const isMobile = computed(() => $isMobile || width.value < 640);

const onResize = () => {
    width.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', onResize);
    let visitorCode = useCookie('visitorCode').value || '';
    if (!visitorCode) {
        getRandomString().then(code => { visitor_code.value = code; });
        return;
    }
    visitor_code.value = visitorCode;
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
});

function toggleAccordianMenu(index) {
    is_accordian_visible.value[index] = !is_accordian_visible.value[index];
}
async function getRandomString(n = 7) {
    let visitorCode = useCookie('visitorCode').value || '';
    if (visitorCode) return visitorCode; // If visitorCode exists, do nothing

    const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let randomString = '';

    for (let i = 0; i < n; i++) {
        const index = Math.floor(Math.random() * characters.length);
        randomString += characters[index];
    }

    // Set the visitorCode cookie with a 1-week expiration
    const cookie = useCookie('visitorCode', {
        path: STATIC_ROUTES.HOME,
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    cookie.value = randomString;
    return randomString;
}
</script>
