<template>
  <div class="max-w-7xl mx-auto w-full px-4 lg:px-8 pt-4" role="status" aria-busy="true" aria-label="Loading search results">
    <span class="sr-only">Loading search results...</span>

    <!-- SearchBanner skeleton -->
    <div class="pb-4 sm:pb-8 pt-10">
      <!-- SearchHeader: title + description -->
      <div class="text-center space-y-3 pb-4 sm:pb-8">
        <div class="skeleton-shimmer h-6 w-48 mx-auto rounded"></div>
        <div class="skeleton-shimmer h-4 w-96 max-w-full mx-auto rounded"></div>
      </div>
      <!-- Natural / Lab Grown toggle pill -->
      <div class="flex justify-center mb-6">
        <div class="skeleton-shimmer h-10 w-64 rounded-full"></div>
      </div>
    </div>

    <div class="flex xl:gap-6">
      <!-- Filter sidebar skeleton (desktop only) -->
      <div class="hidden xl:flex flex-none w-[21.875rem] flex-col border-r border-b border-gray-200">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-[1.125rem] border-b border-gray-200">
          <div class="skeleton-shimmer h-5 w-16 rounded"></div>
        </div>
        <!-- Search input -->
        <div class="px-7 pt-3 pb-2 border-b border-gray-200">
          <div class="skeleton-shimmer h-9 w-full rounded"></div>
        </div>
        <!-- Accordion filter rows -->
        <div class="divide-y divide-gray-200 px-7">
          <div v-for="n in 8" :key="n" class="flex items-center justify-between py-[1.125rem]">
            <div class="skeleton-shimmer h-4 rounded" :class="n % 3 === 0 ? 'w-24' : n % 3 === 1 ? 'w-32' : 'w-20'"></div>
            <div class="skeleton-shimmer h-4 w-4 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <div class="flex-1">
        <!-- Filter bar -->
        <div class="flex items-center gap-3 py-4 border-b border-gray-200 mb-6">
          <div class="skeleton-shimmer h-9 w-24 rounded"></div>
          <div class="skeleton-shimmer h-9 w-32 rounded ml-auto"></div>
          <div class="skeleton-shimmer h-9 w-28 rounded"></div>
        </div>
        <!-- Product grid -->
        <div class="divide-y divide-gray-200">
          <DiamondPairSearchInsideSkeleton v-for="n in 9" :key="n" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiamondPairSearchInsideSkeleton from './DiamondPairSearchInsideSkeleton.vue';
export default {
  name: 'DiamondPairSearchSkeleton',
  components: {
    DiamondPairSearchInsideSkeleton
  }
};
</script>
