import { test } from '@playwright/test'

const PAGES = (process.env.PAGES || '/').split(',')

for (const path of PAGES) {
  test(`smoke ${path}`, async ({ page }) => {
    const logs: string[] = []
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${m.type()}] ${m.text().slice(0, 300)}`) })
    page.on('pageerror', (e) => logs.push(`[pageerror] ${(e.stack || e.message).slice(0, 700)}`))
    page.on('requestfailed', (r) => { if (!/yotpo|google|gtm|klaviyo|iubenda|contentsquare|affirm|paypal|bolt|liveagent|clarity|doubleclick|facebook/i.test(r.url())) logs.push(`[requestfailed] ${r.url().slice(0, 120)}`) })
    const res = await page.goto(path, { waitUntil: 'load' })
    await page.waitForTimeout(2500)
    const title = await page.title()
    const h1 = await page.locator('h1').first().textContent({ timeout: 1500 }).catch(() => null)
    const unique = [...new Set(logs)]
    console.log(`SMOKE ${path} status=${res?.status()} title="${title}" h1="${(h1 || '').trim().slice(0, 60)}" logs=${unique.length}`)
    unique.filter((l) => !/made a reactive object/.test(l)).slice(0, 25).forEach((l) => console.log('   ', l))
  })
}
