<template>
  <div class="max-w-7xl mx-auto w-full lg:px-8 pb-4 sm:pb-2" role="status" aria-busy="true" aria-label="Loading bundle steps">
    <span class="sr-only">Loading steps...</span>
    <div class="flex sm:grid grid-cols-3 xl:grid-cols-4 bg-white overflow-hidden sm:divide-x border-t border-b sm:border border-[#ebebeb] divide-[#ebebeb] sm:rounded-full h-[56px] lg:h-auto">

      <!-- Col 1: title label (xl only) -->
      <div class="hidden xl:flex items-center py-3 px-6 xl:px-10">
        <div class="skeleton-shimmer h-4 w-36 rounded"></div>
      </div>

      <!-- Step 1 -->
      <div class="relative flex-1 flex items-center py-1 px-2 sm:py-3 md:px-3 lg:px-6 xl:px-10 gap-2 sm:gap-3">
        <!-- Number circle -->
        <div class="flex-none text-center xl:absolute xl:left-0 xl:-translate-x-1/2">
          <div class="skeleton-shimmer rounded-full w-5 h-5 xs:w-8 xs:h-8 xl:w-12 xl:h-12"></div>
        </div>
        <!-- Text -->
        <div class="flex-1 flex flex-col gap-1.5 truncate min-w-0">
          <div class="skeleton-shimmer h-3 w-3/4 rounded"></div>
          <div class="skeleton-shimmer h-2.5 w-1/2 rounded hidden sm:block"></div>
        </div>
        <!-- Icon (hidden on mobile) -->
        <div class="ml-4 flex-none hidden sm:block skeleton-shimmer w-6 h-6 lg:w-9 lg:h-9 rounded"></div>
      </div>

      <!-- Step 2 -->
      <div class="relative flex-1 flex items-center py-1 px-2 sm:py-3 md:px-3 lg:px-6 xl:px-10 gap-2 sm:gap-3">
        <!-- Number circle -->
        <div class="flex-none text-center xl:absolute xl:left-0 xl:-translate-x-1/2">
          <div class="skeleton-shimmer rounded-full w-5 h-5 xs:w-8 xs:h-8 xl:w-12 xl:h-12"></div>
        </div>
        <!-- Text -->
        <div class="flex-1 flex flex-col gap-1.5 truncate min-w-0">
          <div class="skeleton-shimmer h-3 w-3/4 rounded"></div>
          <div class="skeleton-shimmer h-2.5 w-1/2 rounded hidden sm:block"></div>
        </div>
        <!-- Icon (hidden on mobile) -->
        <div class="ml-4 flex-none hidden sm:block skeleton-shimmer w-6 h-6 lg:w-9 lg:h-9 rounded"></div>
      </div>

      <!-- Step 3: Review -->
      <div class="relative flex-1 md:flex-auto flex items-center py-1 px-2 sm:py-3 md:px-3 lg:px-6 xl:px-10 gap-2 sm:gap-3">
        <!-- Number circle -->
        <div class="flex-none text-center xl:absolute xl:left-0 xl:-translate-x-1/2">
          <div class="skeleton-shimmer rounded-full w-5 h-5 xs:w-8 xs:h-8 xl:w-12 xl:h-12"></div>
        </div>
        <!-- Text -->
        <div class="flex-1 flex justify-center sm:justify-start">
          <div class="skeleton-shimmer h-3 w-20 sm:w-28 rounded"></div>
        </div>
        <!-- Icon (hidden on mobile) -->
        <div class="hidden sm:block skeleton-shimmer w-6 h-6 lg:w-9 lg:h-9 rounded flex-none"></div>
      </div>

    </div>
  </div>
</template>
