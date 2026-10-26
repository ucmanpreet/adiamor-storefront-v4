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

<script setup>
import Modal from "~/components/ui/Modal.vue";
import InfoFilter from "~/components/filter/InfoFilter.vue";
import Icon from "~/components/common/Icon.vue";

const props = defineProps({
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
});

const emit = defineEmits(["update:selectedTab"]);

const uid = useId();

const code = ref("");
const isModalOpen = ref(false);
const title = ref("");

const formattedTabs = computed(() => Array.isArray(props.tabs) ? props.tabs : Object.values(props.tabs));
const selectedIndex = computed(() => {
  let currentIndex = formattedTabs.value.findIndex(
    (item) => item?.code === props.selectedTab
  );
  return currentIndex === -1 ? Number(props.selectedTab) || 0 : currentIndex;
});

function closeModal() {
  isModalOpen.value = false;
}
function assignData(index, tab) {
  emit("update:selectedTab", tab?.code ? tab : index);
}
function getTabId(index) {
  return `tab-${uid}-${index}`;
}

// ✅ Arrow key navigation as per ARIA tabs pattern
function handleKeydown(event) {
  const tabs = formattedTabs.value;
  const totalTabs = tabs.length;
  let newIndex = selectedIndex.value;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      newIndex = (selectedIndex.value + 1) % totalTabs; // wraps to first
      break;
    case "ArrowLeft":
    case "ArrowUp":
      event.preventDefault();
      newIndex = (selectedIndex.value - 1 + totalTabs) % totalTabs; // wraps to last
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
  assignData(newIndex, tabs[newIndex]);
  nextTick(() => {
    document.getElementById(getTabId(newIndex))?.focus();
  });
}
</script>

<style scoped>
.active svg path {
  stroke: #306499 !important;
}
</style>
