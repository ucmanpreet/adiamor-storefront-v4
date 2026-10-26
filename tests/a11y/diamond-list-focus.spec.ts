/**
 * Diagnostic: Diamond list view — dual focus ring on mobile (VoiceOver)
 *
 * Root cause: role="button" div contained role="row"/"cell" children
 * + nested <button> (View Details), creating 2 separate AT focus stops
 * that appeared simultaneously in iOS VoiceOver.
 *
 * Fix verified:
 * 1. No role="row" / role="cell" inside the list row button
 * 2. The teal bg-primary highlight is on the button div, NOT the outer listitem
 * 3. View Details button remains accessible (has aria-label, not aria-hidden)
 */

import { test, expect } from '@playwright/test';
import { blockThirdPartyPopups, dismissOverlays } from './helpers/dismiss-overlays';

const SEARCH_URL = '/diamonds/search/round/';

test.describe('Diamond list view — focus structure (mobile)', () => {
  test.beforeEach(async ({ page }) => {
    await blockThirdPartyPopups(page);
    await page.goto(SEARCH_URL, { waitUntil: 'domcontentloaded' });
    await dismissOverlays(page);

    // Switch to list view and wait for rows to render
    // (Nuxt 4 build: the toolbar renders client-side after the API call, so wait for the toggle instead of checking once)
    const listViewBtn = page.locator('button[aria-label="list view"]').first();
    await listViewBtn.waitFor({ state: 'attached', timeout: 20000 });
    await listViewBtn.click();
    // DynamicScroller renders items off-screen initially — wait for attached, not visible
    await page.waitForSelector('[role="list"] [role="button"]', { state: 'attached', timeout: 20000 });
  });

  test('No role="row" nested inside role="button" list row', async ({ page }) => {
    const rowButtons = page.locator('[role="list"] [role="button"]');
    const count = await rowButtons.count();
    expect(count, 'List rows should be present').toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const rowBtn = rowButtons.nth(i);
      await expect(rowBtn.locator('[role="row"]'), `Row ${i}: no role="row" inside role="button"`).toHaveCount(0);
      await expect(rowBtn.locator('[role="cell"]'), `Row ${i}: no role="cell" inside role="button"`).toHaveCount(0);
    }
  });

  test('No more than 1 native <button> nested inside [role="button"] list row', async ({ page }) => {
    const rowButtons = page.locator('[role="list"] [role="button"]');
    const count = await rowButtons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const nestedCount = await rowButtons.nth(i).locator('button').count();
      expect(nestedCount, `Row ${i}: at most 1 nested <button>`).toBeLessThanOrEqual(1);
    }
  });

  test('Expanded row: teal background on button div, not outer listitem', async ({ page }) => {
    const firstRow = page.locator('[role="list"] [role="button"]').first();
    // DynamicScroller sets visibility:hidden on off-screen items — dispatch event directly
    await firstRow.dispatchEvent('click');
    await page.waitForTimeout(500);

    await expect(firstRow).toHaveAttribute('aria-expanded', 'true');

    // Outer listitem should NOT have bg-primary
    const listItem = firstRow.locator('xpath=..');
    const listItemClass = await listItem.getAttribute('class') ?? '';
    expect(listItemClass).not.toContain('bg-primary');

    // Button div should have a non-transparent background (the teal highlight)
    const bgColor = await firstRow.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bgColor).not.toBe('transparent');
  });

  test('View Details button is accessible (has aria-label, not aria-hidden)', async ({ page }) => {
    const firstRow = page.locator('[role="list"] [role="button"]').first();
    const viewDetailsBtn = firstRow.locator('button[aria-label*="View details" i]');
    await expect(viewDetailsBtn).toHaveCount(1);
    // Confirm the button itself is not hidden from AT
    await expect(viewDetailsBtn).not.toHaveAttribute('aria-hidden', 'true');
  });
});
