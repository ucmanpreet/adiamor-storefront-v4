import { STATIC_ROUTES } from '~/utils/staticRoutes';

const routeKey = (route = '') => {
  const cleanRoute = route.split(/[?#]/)[0];

  return cleanRoute !== '/' && cleanRoute.endsWith('/')
    ? cleanRoute.slice(0, -1)
    : cleanRoute;
};

const landingData = {
  "/": {
    "title": "Adiamor | Engagement Rings, Loose Diamonds and Fine Jewelry",
    "keyword": "engagement rings, loose diamonds, wedding bands, pendants, earrings, bracelets, fine jewelry, adiamor",
    "description": "Shop gorgeous engagement rings, stunning certified loose diamonds, and handcrafted fine jewelry and get expert guidance plus truly unbelievable prices.",
    "imageUrl": "path/to/your/assets/images/banner/home.webp"
  },
  "/diamonds": {
    "title": "Buy GIA Certified Loose Diamonds Online",
    "keyword": "loose diamonds, wholesale diamond shop, online diamond store, 2 carat loose diamond, 1 carat loose diamonds, real diamond",
    "description": "Buy GIA certified loose diamonds online at Adiamor. We have over 150k GIA certified diamonds, free overnight shipping, diamond price match & a 30-day return policy",
    "imageUrl": "path/to/your/assets/images/banner/diamond.webp"
  },
  "/engagement-rings": {
    "title": "Engagement Rings and Engagement Ring Settings",
    "description": "Want to buy a diamond engagement ring online? Buy an in-house design ring setting or design your custom engagement ring at Adiamor. Free shipping & 30 day returns.",
    "imageUrl": "",
    "keyword": "engagement ring settings, diamond ring settings, ring settings, engagement rings, adiamor, custom rings"
  },
  "/wedding": {
    "title": "Buy Wedding Rings Online",
    "keyword": "matching wedding rings, vintage wedding rings, wedding rings sets, unique wedding rings, mens wedding rings, mens wedding bands, diamond bands",
    "description": "Getting married? Trust Adiamor when shopping to buy wedding rings online.  The best selection of wedding bands with 30-day return policy & free overnight shipping.",
    "imageUrl": "path/to/your/assets/images/banner/wedding-banner.webp"
  },
  "/jewelry": {
    "title": "Buy Fine Jewelry Online",
    "keyword": "fine jewelry online, online fine jewelry stores, fine jewelry, fine jewelry stores, fine diamond jewelry, fine jewelry brands, women's fine jewelry, adiamor",
    "description": "Shop at Adiamor when looking to buy fine jewelry online, including rings, earrings, pendants and more. All hand crafted in a variety of classic metals and styles.",
    "imageUrl": "path/to/your/assets/images/banner/jewelry.webp"
  },
  "/education": {
    "title": "Education Center - Learn about Diamonds and Fine Jewelry",
    "keyword": "diamond education,diamonds,engagement rings,loose diamonds,certified loose diamond,gia certified diamonds,diamond certification,4C's,4Cs,4cs,4 cs,4c's,4 C's,four cs,four c's,the four c's,learn about diamonds,how to choose a diamond,how to select a diamond,how to pick a diamond,engagement ring guide,ring guide,ring sizing,engagement guide,proposal tips,how to propose",
    "description": "Our education center contains useful tips on how to buy diamonds, engagement rings, wedding bands, and find that perfect gift for someone you love.",
    "imageUrl": "path/to/your/assets/images/banner/education.webp"
  },
  "/education/glossary": {
    "title": "Adiamor - Diamond Education Glossary",
    "keyword": "diamond engagement rings,diamonds,engagement rings,platinum diamond engagement rings,diamond solitaire engagement ring,engagement ring,diamond engagement ring,diamond rings,diamond ring,platinum diamond ring,loose diamonds,certified loose diamond,diamond ring setting,diamond solitaire ring,diamond ring settings",
    "description": "Adiamor's tradition of excellence and superior quality starts with this comprehensive diamond education guide doesn't stop until you have a purchase you love.",
    "imageUrl": "path/to/your/assets/images/banner/education.webp"
  },
  "/about-adiamor": {
    "title": "About Adiamor - Los Angeles",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]",
    "description": "Adiamor is a Los Angeles based manufacturing company that offers a wide selection of high quality diamonds and custom diamond jewelry at remarkable prices.",
    "imageUrl": "path/to/your/assets/images/banner/about.webp"
  },
  "/design-your-own/ring": {
    "title": "Design Your Own Engagement Ring from Scratch Online",
    "keyword": "design your own engagement ring, design engagement ring, engagement ring design your own, design an engagement ring, design your engagement ring, design your own engagement ring from scratch online, design your own engagement rings, design your own engagement ring online, adiamor",
    "description": "Adiamor allows you to design your own engagement ring from scratch online using our ring creator. Select a diamond and setting and we'll create your unique ring.",
    "imageUrl": "path/to/your/assets/images/banner/design-your-own-ring-banner.webp"
  },
  "/design-your-own/earrings": {
    "title": "Design Your Own Earrings Online",
    "keyword": "design your own earrings, design your own earrings online, design earrings online, design your own diamond earrings, adiamor",
    "description": "When buying preset earrings is not an option, Adiamor enables you to design your own earrings online. Diamond, pearl, gold; the choice is up to you!",
    "imageUrl": "path/to/your/assets/images/banner/design-your-own-earring-banner.webp"
  },
  "/design-your-own/pendant": {
    "title": "Design Your Own Pendant Online",
    "keyword": "design your own pendant, diamond pendant designs, design your own necklace pendant, diamond pendant necklace designs, heavy diamond pendant designs, adiamor",
    "description": "At Adiamor, you have the ability to design your own pendant online. Make your necklace as unique as you are. You design it and we create it from scratch.",
    "imageUrl": "path/to/your/assets/images/banner/design-your-own-pendant-banner.webp"
  },
  "/recently-purchased-rings": {
    "title": "Recently Purchased Engagement Rings",
    "keyword": "recently purchased engagement rings, adiamor",
    "description": "View some of the hundreds of recently purchased engagement rings from Adiamor including pictures, links, and details about the settings and certified diamonds.",
    "imageUrl": "path/to/your/assets/images/banner/recently-purchased-rings-banner.webp"
  },
  "/french-cut-halo-collection": {
    "title": "French Cut Halo Diamond Jewelry Collection",
    "keyword": "french cut halo diamond jewelry collection, adiamor, Halo engagement rings, Halo earrings, Halo pendants, Halo necklaces",
    "description": "The French Cut Halo Diamond Jewelry Collection from Adiamor includes halo engagement rings, halo earrings, and pendants with a setting style called French Cut Pave.",
    "imageUrl": ""
  },
  "/custom-design-engagement-rings": {
    "title": "Custom Design Engagement Rings",
    "keyword": "jeweler guide,adiamor return policy,trusted jeweler,adiamor guidance,adiamor education,diamond engagement rings,diamonds,engagement rings,engagement ring,diamond engagement ring,diamond rings,diamond ring,loose diamonds,certified loose diamonds",
    "description": "Our design experts are here to guide you step-by-step through the process to ensure that your design is everything you dreamed it would be.",
    "imageUrl": ""
  },
  "/top-engagement-ring-styles": {
    "title": "Top Engagement Ring Styles",
    "keyword": "top engagement rings, top 20 engagement ring styles, adiamor top 20",
    "description": "Browse Adiamor's best engagement ring styles from simple solitaires to halo and 3 stone rings.",
    "imageUrl": "path/to/your/assets/images/banner/yellow_gold_ring.webp"
  },
  "/diamond-jewelry": {
    "title": "Design Your Own Diamond Jewelry Online",
    "keyword": "diamond jewelry, online diamond jewelry, buy diamond jewelry, fine diamond jewelry, mens diamond jewelry",
    "description": "Whether you want to buy diamond jewelry that is pre-made using the finest of materials, or want to design your own diamond jewelry online - come to Adiamor!",
    "imageUrl": "@/assets/images/banner/diamond-jewelry-banner.webp"
  },
  "/earrings": {
    "title": "Buy Pearl, Gemstone and Diamond Earrings Online",
    "keyword": "diamond earrings, diamond stud earrings, diamond hoop earrings, diamond earrings studs, diamond earrings for men, mens diamond earrings, 1 carat diamond earrings, diamond earring studs",
    "description": "When you want to buy pearl, gemstone or diamond earrings online, Adiamor is the place of choice. Shop now and find your perfect pair of diamond studs in any shape.",
    "imageUrl": "@/assets/images/banner/earrings-banner.webp"
  },
  "/necklaces": {
    "title": "Buy a Diamond Pendant Necklace Online",
    "keyword": "diamond pendant necklace, diamond pendant, diamond heart pendant, diamond pendants, diamond solitaire pendant, diamond pendant mens, adiamor",
    "description": "At Adiamor, you can buy a diamond pendant necklace online for a fraction of the cost of buying one from your local department store. We offer free shipping too.",
    "imageUrl": "@/assets/images/banner/pendants-banner.webp"
  },
  "/bracelets": {
    "title": "Buy Bracelets: Diamond Tennis, Pearl, Gold, and Stackable",
    "keyword": "diamond bracelets, diamond bracelet, mens diamond bracelets, diamond bangle bracelet, black diamond bracelet, gold diamond bracelet",
    "description": "In the market to buy a diamond bracelet in 14k yellow gold, white gold or platinum? Shop the Adiamor bracelet collection for unique mens and womens bracelets.",
    "imageUrl": "@/assets/images/banner/bracelet-banner.webp"
  },
  "/rings-and-bands": {
    "title": "Classic Diamond Engagement Rings and Wedding Bands",
    "keyword": "classic engagement rings, classic wedding bands, classic wedding ring, classic men's wedding bands, adiamor",
    "description": "Buy diamond wedding rings online from Adiamor. We have a huge selection of bands, a variety of cuts, and always competitive pricing! 30 day return policy too.",
    "imageUrl": "@/assets/images/banner/wedding-gift-banner.webp"
  },
  "/bold-gold-collection": {
    "title": "Bold Gold Jewelry Collection",
    "keyword": "bold gold jewelry collection, adiamor, gold hoops, gold necklaces, gold bracelets, gold earrings, gold rings",
    "description": "The Bold Gold Jewelry Collection includes on trend 14k gold earrings, necklaces, rings and bracelets in yellow and rose gold from Adiamor.",
    "imageUrl": "@/assets/images/banner/bold-gold-banner.webp"
  },
  "/wedding-gifts": {
    "title": "Wedding Gifts",
    "keyword": "diamond engagement rings, diamonds, engagement rings, platinum diamond engagement rings, diamond solitaire engagement ring, engagement ring, diamond engagement ring, diamond rings, diamond ring, platinum diamond ring, loose diamonds, certified loose diamond, diamond ring setting, diamond solitaire ring, diamond ring settings",
    "description": "Thoughtful gifts for brides, grooms and everyone in between.",
    "imageUrl": "@/assets/images/banner/wedding-gift-banner.webp"
  },
  "/mens-jewelry": {
    "title": "Buy Men's Jewelry Online",
    "keyword": "men's jewelry, mens jewelry, men's jewelry stores, men jewelry, jewelry for men, mens gold jewelry, men's fine jewelry, adiamor",
    "description": "Competitive pricing is important when shopping to buy men's jewelry online. You get that at Adiamor, along with free overnight shipping & a 30-day return policy.",
    "imageUrl": "@/assets/images/banner/men-jewelry-banner.webp"
  },
  "/custom-search": {
    "title": "Custom Diamond Search",
    "keyword": "custom diamond search, certified loose diamonds, adiamor",
    "description": "Request a custom diamond search by our gemologists at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "@/assets/images/banner/diamond-engagement-rings-banner.webp"
  },
  "/wishlist": {
    "title": "Wishlist",
    "keyword": "adiamor, wishlist, my account, favorites",
    "description": "Use Adiamor's wishlist to save your favorite jewelry and diamonds from our extensive collection.",
    "imageUrl": "@/assets/images/banner/wishlist.webp"
  },
  "/shoppable-socials": {
    "title": "Shoppable Socials Diamonds and Fine Jewelry",
    "keyword": "social media, shoppable socials, customers, adiamor",
    "description": "Purchase items from Adiamor Socials!",
    "imageUrl": ""
  },
  "/social-media-gallery": {
    "title": "Social Media Gallery Diamonds and Fine Jewelry",
    "keyword": "social media, instagram, customers, adiamor",
    "description": "Be featured in our social media gallery! Post your engagement ring, proposal story, or wedding photos on social media - #Adiamor.",
    "imageUrl": ""
  },
  "/in-the-media": {
    "title": "In The Media",
    "keyword": "adiamor in the media, adiamor",
    "description": "See what people are saying about Adiamor, watch Adiamor on TV, see some of the places we have recently been featured, and read through our news releases.",
    "imageUrl": "@/assets/images/banner/about.webp"
  },
  "/refer-a-friend": {
    "title": "Refer a Friend",
    "keyword": "refer a friend to adiamor, adiamor refer a friend program, adiamor",
    "description": "Refer a friend to Adiamor you both could save. $20 on your order of $100 or more, $50 on your order of $500 or more, and $100 on your order of $1,000 or more.",
    "imageUrl": "@/assets/images/banner/about.webp"
  },
  "/testimonials": {
    "title": "Adiamor Reviews - Reviews & Testimonials",
    "keyword": "Adiamor reviews, Adiamor customer reviews, Adiamor customer testimonials",
    "description": "Adiamor Reviews - Want to know more about what you can expect when buying from Adiamor? See customer reviews and testimonials about their experience with us.",
    "imageUrl": "@/assets/images/banner/about.webp"
  },
  "/why-shop-at-adiamor": {
    "title": "Why Shop at Adiamor?",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]",
    "description": "We have trained professionals waiting to answer any questions or help you find that perfect diamond or jewelry gift. You can call us toll-free at 1-877-627-5094 or e-mail us at service@adiamor.com.",
    "imageUrl": "@/assets/images/banner/about.webp"
  },
  "/promotions": {
    "title": "Promotions",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]",
    "description": "ADIAMOR PROMOTIONS Current Promotions EARLY ACCESS! See our Black Friday deals early. Sign up for our newletter and get Black Friday deals n",
    "imageUrl": "@/assets/images/banner/about.webp"
  },
  "/flexible-financing": {
    "title": "Flexible Financing Options Fine Diamonds and Jewelry",
    "keyword": "flexible financing, jewelry financing, financing your engagement ring, buy now pay later",
    "description": "Adiamor offers flexible financing options such as Buy Now Pay Later with Affirm and Paypal Credit as well as split payments across multiple credit cards.",
    "imageUrl": "@/assets/images/banner/flexible-financing-banner.webp"
  },
  "/my-account": {
    "title": "My Account | Order Listing",
    "keyword": "Adiamor My Account,  login, AdmiAmor order tracking, customer account AdmiAmor",
    "description": "Access your AdmiAmor account to view orders, track shipments, manage personal details, and enjoy a personalized shopping experience. Login or register now.",
    "imageUrl": "@/assets/images/banner/account-banner.webp"
  },
  "/top-gift-ideas": {
    "title": "Top Gift Ideas",
    "keyword": "preset diamond stud earrings, diamond wedding bands, preset diamond halo earrings, akoya pearl solitaire pendant, diamond eternity band",
    "description": "Browse our most popular gifts and find that special something.",
    "imageUrl": "@/assets/images/banner/top-gift-ideas-banner.webp"
  },
  "/custom-rings-gallery": {
    "title": "Custom Engagement Rings Gallery",
    "keyword": "custom engagement rings gallery, adiamor",
    "description": "Be inspired by our custom engagement rings gallery and work with our design experts to create a one-of-a-kind custom made ring that represents your unique love.",
    "imageUrl": "@/assets/images/banner/wedding-gift-banner.webp"
  },
  "/care-plan": {
    "title": "Jewelry Care Plan",
    "keyword": "Care Plan",
    "description": "Care Plan",
    "imageUrl": "@/assets/images/banner/wedding-banner.webp"
  },
  "/wedding-rings": {
    "title": "Buy Wedding Rings Online",
    "keyword": "matching wedding rings, vintage wedding rings, wedding rings sets, unique wedding rings, mens wedding rings, mens wedding bands, diamond bands",
    "description": "Getting married? Trust Adiamor when shopping to buy wedding rings online. The best selection of wedding bands with 30-day return policy & free overnight shipping.",
    "imageUrl": "@/assets/images/banner/wedding-rings-banner.webp"
  },
  "/diamond-stud-earrings": {
    "title": "Preset Diamond Stud Earrings",
    "keyword": "preset diamond earrings, diamond stud earrings",
    "description": "Want to buy diamond stud earrings online? Choose from our pre-set diamond earrings. Free shipping & 30 day returns.",
    "imageUrl": "@/assets/images/banner/diamond-stud-earrings-banner.webp"
  },
  "/diamonds/search": {
    "title": "Search Loose Diamonds For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy loose diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "loose diamond search, certified loose diamonds, adiamor"
  },
  "/diamonds/search/natural": {
    "title": "Search Loose Diamonds For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy loose diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "loose diamond search, certified loose diamonds, adiamor"
  },
  "/diamonds/search/lab-grown": {
    "title": "Search Lab Grown Diamonds For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy lab grown diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "loose diamond search, lab grown loose diamonds, adiamor"
  },
  "/diamonds/search/diamond-pair": {
    "title": "Shop Diamond Pairs and Build Your own Diamond Earrings.com",
    "description": "SAVE 30-40% OFF RETAIL buy loose diamond pairs online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "diamond pair search, certified loose diamond pairs, adiamor"
  },
  "/diamonds/search/canadian": {
    "title": "Canadian Diamonds For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy Canadian diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "Canadian diamonds, diamonds from Canada, Adiamor"
  },
  "/diamonds/custom-search": {
    "title": "Custom Diamond Search - Adiamor.com",
    "description": "Request a custom diamond search by our gemologists at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "custom diamond search, certified loose diamonds, adiamor"
  },
  "/diamonds/search/asscher": {
    "title": "Asscher Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy asscher cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "asscher diamond engagement rings, asscher diamond rings, Adiamor, asscher engagement ring, adiamor engagement rings, asscher cut diamonds"
  },
  "/diamonds/search/cushion": {
    "title": "Cushion Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy cushion cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "cushion cut diamond engagement rings, cushion cut diamond rings, Adiamor, cushion cut engagement ring, adiamor engagement rings, cushion diamonds"
  },
  "/diamonds/search/emerald": {
    "title": "Emerald Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy emerald cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "emerald cut diamond engagement rings, emerald cut diamond rings, Adiamor, emerald cut engagement ring, adiamor engagement rings, emerald cut diamonds"
  },
  "/diamonds/search/heart": {
    "title": "Heart Shaped Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy heart shaped diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "heart shaped diamond engagement rings, heart shaped diamond rings, Adiamor, heart shaped engagement ring, adiamor engagement rings, heart shaped diamonds"
  },
  "/diamonds/search/marquise": {
    "title": "Marquise Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy marquise cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "marquise diamond engagement rings, marquise cut diamond rings, Adiamor, marquise cut engagement ring, adiamor engagement rings, marquise cut diamonds"
  },
  "/diamonds/search/oval": {
    "title": "Oval Shaped Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy oval shaped diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "oval diamond engagement rings, oval diamond rings, Adiamor, oval engagement ring, adiamor engagement rings, oval diamonds"
  },
  "/diamonds/search/pear": {
    "title": "Pear Shaped Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy pear shaped diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "pear shaped diamond engagement rings, pear diamond rings, Adiamor, pear engagement ring, adiamor engagement rings, pear shaped diamonds"
  },
  "/diamonds/search/princess": {
    "title": "Princess Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy princess cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "princess cut diamond engagement rings, princess cut diamond rings, Adiamor, princess engagement ring, adiamor engagement rings, princess cut diamonds"
  },
  "/diamonds/search/radiant": {
    "title": "Radiant Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy radiant cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "radiant cut diamond engagement rings, radiant cut diamond rings, Adiamor, radiant cut engagement ring, adiamor engagement rings, radiant diamonds"
  },
  "/diamonds/search/round": {
    "title": "Round Cut Diamonds Loose For Sale Online - Adiamor.com",
    "description": "SAVE 30-40% OFF RETAIL buy round cut diamonds online at Adiamor - Free Shipping, 30-Day Returns and the Lowest Prices - Guaranteed",
    "imageUrl": "",
    "keyword": "round diamond engagement rings, round diamond rings, Adiamor, round engagement ring, adiamor engagement rings, round diamonds"
  },
  "/earrings/search/hoop": {
    "title": "Adiamor Earring Search - Hoop Earrings",
    "description": "The diamond hoop earring is a classic choice featuring elegant designs and classy settings. Adiamor is proud to offer a vast collection of diamond hoop earrings for every style and budget.",
    "imageUrl": "",
    "keyword": ""
  },
  "/earrings/search/pre-set": {
    "title": "Pre-set Diamond Earrings",
    "description": "The collection of preset diamond earrings showcase brilliant diamonds in gorgeous settings with styles to match every outfit and outing. Adiamor is proud to offer an expansive selection of preset diamond earrings in a range of styles to fit every budget.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search": {
    "title": "Engagement Ring Settings Search",
    "description": "Easily find the engagement ring of your dreams using this engagement ring settings search. Adiamor offers free shipping & 30-day returns.",
    "imageUrl": "",
    "keyword": "engagement ring, diamond engagement rings, unique engagement rings, cheap engagement rings, simple engagement rings, affordable engagement rings, adiamor"
  },
  "/engagement-rings/search/14k-rose-gold": {
    "title": "14K Rose Gold Engagement Rings and Engagement Ring Settings",
    "description": "The pinkish hue of 14k rose gold rings compliment and flatter every skin tone. Shop 14k rose gold engagement rings and engagement ring settings from Adiamor today.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/14k-white-gold": {
    "title": "14K White Gold Engagement Rings and Engagement Ring Settings",
    "description": "14k white gold engagement rings are elegant and sophisticated. Adiamor offers 14k white gold engagement rings in styles and settings to suit every bride's style.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/14k-yellow-gold": {
    "title": "14K Yellow Gold Engagement Rings and Engagement Ring Settings",
    "description": "14k yellow gold engagement rings are the most classic and timeless of any engagement ring style. Perfect for every diamond shape, Adiamor offers 14k yellow gold rings to fit every budget.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/18k-rose-gold": {
    "title": "18K Rose Gold Engagement Rings and Engagement Ring Settings",
    "description": "18k rose gold engagement rings offer timeless elegance for every style ranging from vintage to modern. Shop 18k rose gold rings and engagement ring settings from Adiamor today.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/18k-white-gold": {
    "title": "18K White Gold Engagement Rings and Engagement Ring Settings",
    "description": "18k white gold engagement rings are statements of class and elegance. Shop a wide variety of 18k white gold rings and engagement ring settings from Adiamor.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/18k-yellow-gold": {
    "title": "18K Yellow Gold Engagement Rings and Engagement Ring Settings",
    "description": "The most traditional of all engagement rings are made in 18k yellow gold. Browse a large selection of 18k yellow gold engagement rings available to fit every style and budget.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/asscher": {
    "title": "Asscher Cut Diamond Engagement Rings",
    "description": "Shop at Adiamor to buy asscher cut diamonds online. We have over 150,000 GIA & AGS certified loose diamonds to choose from.",
    "imageUrl": "",
    "keyword": "asscher diamond engagement rings, asscher diamond rings, Adiamor, asscher engagement ring, adiamor engagement rings, asscher cut diamonds"
  },
  "/engagement-rings/search/cushion": {
    "title": "Cushion Cut Diamond Engagement Rings",
    "description": "Buy cushion cut diamonds online at Adiamor. Whether a standard cut or a newer modified cut, these diamonds vary, but all are remarkable.",
    "imageUrl": "",
    "keyword": "cushion cut diamond engagement rings, cushion cut diamond rings, Adiamor, cushion cut engagement ring, adiamor engagement rings, cushion diamonds"
  },
  "/engagement-rings/search/emerald": {
    "title": "Emerald Cut Diamond Engagement Rings",
    "description": "Buy emerald cut diamonds online at Adiamor everyday at a great price. We offer overnight free shipping, a diamond price match guarantee & 30-day return policy.",
    "imageUrl": "",
    "keyword": "emerald cut diamond engagement rings, emerald cut diamond rings, Adiamor, emerald cut engagement ring, adiamor engagement rings, emerald cut diamonds"
  },
  "/engagement-rings/search/gemstone": {
    "title": "Gemstone Engagement Rings and Ring Settings",
    "description": "Gemstone engagement rings are a wonderful alternative for those who do not find diamonds appealing. Shop for gemstone engagement rings online at Adiamor.",
    "imageUrl": "",
    "keyword": "gemstone engagement ring, gemstone rings, mens gemstone rings, gemstone ring, sterling silver gemstone ring, gemstone wedding rings, design your own gemstone ring, vintage gemstone rings, adiamor"
  },
  "/engagement-rings/search/halo": {
    "title": "Halo Engagement Rings and Ring Settings",
    "description": "Halo engagement rings are designed to make the center diamond appear larger than normal. Find cushion cut, double halo engagement rings & more at Adiamor.",
    "imageUrl": "",
    "keyword": "halo engagement rings, cushion cut halo engagement rings, double halo engagement ring, halo engagement ring, oval halo engagement rings, princess cut halo engagement rings, round halo engagement rings, halo cushion cut engagement rings, vintage halo engagement rings, halo diamond engagement rings, halo engagement ring settings"
  },
  "/engagement-rings/search/heart": {
    "title": "Heart Shaped Diamond Engagement Rings",
    "description": "Buy heart shaped diamonds online at Adiamor for the  love of your life. We offer overnight free shipping, a diamond price match guarantee & 30-day return policy.",
    "imageUrl": "",
    "keyword": "heart shaped diamond engagement rings, heart shaped diamond rings, Adiamor, heart shaped engagement ring, adiamor engagement rings, heart shaped diamonds"
  },
  "/engagement-rings/search/matched-set": {
    "title": "Engagement Rings & Matching Bands - Wedding Ring Sets",
    "description": "Your search for matching engagement & wedding rings is over! Shop through our collection of wedding ring sets to find a style that suits you and your love.",
    "imageUrl": "",
    "keyword": "wedding ring sets, wedding rings sets, wedding ring set, wedding ring sets for her, wedding ring sets for him and her, wedding rings sets for him and her, cheap wedding rings sets, cheap wedding ring sets, wedding rings sets his and hers, engagement and wedding ring sets, diamond wedding ring sets, adiamor"
  },
  "/engagement-rings/search/pre-set-rings": {
    "title": "Pre-Set Engagement Rings",
    "description": "Huge selection of preset fashion bracelets from Adiamor.",
    "imageUrl": "",
    "keyword": "engagement,rings,preset,pre-set,diamond,settings"
  },
  "/engagement-rings/search/rose-gold": {
    "title": "14K and 18K Rose Gold Engagement Rings",
    "description": "Buy rose gold engagement rings if you are looking for something new with an elegant twist. Adiamor has a huge selection of rings in rose gold to choose from.",
    "imageUrl": "",
    "keyword": "rose gold engagement rings, rose gold engagement ring, rose gold diamond engagement ring, vintage rose gold engagement rings, engagement rings rose gold, rose gold halo engagement rings, adiamor jewelry search"
  },
  "/engagement-rings/search/yellow-gold": {
    "title": "14K and 18K Yellow Gold Engagement Rings",
    "description": "There's nothing quite as elegant as the classic look of a yellow gold engagement ring. Shop yellow gold engagement rings and ring settings online at Adiamor.",
    "imageUrl": "",
    "keyword": "yellow gold engagement rings, yellow diamond engagement rings, yellow diamond engagement ring, yellow gold diamond engagement rings, yellow engagement rings, engagement rings yellow gold, adiamor"
  },
  "/engagement-rings/search/marquise": {
    "title": "Marquise Cut Diamond Engagement Rings",
    "description": "Buy marquise cut diamonds online from Adiamor. We have over 150k diamonds to choose from, a diamond price match guarantee & 30-day return policy.",
    "imageUrl": "",
    "keyword": "marquise diamond engagement rings, marquise cut diamond rings, Adiamor, marquise cut engagement ring, adiamor engagement rings, marquise cut diamonds"
  },
  "/engagement-rings/search/modern": {
    "title": "Modern Engagement Rings and Ring Settings",
    "description": "Want to stand out from the crowd with a more contemporary styled ring? Then shop our collection of modern engagement rings & ring settings. Free shipping.",
    "imageUrl": "",
    "keyword": "modern engagement rings, modern diamond rings, Adiamor, modern engagement ring, modern contemporary engagement rings, modern bridge engaement rings, adiamor jewelry search"
  },
  "/engagement-rings/search/oval": {
    "title": "Oval Shaped Diamond Engagement Rings",
    "description": "Buy oval shaped diamonds online at Adiamor and rest easy knowing we have a diamond price match guarantee, free shipping, and a 30-day return policy.",
    "imageUrl": "",
    "keyword": "oval diamond engagement rings, oval diamond rings, Adiamor, oval engagement ring, adiamor engagement rings, oval diamonds"
  },
  "/engagement-rings/search/pave": {
    "title": "Pave Engagement Rings and Ring Settings",
    "description": "Buy a Pave Engagement rings today at Adiamor. The tiny diamonds around this ring will make it sparkle from a mile away!",
    "imageUrl": "",
    "keyword": "pave engagement rings, micro pave engagement ring, pave engagement ring, micro pave engagement rings, pave diamond engagement ring, adiamor"
  },
  "/engagement-rings/search/pear": {
    "title": "Pear Shaped Diamond Engagement Rings",
    "description": "Buy pear shaped diamonds online at Adiamor and rest assured that they are conflict-free & competitively priced. We also offer free shipping & 30-day returns.",
    "imageUrl": "",
    "keyword": "pear shaped diamond engagement rings, pear diamond rings, Adiamor, pear engagement ring, adiamor engagement rings, pear shaped diamonds"
  },
  "/engagement-rings/search/princess": {
    "title": "Princess Cut Diamond Engagement Rings",
    "description": "Buy princess cut diamonds online at Adiamor. With over 150k diamonds to choose from and a diamond price match guarantee, you can't go wrong!",
    "imageUrl": "",
    "keyword": "princess cut diamond engagement rings, princess cut diamond rings, Adiamor, princess engagement ring, adiamor engagement rings, princess cut diamonds"
  },
  "/engagement-rings/search/radiant": {
    "title": "Radiant Cut Diamond Engagement Rings",
    "description": "Buy radiant cut diamonds online at Adiamor. We have over 150k diamonds to choose from, and offer a diamond price match and overnight free shipping.",
    "imageUrl": "",
    "keyword": "radiant cut diamond engagement rings, radiant cut diamond rings, Adiamor, radiant cut engagement ring, adiamor engagement rings, radiant diamonds"
  },
  "/engagement-rings/search/round": {
    "title": "Round Diamond Engagement Rings",
    "description": "Buy round cut diamonds online at Adiamor. We have over 150k diamonds to select from, and offer a diamond price match with free overnight shipping.",
    "imageUrl": "",
    "keyword": "round diamond engagement rings, round diamond rings, Adiamor, round engagement ring, adiamor engagement rings, round diamonds"
  },
  "/engagement-rings/search/solitaire": {
    "title": "Buy Solitaire Engagement Rings and Ring Settings Online",
    "description": "There's nothing more classic than a solitaire engagement ring. A single diamond set upon a band of white, yellow, rose gold or platinum. Buy one at Adiamor.",
    "imageUrl": "",
    "keyword": "solitaire engagement rings, solitaire engagement ring, engagement rings solitaire, diamond solitaire engagement ring, solitaire diamond engagement ring"
  },
  "/engagement-rings/search/splitshank": {
    "title": "Buy Split Shank Engagement Rings and Settings",
    "description": "Split Shank engagement rings beautifully twist around the ring finger, providing for a rare, elegant style. Buy a split shank engagement ring online at Adiamor.",
    "imageUrl": "",
    "keyword": "split shank engagement rings, split shank halo engagement ring, split shank engagement ring, adiamor"
  },
  "/engagement-rings/search/thin-band": {
    "title": "Thin Band Engagement Ring Collection",
    "description": "Adiamor's thin band engagement ring collection features a modern take on classic styles with band widths ranging from 1.5mm to 1.7mm. Thin band ring styles include simple solitaires, diamond bands, halos, and 3 stone rings. Thin bands are comfortable to wear, stack well with other rings, and accentuate the center diamond.",
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/three-stone": {
    "title": "Buy Three Stone Engagement Rings and Ring Settings",
    "description": "If you are looking to buy three stone engagement rings or ring settings online, Adiamor is the place for you. Competitive pricing, free shipping & 30-day returns.",
    "imageUrl": "",
    "keyword": "three stone engagement ring, three stone engagement rings, three stone princess cut engagement ring, three stone diamond engagement ring, adiamor"
  },
  "/engagement-rings/search/vintage": {
    "title": "Buy Vintage Engagement Rings and Ring Settings Online",
    "description": "Are vintage style engagement rings your thing? Buy vintage engagement rings online from Adiamor. Easy financing, beautiful diamonds, and free shipping.",
    "imageUrl": "",
    "keyword": "vintage engagement rings, vintage style engagement rings, vintage rose gold engagement rings, vintage engagement ring, vintage diamond engagement rings, engagement rings vintage, adiamor"
  },
  "/engagement-rings/search/white-gold": {
    "title": "14K and 18K White Gold Engagement Rings",
    "description": "White gold offers unparalleled beauty and sophisticated elegance, making it one of the top-selling engagement ring metals. Shop the Adiamor collection of white gold engagement rings and engagement ring settings today.",
    "imageUrl": "",
    "keyword": ""
  },
  '/pendants/search/pre-set': {
    'title': 'Pre-Set Diamond Pendant Search',
    'description': 'Preset diamond pendants are the premier choice when searching for the right diamond necklace to expand your jewelry collection. Adiamor proudly offers an extensive selection of preset diamond pendant necklaces for every style and budget.',
    "imageUrl": "",
    "keyword": ""
  },
  "/engagement-rings/search/hidden-halo": {
    "title": "Hidden Halo Engagement Ring Collection",
    "description": "The Adiamor Hidden Halo Engagement Ring Collection includes engagement rings with a halo of diamonds added to the basket. Available in white, yellow and rose gold.",
    "imageUrl": "",
    "keyword": "hidden halo engagement ring collection, adiamor, hidden halo engagement ring settings"
  },
  "/engagement-rings/search/thin-band-collection": {
    "title": "Thin Band Engagement Ring Collection",
    "description": "The Adiamor Thin Band Engagement Ring Collection includes engagement ring settings with band widths ranging from 1.5mm to 1.7mm. Available in white, yellow and rose gold.",
    "imageUrl": "",
    "keyword": "thin band engagement ring collection, adiamor, thin band rings"
  },
  "/engagement-rings/search/french-cut-ring-collection": {
    "title": "Adiamor Jewelry Search - Engagement Rings and Settings",
    "description": "Adiamor Jewelry Search - Engagement Rings and Settings",
    "imageUrl": "",
    "keyword": "engagement,rings,settings"
  },
  "/earrings/search/french-cut-earring-collection": {
    "title": "French Cut Halo Earrings Search",
    "description": "Design your own french cut halo earrings with Adiamor. Free Overnight Shipping and 30 Day Returns",
    "imageUrl": "",
    "keyword": "french cut, halo, earrings, adiamor"
  },
  "/necklaces/search/french-cut-pendant-collection": {
    "title": "Adiamor Jewelry Search - Design Your Own Diamond Pendant",
    "description": "Adiamor Jewelry Search - Design Your Own Diamond Pendant",
    "imageUrl": "",
    "keyword": "design your own,solitaire,build your own,diamond,necklaces,pendants,jewelry,adiamor"
  },
  "/engagement-rings/search/platinum": {
    "title": "Platinum Engagement Rings and Engagement Ring Settings",
    "description": "When it comes to durable strength combined with beauty, platinum rings are the premier choice. Shop platinum engagement rings available from Adiamor today.",
    "imageUrl": "",
    "keyword": "platinum engagement rings, platinum diamond engagement rings, platinum diamond engagement ring, platinum diamond engagement rings, engagement rings platinum, adiamor"
  },
  "/wedding-rings/search/classic": {
    "title": "Classic Wedding Rings",
    "description": "Classic and timeless wedding rings from Adiamor. Huge selection of must have classic rings and bands, direct from manufacturer.",
    "imageUrl": "",
    "keyword": "wedding,rings,bands,metal,gold,platinum"
  },
  "/wedding-rings/search/diamond-accented": {
    "title": "Adiamor Jewelry Search - Diamond Stackable Rings",
    "description": "Shop Adiamor's fashion forward selection of diamond and gemstone stackable rings, perfect for everyday wear.",
    "imageUrl": "",
    "keyword": "stackable,stacked rings,fashion,eternity,diamond,rings,bands,diamond,metal,gold,platinum,rose gold"
  },
  "/wedding-rings/search/pave": {
    "title": "Diamond Pavé Wedding Rings and Bands",
    "description": "Pavé wedding rings and bands from Adiamor. Browse our gorgeous selection of pavé rings and bands, available in platinum and gold.",
    "imageUrl": "",
    "keyword": "wedding,rings,bands,metal,gold,platinum"
  },
  "/wedding-rings/search/channel-set": {
    "title": "Channel Set Wedding Rings",
    "description": "Channel set wedding rings and bands from Adiamor. Browse our gorgeous selection of channel set rings and bands in most any metal.",
    "imageUrl": "",
    "keyword": "wedding,rings,bands,metal,gold,platinum"
  },
  "/wedding-rings/search/gemstone_accented": {
    "title": "Search Gemstone Wedding Rings",
    "description": "Search through our collection of gemstone wedding bands. Adiamor offers a selection of pink and blue sapphires and rubies.",
    "imageUrl": "",
    "keyword": "wedding,rings,bands,metal,gold,platinum,gemstone,sapphire,ruby,pink,blue,red"
  },
  "/wedding-rings/search/eternity-wedding-rings": {
    "title": "Diamond Eternity Wedding Rings",
    "description": "Shop Adiamor's sparkling selection of diamond eternity bands. Choose from precious white, yellow or rose gold and enduring platinum with a variety of carat weights for the perfect look!",
    "imageUrl": "",
    "keyword": "wedding,rings,bands,diamond,metal,gold,platinum,eternity"
  },
  "/education/wedding-ring-guide": {
    "title": "Education - Wedding Ring Guide",
    "description": "The Adiamor Wedding Ring Guide helps make choosing the a wedding band easy. Get the tips and info that will help you select rings that reflect you & your love.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/wedding-rings/search/white-gold": {
    "title": "White Gold Wedding Rings and Bands in 14k and 18k",
    "description": "Adiamor Jewelry Search - 14 and 18 Karat White Gold Wedding Rings and Bands",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,white,wedding,rings,bands,adiamor"
  },
  "/wedding-rings/search/yellow-gold": {
    "title": "Yellow Gold Wedding Rings and Bands in 14k and 18k",
    "description": "Adiamor Jewelry Search - 14 and 18 Karat Yellow Gold Wedding Rings and Bands",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,yellow,wedding,rings,bands,adiamor"
  },
  "/wedding-rings/search/rose-gold": {
    "title": "Adiamor Jewelry Search - Rose Gold Rings",
    "description": "Rose Gold Engagement Rings - Looking for that special rose gold engagement ring? Choose one from Adiamors' extensive selection of exquisite rings today.",
    "imageUrl": "",
    "keyword": "rose gold engagement rings, rose gold engagement ring, Adiamor"
  },
  "/wedding-rings/search/platinum": {
    "title": "Wedding Rings Search - Platinu",
    "description": "Platinum Wedding Bands - Make the ring selection process easy by choosing from Adiamor's extensive collection of platinum rings for your special someone.",
    "imageUrl": "",
    "keyword": "platinum wedding bands, platinum rings, Adiamor"
  },
  "/wedding-rings/search/womens-wedding-rings": {
    "title": "Women’s Wedding Rings",
    "description": "Women’s wedding rings and bands from Adiamor. Browse our amazing selection of women’s rings available in platinum and gold.",
    "imageUrl": "",
    "keyword": "diamond wedding rings for women, gold wedding rings for women"
  },
  "/wedding-rings/search/mens-wedding-rings": {
    "title": "Men's Wedding Rings and Bands",
    "description": "Mens Wedding Rings - Make finding the perfect wedding band for him easy with our extensive collection of rings and bands in all styles and metals from Adiamor.",
    "imageUrl": "",
    "keyword": "men's diamond band rings, 6mm mens wedding band"
  },
  "/wedding-rings/search/anniversary-wedding-rings": {
    "title": "Diamond Anniversary Rings and Bands",
    "description": "Shop a gorgeous collection of diamond anniversary rings and bands from Adiamor. Choose between diamond pavé bands, eternity rings, channel set anniversary rings and more.",
    "imageUrl": "",
    "keyword": "diamond anniversary rings, diamond anniversary bands"
  },
  "/necklaces/search": {
    "title": "Pendant Search - All Pendants",
    "description": "Adiamor Pendant Collection - Adiamor has such a gorgeous selection of pendants, it's hard to choose! Diamond, onyx, pearl, lockets, gemstones and so much more!",
    "imageUrl": "",
    "keyword": "diamond,necklaces,pendants,jewelry,adiamor"
  },
  "/earrings/search": {
    "title": "All Earrings - Diamond Studs, Gold, Hoop and Pearl",
    "description": "From pearl, to hoop, to even gemstone earrings, you can even search by metal type! Whatever your personality, Adiamor has something for you!",
    "imageUrl": "",
    "keyword": "diamond,dangle,hoop,stud,three stone,earrings,jewelry,adiamor"
  },
  "/earrings/search/gemstone-earrings": {
    "title": "Adiamor Jewelry Search - Gemstone Earrings",
    "description": "Adiamor Jewelry Search - Gemstone Earrings",
    "imageUrl": "",
    "keyword": "diamond,gemstone,earrings,jewelry,adiamor"
  },
  "/earrings/search/pearl-earrings": {
    "title": "Adiamor Jewelry Search - Pearl Earrings",
    "description": "Shop Adiamor's classic collection of pearl earrings. From lustrous saltwater Akoya pearls, affordable Freshwater pearls to luxurious White South Sea pearls, our earring selection has something for everyone.",
    "imageUrl": "",
    "keyword": "diamond,pearl,akoya,freshwater,south sea,white pearls,earrings,jewelry,adiamor"
  },
  "/earrings/search/pre-set-earrings": {
    "title": "Pre-set Diamond Earrings",
    "description": "Adiamor's preset diamond earrings showcase brilliant diamonds in gorgeous settings with styles to match every outfit and outing. Free Shipping and 30 Day Returns",
    "imageUrl": "",
    "keyword": "preset earrings, preset studs, diamond studs,earrings,adiamor"
  },
  "/necklaces/search/pre-set": {
    "title": "Pre-Set Diamond Pendant Search",
    "description": "Adiamor has a wide selection of pendants, it's hard to choose! Diamond, onyx, pearl, lockets, and so much more!",
    "imageUrl": "",
    "keyword": "diamond,necklaces,pendants,jewelry,adiamor"
  },
  "/necklaces/search/gemstone-necklaces": {
    "title": "Adiamor Jewelry Search - Gemstone Pendants",
    "description": "Shop Adiamor's exciting and colorful selection of precious and semi-precious gemstone pendants in gold, platinum and sterling silver.",
    "imageUrl": "",
    "keyword": "pearl,ruby,sapphire,onyx,birthstone,gemstone,necklaces,pendants,jewelry,adiamor"
  },
  "/bracelets/search": {
    "title": "Adiamor Jewelry Search - Diamond and Fashion Bracelets",
    "description": "Shop Adiamor's collection of bracelets for every occasion! Stackable bangles, cuff style bracelets, pearl bracelets and more, Adiamor offers something for every taste and style.",
    "imageUrl": "",
    "keyword": "fashion, stackable, bangle bracelets, cuff bracelets, pearl, diamond, bracelets, jewelry, adiamor"
  },
  "/bracelets/search/tennis": {
    "title": "Adiamor Jewelry Search - Diamond Tennis Bracelets",
    "description": "Shop Adiamor's must-have selection of diamond bracelets including classic diamond tennis bracelets, chic stackables, fashionable bangles and more!",
    "imageUrl": "",
    "keyword": "diamond, tennis, bracelets, stackable, bangle, cuff, jewelry, adiamor"
  },
  "/bracelets/search/gold-bracelets": {
    "title": "Search Gold and Steel Bracelets",
    "description": "Shop Adiamor's selection of fine 14k and 18k gold bracelets for women, and steel link bracelets for men.",
    "imageUrl": "",
    "keyword": "18k, 14k, karat, gold, white, yellow, bracelets, necklaces, earrings, wedding, rings, bands, accessories, jewelry, adiamor"
  },
  "/bracelets/search/pearl-bracelets": {
    "title": "Adiamor Jewelry Search - Pearl Bracelets",
    "description": "Shop Adiamor's selection of white Akoya and Freshwater pearl bracelets, which add instant elegance to any outfit.",
    "imageUrl": "",
    "keyword": "akoya, freshwater, white pearl, gemstone, bracelets, jewelry, adiamor"
  },
  "/wedding-rings/search": {
    "title": "Diamond Rings and Bands",
    "description": "Adiamor Wedding Rings - Adiamor offers a collection of timeless and gorgeous wedding rings that you'll treasure for a lifetime!",
    "imageUrl": "",
    "keyword": "wedding, rings, bands, metal, gold, platinum"
  },
  "/wedding-rings/search/fashion-rings": {
    "title": "Adiamor Jewelry Search - Fashion Rings",
    "description": "Shop Adiamor's selection of women's fine fashion rings. Our selection includes stackables, pave diamond rings, cocktail rings, and more!",
    "imageUrl": "",
    "keyword": "fashion rings, stackable rings, eternity, cocktail rings, women"
  },
  "/jewelry/search": {
    "title": "Jewelry Search - Rings, Pendants, Earrings, Bracelets",
    "description": "Click here for earrings with diamonds, sapphires & more from Adiamor with free shipping and a 30 day return policy.",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,white,yellow,diamond,bracelets,necklaces,earrings,wedding,rings,bands,accessories,jewelry,adiamor"
  },
  "/earrings/search/bold-gold-earring-collection": {
    "title": "Bold Gold Earrings",
    "description": "The Adiamor Bold Gold Earring Collection includes earrings in white, yellow and rose gold.",
    "imageUrl": "",
    "keyword": "bold gold jewelry collection, adiamor, bold gold earrings"
  },
  "/necklaces/search/bold-gold-pendant-collection": {
    "title": "Bold Gold Pendants and Necklaces",
    "description": "The Adiamor Bold Gold Pendant and Necklace Collection includes necklaces and pendants in white, yellow and rose gold.",
    "imageUrl": "",
    "keyword": "bold gold jewelry collection, adiamor, bold gold pendants, bold gold necklaces"
  },
  "/engagement-rings/search/bold-gold-ring-collection": {
    "title": "Bold Gold Rings and Bands",
    "description": "The Adiamor Bold Gold Ring Collection includes rings and wedding bands in white, yellow and rose gold.",
    "imageUrl": "",
    "keyword": "bold gold jewelry collection, adiamor, bold gold rings and bands"
  },
  "/bracelets/search/bold-gold-collection": {
    "title": "Bold Gold Bracelets",
    "description": "The Adiamor Bold Gold Bracelet Collection includes bracelets in white, yellow and rose gold.",
    "imageUrl": "",
    "keyword": "bold gold jewelry collection, adiamor, bold gold bracelets"
  },
  "/gifts/search/money-clips": {
    "title": "Adiamor Jewelry Search - Money Clips",
    "description": "Adiamor Jewelry Search - Money Clips",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,white,yellow,platinum,money clips,gifts,accessories,adiamor"
  },
  "/gifts/search/cuff-links": {
    "title": "Adiamor Jewelry Search - Cufflinks",
    "description": "Adiamor Jewelry Search - Cufflinks",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,white,yellow,platinum,cufflinks,gifts,accessories,adiamor"
  },
  "/gifts/search/key-rings": {
    "title": "Adiamor Jewelry Search - Key Rings",
    "description": "Adiamor Jewelry Search - Key Rings",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,white,yellow,platinum,key rings,gifts,accessories,adiamor"
  },
  "/bracelets/search/mens-bracelets": {
    "title": "Adiamor Jewelry Search - Men's Bracelets",
    "description": "Shop Adiamor's selection of masculine bracelets for him. Our selection includes black ceramic bracelets, tough as steel bracelets and durable titanium, as well as diamond bracelets he is sure to love.",
    "imageUrl": "",
    "keyword": "18k,14k,karat,mens, bracelets,steel links, titanium, ceramic, diamond,adiamor"
  },
  "/newsletter": {
    "title": "Newsletters and Special Offers",
    "description": "",
    "imageUrl": "",
    "keyword": ""
  },
  "/bracelets/search/fashion-bracelets": {
    "title": "Fashion Bracelets",
    "description": "Shop trendy fashion bracelets from Adiamor.",
    "imageUrl": "",
    "keyword": "18k,14k,karat,gold,white,yellow,platinum,fashion,gemstone,pearl,diamond,bracelets,jewelry,adiamor"
  },

  // Education Pages
  "/education/affinity-collection": {
    "title": "Education - The Affinity Collection Diamonds",
    "description": "Adiamor's Affinity Collection Diamonds are a specially selected group of our most breathtaking diamonds with the highest quality cut, polish, and symmetry.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/diamond-color": {
    "title": "Education - Diamond Color",
    "description": "A diamond's color has a great impact on its value.  Learn all about diamond color and what it all means at Adiamor.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/gift-guide": {
    "title": "Education - Gift Guide",
    "description": "Surprise that special someone with a gift of fine jewelry from Adiamor, our Gift Guide cab help you choose the perfect gift for the one that you love.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/pearl-education": {
    "title": "Education - Pearl Jewelry",
    "description": "Learn everything you need to know about salt water pearls and fresh water pearls in the Adiamor pearl education guide!",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/diamond-shape": {
    "title": "Education - Diamond Shape",
    "description": "Diamond shapes including round, princess, marquise, emerald, pear, oval, heart, radiant, Asscher, and cushion allow you to tailor jewelry to your liking.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/establishing-your-budget": {
    "title": "Education - Establishing Your Budget",
    "description": "Knowing how much to spend is an important factor in choosing the right engagement ring.  Find the perfect diamond and setting to accommodate to your budget.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/carat-weight": {
    "title": "Education - Carat Weight",
    "description": "Carat weight indicates the size of a diamond.  Learn all about weight and how it makes a difference in a setting.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/earring-guide": {
    "title": "Education - Earring Guide",
    "description": "For those who need a little extra guidance, take a peek at our earring guide to learn more about studs, hoops, and dangle earrings!",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/engagement-ring-add-ons": {
    "title": "Engagement Ring Add Ons",
    "description": "Hidden Halo At Adiamor we call a Hidden Halo, adding diamonds to the basket. This refers to a halo that is not seen from a bird’s eye view. A Hidden Halo is usually underneath the center stone and can only be seen from the side of the ring. This provides ...",
    "imageUrl": "",
    "keyword": "add ons, custom engagement rings, customizations, custom rings, diamond basket, diamond prongs, engagement ring add ons, engagement rings, hidden halo"
  },
  "/education/financing-insurance": {
    "title": "Education - Financing and Insurance",
    "description": "Learn about the multiple financing options Adiamor has available to make your engagement ring or jewelry easier to afford without the need to pay all at once.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/diamond-cut": {
    "title": "Education - Diamond Cut",
    "description": "A diamond's cut is considered to be the most important of the four Cs. This diamond education guide from Adiamor will help you learn all about a diamond's cut.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/proposal-tips": {
    "title": "Education - Proposal Tips",
    "description": "Proposing is a big deal!  Make sure you have all of your bases covered with proposal tips from Adiamor!",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/fine-jewelry-education-guide": {
    "title": "Fine Jewelry Education Guide",
    "description": "With so many factors to consider when buying fine jewelry, it's easy to get confused. Look at our fine jewelry guide to better educate yourself before you buy.",
    "imageUrl": "",
    "keyword": "jewelry education, jewelry information, adiamor"
  },
  "/education/diamond-care": {
    "title": "Education - Diamond Care",
    "description": "Pointers on how to keep your diamond ring looking as great as it did the day you received it from Adiamor.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/diamond-certification": {
    "title": "Education - Diamond Certification",
    "description": "Learn why it is important to buy a certified diamond from a reputable grading lab like GIA or AGS and information about the certification details and types.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/diamond-clarity": {
    "title": "Education - Diamond Clarity",
    "description": "Most diamonds have unique clarity characteristics, much like a fingerprint. These distinguishing characteristics can be classified as inclusions and blemishes.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/ring-anatomy": {
    "title": "Education - Ring Anatomy",
    "description": "It is helpful to learn about ring anatomy to better understand the different options you have and to make sure you are able to communicate about your ring.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/lab-grown-diamonds": {
    "title": "Lab Grown Diamonds",
    "description": "What is a lab grown diamond? A lab grown diamond is a diamond that was chemically 'grown' in a laboratory setting. These gemstones differ fr",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/jeweler-guide": {
    "title": "Education  - Jeweler Guide",
    "description": "There are many factors to consider when choosing a jeweler.  Our jeweler guide can help you make the best decision!",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/pendant-guide": {
    "title": "Education - Pendant Guide",
    "description": "There are so many pendants to choose from, how do you decide?  Our pendant guide can help you make the best decision!",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/diamond-education": {
    "title": "Diamond Education Guide",
    "description": "This diamond education guide contains all the info you need to search through our diamond database with confidence you will find a diamond that's right for you.",
    "imageUrl": "",
    "keyword": "diamond education,diamond education guide"
  },
  "/education/metal-education": {
    "title": "Metal Education | Gold and Platinum",
    "description": "From Gold to Platinum, learn about these precious metals characteristics, terms, and how to keep them looking their best !",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/gemstone-education": {
    "title": "Education - Gemstones",
    "description": "Shop with confidence!   Learn the five basic characteristics of gemstones: color, clarity, size, enhancements, and care.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/education/find-your-ring-size": {
    "title": "Education - Find Your Ring Size and Ring Sizing Guide",
    "description": "Find your ring size using the Adiamor ring sizing guide, get educated on international ring sizes, and learn more about free ring sizing and resizing.",
    "imageUrl": "",
    "keyword": "how to find your ring size at home, how to find your ring size, ring size guide"
  },
  "/education/engagement-ring-guide": {
    "title": "Engagement Ring Guide",
    "description": "Buying an engagement ring has never been easier using this Adiamor engagement ring guide. Hand crafted to give you peace of mind for the many years to come.",
    "imageUrl": "",
    "keyword": "engagement ring guide, engagement ring buying guide, engagement ring styles guide, engagement ring price guide, guide to engagement rings, adiamor"
  },
  "/policies/return-policy": {
    "title": "Easy 30 Day Returns and Full Money Back Guarantee",
    "description": "We at Adiamor believe in your complete satisfaction and will gladly refund, or exchange unworn items sent back in our facility within 30 days of shipping.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/policies/shipping-policy": {
    "title": "Free Shipping Worldwide",
    "description": "Adiamor is pleased to offer our customers Free FedEx Priority Overnight Shipping on all domestic shipments over $250 and Free FedEx International Priority.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/sitemap.xml": {
    "title": "Sitemap",
    "description": "The Adiamor site map will help you find the engagement ring, loose diamond, or diamond jewelry you are looking for or you can contact a representatives.",
    "imageUrl": "",
    "keyword": "adiamor site map, adiamor"
  },
  "/policies/engraving": {
    "title": "Ring Engraving",
    "description": "Engraving - ring engraving for engagement ring messages created by the jewelers of Adiamor fine jewelry. Click to order your custom engraved engagement ring.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/policies/privacy-policy": {
    "title": "Privacy Policy",
    "description": "Adiamor does not store any of your personal information on our site. We do not sell, trade or rent your personal information to any outside parties, period.",
    "imageUrl": "",
    "keyword": "adiamor secure,adiamor safe,adiamor secure ordering,adiamor privacy,adiamor policies,adiamor privacy policy,secure ordering,diamond engagement rings,diamonds,engagement rings,engagement ring,diamond engagement ring,diamond rings,diamond ring,loose diamonds,certified loose diamond"
  },
  "/services/payment-options": {
    "title": "Flexible Payment Options",
    "description": "For your convenience, Adiamor accepts payments from Visa, MasterCard, American Express, Discover, PayPal, Bank Wire Transfer, and multiple financing options.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/policies/warranty": {
    "title": "Free Lifetime Manufacturing Warranty",
    "description": "Adiamor believes in your complete customer satisfaction and piece of mind, therefore, your engagement ring purchase is backed by our lifetime warranty.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/policies/diamond-price-match": {
    "title": "Diamond Price Match Policy",
    "description": "Adiamor provides the highest quality diamond jewelry at the lowest possible prices. We extend a diamond price match policy to all of our valued customers.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  // "/policies/diamond-upgrade-program": {
  //   "title": "Diamond Upgrade Policy",
  //   "description": "If you want to buy a certified diamond and then upgrade it later, you will want to learn about the Adiamor diamond upgrade program and policy details.",
  //   "imageUrl": "",
  //   "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  // },
  "/policies/terms-and-conditions": {
    "title": "Terms and Conditions",
    "description": "View our terms and conditions to get information about our policies regarding special orders, shipping and handing, returns, sales tax, ring sizing, and more.",
    "imageUrl": "",
    "keyword": "adiamor terms and conditions, adiamor"
  },
  "/contact-adiamor": {
    "title": "Contact Us",
    "description": "At Adiamor, we make every effort to ensure a comfortable and enjoyable shopping experience. Please contact us if you have any comments or questions.",
    "imageUrl": "",
    "keyword": "adiamor diamonds,contact adiamor,adiamor phone number,adiamor fax number,adiamor email,adiamor facebook,adiamor pinterest,adiamor twitter,adiamor faq,diamond engagement rings,diamonds,engagement rings,engagement ring,diamond engagement ring,diamond rings,diamond ring,loose diamonds,certified loose diamond"
  },
  "/customer-service": {
    "title": "Customer Service",
    "description": "Learn more about our company and the services we provide or review our policies and prodecures in our customer help center.",
    "imageUrl": "",
    "keyword": "free shipping,adiamor policies,adiamor shipping,shipping policy,free fedex shipping,adiamor return policy,returns policy,conflict free policy,adiamor conflict free"
  },
  "/policies/gift-packaging": {
    "title": "Luxury Gift Packaging",
    "description": "Each diamond engagement ring or wedding band arrives in our luxurious rosewood jewelry box, perfect for presentation and proposals.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/services/after-you-order": {
    "title": "After You Order",
    "description": "With over 30 years of experience in with diamonds and fine jewelry, we will exceed your expectations both during and after your purchase.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/policies/conflict-free-policy": {
    "title": "Conflict Free Policy",
    "description": "Conflict Free Diamonds -  All diamonds provided by Adiamor are obtained through highly legitimate sources, and are warrantied to be non conflict diamonds.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/policies/financing-and-insurance": {
    "title": "Education - Financing and Insurance",
    "description": "Learn about the multiple financing options Adiamor has available to make your engagement ring or jewelry easier to afford without the need to pay all at once.Adiamor offers financing and insurance for your diamond engagement ring or wedding band. We also offer a 30 day money back guarantee.",
    "imageUrl": "",
    "keyword": "System.Collections.Generic.List`1[ButterCMS.Models.Tag]"
  },
  "/jewelry/search/pearl-jewelry": {
    "title": "Pearl Necklaces, Pendants, Bracelets and Earrings",
    "description": "Adiamor Jewelry Search - Pearl Bracelets, Earrings, Necklaces, Wedding Rings and Accessories",
    "imageUrl": "",
    "keyword": "pearl,bracelets,necklaces,earrings,wedding,rings,bands,accessories,jewelry,adiamor"
  },
  '/jewelry/search/diamond-jewelry': {
    "title": "Diamond Bracelets, Earrings, and Pendants",
    "description": "18k, 14k karat diamond earrings from Adiamor. Click here to for our selection of earrings available with diamonds, sapphires, topaz & more with free shipping. ",
    "imageUrl": "",
    "keyword": "gemstone,ruby,onyx,sapphire,bracelets,necklaces,earrings,wedding,rings,bands,accessories,jewelry,adiamor"
  },
  '/jewelry/search/sale': {
    "title": "Jewelry Search On Sale Jewelry",
    "description": "Shop the Adiamor Sale Page! Choose from precious and semi-precious gemstone pendants and earrings for the perfect gift.",
    "imageUrl": "",
    "keyword": "earrings,pendants,best price,on sale,clearance,birthstone,jewelry,adiamor"
  },
}

const staticRouteLandingData = Object.values(STATIC_ROUTES).reduce((metaMap, route) => {
  const normalizedRoute = routeKey(route);

  if (landingData[normalizedRoute]) {
    metaMap[normalizedRoute] = landingData[normalizedRoute];
  }

  return metaMap;
}, {});

export default {
  CART_META:{
    title: "Adiamor - Shopping Bag",
    meta: [{ hid: "robots", name: "robots", content: "noindex" }],
  },
  ...landingData,
  ...staticRouteLandingData,
};
