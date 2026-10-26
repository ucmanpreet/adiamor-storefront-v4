<template>
    <div>
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/education-wide.jpg?updatedAt=1747976883375`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            alt="Flexible Financing Options with Adiamor"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Flexible Financing Options with
                Adiamor</h1>
            <p class="text-sm sm:text-lg lg:text-xl">Adiamor allows flexible payments including Affirm, Paypal
                Credit and the ability to split your payment across multiple credit cards.</p>
        </Banner>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 2xl:gap-8">
                <div class="flex flex-col gap-4 2xl:gap-8 border border-gray-200 p-6 2xl:p-8">
                    <div>
                        <div class="space-y-4">
                            <div class="h-24 max-w-[6rem]">
                                <MediaImage :src="$asset('~/assets/images/payment/affirm.webp')" className="w-full h-full object-contain mx-auto" alt="Affirm"/>
                            </div>
                            <p>As low as 0% APR financing. Up to 12 month payment terms</p>
                        </div>
                        <ul class="mt-4 list-disc pl-4">
                            <li>Prequalify in seconds</li>
                            <li>Easy monthly payments over 3, 6 or 12 months</li>
                            <li>Select Affirm at Checkout</li>
                        </ul>
                    </div>
                    <div class="mt-auto">
                        <div class="mt-auto">
                        <button
                            type="button"
                            class="relative inline-block px-2 py-[0.563rem] font-medium text-xs sm:text-sm uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white cursor-pointer transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            Prequalify Now
                            <span class="absolute inset-0 z-10 opacity-0 flex items-center justify-center">
                            <AffirmPromotional
                                :price="affirmPrice"
                                :hidePaypal="true"
                                :fillContainer="true"
                            />
                            </span>
                        </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 2xl:gap-8 border border-gray-200 p-6 2xl:p-8">
                    <div>
                        <a
                            href="https://www.paypal.com/credit-application/paypal-credit/da/us/landing?fromCape=true"
                            class="space-y-4 focus:outline-none focus:ring-2 focus:ring-primary inline-block"
                            target="_blank"
                            rel="noopener"
                            aria-label="Learn more about PayPal Credit financing, opens in a new tab"
                            @click="$bus.emit('aria-announce','Opening PayPal Credit financing page in a new tab')"
                        >
                            <div class="h-24 max-w-[6rem]">
                                <MediaImage :src="$asset('~/assets/images/payment/paypal-logo.webp')" className="w-full h-full object-contain mx-auto" alt="PayPal Credit financing logo"/>
                            </div>
                            <p>No interest if paid in full in 6 months on purchases of $99+</p>
                        </a>
                        <ul class="mt-4 list-disc pl-4 text-left text-sm/7">
                            <li>Buy now, pay later</li>
                            <li>6 months special financing on purchases of $99+</li>
                            <li>Select Paypal at Checkout</li>
                        </ul>
                    </div>
                    <div class="mt-auto">
                        <a
                            href="https://www.paypal.com/credit-application/paypal-credit/da/us/landing?fromCape=true"
                            class="inline-block px-8 font-medium py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white uppercase font-gill-sans tracking-[0.125rem] hover:bg-primary/90"
                            target="_blank"
                            rel="noopener"
                            aria-label="Apply now for PayPal Credit, opens in a new tab"
                            @click="$bus.emit('aria-announce','Opening PayPal Credit application page in a new tab')"
                        >
                            Apply Now
                        </a>
                    </div>
                </div>
                <div class="flex flex-col gap-4 2xl:gap-8 border border-gray-200 p-6 2xl:p-8">
                    <div>
                        <NuxtLink
                            :to="STATIC_ROUTES.HOME"
                            class="space-y-4 focus:outline-none focus:ring-2 focus:ring-primary inline-block"
                            aria-label="Shop and split payment across multiple cards"
                            @click="$bus.emit('aria-announce','Navigating to shop page for split payment option')"
                        >
                            <div class="h-24 max-w-[6rem]">
                                <MediaImage :src="$asset('~/assets/images/payment/credit-card.webp')" className="w-full h-full object-contain mx-auto" alt="Credit card split payment option"/>
                            </div>
                            <p>Customize your payment across multiple cards or accounts</p>
                        </NuxtLink>
                        <ul class="mt-4 list-disc pl-4 text-left text-sm/7">
                            <li>Pay how you like</li>
                            <li>Place your order and our staff will contact you</li>
                            <li>Select Split Pay at Checkout</li>
                        </ul>
                    </div>
                    <div class="mt-auto">
                        <NuxtLink
                            :to="STATIC_ROUTES.HOME"
                            class="inline-block px-8 font-medium py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white uppercase font-gill-sans tracking-[0.125rem] hover:bg-primary/90"
                            aria-label="Shop now and use split payment option"
                            @click="$bus.emit('aria-announce','Navigating to shop page')"
                        >
                            Shop Now
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import AffirmPromotional from "~/components/payment/AffirmPromotional.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import KEYS from "~/utils/constant.js";
export default {
    name : "FlexibleFinancingPage",
    components: { Banner, AffirmPromotional, ContactLink, MediaImage },
    data() {
        return {
            STATIC_ROUTES
        }
    },
    computed: {
        affirmPrice() {
            return KEYS.AFFIRM_PDP_HIGHEST_PRICE;
        }
    },
    mounted() {
        this.$bus.emit(
            "aria-announce",
            "Flexible Financing Options page loaded"
        );
    }
}
</script>
