import { test, expect } from '@playwright/test'

// Runtime smoke for the forms not yet covered by forms.spec.ts.
// API is mocked (real API rejects localhost with CORS). Collects uncaught page errors per page.
const PAGES = [
  '/cart/contact/',
  '/my-account/',
  '/care-plan/',
  '/cart/payment/',
  '/contact-adiamor/',
  '/auth/reset-password/',
]

for (const path of PAGES) {
  test(`form page renders without runtime errors: ${path}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.route(/afd\.adiamor\.com\/api\//, (r) => r.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, data: null, message: 'ok' }),
    }))
    await page.route(/klaviyo|ladesk|affirm|paypal|bolt|yotpo|iubenda|contentsquare|google|gtm/, (r) => r.abort())
    const res = await page.goto(path, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(3000)
    console.log('FORMDBG', path, 'status', res?.status(), 'forms', await page.locator('form').count(), 'errors', JSON.stringify(errors))
    expect(errors).toEqual([])
  })
}
