import { STATIC_ROUTES } from "./staticRoutes";

export const menuItems = [
    { label: 'Diamonds', path: STATIC_ROUTES.DIAMONDS, dropdown: 'diamonds', mobileParentClass: 'flex lg:flex-wrap flex-col lg:flex-row lg:justify-between py-4 gap-6'},
    { label: 'Engagement Rings', path: STATIC_ROUTES.ENGAGEMENT_RINGS, dropdown: 'engagementRing', mobileParentClass: 'flex flex-col lg:flex-wrap lg:flex-row lg:justify-between py-4 gap-6'},
    { label: 'Wedding', path: STATIC_ROUTES.WEDDING_RINGS, dropdown: 'wedding',  mobileParentClass: 'flex flex-col lg:flex-wrap lg:flex-row lg:justify-between py-4 gap-6'},
    { label: 'Jewelry', path: STATIC_ROUTES.JEWELRY, dropdown: 'jewelry', mobileParentClass: 'flex flex-col lg:flex-row lg:flex-wrap lg:justify-between py-4 gap-6'},
    { label: 'Education', path: STATIC_ROUTES.EDUCATION, dropdown: 'education', mobileParentClass: 'flex flex-col lg:flex-row lg:flex-wrap lg:justify-between py-4 gap-6'},
    { label: 'About Us', path: STATIC_ROUTES.ABOUT, dropdown: 'aboutUs', mobileParentClass: 'flex flex-col lg:flex-row lg:flex-wrap lg:justify-between py-4 gap-6'},
    // { label: 'Blog', path: 'https://www.adiamor.com/blog/', external: true },
    { label: 'On Sale', path: STATIC_ROUTES.JEWELRY_SEARCH_SALE, highlight: true, isRedirection: true },
    { label: 'Contact Us', path: STATIC_ROUTES.CONTACT, icon: 'email' , desktop: false, isRedirection: true },
    { label: 'Sign In', path: STATIC_ROUTES.LOGIN, icon: 'user' , desktop: false,  isRedirection: true },
    { label: 'Wishlist', path: STATIC_ROUTES.WISHLIST, icon: 'heart-solid' , desktop: false,  isRedirection: true },
    { label: 'My Bag', path: STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE, icon: 'shopping-bag', desktop: false,  isRedirection: true }
];

export const diamondSubMenu = {
    image: '/assets/images/sub-menu/diamond.webp',
    sections: [
      {
        title: 'Shop By Shape',
        code : 'shape',
        link: STATIC_ROUTES.DIAMONDS_SEARCH,
        itemParentClass: 'grid grid-cols-2 gap-4',
        mobileItemClass: 'grid grid-cols-1 lg:grid-cols-2 gap-4 w-full',
        items: [
          { name: 'Round', icon: 'round', href: STATIC_ROUTES.DIAMONDS_SEARCH_ROUND },
          { name: 'Pear', icon: 'pear', href: STATIC_ROUTES.DIAMONDS_SEARCH_PEAR },
          { name: 'Princess', icon: 'princess', href: STATIC_ROUTES.DIAMONDS_SEARCH_PRINCESS },
          { name: 'Radiant', icon: 'radiant', href: STATIC_ROUTES.DIAMONDS_SEARCH_RADIANT },
          { name: 'Emerald', icon: 'emerald', href: STATIC_ROUTES.DIAMONDS_SEARCH_EMERALD },
          { name: 'Oval', icon: 'oval', href: STATIC_ROUTES.DIAMONDS_SEARCH_OVAL },
          { name: 'Marquise', icon: 'marquise', href: STATIC_ROUTES.DIAMONDS_SEARCH_MARQUISE },
          { name: 'Asscher', icon: 'asscher', href: STATIC_ROUTES.DIAMONDS_SEARCH_ASSCHER },
          { name: 'Heart', icon: 'heart', href: STATIC_ROUTES.DIAMONDS_SEARCH_HEART },
          { name: 'Cushion', icon: 'cushion', href: STATIC_ROUTES.DIAMONDS_SEARCH_CUSHION },
        ],
        footerLink: {
          name: 'Search All Diamonds',
          href: STATIC_ROUTES.DIAMONDS_SEARCH
        }
      },
      {
        title: 'Selecting a Diamond',
        link: STATIC_ROUTES.DIAMONDS_SEARCH,
        itemParentClass: 'space-y-2.5',
        mobileItemClass: 'space-y-2.5',
        items: [
          { name: 'Natural Diamond Search', href: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL },
          { name: 'Lab Grown Diamond Search', href: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN },
          { name: 'Diamond Pairs Search', href: STATIC_ROUTES.DIAMONDS_SEARCH_PAIR},
          { name: 'Custom Diamond Search', href: STATIC_ROUTES.CUSTOM_SEARCH },
          { name: 'Canadian Diamonds', href: STATIC_ROUTES.DIAMONDS_SEARCH_CANADIAN},
          { name: 'Affinity Collection', href: STATIC_ROUTES.EDUCATION_AFFINITY_COLLECTION },
          { name: 'Diamond Education', href: STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION }
        ]
      },
      {
        title: 'Design your Own',
        link: STATIC_ROUTES.DESIGN_RING,
        itemParentClass: 'space-y-2.5',
        mobileItemClass: 'space-y-2.5',
        items: [
          { name: 'Engagement Ring', href: STATIC_ROUTES.DESIGN_RING },
          { name: 'Earrings', href: STATIC_ROUTES.DESIGN_EARRINGS },
          { name: 'Pendant', href: STATIC_ROUTES.DESIGN_PENDANT }
        ]
      }
    ]
};

