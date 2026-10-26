// Reliable "scroll this row into view" for vue-virtual-scroller 3 in page mode (verified in the prototype tests).
// Raw scrollToItem() is only correct when the window is at the top (called while scrolled it overshoots to the
// bottom) and rows are positioned from estimated sizes until measured. So: reset to top, scroll once, then align
// the real row element. Rows must expose `data-index` (pass :data-index="index" to DynamicScrollerItem).
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const visibleRow = (root, index) => {
  const el = root.querySelector(`[data-index="${index}"]`)
  if (!el || !el.getBoundingClientRect().height) return null
  const view = el.closest('.vue-recycle-scroller__item-view') || el
  return getComputedStyle(view).visibility === 'hidden' ? null : el
}

export async function scrollToRow(scroller, index, { attempts = 4 } = {}) {
  if (!scroller || index < 0) return false
  const root = scroller.$el
  for (let attempt = 0; attempt < attempts; attempt++) {
    window.scrollTo(0, 0)
    await wait(120)
    scroller.scrollToItem(index)
    await wait(250)
    const el = visibleRow(root, index)
    if (el) {
      el.scrollIntoView({ block: 'start' })
      return true
    }
  }
  return false
}
