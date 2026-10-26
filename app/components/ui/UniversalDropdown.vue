<template>
  <div class="relative w-full" ref="root" v-click-outside="onClickOutside">

    <!-- Trigger Button -->
    <div>
      <button
        type="button"
        :id="`${dropdownId}-trigger`"
        @click="toggleDropdown"
        @keydown="onTriggerKeydown"
        class="inline-flex items-center justify-between w-full text-left pt-6 pb-2 px-4 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-white focus:ring-1 focus:ring-primary min-h-10 relative disabled:bg-gray-50"
        :class="[inputClass, disabled ? 'opacity-50 cursor-not-allowed' : '']"
        :disabled="disabled"
        :aria-expanded="isOpen.toString()"
        aria-haspopup="true"
        :aria-controls="`${dropdownId}-listbox`"
        :aria-label="selectedLabel ? `${selectedLabel}, ${ariaLabel || placeholder}` : (ariaLabel || placeholder)"
        :aria-required="required ? 'true' : undefined"
      >
        <!-- Floating placeholder — aria-hidden: aria-label is the authoritative name -->
        <span
          aria-hidden="true"
          class="absolute transition-all pointer-events-none"
          :class="isFloating
                ? 'top-2 -translate-y-0 text-[11px] bg-white px-1 left-3 text-black placeholder'
                : 'top-1/2 -translate-y-1/2 text-sm left-3 text-black opacity-0'"
        >
          {{ placeholder }}
        </span>

        <!-- Selected label -->
        <span v-if="selectedLabel" aria-hidden="true" class="truncate pr-2">{{ selectedLabel }}</span>
        <span v-else aria-hidden="true" class="text-black truncate relative -translate-y-[42%] pr-2" :class="{'placeholder' : !isFloating}">{{ isFloating ? '&nbsp;' : placeholder }}</span>

        <!-- Chevron -->
        <svg
          class="-mr-1 ml-2 h-5 w-5 flex-none"
          :class="{
            '-translate-y-[42%]' : !isFloating,
            'rotate-180' : isOpen && forcePosition === 'top'
          }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      :id="`${dropdownId}-listbox`"
      :aria-hidden="(!isOpen).toString()"
      class="origin-top-right absolute z-[1000003] inset-x-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      :class="dropdownPosition === 'top' ? 'bottom-full mb-2 mt-0' : ''"
      role="menu"
      :aria-label="ariaLabel || placeholder"
    >
      <div class="py-1 divide-y divide-gray-100 max-h-96 overflow-auto" :style="{ maxHeight: maxHeight }" ref="listContainer">

        <!-- Hidden input for iOS typeahead -->
        <input
          ref="keyCapture"
          type="text"
          class="absolute opacity-0 w-0 h-0 pointer-events-none"
          aria-hidden="true"
          tabindex="-1"
          autocomplete="off"
          @input="onHiddenInput"
          @keydown="onKeyCaptureKeydown"
        />

        <!-- Empty state -->
        <div
          v-if="!options || options.length === 0"
          class="px-4 py-2 text-sm text-gray-500"
        >
          No items found
        </div>

        <!-- Option buttons — no role="option"/aria-selected: NVDA announces those automatically
              which causes ", selected" noise. announce() in selectOption handles feedback. -->
        <button
          v-for="(item, index) in options"
          :key="index"
          :ref="(el) => setOptionRef(index, el)"
          type="button"
          @click="selectOption(item)"
          @keydown="onOptionKeydown($event, item, index)"
          :aria-current="String(item[optionValue]) === String(currentValue) ? 'true' : undefined"
          :class="[
            String(item[optionValue]) === String(currentValue) ? 'bg-gray-200 font-semibold' : '',
            'flex gap-2 items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100'
          ]"
        >
          {{ item[optionLabel] }}
          <span v-if="item.default_name" class="text-gray-400 text-xs ml-auto hidden sm:inline-flex">{{ item.default_name }}</span>
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
defineOptions({ name: 'AccessibleDropdown' });

