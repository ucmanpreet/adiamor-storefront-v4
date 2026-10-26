<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/rings-and-bands-wide.png?updatedAt=1746137289822`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            :imgPosition="`object-left`"
            alt="Classic Rings & Bands"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Classic Rings & Bands</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Our classic assortment of diamond engagement rings, wedding rings and fashion and eternity bands crafted in a variety of timeless styles.</p>
            <div class="flex justify-start gap-4">
                <NuxtLink
                    :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
                    aria-label="Search all classic rings and bands"
                    @click="$bus.emit('aria-announce','Navigating to search all rings and bands page')"
                >
                    Search All Rings &amp; Bands
                </NuxtLink>
            </div>
        </Banner>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="grid grid-cols-1 sm:grid-cols-2">
                <div class="flex flex-col items-center justify-center p-4 text-center">
                    <h2 class="text-lg md:text-xl lg:text-3xl font-normal">Choose a classic <br> engagement ring</h2>
                    <p class="mt-2 text-sm lg:text-base">Shop our unique selection of engagement ring settings</p>
                    <NuxtLink
                        :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
                        class="mt-6 flex items-center justify-center text-xs ffocus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
                        aria-label="Shop engagement rings"
                        @click="$bus.emit('aria-announce','Navigating to engagement rings search page')"
                    >
                        Shop Engagement Rings
                    </NuxtLink>
                </div>
                <div class="p-4">
                    <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                        src="/landing-pages/heros/rb_enring.jpg?updatedAt=1746137288408"
                        alt="Classic engagement ring example"/>
                </div>
            </div>
        </section>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12" aria-label="Ring categories">
            <div class="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 grid-flow-dense sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">
                <NuxtLink
                    :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_ANNIVERSARY"
                    class="relative flex flex-col border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Search anniversary rings"
                    @click="$bus.emit('aria-announce','Navigating to anniversary wedding rings search page')"
                >
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/rb_anniversary.jpg?updatedAt=1746137288444"
                            alt="Anniversary Rings"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Anniversary Rings</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Search Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink
                    :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_ETERNITY"
                    class="relative border border-gray-200 col-span-2 flex flex-col focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Search eternity rings"
                    @click="$bus.emit('aria-announce','Navigating to eternity wedding rings search page')"
                >
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/rb_eternity.jpg?updatedAt=1746137289688"
                            alt="Eternity Rings"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Eternity Rings</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Search Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink
                    :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_FASHION"
                    class="relative flex flex-col border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Search fashion rings"
                    @click="$bus.emit('aria-announce','Navigating to fashion rings search page')"
                >
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/rb_fashion.jpg?updatedAt=1746137289628"
                            alt="Fashion Rings"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Fashion Rings</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Search Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink
                    :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH"
                    class="relative col-end-auto col-span-2 sm:row-span-2 flex flex-col focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Search wedding bands"
                    @click="$bus.emit('aria-announce','Navigating to wedding bands search page')"
                >
                    <div class="relative w-full h-full grow flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/wedding_rings_script.jpg?updatedAt=1746137327890"
                            alt="Wedding Bands"/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-sm lg:text-xl">Wedding Bands</h2>
                        <p>Classic metal and diamond ring style</p>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Search Now</span>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div class="mt-8 lg:mt-16">
             <ContactLink />
        </div>
    </div>
</template>
<script setup>
import Banner from "~/components/ui/Banner.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const { $bus } = useNuxtApp();

onMounted(() => {
    $bus.emit(
        "aria-announce",
        "Classic Rings and Bands page loaded. Explore engagement rings, anniversary rings, eternity rings, fashion rings, and wedding bands."
    );
});
</script>