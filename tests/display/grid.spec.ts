// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Grid
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="grid-harness"]';

const variants = [
  { id: 'display-grid--default', name: 'default' },
  { id: 'display-grid--with-border', name: 'with-border' },
  { id: 'display-grid--no-header', name: 'no-header' },
  { id: 'display-grid--no-row-number', name: 'no-row-number' },
  { id: 'display-grid--rounded-lg', name: 'rounded-lg' },
  { id: 'display-grid--focused-cell', name: 'focused-cell' },
];

describe('Grid Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const variant of variants) {
      it(`${variant.name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(variant.id, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(page.getByTestId('grid-outer-element').first()).toBeVisible({
          timeout: 10000,
        });
        await page.waitForTimeout(200);
        await expect(harness).toHaveScreenshot(`grid-${variant.name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const variant of variants) {
      it(`${variant.name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(variant.id), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(page.getByTestId('grid-outer-element').first()).toBeVisible({
          timeout: 10000,
        });
        await page.waitForTimeout(200);
        await expect(harness).toHaveScreenshot(`grid-${variant.name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Interactive States', () => {
    it('header hover shows resizer (light)', async ({ page }) => {
      await page.goto(getStoryUrl('display-grid--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      const headerCell = page.locator('[data-header="0"]').first();
      await expect(headerCell).toBeVisible({ timeout: 10000 });
      await headerCell.hover();
      await page.waitForTimeout(200);
      await expect(harness).toHaveScreenshot('grid-header-hover-light.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
