import { defineConfig, devices } from '@playwright/test'

// ADA regression suite ported from the Nuxt 2 project. Point PREVIEW_URL at a running build (dev on :3000 or `nuxt preview`).
export default defineConfig({
  testDir: './tests/a11y',
  timeout: 90_000,
  retries: 0, // violations are deterministic — retries would duplicate entries in the violations file
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.PREVIEW_URL || 'http://localhost:3000',
    headless: true,
    channel: 'chrome',
    ignoreHTTPSErrors: true,
    ...devices['Desktop Chrome'],
  },
})
