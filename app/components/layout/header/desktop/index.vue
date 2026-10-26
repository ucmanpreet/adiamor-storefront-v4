<template>
    <div class="flex flex-col flex-1">

        <!-- Backdrop — hidden while reCAPTCHA challenge is open -->
        <div
            ref="menuBackDrop"
            class="fixed mt-[145.59px] bg-black/30 inset-0 z-0"
            v-if="activeDropdown && !recaptchaActive"
            @click="close"
            aria-hidden="true">
        </div>

        <!-- Top Header -->
        <div class="mx-auto max-w-7xl px-4 lg:px-8 py-5 w-full relative z-0 lg:z-10">
            <div class="flex items-center justify-between">
                <ul class="flex gap-4 lg:gap-6 items-center lg:items-start" role="list">
                    <li class="lg:hidden">
                        <HamburgerMenu @toggle-menu="onToggleMenu" :mobileNav="mobileNav" @click.stop />
                    </li>

                    <li class="items-center h-full">
                        <NuxtLink :to="STATIC_ROUTES.CONTACT" class="hidden sm:inline-flex items-center text-xs leading-none"
                            aria-label="Contact Adiamor at 877-627-5094">
                            {{ phoneNumber }}
                        </NuxtLink>

                        <a :href="`tel:${telPhoneNumber}`" class="inline-block sm:hidden p-1"
                            aria-label="Call customer service">
                            <Icon name="phone" class="w-4 h-4" aria-hidden="true" />
                        </a>
                    </li>

                    <li class="hidden lg:flex items-center">
                        <Tooltip :text="`Help Desk`">
                            <button type="button" class="p-1" aria-label="Open help desk"
                                @click="$openHelpDesk()">
                                <Icon name="message" class="w-4 h-4" aria-hidden="true" />
                            </button>
                        </Tooltip>
                    </li>

                    <li class="hidden lg:flex items-center">
                        <Tooltip :text="`Email`">
                            <a href="mailto:Service@Adiamor.com" class="p-1" aria-label="Send email to support">
                                <Icon name="email" class="w-4 h-4" aria-hidden="true" />
                            </a>
                        </Tooltip>
                    </li>
                </ul>

                <ul class="flex gap-4 lg:gap-6 items-center" role="list">
                    <li>
                        <SearchComponent v-model:activeDropdown="activeDropdown" />
                    </li>

                    <li class="relative hidden lg:inline-flex">
                        <WishlistButton :wishlist="wishlist" :wishlistCount="wishlistCount" :key="wishlist?.length" />
                    </li>

                    <li class="relative hidden lg:inline-flex">
                        <CartButton :cartlist="cart" :cartlistCount="cartCount" :visitorCode="visitorCode" />
                    </li>

                    <li class="hidden lg:inline-flex">
                        <UserIcon />
                    </li>
                </ul>
            </div>
        </div>

        <!-- Logo + Nav -->
        <div
            class="absolute max-w-[140px] mx-auto lg:mx-0 lg:max-w-none lg:static inset-x-0 z-0 py-1.5 lg:py-0 lg:bg-white">
            <div class="relative mt-auto">
                <div
                    class="mx-auto max-w-7xl px-4 lg:px-8 flex lg:flex-col gap-y-4 items-center justify-center pb-2.5 lg:pb-0">

                    <NuxtLink :to="STATIC_ROUTES.HOME" class="lg:-mt-6 flex flex-shrink-0 items-center xl:h-[48.59px]"
                        aria-label="Adiamor home">
                        <Icon name="logo" class="w-[8.75rem] lg:w-[12.5rem]" alt="Adiamor Logo" aria-hidden="true" />
                    </NuxtLink>

                    <!-- MAIN NAV -->
                    <nav ref="nav" class="hidden lg:flex lg:justify-between text-sm" aria-label="Global navigation"
                        role="navigation" @mouseleave="onNavMouseLeave" @keydown.esc.stop.prevent="close">

                        <!-- Parent Menus -->
                        <div class="flex items-center lg:space-x-6 2xl:space-x-9 pb-2.5"
                            v-if="menuItems && menuItems.length">
                            <template v-for="item in menuItems" :key="`${item.path}-${item.label}`">
