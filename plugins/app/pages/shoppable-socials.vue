<template>
    <div>
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16">
            <h1 class="text-lg md:text-2xl lg:text-4xl font-normal mb-4">Adiamor Shoppable Socials</h1>
            <p class="mb-8 text-sm sm:text-lg">Be featured in our gallery! Post your engagement ring, proposal story, or wedding photos on social media with the hashtag #adiamor or tag us directly on Instagram @adiamordiamonds!</p>
        </section>

        <!-- Shoppable Newsletter -->
        <Newsletter />

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 flex items-center justify-center">
            <NuxtLink
                :to="socialMediaPath"
                class="mt-6 inline-flex items-center gap-2 bg-primary font-normal whitespace-nowrap px-4 py-[0.563rem] text-white border border-white hover:border-primary hover:bg-transparent hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none uppercase font-gill-sans tracking-[0.125rem]"
                @click="$bus.emit('aria-announce','Navigating to Adiamor social media gallery page.')"
            >
                View Adiamor On Social Media
            </NuxtLink>
        </div>

        <!-- Gallery -->
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 min-h-screen">
            <div class="py-24 w-full relative flex item-center justify-center" v-if="loading"
                role="status"
                aria-live="polite"
                aria-label="Loading social media gallery"
            >
                <CustomLoader/>
            </div>

            <ClientOnly><div
                class="yotpo yotpo-pictures-widget yotpo-size-7"
                data-gallery-id="5d5ebbc7132e1d16416e07d1"
                data-yotpo-element-id="1"
                role="region"
                aria-label="Adiamor social media gallery"
            ></div></ClientOnly>
        </div>
    </div>
</template>
<script>
import Newsletter from '~/components/landing/Newsletter.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : "ShoppableSocialsPage",
    components: { Newsletter, CustomLoader },
    data(){return{
        loading: true,
        socialMediaPath: STATIC_ROUTES.SOCIAL_MEDIA_GALLERY
    }},
    mounted() {
        this.$bus.emit(
            'aria-announce',
            'Adiamor Shoppable Socials page loaded. Browse our social media gallery and featured posts.'
        )

        this.$nextTick(() => {
            this.loading = false;
            this.$bus.emit(
                'aria-announce',
                'Social media gallery content has loaded.'
            )
        })
    }
}
</script>