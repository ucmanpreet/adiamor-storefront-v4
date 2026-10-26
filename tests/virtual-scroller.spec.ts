import { test, expect, Page } from '@playwright/test'

const st = (page: Page) => page.evaluate(() => (window as any).__proto.state())
const go = async (page: Page) => {
  const logs: string[] = []
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`) })
  page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`))
  await page.goto('/proto/virtual-scroller')
  await page.waitForFunction(() => (window as any).__proto && document.querySelectorAll('[data-row-sku]').length > 0)
  return logs
}

test('T1 update event gets (start,end,visibleStart,visibleEnd) with buffer/prerender/emit-update', async ({ page }) => {
  await go(page)
  await page.mouse.wheel(0, 3000); await page.waitForTimeout(500)
  const s = await st(page)
  expect(s.updateCalls).toBeGreaterThan(0)
  expect(s.lastUpdate).toHaveLength(4)
  s.lastUpdate.forEach((n: any) => expect(typeof n).toBe('number'))
  console.log('T1 lastUpdate', JSON.stringify(s.lastUpdate), 'calls', s.updateCalls)
})

test('T2 analytics-style fired SKUs grow with scroll, once per SKU', async ({ page }) => {
  await go(page)
  const a = (await st(page)).firedCount
  for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(200) }
  const b = (await st(page)).firedCount
  console.log('T2 fired before/after', a, b)
  expect(b).toBeGreaterThan(a)
  expect(b).toBeLessThanOrEqual(1500)
})

test.fail('T3 WITH deprecated size-dependencies: row does NOT re-measure (documents v3 behaviour)', async ({ page }) => {
  await go(page)
  await page.mouse.wheel(0, 2000); await page.waitForTimeout(400)
  const before = await st(page)
  const vis = await page.evaluate(() => [...document.querySelectorAll('[data-row-sku]')].map((e: any) => ({ s: e.dataset.rowSku, y: e.getBoundingClientRect().y })).filter((o) => o.y > 120 && o.y < 500).slice(0, 2))
  const sku = vis[0].s
  const row = page.locator(`[data-row-sku="${sku}"]`)
  const next = page.locator(`[data-row-sku="${vis[1].s}"]`)
  const y0 = (await next.boundingBox())!.y
  await row.click(); await page.waitForTimeout(1500)
  const y1 = (await next.boundingBox())!.y
  const after = await st(page)
  console.log('T3 sku', sku, 'next row y', y0, '->', y1, 'scrollY', before.scrollY, '->', after.scrollY, 'rendered', after.rendered)
  expect(await page.locator(`[data-details="${sku}"]`).count()).toBe(1)
  expect(y1).toBeGreaterThan(y0 + 100)           // next row pushed down by expanded details (no overlap)
  expect(Math.abs(after.scrollY - before.scrollY)).toBeLessThanOrEqual(5)
  expect(after.rendered).toBeLessThan(150)
})

test('T4 scrollToItem lands on requested row (from top)', async ({ page }) => {
  await go(page)
  await page.evaluate(() => (window as any).__proto.scrollToItem(800))
  await page.waitForTimeout(600)
  const found = await page.locator('[data-row-sku="SKU-800"]').count()
  const box = found ? await page.locator('[data-row-sku="SKU-800"]').boundingBox() : null
  console.log('T4 found', found, 'box', JSON.stringify(box))
  expect(found).toBe(1)
  expect(box!.y).toBeGreaterThanOrEqual(-5)
  expect(box!.y).toBeLessThan(900)
})

test('T5 re-sort shows new first item (no stale recycled content)', async ({ page }) => {
  await go(page)
  await page.click('#btn-shuffle'); await page.waitForTimeout(500)
  const first = await page.locator('[data-row-sku]').first().getAttribute('data-row-sku')
  console.log('T5 first after reverse', first)
  expect(first).toBe('SKU-1499')
})

test('T6 keyboard: Tab focuses rows in DOM order, Enter/Space toggle, focus kept', async ({ page }) => {
  await go(page)
  await page.waitForTimeout(1500)
  await page.locator('#btn-shuffle').focus()
  await page.keyboard.press('Tab')
  const a = await page.evaluate(() => document.activeElement?.getAttribute('data-row-sku'))
  await page.keyboard.press('Tab')
  const b = await page.evaluate(() => document.activeElement?.getAttribute('data-row-sku'))
  console.log('T6 tab order', a, b)
  expect(a).toBe('SKU-0'); expect(b).toBe('SKU-1')
  await page.keyboard.press('Enter'); await page.waitForTimeout(300)
  expect(await page.locator('[data-details="SKU-1"]').count()).toBe(1)
  expect(await page.evaluate(() => document.activeElement?.getAttribute('data-row-sku'))).toBe('SKU-1')
  await page.keyboard.press('Space'); await page.waitForTimeout(300)
  expect(await page.locator('[data-details="SKU-1"]').count()).toBe(0)
})

