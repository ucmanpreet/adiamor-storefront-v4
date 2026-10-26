import { STATIC_ROUTES } from "~/utils/staticRoutes";

export const sitemapData = [
  {
    title: "Product Search",
    path: "/keyword",
    items: [
      { label: "Diamonds Search", path: STATIC_ROUTES.DIAMONDS_SEARCH },
      { label: "Diamond Pairs Search", path: STATIC_ROUTES.DIAMONDS_SEARCH_PAIR },
      { label: "Custom Diamonds Search", path: STATIC_ROUTES.CUSTOM_SEARCH},
      { label: "Engagement Rings Search", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH },
      { label: "Design Your Own Ring", path: STATIC_ROUTES.DESIGN_RING },
      { label: "Custom Design Ring", path: STATIC_ROUTES.CUSTOM_DESIGN_ENGAGEMENT_RINGS },
      { label: "Jewelry Search", path: STATIC_ROUTES.JEWELRY_SEARCH }
    ]
  },

  {
    title: "Customer Service",
    path: STATIC_ROUTES.CUSTOMER_SERVICE,
    items: [
      { label: "Live Chat", external: true , path: "javascript:helpDesk.click()" },
      { label: "Free FedEx Shipping", path: STATIC_ROUTES.POLICIES_SHIPPING },
      { label: "Free 30-Day Returns", path: STATIC_ROUTES.POLICIES_RETURN},
      { label: "Track Your Order", path: STATIC_ROUTES.LOGIN },
      { label: "Financing and Insurance", path: STATIC_ROUTES.EDUCATION_FINANCING_INSURANCE },
      { label: "Shipping and Handling", path: STATIC_ROUTES.POLICIES_SHIPPING },
      { label: "Adiamor Promotions", path: STATIC_ROUTES.PROMOTIONS }
    ]
  },

  {
    title: "About Adiamor",
    path: STATIC_ROUTES.ABOUT,
    items: [
      { label: "Why Choose Adiamor", path: STATIC_ROUTES.WHY_SHOP },
      { label: "Contact Us", path: STATIC_ROUTES.CONTACT },
      { label: "Privacy Policy", path: STATIC_ROUTES.POLICIES_PRIVACY },
      { label: "Testimonials", path: STATIC_ROUTES.TESTIMONIALS },
      { label: "Terms and Conditions", path: STATIC_ROUTES.POLICIES_TERMS_AND_CONDITIONS },
      { label: "FAQ", path: STATIC_ROUTES.FAQ },
      { label: "Newsletters", path: STATIC_ROUTES.NEWSLETTER }
    ]
  },

  {
    title: "Diamonds",
    path: STATIC_ROUTES.DIAMONDS,
    items: [
      { label: "Diamond Search", path: STATIC_ROUTES.DIAMONDS_SEARCH },
      { label: "Diamond Pairs Search", path: STATIC_ROUTES.DIAMONDS_SEARCH_PAIR },
      { label: "Custom Diamonds Search", path: STATIC_ROUTES.CUSTOM_SEARCH},
      { label: "Affinity Collection", path: STATIC_ROUTES.EDUCATION_AFFINITY_COLLECTION },
      { label: "Canadian Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_CANADIAN},
      { label: "Diamond Education", path: STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION }
    ]
  },

  {
    title: "Design Your Own Diamond Jewelry",
    path: null,
    items: [
      { label: "Design Your Own Engagement Ring", path: STATIC_ROUTES.DESIGN_RING },
      { label: "Design Your Own Earrings", path: STATIC_ROUTES.DESIGN_EARRINGS },
      { label: "Design Your Own Pendant", path: STATIC_ROUTES.DESIGN_PENDANT }
    ]
  },

  {
    title: "Diamond Cuts",
    items: [
      { label: "Round Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_ROUND },
      { label: "Princess Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_PRINCESS },
      { label: "Emerald Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_EMERALD },
      { label: "Marquise Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_MARQUISE },
      { label: "Heart Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_HEART },
      { label: "Pear Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_PEAR },
      { label: "Radiant Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_RADIANT },
      { label: "Oval Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_OVAL },
      { label: "Cushion Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_CUSHION },
      { label: "Asscher Cut Diamonds", path: STATIC_ROUTES.DIAMONDS_SEARCH_ASSCHER }
    ]
  },

  {
    title: "Engagement Rings",
    path: STATIC_ROUTES.ENGAGEMENT_RINGS,
    items: [
      { label: "Custom Design Rings", path: STATIC_ROUTES.CUSTOM_DESIGN_ENGAGEMENT_RINGS },
      // { label: "Matching Bridal Sets", path: "/engagement-rings/search/matchedsets" },
      { label: "Best Selling Rings", path: `${STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH}?sort_column=most_popular&sort_direction` },
      { label: "Recently Purchased Rings", path: STATIC_ROUTES.RECENTLY_PURCHASED_RINGS},
      { label: "Engagement Guide", path: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE }
    ]
  },

  {
    title: "Design Your Own Engagement Ring",
    path: STATIC_ROUTES.DESIGN_RING,
    items: [
      { label: "Start with a Diamond", path: STATIC_ROUTES.DIAMONDS_SEARCH },
      { label: "Start with a Setting", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH }
    ]
  },

  {
    title: "Engagement Ring Shapes",
    items: [
      { label: "Round Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ROUND },
      { label: "Princess Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRINCESS },
      { label: "Emerald Cut Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_EMERALD },
      { label: "Marquise Cut Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_MARQUISE },
      { label: "Heart Shaped Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HEART },
      { label: "Pear-Cut Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PEAR },
      { label: "Radiant Cut Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_RADIANT },
      { label: "Oval Shaped Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_OVAL },
      { label: "Asscher Cut Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ASSCHER },
      { label: "Cushion Cut Engagement Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_CUSHION }
    ]
  },
  {
    title: "Engagement Ring Metals",
    items: [
      { label: "14k White Gold", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_14K_WHITE_GOLD },
      { label: "14k Yellow Gold", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_14K_YELLOW_GOLD },
      { label: "14k Rose Gold", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_14K_ROSE_GOLD },
      { label: "18k White Gold", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_18K_WHITE_GOLD },
      { label: "18k Yellow Gold", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_18K_YELLOW_GOLD },
      { label: "18k Rose Gold", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_18K_ROSE_GOLD },
      { label: "Platinum", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PLATINUM }
    ]
  },
   {
    title: "Engagement Ring Styles",
    items: [
      { label: "Solitaire", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_SOLITAIRE },
      { label: "Halo", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HALO },
      { label: "Three Stone", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_THREE_STONE },
      { label: "Splitshank", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_SPLITSHANK },
      { label: "Modern", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_MODERN },
      { label: "Vintage", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_VINTAGE },
      { label: "Pavé Set", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PAVE },
      { label: "Gemstone", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_GEMSTONE },
      { label: "Preset Rings", path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRE_SET }
    ]
  },

  {
    title: "Wedding Rings",
    path: STATIC_ROUTES.WEDDING_RINGS,
    items: [
      { label: "Women’s Wedding Rings", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_WOMENS },
      { label: "Men’s Wedding Rings", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS },
      { label: "Anniversary Rings", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ANNIVERSARY }
    ]
  },

  {
    title: "Wedding Ring Metals",
    items: [
      { label: "14k White Gold", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_WHITE_GOLD },
      { label: "14k Yellow Gold", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_YELLOW_GOLD },
      { label: "14k Rose Gold", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ROSE_GOLD },
      { label: "18k White Gold", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_WHITE_GOLD },
      { label: "18k Yellow Gold", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_YELLOW_GOLD },
      { label: "18k Rose Gold", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ROSE_GOLD },
      { label: "Platinum", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_PLATINUM }
    ]
  },

  {
    title: "Wedding Ring Styles",
    items: [
      { label: "Classic", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_CLASSIC },
      { label: "Diamond Accented", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_DIAMOND_ACCENTED },
      { label: "Pavé Set", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_PAVE },
      { label: "Channel Set", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_CHANNEL_SET },
      { label: "Gemstone", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_GEMSTONE_ACCENTED },
      { label: "Eternity", path: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ETERNITY }
    ]
  },

   {
    title: "Fine Jewelry",
    path: STATIC_ROUTES.JEWELRY,
    items: [
      { label: "Earrings", path: STATIC_ROUTES.EARRINGS },
      { label: "Pendants and Necklaces", path: STATIC_ROUTES.NECKLACES },
      { label: "Bracelets", path: STATIC_ROUTES.BRACELETS },
      { label: "Rings and Bands", path: STATIC_ROUTES.RINGS_AND_BANDS },
      { label: "On Sale", path: STATIC_ROUTES.JEWELRY_SEARCH_SALE },
      { label: "Fine Jewelry Education", path: STATIC_ROUTES.EDUCATION_FINE_JEWELRY_GUIDE }
    ]
  },

  {
    title: "Earrings",
    path: STATIC_ROUTES.EARRINGS,
    items: [
      { label: "Preset Diamond Earrings", path: STATIC_ROUTES.EARRINGS_SEARCH_PRE_SET },
      { label: "Pearl Earrings", path: STATIC_ROUTES.EARRINGS_SEARCH_PEARL },
      { label: "Gemstone Earrings", path: STATIC_ROUTES.EARRINGS_SEARCH_GEMSTONE },
      { label: "Hoop Earrings", path: STATIC_ROUTES.EARRINGS_SEARCH_HOOP }
    ]
  },
  {
    title: "Pendants and Necklaces",
    path: STATIC_ROUTES.NECKLACES,
    items: [
      { label: "Preset Diamond Pendants", path: STATIC_ROUTES.NECKLACES_SEARCH_PRE_SET },
      { label: "Initial Pendants", path: STATIC_ROUTES.NECKLACES_SEARCH_INITIAL },
      { label: "Heart Pendants", path: STATIC_ROUTES.NECKLACES_SEARCH_HEART },
      { label: "Key Pendants", path: STATIC_ROUTES.NECKLACES_SEARCH_KEY },
      { label: "Pearl Pendants and Necklaces", path: STATIC_ROUTES.NECKLACES_SEARCH_PEARL },
      { label: "Gemstone Pendants and Necklaces", path: STATIC_ROUTES.NECKLACES_SEARCH_GEMSTONE }
    ]
  },
  {
    title: "Bracelets",
    path: STATIC_ROUTES.BRACELETS,
    items: [
      { label: "Stackable Diamond Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_STACKABLE },
      { label: "Tennis Diamond Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_TENNIS },
      { label: "Luxury Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_LUXURY },
      { label: "Charm Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_CHARM },
      { label: "Gold Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_GOLD },
      { label: "Gemstone Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_GEMSTONE },
      { label: "Pearl Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_PEARL },
      { label: "Men's Bracelets", path: STATIC_ROUTES.BRACELETS_SEARCH_MENS }
    ]
  },

  {
    title: "Customer-Service",
    path: STATIC_ROUTES.CUSTOMER_SERVICE,
    items: [
      { label: "About Adiamor", path: STATIC_ROUTES.ABOUT },
      { label: "Contact Adiamor", path: STATIC_ROUTES.CONTACT },
      { label: "In The Media", path: STATIC_ROUTES.IN_THE_MEDIA },
      { label: "Our History", path: `${STATIC_ROUTES.ABOUT}#history` },
      { label: "Why Shop At Adiamor", path: STATIC_ROUTES.WHY_SHOP },
      { label: "Testimonials", path: STATIC_ROUTES.TESTIMONIALS }
    ]
  },
  {
    title: "Policies",
    items: [
      { label: "Conflict Free Policy", path: STATIC_ROUTES.POLICIES_CONFLICT_FREE },
      { label: "Diamond Price Match", path: STATIC_ROUTES.POLICIES_DIAMOND_PRICE_MATCH },
      // { label: "Diamond Upgrade Program", path: STATIC_ROUTES.POLICIES_DIAMOND_UPGRADE_PROGRAM },
      { label: "Financing and Insurance", path: STATIC_ROUTES.POLICIES_FINANCING_INSURANCE },
      { label: "International Shipments", path: STATIC_ROUTES.POLICIES_SHIPPING_INTERNATIONAL },
      { label: "Lifetime Warranty", path: STATIC_ROUTES.POLICIES_WARRANTY },
      { label: "Luxury Gift Packaging", path: STATIC_ROUTES.POLICIES_GIFT_PACKAGING },
      { label: "Privacy Policy", path: STATIC_ROUTES.POLICIES_PRIVACY },
      { label: "Return Policy", path: STATIC_ROUTES.POLICIES_RETURN },
      { label: "Ring Engraving", path: STATIC_ROUTES.POLICIES_ENGRAVING },
      { label: "Shipping Policy", path: STATIC_ROUTES.POLICIES_SHIPPING },
      { label: "Terms and Conditions", path: STATIC_ROUTES.POLICIES_TERMS_AND_CONDITIONS }
    ]
  },
  {
    title: "Services",
    items: [
      { label: "After You Order", path: STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER },
      { label: "Payment Options", path: STATIC_ROUTES.SERVICES_PAYMENT_OPTIONS },
      { label: "Order Status", path: STATIC_ROUTES.LOGIN },
      { label: "Wishlist", path: STATIC_ROUTES.WISHLIST },
      { label: "Shopping Bag", path: STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE + "{{visitor_code}}" }
    ]
  },
  {
    title: "Education",
    path: STATIC_ROUTES.EDUCATION,
    items: [
      { label: "Diamond Education", path: STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION },
      { label: "Fine Jewelry Education", path: STATIC_ROUTES.EDUCATION_FINE_JEWELRY_GUIDE },
      { label: "Engagement Guide", path: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE },
      { label: "Glossary", path: STATIC_ROUTES.EDUCATION_GLOSSARY },
      { label: "FAQ", path: STATIC_ROUTES.FAQ }
    ]
  },
  {
    title: "Diamond Education",
    path: STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION,
    items: [
      { label: "Affinity Collection", path: STATIC_ROUTES.EDUCATION_AFFINITY_COLLECTION },
      { label: "Carat Weight", path: STATIC_ROUTES.EDUCATION_CARAT_WEIGHT },
      { label: "Diamond Care", path: STATIC_ROUTES.EDUCATION_DIAMOND_CARE },
      { label: "Diamond Certification", path: STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION },
      { label: "Diamond Clarity", path: STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY },
      { label: "Diamond Color", path: STATIC_ROUTES.EDUCATION_DIAMOND_COLOR },
      { label: "Diamond Cut", path: STATIC_ROUTES.EDUCATION_DIAMOND_CUT },
      { label: "Diamond Shape", path: STATIC_ROUTES.EDUCATION_DIAMOND_SHAPE }
    ]
  },
  {
    title: "Engagement Guide",
    path: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE,
    items: [
      { label: "Establishing Your Budget", path: STATIC_ROUTES.EDUCATION_ESTABLISHING_BUDGET },
      { label: "Financing and Insurance", path: STATIC_ROUTES.EDUCATION_FINANCING_INSURANCE },
      { label: "Jeweler Guide", path: STATIC_ROUTES.EDUCATION_JEWELER_GUIDE },
      { label: "Proposal Tips", path: STATIC_ROUTES.EDUCATION_PROPOSAL_TIPS },
      { label: "Ring Anatomy", path: STATIC_ROUTES.EDUCATION_RING_ANATOMY }
    ]
  },
  {
    title: "Fine Jewelry Education",
    path: STATIC_ROUTES.EDUCATION_FINE_JEWELRY_GUIDE,
    items: [
      { label: "Earring Guide", path: STATIC_ROUTES.EDUCATION_EARRING_GUIDE },
      { label: "Gemstone Education", path: STATIC_ROUTES.EDUCATION_GEMSTONE_EDUCATION },
      { label: "Gift Guide", path: STATIC_ROUTES.EDUCATION_GIFT_GUIDE },
      { label: "Glossary", path: STATIC_ROUTES.EDUCATION_GLOSSARY },
      { label: "Metal Education", path: STATIC_ROUTES.EDUCATION_METAL_EDUCATION },
      { label: "Pearl Education", path: STATIC_ROUTES.EDUCATION_PEARL_EDUCATION },
      { label: "Pendant Guide", path: STATIC_ROUTES.EDUCATION_PENDANT_GUIDE },
      { label: "Wedding Ring Guide", path: STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE }
    ]
  }
];
