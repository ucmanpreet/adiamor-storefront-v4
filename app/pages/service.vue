
<template>
    <div v-if="$route.params.slug" class="flex-1" :key="$route.fullPath">

        <div class="max-w-7xl mx-auto px-4 pb-8 lg:pb-16 lg:px-24 2xl:px-8 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Main content -->
            <ServiceContent/>
        </div>
    </div>
</template>
<script setup>
import AboutSidebar from '~/components/layout/AboutSidebar.vue';
import ServiceContent from '~/components/ServiceContent.vue';

const route = useRoute();
const { $bus } = useNuxtApp();

const hasSlug = computed(() => Boolean(route.params.slug));

function announcePage() {
    if (route?.params?.slug) {
        const formattedSlug = route.params.slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());

        $bus.emit(
            "aria-announce",
            `${formattedSlug} service page loaded. Review ${formattedSlug} service details page.`
        );
    }
}

onMounted(() => {
    announcePage();
});

watch(() => route.params.slug, () => {
    announcePage();
});
</script>