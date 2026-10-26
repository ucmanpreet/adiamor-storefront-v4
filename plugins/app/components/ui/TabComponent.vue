<!-- File: Tabs.vue -->
<template>
  <div class="abs-container">
    <!-- Tab headers -->
    <div
      :class="['flex w-full', 'flex-row']"
      role="tablist"
      :aria-label="tablistLabel || 'Tabs'"
      @keydown="handleKeydown"
    >
      <button
        v-for="(tab, index) in formattedTabs"
        :key="index"
        type="button"
        role="tab"
        :id="getTabId(index)"
        :aria-selected="index === selectedIndex ? 'true' : 'false'"
        tabindex="0"
        :class="[
          'group relative min-w-0 flex items-center justify-between overflow-hidden px-2 sm:px-4 py-[0.563rem] text-xs sm:text-sm border-b whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          index === selectedIndex
            ? 'font-medium border-black text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            : 'border-white text-black',
          'text-center',
        ]"
        @click="assignData(index, tab)"
      >
        <template v-if="tab?.text">
          <!-- Icon -->
          <template v-if="tab?.icon">
            <Icon
              name="compare"
              v-show="selectedIndex !== index"
              class="w-4 h-4 mr-1 text-gray-black pointer-events-none"
              aria-hidden="true"
            />
            <Icon
              name="compare-fill"
              v-show="selectedIndex === index"
              class="w-4 h-4 mr-1 text-primary pointer-events-none"
              aria-hidden="true"
            />
          </template>

          <!-- Label -->
          <span class="relative z-10">{{ tab?.text }}</span>

          <span class="sr-only">
            {{ index === selectedIndex ? '(selected)' : '' }}
          </span>
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import Modal from "~/components/ui/Modal.vue";
import InfoFilter from "~/components/filter/InfoFilter.vue";
import Icon from "~/components/common/Icon.vue";

export default {
  name: "TabComponent",
  components: { Modal, InfoFilter, Icon },
  props: {
    tabs: {
      type: [Array, Object],
      required: true,
    },
    selectedFilter: {
      type: [Array, Object],
    },
    selectedTab: {
      type: [Number, String],
      default: 0,
    },
    tablistLabel: {
      type: String,
      default: "Tabs",
    },
  },
  data() {
    return { code: "", isModalOpen: false, title: "" };
  },
  methods: {
    closeModal() {
      this.isModalOpen = false;
    },
    assignData(index, tab) {
      this.$emit("update:selectedTab", tab?.code ? tab : index);
    },
    getTabId(index) {
      return `tab-${this.uid}-${index}`;
    },

    // ✅ Arrow key navigation as per ARIA tabs pattern
    handleKeydown(event) {
      const tabs = this.formattedTabs;
      const totalTabs = tabs.length;
      let newIndex = this.selectedIndex;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          newIndex = (this.selectedIndex + 1) % totalTabs; // wraps to first
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          newIndex = (this.selectedIndex - 1 + totalTabs) % totalTabs; // wraps to last
          break;
        case "Home":
          event.preventDefault();
          newIndex = 0;
          break;
        case "End":
          event.preventDefault();
          newIndex = totalTabs - 1;
          break;
        default:
          return;
      }

      // Select and focus the new tab
      this.assignData(newIndex, tabs[newIndex]);
      this.$nextTick(() => {
        document.getElementById(this.getTabId(newIndex))?.focus();
      });
    },
  },
  computed: {
    formattedTabs() {
      return Array.isArray(this.tabs) ? this.tabs : Object.values(this.tabs);
    },
    selectedIndex() {
      let currentIndex = this.formattedTabs.findIndex(
        (item) => item?.code === this.selectedTab
      );
      return currentIndex === -1 ? Number(this.selectedTab) || 0 : currentIndex;
    },
  },
};
</script>

<style scoped>
.active svg path {
  stroke: #306499 !important;
}
</style>