const props = defineProps({
  modelValue:    { type: [String, Number], default: '' },
  selectedValue: { type: [String, Number], default: '' },
  options:       { type: Array,            default: () => [] },
  placeholder:   { type: String,           default: 'Select' },
  inputClass:    { type: String,           default: '' },
  optionLabel:   { type: String,           default: 'label' },
  optionValue:   { type: String,           default: 'value' },
  disabled:      { type: Boolean,          default: false },
  required:      { type: Boolean,          default: false },
  ariaLabel:     { type: String,           default: '' },
  forcePosition: { type: String,           default: '' },
  maxHeight:     { type: String,           default: '24rem' },
});

const emit = defineEmits(['update:modelValue', 'change']);

const { $bus } = useNuxtApp();
const uid = useId();

const isOpen = ref(false);
const dropdownPosition = ref('bottom');
const typeaheadBuffer = ref('');
let typeaheadTimer = null;

const root = ref(null);
const keyCapture = ref(null);
const listContainer = ref(null);
// Option buttons live in a v-for with dynamic names: keep them in a plain object keyed by index
const optionRefs = {};
function setOptionRef(index, el) {
  if (el) optionRefs[`option-${index}`] = el;
  else delete optionRefs[`option-${index}`];
}

const dropdownId = computed(() => `dropdown-${uid}`);
const currentValue = computed(() => props.modelValue || props.selectedValue);
const selectedLabel = computed(() => {
  if (!currentValue.value || !props.options.length) return '';
  const found = props.options.find(
    o => String(o[props.optionValue]) === String(currentValue.value)
  );
  return found ? found[props.optionLabel] : '';
});
const isFloating = computed(() => isOpen.value || !!currentValue.value);

watch(isOpen, (val) => {
  if (val) {
    nextTick(() => {
      adjustDropdownPosition();
      keyCapture.value?.focus();
    });
  }
});

// ── Announce helper ──────────────────────────────────────────────
function announce(message) {
  // Global aria-announce handles NVDA Forms Mode — no local live region needed
  $bus.emit('aria-announce', message);
}

// ── Click toggle — announces expanded/collapsed for mouse/touch users ──
function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      adjustDropdownPosition();
      keyCapture.value?.focus();
      announce(
        `${props.ariaLabel || props.placeholder} expanded. ` +
        `${props.options.length} option${props.options.length !== 1 ? 's' : ''} available. ` +
        `Use arrow keys to navigate, Enter to select, Escape to close.`
      );
    });
  } else {
    announce(`${props.ariaLabel || props.placeholder} collapsed.`);
  }
}

// ── Trigger button keydown ───────────────────────────────────────
function onTriggerKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (isOpen.value) {
      nextTick(() => focusOption(initialFocusIndex()));
      return;
    }
    isOpen.value = true;
    nextTick(() => {
      focusOption(initialFocusIndex());
      announce(
        `${props.ariaLabel || props.placeholder} expanded. ` +
        `${props.options.length} option${props.options.length !== 1 ? 's' : ''} available. ` +
        `Use arrow keys to navigate, Enter to select, Escape to close.`
      );
    });

  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!isOpen.value) {
      isOpen.value = true;
      nextTick(() => {
        focusOption(initialFocusIndex());
        announce(
          `${props.ariaLabel || props.placeholder} expanded. Use arrow keys to navigate, Enter to select, Escape to close.`
        );
      });
    } else {
      focusOption(initialFocusIndex());
    }

  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (!isOpen.value) {
      isOpen.value = true;
      nextTick(() => {
        focusOption(props.options.length - 1);
        announce(
          `${props.ariaLabel || props.placeholder} expanded. Use arrow keys to navigate, Enter to select, Escape to close.`
        );
      });
    }

  } else if (e.key === 'Tab') {
    if (isOpen.value) {
      e.preventDefault();
      focusOption(initialFocusIndex());
    }

  } else if (e.key === 'Escape') {
    if (isOpen.value) {
      e.preventDefault();
      e.stopPropagation();
      isOpen.value = false;
      announce(`${props.ariaLabel || props.placeholder} collapsed.`);
    }
  } else if (e.key.length === 1) {
    if (!isOpen.value) {
      isOpen.value = true;
      nextTick(() => handleTypeahead(e.key));
    } else {
      handleTypeahead(e.key);
    }
  }
}

