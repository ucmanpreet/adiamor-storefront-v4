<template>
    <div class="gap-2" v-if="item">
        <template v-if="item?.product?.attribute_family_code == 'certified_diamond'">
            <span :class=" className ?? 'text-sm font-medium text-gray-900 max-w-md inline-block'">
                {{ item?.name }}
            </span>
            <span class="block text-xs">
                {{ item.product?.diamond_color }} Color
                &nbsp; · &nbsp;{{ item.product?.diamond_clarity }} Clarity
            </span>
            <span class="block text-xs">
                {{ item.product?.diamond_authority }} Report&nbsp; · &nbsp;{{ lang.diamondSku?.replace(/:$/, '') }} {{
                    item?.sku }}
            </span>
        </template>
        <template v-else>
            <span :class="className ?? 'text-sm font-medium text-gray-900 max-w-md inline-block'">{{ getDescription(item) ?? item.name
                }}</span>
            <p class="text-xs">
                <span>{{ fetchLabel(item) }}</span>
                <span class="uppercase">{{ getCartItemSku(item) }}</span>
            </p>
        </template>
    </div>
</template>
<script>
import { getDescription, fetchSKULabel } from "~/utils/universalHelper.js";
import lang from "~/utils/commonLocale.js";

export default {
    name: 'CartItemName',
    props: ['item', 'className'],
    data() {
        return {
            lang
        }
    },
    methods: {
        getDescription: item => getDescription(item),
        fetchLabel: item => fetchSKULabel(item),
        getCartItemSku(item) {
            if (!item) return '';
            const { sku, additional } = item;
            if (additional) {
                let diamond_sku = additional.diamond_sku;
                if (Array.isArray(diamond_sku) && diamond_sku.length > 0) {
                    return diamond_sku.length > 1 ? diamond_sku.join(', ') : diamond_sku[0];
                }
            }
            if (!sku) return null;
            const splitIndex = sku.toLowerCase().indexOf('-d-');
            if (splitIndex !== -1) {
                const setting = sku.substring(0, splitIndex);
                const diamond = sku.substring(splitIndex + 1); // includes 'd-'
                return `${diamond}, ${setting}`;
            }
            return sku;
        },
    }
}
</script>