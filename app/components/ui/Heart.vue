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

<script setup>
import Icon from "~/components/common/Icon.vue";

const props = defineProps({
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
});

const emit = defineEmits(['removeFromCart']);

const store = useMainStore();
const route = useRoute();
const { createSwalAlert } = useAlert();

const isChecked = ref(false);
const alredayPresent = ref(false);

const getItemSku = computed(() => props.selectedVariant?.sku || props.item?.sku || 'unknown');

watch(() => store.wishList?.length, () => {
    assignData();
});
watch(() => store.loggedInWishList?.length, () => {
    assignData();
});

onMounted(() => {
    assignData();
});

async function assignData() {
    try {
        let compareData = [];
        if (localStorage.getItem('token')) {
            const compareList = store.loggedInWishList;
            if (compareList && Object.values(compareList).length) {
                compareData = Object.values(compareList);
                isChecked.value = compareData.some(data => getItemSku.value == data?.sku);
            }
        } else {
            const compareList = store.wishList;
            if (compareList && Object.values(compareList).length) {
                compareData = Object.values(compareList);
                isChecked.value = compareData.some(data => getItemSku.value == data?.sku);
            }
        }

        if (props.type == 'cart') {
            isChecked.value = false;
            if (compareData && compareData.length) {
                alredayPresent.value = compareData.some(data => getItemSku.value == data?.sku);
            }
        }

        let skuList = fetchSkuList(props.item);
        if (skuList?.length) {
            isChecked.value = skuList.every(sku => compareData.some(data => data?.sku === sku));
        }
    } catch (error) {
        console.error('Error in assignData:', error);
    }
}

async function toggleHeart(event) {
    if (props.type == 'cart' && alredayPresent.value) {
        createSwalAlert('This product is currently in your wish list.', "success");
        return;
    }

    if (
        (props.item && props.item?.diamondAttributeDetail?.length) ||
        (props.item?.type == 'bundle' && props.item?.diamond?.diamondAttributeDetail?.length)
    ) {
        let skuList = fetchSkuList(props.item);
        if (skuList?.length) {
            let checked = event.target.checked;
            for (const element of skuList) {
                let productData = await store.fetchProduct({ sku: element });
                if (productData) {
                    let data = productData;
                    data.isChecked = checked;
                    await addToWishlist(data);
                }
            }
            return;
        }
    }

    let data = props.item;
    data.isChecked = event.target.checked;
    await addToWishlist(data);
}

function fetchSkuList(item) {
    let diamondDetails = item?.diamond?.diamondAttributeDetail || item?.diamondAttributeDetail;
    let diamondSku = diamondDetails?.map(diamond => {
        const product = diamond?.data?.find(field => field?.code === 'product_number');
        return product ? product?.value : null;
    });
    if (item?.setting?.sku) diamondSku?.push(item?.setting?.sku);
    return diamondSku?.length ? diamondSku : [];
}

async function addToWishlist(data) {
    const token = localStorage.getItem('token');

    if (props.selectedVariant && props.selectedVariant?.sku) {
        data = {
            ...data,
            name: props.selectedVariant.name || data.name,
            sku: props.selectedVariant.sku || data.sku,
            images: props.selectedVariant.images || data.images,
            price: props.selectedVariant.price || data.price,
            discounted_price: props.selectedVariant.discounted_price || data.discounted_price,
            selectedVariant: props.selectedVariant,
            parent_id: props.item?.parent_id || props.item?.id
        };
    } else {
        data = {
            ...data,
            selectedVariant: null
        };
    }

    if (token) {
        await store.setWishListApi({ item: data });
        store.incrementHeartCount();
    } else {
        store.setWishList(data);
        store.incrementHeartCount();
    }
    let finalData = { ...data, itemListName : route.fullPath, item_id : props.item?.sku || data?.sku}
    store.setGTMData(finalData);
    store.runGtmEvent({ action_type : data?.isChecked ? 'add_to_wishlist' : 'remove_from_wishlist' });

    if (props.type == 'cart') emit('removeFromCart');
}
</script>

<style>
.heart .peer:checked~.peer-checked\:text-primary svg path {
    stroke: #306499 !important;
}
</style>