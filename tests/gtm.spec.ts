import { test } from '@playwright/test'
// Dumps GTM dataLayer events after load + scrolling (used to compare Nuxt 2 vs Nuxt 4 behaviour)
test('gtm dump', async ({ page }) => {
  const path = process.env.GTM_PATH || '/diamonds/search/round/'
  await page.goto(path)
  await page.waitForTimeout(4000)
  for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(400) }
  await page.waitForTimeout(1500)
  const out = await page.evaluate(() => (window as any).dataLayer
    .filter((d: any) => d && d.event && !String(d.event).startsWith('gtm.'))
    .map((d: any) => `${d.event}|items=${d.ecommerce?.items?.length ?? '-'}|list=${d.ecommerce?.item_list_name ?? ''}|page=${d.pageType ?? ''}`))
  console.log('GTM', path, JSON.stringify(out))
  console.log('SCROLLY', await page.evaluate(() => Math.round(scrollY)), 'DOCH', await page.evaluate(() => document.documentElement.scrollHeight))
})
