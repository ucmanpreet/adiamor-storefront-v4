<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/recently-purchased.jpg?updatedAt=1748237021924`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
            alt="Custom Rings Gallery"
        >
            <h1
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">
                Custom Rings Gallery</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Be inspired by the rings that we have created for our
                customers.</p>
        </Banner>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" class="sr-only">
                Recently Purchased Custom Rings
            </h2>
            <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 xl:gap-x-8 xl:gap-y-10" aria-live="polite">
                <template v-if="recentlyPurchased && recentlyPurchased.length">
                    <Card v-for="item in recentlyPurchased" :key="item.id" :item="item"
                        :image="item" :title="item.name"
                        :link="`${correctUrl(item.url_key)}`" :url="item.url_key"
                        :description="getDescription(item)" :price="formattedPrice(item.price)" imageClass="p-9" :dynamicImg="true" />
                </template>
                <div
                    v-else
                    class="absolute inset-0 flex items-center justify-center"
                    role="status"
                    aria-live="polite"
                >
                    <CustomLoader />
                    <span class="sr-only">Loading custom rings gallery items</span>
                </div>
                <div class="col-span-full pt-2" v-if="recentlyPurchased?.length > limit && totalProduct > recentlyPurchased?.length">
                    <Button @click="page++" type="button" colorType="bordered-primary-fill"
                        class="max-w-xs w-full m-auto sm:max-w-screen-sm"
                        :aria-label="listLoader ? 'Loading more custom rings' : 'Load more custom rings'"
                    >
                        {{ listLoader ? `Loading......` : `Load More` }}
                    </Button>
                </div>
            </div>
        </section>

        <div
            class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>
<script>
import api from '~/api-client/rest-api/index';
import Banner from '~/components/ui/Banner.vue';
import Card from '~/components/common/Card.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import Button from '~/components/common/Button.vue';
import ContactLink from '~/components/common/ContactLink.vue';
import { correctUrl } from '~/utils/universalHelper';
export default {
    name : "CustomRingsGalleryPage",
    components: { Banner, Card, CustomLoader, Button, ContactLink },
    data() { return { recentlyPurchased: [], page: 1, limit: 16, listLoader: false, totalProduct : 0 } },
    async mounted() {
        this.$bus.emit(
            'aria-announce',
            'Custom Rings Gallery page loaded. Recently purchased custom rings are being displayed.'
        );
        await this.getPurchasedItems();
    },
    watch: {
        page() {
            this.getPurchasedItems();
        }
    },
    methods: {
        correctUrl: item => correctUrl(item),
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), false);
        },
        async getPurchasedItems() {
            try {
                this.page != 1 ? this.listLoader = true : ''; this.$bus.emit('aria-announce', 'Loading more custom rings');
                const response = await api.getRequest(this.$axios,this.$cookies, `get/gallery?product_type=recently_purchased&page=${this.page}&limit=${this.limit}`);
                this.page != 1 ? this.listLoader = false : '';
                if (!response) {
                    console.log('Internal Server Error', "error");
                    this.$bus.emit('aria-announce', 'An error occurred while loading custom rings');
                    return;
                }
                if (response && response.data && response.data.success) {
                    const newItems = response.data.data ?? [];
                    this.recentlyPurchased = this.page == 1 ? newItems : this.recentlyPurchased.concat(newItems) ?? [];
                    this.totalProduct = response.data?.pagination?.total;
                    if (this.page === 1) {
                        this.$bus.emit(
                            'aria-announce',
                            `${this.recentlyPurchased.length} custom rings loaded`
                        );
                    } else {
                        this.$bus.emit(
                            'aria-announce',
                            `${newItems.length} more custom rings loaded. Total ${this.recentlyPurchased.length} items displayed`
                        );
                    }
                }
            } catch (error) {
                console.log('Get Similar Product Error' + error);
                this.$bus.emit(
                    'aria-announce',
                    'An unexpected error occurred while fetching custom rings'
                );
            }
        },
        getDescription(item) {
            let showIn = item.material_variation ? `<p>Shown in ${item.material_variation}</p>` : '';
            let showWith = `<p>Shown with ${item.carat ? item.carat : ''} ${item.shape ? ` | ${item.shape}` : ''} ${item.color ? ` |${item.color}` : ''} ${item.clarity ? ` | ${item.clarity}` : ''}</p>`;
            return `${showIn}${showWith}`;
        }
    }
}
</script>