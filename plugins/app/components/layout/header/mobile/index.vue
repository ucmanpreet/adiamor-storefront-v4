<template>
    <nav ref="menu" @click.stop @touch.stop
        class="absolute w-72 z-65 lg:hidden bg-white !text-sm border-t border-b border-gray-200 divide-y divide-gray-200 shadow-2xl overflow-hidden"
        :class="[ isFixed ? 'h-[calc(100dvh-56px)]' : 'h-[calc(100dvh-96px)]', {'hidden': !mobileNav && !activeDropdown}]"
        aria-label="Mobile primary navigation"
        role="navigation"
        id="mobile-menu"
        tabindex="-1">
        <span class="sr-only" aria-live="polite" role="status">{{ announcement }}</span>
        <template v-for="item in filteredMenuItems" :key="item.label">
            <div class="flex items-center justify-between px-4" v-bind="item">
                <a v-if="item.external" :href="item.path" :key="item.label" class="w-full py-2 text-sm tk-gill-sans-nova uppercase" :class="{
                    'text-black': item.highlight,
                    'font-medium text-primary': $route.path === item.path
                }" target="_blank" rel="noopener">
                    {{ item.label }}
                </a>
                <NuxtLink v-else-if="item?.isRedirection"
                    :to="item.label === 'My bag' ? item.path + ($hydrated ? getVisitorCode : '') : item.path"
                    class="w-full py-2 text-sm tk-gill-sans-nova uppercase flex items-center gap-2"
                    :key="item.label"
                    :class="{ 'font-medium text-primary': $route.path === item.path || activeDropdown === item.dropdown, 'text-black': item.highlight }"
                    @click="closeAfterRedirection()">
                    <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4 flex-none" />
                    {{ item.label }}
                </NuxtLink>
                <button
                    @click="toggleDropdown(item.dropdown)"
                    type="button"
                    v-else
                    class="w-full py-2 text-sm tk-gill-sans-nova uppercase flex items-center gap-2"
                    :id="item.dropdown ? item.dropdown + '-toggle' : null"
                    :aria-expanded="item.dropdown && activeDropdown === item.dropdown ? 'true' : 'false'"
                    :aria-controls="item.dropdown ? item.dropdown + '-panel' : null"
                    :aria-haspopup="item.dropdown ? 'true' : null">
                    <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4 flex-none" />
                    {{ item.label }}
                </button>
                <button
                    v-if="item.dropdown"
                    type="button"
                    @click="toggleDropdown(item.dropdown)"
                    :aria-label="`Toggle ${item.label} submenu`"
                    :aria-expanded="activeDropdown === item.dropdown ? 'true' : 'false'"
                    :aria-controls="item.dropdown + '-panel'"
                    aria-haspopup="true">
                    <Icon name="down-arrow"
                        :class="['w-5 h-5 flex-none -rotate-90']" />
                </button>
            </div>
            <div
                class="absolute z-10 right-0 inset-y-0 w-72 bg-white p-6 transform transition-transform duration-300 ease-in-out overflow-auto flex flex-col gap-4"
                :class="[item?.mobileParentClass, activeDropdown === item.dropdown ? 'translate-x-0' : 'translate-x-full']"
                role="region"
                :id="item.dropdown ? item.dropdown + '-panel' : null"
                :aria-hidden="activeDropdown === item.dropdown ? 'false' : 'true'"
                :inert="activeDropdown !== item.dropdown ? '' : null"
                :aria-labelledby="item.dropdown ? item.dropdown + '-toggle' : null">
                <button
                    type="button"
                    class="text-left flex gap-2 items-center"
                    @click="closeSubMenuDropdown(item.dropdown)"
                    :aria-label="`Back to ${item.label} menu`">
                    <Icon name="arrow-right" class="w-5 h-5 flex-none rotate-180" />
                    Back
                </button>
                <NuxtLink v-if="!item?.isRedirection"
                    :to="item.path"
                    class="w-full text-sm uppercase font-medium"
                    :key="item.label"
                    @click="closeAfterRedirection()">
                    {{ item.label }}
                </NuxtLink>
                <template v-for="section in finalSubMenu?.sections">
                    <div class="space-y-4" :key="section.title" v-if="item.label == 'About Us'">
                        <!-- Section Title -->
                        <NuxtLink :to="section.link" @click="closeAfterRedirection()"
                            :class="{ 'hidden': section.title === 'Contact Us' }">
                            <h3 class="text-sm font-medium uppercase">{{ section.title }}</h3>
                        </NuxtLink>
                        <!-- Sub Items -->
                        <div :class="section.mobileItemClass" v-if="section.items?.length">
                            <template v-for="(subItem) in getAlignedData(section)">
                                    <a v-if="subItem.value == 'address'" :href="subItem.href" class="flex items-center" :key="subItem.name"
                                        :target="subItem.samePage ? '' : '_blank'" rel="noopener">
                                        <p v-html="$sanitize(formattedAddress)"></p>
                                    </a>
                                    <a v-else-if="subItem.value == 'phone_number'" :href="`tel:${telPhoneNumber}`" :key="`ph-${subItem.name}`" class="inline-block sm:hidden">
                                        {{ phoneNumber }}
                                    </a>
                                <NuxtLink v-else-if="!subItem.external" :to="{ path: subItem.href, query: {} }"
                                    :key="`${subItem.name}-${subItem.href}`" @click="closeAfterRedirection()"
                                    class="flex items-center gap-x-2 text-sm font-normal text-gray-black hover:text-primary"
                                    :class="{'text-black': subItem.highlight }">
                                    <Icon :name="subItem.icon" v-if="subItem.icon" class="w-5 h-5 flex-none" />
                                    <p v-html="$sanitize(section.title == 'Visit Us' ? subItem.value : subItem.name)"></p>
                                </NuxtLink>
                            </template>
                        </div>
                    </div>
                    <div class="space-y-4" :key="section.title" v-else>
                        <!-- Section Title -->
                        <NuxtLink :to="section.link" @click="closeAfterRedirection()">
                            <h3 class="text-sm font-medium uppercase">{{ section.title }}</h3>
                        </NuxtLink>
                        <!-- Sub Items -->
                        <div v-if="section.items?.length" :class="section.mobileItemClass">
                            <template v-for="subItem in getAlignedData(section)">
                                <NuxtLink v-if="!subItem.external" :to="{ path: subItem.href, query: {} }"
                                    :key="subItem.name" @click="closeAfterRedirection()"
                                    class="flex items-center gap-x-2 text-sm font-normal text-gray-black hover:text-primary"
                                    :class="{'text-black': subItem.highlight }">
                                    <Icon :name="subItem.icon" v-if="subItem.icon" class="w-5 h-5 flex-none" />
                                    {{ subItem.name }}
                                </NuxtLink>
                                <a v-else :href="subItem.href" class="flex items-center" :key="subItem.name"
                                    :target="subItem.samePage ? '' : '_blank'" rel="noopener">
                                    {{ subItem.name }}
                                </a>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </nav>
