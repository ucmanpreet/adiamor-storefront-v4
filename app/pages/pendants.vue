<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/pendants-wide.png?updatedAt=1746137286915`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            :imgPosition="`object-left`"
			alt="Diamond pendants and necklaces"
			>
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Diamond Pendants & Necklaces</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Shop our collection of elegant pendants and necklaces</p>
            <div class="flex justify-start gap-4">
                <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH"
                    aria-label="Search All Pendants"
                    @click="$bus.emit('aria-announce', 'Navigating to Search All Pendants')"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90 focus:ring-primary">Search
                    All Pendants</NuxtLink>
            </div>
        </Banner>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="grid grid-cols-1 sm:grid-cols-2">
                <div class="flex flex-col items-center justify-center p-4 text-center">
                    <h2 class="text-lg md:text-xl lg:text-3xl font-normal">Design Your Own<br> Diamond Pendant
                    </h2>
                    <p class="mt-2 text-sm lg:text-base max-w-md">Choose a diamond and design your unique piece of timeless.</p>
                    <NuxtLink class="mt-6 flex items-center justify-center text-xs focus:outline-none focus:ring-1 font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90 focus:ring-primary"
                        aria-label="Build Your Pendant"
                        @click="$bus.emit('aria-announce', 'Navigating to Build Your Pendant')"
                        :to="STATIC_ROUTES.DESIGN_PENDANT">Build Your Pendant</NuxtLink>
                </div>
                <div class="p-4">
                    <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                        src="/landing-pages/heros/byo_pendantbg.jpg?updatedAt=1746137185851" alt="Design your own diamond pendant"/>
                </div>
            </div>
        </section>

        <!-- Yopto Customer Reviews -->
        <ClientOnly><div class="yotpo yotpo-shoppers-say yotpo-size-6" data-product-id="P5197" data-yotpo-element-id="1"></div></ClientOnly>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">
                <div class="relative w-full border border-gray-200 h-96 sm:h-full">
                    <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH_PRE_SET"
                        aria-label="Pre-Set Pendants"
                        @click="$bus.emit('aria-announce', 'Navigating to Pre-Set Pendants')"
                        class="absolute inset-0 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                    </NuxtLink>
                    <nuxt-img provider="cdn" class="w-full h-full object-cover"
                        src="/landing-pages/heros/preset_new.jpg?updatedAt=1746137288600" alt="Pre-Set Pendants"/>
                    <div class="absolute inset-x-0 top-0 bg-white/50 p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Pre-Set Pendants</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </div>
                <div class="relative w-full border border-gray-200 h-96 sm:h-full">
                    <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH_GEMSTONE"
                        aria-label="Gemstone Pendants"
                        @click="$bus.emit('aria-announce', 'Navigating to Gemstone Pendants')"
                        class="absolute inset-0 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                    </NuxtLink>
                    <nuxt-img provider="cdn" class="w-full h-full object-cover"
                        src="/landing-pages/heros/pendant_gemstone2.jpg?updatedAt=1746137288324" alt="Gemstone Pendants"/>
                    <div class="absolute inset-x-0 top-0 bg-white/50 p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Gemstone Pendants</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </div>
                <div class="relative sm:col-start-2 sm:row-span-2 w-full h-full border border-gray-200">
                    <NuxtLink
                        :to="STATIC_ROUTES.FRENCH_CUT_HALO"
                        aria-label="French Cut Halo Collection"
                        @click="$bus.emit('aria-announce', 'Navigating to French Cut Halo Collection')"
                        class="absolute inset-0 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                    </NuxtLink>
                    <nuxt-img provider="cdn" class="w-full h-full object-cover"
                        src="/landing-pages/heros/pendant_fhp3.jpg?updatedAt=1746137287231"
                        alt="French Cut Halo Collection"/>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-sm lg:text-xl">French Cut Halo Collection</h2>
                        <p>A gift of luxury</p>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 lg:mt-16" role="region"
            aria-label="Contact Assistance">
            <ContactLink />
        </div>
    </div>
</template>

<script setup>
import Banner from '~/components/ui/Banner.vue';
import ContactLink from '~/components/common/ContactLink.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const { $bus } = useNuxtApp();

onMounted(() => {
    $bus.emit("aria-announce", "Diamond Pendants & Necklaces page")
});
</script>
