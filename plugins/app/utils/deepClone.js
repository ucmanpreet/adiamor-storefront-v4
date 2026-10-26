// structuredClone() cannot clone Vue reactive proxies (Vue 2 objects were plain, Vue 3 state is proxied).
// Unwraps proxies recursively and copies plain data.
import { toRaw } from 'vue'

export function deepClone(value) {
  const raw = toRaw(value)
  if (raw === null || typeof raw !== 'object') return raw
  if (raw instanceof Date) return new Date(raw)
  if (Array.isArray(raw)) return raw.map(deepClone)
  return Object.fromEntries(Object.entries(raw).map(([key, val]) => [key, deepClone(val)]))
}
