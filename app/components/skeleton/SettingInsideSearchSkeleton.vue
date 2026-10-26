<template>
  <div class="max-w-7xl mx-auto w-full pt-4" role="status" aria-busy="true" aria-label="Loading search results">
    <span class="sr-only">Loading settings...</span>

    <div class="pt-3 pb-4 sm:pb-6 grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-8 sm:gap-x-4 md:gap-x-8 md:gap-y-10">
      <div v-for="n in 12" :key="n" class="flex flex-col gap-3">
        <div class="skeleton-shimmer w-full aspect-square rounded"></div>
        <div class="skeleton-shimmer h-4 w-3/4 rounded"></div>
        <div class="skeleton-shimmer h-3 w-1/2 rounded"></div>
        <div class="skeleton-shimmer h-4 w-1/3 rounded"></div>
      </div>
    </div>
  </div>
</template>
