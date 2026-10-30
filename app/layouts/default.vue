<template>
  <div class="font-sans text-black font-light antialiased flex flex-col min-h-screen">

    <!-- Skip to Main Content -->
    <a href="#main-content" class="skip-link hidden sm:block">
      Skip to content
      <div class="content" aria-hidden="true">
        <span class="icon">↵</span>
        ENTER
      </div>
    </a>

    <Header />

    <!-- Add Breadcrumbs component here -->
    <BreadCrumb :breadCrumbs="breadcrumbs" v-show="checkRoute && (breadcrumbs?.length || isCartPage)" />

    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <ScrollToTop v-if="isSearchView" />
    <Footer />

    <!-- Global ARIA Live Region — at root level so it persists across page transitions -->
    <div id="global-aria-live" class="sr-only" aria-live="polite" aria-atomic="true">
      {{ ariaAnnouncement }}
    </div>
  </div>
</template>
<script setup>
import { deepClone } from '~/utils/deepClone.js';
import ScrollToTop from '~/components/ui/ScrollToTop.vue';
import Header from '~/components/layout/header/index.vue';
import landingData from '@/static/js/pageMetaHeading.js';
import BreadCrumb from '~/components/ui/BreadCrumb.vue';
import Footer from '~/components/layout/Footer.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig().public;
const { $bus, $getVisitorCode } = useNuxtApp();

// Page meta (search / featured / landing pages) used to be fetched only by the client router plugin, so the server
// HTML carried the default title. Fetch it during SSR; the client sees `metaPath` already set (Pinia payload) and skips it.
if (import.meta.server && store.metaPath !== route.path) {
  try { await store.fetchDynamicMeta(route); } catch (e) { console.error('Meta fetch failed:', e); }
}

const catType = ref('');
const filterType = ref('');
const siteName = "Adiamor Diamonds and Fine Jewelry";
const breadcrumbs = ref([]);
const excludeRoutesForBreadcrumbs = ['home', 'login', 'thankyouPage'];
const product = ref(null);
const ariaAnnouncement = ref('');

const metaData = computed(() => {
  const meta = store.metaData || store.getMetaData || {};
  const rootMeta = landingData[STATIC_ROUTES.HOME];
  return {
    title: meta.meta_title || meta.page_title || meta.title || rootMeta.title,
    description: meta.meta_description || meta.description || rootMeta.description,
    keyword: meta.meta_keywords || meta.keywords || rootMeta.keyword,
    pageTitle: meta.page_title || meta.title || rootMeta.title,
    canonical_url: meta?.canonical_url,
    image: meta?.og_image_url || meta?.image
  };
});
const checkRoute = computed(() => !excludeRoutesForBreadcrumbs.includes(route.name));
const isSearchView = computed(() => route.name === 'searchPage');
const isCartPage = computed(() => ['summaryPage', 'contactPage', 'paymentPage', 'reviewPage'].includes(route.name));
const getVisitorCode = computed(() => $getVisitorCode());
const isBundleView = computed(() => route.name === 'yourSettingPage');

