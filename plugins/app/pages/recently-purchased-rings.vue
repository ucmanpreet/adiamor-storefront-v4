<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/recently-purchased.jpg?updatedAt=1748237021924`"
            :contentBackgroundColor="`bg-black/70`"
            :contentTextColor="`text-white`"
			alt="Recently Purchased Rings"
			>
            <h1
                class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">
                Recently Purchased Rings</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Be inspired by the rings that our customers have
                recently purchased.</p>
        </Banner>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 xl:gap-8 text-center" aria-live="polite">
                <template v-if="recentlyPurchased && recentlyPurchased.length">
                    <Card
                        v-for="(item, index) in recentlyPurchased"
                        :key="`recently-purchased-${index}-${item.id}`"
                        :image="item"
                        :title="item.name"
                        :link="`${correctUrl(item.url_key)}`"
                        :url="item.url_key"
                        :description="getDescription(item)"
                        :price="formattedPrice(item.price)"
                        :item="item"
                        :dynamicImg="true"
                    />
                </template>
                <div
                    v-else
                    class="absolute inset-0 flex items-center justify-center"
                    role="status"
                    aria-label="Loading recently purchased rings"
                >
                    <CustomLoader />
                </div>
                <div class="col-span-full pt-2" v-if="recentlyPurchased?.length && totalProduct > recentlyPurchased?.length">
                    <Button
                        @click="loadMore"
                        type="button"
                        colorType="bordered-primary-fill"
                        class="max-w-xs w-full m-auto sm:max-w-screen-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        :aria-label="listLoader ? 'Loading more recently purchased rings' : 'Load more recently purchased rings'"
                    >
                            {{ listLoader ? `Loading......` : `Load More` }}
                    </Button>
                </div>
            </div>
        </div>

        <div class="mt-8 lg:mt-16" role="region"
            aria-label="Contact Assistance">
            <ContactLink />
        </div>
    </div>
</template>
<script>
import api from '~/api-client/rest-api/index';
import Banner from "~/components/ui/Banner.vue";
import Card from "~/components/common/Card.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import Button from "~/components/common/Button.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { correctUrl } from "~/utils/universalHelper.js";

export default {
    name : "RecentlyPurchasedRingsPage",
    components: { Banner, Card, CustomLoader, Button, ContactLink },
    data() { return { recentlyPurchased: [], page: 1, limit: 48, listLoader: false, totalProduct : 0 } },
    async mounted() {
        this.$bus.emit(
            'aria-announce',
            'Recently Purchased Rings page loaded. Browse rings recently purchased by customers.'
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
                this.page != 1 ? this.listLoader = true : '';
                const response = await api.getRequest(this.$axios,this.$cookies, `get/gallery?product_type=recently_purchased&page=${this.page}&limit=${this.limit}`);
                this.page != 1 ? this.listLoader = false : '';
                if (!response) {
                    this.$bus.emit(
                        'aria-announce',
                        'An error occurred while loading recently purchased rings.'
                    );
                    return;
                }
                if (response && response.data && response.data.success) {
                    const newItems = response.data.data ?? [];
                    this.recentlyPurchased = this.page == 1 ? newItems : this.recentlyPurchased.concat(newItems);
                    this.totalProduct = response.data?.pagination?.total;

                    this.$bus.emit(
                        'aria-announce',
                        `${newItems.length} rings loaded. Total loaded: ${this.recentlyPurchased.length}.`
                    );
                }
            } catch (error) {
                console.log('Get Similar Product Error' + error);
                this.$bus.emit(
                    'aria-announce',
                    'Failed to load recently purchased rings.'
                );
            }
        },
        loadMore() {
            this.$bus.emit(
                'aria-announce',
                'Loading more recently purchased rings.'
            );
            this.page++;
        },
        getDescription(item) {
            let showIn = item.material_variation ? `<p>Shown in ${item.material_variation}</p>` : '';
            let showWith = `<p>Shown with ${item.carat ? item.carat : ''} ${item.shape ? ` | ${item.shape}` : ''} ${item.color ? ` |${item.color}` : ''} ${item.clarity ? ` | ${item.clarity}` : ''}</p>`;
            return `${showIn}${showWith}`;
        }
    }
}
</script>