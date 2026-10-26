// Usage: node scripts/check-sfc.mjs <file.vue> [...]  (or no args: every SFC under app/)
// For each SFC: compiles <script setup> + template, then reports
//  - legacy Vue 2 / Nuxt 2 leftovers in the script (this., $store, $axios, $cookies, $config, $refs, $emit ...)
//  - template identifiers that are NOT bound by <script setup> (they would resolve on `_ctx` and be undefined)
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const GLOBALS = new Set(['$route', '$router', '$config', '$bus', '$formatPrice', '$getCurrencySymbol', '$asset', '$isMobile', '$isTabAndMobile',
  '$sanitize', '$hydrated', '$getVisitorCode', '$openHelpDesk', '$callGlobal', '$openWindow', '$getLocation', '$userProperties', '$attrs', '$slots', '$props',
  '$t', '$fetch', '$pinia', '$nuxt', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Date', 'Boolean', 'window', 'document', 'console', 'parseInt', 'parseFloat',
  'isNaN', 'encodeURIComponent', 'decodeURIComponent', 'Intl', 'undefined', 'null', 'navigator', 'location', 'localStorage', 'sessionStorage', 'Promise', 'Set', 'Map', 'RegExp', 'Error', 'Symbol', 'URL'])
const LEGACY = [/\bthis\./, /\$store\b/, /\$axios\b/, /\$cookies\b/, /\$refs\b/, /\$emit\b/, /\$nextTick\b/, /\$el\b/, /\$parent\b/, /\$forceUpdate\b/, /\$nuxt\b/, /\bprocess\.(client|server|browser)\b/, /^\s*export default\b/m, /\bhead\s*\(\)\s*\{/]
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.vue') ? [p] : [] })
const files = process.argv.slice(2).length ? process.argv.slice(2) : walk('app')
let bad = 0
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  const { descriptor, errors } = parse(src, { filename: f })
  const problems = errors.map((e) => `parse: ${e.message}`)
  let bindings
  if (descriptor.script || descriptor.scriptSetup) {
    try {
      const compiled = compileScript(descriptor, { id: f })
      bindings = compiled.bindings
      const code = (descriptor.scriptSetup || descriptor.script).content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
      if (!descriptor.scriptSetup) problems.push('not <script setup>')
      LEGACY.forEach((re) => { if (re.test(code)) problems.push(`legacy: ${re}`) })
    } catch (e) { problems.push('script: ' + e.message.split('\n')[0]) }
  }
  if (descriptor.template) {
    const r = compileTemplate({ source: descriptor.template.content, filename: f, id: f, compilerOptions: { bindingMetadata: bindings, prefixIdentifiers: true } })
    problems.push(...r.errors.map((e) => `template: ${typeof e === 'string' ? e : e.message}`))
    const unbound = new Set([...r.code.matchAll(/_ctx\.([\w$]+)/g)].map((m) => m[1]).filter((n) => !GLOBALS.has(n) && !GLOBALS.has('$' + n)))
    if (unbound.size) problems.push(`unbound in template: ${[...unbound].join(', ')}`)
  }
  if (problems.length) { bad++; console.log(`${f}\n  - ${problems.join('\n  - ')}`) }
}
console.log(`\n${bad}/${files.length} files with problems`)
process.exitCode = bad ? 1 : 0
