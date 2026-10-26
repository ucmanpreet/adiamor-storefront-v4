<template>
    <div v-click-outside="onClickOutside" class="flex align-middle items-center">
        <!-- Guest: Login link -->
        <NuxtLink v-if="!$store.state.userData" @click.prevent="handleLinkClick()" :to="loginPath"
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
                :aria-label="`User menu for ${$store.state.userData ? $store.state.userData.first_name : 'User'}`">
                <span class="w-4 h-4 bg-black rounded-full text-white flex items-center justify-center uppercase"
                    aria-hidden="true">
                    {{ $store.state.userData ? $store.state.userData.first_name[0] : 'U' }}
                </span>
            </button>

            <div v-if="$store.state.userData" v-show="isOpen" id="user-menu" ref="menu"
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

<script>
import Tooltip from '~/components/ui/Tooltip.vue';
import Icon from '~/components/common/Icon.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name: 'UserIcon',
    components: { Tooltip, Icon },

    data() {
        return {
            isOpen: false,
            loading: false,
            isLoggedIn: false,
            focusedIndex: -1,
            loginPath: STATIC_ROUTES.LOGIN,
            myAccountPath: STATIC_ROUTES.MY_ACCOUNT
        };
    },

    mounted() {
        this.isLoggedIn = this.$store.getters.isLoggedIn;
    },

    methods: {
        // ── Dropdown lifecycle ──────────────────────────────────────────────

        openDropdown() {
            this.isOpen = true;
            this.focusedIndex = 0;
            this.$nextTick(() => {
                this.focusMenuItem(0);
            });
        },

        closeDropdown() {
            this.isOpen = false;
            this.focusedIndex = -1;
        },

        toggleDropdown() {
            if (this.isOpen) {
                this.closeDropdown();
                this.$nextTick(() => this.$refs.triggerBtn?.focus());
            } else {
                this.openDropdown();
            }
        },

        // ── Focus management ───────────────────────────────────────────────

        getMenuItems() {
            // Returns the focusable menu item refs in DOM order
            return [this.$refs.menuItem0?.$el ?? this.$refs.menuItem0, this.$refs.menuItem1].filter(Boolean);
        },

        focusMenuItem(index) {
            const items = this.getMenuItems();
            if (items[index]) {
                this.focusedIndex = index;
                items[index].focus();
            }
        },

        // ── Keyboard: trigger button ────────────────────────────────────────

        onTriggerKeydown(e) {
            switch (e.key) {
                case 'Enter':
                case ' ':
                case 'ArrowDown':
                    e.preventDefault();
                    this.openDropdown();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.isOpen = true;
                    this.$nextTick(() => this.focusMenuItem(this.getMenuItems().length - 1));
                    break;
                case 'Escape':
                    this.closeDropdown();
                    break;
            }
        },

        // ── Keyboard: inside menu ───────────────────────────────────────────

        onMenuKeydown(e) {
            const items = this.getMenuItems();
            const total = items.length;

            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    this.closeDropdown();
                    this.$nextTick(() => this.$refs.triggerBtn?.focus());
                    break;

                case 'ArrowDown':
                    e.preventDefault();
                    this.focusMenuItem((this.focusedIndex + 1) % total);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    this.focusMenuItem((this.focusedIndex - 1 + total) % total);
                    break;

                case 'Home':
                    e.preventDefault();
                    this.focusMenuItem(0);
                    break;

                case 'End':
                    e.preventDefault();
                    this.focusMenuItem(total - 1);
                    break;

                case 'Tab':
                    // Tab forward moves to next item; Shift+Tab moves to previous.
                    // At the boundaries, close and let focus leave naturally.
                    if (!e.shiftKey && this.focusedIndex === total - 1) {
                        this.closeDropdown();
                    } else if (e.shiftKey && this.focusedIndex === 0) {
                        e.preventDefault();
                        this.closeDropdown();
                        this.$nextTick(() => this.$refs.triggerBtn?.focus());
                    } else {
                        e.preventDefault();
                        const next = e.shiftKey ? this.focusedIndex - 1 : this.focusedIndex + 1;
                        this.focusMenuItem(next);
                    }
                    break;
            }
        },

        // ── Click outside ───────────────────────────────────────────────────

        onClickOutside() {
            this.closeDropdown();
        },

        // ── Auth actions ────────────────────────────────────────────────────

        async logout() {
            this.closeDropdown();
            await this.$store.dispatch('logout', { context: this, router: this.$router });
            this.checkLoggedIn();
        },

        checkLoggedIn() {
            if (import.meta.client) {
                this.isLoggedIn = !!localStorage.getItem('token');
            } else {
                this.isLoggedIn = false;
            }
        },

        navigateMyAccount() {
            this.closeDropdown();
            this.$router.push(STATIC_ROUTES.MY_ACCOUNT);
        },

        handleLinkClick() {
            let routePath = this.loginPath;
            if (this.$route.path === routePath) {
                this.$router.push({ path: routePath, query: { refresh: Date.now() } });
            }
        },
    },

    watch: {
        '$route': 'checkLoggedIn',
    },
};
</script>