<!-- File: BaseTooltip.vue -->
<template>
  <div
    class="group relative z-10 flex items-center"
    :class="className"
    ref="wrapper"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @focusin="onHover"
    @focusout="onLeave"
  >
    <!-- Trigger wrapper -->
    <span
      class="inline-flex items-center"
    >
      <slot />
    </span>

    <!-- Tooltip -->
    <span
      ref="tooltip"
      aria-hidden="true"
      :class="[
        disableOnDesktop
          ? 'absolute mt-2 scale-95 hidden group-focus-within:block group-focus-within:scale-100 transition-all duration-200 ease-out transform pointer-events-none bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg z-50 font-normal capitalize'
          : 'absolute mt-2 scale-95 hidden sm:group-hover:block group-focus-within:block group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200 ease-out transform pointer-events-none bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg z-50 font-normal capitalize',
        finalPositionClass,
        customClass
      ]"
    >
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name : 'Tooltip',
  props: {
    text: {
      type: String,
      default: 'tooltip',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    className: {
      type: String,
      default: '',
    },
    ariaDescribedby: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    disableOnDesktop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      calculatedClass: '',
      isHovered: false,
      tooltipId: `tooltip-${this.uid}`,
    };
  },
  computed: {
    finalPositionClass() {
      return this.calculatedClass || this.getTooltipPositionClass(this.placement);
    },
  },
  beforeUnmount() {
    if (this.isHovered) {
      window.removeEventListener('resize', this.adjustPosition);
    }
  },
  methods: {
    onHover() {
      if (window.innerWidth < 640) return;
      if (this.disableOnDesktop) return;
      this.isHovered = true;
      this.adjustPosition();
      window.addEventListener('resize', this.adjustPosition);
    },
    onLeave() {
      if (window.innerWidth < 640) return;
      if (this.disableOnDesktop) return;
      this.isHovered = false;
      window.removeEventListener('resize', this.adjustPosition);
    },
    adjustPosition() {
      window.requestAnimationFrame(() => {
        const tooltip = this.$refs.tooltip;
        const wrapper = this.$refs.wrapper;
        if (!tooltip || !wrapper) return;

        const tooltipRect = tooltip.getBoundingClientRect();

        const willOverflowRight = tooltipRect.right > window.innerWidth;
        const willOverflowLeft = tooltipRect.left < 0;
        const willOverflowBottom = tooltipRect.bottom > window.innerHeight;

        if (willOverflowBottom) {
          this.calculatedClass = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
        } else if (willOverflowRight) {
          this.calculatedClass = 'top-full right-0 mt-2';
        } else if (willOverflowLeft) {
          this.calculatedClass = 'top-full left-0 mt-2';
        } else {
          this.calculatedClass = '';
        }
      });
    },
    getTooltipPositionClass(placement) {
      switch (placement) {
        case 'top':
          return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
        case 'right':
          return 'top-full right-0 mt-2';
        case 'left':
          return 'top-full left-0 mt-2';
        default:
          return 'top-full left-1/2 -translate-x-1/2 mt-2';
      }
    },
  },
};
</script>