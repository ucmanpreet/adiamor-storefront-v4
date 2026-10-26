import { test, expect } from '@playwright/test'
// trailing slash + legacy redirects (client-side behaviour; static host adds real 301s)
for (const [from, expected] of [
  ['/faq', '/faq/'],
  ['/diamonds/search/round', '/diamonds/search/round/'],
  ['/education/glossary', '/education/glossary/a/'],
  ['/your-setting', '/design-your-own/ring/'],
  ['/faq/?x=1', '/faq/?x=1'],
  ['/engagement-rings/threestone/3-stone-diamond-ring-setting-with-half-moons/r3178-50?sku=R3178-50-WG14-Round', '/engagement-rings/threestone/3-stone-diamond-ring-setting-with-half-moons/r3178-50/?sku=R3178-50-WG14-Round'],
]) {
  test(`slash/redirect ${from}`, async ({ page }) => {
    await page.route('**/*klaviyo*', (r) => r.abort())
    await page.goto(from)
    await page.waitForTimeout(3500)
    const u = new URL(page.url())
    console.log('SLASH', from, '->', u.pathname + u.search, '| title:', (await page.title()).slice(0, 50))
    // compare path (+ query only when the case sets one); search pages append their default filters
    expect(expected.includes('?') ? u.pathname + u.search : u.pathname).toBe(expected)
  })
}
