<script>
// Embla-based replacement for vue-slick-carousel (same props subset, same imperative API: next/prev/currentSlide).
// Keeps the `slick-*` class names so existing component CSS/helpers keep working, and exposes slide visibility
// to assistive tech: slides outside the viewport get aria-hidden="true" and `inert` (not focusable / not read).
import { h, Fragment, Comment, Text } from 'vue'
import EmblaCarousel from 'embla-carousel'

const flatten = (nodes) => nodes.flatMap((node) => {
  if (node.type === Fragment) return flatten(node.children || [])
  if (node.type === Comment) return []
  if (node.type === Text && !String(node.children).trim()) return []
  return [node]
})

export default {
  name: 'EmblaCarousel',
  props: {
    infinite: { type: Boolean, default: false },
    slidesToShow: { type: Number, default: 1 },
    slidesToScroll: { type: Number, default: 1 },
    speed: { type: Number, default: 500 },
    responsive: { type: Array, default: () => [] },
    // accepted for API compatibility with the Slick settings object (unused)
    dots: { type: Boolean, default: false },
    arrows: { type: Boolean, default: false },
    touchThreshold: { type: Number, default: 5 },
  },
  data() {
    return { width: 0, inView: [], slideCount: 0 }
  },
  computed: {
    // Slick semantics: `breakpoint` = max viewport width for which the override applies (smallest match wins)
    activeSettings() {
      const match = [...this.responsive]
        .sort((a, b) => a.breakpoint - b.breakpoint)
        .find((r) => this.width && this.width <= r.breakpoint)
      return {
        slidesToShow: match?.settings?.slidesToShow ?? this.slidesToShow,
        slidesToScroll: match?.settings?.slidesToScroll ?? this.slidesToScroll,
      }
    },
  },
  mounted() {
    this.width = window.innerWidth
    this.onResize = () => { this.width = window.innerWidth }
    window.addEventListener('resize', this.onResize, { passive: true })
    this.init()
  },
  updated() {
    // slides or breakpoint settings changed
    if (this.embla) {
      this.embla.reInit(this.emblaOptions())
      this.syncInView()
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
    this.embla?.destroy()
  },
  methods: {
    emblaOptions() {
      return {
        loop: this.infinite,
        align: 'start',
        containScroll: this.infinite ? false : 'trimSnaps',
        slidesToScroll: this.activeSettings.slidesToScroll,
        duration: Math.round(this.speed / 16),
        inViewThreshold: 0.9,
      }
    },
    init() {
      this.embla = EmblaCarousel(this.$refs.viewport, this.emblaOptions())
      this.embla.on('select', this.syncInView).on('slidesInView', this.syncInView).on('reInit', this.syncInView)
      this.syncInView()
    },
    syncInView() {
      if (!this.embla) return
      this.inView = this.embla.slidesInView()
    },
    next() { this.embla?.scrollNext() },
    prev() { this.embla?.scrollPrev() },
    goTo(index) { this.embla?.scrollTo(index) },
    /** Index of the first slide in view (Slick `currentSlide()`). */
    currentSlide() {
      if (!this.embla) return 0
      const snap = this.embla.selectedScrollSnap()
      return Math.min(snap * this.activeSettings.slidesToScroll, Math.max(this.slideCount - 1, 0))
    },
  },
  render() {
    const slides = flatten(this.$slots.default?.() ?? [])
    this.slideCount = slides.length
    const basis = `${100 / this.activeSettings.slidesToShow}%`
    const ready = this.inView.length > 0
    return h('div', { class: 'slick-slider slick-initialized' }, [
      h('div', { class: 'slick-list', ref: 'viewport' }, [
        h('div', { class: 'slick-track' }, slides.map((vnode, index) => {
          const visible = !ready || this.inView.includes(index)
          return h('div', {
            key: vnode.key ?? index,
            class: ['slick-slide', { 'slick-active': visible }],
            'data-index': index,
            'aria-hidden': visible ? 'false' : 'true',
            inert: visible ? undefined : '',
            style: { flex: `0 0 ${basis}`, minWidth: 0 },
          }, [vnode])
        })),
      ]),
    ])
  },
}
</script>

<style>
.slick-slider { position: relative; display: block; }
.slick-list { overflow: hidden; }
.slick-track { display: flex; align-items: stretch; }
.slick-slide { height: auto; }
.slick-slide > div { height: 100%; }
</style>
