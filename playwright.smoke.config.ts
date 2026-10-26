import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  testMatch: /(smoke|debug|search|gtm|dbg|filter|forms|slash)\.spec\.ts/,
  timeout: 60000,
  use: { baseURL: process.env.BASE || 'http://localhost:3110', channel: 'chrome', headless: true },
})
