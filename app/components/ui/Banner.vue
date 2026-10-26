<template>
  <section class="relative w-full md:h-[568px]" :aria-label="sectionLabel || undefined">
    <Link v-if="hrefLink" :href="hrefLink" :aria-label="alt || undefined" class="absolute inset-0 z-0"/>
    <picture class="absolute inset-0 w-full h-full">
      <!-- Mobile (must be first for max-width to work) -->
      <source
        v-if="mobileImage || bgImage"
        media="(max-width: 767px)"
        :srcset="getMobileImageUrl('w-768,h-768')"
      />
      <!-- Tablet -->
      <source
        v-if="bgImage"
        media="(min-width: 768px)"
        :srcset="getImageUrl('cm-pad_resize,h-568')"
      />
      <!-- Desktop -->
      <source
        v-if="bgImage"
        media="(min-width: 1024px)"
        :srcset="getImageUrl('cm-pad_resize,h-568')"
      />
      <!-- Fallback img -->
      <img
        v-if="bgImage"
        :src="getImageUrl('w-768,h-270')"
        :alt="getAlt(alt)"
        :role="(!alt || !alt.trim()) ? 'presentation' : undefined"
        fetchpriority="high"
        decoding="async"
        :class="[
          'w-full h-full object-cover',
          imgPosition ? imgPosition : 'object-center'
        ]"
      />
    </picture>

    <div
      class="flex items-center relative z-0 mx-auto w-full h-full px-3 sm:px-6 lg:px-12 py-8 lg:py-32 max-w-7xl"
      :class="[
        contentPosition === 'left' ? 'justify-start' : 'justify-end',
        contentPosition === 'left' ? 'pl-3 md:pl-8' : 'pr-3 md:pr-8',
        contentClass ? contentClass : ''
      ]"
    >
      <div
        class="p-6 w-full"
        :class="[
          contentBackgroundColor ? contentBackgroundColor : 'bg-white shadow-banner',
          contentTextColor ? contentTextColor : 'text-gray-black',
          contentWidth ? contentWidth : 'max-w-sm lg:max-w-lg'
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import Link from '~/components/ui/Link.vue';

const props = defineProps({
  bgImage: String,
  mobileImage: String,
  hrefLink: String,
  alt: {
    type: String,
    default: '' // Set default empty if decorative
  },
  contentPosition: String,
  contentClass: String,
  contentTextColor: String,
  contentBackgroundColor: String,
  imgPosition: String,
  contentWidth: String,
  mobileObjectCordinates: String,
  sectionLabel: String
});

function getAlt(alt) {
  return (alt !== null && alt !== undefined) ? alt : 'Product image';
}

function getImageUrl(transformations) {
  const src = props.bgImage
  if (!src) return ''
  const [baseUrl, queryString] = src.split('?')
  const updatedAt = queryString?.split('&').find(param => param.startsWith('updatedAt='))
  // mobile focus object
  const focus = props.mobileObjectCordinates ? `,fo-${props.mobileObjectCordinates}` : ''
  return `${baseUrl}?tr=${transformations}${focus}${updatedAt ? `&${updatedAt}` : ''}`
}

function getMobileImageUrl(transformations) {
  const src = props.mobileImage || props.bgImage
  if (!src) return ''
  const [baseUrl, queryString] = src.split('?')
  const updatedAt = queryString?.split('&').find(param => param.startsWith('updatedAt='))
  const focus = props.mobileObjectCordinates ? `,x-${props.mobileObjectCordinates}` : ''
  return `${baseUrl}?tr=${transformations}${focus}${updatedAt ? `&${updatedAt}` : ''}`
}
</script>