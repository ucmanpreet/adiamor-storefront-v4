<template>
    <aside
        id="about-sidebar"
        role="navigation"
        aria-label="About pages"
        class="w-full md:w-56 lg:w-72 flex-none divide-y divide-gray-200 sm:border-r border-gray-200 md:pr-4 sticky top-[56px] inset-x-0 bg-white border-t md:border-t-0 shadow-md md:shadow-none md:static z-10"
    >
        <div class="fixed inset-0 bg-backdrop bg-black/50 touch-none z-0" aria-hidden="true" @touch.stop v-if="isSidebar" :class="{ 'hidden': !isSidebar }" @click="isSidebar = false"></div>
        <div class="relative z-50 bg-white" id="about-sidebar-content">
            <button type="button"
                class="md:hidden p-1.5 flex items-center gap-1 absolute bg-white right-0 z-10 -translate-y-[42px] text-gray-500"
                colorType="transparent"
                :aria-expanded="isSidebar"
                aria-controls="about-sidebar-content"
                :aria-label="isSidebar ? 'Close sidebar menu' : 'Open sidebar menu'"
                @click="toggleFilter"
            >
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"></path>
                    <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"></path>
                </svg>
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor"></path></svg>
            </button>
            <Accordion  
                v-for="(item, index) in accordions"
                :key="index"
                :title="item.title"
                :isOpen="currentOpen.includes(index)"
                class="md:!block px-4 md:px-0 relative z-10"
                :class="[
                    isSidebar ? '' : 'hidden'
                ]"
                @toggle="handleToggle(index)"
            >
                <ul class="capitalize space-y-2 text-sm border-t border-gray-200 py-3 prose prose-a:font-normal prose-a:no-underline">
                    <li v-for="(link, i) in item.links" :key="i">
                        <NuxtLink
                            :to="link.href"
                            class="flex items-center hover:text-primary"
                            :class="{ 'text-primary !font-medium !underline': isActiveLink(link) }"
                            :aria-current="isActiveLink(link) ? 'page' : null"
                        >
                            <Icon
                                name="arrow"
                                :class="['w-2 h-2 mr-2', isActiveLink(link) ? 'block' : 'hidden']"
                                aria-hidden="true"
                            />
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </Accordion>
        </div>
    </aside>
</template>

<script setup>
import Accordion from "~/components/ui/Accordion.vue";
import Icon from "~/components/common/Icon.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const route = useRoute();
const { $bus } = useNuxtApp();

const currentOpen = ref([]); // Stores which accordions are open
const isSidebar = ref(false);
const accordions = ref([
        {
            title: "About Us",
            links: [
                { title: "About Adiamor", href: STATIC_ROUTES.ABOUT },
                { title: "Contact Adiamor", href: STATIC_ROUTES.CONTACT },
                { title: "In The Media", href: STATIC_ROUTES.IN_THE_MEDIA },
                { title: "Our History", href: `${STATIC_ROUTES.ABOUT}#history` },
                { title: "Refer A Friend", href: STATIC_ROUTES.REFER_FRIEND },
                { title: "Testimonials", href: STATIC_ROUTES.TESTIMONIALS },
                { title: "Why Shop at Adiamor", href: STATIC_ROUTES.WHY_SHOP },
                { title: "Promotions", href: STATIC_ROUTES.PROMOTIONS }
            ]
        },
        {
            title: "Policies",
            links: [
                { title: "Conflict Free Policy", href: STATIC_ROUTES.POLICIES_CONFLICT_FREE },
                { title: "Diamond Price Match", href: STATIC_ROUTES.POLICIES_DIAMOND_PRICE_MATCH },
                // { title: "Diamond Upgrade Program", href: STATIC_ROUTES.POLICIES_DIAMOND_UPGRADE_PROGRAM },
                { title: "Financing and Insurance", href: STATIC_ROUTES.POLICIES_FINANCING_INSURANCE },
                { title: "International Shipments", href: STATIC_ROUTES.POLICIES_SHIPPING_INTERNATIONAL },
                { title: "Lifetime Warranty", href: STATIC_ROUTES.POLICIES_WARRANTY },
                { title: "Luxury Gift Packaging", href: STATIC_ROUTES.POLICIES_GIFT_PACKAGING },
                { title: "Privacy Policy", href: STATIC_ROUTES.POLICIES_PRIVACY },
                { title: "Return Policy", href: STATIC_ROUTES.POLICIES_RETURN },
                { title: "Ring Engraving", href: STATIC_ROUTES.POLICIES_ENGRAVING },
                { title: "Shipping Policy", href: STATIC_ROUTES.POLICIES_SHIPPING },
                { title: "Terms and Conditions", href: STATIC_ROUTES.POLICIES_TERMS_AND_CONDITIONS },
                { title: "Accessibility", href: STATIC_ROUTES.POLICIES_ACCESSIBILITY }
            ]
        },
        {
            title: "Services",
            links: [
                { title: "After You Order", href: STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER },
                { title: "Payment Options", href: STATIC_ROUTES.SERVICES_PAYMENT_OPTIONS }
            ]
        }
    ]);

onMounted(() => {
    if (route.path?.startsWith(STATIC_ROUTES.SERVICES)) {
        currentOpen.value = [2]; // Open the Policies accordion
    } else if (route.path?.startsWith(STATIC_ROUTES.POLICIES)) {
        currentOpen.value = [1]; // Open the first accordion by default (About Us)
    } else {
        currentOpen.value = [0]; // Open the first accordion by default (About Us)
    }
});

watch(() => route.fullPath, () => {
    // Re-evaluate the open accordion when the route changes
    if (route.path?.startsWith(STATIC_ROUTES.POLICIES)) {
        currentOpen.value = [1]; // Ensure the Policies accordion is open
    }

    if (route.path?.startsWith(STATIC_ROUTES.SERVICES)) {
        currentOpen.value = [2]; // Ensure the first accordion (About Us) is open
    }
});

function isActiveLink(link) {
    return route.path?.includes(link.href) || route.path === link.href;
}
function handleToggle(index) {
    if (currentOpen.value.includes(index)) {
        currentOpen.value = currentOpen.value.filter(i => i !== index);
        $bus.emit('aria-announce', `${accordions.value[index].title} collapsed`);
    } else {
        const prevIndex = currentOpen.value[0];
        currentOpen.value = [index];
        const msg = prevIndex !== undefined
            ? `${accordions.value[prevIndex].title} collapsed. ${accordions.value[index].title} expanded`
            : `${accordions.value[index].title} expanded`;
        $bus.emit('aria-announce', msg);
    }
}
function toggleFilter() {
    isSidebar.value = !isSidebar.value;
}
</script>
