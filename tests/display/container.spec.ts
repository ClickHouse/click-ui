// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Container
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const containerLocator = '[data-testid="container"]';

const variants = [
  'horizontal',
  'vertical',
  'gap-none',
  'gap-large',
  'padding-large',
  'align-start',
  'align-end',
  'align-stretch',
  'justify-center',
  'justify-space-between',
  'justify-end',
  'fill-width',
  'wrap',
  'grow',
  'fill-height',
];

describe('Container Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`layout-container--${variant}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const container = page.locator(containerLocator).first();
        await expect(container).toBeVisible({ timeout: 10000 });
        await expect(container).toHaveScreenshot(`container-${variant}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`layout-container--${variant}`), {
          waitUntil: 'networkidle',
        });
        const container = page.locator(containerLocator).first();
        await expect(container).toBeVisible({ timeout: 10000 });
        await expect(container).toHaveScreenshot(`container-${variant}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
