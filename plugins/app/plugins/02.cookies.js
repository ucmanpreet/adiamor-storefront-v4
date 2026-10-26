// Drop-in for cookie-universal-nuxt (`this.$cookies.get/set/remove/getAll`): objects are JSON-encoded,
// reads parse JSON, default path is '/', `maxAge` in seconds.
const isClient = typeof document !== 'undefined'

const parseAll = () => {
  const out = {}
  if (!isClient || !document.cookie) return out
  document.cookie.split('; ').forEach((pair) => {
    const idx = pair.indexOf('=')
    if (idx < 0) return
    try {
      out[decodeURIComponent(pair.slice(0, idx))] = decodeURIComponent(pair.slice(idx + 1))
    } catch (e) {
      /* ignore malformed cookie */
    }
  })
  return out
}

const parseValue = (raw) => {
  if (raw === undefined) return undefined
  try {
    return JSON.parse(raw)
  } catch (e) {
    return raw
  }
}

const cookies = {
  get(name, { parseJSON = true } = {}) {
    const raw = parseAll()[name]
    return parseJSON ? parseValue(raw) : raw
  },
  getAll({ parseJSON = true } = {}) {
    const all = parseAll()
    if (!parseJSON) return all
    return Object.fromEntries(Object.entries(all).map(([k, v]) => [k, parseValue(v)]))
  },
  set(name, value, opts = {}) {
    if (!isClient) return false
    const encoded = typeof value === 'string' ? value : JSON.stringify(value)
    const { path = '/', maxAge, expires, domain, sameSite, secure } = opts
    let str = `${encodeURIComponent(name)}=${encodeURIComponent(encoded)}; path=${path}`
    if (maxAge !== undefined) str += `; max-age=${maxAge}`
    if (expires) str += `; expires=${new Date(expires).toUTCString()}`
    if (domain) str += `; domain=${domain}`
    if (sameSite) str += `; samesite=${sameSite}`
    if (secure) str += '; secure'
    document.cookie = str
    return true
  },
  remove(name, opts = {}) {
    return cookies.set(name, '', { ...opts, maxAge: 0, expires: new Date(0) })
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('cookies', cookies)
})
