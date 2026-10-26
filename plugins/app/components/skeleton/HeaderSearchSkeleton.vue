<template>
    <div>
        <span class="sr-only">Searching products...</span>
        <div v-for="n in 4" :key="n" class="flex items-center gap-3 py-1">
            <div class="skeleton-shimmer w-10 h-10 flex-none"></div>
            <div class="flex-1 space-y-2">
            <div class="skeleton-shimmer h-3 rounded w-3/4"></div>
            <div class="skeleton-shimmer h-3 rounded w-1/3"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderSearchSkeleton'
}
</script>