<div  
                                v-if="item.desktop !== false">

                                <!-- External -->
                                <a v-if="item.external" :href="item.path" :key="item.label"
                                    class="inline-block hover:text-primary focus:text-primary tk-gill-sans-nova uppercase tracking-widest-lg"
                                    :class="{
                                        'text-black': item.highlight,
                                        'font-medium text-primary': $route.path === item.path,
                                        'sm:hidden': item.desktop === false
                                    }" @mouseover="toggleDropdown(item.dropdown, true)"
                                    :id="item.dropdown ? 'nav-' + item.dropdown : null"
                                    :aria-controls="item.dropdown ? 'dropdown-' + item.dropdown : null" target="_blank"
                                    rel="noopener">
                                    {{ item.label }}
                                </a>

                                <!-- Internal -->
                                <NuxtLink v-else :to="item.path" :key="`${item.path}-${item.label}`"
                                    class="inline-block hover:text-primary focus:text-primary tk-gill-sans-nova uppercase tracking-widest-lg"
                                    :class="{
                                        'font-medium text-primary': $route.path === item.path || activeDropdown === item.dropdown,
                                        'text-black': item.highlight,
                                        'sm:hidden': item.desktop === false
                                    }" @mouseover="toggleDropdown(item.dropdown, true)"
                                    :id="item.dropdown ? 'nav-' + item.dropdown : null"
                                    :aria-controls="item.dropdown ? 'dropdown-' + item.dropdown : null"
                                >
                                    {{ item.label }}
                                </NuxtLink>

                                <!-- DROPDOWN CONTAINER -->
                                <div ref="menu"
                                    class="lg:block absolute inset-x-0 top-full bg-white border-t border-gray-200"
                                    v-if="item.dropdown && activeDropdown == item.dropdown"
                                    :id="'dropdown-' + item.dropdown"
                                    :aria-labelledby="'nav-' + item.dropdown">
                                    <div class="mx-auto max-w-7xl px-4 lg:px-8">
                                        <div class="origin-top mx-auto max-w-7xl bg-white z-10">
                                            <div class="flex gap-4 lg:gap-8">

                                                <!-- LEFT CONTENT -->
                                                <div :class="[activeLayoutClass, activeDropdown ? 'py-10 flex-1' : '']">

                                                    <!-- SECTIONS -->
                                                    <div v-for="(section, index) in activeMenuData.sections"
                                                        :key="section.title || index" class="space-y-4">
                                                        <!-- Section Title -->
                                                        <div>
                                                            <NuxtLink :to="section.link"
                                                                class="text-base/6 font-semibold uppercase hover:text-primary">
                                                                {{ section.title }}
                                                            </NuxtLink>
                                                        </div>

                                                        <!-- Sub Items -->
                                                        <div v-if="section.items" :class="section.itemParentClass">
                                                            <template v-for="(subItem) in getActiveItems(section)">
                                                                <template
                                                                    v-if="!['address', 'phone_number'].includes(subItem?.value)">
                                                                    <NuxtLink v-if="!subItem.external"
                                                                        :key="subItem.name"
                                                                        :to="{ path: subItem.href, query: null }"
                                                                        class="flex items-center gap-x-2 capitalize text-sm/6 font-normal text-gray-black hover:text-primary"
                                                                        @click="close()">
                                                                        <Icon v-if="subItem.icon" :name="subItem.icon"
                                                                            class="w-5 h-5 flex-none" />
                                                                        {{ subItem.name }}
                                                                    </NuxtLink>

                                                                    <a v-else :key="`${subItem.href}-${subItem.name}`"
                                                                        :href="subItem.href" class="flex items-center"
                                                                        target="_blank" rel="noopener">
                                                                        {{ subItem.name }}
                                                                    </a>
                                                                </template>
                                                            </template>
                                                        </div>

                                                        <!-- Footer Link -->
                                                        <div v-if="section.footerLink">
                                                            <NuxtLink :to="section.footerLink.href"
                                                                class="hover:text-primary font-normal text-sm">
                                                                {{ section.footerLink.name }}
                                                            </NuxtLink>
                                                        </div>

                                                        <!-- Static Section (About Us special case) -->
                                                        <div v-if="section.type === 'static'">
                                                            <div v-for="subItem in section.items" :key="subItem.name">
                                                                <a v-if="subItem.value === 'address'"
                                                                    :href="subItem.href"
                                                                    v-html="$sanitize(formattedAddress)" />
                                                                <a v-if="subItem.value === 'phone_number'"
                                                                    :href="`tel:${telPhoneNumber}`">
                                                                    {{ phoneNumber }}
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <!-- CustomLiveAgentForm section -->
                                                        <div v-if="section.showCompnent">
                                                            <CustomLiveAgentForm
                                                                :key="activeDropdown"
                                                                type="contact-us-header"
                                                                @fileInputClicked="onFileInputClick"
                                                                @recaptchaClicked="onRecaptchaClick"
                                                                @recaptchaClosed="onRecaptchaClosed"
                                                                @recaptchaSubmitted="onRecaptchaClosed"
                                                            />
                                                        </div>

                                                    </div>
                                                </div>

                                                <!-- RIGHT IMAGE -->
                                                <div class="w-72 lg:w-80" v-if="activeMenuImage">
                                                    <MediaImage :src="activeMenuImage"
                                                        className="w-full h-full object-cover" :alt="activeDropdown" />
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
</template>
                        </div>

                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { menuItems as menuItemsData, diamondSubMenu as diamondSubMenuData, engagementRingSubMenu as engagementRingSubMenuData, weddingRingSubMenu as weddingRingSubMenuData, diamondJewelrySubMenu as diamondJewelrySubMenuData, educationSubMenu as educationSubMenuData, aboutUsSubMenu as aboutUsSubMenuData } from '@/utils/menu.js';
