<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/banner_topgifts.jpg?updatedAt=1747974774838`"
            :contentBackgroundColor="`bg-black/70 sm:bg-transparent`"
            :contentTextColor="`text-white sm:text-gray-black`"
			alt="Top Gift Ideas"
			>
            <h1
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">
                Top Gift Ideas</h1>
            <p class="mb-8 text-sm md:text-lg lg:text-xl">Browse our most Popular gift and find that special
                Something.</p>
            <div class="flex gap-4">
                <NuxtLink
                    :to="STATIC_ROUTES.JEWELRY"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary text-white font-normal sm:text-sm px-8 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90"
                    aria-label="Search all jewelry products"
                    @click="$bus.emit('aria-announce','Navigating to all jewelry products page')"
                >
                    Search All Jewelry
                </NuxtLink>
            </div>
        </Banner>

        <!-- Explore Gift Ideas -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-4 lg:space-y-7">
            <div class="grid grid-cols-1 gap-2 sm:gap-4 lg:gap-x-8">
                <FeaturedProduct :products="products.slice(0, 2)" />
            </div>
        </section>

        <!-- Bold Gold Collection -->
        <div class="pt-8 lg:pt-16">
            <div>
                <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-8">
                        <div class="relative flex flex-col border border-gray-200">
                            <NuxtLink
                                :to="STATIC_ROUTES.FRENCH_CUT_HALO"
                                class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Navigate to French Cut Collection"
                                @click="$bus.emit('aria-announce','Navigating to French Cut Collection')"
                            ></NuxtLink>
                            <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full aspect-square">
                                <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                                    src="/landing-pages/gift-french-cut-collection.webp?updatedAt=1747975145455"
                                    alt="Bold Gold Collection"/>
                            </div>
                            <div class="p-4 absolute backdrop-blur-sm bg-black/10 inset-x-0 bottom-0 flex flex-col">
                                <h2 class="font-normal text-sm sm:text-lg lg:text-xl xl:text-2xl">French Cut Collection
                                </h2>
                                <NuxtLink
                                    :to="STATIC_ROUTES.FRENCH_CUT_HALO"
                                    class="underline text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Shop French Cut Collection"
                                    @click="$bus.emit('aria-announce','Shopping French Cut Collection')"
                                >
                                Shop Now
                            </NuxtLink>
                            </div>
                        </div>

                        <div class="relative flex flex-col border border-gray-200">
                            <NuxtLink
                                :to="STATIC_ROUTES.BOLD_GOLD"
                                class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Navigate to Bold Gold Collection"
                                @click="$bus.emit('aria-announce','Navigating to Bold Gold Collection')"
                            ></NuxtLink>
                            <div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full aspect-square">
                                <nuxt-img provider="cdn" class="w-full h-full object-cover object-top"
                                    src="/landing-pages/Bold%20Gold%20Collection/bold-gold-bracelets.webp?updatedAt=1747970012873"
                                    alt="Bold Gold Collection"/>
                            </div>
                            <div
                                class="p-4 absolute backdrop-blur-sm bg-white/60 inset-x-0 bottom-0 flex flex-col">
                                <h2 class="font-normal text-sm sm:text-lg lg:text-xl xl:text-2xl">Bold Gold Collection
                                </h2>
                                <NuxtLink
                                    :to="STATIC_ROUTES.BOLD_GOLD"
                                    class="underline text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Shop Bold Gold Collection"
                                    @click="$bus.emit('aria-announce','Shopping Bold Gold Collection')"
                                >
                                Shop Now
                            </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Explore Gift Ideas -->
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16">
            <div class="grid grid-cols-1 gap-2 sm:gap-4 lg:gap-x-8">
                <FeaturedProduct :products="products.slice(2, 4)" />
            </div>
        </div>

        <!-- Shop Our Socials -->
        <div class="lg:-mt-16">
            <ShopSocials :bgColor="`bg-white pb-8 lg:pb-16`" :textColor="`text-gray-black`" />
        </div>
    </div>
</template>

<script>
import Banner from '~/components/ui/Banner.vue';
import FeaturedProduct from '~/components/common/FeaturedProduct.vue';
import ShopSocials from '~/components/common/ShopSocials.vue';
import { redirectionUrl } from "~/utils/universalHelper";
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : "TopGiftIdeasPage",
    components: { Banner, FeaturedProduct, ShopSocials },
    data() {
        return {
            products: [],
            loader: true,
            STATIC_ROUTES,
        }
    },
    watch: {
        '$store.state.metaData': function (newValue, oldValue) {
            let metaData = newValue;
            if(metaData?.products?.length) {
                this.products = metaData.products;
                this.$nextTick(() => {
                    this.$bus.emit(
                        'aria-announce',
                        `${metaData.products.length} gift products loaded.`
                    )
                })
            }
        },
    },
    mounted() {
        this.$bus.emit(
            'aria-announce',
            'Top Gift Ideas page loaded. Browse our most popular gifts including French Cut and Bold Gold collections.'
        )
    },
    methods: {
        getRedirectUrl(item) {
            item.parent_id = item?.id; // Just to use global redirection
            return redirectionUrl(item);
        },
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), false);
        },
    }
}
</script>