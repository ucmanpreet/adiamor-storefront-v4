<template>
    <!-- Wishlist Empty State -->
    <div v-if="type === 'wishlist'" class="flex flex-col items-center justify-center gap-4 px-4" role="region"
        aria-label="Wishlist empty"
    >
        <Icon name="custom-heart" class="text-gray-300" :class="iconCLass" aria-hidden="true"/>
        <h2 class="text-base font-medium">
            Your wishlist is empty.
        </h2>
    </div>

    <!-- Other Empty States -->
    <div v-else class="flex flex-col items-center justify-center"
        role="region"
        :aria-label="`No results found for ${type || 'search'}`"
    >
        <Icon :name="type === 'cart' ? 'custom-shopping-cart' : 'custom-search'" class="hidden sm:block w-72 h-72 text-gray-300" aria-hidden="true" />
        <p role="status">Sorry, no record found for <strong class="capitalize">{{ type || `this search` }}</strong></p>
        <slot></slot>
    </div>
</template>
<script>
import Icon from "~/components/common/Icon.vue";
export default {
    name : 'NoDataFound',
    components: { Icon },
    props: {
        type: {
            type: String,
            default: ''
        },
        iconCLass: {
            type: String,
            default: 'w-72 h-72'
        }
    }
}
</script>
