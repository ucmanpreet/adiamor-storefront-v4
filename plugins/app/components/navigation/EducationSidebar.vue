<template>
    <aside class="w-full sm:w-56 lg:w-72 flex-none divide-y divide-gray-200 sm:border-r border-gray-200 sm:pr-4" aria-label="Education navigation">
        <Accordion v-for="(item, index) in accordions" :key="index" :title="item.title"
            :isOpen="currentOpen.includes(index)" class="sm:!block" @toggle="handleToggle(index)">
            <ul :id="`accordion-panel-${index}`" role="list"
                class="capitalize space-y-2 text-sm border-t border-gray-200 py-3 prose prose-a:font-normal prose-a:no-underline">
                <li v-for="(link, i) in item.links" :key="i" role="listitem">
                    <NuxtLink :to="link.href" class="flex items-center hover:text-primary" :aria-current="isCheckRoute(link.href) ? 'page' : null"
                        :class="{'text-primary !font-medium !underline': isCheckRoute(link.href)}">
                        <Icon name="arrow" :class="['w-2 h-2 mr-2', isCheckRoute(link.href) ? 'block' : 'hidden']" aria-hidden="true"/>
                        {{ link.title }}
                    </NuxtLink>
                </li>
            </ul>
        </Accordion>
    </aside>
</template>

<script>
import Accordion from '~/components/ui/Accordion.vue';
import Icon from '~/components/common/Icon.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name: "AboutPage",
    components: { Accordion, Icon },
    data() {
        return {
            STATIC_ROUTES,
            accordions: [
                {
                    title: "Diamond Education",
                    links: [
                        { title: "Affinity Collection", href: STATIC_ROUTES.EDUCATION_AFFINITY_COLLECTION },
                        { title: "Carat Weight", href: STATIC_ROUTES.EDUCATION_CARAT_WEIGHT },
                        { title: "Diamond Care", href: STATIC_ROUTES.EDUCATION_DIAMOND_CARE },
                        { title: "Diamond Certification", href: STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION },
                        { title: "Diamond Clarity", href: STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY },
                        { title: "Diamond Color", href: STATIC_ROUTES.EDUCATION_DIAMOND_COLOR },
                        { title: "Diamond Cut", href: STATIC_ROUTES.EDUCATION_DIAMOND_CUT },
                        { title: "Diamond Shape", href: STATIC_ROUTES.EDUCATION_DIAMOND_SHAPE },
                        { title: "Lab Grown Diamonds", href: STATIC_ROUTES.EDUCATION_LAB_GROWN_DIAMONDS }
                    ]
                },
                {
                    title: "Engagement Guide",
                    links: [
                        { title: "Engagement Ring Guide", href: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE },
                        { title: "Engagement Ring Add Ons", href: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_ADD_ONS },
                        { title: "Establishing Your Budget", href: STATIC_ROUTES.EDUCATION_ESTABLISHING_BUDGET },
                        { title: "Financing and Insurance", href: STATIC_ROUTES.EDUCATION_FINANCING_INSURANCE },
                        { title: "Jeweler Guide", href: STATIC_ROUTES.EDUCATION_JEWELER_GUIDE },
                        { title: "Proposal Tips", href: STATIC_ROUTES.EDUCATION_PROPOSAL_TIPS },
                        { title: "Ring Anatomy", href: STATIC_ROUTES.EDUCATION_RING_ANATOMY }
                    ]
                },
                {
                    title: "Fine Jewelry Education",
                    links: [
                        { title: "Fine Jewelry Guide", href: STATIC_ROUTES.EDUCATION_FINE_JEWELRY_GUIDE },
                        { title: "Earring Guide", href: STATIC_ROUTES.EDUCATION_EARRING_GUIDE },
                        { title: "Gemstone Education", href: STATIC_ROUTES.EDUCATION_GEMSTONE_EDUCATION },
                        { title: "Gift Guide", href: STATIC_ROUTES.EDUCATION_GIFT_GUIDE },
                        { title: "Glossary", href: STATIC_ROUTES.EDUCATION_GLOSSARY_A },
                        { title: "Metal Education", href: STATIC_ROUTES.EDUCATION_METAL_EDUCATION },
                        { title: "Pearl Education", href: STATIC_ROUTES.EDUCATION_PEARL_EDUCATION },
                        { title: "Pendant Guide", href: STATIC_ROUTES.EDUCATION_PENDANT_GUIDE },
                        { title: "Wedding Ring Guide", href: STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE }
                    ]
                }
            ],
            currentOpen: []
        };
    },
    created() {
        this.currentOpen = this.accordions.reduce((openIndexes, item, index) => {
            if (item.links.some(link => link.href === this.$route.path)) {
                openIndexes.push(index);
            }
            return openIndexes;
        }, []);
    },
    methods: {
        handleToggle(index) {
            if (this.currentOpen.includes(index)) {
                this.currentOpen = this.currentOpen.filter(i => i !== index);
            } else {
                this.currentOpen.push(index);
            }
        },
        isCheckRoute(href) {
            return this.$route.path?.includes(href) || this.$route.path === href;
        }
    },
};
</script>

