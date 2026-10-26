// Compiles every SFC template with the Vue 3 compiler and prints errors (migration helper).
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.vue') ? [p] : [] })
const files = ['app/components', 'app/pages', 'app/layouts'].flatMap(walk)
let bad = 0
const kinds = {}
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  const { descriptor, errors } = parse(src, { filename: f })
  const errs = [...errors]
  if (descriptor.template) {
    let bindings
    try { bindings = (descriptor.script || descriptor.scriptSetup) ? compileScript(descriptor, { id: f }).bindings : undefined } catch (e) { errs.push({ message: 'script: ' + e.message }) }
    const r = compileTemplate({ source: descriptor.template.content, filename: f, id: f, compilerOptions: { bindingMetadata: bindings } })
    errs.push(...r.errors.map((e) => (typeof e === 'string' ? { message: e } : e)))
  }
  if (errs.length) {
    bad++
    for (const e of errs) {
      const m = (e.message || String(e)).split('\n')[0]
      const line = e.loc ? e.loc.start.line + (descriptor.template?.loc.start.line || 1) - 1 : '?'
      kinds[m] = (kinds[m] || 0) + 1
      console.log(`${f}:${line} ${m}`)
    }
  }
}
console.log(`\n${bad}/${files.length} files with template errors`)
console.log(kinds)
