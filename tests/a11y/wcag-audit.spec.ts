import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { saveAxeReport } from './helpers/report';
import { dismissOverlays } from './helpers/dismiss-overlays';

const PAGES = [
  { label: 'Home', path: '/' },
  { label: 'Engagement Rings', path: '/engagement-rings/' },
  { label: 'Diamonds', path: '/diamonds/' },
  { label: 'Jewelry', path: '/jewelry/' },
  { label: 'Login', path: '/auth/login/' },
  { label: 'Cart Summary', path: '/cart/summary/' },
];

const AXE_CONFIG = {
  runOnly: {
    type: 'tag' as const,
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
};

for (const { label, path } of PAGES) {
  test(`WCAG 2.2 AA — ${label} (${path})`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });

    // Wait for all third-party scripts (cookie banner, live agent, Klaviyo, etc.) to render
    await page.waitForTimeout(3000);

    // Scan the full page — including third-party plugin HTML
    const results = await new AxeBuilder({ page })
      .options(AXE_CONFIG)
      .analyze();

    const { jsonPath, mdPath, violationCount } = saveAxeReport(label, results);

    console.log(`\n📄 ${label}: ${violationCount} violation(s)`);
    console.log(`   JSON → ${jsonPath}`);
    console.log(`   MD   → ${mdPath}`);

    // Soft-assert: report all violations but never abort the run
    expect.soft(
      violationCount,
      `${violationCount} WCAG violations on "${label}". See ${mdPath}`
    ).toBe(0);
  });
}

test('WCAG 2.2 AA — Engagement Ring modal (FedEx shipping)', async ({ page }) => {
  await page.goto('/engagement-rings/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Dismiss Klaviyo popup before trying to interact with page buttons
  await dismissOverlays(page);

  // Try to open a site-native modal (exclude Klaviyo/currency dialog-openers)
  const modalTrigger = page
    .locator('[data-modal-trigger]')
    .filter({ visible: true })
    .first();

  const triggerExists = await modalTrigger.count();

  if (triggerExists > 0) {
    await modalTrigger.click();
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    const results = await new AxeBuilder({ page })
      .options(AXE_CONFIG)
      .analyze();

    const { jsonPath, mdPath, violationCount } = saveAxeReport('Modal-EngagementRings', results);
    console.log(`\n📄 Modal: ${violationCount} violation(s) → ${mdPath}`);
    expect.soft(violationCount, `${violationCount} modal violations. See ${mdPath}`).toBe(0);
  } else {
    // Fallback: scan with any open overlay as-is after dismissing the Klaviyo popup
    const results = await new AxeBuilder({ page })
      .options(AXE_CONFIG)
      .analyze();

    const { jsonPath, mdPath, violationCount } = saveAxeReport('EngagementRings-PostDismiss', results);
    console.log(`\nNo site modal trigger found — scanned page post-dismiss: ${violationCount} violation(s) → ${mdPath}`);
  }
});