// ── Option keydown ───────────────────────────────────────────────
function onOptionKeydown(e, item, index) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    selectOption(item);

  } else if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
    e.preventDefault();
    const next = index < props.options.length - 1 ? index + 1 : 0;
    focusOption(next);
    announce(props.options[next][props.optionLabel]);

  } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
    e.preventDefault();
    const prev = index > 0 ? index - 1 : props.options.length - 1;
    focusOption(prev);
    announce(props.options[prev][props.optionLabel]);

  } else if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    isOpen.value = false;
    root.value.querySelector('button').focus();
    announce(`${props.ariaLabel || props.placeholder} collapsed.`);
  } else if (e.key.length === 1) {
    handleTypeahead(e.key);
  }
}

// ── Focus helper ─────────────────────────────────────────────────
function focusOption(index) {
  const ref = optionRefs[`option-${index}`];
  const el  = Array.isArray(ref) ? ref[0] : ref;
  el?.focus();
}

function initialFocusIndex() {
  const idx = props.options.findIndex(
    o => String(o[props.optionValue]) === String(currentValue.value)
  );
  return idx >= 0 ? idx : 0;
}

// ── Typeahead ─────────────────────────────────────────────────────
function handleTypeahead(char) {
  clearTimeout(typeaheadTimer);
  typeaheadBuffer.value += char.toLowerCase();
  const match = props.options.findIndex(o =>
    String(o[props.optionLabel]).toLowerCase().startsWith(typeaheadBuffer.value)
  );
  if (match >= 0) {
    focusOption(match);
    announce(props.options[match][props.optionLabel]);
  }
  typeaheadTimer = setTimeout(() => { typeaheadBuffer.value = ''; }, 500);
}

// ── Click outside ────────────────────────────────────────────────
function onClickOutside() {
  isOpen.value = false;
}

// ── Select ───────────────────────────────────────────────────────
function selectOption(item) {
  const val = String(item[props.optionValue]);
  emit('update:modelValue', val);
  emit('change', val);
  isOpen.value = false;
  // setTimeout (macrotask) ensures Vue has updated aria-expanded="false" in DOM
  // before focus() fires — prevents NVDA reading "expanded" on the trigger button
  setTimeout(() => {
    root.value.querySelector('button').focus();
    announce(`${item[props.optionLabel]} selected.`);
  }, 0);
}

function onHiddenInput(e) {
  const char = e.target.value.slice(-1);
  if (char) handleTypeahead(char);
  e.target.value = '';
}

function onKeyCaptureKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    isOpen.value = false;
    root.value.querySelector('button').focus();
    announce(`${props.ariaLabel || props.placeholder} collapsed.`);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    focusOption(initialFocusIndex());
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusOption(props.options.length - 1);
  } else if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault();
    focusOption(initialFocusIndex());
  } else if (e.key === 'Tab' && e.shiftKey) {
    e.preventDefault();
    focusOption(props.options.length - 1);
    announce(props.options[props.options.length - 1][props.optionLabel]);
  } else if (e.key.length === 1) {
    handleTypeahead(e.key);
  }
}

// ── Dropdown position ────────────────────────────────────────────
function adjustDropdownPosition() {
  const wrapper = root.value;
  if (!wrapper) return;

  const wrapperRect     = wrapper.getBoundingClientRect();
  const modal           = wrapper.closest('.overflow-hidden');
  const containerTop    = modal ? modal.getBoundingClientRect().top    : 0;
  const containerHeight = modal ? modal.getBoundingClientRect().height : window.innerHeight;
  const spaceBelow      = containerHeight - (wrapperRect.bottom - containerTop);
  const spaceAbove      = wrapperRect.top - containerTop;
  const dropdownHeight  = listContainer.value ? listContainer.value.offsetHeight : 200;

  dropdownPosition.value = props.forcePosition === 'top' ? 'top'
    : props.forcePosition === 'bottom' ? 'bottom'
    : spaceBelow < dropdownHeight && spaceAbove > dropdownHeight ? 'top' : 'bottom';
}
</script>

<style scoped>
.placeholder::after {
  content: "*";
  color: red;
}
</style>
