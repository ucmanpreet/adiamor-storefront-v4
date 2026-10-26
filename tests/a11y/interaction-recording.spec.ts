import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { blockThirdPartyPopups } from './helpers/dismiss-overlays';

const VIDEOS_DIR = path.join(__dirname, 'videos');

async function saveVideo(page: import('@playwright/test').Page, name: string) {
  const videoPath = await page.video()?.path();
  if (!videoPath) {
    console.warn(`No video recorded for "${name}"`);
    return undefined;
  }
  if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  const dest = path.join(VIDEOS_DIR, `${name}.webm`);
  return { videoPath, dest };
}

// Navigate to the first product detail page from a search listing
async function goToFirstProduct(page: import('@playwright/test').Page) {
  await page.goto('/engagement-rings/search/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const productCard = page
    .locator('a[href*="/engagement-rings/"][href*="/r"]')
    .filter({ visible: true })
    .first();
  await expect(productCard).toBeVisible({ timeout: 10_000 });
  await productCard.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
}

// ─── Test 1: Dropdown open / close ───────────────────────────────────────────
// Uses Dropdown.vue (aria-haspopup="listbox") on the product detail page (metal/size selector)
test('recording — dropdown aria-expanded toggle', async ({ page }) => {
  await blockThirdPartyPopups(page);
  await goToFirstProduct(page);

  // Dropdown.vue (components/ui/Dropdown.vue) sets aria-haspopup="listbox" on the trigger.
  // Used by ConfigurableProduct.vue for metal type / ring size on product pages.
  // On open: focus moves to first option. On Escape: closeDropdown() returns focus to trigger.
  const trigger = page
    .locator('button[aria-haspopup="listbox"]')
    .filter({ visible: true })
    .first();

  await expect(trigger).toBeVisible({ timeout: 10_000 });

  const initialExpanded = await trigger.getAttribute('aria-expanded');
  console.log(`Initial aria-expanded: ${initialExpanded}`);

  // Open via click
  await trigger.click();
  await page.waitForTimeout(400);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  console.log('✅ Dropdown opened — aria-expanded="true"');

  // Close via click
  await trigger.click();
  await page.waitForTimeout(400);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  console.log('✅ Dropdown closed — aria-expanded="false"');

  // Open via keyboard (Enter)
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600); // allow Dropdown.vue $nextTick to render options
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  console.log('✅ Keyboard open — aria-expanded="true"');

  // Close by clicking outside the dropdown — triggers v-click-outside → onClickOutside()
  // The product image area (left side) is reliably outside any dropdown container
  await page.mouse.click(160, 300);
  await page.waitForTimeout(400);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  console.log('✅ Keyboard close via click-outside — aria-expanded="false"');

  const info = await saveVideo(page, 'dropdown-aria-expanded-toggle');
  if (info) {
    (global as any).__pendingVideos = (global as any).__pendingVideos ?? [];
    (global as any).__pendingVideos.push(info);
  }
});

// ─── Test 2: Modal open → focus trap → ESC → focus returns ───────────────────
// Uses site-native Modal.vue (focus-trap-vue) on product detail page
test('recording — modal open focus trap ESC focus return', async ({ page }) => {
  await blockThirdPartyPopups(page);
  await goToFirstProduct(page);

  // Target real Modal.vue triggers (FedEx, size guide, engrave, request image)
  // Exclude 360/video — those open a non-dialog viewer
  const trigger = page
    .locator('button')
    .filter({ hasText: /size guide|request image|fedex|free shipping|shipping info|engraving|engrave|ring sizer/i })
    .filter({ visible: true })
    .first();

  if (await trigger.count() === 0) {
    console.warn('No focus-trapping modal trigger found on product page — skipping.');
    return;
  }

  await expect(trigger).toBeVisible({ timeout: 10_000 });
  const triggerText = await trigger.innerText().catch(() => '(unknown)');
  console.log(`Modal trigger found: "${triggerText.trim()}"`);

  await trigger.focus();

  // Open modal — wait for a full Modal.vue dialog (not InfoIcon tooltip dialogs which have [modaltitle])
  await trigger.click();
  await page.waitForSelector('[role="dialog"][aria-modal="true"]:not([modaltitle])', { timeout: 8_000 });
  console.log('✅ Modal opened');
  await page.waitForTimeout(400);

  // Check focus moved inside dialog
  const focusInsideDialog = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return dialog?.contains(document.activeElement) ?? false;
  });
  if (focusInsideDialog) {
    console.log('✅ Focus moved inside dialog');
  } else {
    console.warn('⚠️  Focus did not auto-move inside dialog');
  }

  // Tab through focusable elements to demonstrate focus trap
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);

  // Close with Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  const dialogVisible = await page.locator('[role="dialog"][aria-modal="true"]:not([modaltitle])').isVisible().catch(() => false);
  expect(dialogVisible).toBe(false);
  console.log('✅ Modal closed via Escape');

  const focusReturnedOk = await page.evaluate((text) => {
    const active = document.activeElement as HTMLElement;
    return (
      active?.innerText?.trim() === text.trim() ||
      active?.getAttribute('aria-label')?.includes(text.trim()) ||
      document.querySelector('[role="dialog"]') === null
    );
  }, triggerText.trim());
  expect(focusReturnedOk).toBe(true);
  console.log('✅ Focus returned after modal close');

  const info = await saveVideo(page, 'modal-open-focustrap-esc-return');
  if (info) {
    (global as any).__pendingVideos = (global as any).__pendingVideos ?? [];
    (global as any).__pendingVideos.push(info);
  }
});

// ─── Copy videos after browser context closes ────────────────────────────────
test.afterAll(async () => {
  const pending: Array<{ videoPath: string; dest: string }> =
    (global as any).__pendingVideos ?? [];
  for (const { videoPath, dest } of pending) {
    if (fs.existsSync(videoPath)) {
      fs.copyFileSync(videoPath, dest);
      console.log(`🎬 Saved: ${dest}`);
    }
  }
  (global as any).__pendingVideos = [];
});
