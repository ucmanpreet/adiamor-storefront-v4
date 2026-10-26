<!-- CertificationCard.vue -->
<template>
  <article :class="className" class="relative">
    <div class="relative">
      <h2 class="font-normal text-lg md:text-xl lg:text-3xl">
        <NuxtLink
          :to="STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION"
          target="_blank"
          class="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label="Open diamond certification education page"
        >Certification</NuxtLink>
      </h2>

      <p class="mt-4 text-xs sm:text-base">
        Adiamor diamonds are graded by the two most reputable laboratories in
        the industry, GIA and IGI
      </p>
    </div>

    <div class="grid grid-cols-2 gap-6 mt-4">
      <!-- GIA -->
      <a
        href="https://www.gia.edu/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-4 h-12 lg:h-auto focus:outline-none focus:ring-2 focus:ring-primary rounded"
        aria-label="Visit GIA certification website"
      >
        <nuxt-img provider="cdn"
          loading="lazy"
          src="/landing-pages/education/gia.webp?tr=w-272,q-80,cm-pad_resize&updatedAt=1747474841137"
          alt="GIA diamond certification logo"
          class="w-full h-full object-contain"
        />
      </a>

      <!-- IGI -->
      <a
        href="https://www.igi.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-4 h-12 lg:h-24 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        aria-label="Visit IGI certification website"
      >
        <nuxt-img provider="cdn"
          loading="lazy"
          src="/landing-pages/education/igi.png?tr=w-272,q-80,cm-pad_resize"
          alt="IGI diamond certification logo"
          class="w-full h-full object-contain"
        />
      </a>
    </div>
  </article>
</template>

<script>
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name : 'DiamondCertifications',
    props : ['className'],
    data() {
        return {
            STATIC_ROUTES
        }
    }
}
</script>
