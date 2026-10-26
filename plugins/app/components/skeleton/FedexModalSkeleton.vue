<template>
    <div role="status" aria-label="Loading FedEx locations">
        <span class="sr-only">Loading FedEx locations...</span>
        <!-- description bar -->
        <div class="border-t border-b border-gray-200 py-5 px-4 space-y-3 text-center">
          <div class="skeleton-shimmer h-3 w-3/4 mx-auto rounded"></div>
          <div class="skeleton-shimmer h-3 w-1/2 mx-auto rounded"></div>
          <div class="skeleton-shimmer h-8 w-36 mx-auto rounded"></div>
        </div>
        <!-- 2-col grid matching actual location cards -->
        <div class="grid grid-cols-2 [&>*:nth-child(n+3)]:border-t border-gray-200">
          <div v-for="n in 4" :key="n"
            class="flex flex-col justify-between gap-3 even:border-l even:border-gray-200 p-4">
            <div class="flex flex-col gap-2">
              <div class="skeleton-shimmer h-3.5 w-3/4 rounded"></div>
              <div class="skeleton-shimmer h-3 w-full rounded"></div>
              <div class="skeleton-shimmer h-3 w-2/3 rounded"></div>
              <div class="skeleton-shimmer h-3 w-1/2 rounded"></div>
              <div class="skeleton-shimmer h-3 w-2/5 rounded mt-1"></div>
              <div class="mt-1 space-y-1.5">
                <div class="skeleton-shimmer h-3 w-1/4 rounded"></div>
                <div class="skeleton-shimmer h-3 w-3/5 rounded"></div>
                <div class="skeleton-shimmer h-3 w-1/2 rounded"></div>
                <div class="skeleton-shimmer h-3 w-3/5 rounded"></div>
              </div>
            </div>
            <div class="skeleton-shimmer h-9 w-full rounded mt-2"></div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name: 'FedexModalSkeleton'
}
</script>