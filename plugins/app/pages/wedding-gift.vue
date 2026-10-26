<template>
    <div>

        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/winter24.jpg?updatedAt=1746137329409`"
            :contentBackgroundColor="`bg-transparent min-h-96`"
            :contentTextColor="`text-white sm:text-gray-black`"
            :imgPosition="`object-left sm:object-center`"
            :mobileObjectCordinates="`310`"
			alt="Wedding Gifts"
			>
        </Banner>

        <section class="flex flex-col gap-4 max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16"
            aria-labelledby="wedding-gifts-heading"
            aria-describedby="wedding-gifts-description"
        >
            <header class="col-span-full max-w-lg mx-auto text-center mb-4 lg:mb-12">
                <h2 id="wedding-gifts-heading" class="text-lg md:text-xl lg:text-3xl xl:text-5xl font-normal">Wedding Gifts</h2>
                <p id="wedding-gifts-description" class="mt-3 text-sm md:text-lg max-w-xl mx-auto ">Timeless Treasures: Perfect Wedding Gifts for Every
                    Couple</p>
            </header>
            <template v-if="products && products.length">
                <FeaturedProduct :products="products" />
            </template>
            <div v-if="loader && products.length == 0" class="inset-0 flex items-center justify-center" role="status"
                aria-live="polite" aria-label="Loading wedding gifts, please wait"
            >
                <CustomLoader />
            </div>
            <div v-if="!loader && products.length == 0" class="inset-0 flex items-center justify-center" role="status"
                aria-live="polite"
                aria-label="No wedding gifts available"
            >
                <NoDataFound type="wedding gifts" />
            </div>
        </section>

        <!-- Contact Links -->
        <div class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>

<script>
import Banner from "~/components/ui/Banner.vue";
import FeaturedProduct from "~/components/common/FeaturedProduct.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import NoDataFound from "~/components/common/NoDataFound.vue";
import ContactLink from "~/components/common/ContactLink.vue";
export default {
    name : "WeddingGiftPage",
    components: { Banner, FeaturedProduct, CustomLoader, NoDataFound, ContactLink },
    data() {
        return {
            products: [],
            loader: true,
        }
    },
    watch: {
        '$store.state.metaData': function (newValue, oldValue) {
        let metaData = newValue;
        if(metaData) this.loader = false;
        if (metaData?.products?.length) {
                this.products = metaData.products

                this.$nextTick(() => {
                    this.$bus.emit(
                        'aria-announce',
                        `${metaData.products.length} wedding gift products loaded successfully.`
                    )
                })
            } else if (!this.loader) {
                this.$nextTick(() => {
                    this.$bus.emit(
                        'aria-announce',
                        'No wedding gifts found at this time.'
                    )
                })
            }
        },
    },
    mounted(){
        this.$bus.emit('aria-announce', 'Wedding Gifts page loaded. Browse timeless treasures and perfect gifts for every couple.');
        setTimeout(() => {
            this.loader = false;
            // If products still empty after timeout, announce it
            if (this.products.length === 0) {
                this.$bus.emit(
                    'aria-announce',
                    'No wedding gifts are available at this time.'
                )
            }
        }, 1000);
    }
}
</script>