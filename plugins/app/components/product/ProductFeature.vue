<template>
  <section :aria-labelledby="'features-heading'" :class="isHomeView ? '' : 'pt-12'">
    <div :class="isHomeView ? 'md:py-5 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-4 sm:py-8 sm:flex flex-row items-center space-y-4 sm:space-y-0 gap-4 lg:gap-16' : 'mx-auto max-w-7xl w-full text-center px-4 lg:px-8'">
      <div class="sm:max-w-xs lg:max-w-full">
        <h2
          :class="[
            'font-normal text-lg md:text-xl',
            isHomeView ? 'lg:text-3xl' : 'lg:text-2xl/[50px] text-black',
          ]"
          id="features-heading"
        >
          As Featured in
        </h2>
        <p v-if="isHomeView" class="mt-1 text-sm">As seen in prominent media outlets, endorsed by top brands, and celebrated for outstanding quality globally.</p>
      </div>

      <div :class="isHomeView ? 'grid grid-cols-3 gap-4 md:gap-x-12 sm:gap-2 sm:ml-auto' : 'sm:mt-8 grid grid-cols-6 place-items-center sm:grid-cols-6'">
        <div
          v-for="(el, index) in featuredList"
          :key="index"
          :class="isHomeView ? '' : 'relative h-20 md:h-[116px] lg:h-auto'"
        >
          <NuxtLink
            :to="inMediaPath"
            class="md:opacity-40 hover:opacity-100 md:focus:opacity-100"
          :class="isHomeView ? 'relative h-12 md:h-20 overflow-hidden focus:ring-2 focus:ring-primary md:focus:grayscale-0 block md:grayscale hover:grayscale-0 transition duration-300' : ''"
            :aria-label="el"
            @click="isHomeView && $bus.emit('aria-announce', `Navigated to media featuring ${el}`)"
          >
            <MediaImage
              loading="lazy"
              :src="`/images/partners/${el}.webp`"
              :alt="`${el} media feature logo`"
              className="h-full w-full object-contain object-center focus:ring-2 focus:ring-primary"
            />
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import MediaImage from '../common/MediaImage.vue';

export default {
    name : 'ProductFeature',
    components: { MediaImage },
    props: ['type'],
    data() {
        return {
            featuredList: ['nbc', 'this_is_la', 'weddingwire', 'the_knot', 'telemundo', 'buzzfeed'],
            inMediaPath: STATIC_ROUTES.IN_THE_MEDIA
        }
    },
    computed: {
        isHomeView() {
            return this.type === 'home';
        }
    },
}
</script>