export const engagementRingSubMenu = {
    image: '/assets/images/sub-menu/ring.webp', // Image path for the submenu
    sections: [
      {
        title: 'Shop By Shape', // Section title
        link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH, // Main link for the section
        type: 'filter', // Type of section, could be 'filter', 'mixed', 'link', etc.
        category: 'engagement-rings', // Category for the section (used for filtering)
        filterKey: 'VIEW WITH', // Filter key to be applied for the filter-based sections
        itemParentClass: 'grid grid-cols-2 gap-4',
        mobileItemClass: 'grid grid-cols-1 lg:grid-cols-2 gap-4 w-full',
        code : 'shape',
        items: [
          { name: 'Round', icon: 'round', value: 'round', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ROUND },
          { name: 'Pear', icon: 'pear', value: 'pear', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PEAR },
          { name: 'Princess', icon: 'princess', value: 'princess', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRINCESS },
          { name: 'Radiant', icon: 'radiant', value: 'radiant', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_RADIANT },
          { name: 'Emerald', icon: 'emerald', value: 'emerald', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_EMERALD },
          { name: 'Oval', icon: 'oval', value: 'oval', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_OVAL },
          { name: 'Marquise', icon: 'marquise', value: 'marquise', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_MARQUISE },
          { name: 'Asscher', icon: 'asscher', value: 'asscher', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ASSCHER },
          { name: 'Heart', icon: 'heart', value: 'heart', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HEART },
          { name: 'Cushion', icon: 'cushion', value: 'cushion', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_CUSHION }
        ],
        footerLink: {
          name: 'Search All Engagement Rings', // Footer link name
          href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH // Footer link URL
        }
      },
      {
        title: 'Shop By Style',
        link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH,
        type: 'mixed', // This can be used to define how the section behaves (e.g., a combination of filters and direct links)
        category: 'engagement-rings',
        itemParentClass: 'grid grid-cols-2 gap-2.5',
        mobileItemClass: 'grid grid-cols-1 lg:grid-cols-2 gap-2.5 w-full',
        items: [
          { name: 'Solitaire', value: 'engagement_rings_solitaire', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_SOLITAIRE },
          { name: 'Modern', value: 'engagement_rings_modern', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_MODERN },
          { name: 'Pavé', value: 'pave', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PAVE },
          { name: 'Split Shank', value: 'engagement_rings_split_shank', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_SPLITSHANK },
          { name: 'Halo', value: 'engagement_rings_halo', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HALO },
          { name: 'Gemstone', value: 'engagement_rings_gemstone', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_GEMSTONE },
          { name: 'Three-Stone', value: 'engagement_rings_three_stone', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_THREE_STONE },
          { name: 'Vintage', value: 'engagement_rings_vintage', filterKey: 'STYLE', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_VINTAGE },
          // { name: 'Matched Sets', href: '/engagement-rings/search/matched-set' },
          { name: 'Pre-Set Rings', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRE_SET },
          { name: 'Rose Gold', value: ['14k_rose_gold', '18k_rose_gold'], filterKey: 'METAL', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ROSE_GOLD },
          { name: 'Yellow Gold', value: ['14k_yellow_gold', '18k_yellow_gold'], filterKey: 'METAL', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_YELLOW_GOLD },
          { name: 'Recently Purchased', href: STATIC_ROUTES.RECENTLY_PURCHASED_RINGS }
        ]
      },
      {
        title: 'Selecting A Setting',
        link: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE,
        type: 'link', // This indicates it's a simple link
        itemParentClass: 'space-y-2.5',
        mobileItemClass: 'space-y-2.5',
        items: [
          { name: 'Design Your Own Engagement Ring', href: STATIC_ROUTES.DESIGN_RING },
          { name: 'Hidden Halo Collection', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HIDDEN_HALO },
          { name: 'Thin Band Collection', href: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_THIN_BAND },
          { name: 'French Cut Collection', href: STATIC_ROUTES.FRENCH_CUT_HALO },
          { name: 'Custom Engagement Rings', href: STATIC_ROUTES.CUSTOM_DESIGN_ENGAGEMENT_RINGS },
          { name: 'Top Engagement Ring Styles', href: STATIC_ROUTES.TOP_ENGAGEMENT_RING_STYLES }
        ]
      },
    ]
};

