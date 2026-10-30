<template>
    <div v-click-outside="onClickOutside" class="flex align-middle items-center">
        <!-- Guest: Login link -->
        <NuxtLink v-if="!hydrated || !store.userData" @click.prevent="handleLinkClick()" :to="loginPath"
            aria-label="Login" class="flex items-center">
            <Tooltip :text="`Login`">
                <Icon name="user" class="w-4 h-4" aria-hidden="true" />
            </Tooltip>
        </NuxtLink>

        <!-- Authenticated: Avatar + Dropdown -->
        <div class="relative flex" v-else>
            <button ref="triggerBtn" type="button" @click.prevent="toggleDropdown" @keydown="onTriggerKeydown"
                class="relative right-0 z-50 p-2 -m-2" :aria-expanded="isOpen.toString()"
                aria-haspopup="menu" aria-controls="user-menu"
                :aria-label="`User menu for ${store.userData ? store.userData.first_name : 'User'}`">
                <span class="w-4 h-4 bg-black rounded-full text-white flex items-center justify-center uppercase"
                    aria-hidden="true">
                    {{ store.userData ? store.userData.first_name[0] : 'U' }}
                </span>
            </button>

            <div v-if="store.userData" v-show="isOpen" id="user-menu" ref="menu"
                class="absolute right-0 z-20 mt-3 w-40 origin-top-right bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-label="User menu" tabindex="-1" @keydown="onMenuKeydown">
                <div class="py-1 divide-y divide-gray-200">
                    <NuxtLink ref="menuItem0" :to="myAccountPath"
                        class="block px-4 py-2 text-sm hover:text-primary focus:outline-none focus:bg-gray-100 focus:text-primary focus:ring-2 focus:ring-inset focus:ring-primary"
                        role="menuitem" tabindex="-1" @click="closeDropdown" @keydown.enter.prevent="navigateMyAccount">
                        My Account
                    </NuxtLink>
                    <button ref="menuItem1" type="button"
                        class="block w-full px-4 py-2 text-left text-sm hover:text-primary focus:outline-none focus:bg-gray-100 focus:text-primary focus:ring-2 focus:ring-inset focus:ring-primary"
                        role="menuitem" tabindex="-1" @click="logout" @keydown.enter.prevent="logout">
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Tooltip from '~/components/ui/Tooltip.vue';
import Icon from '~/components/common/Icon.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const store = useMainStore();
const route = useRoute();
const router = useRouter();

// userData comes from localStorage (client only), so the server always renders the guest link; switch after hydration
const hydrated = ref(false);
const isOpen = ref(false);
const loading = ref(false);
const isLoggedIn = ref(false);
const focusedIndex = ref(-1);
const loginPath = STATIC_ROUTES.LOGIN;
const myAccountPath = STATIC_ROUTES.MY_ACCOUNT;

const triggerBtn = ref(null);
const menu = ref(null);

onMounted(() => {
    hydrated.value = true;
    isLoggedIn.value = store.isLoggedIn;
});

watch(() => route.fullPath, checkLoggedIn);

// ── Dropdown lifecycle ──────────────────────────────────────────────

function openDropdown() {
    isOpen.value = true;
    focusedIndex.value = 0;
    nextTick(() => {
        focusMenuItem(0);
    });
}

function closeDropdown() {
    isOpen.value = false;
    focusedIndex.value = -1;
}

function toggleDropdown() {
    if (isOpen.value) {
        closeDropdown();
        nextTick(() => triggerBtn.value?.focus());
    } else {
        openDropdown();
    }
}

// ── Focus management ───────────────────────────────────────────────

function getMenuItems() {
    // Returns the focusable menu items (NuxtLink anchor + sign-out button) in DOM order
    return Array.from(menu.value?.querySelectorAll('[role="menuitem"]') ?? []);
}

function focusMenuItem(index) {
    const items = getMenuItems();
    if (items[index]) {
        focusedIndex.value = index;
        items[index].focus();
    }
}

// ── Keyboard: trigger button ────────────────────────────────────────

function onTriggerKeydown(e) {
    switch (e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
            e.preventDefault();
            openDropdown();
            break;
        case 'ArrowUp':
            e.preventDefault();
            isOpen.value = true;
            nextTick(() => focusMenuItem(getMenuItems().length - 1));
            break;
        case 'Escape':
            closeDropdown();
            break;
    }
}

// ── Keyboard: inside menu ───────────────────────────────────────────

function onMenuKeydown(e) {
    const items = getMenuItems();
    const total = items.length;

    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeDropdown();
            nextTick(() => triggerBtn.value?.focus());
            break;

        case 'ArrowDown':
            e.preventDefault();
            focusMenuItem((focusedIndex.value + 1) % total);
            break;

        case 'ArrowUp':
            e.preventDefault();
            focusMenuItem((focusedIndex.value - 1 + total) % total);
            break;

        case 'Home':
            e.preventDefault();
            focusMenuItem(0);
            break;

        case 'End':
            e.preventDefault();
            focusMenuItem(total - 1);
            break;

        case 'Tab':
            // Tab forward moves to next item; Shift+Tab moves to previous.
            // At the boundaries, close and let focus leave naturally.
            if (!e.shiftKey && focusedIndex.value === total - 1) {
                closeDropdown();
            } else if (e.shiftKey && focusedIndex.value === 0) {
                e.preventDefault();
                closeDropdown();
                nextTick(() => triggerBtn.value?.focus());
            } else {
                e.preventDefault();
                const next = e.shiftKey ? focusedIndex.value - 1 : focusedIndex.value + 1;
                focusMenuItem(next);
            }
            break;
    }
}

// ── Click outside ───────────────────────────────────────────────────

function onClickOutside() {
    closeDropdown();
}

// ── Auth actions ────────────────────────────────────────────────────

async function logout() {
    closeDropdown();
    await store.logout();
    checkLoggedIn();
}

function checkLoggedIn() {
    if (import.meta.client) {
        isLoggedIn.value = !!localStorage.getItem('token');
    } else {
        isLoggedIn.value = false;
    }
}

function navigateMyAccount() {
    closeDropdown();
    router.push(STATIC_ROUTES.MY_ACCOUNT);
}

function handleLinkClick() {
    let routePath = loginPath;
    if (route.path === routePath) {
        router.push({ path: routePath, query: { refresh: Date.now() } });
    }
}
</script>