import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: { baseURL: 'http://localhost:3100', channel: 'chrome', headless: true },
  webServer: { command: 'npx nuxt dev --port 3100', url: 'http://localhost:3100', reuseExistingServer: true, timeout: 120000 },
})
