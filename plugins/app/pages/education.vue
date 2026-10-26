<template>
    <div>
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/education-wide.jpg?updatedAt=1747976883375`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            alt="Education Center"
            sectionLabel="Education Center hero"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Education Center</h1>
            <p class="text-sm sm:text-lg lg:text-xl">Our education center contains useful tips on how to buy diamonds, engagement rings, wedding bands, and finding that perfect gift for someone you love.</p>
        </Banner>

        <!-- Engagement Ring Guide -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="engagement-ring-guide-heading">
            <div class="relative h-60 lg:h-[398px] flex items-center">
                <div class="mx-auto lg:mx-8 flex-1 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center lg:justify-start">
                    <div class="max-w-md w-full text-center md:text-left">
                        <h2 id="engagement-ring-guide-heading" class="text-lg md:text-xl lg:text-3xl font-normal" aria-hidden="true">Engagement Ring Guide</h2>
                        <p class="mt-2 text-sm">Our diamond engagement ring guide is designed to assist you step by step through the buying process.</p>
                        <Link
                            :href="STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE"
                            class="mt-6 !px-8 md:!text-sm font-medium mx-auto md:ml-0 uppercase font-gill-sans tracking-[0.125rem]"
                        >
                            Learn More<span class="sr-only"> about engagement ring guide</span>
                        </Link>
                    </div>
                </div>
                <div class="flex-1">
                    <nuxt-img
                        provider="cdn"
                        src="/landing-pages/heros/educ_newengagement.jpg?updatedAt=1746137196865"
                        class="w-full h-full object-cover"
                        alt="Engagement Ring Guide"
                    />
                </div>
            </div>
        </section>

        <!-- Education Guides -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12" aria-label="Education guides">
            <div class="grid grid-cols-2 grid-rows-2 sm:grid-rows-3 gap-2 sm:gap-4 lg:gap-8">
                <!-- Diamond Education -->
                <div class="relative sm:row-span-3 flex flex-col border border-gray-200">
                    <NuxtLink
                        :to="STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Diamond Education - Learn about the 4Cs"
                    />
                    <div class="relative w-full h-full grow flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-contain" src="/landing-pages/update/gia_certified.jpg?updatedAt=1757998218941" alt="Diamond Education" />
                    </div>
                    <div class="p-2 sm:p-4 absolute backdrop-blur-sm bg-white/60 inset-x-0 top-0 flex flex-col" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-3xl">Diamond Education</h2>
                        <p class="mt-1 text-xs sm:text-sm lg:text-base">Learn about the "4Cs" to help you with your online diamond shopping.</p>
                    </div>
                </div>
                <!-- Fine Jewelry Guide -->
                <div class="relative sm:col-start-2 flex items-center border border-gray-200">
                    <NuxtLink
                        :to="STATIC_ROUTES.EDUCATION_FINE_JEWELRY_GUIDE"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Fine Jewelry Guide - Expert gift tips"
                    />
                    <div class="relative w-full h-full flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-contain object-top" src="/landing-pages/heros/neweduc_finejewelry.jpg?updatedAt=1746137281605" alt="Fine Jewelry Guide" />
                    </div>
                    <div class="p-2 sm:p-4 absolute bottom-0 bg-white/60 backdrop-blur-sm sm:backdrop-blur-0 sm:bg-transparent sm:relative flex flex-col flex-1 lg:p-6" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Fine Jewelry Guide</h2>
                        <p class="mt-1 text-xs sm:text-sm line-clamp-2">Expert tips on finding that perfect gift for someone you love.</p>
                    </div>
                </div>
                <!-- Wedding Ring Guide -->
                <div class="relative sm:col-start-2 flex items-center border border-gray-200">
                    <NuxtLink
                        :to="STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Wedding Ring Guide - Choose the right wedding band"
                    />
                    <div class="relative w-full h-full flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-contain object-top" src="/landing-pages/heros/neweduc_wedding.jpg?updatedAt=1746137282641" alt="Wedding Ring Guide" />
                    </div>
                    <div class="p-2 sm:p-4 absolute bottom-0 bg-white/60 backdrop-blur-sm sm:backdrop-blur-0 sm:bg-transparent sm:relative flex flex-col flex-1 lg:p-6" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Wedding Ring Guide</h2>
                        <p class="mt-1 text-xs sm:text-sm line-clamp-2">Pick the right wedding band to fit your taste, style, and budget.</p>
                    </div>
                </div>
                <!-- Metal Education -->
                <div class="relative sm:col-start-2 flex items-center border border-gray-200">
                    <NuxtLink
                        :to="STATIC_ROUTES.EDUCATION_METAL_EDUCATION"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Metal Education - Learn about jewelry metals"
                    />
                    <div class="relative w-full h-full flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-contain object-top" src="/landing-pages/heros/neweduc_metal.jpg?updatedAt=1746137281836" alt="Metal Education" />
                    </div>
                    <div class="p-2 sm:p-4 absolute bottom-0 bg-white/60 backdrop-blur-sm sm:backdrop-blur-0 sm:bg-transparent sm:relative flex flex-col flex-1 lg:p-6" aria-hidden="true">
                        <h2 class="font-normal text-sm sm:text-lg lg:text-xl">Metal Education</h2>
                        <p class="mt-1 text-xs sm:text-sm line-clamp-2">Each metal has its advantages and disadvantages.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Recently Viewed Products -->
        <section class="pt-6 sm:pt-12 pb-6">
            <RecentlyViewed :heading="'Recently Viewed'" />
        </section>

        <!-- Contact Links -->
        <div class="pt-8">
            <ContactLink />
        </div>
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import Link from "~/components/ui/Link.vue";
import RecentlyViewed from "~/components/carousel/RecentlyViewed.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name: "EducationPage",
    components: { Banner, Link, RecentlyViewed, ContactLink },
    data() {
        return {
            STATIC_ROUTES
        };
    },
};
</script>
