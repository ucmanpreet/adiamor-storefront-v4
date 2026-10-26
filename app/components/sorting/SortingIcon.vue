<template>
  <button @click="toggleSort" class="cursor-pointer flex items-center gap-1 capitalize" :class="sortColumn == sortKey ? 'text-primary' : ''"
  :aria-label="`Sort by ${label}, ${sortOrderChild === 'asc' ? 'ascending' : 'descending'}`"
  :aria-pressed="sortColumn === sortKey ? 'true' : 'false'">
    <span class="font-normal" v-if="label">{{ label }}</span>
    <Icon v-if="!sortColumn" name="default-sort" class="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true"/>
    <span v-if="sortOrderChild === 'asc' && sortColumn">
      <Icon name="asc" class="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true"/>
    </span>
    <span v-if="sortOrderChild === 'desc' && sortColumn">
      <Icon name="desc" class="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true"/>
    </span>
  </button>
</template>

<script setup>
import Icon from "~/components/common/Icon.vue";

const props = defineProps({
  sortKey: String,
  currentSort: String,
  sortOrder: String,
  label: String,
});
const emit = defineEmits(['sort']);

const sortOrderChild = ref('asc');
const sortColumn = ref('');

onMounted(() => {
  sortColumn.value = props.currentSort == props.sortKey ? props.sortKey : '';
  sortOrderChild.value = props.sortOrder ?? 'asc';
});

function toggleSort() {
  sortOrderChild.value = sortOrderChild.value === "asc" ? "desc" : "asc";
  emit("sort", props.sortKey, sortOrderChild.value);
}
</script>
