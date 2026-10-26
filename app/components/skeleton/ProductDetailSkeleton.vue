<template>
  <div role="status" aria-busy="true" aria-label="Loading product details">
    <span class="sr-only">Loading product details...</span>

    <BreadcrumbSkeleton />
    
    <BundleStepsSkeleton v-if="showBundleSteps" />

    <!-- Main product layout: image + info -->
    <div class="mt-8 flex flex-col lg:flex-row gap-y-2 sm:gap-y-8 xl:gap-y-0 gap-x-14 max-w-7xl mx-auto w-full px-4 lg:px-8 sm:pb-2 sm:pt-6">
      <!-- Image gallery skeleton -->
      <div class="w-full lg:flex-1 flex flex-col gap-3">
        <div class="skeleton-shimmer w-full aspect-square rounded"></div>
        <div class="flex justify-center gap-2">
          <div v-for="n in 4" :key="n" class="skeleton-shimmer w-16 h-16 sm:w-20 sm:h-20 rounded flex-none"></div>
        </div>
      </div>

      <!-- Product info skeleton -->
      <div class="w-full lg:max-w-[510px] flex-none flex flex-col gap-4 mt-2 sm:mt-6 lg:mt-0">
        <!-- Title -->
        <div class="skeleton-shimmer h-12 w-3/4 rounded"></div>
        <!-- style -->
        <div class="skeleton-shimmer h-4 w-16 rounded ml-2"></div>
        <!-- Rating -->
        <div class="flex gap-1 items-center">
          <div v-for="n in 5" :key="n" class="skeleton-shimmer w-4 h-4 rounded"></div>
          <div class="skeleton-shimmer h-4 w-16 rounded ml-2"></div>
        </div>
        <!-- Price -->
        <div class="skeleton-shimmer h-8 w-36 rounded"></div>
        <!-- Variants / options -->
        <div class="flex flex-wrap gap-2 mt-2">
          <div v-for="n in 6" :key="n" class="skeleton-shimmer h-9 w-16 rounded"></div>
        </div>
        <!-- Add to cart button -->
        <div class="flex gap-4 mt-2 max-w-sm">
          <div class="flex-1 skeleton-shimmer h-12 w-full rounded"></div>
          <div class="h-12 w-20 skeleton-shimmer rounded"></div>
        </div>
        <!-- Description lines -->
        <div class="space-y-2 mt-2">
          <div class="skeleton-shimmer h-4 w-full rounded"></div>
          <div class="skeleton-shimmer h-4 w-5/6 rounded"></div>
          <div class="skeleton-shimmer h-4 w-4/6 rounded"></div>
        </div>
        <!-- Add to cart button -->
        <div class="skeleton-shimmer h-12 w-full rounded mt-2"></div>
        <!-- Secondary button -->
        <div class="skeleton-shimmer h-10 w-full rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BundleStepsSkeleton from '~/components/skeleton/BundleStepsSkeleton.vue';
import BreadcrumbSkeleton from './BreadcrumbSkeleton.vue';

const route = useRoute();

const showBundleSteps = computed(() => {
  const path = route?.path || '';
  return path.includes('engagement-rings') || path.includes('diamond-pair');
});
</script>
