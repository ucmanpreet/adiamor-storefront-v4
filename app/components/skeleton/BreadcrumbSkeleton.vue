<template>
    <div class="max-w-7xl mx-auto w-full px-4 lg:px-8 pt-6 flex items-center gap-2 pb-8">
      <div v-for="n in 3" :key="n" class="flex items-center gap-2">
        <div class="skeleton-shimmer h-3 rounded" :class="n === 3 ? 'w-24' : 'w-16'"></div>
        <div v-if="n < 3" class="skeleton-shimmer h-3 w-3 rounded"></div>
      </div>
    </div>
</template>
