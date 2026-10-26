<template>
    <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" role="region"
        aria-roledescription="carousel"
        :aria-labelledby="carouselHeadingId"
        @keydown.right="onMoveForward"
        @keydown.left="onMoveBackward">
        <div class="flex items-start justify-between">
            <div>
                <h2 class="font-normal text-lg md:text-xl lg:text-3xl" :id="carouselHeadingId" v-html="$sanitize(header)"></h2>
                <span class="sr-only" aria-live="polite">
                    {{ slideAnnouncement }}
                </span>
                <p class="mt-1 text-sm max-w-lg">{{ description }}</p>
            </div>
            <div class="flex flex-row-reverse gap-3">
                <button class="flex items-center hover:text-white group" type="button" @click="onMoveForward"
                    aria-label="Show next products"
                    @keydown.enter="onMoveForward"
                    @keydown.space.prevent="onMoveForward">
                    <Icon name="arrow-right" class="w-5 h-5 group-hover:text-primary" />
                </button>
                <button class="flex items-center rotate-180 hover:text-white group" type="button"
                    @click="onMoveBackward" aria-label="Show previous products"
                    @keydown.enter="onMoveBackward"
                    @keydown.space.prevent="onMoveBackward">
                    <Icon name="arrow-right" class="w-5 h-5 group-hover:text-primary" />
                </button>
            </div>
        </div>

        <div class="mt-6 relative">
            <div class="slick-spacing">
                <EmblaCarousel v-bind="settings" ref="wedding_slick" :arrows="false" :dots="false">
                    <div v-for="(item, index) in items" :key="index" class="relative"
                    role="group" :aria-label="`Product ${index + 1} of ${items.length}`">
                        <NuxtLink :to="getRedirectUrl(item)" class="absolute inset-0 z-10"
                            :aria-label="`See details of ${item?.name}`"></NuxtLink>
                        <div class="aspect-square relative overflow-hidden border border-gray-200 p-9"
                            :class="isDiamondFilter(item) ? 'diamond-gradient' : 'ring-gradient'">
                            <div class="absolute z-10 top-0 inset-x-0 flex items-center p-2">
                                <div class="flex gap-3 ml-auto">
                                    <Heart :item="item" :selectedVariant="{}" class="flex-none" aria-label="Add to wishlist"/>
                                </div>
                            </div>
                            <MediaImage :src="getImages(item)"
                                alt="Black machined steel pen with hexagonal grip and small white logo at top."
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"/>
                        </div>
                        <div class="group mt-2.5 text-xs sm:text-sm text-center">
                            <div>
                                <div class="mt-auto">
                                    <p class="font-normal text-xs md:text-sm lg:text-base">{{ item?.name }}
                                        | {{ skuToDisplay(item?.sku) ?? item?.sku }}</p>
                                    <p class="mt-1.5 text-gray-900 space-x-2" aria-live="polite">
                                        <span class="line-through text-gray-600 text-sm"
                                            v-if="showStrikeThroughPrice(item)">{{
                                                formattedPrice(showStrikeThroughPrice(item))
                                            }}</span>
                                        <span class="font-medium text-sm sm:text-base" v-if="item.price"
                                            :class="{ 'text-black': showStrikeThroughPrice(item) }">{{
                                                formattedPrice(fetchPriceData(item)) }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </EmblaCarousel>
            </div>
        </div>
    </section>
</template>
<script>
import Icon from "~/components/common/Icon.vue";
import Heart from "~/components/ui/Heart.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import EmblaCarousel from '~/components/common/EmblaCarousel.vue'
import { showStrikeThroughPrice, fetchPriceData, redirectionUrl, skuToDisplay } from "~/utils/universalHelper.js";
export default {
    name : 'WeddingCarousel',
    components: { Icon, Heart, EmblaCarousel, MediaImage },
    props: ['items', 'header', 'description'],
    data() {
        return {
            settings: {
                "dots": false,
                "arrows": false,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 4,
                "slidesToScroll": 1,
                "touchThreshold": 6,
                "responsive": [
                    {
                        "breakpoint": 480,
                        "settings": {
                            "slidesToShow": 2,
                            "slidesToScroll": 1,
                        }
                    },
                    {
                        "breakpoint": 768,
                        "settings": {
                            "slidesToShow": 3,
                            "slidesToScroll": 1,
                        }
                    },
                    {
                        "breakpoint": 1024,
                        "settings": {
                            "slidesToShow": 4,
                            "slidesToScroll": 1,
                        }
                    },
                ]
            },
            slideAnnouncement: '',
            carouselHeadingId: `carousel-${Math.random().toString(36).substr(2, 9)}`
        }
    },
    methods: {
        fetchPriceData: item => fetchPriceData(item),
        showStrikeThroughPrice: item => showStrikeThroughPrice(item),
        redirectionUrl: item => redirectionUrl(item),
        skuToDisplay : item => skuToDisplay(item),
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), false);
        },
        getRedirectUrl(item) {
            return redirectionUrl(item);
        },
        onMoveForward() {
            this.$refs[`wedding_slick`].next();
            this.announceSlide(this.$refs.wedding_slick.currentSlide());
        },
        onMoveBackward() {
            this.$refs[`wedding_slick`].prev();
            this.announceSlide(this.$refs.wedding_slick.currentSlide());
        },
        getImages(item) {
            const img = item?.images?.find(
                i => !['certificates', 'mp4', '3dm'].includes(i?.type)
            );

            return img?.path || assetUrl("~/assets/images/no-image.webp");
        },
        isDiamondFilter(item) {
            if (item) {
                return item?.attribute_family_code == 'certified_diamond';
            }
        },
        announceSlide(index) {
            this.slideAnnouncement =
            `Showing product ${index + 1} of ${this.items.length}`;
        }

    }
}
</script>

<style scopped>
.slick-spacing .slick-slide {
    padding: 0 0.2rem;
    /* Adds gap */
}

@media (min-width: 640px) {
    .slick-spacing .slick-slide {
        padding: 0 .5rem;
        /* Adds gap */
    }
}
</style>