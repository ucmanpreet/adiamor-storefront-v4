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
<script setup>
const props = defineProps({ quotes: Array, index: Number, selectedPlan: Object });
const emit = defineEmits(['addPlanToItem']);
const { $formatPrice } = useNuxtApp();

const quotesData = ref([]);

onMounted(() => {
  quotesData.value = [{
    planSku: "NOPLAN",
    applicablePlanDuration: "No Plan",
  }, ...props.quotes];
});

function addProtectionPlan(item) {
  if (item.planSku == 'NOPLAN') return;
  emit("addPlanToItem", { index: props.index, plan: item });
}
function formatRound(price) {
  return $formatPrice(Math.round(price)) ?? '';
}
function formatCarePlan(str) {
  if (str && str?.includes('Year')) {
    return str.replace('Year', 'Years');
  }
  return str;
}
function getAriaLabel(plan) {
  if (plan.planSku === 'NOPLAN') {
    return 'No Plan, no protection';
  }
  const duration = formatCarePlan(plan.applicablePlanDuration) || plan.applicablePlanDuration;
  const price = formatRound(plan.price);
  const isSelected = props.selectedPlan && plan.planSku === props.selectedPlan?.planSku;
  return `${duration}, plus ${price}${isSelected ? ', currently selected' : ''}`;
}
</script>