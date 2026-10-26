<template>
  <nav
    class="max-w-7xl mx-auto w-full px-4 lg:px-8 py-3 sm:py-4 flex items-center capitalize"
    aria-label="Breadcrumb"
  >
    <!-- Cart step links -->
    <ol v-if="isCartPage" class="inline-flex items-center overflow-hidden w-full" aria-label="Checkout steps">
      <!-- Summary page: Home / Summary -->
      <template v-if="currentCartSlug === 'summaryPage'">
        <li class="inline-flex items-center">
          <NuxtLink :to="STATIC_ROUTES.HOME" class="text-xs text-gray-500 hover:text-primary truncate transition-colors">Home</NuxtLink>
        </li>
        <li class="inline-flex items-center">
          <span aria-hidden="true" class="text-gray-400 select-none mx-0.5">/</span>
          <span class="text-xs font-semibold text-primary truncate" aria-current="step">Summary</span>
        </li>
      </template>

      <!-- Contact / Payment / Review: all 4 cart steps, no Home -->
      <template v-else>
        <li
          v-for="(step, index) in cartSteps"
          :key="step.slug"
          class="inline-flex items-center"
        >
          <span v-if="index !== 0" aria-hidden="true" class="text-gray-400 select-none mx-0.5">/</span>
          <!-- Current step -->
          <span
            v-if="step.slug === currentCartSlug"
            class="text-xs font-semibold text-primary truncate"
            aria-current="step"
          >{{ step.name }}</span>
          <!-- Past step — clickable -->
          <NuxtLink
            v-else-if="cartStepIndex(step.slug) < currentCartIndex"
            :to="`${step.url}?visitor_code=${$hydrated ? getVisitorCode : ''}`"
            class="text-xs text-black hover:text-primary truncate transition-colors"
          >{{ step.name }}</NuxtLink>
          <!-- Future step — disabled -->
          <span
            v-else
            class="text-xs text-gray-400 truncate cursor-not-allowed"
            aria-disabled="true"
          >{{ step.name }}</span>
        </li>
      </template>
    </ol>

    <!-- Regular breadcrumbs -->
    <ol v-else class="inline-flex items-center overflow-hidden text-ellipsis truncate w-full">
      <li
        v-for="(item, index) in allBreadCrumbs"
        :key="index"
        class="inline-flex items-center"
      >
        <span v-if="index !== 0" aria-hidden="true" class="text-gray-600 select-none mx-0.5">/</span>
        <span
          v-if="index === allBreadCrumbs.length - 1"
          class="text-xs text-gray-500 truncate"
          aria-current="page"
          :title="item.name"
        >{{ item.name }}</span>
        <NuxtLink
          v-else
          :to="getUrl(item.url)"
          class="text-xs text-current hover:text-primary truncate"
          :title="item.name"
        >{{ item.name }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const CART_SLUGS = ['summaryPage', 'contactPage', 'paymentPage', 'reviewPage'];

const props = defineProps(['breadCrumbs']);

const route = useRoute();
const nuxtApp = useNuxtApp();
const config = useRuntimeConfig().public;

const cartSteps = ref([
  { name: 'Summary',  slug: 'summaryPage', url: STATIC_ROUTES.CART_SUMMARY },
  { name: 'Shipping',  slug: 'contactPage', url: STATIC_ROUTES.CART_CONTACT },
  { name: 'Payment',  slug: 'paymentPage', url: STATIC_ROUTES.CART_PAYMENT },
  { name: 'Review',   slug: 'reviewPage',  url: STATIC_ROUTES.CART_REVIEW },
]);

const isCartPage = computed(() => CART_SLUGS.includes(route.name));
const currentCartSlug = computed(() => route.name);
const currentCartIndex = computed(() => cartSteps.value.findIndex(s => s.slug === currentCartSlug.value));
const allBreadCrumbs = computed(() => {
  let breadcrumbs = [];
  if (props.breadCrumbs && props.breadCrumbs.length) {
    breadcrumbs = props.breadCrumbs;
    let index = breadcrumbs.findIndex(item => item.name.toLowerCase() === 'diamond pair');
    if (index > -1) {
      let pairBreadCrumb = breadcrumbs[index];
      breadcrumbs.splice(index - 1, 2, {
        name: 'Diamond Pair Search',
        url: STATIC_ROUTES.DIAMONDS_SEARCH_PAIR,
      });
    }
  }
  return breadcrumbs;
});
const getVisitorCode = computed(() => nuxtApp.$getVisitorCode());

useHead(() => {
  if (!allBreadCrumbs.value.length) return {};
  return {
    script: [
      {
        key: 'ld-json-breadcrumb',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': allBreadCrumbs.value.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': `${config.storeFrontHomeURL}${item.url || '/'}`
          }))
        })
      }
    ]
  };
});

function cartStepIndex(slug) {
  return cartSteps.value.findIndex(s => s.slug === slug);
}
function getUrl(url) {
  if (url == '/') return STATIC_ROUTES.HOME;
  let slashAtEnd = url.endsWith('/');
  return slashAtEnd ? url : `${url}` || STATIC_ROUTES.HOME
}
</script>

<style scoped>
/* Optional: ensure text truncation with ellipsis */
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