export const weddingRingSubMenu = {
  image: '/assets/images/sub-menu/wedding.webp', // Image path for the submenu
  sections: [
    {
      title: 'Shop By Style',
      link: STATIC_ROUTES.WEDDING_RINGS_SEARCH,
      type: 'filter',
      category: 'wedding-rings',
      filterKey: 'STYLE',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Classic', value: 'classic', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_CLASSIC },
        // { name: 'Classic', value: 'classic', href: '/wedding-rings/search/classic-wedding-rings' },
        { name: 'Diamond', value: 'diamond_accented', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_DIAMOND_ACCENTED },
        { name: 'Pavé', value: 'pave', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_PAVE },
        { name: 'Channel Set', value: 'channel_set', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_CHANNEL_SET },
        { name: 'Gemstone', value: 'gemstone_accented', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_GEMSTONE_ACCENTED },
        { name: 'Eternity Ring', value: 'eternity', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ETERNITY }
      ]
    },
    {
      title: 'Shop By Metal',
      link: STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE,
      type: 'filter',
      category: 'wedding-rings',
      filterKey: 'METAL',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'White Gold', value: ['14k_white_gold', '18k_white_gold'], href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_WHITE_GOLD },
        { name: 'Yellow Gold', value: ['14k_yellow_gold', '18k_yellow_gold'], href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_YELLOW_GOLD },
        { name: 'Rose Gold', value: ['14k_rose_gold', '18k_rose_gold'], href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ROSE_GOLD },
        { name: 'Platinum', value: 'platinum', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_PLATINUM }
      ]
    },
    {
      title: 'Selecting A Ring',
      link: STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: "Women's Wedding Bands", href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_WOMENS },
        { name: "Men's Wedding Bands", href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS },
        { name: 'Anniversary Rings', href: STATIC_ROUTES.WEDDING_RINGS_SEARCH_ANNIVERSARY }
      ]
    }
  ]
};

export const diamondJewelrySubMenu = {
  image: '/assets/images/sub-menu/jewelry.webp', // Image path for the submenu
  sections: [
    {
      title: 'Diamond Jewelry',
      link: STATIC_ROUTES.DIAMOND_JEWELRY,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Earrings', href: STATIC_ROUTES.EARRINGS },
        { name: 'Pendants', href: STATIC_ROUTES.NECKLACES },
        { name: 'Bracelets', href: STATIC_ROUTES.BRACELETS },
        { name: 'Rings and Bands', href: STATIC_ROUTES.RINGS_AND_BANDS },
        { name: 'Fine Jewelry Education', href: STATIC_ROUTES.EDUCATION_FINE_JEWELRY_GUIDE },
        { name: 'On Sale', href: STATIC_ROUTES.JEWELRY_SEARCH_SALE , highlight: true }
      ]
    },
    {
      title: 'Design Your Own',
      link: STATIC_ROUTES.DESIGN_RING,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Engagement Ring', href: STATIC_ROUTES.DESIGN_RING },
        { name: 'Earring', href: STATIC_ROUTES.DESIGN_EARRINGS },
        { name: 'Pendant', href: STATIC_ROUTES.DESIGN_PENDANT }
      ]
    },
    {
      title: 'Shop By Collection',
      link: STATIC_ROUTES.JEWELRY_SEARCH,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Bold Gold', href: STATIC_ROUTES.BOLD_GOLD },
        { name: 'French Cut Halo', href: STATIC_ROUTES.FRENCH_CUT_HALO },
        { name: 'Wedding Gifts', href: STATIC_ROUTES.WEDDING_GIFTS},
        { name: "Men's Jewelry", href: STATIC_ROUTES.MENS_JEWELRY },
        { name: 'Top Gift Ideas', href: STATIC_ROUTES.TOP_GIFT_IDEAS }
      ]
    }
  ]
};