test('T7 grid mode: renders, update fires, scrollToRow helper lands on row', async ({ page }) => {
  await go(page)
  await page.click('#btn-grid'); await page.waitForSelector('[data-row]', { state: 'attached' }); await page.waitForTimeout(800)
  await page.mouse.wheel(0, 2500); await page.waitForTimeout(500)
  const s = await st(page)
  expect(s.viewMode).toBe('grid')
  expect(s.lastUpdate).toHaveLength(4)
  const attempts = await page.evaluate(() => (window as any).__proto.scrollToRow(200, '[data-row="row-200"]'))
  await page.waitForTimeout(300)
  const y = await page.locator('[data-row="row-200"]').first().boundingBox()
  console.log('T7 scrollToRow(200) attempts', attempts, 'row-200 y', y?.y)
  expect(attempts).toBeGreaterThan(0)
  expect(Math.abs(y!.y)).toBeLessThan(40)
  console.log('T7 grid ok rendered', (await st(page)).rendered)
})

test('T3b expand re-measures WITHOUT deprecated size-dependencies (?sd=0)', async ({ page }) => {
  await page.goto('/proto/virtual-scroller?sd=0')
  await page.waitForFunction(() => document.querySelectorAll('[data-row-sku]').length > 0); await page.waitForTimeout(800)
  await page.mouse.wheel(0, 2000); await page.waitForTimeout(500)
  const vis = await page.evaluate(() => [...document.querySelectorAll('[data-row-sku]')].map((e: any) => ({ s: e.dataset.rowSku, y: e.getBoundingClientRect().y })).filter((o) => o.y > 120 && o.y < 500).slice(0, 2))
  const y0 = (await page.locator(`[data-row-sku="${vis[1].s}"]`).boundingBox())!.y
  const sy0 = await page.evaluate(() => scrollY)
  await page.locator(`[data-row-sku="${vis[0].s}"]`).click(); await page.waitForTimeout(600)
  const y1 = (await page.locator(`[data-row-sku="${vis[1].s}"]`).boundingBox())!.y
  console.log('T3b next row y', y0, '->', y1, 'scrollY', sy0, '->', await page.evaluate(() => scrollY))
  expect(y1).toBeGreaterThan(y0 + 100)
})

test('T9 DOM order after first paint: time until sorted by index', async ({ page }) => {
  await page.goto('/proto/virtual-scroller')
  const t0 = Date.now(); let sortedAt = -1
  for (let i = 0; i < 40; i++) {
    const order: string[] = await page.evaluate(() => [...document.querySelectorAll('[data-row-sku]')].map((e: any) => e.dataset.rowSku))
    const nums = order.map((o) => +o.split('-')[1])
    if (nums.length > 5 && nums.every((n, k) => k === 0 || n > nums[k - 1])) { sortedAt = Date.now() - t0; break }
    await page.waitForTimeout(50)
  }
  console.log('T9 sorted after ms', sortedAt)
  expect(sortedAt).toBeGreaterThanOrEqual(0)
})

test('T10 raw scrollToItem called while already scrolled overshoots (documents v3.0.5 behaviour)', async ({ page }) => {
  await go(page)
  await page.click('#btn-grid'); await page.waitForSelector('[data-row]', { state: 'attached' }); await page.waitForTimeout(800)
  await page.evaluate(() => (window as any).__proto.scroller().scrollToItem(200)); await page.waitForTimeout(500)
  const y1 = await page.evaluate(() => scrollY)
  await page.evaluate(() => (window as any).__proto.scroller().scrollToItem(200)); await page.waitForTimeout(500)
  const y2 = await page.evaluate(() => scrollY)
  console.log('T10 scrollY after 1st/2nd raw scrollToItem(200):', y1, y2)
  expect(y2).toBeGreaterThan(y1 + 10000) // known overshoot; app must use scrollToRow helper
})

test('T8 no Vue warnings/hydration errors on load + scroll', async ({ page }) => {
  const logs = await go(page)
  await page.mouse.wheel(0, 2000); await page.waitForTimeout(400)
  console.log('T8 logs', JSON.stringify(logs))
  expect(logs.filter((l) => /hydrat|Vue warn|pageerror/i.test(l))).toEqual([])
})
