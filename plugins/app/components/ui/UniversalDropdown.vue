<template>
  <div class="relative w-full" v-click-outside="onClickOutside">

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
          :ref="`option-${index}`"
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

<script>
export default {
  name: 'AccessibleDropdown',
  props: {
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
  },

  data() {
    return {
      isOpen:           false,
      dropdownPosition: 'bottom',
      typeaheadBuffer:  '',
      typeaheadTimer:   null,
    };
  },

  computed: {
    dropdownId() {
      return `dropdown-${this.uid}`;
    },

    currentValue() {
      return this.modelValue || this.selectedValue;
    },

    selectedLabel() {
      if (!this.currentValue || !this.options.length) return '';
      const found = this.options.find(
        o => String(o[this.optionValue]) === String(this.currentValue)
      );
      return found ? found[this.optionLabel] : '';
    },

    isFloating() {
      return this.isOpen || !!this.currentValue;
    },
  },

  watch: {
    isOpen(val) {
      if (val) {
        this.$nextTick(() => {
          this.adjustDropdownPosition();
          this.$refs.keyCapture?.focus();
        });
      }
    },
  },

  methods: {

    // ── Announce helper ──────────────────────────────────────────────
    announce(message) {
      // Global aria-announce handles NVDA Forms Mode — no local live region needed
      this.$bus.emit('aria-announce', message);
    },

    // ── Click toggle — announces expanded/collapsed for mouse/touch users ──
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.adjustDropdownPosition();
          this.$refs.keyCapture?.focus();
          this.announce(
            `${this.ariaLabel || this.placeholder} expanded. ` +
            `${this.options.length} option${this.options.length !== 1 ? 's' : ''} available. ` +
            `Use arrow keys to navigate, Enter to select, Escape to close.`
          );
        });
      } else {
        this.announce(`${this.ariaLabel || this.placeholder} collapsed.`);
      }
    },

    // ── Trigger button keydown ───────────────────────────────────────
    onTriggerKeydown(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (this.isOpen) {
          this.$nextTick(() => this.focusOption(this.initialFocusIndex()));
          return;
        }
        this.isOpen = true;
        this.$nextTick(() => {
          this.focusOption(this.initialFocusIndex());
          this.announce(
            `${this.ariaLabel || this.placeholder} expanded. ` +
            `${this.options.length} option${this.options.length !== 1 ? 's' : ''} available. ` +
            `Use arrow keys to navigate, Enter to select, Escape to close.`
          );
        });

      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.$nextTick(() => {
            this.focusOption(this.initialFocusIndex());
            this.announce(
              `${this.ariaLabel || this.placeholder} expanded. Use arrow keys to navigate, Enter to select, Escape to close.`
            );
          });
        } else {
          this.focusOption(this.initialFocusIndex());
        }

      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.$nextTick(() => {
            this.focusOption(this.options.length - 1);
            this.announce(
              `${this.ariaLabel || this.placeholder} expanded. Use arrow keys to navigate, Enter to select, Escape to close.`
            );
          });
        }

      } else if (e.key === 'Tab') {
        if (this.isOpen) {
          e.preventDefault();
          this.focusOption(this.initialFocusIndex());
        }

      } else if (e.key === 'Escape') {
        if (this.isOpen) {
          e.preventDefault();
          e.stopPropagation();
          this.isOpen = false;
          this.announce(`${this.ariaLabel || this.placeholder} collapsed.`);
        }
      } else if (e.key.length === 1) {
        if (!this.isOpen) {
          this.isOpen = true;
          this.$nextTick(() => this.handleTypeahead(e.key));
        } else {
          this.handleTypeahead(e.key);
        }
      }
    },

    // ── Option keydown ───────────────────────────────────────────────
    onOptionKeydown(e, item, index) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.selectOption(item);

      } else if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        const next = index < this.options.length - 1 ? index + 1 : 0;
        this.focusOption(next);
        this.announce(this.options[next][this.optionLabel]);

      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        const prev = index > 0 ? index - 1 : this.options.length - 1;
        this.focusOption(prev);
        this.announce(this.options[prev][this.optionLabel]);

      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.isOpen = false;
        this.$el.querySelector('button').focus();
        this.announce(`${this.ariaLabel || this.placeholder} collapsed.`);
      } else if (e.key.length === 1) {
        this.handleTypeahead(e.key);
      }
    },

    // ── Focus helper ─────────────────────────────────────────────────
    focusOption(index) {
      const ref = this.$refs[`option-${index}`];
      const el  = Array.isArray(ref) ? ref[0] : ref;
      el?.focus();
    },

    initialFocusIndex() {
      const idx = this.options.findIndex(
        o => String(o[this.optionValue]) === String(this.currentValue)
      );
      return idx >= 0 ? idx : 0;
    },

    // ── Typeahead ─────────────────────────────────────────────────────
    handleTypeahead(char) {
      clearTimeout(this.typeaheadTimer);
      this.typeaheadBuffer += char.toLowerCase();
      const match = this.options.findIndex(o =>
        String(o[this.optionLabel]).toLowerCase().startsWith(this.typeaheadBuffer)
      );
      if (match >= 0) {
        this.focusOption(match);
        this.announce(this.options[match][this.optionLabel]);
      }
      this.typeaheadTimer = setTimeout(() => { this.typeaheadBuffer = ''; }, 500);
    },

    // ── Click outside ────────────────────────────────────────────────
    onClickOutside() {
      this.isOpen = false;
    },

    // ── Select ───────────────────────────────────────────────────────
    selectOption(item) {
      const val = String(item[this.optionValue]);
      this.$emit('update:modelValue', val);
      this.$emit('change', val);
      this.isOpen = false;
      // setTimeout (macrotask) ensures Vue has updated aria-expanded="false" in DOM
      // before focus() fires — prevents NVDA reading "expanded" on the trigger button
      setTimeout(() => {
        this.$el.querySelector('button').focus();
        this.announce(`${item[this.optionLabel]} selected.`);
      }, 0);
    },

    onHiddenInput(e) {
      const char = e.target.value.slice(-1);
      if (char) this.handleTypeahead(char);
      e.target.value = '';
    },

    onKeyCaptureKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.isOpen = false;
        this.$el.querySelector('button').focus();
        this.announce(`${this.ariaLabel || this.placeholder} collapsed.`);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.focusOption(this.initialFocusIndex());
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.focusOption(this.options.length - 1);
      } else if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        this.focusOption(this.initialFocusIndex());
      } else if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        this.focusOption(this.options.length - 1);
        this.announce(this.options[this.options.length - 1][this.optionLabel]);
      } else if (e.key.length === 1) {
        this.handleTypeahead(e.key);
      }
    },

    // ── Dropdown position ────────────────────────────────────────────
    adjustDropdownPosition() {
      const wrapper = this.$el;
      if (!wrapper) return;

      const wrapperRect     = wrapper.getBoundingClientRect();
      const modal           = this.$el.closest('.overflow-hidden');
      const containerTop    = modal ? modal.getBoundingClientRect().top    : 0;
      const containerHeight = modal ? modal.getBoundingClientRect().height : window.innerHeight;
      const spaceBelow      = containerHeight - (wrapperRect.bottom - containerTop);
      const spaceAbove      = wrapperRect.top - containerTop;
      const listContainer   = this.$refs.listContainer;
      const dropdownHeight  = listContainer ? listContainer.offsetHeight : 200;

      this.dropdownPosition = this.forcePosition === 'top' ? 'top'
        : this.forcePosition === 'bottom' ? 'bottom'
        : spaceBelow < dropdownHeight && spaceAbove > dropdownHeight ? 'top' : 'bottom';
    },
  },
};
</script>

<style scoped>
.placeholder::after {
  content: "*";
  color: red;
}
</style>
