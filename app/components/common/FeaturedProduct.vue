<template>
    <div>
        <article v-for="(product, index) in products" :key="index"
            class="lg:my-5 relative flex items-center sm:py-6 first:pt-0">
            <div :class="index % 2 === 0 ? 'left-0' : 'sm:right-0'"
                class="absolute inset-y-0 w-4/12 overflow-hidden bg-white border border-gray-200">
                <MediaImage :src="product?.image ?? product" className="w-full h-full object-contain"
                    :alt="product.alt || product?.name || ''" />
            </div>
            <div :class="index % 2 === 0 ? 'ml-auto pl-4 lg:pl-8' : 'ml-auto sm:ml-0 pl-4 sm:pl-0 sm:mr-auto sm:pr-8'"
                class="w-8/12">
                <h2 class="font-normal text-sm sm:text-lg lg:text-xl">
                    {{ product?.name }}
                </h2>
                <p class="mt-1 sm:mt-3 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none text-gray-600"
                    v-html="$sanitize(product?.description)"></p>
                <p class="mt-1 sm:mt-3 text-sm sm:text-base font-normal sm:font-medium">{{
                    formattedPrice(product?.price)
                    }}</p>
                <div class="mt-3 sm:mt-6">
                    <NuxtLink :to="getRedirectUrl(product)" v-if="getRedirectUrl(product)"
                        class="inline-flex items-center justify-center text-xs focus:outline-none focus:ring-1 text-white font-normal sm:!text-base px-4 sm:px-8 py-1 sm:py-2 capitalize bg-primary hover:bg-primary/90 focus:ring-primary" :aria-label="`View more about ${product?.name}`">
                        View More
                    </NuxtLink>

                    <span
                        v-else
                        class="inline-flex items-center justify-center text-xs text-white font-normal sm:!text-base px-4 sm:px-8 py-1 sm:py-2 capitalize bg-primary/50 cursor-not-allowed"
                        aria-disabled="true"
                    >
                        View More
                    </span>
                </div>
            </div>
        </article>
    </div>
</template>
<script setup>
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import { productRedirection } from "~/utils/universalHelper";

const props = defineProps(['products']);

const { $formatPrice } = useNuxtApp();

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (price) return $formatPrice(parseFloat(price), false);
}
function getRedirectUrl(item) {
    if(item) item.parent_id = item?.id; // Just to use global redirection
    return productRedirection(item) || STATIC_ROUTES.HOME;
}
</script>