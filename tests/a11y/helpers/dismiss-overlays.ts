import type { Page } from '@playwright/test';

export async function blockThirdPartyPopups(page: Page) {
  // Block Klaviyo scripts before any navigation — prevents the email popup from loading
  await page.route('**/*klaviyo*', route => route.abort());
}

export async function dismissOverlays(page: Page) {
  // Close Klaviyo popup if it already loaded (e.g. on pages where blocking wasn't set first)
  const klaviyo = page.locator('[aria-label="POPUP Form"]');
  if (await klaviyo.isVisible({ timeout: 2000 }).catch(() => false)) {
    const closeBtn = klaviyo.locator('button').last();
    await closeBtn.click({ force: true }).catch(async () => {
      await page.mouse.click(10, 10).catch(() => {});
    });
    await page.waitForTimeout(500);
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
}
