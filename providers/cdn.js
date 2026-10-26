import { joinURL } from 'ufo'

// Custom CDN provider (ImageKit-style `?tr=w-X,h-Y,q-Z,f-fmt`), ported from the Nuxt 2 provider.
const provider = {
  getImage(src, { modifiers = {}, baseURL } = {}) {
    const { width, height, quality, format } = modifiers

    const operations = []
    if (width) operations.push(`w-${width}`)
    if (height) operations.push(`h-${height}`)
    if (quality) operations.push(`q-${quality}`)
    if (format) operations.push(`f-${format}`)

    const query = operations.length ? `?tr=${operations.join(',')}` : ''

    return {
      url: joinURL(baseURL, src + query),
    }
  },
}

// @nuxt/image providers are default-exported setup functions
export default () => provider
