<template>
    <div>
        <!-- Overlay -->
        <button v-if="mobileNav" class="bg-black/50 fixed inset-0 z-60 lg:hidden touch-none" aria-label="Close menu"
            @click="closeMenu" />
        <!-- Header -->
        <header
            class="bg-white border-b border-gray-200 relative z-65 lg:min-h-[9.099375rem] flex flex-col"
            @mouseleave="activeDropdown = ''" v-on:focusout="handleFocusOut">

            <!-- Top strip -->
            <div class="bg-gray-800 border-b border-primary/25">
                <div class="mx-auto flex items-center gap-3 max-w-7xl px-4 sm:px-6 lg:px-8 h-9">

                    <!-- Mobile: single rotating message -->
                    <div class="flex-1 sm:hidden h-full flex items-center justify-center overflow-hidden">
                        <transition name="strip-fade" mode="out-in">
                            <NuxtLink
                                v-if="activeStripMsg === 0"
                                key="msg0"
                                :to="STATIC_ROUTES.POLICIES_RETURN"
                                aria-label="Free shipping and easy return"
                                class="text-[10px] uppercase tracking-[0.14em] font-gill-sans text-white/85 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-gray-800"
                            >
                                <span aria-hidden="true" class="text-primary/70">✦</span>
                                Free Shipping &amp; Easy Returns
                            </NuxtLink>
                            <NuxtLink
                                v-else
                                key="msg1"
                                :to="STATIC_ROUTES.PROMOTIONS"
                                aria-label="Lab Grown diamonds on sale"
                                class="text-[10px] uppercase tracking-[0.14em] font-gill-sans text-white/85 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-gray-800"
                            >
                                <span aria-hidden="true" class="text-primary/70">◈</span>
                                Lab Grown Diamonds on Sale
                            </NuxtLink>
                        </transition>
                    </div>

                    <!-- Desktop: both messages static -->
                    <div class="hidden sm:flex flex-1 items-center justify-center gap-x-5">
                        <NuxtLink
                            :to="STATIC_ROUTES.POLICIES_RETURN"
                            aria-label="Free shipping and easy return"
                            class="text-[10px] uppercase tracking-[0.14em] font-gill-sans text-white/80 hover:text-white transition-colors flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-gray-800"
                        >
                            <span aria-hidden="true" class="text-primary/60">✦</span>
                            Free Shipping &amp; Easy Returns
                        </NuxtLink>
                        <span class="text-white/20" aria-hidden="true">|</span>
                        <NuxtLink
                            :to="STATIC_ROUTES.PROMOTIONS"
                            aria-label="Lab Grown diamonds on sale"
                            class="text-[10px] uppercase tracking-[0.14em] font-gill-sans text-white/80 hover:text-white transition-colors flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-gray-800"
                        >
                            <span aria-hidden="true" class="text-primary/60">◈</span>
                            Lab Grown Diamonds on Sale
                        </NuxtLink>
                    </div>

                    <!-- Currency selector -->
                    <CurrencySelector :key="$route.path" />
                </div>
            </div>

            <!-- Main nav -->
            <div :class="{ 'fixed z-65 inset-x-0 bg-white border-b border-gray-200': isFixed }">
                <DesktopHeader v-model:mobileNav="mobileNav" />
                <!-- Mobile menu, show/hide based on menu state. -->
                <MobileHeader v-model:mobileNav="mobileNav" :isFixed="isFixed" />
            </div>
        </header>
    </div>
</template>
<script>
import DesktopHeader from '~/components/layout/header/desktop/index.vue';
import MobileHeader from '~/components/layout/header/mobile/index.vue';
import CurrencySelector from '~/components/landing/CurrencySelector.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name: 'Header',
    components: { DesktopHeader, MobileHeader, CurrencySelector },
    data() {
        return {
            sidebarMenu: false,
            activeDropdown: null,
            visitorCode: "",
            cart_item: [],
            mobileNav: false,
            inputSearchShow: false,
            showCurrencyModal: false,
            isFixed: false,
            activeStripMsg: 0,
            stripTimer: null,
            STATIC_ROUTES
        };
    },
    mounted() {
        document.addEventListener('click', this.closeMenu);
        this.visitorCode = this.$cookies ? this.$cookies.get('visitorCode') : this.$store.getters.getResponse ? this.$store.getters.getResponse?.data?.visitor_code : '';
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.cart_item = this.$store.getters.getCartItems;
        this.stripTimer = setInterval(() => {
            this.activeStripMsg = this.activeStripMsg === 0 ? 1 : 0;
        }, 4000);
    },
    methods: {
        handleScroll() {
            const isMobile = window.innerWidth <= 640
            if (isMobile && window.scrollY > 40) {
                this.isFixed = true
            } else {
                this.isFixed = false
            }
        },
        toggleDropdown(name) {
            this.activeDropdown = this.activeDropdown === name ? null : name;
        },
        closeMenu(event) {
            this.$refs.menu && typeof this.$refs.menu.contains === 'function' && !this.$refs.menu.contains(event.target) ? this.activeDropdown = false : null;
        },
        handleFocusOut(event) {
            const relatedTarget = event.relatedTarget;
            if (!this.$el.contains(relatedTarget)) {
                this.mobileNav = false;
            }
        },
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.closeMenu);
        clearInterval(this.stripTimer);
    }
};
</script>

<style scoped>
.strip-fade-enter-active,
.strip-fade-leave-active {
    transition: opacity 0.35s ease;
}
.strip-fade-enter,
.strip-fade-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .strip-fade-enter-active,
    .strip-fade-leave-active {
        transition: none;
    }
}
</style>