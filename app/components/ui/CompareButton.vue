<!-- CompareCheckbox.vue -->
<template>
  <label
    :for="`compare_${item?.sku}_${uid}`"
    class="relative inline-flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:rounded-sm"
  >
    <!-- Hidden accessible checkbox -->
    <input
      tabindex="0"
      :id="`compare_${item?.sku}_${uid}`"
      type="checkbox"
      name="compare"
      class="peer absolute inset-0 opacity-0 z-0 cursor-pointer"
      v-model="isChecked"
      @click="toggleCompare"
      :aria-checked="isChecked.toString()"
      aria-label="Compare"
    />

    <!-- Icon when unchecked -->
    <Icon
      name="compare"
      class="block text-current peer-checked:hidden w-4 h-4"
      aria-hidden="true"
    />

    <!-- Icon when checked -->
    <Icon
      name="compare-fill"
      class="hidden peer-checked:block peer-checked:text-primary w-4 h-4"
      aria-hidden="true"
    />

    <!-- Optional slot content for extra text -->
    <slot></slot>
  </label>
</template>

<script setup>
import Icon from "~/components/common/Icon.vue";

const props = defineProps({
  item: { type: [Object, Number], required: true },
  isPair: { type: Boolean, default: false },
});

const store = useMainStore();
const uid = useId();

const isChecked = ref(false);

watch(() => store.compareList.length, () => {
  assignData();
});
watch(() => store.comparePairList.length, () => {
  assignData();
});

onMounted(() => {
  assignData();
});

function assignData() {
  const compareList = props.isPair
    ? store.comparePairList
    : store.compareList;

  if (compareList && Object.values(compareList).length) {
    const compareData = Object.values(compareList);
    isChecked.value = compareData.some(
      (data) => getItemSku(data) === props.item?.sku
    );
  } else {
    isChecked.value = false;
  }
}
function getItemSku(item) {
  return item?.sku;
}
async function toggleCompare() {
  const mutation = props.isPair ? 'setPairCompareList' : 'setCompareList';
  store[mutation](props.item);
  store.setGTMData(props.item);
  store.runGtmEvent({
    action_type: !isChecked.value ? 'add_to_compare' : 'remove_from_compare',
  });
}
</script>

<style scoped>
/* Optional: Add focus ring for keyboard navigation */
input:focus-visible {
  outline: 2px solid #2563eb; /* Tailwind blue-600 */
  outline-offset: 2px;
}
</style>