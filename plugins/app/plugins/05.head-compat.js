// Keeps Nuxt 2 `head()` component option working (15 files) on top of unhead (useHead):
// vue-meta keys are translated (`hid` -> `key`, `json` -> JSON-LD body, `body: true` -> body close).
const mapTag = (tag) => {
  const { hid, vmid, body, json, __dangerouslyDisableSanitizers, ...rest } = tag
  const out = { ...rest }
  if (hid || vmid) out.key = hid || vmid
  if (json !== undefined) out.innerHTML = JSON.stringify(json)
  if (body) out.tagPosition = 'bodyClose'
  return out
}

const toUnhead = (head = {}) => {
  const { meta, link, script, noscript, ...rest } = head
  const out = { ...rest }
  if (meta) out.meta = meta.map(mapTag)
  if (link) out.link = link.map(mapTag)
  if (script) out.script = script.map(mapTag)
  if (noscript) out.noscript = noscript.map(mapTag)
  return out
}

export { toUnhead }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    // Nuxt 2 `_uid` (used for aria-labelledby/for/id pairs) -> `this.uid`.
    // Counted per component type on this app instance: identical on server and client as long as the same
    // components render (a single global counter such as Vue's useId() shifts on any divergence).
    data() {
      const ctx = this.$.appContext
      const counters = (ctx.__uidCounters ||= {})
      const name = this.$options.name || this.$.type.__name || 'c'
      counters[name] = (counters[name] ?? -1) + 1
      return { uid: counters[name] }
    },
    created() {
      const headOption = this.$options.head
      if (typeof headOption === 'function') useHead(() => toUnhead(headOption.call(this)))
      else if (headOption) useHead(toUnhead(headOption))
    },
  })
})
