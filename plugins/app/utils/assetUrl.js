// Replacement for webpack `require('~/assets/images/...')` (not available with Vite).
// (Nuxt sets the Vite root to srcDir=app/, so glob keys start at /assets/...)
// Resolves a source asset path (alias `~/` or `@/`, static or dynamic) to its built URL.
const assets = import.meta.glob('/assets/images/**/*.{png,jpg,jpeg,webp,svg,gif,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function assetUrl(path) {
  const key = String(path).replace(/^(~|@)\//, '/')
  return assets[key] ?? ''
}
