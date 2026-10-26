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
                    :to="item.label === 'My Bag' ? item.path + ($hydrated ? getVisitorCode : '') : item.path"
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
<script setup>
import { menuItems as menuItemsData, diamondSubMenu as diamondSubMenuData, engagementRingSubMenu as engagementRingSubMenuData, weddingRingSubMenu as weddingRingSubMenuData, diamondJewelrySubMenu as diamondJewelrySubMenuData, educationSubMenu as educationSubMenuData, aboutUsSubMenu as aboutUsSubMenuData } from '@/utils/menu.js';
import Icon from '~/components/common/Icon.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps(['mobileNav', 'isFixed']);
const emit = defineEmits(['update:mobileNav']);

const store = useMainStore();
const route = useRoute();
const { $getVisitorCode } = useNuxtApp();

const menu = ref(null);
const activeDropdown = ref(null);
const visitorCode = ref("");
const cart_item = ref([]);
const inputSearchShow = ref(false);
const menuItems = ref(menuItemsData ?? []);
const diamondSubMenu = ref(diamondSubMenuData ?? []);
const engagementRingSubMenu = ref(engagementRingSubMenuData ?? []);
const weddingRingSubMenu = ref(weddingRingSubMenuData ?? []);
const diamondJewelrySubMenu = ref(diamondJewelrySubMenuData ?? []);
const educationSubMenu = ref(educationSubMenuData ?? []);
const aboutUsSubMenu = ref(aboutUsSubMenuData ?? []);
const finalSubMenu = ref(null);
const announcement = ref('');
const shapeData = ref(null);

watch(() => props.mobileNav, (val) => {
    if (!val) {
        activeDropdown.value = null;
        announce('Closed mobile navigation.');
    } else {
        nextTick(() => {
            if (menu.value && typeof menu.value.focus === 'function') {
                menu.value.focus();
            }
        });
        announce('Opened mobile navigation.');
    }
});

watch(() => store.diamondsFilters, (newValue, oldValue) => {
    const val = newValue ?? oldValue;
    if (val && typeof val === 'object' && Object.keys(val).length) {
        const defaultShapeData = val['SHAPE'] ?? null;
        shapeData.value = defaultShapeData?.value ?? null;
    }
}, { deep: true, immediate: true });

const formattedAddress = computed(() => store.officeAddress?.replace(', CA', '<br>CA'));
const getVisitorCode = computed(() => $getVisitorCode());
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));
// token lives in localStorage, so it is read after mount; reading it during render causes a hydration mismatch
const isLoggedIn = ref(false);
onMounted(() => {
    isLoggedIn.value = !!localStorage.getItem('token');
});
const filteredMenuItems = computed(() => menuItems.value.map(item => {
    if (item.label === 'Sign In' && isLoggedIn.value) {
        return {
            ...item,
            label: 'My Account',
            path: STATIC_ROUTES.MY_ACCOUNT
        };
    }
    return item;
}));

onMounted(() => {
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', onKeydown);
    visitorCode.value = useCookie('visitorCode').value;
    cart_item.value = store.getCartItems;
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', onKeydown);
});

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
function closeSubMenuDropdown(dropdown) {
    if (activeDropdown.value === dropdown) {
        activeDropdown.value = null;
        const label = getMenuLabelByDropdown(dropdown);
        announce(`Closed ${label} menu.`);
    }
}
function toggleDropdown(name) {
    activeDropdown.value = activeDropdown.value === name ? null : name;
    let menuList = [];
    if (activeDropdown.value == 'diamonds') {
        menuList = diamondSubMenu.value;
    }
    if (activeDropdown.value == 'engagementRing') {
        menuList = engagementRingSubMenu.value;
    }
    if (activeDropdown.value == 'wedding') {
        menuList = weddingRingSubMenu.value;
    }
    if (activeDropdown.value == 'jewelry') {
        menuList = diamondJewelrySubMenu.value;
    }
    if (activeDropdown.value == 'education') {
        menuList = educationSubMenu.value;
    }
    if (activeDropdown.value == 'aboutUs') {
        aboutUsSubMenu.value?.section?.pop();// Remove the last element
        menuList = aboutUsSubMenu.value;
    }
    finalSubMenu.value = menuList;
    const label = getMenuLabelByDropdown(name);
    if (activeDropdown.value) {
        announce(`Opened ${label} menu.`);
    } else {
        announce(`Closed ${label} menu.`);
    }
}
function closeMenu() {
    activeDropdown.value = null;
    emit('update:mobileNav', false); // menu band karna
}
function handleFocusOut(event) {
    const relatedTarget = event.relatedTarget;
    if (!menu.value.contains(relatedTarget)) {
        emit('update:mobileNav', false);
    }
}
function closeAfterRedirection() {
    activeDropdown.value = null;
    emit('update:mobileNav', false);
}
function announce(message) {
    if (!message) {
        return;
    }
    announcement.value = '';
    nextTick(() => {
        announcement.value = message;
    });
}
function getMenuLabelByDropdown(name) {
    const item = menuItems.value.find(menuItem => menuItem.dropdown === name);
    return item && item.label ? item.label : 'menu';
}
function onKeydown(event) {
    if (event.key === 'Escape' && props.mobileNav) {
        event.preventDefault();
        if (activeDropdown.value) {
            const current = activeDropdown.value;
            closeSubMenuDropdown(current);
            const label = getMenuLabelByDropdown(current);
            announce(`Closed ${label} menu.`);
        } else {
            closeMenu();
        }
    }
}
</script>
