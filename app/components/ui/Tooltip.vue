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

<script setup>
const props = defineProps({
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
});

const uid = useId();

const calculatedClass = ref('');
const isHovered = ref(false);
const tooltipId = ref(`tooltip-${uid}`);

const wrapper = ref(null);
const tooltip = ref(null);

const finalPositionClass = computed(() => calculatedClass.value || getTooltipPositionClass(props.placement));

onBeforeUnmount(() => {
  if (isHovered.value) {
    window.removeEventListener('resize', adjustPosition);
  }
});

function onHover() {
  if (window.innerWidth < 640) return;
  if (props.disableOnDesktop) return;
  isHovered.value = true;
  adjustPosition();
  window.addEventListener('resize', adjustPosition);
}
function onLeave() {
  if (window.innerWidth < 640) return;
  if (props.disableOnDesktop) return;
  isHovered.value = false;
  window.removeEventListener('resize', adjustPosition);
}
function adjustPosition() {
  window.requestAnimationFrame(() => {
    const tooltipEl = tooltip.value;
    const wrapperEl = wrapper.value;
    if (!tooltipEl || !wrapperEl) return;

    const tooltipRect = tooltipEl.getBoundingClientRect();

    const willOverflowRight = tooltipRect.right > window.innerWidth;
    const willOverflowLeft = tooltipRect.left < 0;
    const willOverflowBottom = tooltipRect.bottom > window.innerHeight;

    if (willOverflowBottom) {
      calculatedClass.value = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    } else if (willOverflowRight) {
      calculatedClass.value = 'top-full right-0 mt-2';
    } else if (willOverflowLeft) {
      calculatedClass.value = 'top-full left-0 mt-2';
    } else {
      calculatedClass.value = '';
    }
  });
}
function getTooltipPositionClass(placement) {
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
}
</script>