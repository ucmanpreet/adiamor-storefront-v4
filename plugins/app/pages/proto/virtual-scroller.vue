<template>
  <div class="p-4">
    <header class="mb-4 h-40 bg-stone-100 p-4">
      <h1 class="text-xl">Virtual scroller prototype (vue-virtual-scroller 3.0.5, page-mode)</h1>
      <div class="mt-2 flex gap-2">
        <button id="btn-grid" type="button" class="border px-3 py-1" @click="viewMode = 'grid'">Grid</button>
        <button id="btn-list" type="button" class="border px-3 py-1" @click="viewMode = 'list'">List</button>
        <button id="btn-shuffle" type="button" class="border px-3 py-1" @click="shuffle">Re-sort</button>
      </div>
    </header>

    <ClientOnly>
      <DynamicScroller
        v-if="viewMode === 'grid'"
        ref="dynamicScroller"
        :items="chunkedItems"
        :min-item-size="320"
        key-field="id"
        page-mode
        :buffer="gridBuffer"
        :prerender="6"
        emit-update
        @update="onScrollerUpdate"
      >
        <template #default="{ item, index, active }">
          <DynamicScrollerItem :item="item" :active="active" :data-index="index">
            <div class="grid grid-cols-4 gap-4 pb-4" :data-row="item.id">
              <article v-for="p in item.data" :key="p.sku" class="h-80 border p-3" :data-sku="p.sku">
                <h2 class="text-sm">{{ p.name }}</h2>
                <button type="button" class="mt-2 border px-2 py-1 text-sm" :aria-label="`View ${p.name}`">View</button>
              </article>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <DynamicScroller
        v-else
        ref="dynamicScrollerList"
        :items="items"
        key-field="sku"
        page-mode
        :buffer="listBuffer"
        :prerender="10"
        :min-item-size="80"
        emit-update
        @update="onScrollerUpdate"
      >
        <template #default="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
            :size-dependencies="sizeDepsFor(item)"
          >
            <div class="min-h-[80px] border-b p-3" :data-row-sku="item.sku" tabindex="0" role="button"
              :aria-expanded="expandedSku === item.sku" @click="toggle(item)" @keydown.enter.prevent="toggle(item)"
              @keydown.space.prevent="toggle(item)">
              <span>{{ item.name }}</span>
              <div v-if="expandedSku === item.sku" class="mt-2 h-40 bg-stone-50" :data-details="item.sku">
                Details for {{ item.sku }}
              </div>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </ClientOnly>
  </div>
</template>

<script>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

const TOTAL = 1500
const makeItems = () =>
  Array.from({ length: TOTAL }, (_, i) => ({ sku: `SKU-${i}`, name: `Diamond ${i}` }))

export default {
  name: 'VirtualScrollerProto',
  components: { DynamicScroller, DynamicScrollerItem },
  data() {
    return {
      viewMode: 'list',
      items: makeItems(),
      expandedSku: null,
      firedProducts: new Set(),
      updateCalls: 0,
      lastUpdate: null,
    }
  },
  computed: {
    gridBuffer() { return 600 },
    listBuffer() { return 400 },
    chunkedItems() {
      const rows = []
      for (let i = 0; i < this.items.length; i += 4) {
        rows.push({ id: `row-${i / 4}`, data: this.items.slice(i, i + 4) })
      }
      return rows
    },
  },
  mounted() {
    // Test hook (prototype only)
    window.__proto = {
      state: () => ({
        updateCalls: this.updateCalls,
        lastUpdate: this.lastUpdate,
        firedCount: this.firedProducts.size,
        rendered: document.querySelectorAll('[data-row-sku],[data-row]').length,
        scrollY: window.scrollY,
        viewMode: this.viewMode,
      }),
      scrollToItem: (n) => (this.$refs.dynamicScroller || this.$refs.dynamicScrollerList).scrollToItem(n),
      scroller: () => this.$refs.dynamicScroller || this.$refs.dynamicScrollerList,
      scrollToRow: (i, sel) => this.scrollToRow(i, sel),
      setMode: (m) => { this.viewMode = m },
    }
  },
  methods: {
    onScrollerUpdate(start, end, visibleStart, visibleEnd) {
      this.updateCalls++
      this.lastUpdate = [start, end, visibleStart, visibleEnd]
      const slice = this.viewMode === 'grid'
        ? this.chunkedItems.slice(visibleStart, visibleEnd + 3).flatMap((r) => r.data)
        : this.items.slice(visibleStart, visibleEnd + 6)
      slice.forEach((p) => this.firedProducts.add(p.sku))
    },
    // Verified helper. In v3.0.5 page-mode, scrollToItem()/scrollToPosition() are only correct when the
    // window is at the top; called while already scrolled they overshoot to the bottom. So reset to top
    // first, scroll once, then align the real element.
    async scrollToRow(index, selector) {
      const scroller = this.$refs.dynamicScroller || this.$refs.dynamicScrollerList
      for (let attempt = 1; attempt <= 4; attempt++) {
        window.scrollTo(0, 0)
        await new Promise((r) => setTimeout(r, 120))
        scroller.scrollToItem(index)
        await new Promise((r) => setTimeout(r, 250))
        const el = document.querySelector(selector)
        if (el && el.getBoundingClientRect().height > 0 && getComputedStyle(el.closest('.vue-recycle-scroller__item-view') || el).visibility !== 'hidden') {
          el.scrollIntoView({ block: 'start' })
          return attempt
        }
      }
      return -1
    },
    sizeDepsFor(item) {
      return this.$route.query.sd === '0' ? undefined : [this.expandedSku === item.sku]
    },
    toggle(item) {
      this.expandedSku = this.expandedSku === item.sku ? null : item.sku
    },
    shuffle() {
      this.items = [...this.items].reverse()
    },
  },
}
</script>
