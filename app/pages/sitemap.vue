<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 prose sm:prose-xl sm:prose-h2:text-2xl sm:prose-h2:font-medium prose-h2:!font-sans prose-h2:mt-2 prose-li:m-0">

    <header class="py-4 space-y-3">
      <h1 class="text-center text-2xl font-semibold text-gray-900">Site Map</h1>
      <p>Look through our sitemap if you’re having trouble finding something specific that you are looking for.
        You can also try searching for a keyword using the search function on the top right of the page or call
        <a
            href="tel:8776275094"
            class="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Call Adiamor customer support at 877 627 5094"
            @click="$bus.emit('aria-announce','Calling Adiamor customer support at 877 627 5094')"
          >
          877-627-5094
        </a>
        to speak to one of our representatives.
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-wrap gap-4 py-8">
      <div v-for="section in siteMapSections" :key="section.title" class="relative space-y-4 p-4">
        <h2 class="capitalize tracking-wide bg-white">
          <span v-if="!section.path">{{ section.title }}</span>

          <NuxtLink
            v-else
            :to="section.path"
            class="text-gray-900 hover:text-primary underline focus:outline-none focus:ring-2 focus:ring-primary"
            :aria-label="`Navigate to ${section.title}`"
            @click="$bus.emit('aria-announce', `Navigating to ${section.title}`)"
          >
            {{ section.title }}
          </NuxtLink>
        </h2>

        <ul>
          <li v-for="link in section.items" :key="link.path">
            <template v-if="link.external">
              <a
                :href="link.path"
                class="text-gray-900 hover:text-primary underline focus:outline-none focus:ring-2 focus:ring-primary"
                :aria-label="`Open ${link.label} in a new page`"
                @click="$bus.emit('aria-announce', `Opening ${link.label}`)"
              >
                {{ link.label }}
              </a>
            </template>

            <NuxtLink
                v-else-if="link.path"
                :to="link.path"
                class="text-gray-900 hover:text-primary underline focus:outline-none focus:ring-2 focus:ring-primary"
                :aria-label="`Navigate to ${link.label}`"
                @click="$bus.emit('aria-announce', `Navigating to ${link.label}`)"
              >
                {{ link.label }}
              </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { sitemapData } from '@/static/js/sitemap.js';

const { $bus } = useNuxtApp();

const siteMapSections = ref(sitemapData);

onMounted(() => {
  $bus.emit(
    'aria-announce',
    'Site Map page loaded. Browse all available sections and links.'
  );
});
</script>