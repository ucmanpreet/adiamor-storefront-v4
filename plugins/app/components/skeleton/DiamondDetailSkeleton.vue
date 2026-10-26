<template>
  <div role="status" aria-busy="true" aria-label="Loading diamond details">
    <span class="sr-only">Loading diamond details...</span>

    <BreadcrumbSkeleton />

    <!-- Main layout: gallery + info -->
    <div class="mt-16 flex flex-col lg:flex-row gap-y-2 sm:gap-y-8 xl:gap-y-0 gap-x-14 max-w-7xl mx-auto w-full px-4 lg:px-8 sm:pb-2 sm:pt-6">
      <!-- Diamond gallery: vertical thumbnails + main image -->
      <div class="flex flex-col-reverse sm:flex-row gap-x-6 gap-y-4 flex-1">
        <!-- Thumbnail strip -->
        <div class="flex flex-wrap sm:flex-col items-center justify-start gap-2 sm:gap-4 sm:w-24 flex-none">
          <div v-for="n in 6" :key="n" class="skeleton-shimmer w-14 h-14 sm:w-24 sm:h-24 flex-none rounded"></div>
        </div>
        <!-- Main image -->
        <div class="skeleton-shimmer flex-1 aspect-square rounded"></div>
      </div>

      <!-- Product info -->
      <div class="w-full lg:max-w-[424px] flex-none flex flex-col gap-4 mt-2 sm:mt-6 lg:mt-0">
        <!-- Title -->
        <div class="skeleton-shimmer h-7 w-3/4 rounded"></div>
        <!-- Rating -->
        <div class="flex gap-1 items-center max-w-xs">
          <div v-for="n in 4" :key="n" class="flex-1 skeleton-shimmer w-4 h-4 rounded"></div>
        </div>
        <!-- Price -->
        <div class="mt-12 skeleton-shimmer h-8 w-36 rounded"></div>
        <!-- Bank wire price -->
        <div class="skeleton-shimmer h-8 w-44 rounded"></div>
        <!-- Paypal price -->
        <div class="mt-12 skeleton-shimmer h-8 w-36 rounded"></div>
        <!-- Add to cart button -->
        <div class="flex gap-4 mt-2">
          <div class="flex-1 skeleton-shimmer h-12 w-full rounded"></div>
          <div class="h-12 w-20 skeleton-shimmer rounded"></div>
        </div>
        <!-- Secondary button -->
        <div class="flex gap-4">
          <div class="flex-1 skeleton-shimmer h-10 w-full rounded"></div>
          <div class="flex-1 skeleton-shimmer h-10 w-full rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbSkeleton from './BreadcrumbSkeleton.vue';
export default {
  name: 'DiamondDetailSkeleton',
  components: { BreadcrumbSkeleton }
};
</script>
