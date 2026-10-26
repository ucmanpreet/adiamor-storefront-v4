<template>
    <div class="flex flex-col relative">

        <!-- Product Link Wrapper -->
        <Link :href="getLink"
            v-if="link" colorType="link"
            class="absolute inset-0 z-10 focus-visible:ring-2 focus-visible:ring-primary"
            :aria-label="price ? (showStrikeThroughPrice(item) ? `${title}, Original price ${formattedPrice(showStrikeThroughPrice(item))}, discounted price ${formattedPrice(fetchPriceData(item))}` : `${title}, Price ${formattedPrice(fetchPriceData(item))}`) : title"
        />
        <div class="aspect-square border border-gray-200 relative overflow-hidden" :class="imageClass" aria-hidden="true">
            <MediaImage :src="image" :alt="title || 'Product image'" className="w-full h-full object-cover" loading="lazy"
                :classDynamic="imagePosition ? imagePosition : ''" v-if="dynamicImg"/>
            <nuxt-img
                provider="cdn"
                :alt="title || 'Product image'"
                :src="getValidImg(image)"
                class="w-full h-full object-contain"
                v-else
            />
        </div>
        <div class="mt-3 lg:mt-6 flex flex-col flex-1 text-center">
            <h2 class="font-medium text-sm md:text-base lg:text-lg  uppercase !tracking-widest-lg" aria-hidden="true"
                :class="$route.path == STATIC_ROUTES.CART_SUMMARY ? '!text-lg' : ''">{{ title }}</h2>
            <p v-if="description" class="mt-3 text-xs sm:text-sm md:text-base" v-html="$sanitize(description)"></p>
            <div class="mt-auto">
                <!-- <p v-if="price" class="mt-3 font-medium text-sm sm:text-base">{{ price }}</p> -->
                <p v-if="price" class="mt-3 font-medium text-sm sm:text-base" aria-hidden="true">
                    <span class="line-through text-gray-600 text-[0.8125rem]" v-if="showStrikeThroughPrice(item)">
                        {{ formattedPrice(showStrikeThroughPrice(item)) }}
                    </span>
                    <span class="font-medium text-sm sm:text-base" :class="{ 'text-black': showStrikeThroughPrice(item) }">
                        {{ formattedPrice(fetchPriceData(item)) }}
                    </span>
                </p>

                <!-- Secondary Shop Link (optional) — hidden from AT, ghost link above covers it -->
                <Link :href="getLink" v-if="link" colorType="link" class="!font-light md:!text-sm underline" aria-hidden="true" tabindex="-1">
                    Shop Now
                </Link>
            </div>
        </div>
    </div>
</template>

<script>
import Link from "~/components/ui/Link.vue";
import { showStrikeThroughPrice, fetchPriceData, productRedirection, fetchFirstProductImage } from "~/utils/universalHelper.js";
import MediaImage from "./MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

export default {
    components: { Link, MediaImage },
    props: {
        image: {
            type: [String, Object, Array],
            required: true
        },
        title: {
            type: String,
        },
        link: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: String,
        },
        imageClass: {
            type: String
        },
        item: {
            type: [Object, Array]
        },
        imagePosition: {
            type: String,
        },
        dynamicImg: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showStrikeThroughPrice: item => showStrikeThroughPrice(item),
        fetchPriceData: item => fetchPriceData(item),
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), false);
        },
        getValidImg(img) {
            if (typeof img === 'string') return img;
            return fetchFirstProductImage(img);
        }
    },
    computed: {
        productId() {
            return `product-title-${this.uid}`;
        },
        getLink() {
            return this.item && this.item?.sku ? productRedirection(this.item) : this.link || STATIC_ROUTES.HOME;
        }
    },
    data() {
        return {
            STATIC_ROUTES
        }
    }
}
</script>
