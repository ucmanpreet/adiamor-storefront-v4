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
<script>
import EducationSidebar from '~/components/navigation/EducationSidebar.vue';
import EducationContent from '~/components/EducationContent.vue';
export default {
    name : "EducationSubPage",
    components: { EducationSidebar, EducationContent },
    computed: {
        hasSlug() {
            return Boolean(this.$route?.params?.slug);
        }
    },

    mounted() {
        this.announcePage();
    },

    watch: {
        '$route.params.slug'() {
            this.announcePage();
        }
    },

    methods: {
        announcePage() {
            if (!this.$route?.params?.slug) return;

            const formattedSlug = this.$route.params.slug
                .replace(/-/g, " ")
                .replace(/\b\w/g, char => char.toUpperCase());

            this.$bus.emit(
                "aria-announce",
                `${formattedSlug} education page loaded. Review ${formattedSlug} education details page.`
            );
        }
    }
};
</script>