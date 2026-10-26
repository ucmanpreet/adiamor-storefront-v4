<template>
    <label class="heart relative inline-flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:rounded-sm">
        <!-- Accessible Checkbox -->
        <input
            :id="`wishlist-heart-${getItemSku}`"
            type="checkbox"
            name="wishlist-heart"
            class="peer absolute inset-0 opacity-0 z-0 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            v-model="isChecked"
            @keydown.enter="toggleHeart($event)"
            @change="toggleHeart($event)"
            :aria-label="isChecked ? `Already added${item && item.name ? ' ' + item.name : ''} to wishlist. Click to remove from wishlist` : `Add${item && item.name ? ' ' + item.name : ''} to wishlist`"
            :tabindex="tabIndex"
        />

        <!-- Empty Heart Icon (decorative) -->
        <Icon
            name="heart-solid"
            class="block text-current peer-checked:hidden"
            :class="size"
            aria-hidden="true"
        />

        <!-- Filled Heart Icon (decorative) -->
        <Icon
            name="heart-fill"
            class="hidden peer-checked:block peer-checked:text-primary"
            :class="size"
            aria-hidden="true"
        />

        <slot></slot>
    </label>
</template>

<script>
import Icon from "~/components/common/Icon.vue";
import mixin from "~/mixin/sweetAlert";
export default {
    name : 'Heart',
    components: { Icon },
    props: {
        item: [Object, Number],
        selectedVariant: {
            type: [Object, Number, String],
            default: '',
        },
        size: {
            type: String,
            default: 'w-4 h-4',
        },
        type: {
            type: String,
            default: '',
        },
        fetchSku: {
            type: Boolean,
            default: false,
        },
        tabIndex: {
            type: [Number, String],
            default: 0,
        },
    },
    data() {
        return {
            isChecked: false,
            alredayPresent: false,
        };
    },
    watch: {
        '$store.state.wishList.length'() {
            this.assignData();
        },
        '$store.state.loggedInWishList.length'() {
            this.assignData();
        }
    },
    mounted() {
        this.assignData();
    },
    methods: {
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        async assignData() {
            try {
                let compareData = [];
                if (localStorage.getItem('token')) {
                    const compareList = this.$store.state.loggedInWishList;
                    if (compareList && Object.values(compareList).length) {
                        compareData = Object.values(compareList);
                        this.isChecked = compareData.some(data => this.getItemSku == data?.sku);
                    }
                } else {
                    const compareList = this.$store.state.wishList;
                    if (compareList && Object.values(compareList).length) {
                        compareData = Object.values(compareList);
                        this.isChecked = compareData.some(data => this.getItemSku == data?.sku);
                    }
                }

                if (this.type == 'cart') {
                    this.isChecked = false;
                    if (compareData && compareData.length) {
                        this.alredayPresent = compareData.some(data => this.getItemSku == data?.sku);
                    }
                }

                let skuList = this.fetchSkuList(this.item);
                if (skuList?.length) {
                    this.isChecked = skuList.every(sku => compareData.some(data => data?.sku === sku));
                }
            } catch (error) {
                console.error('Error in assignData:', error);
            }
        },

        async toggleHeart(event) {
            if (this.type == 'cart' && this.alredayPresent) {
                this.createSwalAlert('This product is currently in your wish list.', "success");
                return;
            }

            if (
                (this.item && this.item?.diamondAttributeDetail?.length) ||
                (this.item?.type == 'bundle' && this.item?.diamond?.diamondAttributeDetail?.length)
            ) {
                let skuList = this.fetchSkuList(this.item);
                if (skuList?.length) {
                    let checked = event.target.checked;
                    for (const element of skuList) {
                        let productData = await this.$store.dispatch('fetchProduct', { sku: element });
                        if (productData) {
                            let data = productData;
                            data.isChecked = checked;
                            await this.addToWishlist(data);
                        }
                    }
                    return;
                }
            }

            let data = this.item;
            data.isChecked = event.target.checked;
            await this.addToWishlist(data);
        },

        fetchSkuList(item) {
            let diamondDetails = item?.diamond?.diamondAttributeDetail || item?.diamondAttributeDetail;
            let diamondSku = diamondDetails?.map(diamond => {
                const product = diamond?.data?.find(field => field?.code === 'product_number');
                return product ? product?.value : null;
            });
            if (item?.setting?.sku) diamondSku?.push(item?.setting?.sku);
            return diamondSku?.length ? diamondSku : [];
        },

        async addToWishlist(data) {
            const token = localStorage.getItem('token');

            if (this.selectedVariant && this.selectedVariant?.sku) {
                data = {
                    ...data,
                    name: this.selectedVariant.name || data.name,
                    sku: this.selectedVariant.sku || data.sku,
                    images: this.selectedVariant.images || data.images,
                    price: this.selectedVariant.price || data.price,
                    discounted_price: this.selectedVariant.discounted_price || data.discounted_price,
                    selectedVariant: this.selectedVariant,
                    parent_id: this.item?.parent_id || this.item?.id
                };
            } else {
                data = {
                    ...data,
                    selectedVariant: null
                };
            }

            if (token) {
                await this.$store.dispatch('setWishListApi', {
                    context: this,
                    router: this.$router,
                    item: data,
                    store: this.$store
                });
                this.$store.commit('incrementHeartCount');
            } else {
                this.$store.commit('setWishList', data);
                this.$store.commit('incrementHeartCount');
            }
            let finalData = { ...data, itemListName : this.$route.fullPath, item_id : this.item?.sku || data?.sku}
            this.$store.commit('setGTMData', finalData);            
            this.$store.dispatch('runGtmEvent', { store : this.$store, action_type : data?.isChecked ? 'add_to_wishlist' : 'remove_from_wishlist' });
         
            if(this.type == 'cart') this.$emit('removeFromCart');
        },
    },
    computed: {
        getItemSku() {
            return this.selectedVariant?.sku || this.item?.sku || 'unknown';
        }
    }
};
</script>

<style>
.heart .peer:checked~.peer-checked\:text-primary svg path {
    stroke: #306499 !important;
}
</style>