<!-- SortHeaderBar.vue -->
<template>
  <div
    class="flex bg-gray-50 border-t border-b border-gray-200 w-full z-20 text-xs sm:text-sm"
    :class="{ 'sticky top-[117px] sm:top-[168px]': !isComapreTab }"
    role="group"
    aria-label="Column sort options"
  >
    <div
      v-for="column in getModifiedColumns"
      :key="column.label"
      class="whitespace-nowrap px-1 sm:px-2 py-4 capitalize flex items-center"
      :class="[column.className, { 'hidden sm:inline-flex': !column.mobile }]"
    >
      <!-- Non-sortable label -->
      <span
        v-if="(!column.sortable && !isComapreTab) || isComapreTab"
        class="font-normal"
      >
        {{ column.label }}
      </span>

      <!-- Sortable column -->
      <SortingIcon
        v-if="column.sortable && !isComapreTab"
        :sortKey="column.key"
        :currentSort="sortByColumn"
        :sortOrder="sortByDir"
        @sort="handleSort"
        :key="column.label"
        :label="column.label"
      />
    </div>
  </div>
</template>

<script setup>
import { diamondSortColumns } from "@/utils/searchConstant.js";
import SortingIcon from "~/components/sorting/SortingIcon.vue";

const props = defineProps(["isComapreTab", "filterList", 'sortByColumn', 'sortByDir']);
const emit = defineEmits(['sortdata']);

// shallowRef: the column objects are module-level and their label is rewritten below; keep them non-reactive
const columns = shallowRef(diamondSortColumns ?? []);

const getModifiedColumns = computed(() => {
  let cols = [...columns.value];
  cols = cols.map((col) => {
    let code = col.key;

    if (props.filterList && Object.keys(props.filterList).length) {
      let text =
        Object.values(props.filterList).find(
          (item) => item.code == code
        )?.text ?? col.label;

      col.label = text?.toLowerCase()?.replace(/grade/g, '');
    }

    return col;
  });

  return cols;
});

function handleSort(key, order) {
  emit("sortdata", { key, order });
}
</script>