import SearchComponent from '~/components/navigation/Search.vue';
import HamburgerMenu from '~/components/ui/HamburgerMenu.vue';
import Icon from '~/components/common/Icon.vue';
import Tooltip from '~/components/ui/Tooltip.vue';
import WishlistButton from '~/components/popover/WishlistButton.vue';
import CartButton from '~/components/popover/CartButton.vue';
import UserIcon from '~/components/navigation/UserIcon.vue';
import MediaImage from '~/components/common/MediaImage.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import CustomLiveAgentForm from '~/components/form/CustomLiveAgentForm.vue';

const props = defineProps(['mobileNav']);
const emit = defineEmits(['update:mobileNav']);

const store = useMainStore();

// template refs ("menu" is inside a v-for, so it holds an array)
const menuBackDrop = ref(null);
const nav = ref(null);
const menu = ref(null);

const activeDropdown = ref(null);
const visitorCode = ref("");
const wishlistCount = ref(null);
const wishlist = ref([]);
const cartCount = ref(null);
const cart = ref([]);
const desktopNav = ref(false);
const menuItems = ref(menuItemsData ?? []);
const diamondSubMenu = ref(diamondSubMenuData ?? []);
const engagementRingSubMenu = ref(engagementRingSubMenuData ?? []);
const weddingRingSubMenu = ref(weddingRingSubMenuData ?? []);
const diamondJewelrySubMenu = ref(diamondJewelrySubMenuData ?? []);
const educationSubMenu = ref(educationSubMenuData ?? []);
const aboutUsSubMenu = ref(aboutUsSubMenuData ?? []);
const isNavOpen = ref(false);
const shapeData = ref(null);
const suppressClose = ref(false);
const recaptchaActive = ref(false);

watch(() => store.wishList.length, () => {
    checkWishlistCount();
});
watch(() => store.cartItems.length, () => {
    checkCartCount();
});
watch(() => store.wishListData, () => {
    checkWishlistCount();
});
watch(() => store.heartCount, () => {
    checkWishlistCount();
});
watch(() => props.mobileNav, (val) => {
    desktopNav.value = val;
});
watch(() => store.diamondsFilters, (newValue, oldValue) => {
    const val = newValue ?? oldValue;
    if (val && typeof val === 'object' && Object.keys(val).length) {
        const defaultShapeData = val['SHAPE'] ?? null;
        shapeData.value = defaultShapeData?.value ?? null;
    }
}, { deep: true, immediate: true });

onMounted(() => {
    desktopNav.value = props.mobileNav;
    document.addEventListener('click', closeMenu);
    visitorCode.value = useCookie('visitorCode').value;
    checkWishlistCount();
    checkCartCount();
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeMenu);
});

const activeMenuData = computed(() => ({
    diamonds: diamondSubMenu.value,
    engagementRing: engagementRingSubMenu.value,
    wedding: weddingRingSubMenu.value,
    jewelry: diamondJewelrySubMenu.value,
    education: educationSubMenu.value,
    aboutUs: aboutUsSubMenu.value
}[activeDropdown.value] || { sections: [] }));

