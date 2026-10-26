<template>
  <div role="status" aria-busy="true" aria-label="Loading order summary" class="space-y-4 py-4">
    <span class="sr-only">Loading order summary...</span>

    <!-- heading -->
    <div class="skeleton-shimmer h-5 w-36 rounded"></div>

    <!-- cart items -->
    <div v-for="n in 2" :key="n" class="flex gap-3 py-2 -mt-4">
      <!-- <div class="skeleton-shimmer w-14 h-14 flex-none"></div> -->
      <div class="flex-1 space-y-2 pt-1">
        <div class="skeleton-shimmer h-3 rounded w-3/4"></div>
        <div class="skeleton-shimmer h-3 rounded w-1/2"></div>
      </div>
      <div class="skeleton-shimmer h-3 rounded w-12 mt-1 flex-none"></div>
    </div>

    <!-- price rows -->
    <div class="space-y-3 border-t border-gray-100 pt-4">
      <div v-for="n in 3" :key="n" class="flex justify-between">
        <div class="skeleton-shimmer h-3 rounded w-20"></div>
        <div class="skeleton-shimmer h-3 rounded w-14"></div>
      </div>
      <div class="flex justify-between border-t border-gray-100 pt-4">
        <div class="skeleton-shimmer h-4 rounded w-12"></div>
        <div class="skeleton-shimmer h-4 rounded w-20"></div>
      </div>
    </div>

    <!-- shipping -->
    <div class="space-y-3 border-t border-gray-100 pt-4">
      <div class="skeleton-shimmer h-5 w-24 rounded"></div>
      <div class="flex gap-3">
        <div class="skeleton-shimmer w-5 h-5 rounded flex-none"></div>
        <div class="space-y-2 flex-1">
          <div class="skeleton-shimmer h-3 rounded w-40"></div>
          <div class="skeleton-shimmer h-3 rounded w-28"></div>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="skeleton-shimmer w-5 h-5 rounded flex-none"></div>
        <div class="space-y-2 flex-1">
          <div class="skeleton-shimmer h-3 rounded w-32"></div>
          <div class="skeleton-shimmer h-3 rounded w-36"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSummarySkeleton'
}
</script>
