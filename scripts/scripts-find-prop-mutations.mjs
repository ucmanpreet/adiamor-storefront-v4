// Finds `this.<prop> = ...` assignments to declared props (Vue 3 props are readonly; Vue 2 only warned).
import { parse, compileScript } from '@vue/compiler-sfc'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.vue') ? [p] : [] })
for (const f of ['app/components', 'app/pages', 'app/layouts'].flatMap(walk)) {
  const { descriptor } = parse(readFileSync(f, 'utf8'), { filename: f })
  if (!descriptor.script) continue
  let bindings
  try { bindings = compileScript(descriptor, { id: f }).bindings } catch { continue }
  const props = Object.entries(bindings || {}).filter(([, t]) => t === 'props').map(([k]) => k)
  const src = descriptor.script.content
  const lines = src.split('\n')
  for (const p of props) {
    const re = new RegExp(`this\\.${p}\\s*(=(?!=)|\\+=|-=|\\+\\+|--)`)
    lines.forEach((line, i) => { if (re.test(line) && !line.trim().startsWith('//')) console.log(`${f}:${descriptor.script.loc.start.line + i} ${line.trim().slice(0, 110)}`) })
  }
}
