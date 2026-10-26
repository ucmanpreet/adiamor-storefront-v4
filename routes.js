import { STATIC_ROUTES } from "./app/utils/staticRoutes.js";


export default [
  // Static Routes
  {
    path: '/',
    name: 'home',
    component: 'pages/index.vue'
  },
  {
    path: '/auth/login',
    alias: STATIC_ROUTES.LOGIN,
    name: 'login',
    component: 'pages/auth/login.vue'
  },
  {
    path: '/diamonds',
    alias: STATIC_ROUTES.DIAMONDS,
    name: 'diamondPage',
    component: 'pages/diamond.vue'
  },
  {
    path: '/cart/summary',
    alias: STATIC_ROUTES.CART_SUMMARY,
    name: 'summaryPage',
    component: 'pages/cart/summary.vue'
  },
  {
    path: '/cart/contact',
    alias: STATIC_ROUTES.CART_CONTACT,
    name: 'contactPage',
    component: 'pages/cart/contact.vue'
  },
  {
    path: '/cart/payment',
    alias: STATIC_ROUTES.CART_PAYMENT,
    name: 'paymentPage',
    component: 'pages/cart/payment.vue'
  },
  {
    path: '/cart/review',
    alias: STATIC_ROUTES.CART_REVIEW,
    name: 'reviewPage',
    component: 'pages/cart/review.vue'
  },
  {
    path: '/engagement-rings',
    alias: STATIC_ROUTES.ENGAGEMENT_RINGS,
    name: 'engagementRingPage',
    component: 'pages/engagement-ring.vue'
  },
  {
    path: '/jewelry',
    alias: STATIC_ROUTES.JEWELRY,
    name: 'jewelryPage',
    component: 'pages/jewelry.vue'
  },
  {
    path: '/education',
    alias: STATIC_ROUTES.EDUCATION,
    name: 'educationPage',
    component: 'pages/education.vue'
  },
  {
    path: '/mens-jewelry',
    alias: STATIC_ROUTES.MENS_JEWELRY,
    name: 'mensJewelryPage',
    component: 'pages/mens-jewelry.vue'
  },
  {
    path: '/french-cut-halo-collection',
    alias: STATIC_ROUTES.FRENCH_CUT_HALO,
    name: 'frenchCutHaloPage',
    component: 'pages/french-cut-halo-collection.vue'
  },
  {
    path: '/bold-gold-collection',
    alias: STATIC_ROUTES.BOLD_GOLD,
    name: 'boldGoldPage',
    component: 'pages/bold-gold-collection.vue'
  },
  {
    path: '/diamond-jewelry',
    alias: STATIC_ROUTES.DIAMOND_JEWELRY,
    name: 'diamondJewelryPage',
    component: 'pages/diamond-jewelry.vue'
  },
  {
    path: '/design-your-own/ring',
    alias: STATIC_ROUTES.DESIGN_RING,
    name: 'ringPage',
    component: 'pages/design-your-own/ring.vue'
  },
  {
    path: '/design-your-own/earrings',
    alias: STATIC_ROUTES.DESIGN_EARRINGS,
    name: 'earringPage',
    component: 'pages/design-your-own/earrings.vue'
  },
  {
    path: '/design-your-own/pendant',
    alias: STATIC_ROUTES.DESIGN_PENDANT,
    name: 'pendantPage',
    component: 'pages/design-your-own/pendant.vue'
  },
  {
    path: '/about-adiamor',
    alias: STATIC_ROUTES.ABOUT,
    name: 'aboutPage',
    component: 'pages/about/index.vue'
  },
  {
    path: '/wedding-gifts',
    alias: STATIC_ROUTES.WEDDING_GIFTS,
    name: 'weddingGiftPage',
    component: 'pages/wedding-gift.vue'
  },
  {
    path: '/custom-design-engagement-rings',
    alias: STATIC_ROUTES.CUSTOM_DESIGN_ENGAGEMENT_RINGS,
    name: 'customDesignEngagementRingsPage',
    component: 'pages/custom-design-engagement-rings.vue'
  },
  {
    path: '/top-engagement-ring-styles',
    alias: STATIC_ROUTES.TOP_ENGAGEMENT_RING_STYLES,
    name: 'topEngagementRingStyles',
    component: 'pages/top-engagement-ring-styles.vue'
  },
  {
    path: '/shoppable-socials',
    alias: STATIC_ROUTES.SHOPPABLE_SOCIALS,
    name: 'shoppableSocialsPage',
    component: 'pages/shoppable-socials.vue'
  },
  {
    path: '/social-media-gallery',
    alias: STATIC_ROUTES.SOCIAL_MEDIA_GALLERY,
    name: 'socialMediaGalleryPage',
    component: 'pages/social-media-gallery.vue'
  },
  {
    path: '/in-the-media',
    alias: STATIC_ROUTES.IN_THE_MEDIA,
    name: 'inTheMediaPage',
    component: 'pages/about/in-the-media.vue'
  },
  {
    path: '/promotions',
    alias: STATIC_ROUTES.PROMOTIONS,
    name: 'promotionsPage',
    component: 'pages/about/promotions.vue'
  },
  {
    path: '/contact-adiamor',
    alias: STATIC_ROUTES.CONTACT,
    name: 'contactAdiamor',
    component: 'pages/about/contact-adiamor.vue'
  },
  {
    path: '/refer-a-friend',
    alias: STATIC_ROUTES.REFER_FRIEND,
    name: 'referAFriendPage',
    component: 'pages/about/refer-a-friend.vue'
  },
  {
    path: '/testimonials',
    alias: STATIC_ROUTES.TESTIMONIALS,
    name: 'testimonialPage',
    component: 'pages/about/testimonial.vue'
  },
  {
    path: '/why-shop-at-adiamor',
    alias: STATIC_ROUTES.WHY_SHOP,
    name: 'whyShopPage',
    component: 'pages/about/why-shop-at-adiamor.vue'
  },
  {
    path: '/customer-service',
    alias: STATIC_ROUTES.CUSTOMER_SERVICE,
    name: 'customerServicePage',
    component: 'pages/customer-service.vue'
  },
  {
    path: '/faq',
    alias: STATIC_ROUTES.FAQ,
    name: 'faqPage',
    component: 'pages/faq.vue'
  },
  {
    path: '/custom-search',
    alias: STATIC_ROUTES.CUSTOM_SEARCH,
    name: 'customSearchPage',
    component: 'pages/custom-search.vue'
  },
  {
    path: '/rings-and-bands',
    alias: STATIC_ROUTES.RINGS_AND_BANDS,
    name: 'ringsAndBandsPage',
    component: 'pages/rings-and-bands.vue'
  },
  {
    path: '/earrings',
    alias: STATIC_ROUTES.EARRINGS,
    name: 'earringsPage',
    component: 'pages/earrings.vue'
  },
  {
    path: '/necklaces',
    alias: STATIC_ROUTES.NECKLACES,
    name: 'pendantsPage',
    component: 'pages/pendants.vue'
  },
  {
    path: '/bracelets',
    alias: STATIC_ROUTES.BRACELETS,
    name: 'braceletsPage',
    component: 'pages/bracelets.vue'
  },
  {
    path: '/flexible-financing',
    alias: STATIC_ROUTES.FLEXIBLE_FINANCING,
    name: 'flexibleFinancingPage',
    component: 'pages/flexible-financing.vue'
  },
  {
    path: '/recently-purchased-rings',
    alias: STATIC_ROUTES.RECENTLY_PURCHASED_RINGS,
    name: 'recentlyPurchasedRingsPage',
    component: 'pages/recently-purchased-rings.vue'
  },
  {
    path: '/my-account',
    alias: STATIC_ROUTES.MY_ACCOUNT,
    name: 'myAccountPage',
    component: 'pages/user/my-account.vue'
  },
  {
    path: '/wishlist',
    alias: STATIC_ROUTES.WISHLIST,
    name: 'wishlistPage',
    component: 'pages/user/wishlist.vue'
  },
  {
    path: '/thankyou',
    alias: STATIC_ROUTES.THANKYOU,
    name: 'thankyouPage',
    component: 'pages/thankyou.vue'
  },
  {
    path: '/top-gift-ideas',
    alias: STATIC_ROUTES.TOP_GIFT_IDEAS,
    name: 'topGiftIdeasPage',
    component: 'pages/top-gift-ideas.vue'
  },
  {
    path: '/custom-rings-gallery',
    alias: STATIC_ROUTES.CUSTOM_RINGS_GALLERY,
    name: 'customRingsGalleryPage',
    component: 'pages/custom-rings-gallery.vue'
  },
  {
    path: '/your-setting',
    alias: STATIC_ROUTES.YOUR_SETTING,
    name: 'yourSettingPage',
    component: 'pages/your-setting.vue'
  },
  {
    path: '/care-plan',
    alias: STATIC_ROUTES.CARE_PLAN,
    name: 'carePlanPage',
    component: 'pages/care-plan.vue'
  },
  {
    path: '/wedding-rings',
    alias: STATIC_ROUTES.WEDDING_RINGS,
    name: 'weddingRingsPage',
    component: 'pages/wedding-rings.vue'
  },
  {
    path: '/newsletter',
    alias: STATIC_ROUTES.NEWSLETTER,
    name: 'newsletterPage',
    component: 'pages/newsletter.vue'
  },
  {
    path: '/diamond-stud-earrings',
    alias: STATIC_ROUTES.DIAMOND_STUD_EARRINGS,
    name: 'diamondStudEarringsPage',
    component: 'pages/diamond-stud-earrings.vue'
  },
  {
    path: '/keyword',
    alias: STATIC_ROUTES.KEYWORD,
    name: 'keywordPage',
    component: 'pages/keyword.vue'
  },
  {
    path: '/sitemap',
    alias: STATIC_ROUTES.SITEMAP,
    name: 'SiteMapPage',
    component: 'pages/sitemap.vue'
  },

  // Dynamic Routes shifted to end
  {
    path: '/view-order/:orderId?',
    name: 'viewOrderPage',
    component: 'pages/user/view-order.vue',
    props: route => ({
      orderId: route.params.orderId,
      token: route.query.token
    })
  },
  {
    path: '/policies/:slug',
    name: 'policyName',
    component: 'pages/policy.vue'
  },
  {
    path: '/services/:slug',
    name: 'serviceName',
    component: 'pages/service.vue'
  },
  {
    path: '/education/:slug(.*)?',
    name: 'educationName',
    component: 'pages/education-sub.vue'
  },
  {
    path: '/auth/reset-password/:token',
    name: 'reset-password',
    component: 'pages/auth/reset-password.vue'
  },
  {
    path: '/:prefix?/search/:postfix(.*)?',
    name: 'searchPage',
    component: 'pages/search.vue'
  },
  {
    path: '*',
    name: 'all',
    component: 'pages/_.vue'
  }
];