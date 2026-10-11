import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:3000',
  },
  webServer: {
    command: 'npm run serve -- --host 127.0.0.1 --port 3000 --no-open',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});