const activeMenuImage = computed(() => ({
    diamonds: 'https://cdn.adiamor.com/landing-pages/header/header-diamond?updatedAt=1746457209110',
    engagementRing: 'https://cdn.adiamor.com/landing-pages/header/header-engagement?updatedAt=1746457216640',
    wedding: 'https://cdn.adiamor.com/landing-pages/header/header-weddings?updatedAt=1746457245408',
    jewelry: 'https://cdn.adiamor.com/landing-pages/header/header-jewelry?updatedAt=1746457219151',
    education: 'https://cdn.adiamor.com/landing-pages/header/header-education?updatedAt=1746457213295',
    aboutUs: null
}[activeDropdown.value]));

const activeLayoutClass = computed(() => ({
    diamonds: 'flex justify-between xl:grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10',
    engagementRing: 'grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10',
    wedding: 'grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10',
    jewelry: 'grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10',
    education: 'grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10',
    aboutUs: 'grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-10'
}[activeDropdown.value]));

const formattedAddress = computed(() => store.officeAddress?.replace(', CA', '<br>CA'));
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));

const activeDropdownLabel = computed(() => {
    if (!activeDropdown.value || !menuItems.value || !menuItems.value.length) {
        return '';
    }
    const item = menuItems.value.find(
        (menuItem) => menuItem.dropdown && menuItem.dropdown === activeDropdown.value
    );
    return item && item.label ? item.label : '';
});

// ── File input ────────────────────────────────────────────────
function onFileInputClick() {
    suppressClose.value = true;
    // OS file picker steals focus; reset suppress after it opens
    setTimeout(() => { suppressClose.value = false; }, 500);
}

// ── reCAPTCHA challenge opened (mousedown on widget) ──────────
function onRecaptchaClick() {
    recaptchaActive.value = true;
    suppressClose.value = true;
}

// ── reCAPTCHA challenge closed (solved, dismissed, or form submitted) ──
function onRecaptchaClosed() {
    recaptchaActive.value = false;
    suppressClose.value = false;
}

function onNavMouseLeave() {
    if (recaptchaActive.value || suppressClose.value) return;
    close();
}

function getActiveItems(section) {
    if (typeof getAlignedData === 'function') {
        return getAlignedData(section);
    }
    return section.items || [];
}

function getAlignedData(section, code = null) {
    const menuItems = section?.items ?? section;
    if (!menuItems) return [];
    if (section?.code !== 'shape' && !code) return menuItems;
    if (Array.isArray(shapeData.value)) {
        const sortedMenuItems = shapeData.value
            .map(shape => menuItems.find(item => item.icon === shape.code || item.admin_name === shape.code))
            .filter(Boolean);
        return sortedMenuItems.length ? sortedMenuItems : menuItems;
    }
    return menuItems;
}

function onToggleMenu() {
    emit('update:mobileNav', desktopNav.value = !desktopNav.value);
}

function checkWishlistCount() {
    if (!localStorage.getItem('token')) {
        wishlist.value = store.wishList;
    } else {
        wishlist.value = store.loggedInWishList;
    }
    wishlistCount.value = wishlist.value?.length ?? 0;
}

async function checkCartCount() {
    cart.value = await store.cartItems;
    if (cart.value) cartCount.value = cart.value?.length;
    if (!cartCount.value) {
        cart.value = await store.cartItems;
        if (cart.value && cart.value?.length > 0) {
            cartCount.value = cart.value?.length;
        }
    }
    cart.value = await store.cartItems;
}

function toggleDropdown(name, forceOpen = false) {
    if (recaptchaActive.value) return;
    if (forceOpen) {
        activeDropdown.value = name;
    } else {
        activeDropdown.value = activeDropdown.value === name ? null : name;
    }
}

function closeMenu(event) {
    // Block while reCAPTCHA challenge or file picker is active
    if (recaptchaActive.value || suppressClose.value) return;

    // Cross-origin iframe clicks (reCAPTCHA challenge iframe) arrive
    // with event.target === null — ignore them entirely
    if (!event.target) return;
    const target = event.target;
    if (target && target.tagName === 'IFRAME') {
        const src = target.src || '';
        if (src.includes('recaptcha')) {
            recaptchaActive.value = true;
            suppressClose.value = true;
            return;
        }
    }

    const menus = Array.isArray(menu.value)
        ? menu.value
        : (menu.value ? [menu.value] : []);
    const insideMenu = menus.some(el => el && el.contains(event.target));
    const insideNav = nav.value?.contains(event.target);
    if (!insideMenu && !insideNav) activeDropdown.value = null;
}

function close() {
    if (recaptchaActive.value || suppressClose.value) return;
    activeDropdown.value = null;
    document.body.classList.remove('overflow-hidden');
}
</script>