useHead(() => {
  const pageTitle = metaData.value?.title;
  const fallbackPath = `${config.storeFrontHomeURL}${route.fullPath}`;
  const normalizedFallback = fallbackPath.includes('?') ? fallbackPath : fallbackPath.replace(/\/?$/, '/');
  const canonicalUrl = metaData.value?.canonical_url || normalizedFallback;
  return {
    title: pageTitle,
    meta: [
      { name: 'apple-mobile-web-app-title', content: 'Adiamor' },
      { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: dark)' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { key: 'description', name: 'description', content: metaData.value?.description },
      { key: 'og:title', property: 'og:title', content: metaData.value?.title },
      { key: 'og:description', property: 'og:description', content: metaData.value?.description },
      { key: 'og:url', property: 'og:url', content: canonicalUrl },
      { key: 'og:type', property: 'og:type', content: 'website' },
      { key: 'og:site_name', property: 'og:site_name', content: siteName },
      { key: 'og:image', property: 'og:image', content: metaData.value?.image },
      { key: 'keyword', name: 'keyword', content: metaData.value?.keyword },
      // Additional meta tags
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, viewport-fit=cover' },
      { name: 'google-site-verification', content: 'r5o3eX2XL0IUTErC0U0JOUndcFNY9Mfp79qArBV3sUQ' },
      { name: 'facebook-domain-verification', content: 'it00tuj35bpsmpo9t665kryavq9wg6' },
      { name: 'robots', content: 'index,follow' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#ffc40d' },
      { name: 'theme-color', content: '#ffffff' },
      // Adding Pinterest domain verification meta tag
      { name: 'p:domain_verify', content: '214eb2d9e8c97c14678898f3801d91fa' },
      // Adding origin-trial meta tag
      { 'http-equiv': 'origin-trial', content: 'A7JYkbIvWKmS8mWYjXO12SIIsfPdI7twY91Y3LWOV/YbZmN1ZhYv8O+Zs6/IPCfBE99aV9tIC8sWZSCN09vf7gkAAACWeyJvcmlnaW4iOiJodHRwczovL2N0LnBpbnRlcmVzdC5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZzIiLCJleHBpcnkiOjE3NDIzNDIzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9' },
      // Canonical meta tag
      { key: 'canonical', rel: 'canonical', href: canonicalUrl }
    ],
    script: [
      {
        key: 'ld-json-org',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Adiamor',
          'url': config.storeFrontHomeURL || 'https://adiamor.com',
          'logo': 'https://cdn.adiamor.com/landing-pages/icons/favicon.svg',
          'sameAs': [
            'https://www.facebook.com/adiamor',
            'https://www.instagram.com/adiamor',
            'https://www.pinterest.com/adiamor'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+1-877-627-5094',
            'contactType': 'Customer Service',
            'availableLanguage': 'English'
          }
        })
      },
      {
        key: 'ld-json-website',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'Adiamor',
          'url': config.storeFrontHomeURL || 'https://adiamor.com',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${config.storeFrontHomeURL || 'https://adiamor.com'}/keyword?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        })
      }
    ]
  };
});

onMounted(() => {
  if (import.meta.env.PROD) {
    console.log = function () {};
  }
  updateBreadcrumbs();
  checkRoutes();
  $bus.on('aria-announce', handleAnnounce)
});

onBeforeUnmount(() => {
  $bus.off('aria-announce', handleAnnounce)
});

watch(() => route.path, () => emptyFilterState());
watch(() => store.product, () => updateBreadcrumbs());
// The former `$forceUpdate()` watcher on metaData is dropped: metaData is a computed over reactive store state,
// so template and useHead already update.

async function emptyFilterState() {
  store.setFilters(null); // Reset filters
  document.body.removeAttribute('style');
  if (import.meta.client) {
    await nextTick();  // Wait until the next DOM update cycle
    updateBreadcrumbs();

    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      badge.style.visibility = 'hidden';
      if (route.name == 'searchPage' && route.params?.prefix?.toLowerCase() == 'diamonds') badge.style.visibility = 'visible';
    }
  }
  updateRouteChanges();
}
async function updateBreadcrumbs() {
  breadcrumbs.value = [];
  if (route.name == 'all' || isBundleView.value) {
    product.value = await store.getProduct;
    if (product.value?.sku) {
      breadcrumbs.value = await getBreadCrumbs();
      return;
    }
    return [];
  }
  let path = route.path;
  const pathArray = path.split('/').filter(Boolean);
  const crumbs = [];
  for (let i = 0; i < pathArray.length; i++) {
    let segment = pathArray[i];
    // Skip any segment containing "auth"
    if (segment.includes('auth')) continue;
    // Special handling for 'search'
    if (segment === 'search') {
      const prevSegment = pathArray[i - 1] || '';
      // If there's a segment after 'search'
      if (i + 1 < pathArray.length) {
        const postfix = pathArray[i + 1];
        crumbs.push({
          name: capitalize(formatBreadcrumb(prevSegment)) + ' Search',
          url: '/' + pathArray.slice(0, i + 1).join('/'),
        });
        crumbs.push({
          name: capitalize(formatBreadcrumb(postfix)),
          url: '/' + pathArray.slice(0, i + 2).join('/'),
        });
        i++; // Skip next one since it's handled
      } else {
        // 'search' is the last segment
        crumbs.push({
          name: capitalize(formatBreadcrumb(prevSegment)) + ' Search',
          url: '/' + pathArray.slice(0, i + 1).join('/'),
        });
      }
      continue; // Move to next iteration
    }

    if (segment == 'view-order') {
      crumbs.push({
        name: capitalize(formatBreadcrumb(segment)) + 's',
        url: STATIC_ROUTES.MY_ACCOUNT,
      });
      continue;
    }
    // Prepare readable name
    let name = capitalize(formatBreadcrumb(segment));
    let url = '/' + pathArray.slice(0, i + 1).join('/');
    if (segment == 'cart' && pathArray.length > 1) {
      url = `${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${getVisitorCode.value}`;
    }
    crumbs.push({ name, url });
  }
  // Always start with Home
  crumbs.unshift({ name: 'Home', url: STATIC_ROUTES.HOME });
  breadcrumbs.value = crumbs;
}
function formatBreadcrumb(path) {
  return path
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bMens\b/i, "Men's")
    .replace(/\bWomens\b/i, "Women's")
    .replace(/[-_]/g, ' ')
    .trim();
}
function reverseTransformRoute(routeString) {
  const [category, ...styleParts] = routeString?.includes('wedding-rings') ? routeString.split('-rings-') : routeString.split('-');
  const baseCategory = category === 'rings' ? 'engagement-rings' : category == 'wedding' ? 'wedding-rings' : category;
  const style = styleParts.join('-');
  return `/${baseCategory}/search${style ? `/${style}` : ''}`;
}

