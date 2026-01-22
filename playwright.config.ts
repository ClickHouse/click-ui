import { defineConfig, devices } from "@playwright/test";

const webServer = {
  command: "yarn storybook",
  url: "http://localhost:6006",
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: "list",

  use: {
    baseURL: "http://localhost:6006",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer,
});
