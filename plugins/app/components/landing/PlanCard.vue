<!-- PlanCard.vue -->
<template>
    <div class="relative border border-primary text-primary p-4 font-medium">
        <a :href="link" class="absolute inset-0"></a>
        <h2 class="text-sm lg:text-lg mb-4">{{ title }}</h2>
        <p class="text-lg lg:text-3xl">{{ amount }}</p>
    </div>
</template>

<script>
import KEYS from '~/utils/constant.js';

export default {
    name : 'PlanCard',
    props: {
        title: {
            type: String
        },
        amount: {
            type: String
        },
        sku: {
            type: String
        }
    },
  computed: {
    link() {
      return this.title?.toLowerCase()?.includes('3 year')
        ? KEYS.THREE_YEAR_PLAN_LINK
        : KEYS.LIFE_TIME_PLAN_LINK;
    }
  }
};
</script>