
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
<script>
import AboutSidebar from '~/components/layout/AboutSidebar.vue';
import ServiceContent from '~/components/ServiceContent.vue';
export default {
    name : "ServicePage",
    components: { AboutSidebar, ServiceContent },
    computed: {
        hasSlug() {
            return Boolean(this.$route.params.slug);
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
            if (this.$route?.params?.slug) {
                const formattedSlug = this.$route.params.slug
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, char => char.toUpperCase());

                this.$bus.emit(
                    "aria-announce",
                    `${formattedSlug} service page loaded. Review ${formattedSlug} service details page.`
                );
            }
        }
    }
};
</script>