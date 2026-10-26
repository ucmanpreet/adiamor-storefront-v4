<template>
  <div class="bg-primary pb-8 md:pb-16">
    <div
      class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 text-center sm:text-left md:text-center space-y-5 sm:space-y-9"
    >
      <div class="grid grid-cols-2 sm:grid-cols-8 sm:grid-rows-2 sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">

        <!-- Thin Band -->
        <NuxtLink
          :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_THIN_BAND"
          class="relative col-span-2 sm:col-span-4 sm:row-span-2 flex flex-col space-y-4 focus:outline-none focus:ring-2 focus:ring-white/80 rounded-lg"
          aria-label="Thin Band Engagement Rings collection"
        >
          <div class="relative w-full grow flex-1" aria-hidden="true">
            <nuxt-img provider="cdn"
              class="w-full h-full object-cover object-top"
              src="/landing-pages/heros/thin-band-engagement-rings.jpg?updatedAt=1747992732413"
              alt=""
            />
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
            <h2 class="font-normal text-xs sm:text-sm lg:text-xl">Thin Band Engagement Rings</h2>
            <p class="mt-1 text-xs sm:text-base line-clamp-2 sm:line-clamp-none">
              Adiamor's thin band engagement ring collection features a modern take on classic styles with band widths ranging from 1.5mm to 1.7mm. Thin band ring styles include simple solitaires, diamond bands, halos and 3 stone rings.
            </p>
          </div>
        </NuxtLink>

        <!-- Yellow Gold -->
        <NuxtLink
          :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_YELLOW_GOLD"
          class="relative sm:col-span-2 flex flex-col space-y-4 focus:outline-none focus:ring-2 focus:ring-white/80 rounded-lg"
          aria-label="Yellow Gold Engagement Rings"
        >
          <div class="relative w-full grow flex-1" aria-hidden="true">
            <nuxt-img provider="cdn"
              class="w-full h-full object-cover object-top"
              src="/landing-pages/heros/yellow-gold-rings.jpg?updatedAt=1747993301614"
              alt=""
            />
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
            <h2 class="font-normal text-xs sm:text-sm lg:text-xl">Yellow Gold Rings</h2>
          </div>
        </NuxtLink>

        <!-- Platinum -->
        <NuxtLink
          :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PLATINUM"
          class="relative sm:col-span-2 flex flex-col space-y-4 focus:outline-none focus:ring-2 focus:ring-white/80 rounded-lg"
          aria-label="Platinum Engagement Rings"
        >
          <div class="relative w-full grow flex-1" aria-hidden="true">
            <nuxt-img provider="cdn"
              class="w-full h-full object-cover object-top"
              src="/landing-pages/heros/platinum-rings.jpg?updatedAt=1747993928356"
              alt=""
            />
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
            <h2 class="font-normal text-xs sm:text-sm lg:text-xl">Platinum Rings</h2>
          </div>
        </NuxtLink>

        <!-- Rose Gold -->
        <NuxtLink
          :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ROSE_GOLD"
          class="relative sm:col-span-2 flex flex-col space-y-4 focus:outline-none focus:ring-2 focus:ring-white/80 rounded-lg"
          aria-label="Rose Gold Engagement Rings"
        >
          <div class="relative w-full grow flex-1" aria-hidden="true">
            <nuxt-img provider="cdn"
              class="w-full h-full object-cover object-top"
              src="/landing-pages/heros/rose-gold-rings.jpg?updatedAt=1747994082842"
              alt=""
            />
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
            <h2 class="font-normal text-xs sm:text-sm lg:text-xl">Rose Gold Rings</h2>
          </div>
        </NuxtLink>

        <!-- White Gold -->
        <NuxtLink
          :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_WHITE_GOLD"
          class="relative sm:col-span-2 flex flex-col sm:space-y-4 focus:outline-none focus:ring-2 focus:ring-white/80 rounded-lg"
          aria-label="White Gold Engagement Rings"
        >
          <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full" aria-hidden="true">
            <nuxt-img provider="cdn"
              class="w-full h-full object-cover object-top"
              src="/landing-pages/heros/white-gold-rings.jpg?updatedAt=1747993716309"
              alt=""
            />
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
            <h2 class="font-normal text-xs sm:text-sm lg:text-xl">White Gold Rings</h2>
          </div>
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script>
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : 'RingMetal',
    props: ['heading', 'description'],
    data() {
        return {
            STATIC_ROUTES
        }
    }
}
</script>