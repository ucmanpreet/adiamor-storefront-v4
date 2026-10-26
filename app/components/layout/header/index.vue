<template>
    <div ref="root">
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
<script setup>
import DesktopHeader from '~/components/layout/header/desktop/index.vue';
import MobileHeader from '~/components/layout/header/mobile/index.vue';
import CurrencySelector from '~/components/landing/CurrencySelector.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const store = useMainStore();

const root = ref(null);
// Never bound to an element in the template (as in the original), so closeMenu is effectively a no-op.
const menu = ref(null);
const sidebarMenu = ref(false);
const activeDropdown = ref(null);
const visitorCode = ref("");
const cart_item = ref([]);
const mobileNav = ref(false);
const inputSearchShow = ref(false);
const showCurrencyModal = ref(false);
const isFixed = ref(false);
const activeStripMsg = ref(0);
let stripTimer = null;

onMounted(() => {
    document.addEventListener('click', closeMenu);
    visitorCode.value = useCookie('visitorCode').value;
    window.addEventListener('scroll', handleScroll, { passive: true });
    cart_item.value = store.getCartItems;
    stripTimer = setInterval(() => {
        activeStripMsg.value = activeStripMsg.value === 0 ? 1 : 0;
    }, 4000);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', closeMenu);
    clearInterval(stripTimer);
});

function handleScroll() {
    const isMobile = window.innerWidth <= 640
    if (isMobile && window.scrollY > 40) {
        isFixed.value = true
    } else {
        isFixed.value = false
    }
}
function toggleDropdown(name) {
    activeDropdown.value = activeDropdown.value === name ? null : name;
}
function closeMenu(event) {
    menu.value && typeof menu.value.contains === 'function' && !menu.value.contains(event.target) ? activeDropdown.value = false : null;
}
function handleFocusOut(event) {
    const relatedTarget = event.relatedTarget;
    if (!root.value.contains(relatedTarget)) {
        mobileNav.value = false;
    }
}
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