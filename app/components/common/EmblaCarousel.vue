<template>
  <div class="slick-slider slick-initialized">
    <div class="slick-list" ref="viewport">
      <div class="slick-track">
        <div
          v-for="(vnode, index) in getSlides()"
          :key="vnode.key ?? index"
          :class="['slick-slide', { 'slick-active': isVisible(index) }]"
          :data-index="index"
          :aria-hidden="isVisible(index) ? 'false' : 'true'"
          :inert="isVisible(index) ? undefined : ''"
          :style="{ flex: `0 0 ${basis}`, minWidth: 0 }"
        >
          <SlideVNode :vnode="vnode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Embla-based replacement for vue-slick-carousel (same props subset, same imperative API: next/prev/currentSlide).
// Keeps the `slick-*` class names so existing component CSS/helpers keep working, and exposes slide visibility
// to assistive tech: slides outside the viewport get aria-hidden="true" and `inert` (not focusable / not read).
import { Fragment, Comment, Text } from 'vue'
import EmblaCarousel from 'embla-carousel'

const flatten = (nodes) => nodes.flatMap((node) => {
  if (node.type === Fragment) return flatten(node.children || [])
  if (node.type === Comment) return []
  if (node.type === Text && !String(node.children).trim()) return []
  return [node]
})

// Functional component that renders an already-created slot vnode as-is
const SlideVNode = (p) => p.vnode

const props = defineProps({
  infinite: { type: Boolean, default: false },
  slidesToShow: { type: Number, default: 1 },
  slidesToScroll: { type: Number, default: 1 },
  speed: { type: Number, default: 500 },
  responsive: { type: Array, default: () => [] },
  // accepted for API compatibility with the Slick settings object (unused)
  dots: { type: Boolean, default: false },
  arrows: { type: Boolean, default: false },
  touchThreshold: { type: Number, default: 5 },
})

const slots = useSlots()

const viewport = ref(null)
const width = ref(0)
const inView = ref([])
let slideCount = 0
let embla = null
let onResize = null

// Slick semantics: `breakpoint` = max viewport width for which the override applies (smallest match wins)
const activeSettings = computed(() => {
  const match = [...props.responsive]
    .sort((a, b) => a.breakpoint - b.breakpoint)
    .find((r) => width.value && width.value <= r.breakpoint)
  return {
    slidesToShow: match?.settings?.slidesToShow ?? props.slidesToShow,
    slidesToScroll: match?.settings?.slidesToScroll ?? props.slidesToScroll,
  }
})

const basis = computed(() => `${100 / activeSettings.value.slidesToShow}%`)
const ready = computed(() => inView.value.length > 0)

function getSlides() {
  const slides = flatten(slots.default?.() ?? [])
  slideCount = slides.length
  return slides
}
function isVisible(index) {
  return !ready.value || inView.value.includes(index)
}

onMounted(() => {
  width.value = window.innerWidth
  onResize = () => { width.value = window.innerWidth }
  window.addEventListener('resize', onResize, { passive: true })
  init()
})

onUpdated(() => {
  // slides or breakpoint settings changed
  if (embla) {
    embla.reInit(emblaOptions())
    syncInView()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  embla?.destroy()
})

function emblaOptions() {
  return {
    loop: props.infinite,
    align: 'start',
    containScroll: props.infinite ? false : 'trimSnaps',
    slidesToScroll: activeSettings.value.slidesToScroll,
    duration: Math.round(props.speed / 16),
    inViewThreshold: 0.9,
  }
}
function init() {
  embla = EmblaCarousel(viewport.value, emblaOptions())
  embla.on('select', syncInView).on('slidesInView', syncInView).on('reInit', syncInView)
  syncInView()
}
function syncInView() {
  if (!embla) return
  inView.value = embla.slidesInView()
}
function next() { embla?.scrollNext() }
function prev() { embla?.scrollPrev() }
function goTo(index) { embla?.scrollTo(index) }
/** Index of the first slide in view (Slick `currentSlide()`). */
function currentSlide() {
  if (!embla) return 0
  const snap = embla.selectedScrollSnap()
  return Math.min(snap * activeSettings.value.slidesToScroll, Math.max(slideCount - 1, 0))
}

defineExpose({ next, prev, goTo, currentSlide })
</script>

<style>
.slick-slider { position: relative; display: block; }
.slick-list { overflow: hidden; }
.slick-track { display: flex; align-items: stretch; }
.slick-slide { height: auto; }
.slick-slide > div { height: 100%; }
</style>
