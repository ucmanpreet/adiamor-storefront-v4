<template>
    <div>
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/bracelets-wide.png?updatedAt=1746137184768`"
                :contentBackgroundColor="`bg-black/70`"
                :contentTextColor="`text-white`"
            alt="Diamond Bracelets Collection Banner"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Bracelets</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Discover lovely diamond bracelets in 14k yellow gold, 14 white gold and platinum.</p>
            <div class="flex justify-start gap-4">
                <NuxtLink :to="STATIC_ROUTES.BRACELETS_SEARCH" aria-label="Search bracelets"
                    @click="announceNavigation('Bracelets search page loaded')"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-normal md:text-sm px-4 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90">Search Bracelets</NuxtLink>
            </div>
        </Banner>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-4 sm:space-y-7" aria-labelledby="browse-bracelets-heading">
            <div>
                <h2 id="browse-bracelets-heading" class="font-normal text-lg md:text-xl lg:text-3xl" :class="$route.path == STATIC_ROUTES.CART_SUMMARY ? '!text-lg' : ''">Browse Our Collections</h2>
                <p class="mt-1 text-sm">Shop our collection of diamond bracelets, featuring a range of styles and designs
                    to suit any taste.</p>
            </div>
            <ul class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:gap-x-8" role="list">
                <li v-for="item in items" :key="item.id" role="listitem">
                    <Card
                        :image="item.image"
                        :title="item.title"
                        :link="item.link"
                        :imagePosition="`!object-contain`"
                    />
                </li>
            </ul>
        </section>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-label="Featured Bracelet Categories">
            <div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                <NuxtLink :to="STATIC_ROUTES.BRACELETS_SEARCH_TENNIS"
                    class="relative flex flex-col border border-gray-200"
                    aria-label="Shop Diamond Tennis Bracelets"
                    @click="announceNavigation('Diamond Tennis Bracelets page loaded')"
                >
                    <div class="relative w-full aspect-[2/3] sm:aspect-square grow flex-1">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/diamond_bracelets2019.jpg?updatedAt=1746137193503"
                            alt="Diamond Tennis Bracelets in gold and platinum"
                            width="400" height="600" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 p-2 md:px-4 text-center">
                        <h2 class="font-normal text-xs lg:text-xl 2xl:text-2xl">Diamond Tennis Bracelets</h2>
                        <p class="text-xs lg:text-sm mt-1">Luxurious diamond bracelets available in either platinum or gold.</p>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Shop Now</span>
                    </div>
                </NuxtLink>
                <NuxtLink :to="STATIC_ROUTES.BRACELETS_SEARCH_GOLD" class="relative flex flex-col border border-gray-200"
                    aria-label="Shop Gold Bracelets"
                    @click="announceNavigation('Gold Bracelets page loaded')"
                >
                    <div class="relative w-full aspect-[2/3] sm:aspect-square h-full grow flex-1 max-h-full">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/new_braceletdiamond2.jpg?updatedAt=1746137284728"
                            alt="Gold Fashion Bracelets collection"
                            width="400" height="600" loading="lazy"/>
                    </div>
                    <div class="absolute inset-x-0 top-0 bg-white/70 p-2 md:px-4 text-center">
                        <h2 class="font-normal text-sm lg:text-xl 2xl:text-2xl">Gold Bracelets</h2>
                        <p class="text-xs lg:text-sm mt-1">Browse our exquisite collection of gold bracelets.</p>
                        <span class="text-primary inline-block mt-1 text-xs lg:text-sm">Learn More</span>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div class="mt-8 lg:mt-16" aria-label="Contact Assistance">
            <ContactLink />
        </div>
    </div>
</template>
<script setup>
import Banner from "~/components/ui/Banner.vue";
import Card from "~/components/common/Card.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const { $bus } = useNuxtApp();

const items = ref([
    {
        id: 1,
        image: '/landing-pages/heros/bracelet_metal2.jpg',
        title: 'Stackable Bracelets',
        link: STATIC_ROUTES.BRACELETS_SEARCH_STACKABLE
    },
    {
        id: 2,
        image: '/landing-pages/heros/bracelet_pearl.jpg',
        title: 'Pearl Bracelets',
        link: STATIC_ROUTES.BRACELETS_SEARCH_PEARL
    },
    {
        id: 3,
        image: '/landing-pages/heros/bracelets_2019fashion.jpg',
        title: 'Charm Bracelets',
        link: STATIC_ROUTES.BRACELETS_SEARCH_CHARM
    },
    {
        id: 4,
        image: '/landing-pages/heros/bracelets_2019tennis.jpg',
        title: 'Luxury Bracelets',
        link: STATIC_ROUTES.BRACELETS_SEARCH_LUXURY
    },
]);

onMounted(() => {
    $bus.emit(
        "aria-announce",
        "Bracelets page loaded. Browse diamond, gold, pearl, charm, and luxury bracelets."
    );
});

function announceNavigation(message) {
    $bus.emit("aria-announce", message);
}
</script>
