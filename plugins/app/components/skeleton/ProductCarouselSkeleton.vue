<template>
  <div class="max-w-7xl mx-auto w-full px-4 lg:px-8 sm:pb-2" role="status" aria-label="Loading products">
    <span class="sr-only">Loading products...</span>
    <!-- heading row -->
    <div class="flex items-center justify-between mb-4">
      <div class="skeleton-shimmer h-7 w-40 rounded"></div>
      <div class="flex gap-3">
        <div class="skeleton-shimmer w-6 h-6 rounded-full"></div>
        <div class="skeleton-shimmer w-6 h-6 rounded-full"></div>
      </div>
    </div>
    <!-- 6 cards row -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      <div v-for="n in 6" :key="n" class="flex flex-col gap-2">
        <div class="skeleton-shimmer w-full aspect-square rounded"></div>
        <div class="skeleton-shimmer h-3.5 w-3/4 rounded"></div>
        <div class="skeleton-shimmer h-3 w-1/2 rounded"></div>
        <div class="skeleton-shimmer h-8 w-full rounded"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCarouselSkeleton'
}
</script>
