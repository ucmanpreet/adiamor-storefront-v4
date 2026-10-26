// Vue 3 renders `<template>` without v-if/v-for/v-slot as a native (inert) <template> element. Vue 2 treated it as a transparent wrapper.
import { parse } from '@vue/compiler-sfc'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
const fix = process.argv.includes('--fix')
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.vue') ? [p] : [] })
let total = 0
for (const f of ['app/components', 'app/pages', 'app/layouts'].flatMap(walk)) {
  let src = readFileSync(f, 'utf8')
  const { descriptor } = parse(src, { filename: f })
  if (!descriptor.template) continue
  const hits = []
  const walkAst = (n, isRoot) => {
    if (n.type === 1 && n.tag === 'template' && !isRoot) {
      const hasDirective = (n.props || []).some((p) => p.type === 7)
      if (!hasDirective) hits.push(n)
    }
    ;(n.children || []).forEach((c) => walkAst(c, false))
  }
  walkAst(descriptor.template.ast, true)
  if (!hits.length) continue
  total += hits.length
  console.log(`${f}: ${hits.map((h) => h.loc.start.line + descriptor.template.loc.start.line - 1 - 1).join(', ')}`)
  if (fix) {
    hits.sort((a, b) => b.loc.start.offset - a.loc.start.offset)
    for (const n of hits) {
      const text = src.slice(n.loc.start.offset, n.loc.end.offset)
      const openEnd = text.indexOf('>') + 1
      const inner = text.slice(openEnd, text.lastIndexOf('</template>'))
      src = src.slice(0, n.loc.start.offset) + inner + src.slice(n.loc.end.offset)
    }
    writeFileSync(f, src)
  }
}
console.log('bare <template> elements:', total)
