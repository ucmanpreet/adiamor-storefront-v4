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

<script>
import { diamondSortColumns } from "@/utils/searchConstant.js";
import SortingIcon from "~/components/sorting/SortingIcon.vue";
export default {
  name : "SortingHeader",
  components: { SortingIcon },
  props: ["isComapreTab", "filterList", 'sortByColumn', 'sortByDir'],

  data() {
    return {
      columns: diamondSortColumns ?? [],
    };
  },
  computed: {
    getModifiedColumns() {
      let columns = [...this.columns];
      columns = columns.map((col) => {
        let code = col.key;

        if (this.filterList && Object.keys(this.filterList).length) {
          let text =
            Object.values(this.filterList).find(
              (item) => item.code == code
            )?.text ?? col.label;

          col.label = text?.toLowerCase()?.replace(/grade/g, '');
        }

        return col;
      });

      return columns;
    },
  },

  methods: {
    handleSort(key, order) {
      this.$emit("sortdata", { key, order });
    },
  },
};
</script>