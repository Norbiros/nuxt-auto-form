import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import { isCI } from 'std-env'

/* See https://playwright.dev/docs/test-configuration. */
export default defineConfig<ConfigOptions>({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  timeout: 120000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Nuxt configuration options */
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      host: 'http://localhost:3000',
      build: false,
    },
  },
  expect: {
    timeout: isCI ? undefined : 12000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Other browsers can be added here:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !isCI,
  },
})
