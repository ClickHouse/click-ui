// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/InputWrapper
// @covers src/components/Label
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="inputwrapper-harness"]';

describe('InputWrapper Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('labelColor override is applied', async ({ page }) => {
      await page.goto(getStoryUrl('forms-inputwrapper--label-color-override', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('inputwrapper-label-color-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('labelColor override is applied', async ({ page }) => {
      await page.goto(getStoryUrl('forms-inputwrapper--label-color-override'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('inputwrapper-label-color-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