</template>
<script>
import { menuItems, diamondSubMenu, engagementRingSubMenu, weddingRingSubMenu, diamondJewelrySubMenu, educationSubMenu, aboutUsSubMenu } from '@/utils/menu.js';
import Icon from '~/components/common/Icon.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name: 'MobileHeader',
    props: ['mobileNav', 'isFixed'],
    components: { Icon },
    data() {
        return {
            activeDropdown: null,
            visitorCode: "",
            cart_item: [],
            // mobileNav: false,
            inputSearchShow: false,
            menuItems: menuItems ?? [],
            diamondSubMenu: diamondSubMenu ?? [],
            engagementRingSubMenu: engagementRingSubMenu ?? [],
            weddingRingSubMenu: weddingRingSubMenu ?? [],
            diamondJewelrySubMenu: diamondJewelrySubMenu ?? [],
            educationSubMenu: educationSubMenu ?? [],
            aboutUsSubMenu: aboutUsSubMenu ?? [],
            finalSubMenu: null,
            announcement: '',
            shapeData: null
        };
    },
    watch: {
        mobileNav(val) {
            if (!val) {
                this.activeDropdown = null;
                this.announce('Closed mobile navigation.');
            } else {
                this.$nextTick(() => {
                    if (this.$refs.menu && typeof this.$refs.menu.focus === 'function') {
                        this.$refs.menu.focus();
                    }
                });
                this.announce('Opened mobile navigation.');
            }
        },
        '$store.state.diamondsFilters': {
            handler(newValue, oldValue) {
                const val = newValue ?? oldValue;
                if (val && typeof val === 'object' && Object.keys(val).length) {
                const defaultShapeData = val['SHAPE'] ?? null;
                this.shapeData = defaultShapeData?.value ?? null;
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        formattedAddress() {
            return this.$store.state?.officeAddress?.replace(', CA', '<br>CA');
        },
        getVisitorCode() {
         return this.$getVisitorCode();
        },
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
        isLoggedIn() {
            if (!import.meta.client) return false;
            return !!localStorage.getItem('token');
        },
        filteredMenuItems() {
            return this.menuItems.map(item => {
                if (item.label === 'Sign In' && this.isLoggedIn) {
                    return {
                        ...item,
                        label: 'My Account',
                        path: STATIC_ROUTES.MY_ACCOUNT
                    };
                }
                return item;
            });
        }
    },
    mounted() {
        document.addEventListener('click', this.closeMenu);
        document.addEventListener('keydown', this.onKeydown);
        this.visitorCode = this.$cookies ? this.$cookies.get('visitorCode') : this.$store.getters.getResponse ? this.$store.getters.getResponse?.data?.visitor_code : '';
        this.cart_item = this.$store.getters.getCartItems;
    },
    methods: {
        getAlignedData(section, code = null) {
            const menuItems = section?.items ?? section;
            if (!menuItems) return [];

            if (section?.code !== 'shape' && !code) return menuItems;

            if (Array.isArray(this.shapeData)) {
                const sortedMenuItems = this.shapeData
                .map(shape => menuItems.find(item => item.icon === shape.code || item.admin_name === shape.code))
                .filter(Boolean);

                return sortedMenuItems.length ? sortedMenuItems : menuItems;
            }

            return menuItems;
        },
        closeSubMenuDropdown(dropdown) {
            if (this.activeDropdown === dropdown) {
                this.activeDropdown = null;
                const label = this.getMenuLabelByDropdown(dropdown);
                this.announce(`Closed ${label} menu.`);
            }
        },
        toggleDropdown(name) {
            this.activeDropdown = this.activeDropdown === name ? null : name;
            let menuList = [];
            if (this.activeDropdown == 'diamonds') {
                menuList = this.diamondSubMenu;
            }
            if (this.activeDropdown == 'engagementRing') {
                menuList = this.engagementRingSubMenu;
            }
            if (this.activeDropdown == 'wedding') {
                menuList = this.weddingRingSubMenu;
            }
            if (this.activeDropdown == 'jewelry') {
                menuList = this.diamondJewelrySubMenu;
            }
            if (this.activeDropdown == 'education') {
                menuList = this.educationSubMenu;
            }
            if (this.activeDropdown == 'aboutUs') {
                this.aboutUsSubMenu?.section?.pop();// Remove the last element
                menuList = this.aboutUsSubMenu;
            }
            this.finalSubMenu = menuList;
            const label = this.getMenuLabelByDropdown(name);
            if (this.activeDropdown) {
                this.announce(`Opened ${label} menu.`);
            } else {
                this.announce(`Closed ${label} menu.`);
            }
        },
        closeMenu() {
            this.activeDropdown = null;
            this.$emit('update:mobileNav', false); // menu band karna
        },
        handleFocusOut(event) {
            const relatedTarget = event.relatedTarget;
            if (!this.$el.contains(relatedTarget)) {
                this.$emit('update:mobileNav', false);
            }
        },
        closeAfterRedirection() {
            this.activeDropdown = null;
            this.$emit('update:mobileNav', false);
        },
        announce(message) {
            if (!message) {
                return;
            }
            this.announcement = '';
            this.$nextTick(() => {
                this.announcement = message;
            });
        },
        getMenuLabelByDropdown(name) {
            const item = this.menuItems.find(menuItem => menuItem.dropdown === name);
            return item && item.label ? item.label : 'menu';
        },
        onKeydown(event) {
            if (event.key === 'Escape' && this.mobileNav) {
                event.preventDefault();
                if (this.activeDropdown) {
                    const current = this.activeDropdown;
                    this.closeSubMenuDropdown(current);
                    const label = this.getMenuLabelByDropdown(current);
                    this.announce(`Closed ${label} menu.`);
                } else {
                    this.closeMenu();
                }
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeMenu);
        document.removeEventListener('keydown', this.onKeydown);
    },
};
</script>
