<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/design-your-own-stud-earrings.jpg`"
            :contentBackgroundColor="`bg-white/50`"
            :imgPosition="`object-left-top md:object-center`"
            alt="Diamond Stud Earrings Center"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Earrings</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Browse our selection of preset classic earring styles
                or design your own diamond earrings by selecting a pair of matching diamonds and a unique
                setting.</p>
            <div class="flex justify-start gap-4">
                <NuxtLink
                    :to="STATIC_ROUTES.EARRINGS_SEARCH"
                    aria-label="Search all earrings"
                    @click="$bus.emit('aria-announce', 'Navigating to search earrings page')"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
                >
                    Search All Earrings
                </NuxtLink>
            </div>
        </Banner>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="grid grid-cols-1 sm:grid-cols-2">
                <div class="flex flex-col items-center justify-center text-center p-4">
                    <h2 class="text-lg md:text-xl lg:text-3xl font-normal">Design Your Own<br> Diamond Earrings
                    </h2>
                    <p class="mt-2 text-sm lg:text-base">Create your own unique pair of diamond studs. Select a
                        classic prong earring setting, halo diamond earring or stunning dangle to design yor dream
                        diamond earrings.</p>
                    <NuxtLink
                        :to="STATIC_ROUTES.DESIGN_EARRINGS"
                        aria-label="Build your own diamond earrings"
                        @click="$bus.emit('aria-announce', 'Navigating to design your own earrings page')"
                        class="mt-6 flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
                    >
                        Build Your Earrings
                    </NuxtLink>
                </div>
                <div class="p-4">
                    <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                        src="/landing-pages/heros/byo_earringsbg.jpg?updatedAt=1746137185879"
                        alt="Design your own diamond earrings"
                        width="800" height="600" loading="lazy"/>
                </div>
            </div>
        </section>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 grid-flow-dense sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">
                <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH_GEMSTONE"
                    aria-label="Shop gemstone earrings"
                    class="relative flex flex-col cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="$bus.emit('aria-announce', 'Navigating to gemstone earrings page')"
                >
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/e_gemstone.jpeg?updatedAt=1747990532032"
                            alt="Gemstone Earrings"
                            width="400" height="400" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Gemstone Earrings</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH_PRE_SET"
                    aria-label="Shop pre-set earrings"
                    class="relative col-span-2 flex flex-col cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="$bus.emit('aria-announce', 'Navigating to pre-set earrings page')"
                >
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/e_stud.jpg?updatedAt=1747990532801"
                            alt="Pre-Set Earrings"
                            width="800" height="400" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Pre-Set Earrings</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH_PEARL"
                    aria-label="Shop pearl earrings"
                    class="relative flex flex-col cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="$bus.emit('aria-announce', 'Navigating to pearl earrings page')"
                >
                    <div class="relative w-full grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/e_pearl.jpeg?updatedAt=1747990531590"
                            alt="Pearl Earrings"
                            width="400" height="400" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-xs lg:text-xl">Pearl Earrings</h2>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink :to="STATIC_ROUTES.FRENCH_CUT_HALO"
                    aria-label="Shop French Cut Halo Collection"
                    class="relative col-end-auto col-span-2 sm:row-span-2 flex flex-col"
                    @click="$bus.emit('aria-announce', 'Navigating to french cut halo collection page')"
                >
                    <div class="relative w-full h-full grow flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/jewelry_diajel.jpg?updatedAt=1746137274543"
                            alt="French Cut Halo Collection"
                            width="800" height="800" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 backdrop-blur p-2 text-center md:px-4">
                        <h2 class="font-normal text-sm lg:text-xl">French Cut Halo Collection</h2>
                        <p>A gift of luxury</p>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <!-- "Frequently Asked Questions -->
        <Faq :faqItems="faqItems" :heading="`Diamond Earrings`" />
    </div>
</template>

<script setup>
import Banner from "~/components/ui/Banner.vue";
import Faq from "~/components/landing/Faq.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const { $bus } = useNuxtApp();

const faqItems = ref([
    {
        question: "What is the best size for diamond earrings?",
        answer: `When purchased as a celebration gift, diamond stud earrings are typically selected in the same total carat weight as the center diamond of the engagement ring. For example, a person with a 1 carat center diamond will typically wear diamond stud earrings that are half a carat each, totalling 1 carat.`,
        link: "https://www.adiamor.com/blog/diamonds/diamond-stud-earrings",
        linkText: "Learn More"
    },
]);

onMounted(() => {
    $bus.emit(
        "aria-announce",
        "Earrings page loaded. Browse preset styles or build your own diamond earrings."
    );
});
</script>