import { test } from '@playwright/test'
// Changes a filter by user action and dumps GTM events (parity check against Nuxt 2)
test('filter change gtm', async ({ page }) => {
  await page.goto('/diamonds/search/round/')
  await page.waitForTimeout(4000)
  await page.getByRole('button', { name: /no, thanks/i }).click({ timeout: 4000 }).catch(() => {})
  const before = await page.evaluate(() => (window as any).dataLayer.filter((d: any) => d.event).length)
  // pick the first clickable filter option (shape icon buttons / checkboxes)
  await page.getByText('Princess', { exact: true }).first().click({ timeout: 5000 }).catch((e) => console.log('click failed', e.message.slice(0, 80)))
  await page.waitForTimeout(3000)
  const events = await page.evaluate((b) => (window as any).dataLayer.filter((d: any) => d.event).slice(b).map((d: any) => `${d.event}|items=${d.ecommerce?.items?.length ?? '-'}`), before)
  console.log('FILTER events after click', JSON.stringify(events), 'url', page.url().slice(0, 140))
})