export const educationSubMenu = {
  image: '/assets/images/sub-menu/education.webp', // Image path for the submenu
  sections: [
    {
      title: 'Diamond Education',
      link: STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Diamond Certification', href: STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION },
        { name: 'Carat Weight', href: STATIC_ROUTES.EDUCATION_CARAT_WEIGHT },
        { name: 'Diamond Cut', href: STATIC_ROUTES.EDUCATION_DIAMOND_CUT },
        { name: 'Diamond Color', href: STATIC_ROUTES.EDUCATION_DIAMOND_COLOR },
        { name: 'Diamond Clarity', href: STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY }
      ]
    },
    {
      title: 'Engagement Guide',
      link: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Wedding Ring Guide', href: STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE },
        { name: 'Establishing Your Budget', href: STATIC_ROUTES.EDUCATION_ESTABLISHING_BUDGET },
        { name: 'Proposal Tips', href: STATIC_ROUTES.EDUCATION_PROPOSAL_TIPS },
        { name: 'Metal Education', href: STATIC_ROUTES.EDUCATION_METAL_EDUCATION },
        { name: 'Pearl Education', href: STATIC_ROUTES.EDUCATION_PEARL_EDUCATION }
      ]
    },
    {
      title: 'Jeweler Guide',
      link: STATIC_ROUTES.EDUCATION_JEWELER_GUIDE,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Financing', href: STATIC_ROUTES.POLICIES_FINANCING_INSURANCE },
        { name: 'Insurance', href: STATIC_ROUTES.POLICIES_FINANCING_INSURANCE },
        { name: 'Jewelry Care', href: STATIC_ROUTES.EDUCATION_DIAMOND_CARE },
        { name: 'Gift Guide', href: STATIC_ROUTES.EDUCATION_GIFT_GUIDE },
        { name: 'Glossary', href: STATIC_ROUTES.EDUCATION_GLOSSARY_A},
      ]
    }
  ]
};

export const aboutUsSubMenu = {
  image: '/assets/images/sub-menu/footer.webp', // Image path for the submenu
  sections: [
    {
      title: 'Visit Us',
      link: STATIC_ROUTES.CONTACT,
      type: 'static',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Address', value: 'address', href: STATIC_ROUTES.CONTACT },
        { name: 'Phone Number', value: 'phone_number', href: 'tel:8776275094' , external : true, samePage : true},
      ]
    },
    {
      title: 'Our Policies',
      link: STATIC_ROUTES.CUSTOMER_SERVICE,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'Price Match Policy', href: STATIC_ROUTES.POLICIES_DIAMOND_PRICE_MATCH },
        { name: 'Conflict Free Policy', href: STATIC_ROUTES.POLICIES_CONFLICT_FREE },
        { name: 'Privacy Policy', href: STATIC_ROUTES.POLICIES_PRIVACY },
        { name: 'Returns Policy', href: STATIC_ROUTES.POLICIES_RETURN },
        { name: 'Shipping Policy', href: STATIC_ROUTES.POLICIES_SHIPPING }
      ]
    },
    {
      title: 'Our Story',
      link: STATIC_ROUTES.ABOUT,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      mobileItemClass: 'space-y-2.5',
      items: [
        { name: 'In The Media', href: STATIC_ROUTES.IN_THE_MEDIA },
        { name: 'Why Shop At Adiamor', href: STATIC_ROUTES.WHY_SHOP },
        { name: 'Testimonials', href: STATIC_ROUTES.TESTIMONIALS },
        { name: 'Shoppable Socials', href: STATIC_ROUTES.SHOPPABLE_SOCIALS },
        { name: 'Social Media Gallery', href: STATIC_ROUTES.SOCIAL_MEDIA_GALLERY }
      ]
    },
    {
      title: 'Contact Us',
      link: STATIC_ROUTES.CONTACT,
      type: 'link',
      itemParentClass: 'space-y-2.5',
      showCompnent : true
    }
  ]
};

export const featuredUrls = {
    topGiftIdeasPage : { slug : '', category: 'top-gift-ideas', params: { limit: 4 } },
    weddingGiftPage : { slug : '', category: 'wedding-gifts', params: { limit: 3 } }
};

export const redirectUrls = {
    '/design-your-own' : STATIC_ROUTES.DESIGN_RING,
    '/your-setting' : STATIC_ROUTES.DESIGN_RING,
    '/education/glossary' : '/education/glossary/a/'
};

  
  
