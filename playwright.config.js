// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  snapshotDir: './screenshots',
  globalTimeout: 60000,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers:  1,
  
  reporter: [
    ['html', { 
        outputFolder: 'playwright-report', 
        open: 'always' 
    }],

    ['json', { 
        outputFolder: 'test-results' 
    }],
  ],

  
  use: {
    screenshot: 'on',
    trace: 'off',
    contextOptions: {
      ignoreHTTPSErrors: true,
      permissions: []
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], launchOptions: {args: ['--start-maximized']} },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], deviceScaleFactor: undefined, viewport: null, launchOptions: {args: ['--start-maximized']} },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], deviceScaleFactor: undefined, viewport: null, launchOptions: {args: ['--start-maximized']} },
    // },
  ],
});

