<template>
    <div>
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/engagement-rings.webp?updatedAt=1747484204184`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            :hrefLink="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
            alt="Diamond Engagement Rings"
        >
            <h1
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">
                Diamond Engagement Rings</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Shop our unique selection of hand-crafted diamond ring settings to design your custom engagement ring.</p>
            <div class="flex justify-start gap-4">
                <NuxtLink
                    :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 font-normal md:text-sm px-4 py-3 uppercase font-gill-sans tracking-[0.125rem] bg-primary text-white hover:bg-primary/90"
                    aria-label="Shop engagement rings"
                    @click="$bus.emit('aria-announce','Navigating to Engagement Rings search page')"
                >
                    Shop Engagement Rings
                </NuxtLink>
            </div>
        </Banner>

        <!-- Shop by Shape -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="engagement-ring-style-heading">
            <div class="flex items-start justify-between">
                <div>
                    <h2 id="engagement-ring-style-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Engagement Ring Styles</h2>
                    <p class="mt-1 text-sm">Discover our stunning selection of diamonds, organized by shape, to help you
                        find the ideal gem for your engagement ring.</p>
                </div>
            </div>

            <ul class="mt-6 grid grid-cols-4 gap-1 sm:flex flex-wrap justify-between text-center">
                <li v-for="(ring, index) in rings" :key="index">
                    <NuxtLink
                        v-if="ring.code"
                        :to="hyphenatedRoutes(`${STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH}/${ring.code}/`)"
                        class="space-y-2.5 group focus:outline-none focus:ring-2 focus:ring-primary inline-block"
                        :aria-label="`Shop ${ring.title} engagement rings`"
                        @click="$bus.emit('aria-announce', `Navigating to ${ring.title} engagement rings`)"

                    >
                        <MediaImage :src="ring.image" alt="" width="100" height="100" className="w-16 lg:w-auto m-auto" aria-hidden="true" />
                        <h2 class="font-normal text-xs sm:text-sm lg:text-base !tracking-widest-lg group-hover:text-primary" aria-hidden="true">{{ ring.title }}</h2>
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <!-- Design Your Own Engagement Ring -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16">
            <div class="relative h-60 md:h-[398px]">
                <div
                    class="absolute m-4 inset-0 md:inset-y-0 md:left-auto mx-auto md:right-0 bg-white/50 z-10 flex items-center justify-center lg:justify-start lg:w-5/12">
                    <div class="max-w-sm xl:max-w-md lg:w-full px-4 lg:space-y-7 text-center lg:text-left">
                        <h2 class="text-lg md:text-xl lg:text-3xl font-normal">Design Your Own Engagement Ring</h2>
                        <p class="mt-1 text-sm md:text-lg">Select your perfect engagement ring setting and pair it with
                            the center diamond of your choice to create your custom ring.</p>
                        <Button type="button" class="mt-4 md:!py-2 !px-8 md:!text-lg font-medium mx-auto lg:ml-0 focus:outline-none focus:ring-2 focus:ring-primary"
                            @click="goToDesign">Design
                            Now</Button>
                    </div>
                </div>
                <picture>
                    <source media="(min-width: 768px)"
                        srcset="https://cdn.adiamor.com/landing-pages/heros/design_your_engagement_ring_large.webp?tr=q-80&updatedAt=1747991457366">
                    <source media="(max-width: 767px)"
                        srcset="https://cdn.adiamor.com/landing-pages/heros/design_your_engagement_ring_small.jpg?tr=q-80&updatedAt=1747991631936">
                    <nuxt-img provider="cdn" src="/landing-pages/heros/design_your_engagement_ring_large.webp?tr=q-80&updatedAt=1747991457366"
                        class="w-full h-full object-cover" alt="Design Your Own Engagement Ring"/>
                </picture>
            </div>
        </section>

        <!-- Shop by Shape -->
        <ShopDiamondByShape />

        <!-- Hidden Halo Engagement Rings -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <!-- <header class="col-span-full max-w-3xl mx-auto text-center">
                <h2 class="text-lg md:text-xl lg:text-3xl font-normal">Hidden Halo Engagement Rings</h2>
                <p class="mt-1 text-sm lg:text-lg">At Adiamor you can add diamonds to any basket setting. When done this
                    way, it creates a dainty hidden halo that doesn't take away from the center stone, but adds extra
                    sparkle when viewing the ring from any other angle.</p>
            </header> -->
            <div class="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 sm:grid-flow-col gap-2 sm:gap-4 lg:gap-8">
                <div class="relative flex flex-col cursor-pointer">
                    <NuxtLink :to="{ path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_EMERALD, query: {} }" @click="$bus.emit('aria-announce', 'Navigating to Emerald Cut Diamond Rings')"
                        aria-label="Emerald Cut Engagement Rings" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/er-emerald-rings-box.jpg?updatedAt=1747994241225" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-xs lg:text-xl">Emerald Cut Diamond Rings</h2>
                    </div>
                </div>
                <div class="relative flex flex-col cursor-pointer">
                    <NuxtLink :to="{ path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_CUSHION, query: {} }" @click="$bus.emit('aria-announce', 'Navigating to Cushion Cut Diamond Rings')"
                    aria-label="Cushion Cut Engagement Rings" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/er-cushion-rings-box.jpg?updatedAt=1747994241948" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-xs lg:text-xl">Cushion Cut Diamond Rings</h2>
                    </div>
                </div>
                <div class="relative flex flex-col cursor-pointer">
                    <NuxtLink :to="{ path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_OVAL, query: {} }" @click="$bus.emit('aria-announce', 'Navigating to Oval Cut Diamond Rings')"
                    aria-label="Oval Cut Engagement Rings" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/er-oval-rings-box.jpg?updatedAt=1747994241121" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-xs lg:text-xl">Oval Cut Diamond Rings</h2>
                    </div>
                </div>
                <div class="relative flex flex-col cursor-pointer">
                    <NuxtLink :to="{ path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_RADIANT, query: {} }" @click="$bus.emit('aria-announce', 'Navigating to Radiant Cut Diamond Rings')"
                        aria-label="Radiant Cut Engagement Rings" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/er-radiant-rings-box.jpg?updatedAt=1747994241943" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-xs lg:text-xl">Radiant Cut Diamond Rings</h2>
                    </div>
                </div>
                <div class="relative col-end-auto col-span-2 sm:row-span-2 flex flex-col">
                    <NuxtLink :to="{ path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HIDDEN_HALO, query: {} }" @click="$bus.emit('aria-announce', 'Navigating to Hidden Halo Engagement Rings')"
                        aria-label="Hidden Halo Engagement Rings" class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/er-hidden-halo-rings-box.jpg?updatedAt=1747988761099" alt=""/>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-white/70 backdrop-blur p-2 text-center" aria-hidden="true">
                        <h2 class="font-normal text-sm lg:text-xl">Hidden Halo Engagement Rings</h2>
                        <p class="mt-1 text-xs sm:text-base line-clamp-2 sm:line-clamp-none">At Adiamor you can add diamonds to any basket setting. When done this way, it creates a dainty hidden halo that doesn't take away from the center stone, but adds extra sparkle when viewing the ring from any other angle.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Thin Band Engagement Rings -->
        <section class="pt-8 lg:pt-16">
            <RingMetal />
        </section>

        <!-- Top Engagement Rings Styles -->
        <div class="pt-8 lg:pt-16 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 space-y-5 sm:space-y-9">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                <div class="relative text-center">
                    <NuxtLink :to="STATIC_ROUTES.TOP_ENGAGEMENT_RING_STYLES" aria-label="Top Engagement Rings Styles"
                        @click="$bus.emit('aria-announce', 'Navigating to Top Engagement Rings Styles')"
                        class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1 aspect-square" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/thin-band-hero.jpg?updatedAt=1746137297332" alt=""/>
                        <div class="bg-white/70 backdrop-blur p-2 absolute inset-x-0 bottom-0">
                            <h2 class="font-normal text-sm sm:text-lg md:text-xl">Top Engagement Rings Styles</h2>
                            <p class="mt-1 text-xs sm:text-base line-clamp-2 sm:line-clamp-none">Adiamor's best engagement
                                rings styles make it easy to
                                design the perfect ring for you. From simple solitaires to halo and 3 stone rings, you can't
                                go wrong with these Adiamor in house designs.</p>
                        </div>
                    </div>
                </div>
                <div class="relative text-center">
                    <NuxtLink :to="STATIC_ROUTES.RECENTLY_PURCHASED_RINGS" aria-label="Recently Purchased Engagement Rings"
                        @click="$bus.emit('aria-announce', 'Navigating to Recently Purchased Engagement Rings')"
                        class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1 aspect-square" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/recently-purchased-engagement-rings-box.jpg?updatedAt=1747992364900" alt=""/>
                        <div class="bg-white/70 backdrop-blur p-2 absolute inset-x-0 bottom-0">
                            <h2 class="font-normal text-sm sm:text-lg md:text-xl">Recently Purchased Engagement Rings</h2>
                            <p class="mt-1 text-xs sm:text-base line-clamp-2 sm:line-clamp-none">Be inspired by the rings
                                that our customers have recently
                                purchased.</p>
                        </div>
                    </div>
                </div>
                <div class="relative text-center">
                    <NuxtLink :to="STATIC_ROUTES.CUSTOM_DESIGN_ENGAGEMENT_RINGS" aria-label="Design Your Custom Engagement Ring"
                        @click="$bus.emit('aria-announce', 'Navigating to Design Your Custom Engagement Ring')"
                        class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full grow flex-1 aspect-square" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/design-your-custom-engagement-rings.jpg?updatedAt=1747992364680" alt=""/>
                        <div class="bg-white/70 backdrop-blur p-2 absolute inset-x-0 bottom-0">
                            <h2 class="font-normal text-sm sm:text-lg md:text-xl">Design Your Custom Engagement Ring</h2>
                            <p class="mt-1 text-xs sm:text-base line-clamp-2 sm:line-clamp-none">Adiamor specializes in
                                custom design engagement rings and
                                wedding bands. Our design experts are here to guide you step-by-step through the process of
                                designing a ring online. Start by selecting one of our in-house design engagement ring
                                settings and customize the band width, add diamonds, take away diamonds, the options are
                                endless. Drop in an inspiration photo along with center diamond information, metal choice,
                                ring size and any other specifications, our ring designer will guide you through the custom
                                engagement ring process.</p>
                        </div>
                    </div>
                </div>
                <div class="relative text-center">
                    <NuxtLink :to="STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_GUIDE" aria-label="Engagement Ring Guide"
                        @click="$bus.emit('aria-announce', 'Navigating to Engagement Ring Guide page')"
                        class="absolute inset-0 z-10"></NuxtLink>
                    <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full" aria-hidden="true">
                        <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                            src="/landing-pages/heros/engagement-ring-guide.jpg?updatedAt=1747992364951" alt=""/>
                        <div class="bg-white/70 backdrop-blur p-2 absolute inset-x-0 bottom-0">
                            <h2 class="font-normal text-sm sm:text-lg md:text-xl">Engagement Ring Guide</h2>
                            <p class="mt-1 text-xs sm:text-base line-clamp-2 sm:line-clamp-none">Our diamond engagement ring
                                guide is designed to assist you
                                step by step through the buying process.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shop engagement ring by category -->
        <section class="pt-8 lg:pt-16 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 space-y-5 sm:space-y-9" aria-labelledby="engagement-style-heading">
            <header class="col-span-full max-w-3xl mx-auto text-center">
                <h2 id="engagement-style-heading" class="text-lg md:text-xl lg:text-3xl font-normal">Shop Engagement Rings By Category</h2>
            </header>
            <div class="grid grid-cols-1 divide-y divide-gray-200">
                <Accordion v-for="(item, index) in engagementRingCategory" :key="index" :title="item.title"
                    :isOpen="openIndex === index" @toggle="toggleAccordion(index)">
                    <ul
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 border-t border-gray-200 text-sm">
                        <li v-for="(item, index) in item.items" :key="index">
                            <NuxtLink :to="item.link" class="text-primary hover:underline">{{ item.text }}</NuxtLink>
                        </li>
                    </ul>
                </Accordion>
            </div>
        </section>

        <!-- Shop Our Socials -->
        <ShopSocials />

        <!-- Product Reviews -->
        <section class="pt-6 md:pb-8" aria-label="Product Reviews">
            <ReviewBottom>
                <ClientOnly><div class="yotpo yotpo-shoppers-say yotpo-size-6" data-product-id="R2981" data-yotpo-element-id="1">
                </div></ClientOnly>
            </ReviewBottom>
        </section>

        <!-- Your Design it, Web build it -->
        <BuildVideo />

        <!-- "Frequently Asked Questions -->
        <Faq :faqItems="faqItems" />
    </div>
</template>

<script>
import BuildVideo from '~/components/common/buildVideo.vue';
import Accordion from '~/components/ui/Accordion.vue';
import Button from '~/components/common/Button.vue';
import ShopDiamondByShape from '~/components/carousel/ShopDiamondByShape.vue';
import RingMetal from '~/components/landing/RingMetal.vue';
import ShopSocials from '~/components/common/ShopSocials.vue';
import ReviewBottom from '~/components/landing/ReviewBottom.vue';
import Faq from '~/components/landing/Faq.vue';
import Banner from '~/components/ui/Banner.vue';
import MediaImage from '~/components/common/MediaImage.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name: "DiamondPage",
    components: {
        BuildVideo,
        Accordion,
        Button,
        ShopDiamondByShape,
        RingMetal,
        ShopSocials,
        ReviewBottom,
        Faq,
        Banner,
        MediaImage
    },
    data() {
        return {
            STATIC_ROUTES,
            openIndex: null,
            rings: [
                {
                    title: 'Solitaire',
                    image: assetUrl('~/assets/images/rings/solitaire.webp'),
                    code: "solitaire",
                    alt: "Solitaire Diamond Ring"
                },
                {
                    title: 'Halo',
                    image: assetUrl('~/assets/images/rings/halo.webp'),
                    code: "halo",
                    alt: "Halo Diamond Ring"
                },
                {
                    title: 'Pavé',
                    image: assetUrl('~/assets/images/rings/pave.webp'),
                    code: "pave",
                    alt: "Pavé Diamond Ring"
                },
                {
                    title: 'Three Stone',
                    image: assetUrl('~/assets/images/rings/three-stone.webp'),
                    code: "three_stone",
                    alt: "Three Stone Diamond Ring"
                },
                {
                    title: 'Modern',
                    image: assetUrl('~/assets/images/rings/modern.webp'),
                    code: "modern",
                    alt: "Modern Diamond Ring"
                },
                {
                    title: 'Split Shank',
                    image: assetUrl('~/assets/images/rings/split-shank.webp'),
                    code: "splitshank",
                    alt: "Split Shank Diamond Ring"
                },
                {
                    title: 'Vintage',
                    image: assetUrl('~/assets/images/rings/vintage.webp'),
                    code: "vintage",
                    alt: "Vintage Diamond Ring"
                },
                {
                    title: 'Gemstone',
                    image: assetUrl('~/assets/images/rings/gemstone.webp'),
                    code: "gemstone",
                    alt: "Gemstone Diamond Ring"
                }
            ],
            faqItems: [
                {
                    question: "How do I design a diamond engagement ring?",
                    answer: `The first step to designing the perfect diamond engagement ring is establishing your budget. Your budget should include the engagement ring setting, center diamond, tax, and insurance. Use inspiration photos to select a setting similar to your ideal ring. You can customize any engagement ring on our site, including band width, prongs, and diamonds. For special customizations, contact our design team.`,
                    link: STATIC_ROUTES.DESIGN_RING,
                    linkText: "Design Your Own Engagement Ring"
                },
                {
                    question: "Which should be selected first, the engagement ring setting or the loose diamond?",
                    answer: `We recommend having an idea of the engagement ring style before selecting the diamond to better determine your budget. Some styles require specific diamond shapes or sizes. Our settings accommodate any size and shape.`,
                    link: "https://www.adiamor.com/blog/style-and-fashion/best-diamond-shapes-for-my-engagement-ring",
                    linkText: "Learn more"
                },
                {
                    question: "What happens after an order for an engagement ring is placed?",
                    answer: `Once an order is placed, we inspect the selected diamond, confirm order details, and begin manufacturing the ring. Most rings take 7-10 days to complete and are shipped upon completion.`,
                    link: STATIC_ROUTES.ENGAGEMENT_RINGS,
                    linkText: "Shop Engagement Rings"
                },
                {
                    question: "What is a good size diamond for an engagement ring?",
                    answer: `The best size diamond is one within your budget. The average center diamond size sold last year was 1.2 carats. Consider cut, clarity, color, and shape in addition to carat weight.`,
                    link: "https://www.adiamor.com/blog/education/loose-diamond-vendors-versus-ring-manufacturers",
                    linkText: "Learn More"
                },
                {
                    question: "Are Adiamor Diamonds Real?",
                    answer: `Yes, we specialize in selling natural GIA-certified loose diamonds. We also offer lab-grown diamonds, which have the same physical and chemical properties as natural diamonds.`,
                    link: STATIC_ROUTES.DESIGN_RING,
                    linkText: "Design Your Ring"
                },
                {
                    question: "Why are emerald cut diamond engagement rings more expensive?",
                    answer: `Emerald cut diamonds are not inherently more expensive, but their clarity makes inclusions more visible, requiring higher clarity grades, which can increase costs.`,
                    link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_EMERALD,
                    linkText: "Shop Emerald Engagement Rings"
                },
                {
                    question: "What is an elongated cushion cut diamond ring?",
                    answer: `Elongated cushion cut diamonds have a rectangular shape. A length-to-width ratio above 1.20 makes the diamond appear longer, while above 1.35 is considered long.`,
                    link: STATIC_ROUTES.EDUCATION_DIAMOND_SHAPE,
                    linkText: "Learn More"
                },
                {
                    question: "Are cushion cut engagement rings cheaper than others?",
                    answer: `Yes, cushion cut diamonds are typically less expensive than round diamonds of the same carat weight, but they may appear smaller due to their shape.`,
                    link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_CUSHION,
                    linkText: "Buy Cushion Engagement Ring"
                },
                {
                    question: "What is a halo ring?",
                    answer: `A halo ring features small diamonds set around the center diamond to enhance its appearance. At Adiamor, all halo rings are custom-made for a perfect fit.`,
                    link: STATIC_ROUTES.FRENCH_CUT_HALO,
                    linkText: "Buy Halo Rings"
                },
                {
                    question: "What is a flush set engagement ring setting?",
                    answer: `A flush set engagement ring allows a wedding band to sit flush next to it. Some settings require modifications to achieve this design.`,
                    link: STATIC_ROUTES.EDUCATION_RING_ANATOMY,
                    linkText: "Learn More"
                },
                {
                    question: "Can I purchase an Engagement Ring setting on its own?",
                    answer: `Yes, our settings can be purchased separately. You will need to provide details about the center stone, including type, shape, carat weight, and measurements.`,
                    link: STATIC_ROUTES.ENGAGEMENT_RINGS,
                    linkText: "Shop Engagement Ring Settings"
                },
                {
                    question: "Why are Adiamor diamonds so cheap?",
                    answer: `Adiamor operates as a wholesale jewelry manufacturer and sells directly to customers online, allowing us to offer premium diamonds at competitive prices.`,
                    link: STATIC_ROUTES.DIAMONDS_SEARCH,
                    linkText: "Shop Diamonds"
                },
                {
                    question: "What is the difference between platinum and white gold?",
                    answer: `Platinum is hypoallergenic, purer, and does not require rhodium plating, while white gold is more affordable and requires periodic plating to maintain its color.`,
                    link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH,
                    linkText: "Shop White Metal Rings"
                },
                {
                    question: "What is a peekaboo halo?",
                    answer: `A peekaboo halo is row of diamonds following the shape of the centerstone that is slightly visible from the top view of the ring. It is placed at an angle under the girdle of the main diamond, making only edge of the diamonds visible from the top and side view. A peekaboo halo increases the appearance of size of the center diamond.`,
                    link: STATIC_ROUTES.EDUCATION_ENGAGEMENT_RING_ADD_ONS,
                    linkText: "Common Customizations"
                }
            ],
            engagementRingCategory: [
                {
                    title: 'Engagement Rings By Metal',

                    items: [
                        { text: 'White Gold Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_WHITE_GOLD },
                        { text: 'Yellow Gold Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_YELLOW_GOLD },
                        { text: 'Platinum Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PLATINUM },
                        { text: 'Rose Gold Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ROSE_GOLD }
                    ]
                },
                {
                    title: 'Engagement Rings By Shape',

                    items: [
                        { text: 'Round Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ROUND },
                        { text: 'Princess Cut Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRINCESS },
                        { text: 'Emerald Cut Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_EMERALD },
                        { text: 'Marquise Cut Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_MARQUISE },
                        { text: 'Heart Shape Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HEART },
                        { text: 'Pear Shape Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PEAR },
                        { text: 'Radiant Cut Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_RADIANT },
                        { text: 'Oval Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_OVAL },
                        { text: 'Asscher Cut Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_ASSCHER },
                        { text: 'Cushion Cut Diamond Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_CUSHION },
                    ]
                },
                {
                    title: 'Engagement Rings By Style',

                    items: [
                        { text: 'Solitaire Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_SOLITAIRE },
                        { text: 'Modern Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_MODERN },
                        { text: 'Pavé Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PAVE },
                        { text: 'Split Shank Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_SPLITSHANK },
                        { text: 'Halo Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HALO },
                        { text: 'Gemstone Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_GEMSTONE },
                        { text: 'Three Stone Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_THREE_STONE },
                        { text: 'Vintage Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_VINTAGE },
                        // { text: 'Matching Bridal Sets', link: '/engagement-rings/search/matched-set' },
                        { text: 'Pre-Set Engagement Rings', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PRE_SET }
                    ]
                },
                {
                    title: 'Engagement Rings By Collection',

                    items: [
                        { text: 'Hidden Halo Collection', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_HIDDEN_HALO },
                        { text: 'Thin Band Collection', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_THIN_BAND },
                        { text: 'French Cut Collection', link: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_FRENCH_CUT_RING_COLLECTION }
                    ]
                }
            ],
        };
    },
    mounted() {
        this.$bus.emit(
            "aria-announce",
            "Diamond Engagement Rings page loaded. Browse styles or design your own ring."
        );
    },
    methods: {
        goToDesign() {
            this.$bus.emit("aria-announce", "Navigating to Design Your Own Engagement Ring Page");
            this.$router.push(STATIC_ROUTES.DESIGN_RING);
        },
        toggleAccordion(index) {
            // Toggle the current accordion, close others
            this.openIndex = this.openIndex === index ? null : index;
        },
        hyphenatedRoutes(url) {
			return url.toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9/-]+/g, '').replace(/\/+/g, '/').replace(/^-+|-+$/g, '');
		},
    },
};
</script>
