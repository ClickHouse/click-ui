// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/GridCenter
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="gridcenter-harness"]';

describe('GridCenter Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('centered content matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-gridcenter--centered-content', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('gridcenter-centered-content-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('centered content matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-gridcenter--centered-content'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('gridcenter-centered-content-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
