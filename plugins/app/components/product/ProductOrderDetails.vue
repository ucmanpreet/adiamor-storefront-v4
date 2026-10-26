<template>
    <div class="flex flex-col text-xs sm:text-sm mt-8 bg-gray-100 gap-5 px-2 sm:px-4 py-5">
        <div class="flex gap-1 sm:gap-2 items-center">
            <Icon :name="checkDaysAhead(product) ? 'truck' : 'calendar'" class="w-5 h-5 inline-block align-middle flex-none" :class="checkDaysAhead(product) ? 'text-custom-green' : 'text-gray-black'" :aria-hidden="true"/>
            <div class="flex flex-col items-start flex-1">
                <p class="leading-snug gap-1 sm:gap-2" role="text" tabindex="0">
                    Order now for shipment as early as
                    <span class="font-medium">{{ getShippingText(product) }}</span>
                </p>
                <span class="inline-flex relative" v-if="checkNeedItSooner">
                    <button
                        type="button"
                        ref="needItSoonerBtn"
                        class="text-primary whitespace-nowrap flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
                        @click="showPop = !showPop"
                        @keydown.enter.prevent="showPop = !showPop"
                        :aria-expanded="showPop ? 'true' : 'false'"
                        aria-haspopup="dialog"
                    >
                        Need it sooner
                        <Icon name="info" class="w-4 h-4 ml-1" aria-hidden="true"/>
                    </button>
                    <Popover v-if="showPop" v-click-outside="closePopover" :product="product" placement="left" role="dialog" aria-modal="true" aria-label="Need it sooner" @close="showPop = false">
                        <p class="font-normal text-sm">
                            This ring is hand-made in our Los Angeles manufacturing facility and currently estimated to
                            ship on {{ getShippingText(product) }}. Should you need this item before
                            the estimated ship date, please contact our customer support
                            staff at {{ phoneNumber }}.
                        </p>
                    </Popover>
                </span>
            </div>
        </div>

        <div class="flex flex-wrap justify-between gap-2 text-xs sm:text-sm">
            <NuxtLink :to="STATIC_ROUTES.POLICIES_SHIPPING" target="_blank" aria-label="View Free Shipping policy">
                <div class="flex gap-1 sm:gap-1.5 items-center cursor-pointer">
                    <Icon name="free-shipping" class="w-5 h-5 text-gray-black" aria-hidden="true" />
                    <span>Free Shipping</span>
                </div>
            </NuxtLink>
            <NuxtLink :to="STATIC_ROUTES.POLICIES_RETURN" target="_blank" aria-label="View 30-Day Returns policy">
                <div class="flex gap-0.5 sm:gap-1.5 items-center cursor-pointer">
                    <Icon name="return-box" class="w-5 h-5 text-gray-black" aria-hidden="true" />
                    <span>30-Day Returns</span>
                </div>
            </NuxtLink>
            <NuxtLink :to="STATIC_ROUTES.POLICIES_WARRANTY" target="_blank" aria-label="View Lifetime Warranty policy">
                <div class="flex gap-0.5 sm:gap-1.5 items-center cursor-pointer">
                    <Icon name="check-verified" class="w-5 h-5 text-gray-black" aria-hidden="true" />
                    <span>Lifetime Warranty</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
<script>
import lang from '~/utils/commonLocale.js';
import Icon from "~/components/common/Icon.vue";
import Popover from "~/components/product/Popover.vue";
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : 'ProductOrderDetails',
    components: { Icon, Popover },
    props: ['product'],
    data() {
        return {
            showPop: false,
            lang,
            STATIC_ROUTES
        }
    },
    watch: {
        showPop(val) {
            if (val) {
                document.addEventListener('keydown', this.handleEsc);
            } else {
                document.removeEventListener('keydown', this.handleEsc);
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleEsc);
    },
    methods: {
        handleEsc(e) {
            if (e.key === 'Escape') {
                this.showPop = false;
                this.$nextTick(() => {
                    this.$refs.needItSoonerBtn?.focus();
                });
            }
        },
        closePopover(event) {
            if (!(this.$el === event.target || this.$el.contains(event.target))) {
                this.showPop = false;
            }
        },
        getShippingText(product) {
			return product?.shipping?.message ? product.shipping?.message : lang.moreThanSevenDays;
		},
        checkDaysAhead(product){
          return product?.shipping?.days > 0 && product?.shipping?.days < 4;
		},
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        checkNeedItSooner() {
            if (this.isBundleView) return true;
            return this.product && this.product?.type != 'simple';
        },
        isBundleView() {
			return this.$route.name === 'yourSettingPage';
		},
    },
}
</script>