async function getBreadCrumbs() {
  const breadcrumbs = [];
  const { query } = route;
  if (query && (query.rfr === 'search' || query.nav?.includes('diamond-pair')) && query.nav) {
    const previousRoute = reverseTransformRoute(query.nav);
    // Always start with the "Home" breadcrumb
    breadcrumbs.push({
      name: 'Home',
      url: STATIC_ROUTES.HOME
    });
    const pathSegments = previousRoute.split('/').filter(Boolean);

    pathSegments.forEach((segment, index) => {
      if (segment === 'search') segment = `${pathSegments[index - 1]} ${segment}`;
      breadcrumbs.push({
        name: formatBreadcrumb(segment),
        url: '/' + pathSegments.slice(0, index + 1).join('/')
      });
    });
    if (product.value && product.value?.name && product.value?.sku) {
      breadcrumbs.push({
        name: `${product.value.name} (${product.value.sku})`,
        url: route.fullPath
      });
    }
  } else if (isBundleView.value) {
    let bundleType = await sessionStorage?.bundleType ?? product.value?.attribute_family_code != "certified_diamond" ? product.value?.attribute_family_code : 'ring';

    let routePostfix = {
      'ring': 'ring',
      'earring': 'earrings',
      'necklace': 'pendant',
      'engagement_rings_family': 'ring',
    }
    if (bundleType) {
      breadcrumbs.push(
        { name: 'Home', url: STATIC_ROUTES.HOME },
        { name: `Design Your Own ${routePostfix[bundleType]}`, url: `/design-your-own/${routePostfix[bundleType]}/` },
        { name: `Your ${routePostfix[bundleType]}`, url: route.fullPath }
      );
    }
  } else if (product.value?.breadCrumbs?.length) {
    breadcrumbs.push(...product.value.breadCrumbs);
  }
  return breadcrumbs;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
async function updateRouteChanges(to, from) {
  if ([STATIC_ROUTES.SOCIAL_MEDIA_GALLERY , STATIC_ROUTES.SHOPPABLE_SOCIALS ].some(prefix => route.fullPath?.startsWith(prefix))) {
    location.reload();
  }
  if (typeof from === 'string' && from == STATIC_ROUTES.THANKYOU) {
    router.push({ path: STATIC_ROUTES.HOME });
    return;
  }
  checkRoutes();
}
function checkRoutes() {
  let includePages = ['summaryPage', 'contactPage', 'paymentPage', 'reviewPage'];
  let cartItems = deepClone(store.getCartItems);
  let cartAddress = deepClone(store.getAddress);

  if (includePages.includes(route.name)) {
    if (!route.query?.visitor_code || (!cartItems?.length && !cartAddress)) {
      router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${getVisitorCode.value}`);
    }
  }

  const token = (import.meta.client) ? localStorage.getItem("token") : null;
  if (token) {
    store.setAuthenticated(true);
    if (route.fullPath?.startsWith(STATIC_ROUTES.AUTH.replace(/\/$/, ''))) {
      router.push(STATIC_ROUTES.HOME);
    }
  }

}
function handleAnnounce(message) {
  if (!message) return;
  ariaAnnouncement.value = '';
  nextTick(() => {
    ariaAnnouncement.value = message;
    setTimeout(() => {
      ariaAnnouncement.value = '';
    }, 3000);
  });
}
</script>