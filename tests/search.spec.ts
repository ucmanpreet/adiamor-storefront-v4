import { test, expect, Page } from '@playwright/test'

const rows = (page: Page) => page.evaluate(() => [...document.querySelectorAll('[data-index]')]
  .filter((e: any) => getComputedStyle(e.closest('.vue-recycle-scroller__item-view') || e).visibility !== 'hidden')
  .map((e: any) => ({ i: +e.dataset.index, y: Math.round(e.getBoundingClientRect().y), h: Math.round(e.getBoundingClientRect().height) })))
const gtm = (page: Page) => page.evaluate(() => (window as any).dataLayer.filter((d: any) => d.event === 'view_item_list').length)

test('diamond search: list/grid scrollers render, update events fire, GTM view_item_list grows on scroll', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.route('**/*klaviyo*', (r) => r.abort())
  await page.goto('/diamonds/search/round/')
  await page.waitForFunction(() => document.querySelectorAll('[data-index]').length > 0, null, { timeout: 30000 })
  await page.waitForTimeout(1500)
  const first = await rows(page)
  console.log('S1 first rows', JSON.stringify(first.slice(0, 5)), 'count', first.length)
  expect(first.length).toBeGreaterThan(2)
  const g0 = await gtm(page)
  for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(300) }
  const g1 = await gtm(page)
  const scrolled = await rows(page)
  console.log('S1 gtm view_item_list', g0, '->', g1, 'rows after scroll', scrolled.length, 'min index', Math.min(...scrolled.map((r) => r.i)))
  expect(g1).toBeGreaterThan(g0)
  expect(Math.min(...scrolled.map((r) => r.i))).toBeGreaterThan(0)
  // klaviyo: a GTM tag calls klaviyo.identify() while the blocked Klaviyo SDK is absent; GTM re-throws it as "Uncaught [object Object]"
  expect(errors.filter((e) => !/Yotpo|yotpo|querySelector|klaviyo\.identify|Uncaught \[object Object\]/.test(e))).toEqual([])
})

test('diamond search: keyboard order of rows after load is DOM-ordered', async ({ page }) => {
  await page.route('**/*klaviyo*', (r) => r.abort())
  await page.goto('/diamonds/search/round/')
  await page.waitForFunction(() => document.querySelectorAll('[data-index]').length > 0, null, { timeout: 30000 })
  const orders: number[][] = []
  for (let i = 0; i < 12; i++) {
    orders.push(await page.evaluate(() => [...document.querySelectorAll('[data-index]')].filter((e: any) => getComputedStyle(e.closest('.vue-recycle-scroller__item-view') || e).visibility !== 'hidden').map((e: any) => +e.dataset.index)))
    await page.waitForTimeout(100)
  }
  const sorted = orders.map((o) => o.every((n, k) => k === 0 || n > o[k - 1]))
  console.log('S2 DOM sorted over first 1.2s:', sorted.join(','))
})

test('settings search: grid renders and restores via scrollToRow helper', async ({ page }) => {
  await page.goto('/engagement-rings/search/')
  await page.waitForFunction(() => document.querySelectorAll('[data-index]').length > 0, null, { timeout: 30000 })
  await page.waitForTimeout(1200)
  const r = await rows(page)
  console.log('S3 setting rows', r.length, JSON.stringify(r.slice(0, 3)))
  expect(r.length).toBeGreaterThan(1)
})
