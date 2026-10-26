<template>
    <div class="flex items-center w-full py-2 sm:py-3 gap-2 sm:gap-4">
        <!-- Shape col -->
        <div class="flex items-center gap-2 w-12 sm:w-32 flex-none">
            <div class="skeleton-shimmer size-6 rounded-md flex-none"></div>
            <div class="skeleton-shimmer h-3 w-14 rounded hidden sm:block"></div>
        </div>
        <!-- Data cols -->
        <div class="skeleton-shimmer h-4 rounded flex-1"></div>
        <div class="skeleton-shimmer h-4 rounded flex-1 hidden sm:block"></div>
        <div class="skeleton-shimmer h-4 rounded flex-1 hidden sm:block"></div>
        <div class="skeleton-shimmer h-4 rounded flex-1 hidden sm:block"></div>
        <div class="skeleton-shimmer h-4 rounded flex-1 hidden sm:block"></div>
        <!-- Action col -->
        <div class="skeleton-shimmer h-4 w-20 rounded flex-none ml-auto"></div>
    </div>
</template>

<script>
export default {
  name: 'DiamondSearchListInsideSkeleton',
};
</script>
