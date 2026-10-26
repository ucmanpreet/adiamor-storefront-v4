<template>
  <div class="border-b">
    <!-- Accordion Header -->
    <h2 :id="headingId" class="flex items-center w-full">
      <!-- Accordion toggle button — title text, proper aria-expanded/aria-controls -->
      <button
        type="button"
        class="flex items-center uppercase py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        :aria-expanded="isOpen.toString()"
        :aria-controls="panelId"
        @click="toggle"
      >
        <span class="font-normal flex items-center gap-1.5" :class="className">
          <span class="text-xs font-semibold uppercase tracking-wider text-stone-700 group-hover:text-stone-900 transition-colors">
            {{ title }}
          </span>
        </span>
      </button>

      <!-- Info Button — sibling of toggle (not nested inside it), shown inline after title -->
      <template
        v-if="['diamond_cut_grade','diamond_color_grade','diamond_clarity_grade','diamond_polish','diamond_symmetry','diamond_fluorescence'].includes(code)"
      >
        <span
          class="relative flex items-center"
          v-click-outside="onClickOutside"
          @keydown.esc.stop.prevent="closeInfo"
        >
          <button
            type="button"
            ref="infoButton"
            class="ml-1 p-1 min-w-[2rem] min-h-[2rem] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
            :aria-label="`More information about ${title}`"
            :aria-expanded="isModalOpen.toString()"
            :aria-controls="popoverId"
            @click.stop="toggleInfo"
            :class="parentClass"
          >
            <Icon name="info" class="w-4 h-4" aria-hidden="true" />
          </button>

          <Popover
            v-if="isModalOpen"
            :id="popoverId"
            ref="popover"
            :aria-label="`${title} information`"
            :heading="title"
            :modalTitle="code"
            @close="closeInfo"
            :placement="code === 'diamond_cut_grade'
              ? 'top-2 right-0 left-0 -ml-5 top-0 text-sm max-h-56 overflow-auto !w-56'
              : 'left-0 bottom-12 text-sm -ml-12 max-h-56 overflow-auto !w-56'"
          >
            <InfoFilter :modalTitle="code" />
          </Popover>
        </span>
      </template>

      <!-- Spacer — fills gap so chevron stays right; clicking it also toggles -->
      <span class="flex-1 py-2 cursor-pointer" @click="toggle" aria-hidden="true"></span>

      <!-- Chevron — decorative, aria-hidden; real toggle is the title button above -->
      <span
        class="py-2 flex-shrink-0 cursor-pointer"
        @click="toggle"
        aria-hidden="true"
      >
        <svg
          class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200"
          :class="[isOpen ? 'rotate-180' : '', parentClass]"
          fill="none" stroke="currentColor" stroke-width="2.5"
          viewBox="0 0 24 24" aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </h2>

    <!-- Accordion Panel -->
    <div
      v-show="isOpen"
      :id="panelId"
      class="flex flex-col pb-2"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Popover from "~/components/product/Popover.vue";
import Icon from "~/components/common/Icon.vue";
import InfoFilter from "~/components/filter/InfoFilter.vue";

const props = defineProps({
  title: { type: String, required: true },
  code: { type: String },
  isOpen: { type: Boolean, default: false },
  className: { type: String, default: "" },
  parentClass: { type: String, default: "" },
  type: { type: String, default: "pdp" }
});

const emit = defineEmits(["toggle"]);

const nuxtApp = useNuxtApp();
const uid = useId();

const isModalOpen = ref(false);
const popover = ref(null);
const infoButton = ref(null);

watch(isModalOpen, (val) => {
  if (val) {
    nextTick(() => {
      // Popover's single root element receives :id="popoverId" via attribute fallthrough (was popover.$el)
      const popoverEl = popover.value ? document.getElementById(popoverId.value) : null;
      if (!popoverEl) return;
      const focusable = popoverEl.querySelector('button, a, [tabindex]:not([tabindex="-1"]), input');
      if (focusable) focusable.focus();
      else popoverEl.focus();
    });
  } else {
    nextTick(() => {
      infoButton.value?.focus();
    });
  }
});

const headingId = computed(() => `accordion-heading-${uid}`);
const panelId = computed(() => `accordion-panel-${uid}`);
const popoverId = computed(() => `accordion-popover-${uid}`);

function toggle() {
  if (nuxtApp.$isMobile && props.type == 'search') return;
  emit("toggle");
}
function toggleInfo() {
  isModalOpen.value = !isModalOpen.value;
}
function closeInfo() {
  isModalOpen.value = false;
}
function onClickOutside() {
  isModalOpen.value = false;
}
</script>