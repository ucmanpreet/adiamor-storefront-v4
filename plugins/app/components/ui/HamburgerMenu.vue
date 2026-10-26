<template>
  <button
    type="button"
    @click.stop="toggleMenu"
    class="group relative w-4 h-3 flex flex-col justify-between items-center z-50
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
    :aria-expanded="mobileNav.toString()"
    aria-controls="mobile-menu"
    aria-label="Navigation menu"
  >
    <!-- Line 1 (decorative) -->
    <span
      class="block w-4 h-[0.05rem] bg-black/50 transform transition duration-300 ease-in-out origin-center"
      :class="mobileNav ? 'rotate-45 translate-y-[0.35rem]' : ''"
      aria-hidden="true"
    ></span>

    <!-- Line 2 (decorative) -->
    <span
      class="block w-4 h-[0.05rem] bg-black/50 transition-all duration-300 ease-in-out"
      :class="mobileNav ? 'opacity-0' : ''"
      aria-hidden="true"
    ></span>

    <!-- Line 3 (decorative) -->
    <span
      class="block w-4 h-[0.05rem] bg-black/50 transform transition duration-300 ease-in-out origin-center"
      :class="mobileNav ? '-rotate-45 -translate-y-[0.35rem]' : ''"
      aria-hidden="true"
    ></span>
  </button>
</template>

<script>
export default {
    name : 'HamburgerMenu',
    props: {
        mobileNav: {
            type: Boolean,
            default: false
        }
    },
  methods: {
    toggleMenu() {
      this.$emit('toggle-menu', !this.mobileNav)
    }
  }
}
</script>