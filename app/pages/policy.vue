<template>
    <div v-if="$route.params.slug" class="flex-1" aria-label="Policy details page">

        <div class="max-w-7xl mx-auto px-4 pb-8 lg:pb-16 lg:px-24 2xl:px-8 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Main content -->
            <PolicyContent/>
        </div>

        <div
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>
<script setup>
import AboutSidebar from '~/components/layout/AboutSidebar.vue';
import PolicyContent from '~/components/PolicyContent.vue';
import ContactLink from '~/components/common/ContactLink.vue';

const route = useRoute();
const { $bus } = useNuxtApp();

onMounted(() => {
    if (route?.params?.slug) {
        const formattedSlug = route.params.slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());

        $bus.emit(
            "aria-announce",
            `${formattedSlug} policy page loaded. Review ${formattedSlug} policy details page.`
        );
    }
});
</script>
