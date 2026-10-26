<!-- DiamondInfoSection.vue -->
<template>
  <section
    class="sm:pt-12 max-w-7xl mx-auto w-full px-4 lg:px-8"
    v-if="diamondData && diamondData.title"
    :aria-labelledby="`diamond-info-title-${uid}`"
  >
    <div class="px-4 py-8 lg:p-8 text-center border-t border-b border-primary">
      <div class="text-center w-full font-semibold">
        <h2
          :id="`diamond-info-title-${uid}`"
          class="text-lg lg:text-2xl/[50px]"
        >
          {{ diamondData.title }}
        </h2>
      </div>

      <div>
        <p class="mt-2 inline-block text-sm text-gray-600">
          {{ diamondData.data }}
          <br />

          <NuxtLink
            class="underline inline-block text-primary mt-3 focus:ring-2 focus:ring-primary focus:outline-none"
            :to="STATIC_ROUTES.POLICIES_CONFLICT_FREE"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Learn more about ${diamondData.title}`"
          >
            Learn More
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps(['diamondData']);
const uid = useId();
</script>