// Small replacements for the lodash helpers the app used (lodash dependency removed).

/** Trailing-edge debounce that keeps `this` (needed for Options API watchers) and exposes `.cancel()`. */
export function debounce(fn, wait = 0) {
  let timer = null
  function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, wait)
  }
  debounced.cancel = () => {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

/** First occurrence wins, like lodash uniqBy(array, 'key'). */
export function uniqBy(items = [], key) {
  const seen = new Set()
  return items.filter((item) => {
    const id = item?.[key]
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}
