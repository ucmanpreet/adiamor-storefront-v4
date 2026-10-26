<template>
    <section aria-labelledby="summary-heading" :aria-busy="loading.toString()" v-if="!loading && orderData" :class="className">
        <h2 id="summary-heading" class="sr-only">Billing Summary</h2>

        <div class="bg-gray-100 px-4 py-6 sm:px-6 flex lg:gap-x-8 w-full"
            :class="orderData?.special_instruction ? 'justify-between' : 'justify-end'">
            <div v-if="orderData?.special_instruction">
                <h3 id="comments-heading" class="font-medium text-sm">
                    Comments:
                </h3>
                <p aria-labelledby="comments-heading">
                    {{ orderData?.special_instruction }}
                </p>
            </div>
            <dl class="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0 w-1/2">
                <div class="flex items-center justify-between pb-2">
                    <dt>Subtotal</dt>
                    <dd class="font-medium">{{ formattedPrice(orderData?.sub_total) }}</dd>
                </div>
                <div class="flex items-center justify-between py-2">
                    <dt>FedEx Insured Shipping</dt>
                    <dd class="font-medium">
                        <span aria-label="Shipping cost is free">Free</span>
                    </dd>
                </div>
                <div class="flex items-center justify-between py-2" v-if="orderData?.discount_amount">
                    <dt>Discount</dt>
                    <dd class="font-medium">
                        <span aria-label="Discount">
                            - {{ formattedPrice(orderData?.discount_amount) }}
                        </span>
                    </dd>
                </div>
                <div class="flex items-center justify-between py-2" v-if="orderData?.wire_amount">
                    <dt>Wire Discount</dt>
                    <dd class="font-medium">- {{ formattedPrice(orderData?.wire_amount) }}</dd>
                </div>
                <div class="flex items-center justify-between py-2" v-if="orderData?.tax_amount">
                    <dt>Tax <span v-show="orderData?.tax_percentage">({{ orderData?.tax_percentage }}%)</span></dt>
                    <dd class="font-medium">{{ formattedPrice(orderData?.tax_amount) }}</dd>
                </div>  
                <div class="flex items-center justify-between pt-2 text-base md:text-lg">
                    <dt class="font-medium">Total</dt>
                    <dd class="font-medium text-primary" aria-live="polite">{{ formattedPrice(orderData?.grand_total) }}</dd>
                </div>
            </dl>
        </div>
    </section>
</template>
<script setup>
const props = defineProps(['orderData', 'loading', 'className']);

const { $formatPrice } = useNuxtApp();

function formattedPrice(price) {
    if (price === 0) return $formatPrice(0);
    if (!price) return $formatPrice(0);
    return $formatPrice(parseFloat(price), true);
}
</script>