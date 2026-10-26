<template>
    <div
        v-if="hasSlug"
        class="flex-1"
        :key="$route.fullPath"
        role="main"
        aria-label="Education article page"
    >

        <div class="max-w-7xl mx-auto px-4 pb-8 lg:pb-16 lg:px-24 2xl:px-8 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <EducationSidebar />

            <!-- Main content -->
            <EducationContent />
        </div>
    </div>
</template>
<script setup>
import EducationSidebar from '~/components/navigation/EducationSidebar.vue';
import EducationContent from '~/components/EducationContent.vue';

const route = useRoute();
const { $bus } = useNuxtApp();

const hasSlug = computed(() => Boolean(route?.params?.slug));

function announcePage() {
    if (!route?.params?.slug) return;

    const formattedSlug = route.params.slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());

    $bus.emit(
        "aria-announce",
        `${formattedSlug} education page loaded. Review ${formattedSlug} education details page.`
    );
}

onMounted(() => {
    announcePage();
});

watch(() => route.params.slug, () => {
    announcePage();
});
</script>