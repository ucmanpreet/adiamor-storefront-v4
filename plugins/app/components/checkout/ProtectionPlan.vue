<template>
  <div
    class="max-w-sm grid grid-cols-3 text-sm capitalize text-center divide-x divide-secondary-200 border border-gray-200"
      role="radiogroup"
      aria-label="Protection plan options"
    >
    <button
      type="button"
      v-for="(plan, plan_index) in quotesData"
      :key="plan_index" role="radio"
      :aria-checked="selectedPlan && plan.planSku == selectedPlan?.planSku ? 'true' : 'false'"
      :aria-label="getAriaLabel(plan)"
      :tabindex="0"
      @click.prevent="addProtectionPlan(plan)"
      class="px-2 py-0.5 w-full text-primary hover:bg-primary hover:text-white"
      :class="plan.planSku != 'NOPLAN' ? 'flex flex-col justify-center items-center gap-0.5' : 'bg-primary text-white'"
    >
      <span>
        {{ formatCarePlan(plan.applicablePlanDuration) || plan.applicablePlanDuration }}
      </span>
      <span class="font-normal" v-if="plan.planSku != 'NOPLAN'">+{{formatRound(plan.price)}}</span>
    </button>
  </div>
</template>
<script>
export default {
  props: { quotes: Array, index: Number, selectedPlan: Object },
  data() {
    return {
      quotesData: []
    }
  },
  mounted() {
    this.quotesData = [{
      planSku: "NOPLAN",
      applicablePlanDuration: "No Plan",
    }, ...this.quotes];
  },
  methods: {
    addProtectionPlan(item) {
      if (item.planSku == 'NOPLAN') return;
      this.$emit("addPlanToItem", { index: this.index, plan: item });
    },
    formatRound(price) {
      return this.$formatPrice(Math.round(price)) ?? '';
    },
    formatCarePlan(str){
      if(str && str?.includes('Year')){
				return str.replace('Year', 'Years');
      }
      return str;
		},
    getAriaLabel(plan) {
      if (plan.planSku === 'NOPLAN') {
        return 'No Plan, no protection';
      }
      const duration = this.formatCarePlan(plan.applicablePlanDuration) || plan.applicablePlanDuration;
      const price = this.formatRound(plan.price);
      const isSelected = this.selectedPlan && plan.planSku === this.selectedPlan?.planSku;
      return `${duration}, plus ${price}${isSelected ? ', currently selected' : ''}`;
    },
  },
};
</script>