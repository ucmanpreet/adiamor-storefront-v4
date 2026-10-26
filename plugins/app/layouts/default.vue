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
<script>
import { deepClone } from '~/utils/deepClone.js';
import ScrollToTop from '~/components/ui/ScrollToTop.vue';
import Header from '~/components/layout/header/index.vue';
import landingData from '@/static/js/pageMetaHeading.js';
import BreadCrumb from '~/components/ui/BreadCrumb.vue';
import Footer from '~/components/layout/Footer.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
  name: "default",
  components: { ScrollToTop, Header, BreadCrumb, Footer },
  data() {
    return {
      catType: '',
      filterType: '',
      siteName: "Adiamor Diamonds and Fine Jewelry",
      breadcrumbs: [],
      excludeRoutesForBreadcrumbs: ['home', 'login', 'thankyouPage'],
      product: null,
      ariaAnnouncement: ''
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      console.log = function () {};
    }
    this.updateBreadcrumbs();
    this.checkRoutes();
    this.$bus.on('aria-announce', this.handleAnnounce)
  },
  beforeUnmount() {
    this.$bus.off('aria-announce', this.handleAnnounce)
  },
  computed: {
    metaData() {
      const meta = this.$store.state.metaData || this.$store.getters.getMetaData || {};
      const rootMeta = landingData[STATIC_ROUTES.HOME];
      return {
        title: meta.meta_title || meta.page_title || meta.title || rootMeta.title,
        description: meta.meta_description || meta.description || rootMeta.description,
        keyword: meta.meta_keywords || meta.keywords || rootMeta.keyword,
        pageTitle: meta.page_title || meta.title || rootMeta.title,
        canonical_url: meta?.canonical_url,
        image: meta?.og_image_url || meta?.image
      };
    },
    checkRoute() {
      return !this.excludeRoutesForBreadcrumbs.includes(this.$route.name);
    },
    isSearchView() {
      return this.$route.name === 'searchPage';
    },
    isCartPage() {
      return ['summaryPage', 'contactPage', 'paymentPage', 'reviewPage'].includes(this.$route.name);
    },
    getVisitorCode() {
         return this.$getVisitorCode();
    },
    isBundleView() {
			return this.$route.name === 'yourSettingPage';
		},
  },
  head() {
    const pageTitle = this.metaData?.title;
    const fallbackPath = `${this.$config.public.storeFrontHomeURL}${this.$route.fullPath}`;
    const normalizedFallback = fallbackPath.includes('?') ? fallbackPath : fallbackPath.replace(/\/?$/, '/');
    const canonicalUrl = this.metaData?.canonical_url || normalizedFallback;
    return {
      title: pageTitle,
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Adiamor' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: dark)' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { hid: 'description', name: 'description', content: this.metaData?.description },
        { hid: 'og:title', property: 'og:title', content: this.metaData?.title },
        { hid: 'og:description', property: 'og:description', content: this.metaData?.description },
        { hid: 'og:url', property: 'og:url', content: canonicalUrl },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: this.siteName },
        { hid: 'og:image', property: 'og:image', content: this.metaData?.image },
        { hid: 'keyword', name: 'keyword', content: this.metaData?.keyword },
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
        { httpEquiv: 'origin-trial', content: 'A7JYkbIvWKmS8mWYjXO12SIIsfPdI7twY91Y3LWOV/YbZmN1ZhYv8O+Zs6/IPCfBE99aV9tIC8sWZSCN09vf7gkAAACWeyJvcmlnaW4iOiJodHRwczovL2N0LnBpbnRlcmVzdC5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZzIiLCJleHBpcnkiOjE3NDIzNDIzOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9' },
        // Canonical meta tag
        { hid: 'canonical', rel: 'canonical', href: canonicalUrl }
      ],
      script: [
        {
          hid: 'ld-json-org',
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Adiamor',
            'url': this.$config.public.storeFrontHomeURL || 'https://adiamor.com',
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
          }
        },
        {
          hid: 'ld-json-website',
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'Adiamor',
            'url': this.$config.public.storeFrontHomeURL || 'https://adiamor.com',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': `${this.$config.public.storeFrontHomeURL || 'https://adiamor.com'}/keyword?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          }
        }
      ]
    };
  },
  methods: {
    async emptyFilterState() {
      this.$store.commit('setFilters', null); // Reset filters
      document.body.removeAttribute('style');
      if (import.meta.client) {
        await this.$nextTick();  // Wait until the next DOM update cycle
        this.updateBreadcrumbs();

        const badge = document.querySelector('.grecaptcha-badge');
        if (badge) {
          badge.style.visibility = 'hidden';
          if (this.$route.name == 'searchPage' && this.$route.params?.prefix?.toLowerCase() == 'diamonds') badge.style.visibility = 'visible';
        }
      }
      this.updateRouteChanges();
    },
    async updateBreadcrumbs() {
      this.breadcrumbs = [];
      if (this.$route.name == 'all' || this.isBundleView) {
        this.product = await this.$store.getters.getProduct;
        if (this.product?.sku) {
          this.breadcrumbs = await this.getBreadCrumbs();
          return;
        }
        return [];
      }
      let path = this.$route.path;
      const pathArray = path.split('/').filter(Boolean);
      const breadcrumbs = [];
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
            breadcrumbs.push({
              name: this.capitalize(this.formatBreadcrumb(prevSegment)) + ' Search',
              url: '/' + pathArray.slice(0, i + 1).join('/'),
            });
            breadcrumbs.push({
              name: this.capitalize(this.formatBreadcrumb(postfix)),
              url: '/' + pathArray.slice(0, i + 2).join('/'),
            });
            i++; // Skip next one since it's handled
          } else {
            // 'search' is the last segment
            breadcrumbs.push({
              name: this.capitalize(this.formatBreadcrumb(prevSegment)) + ' Search',
              url: '/' + pathArray.slice(0, i + 1).join('/'),
            });
          }
          continue; // Move to next iteration
        }

        if (segment == 'view-order') {
          breadcrumbs.push({
            name: this.capitalize(this.formatBreadcrumb(segment)) + 's',
            url: STATIC_ROUTES.MY_ACCOUNT,
          });
          continue;
        }
        // Prepare readable name
        let name = this.capitalize(this.formatBreadcrumb(segment));
        let url = '/' + pathArray.slice(0, i + 1).join('/');
        if (segment == 'cart' && pathArray.length > 1) {
          url = `${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.getVisitorCode}`;
        }
        breadcrumbs.push({ name, url });
      }
      // Always start with Home
      breadcrumbs.unshift({ name: 'Home', url: STATIC_ROUTES.HOME });
      this.breadcrumbs = breadcrumbs;
    },
    formatBreadcrumb(path) {
      return path
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\bMens\b/i, "Men's")
        .replace(/\bWomens\b/i, "Women's")
        .replace(/[-_]/g, ' ')
        .trim();
    },
    reverseTransformRoute(routeString) {
      const [category, ...styleParts] = routeString?.includes('wedding-rings') ? routeString.split('-rings-') : routeString.split('-');
      const baseCategory = category === 'rings' ? 'engagement-rings' : category == 'wedding' ? 'wedding-rings' : category;
      const style = styleParts.join('-');
      return `/${baseCategory}/search${style ? `/${style}` : ''}`;
    },

    async getBreadCrumbs() {
      const breadcrumbs = [];
      const { query } = this.$route;
      if (query && (query.rfr === 'search' || query.nav?.includes('diamond-pair')) && query.nav) {
        const previousRoute = this.reverseTransformRoute(query.nav);
        // Always start with the "Home" breadcrumb
        breadcrumbs.push({
          name: 'Home',
          url: STATIC_ROUTES.HOME
        });
        const pathSegments = previousRoute.split('/').filter(Boolean);

        pathSegments.forEach((segment, index) => {
          if (segment === 'search') segment = `${pathSegments[index - 1]} ${segment}`;
          breadcrumbs.push({
            name: this.formatBreadcrumb(segment),
            url: '/' + pathSegments.slice(0, index + 1).join('/')
          });
        });
        if (this.product && this.product?.name && this.product?.sku) {
          breadcrumbs.push({
            name: `${this.product.name} (${this.product.sku})`,
            url: this.$route.fullPath
          });
        }
      } else if (this.isBundleView) {
        let bundleType = await sessionStorage?.bundleType ?? this.product?.attribute_family_code != "certified_diamond" ? this.product?.attribute_family_code : 'ring';

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
            { name: `Your ${routePostfix[bundleType]}`, url: this.$route.fullPath }
          );
        }
      } else if (this.product?.breadCrumbs?.length) {
        breadcrumbs.push(...this.product.breadCrumbs);
      }
      return breadcrumbs;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async updateRouteChanges(to, from) {
      if ([STATIC_ROUTES.SOCIAL_MEDIA_GALLERY , STATIC_ROUTES.SHOPPABLE_SOCIALS ].some(prefix => this.$route.fullPath?.startsWith(prefix))) {
        location.reload();
      }
      if (typeof from === 'string' && from == STATIC_ROUTES.THANKYOU) {
        this.$router.push({ path: STATIC_ROUTES.HOME });
        return;
      }
      this.checkRoutes();
    },
    checkRoutes() {
      let includePages = ['summaryPage', 'contactPage', 'paymentPage', 'reviewPage'];
      let cartItems = deepClone(this.$store.getters.getCartItems);
      let cartAddress = deepClone(this.$store.getters.getAddress);

      if (includePages.includes(this.$route.name)) {
        if (!this.$route.query?.visitor_code || (!cartItems?.length && !cartAddress)) {
          this.$router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.getVisitorCode}`);
        }
      }

      const token = (import.meta.client) ? localStorage.getItem("token") : null;
      if (token) {
        this.$store.commit('setAuthenticated', true);
        if (this.$route.fullPath?.startsWith(STATIC_ROUTES.AUTH.replace(/\/$/, ''))) {
          this.$router.push(STATIC_ROUTES.HOME);
        }
      }

    },
    handleAnnounce(message) {
      if (!message) return;
      this.ariaAnnouncement = '';
      this.$nextTick(() => {
        this.ariaAnnouncement = message;
        setTimeout(() => {
          this.ariaAnnouncement = '';
        }, 3000);
      });
    }
  },
  watch: {
    '$route.path': 'emptyFilterState',
    '$store.state.product': 'updateBreadcrumbs',
    '$store.state.metaData': {
      deep: true,
      handler() {
        if (import.meta.client) {
          this.$nextTick(() => {
            this.$forceUpdate();
          });
        }
      }
    },
  },
};
</script>