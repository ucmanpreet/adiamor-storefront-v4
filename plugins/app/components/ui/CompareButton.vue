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

<script>
import Icon from "~/components/common/Icon.vue";
export default {
  name : 'CompareButton',
  components: { Icon },
  props: {
    item: { type: [Object, Number], required: true },
    isPair: { type: Boolean, default: false },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  watch: {
    '$store.state.compareList.length'() {
      this.assignData();
    },
    '$store.state.comparePairList.length'() {
      this.assignData();
    },
  },
  mounted() {
    this.assignData();
  },
  methods: {
    assignData() {
      const compareList = this.isPair
        ? this.$store.state.comparePairList
        : this.$store.state.compareList;

      if (compareList && Object.values(compareList).length) {
        const compareData = Object.values(compareList);
        this.isChecked = compareData.some(
          (data) => this.getItemSku(data) === this.item?.sku
        );
      } else {
        this.isChecked = false;
      }
    },
    getItemSku(item) {
      return item?.sku;
    },
    async toggleCompare() {
      const mutation = this.isPair ? 'setPairCompareList' : 'setCompareList';
      this.$store.commit(mutation, this.item);
      this.$store.commit('setGTMData', this.item);
      this.$store.dispatch('runGtmEvent', {
        store: this.$store,
        action_type: !this.isChecked ? 'add_to_compare' : 'remove_from_compare',
      });
    },
  },
};
</script>

<style scoped>
/* Optional: Add focus ring for keyboard navigation */
input:focus-visible {
  outline: 2px solid #2563eb; /* Tailwind blue-600 */
  outline-offset: 2px;
}
</style>