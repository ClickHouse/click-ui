// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Panel
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="panel-harness"]';

const variants = [
  'playground',
  'color-default',
  'color-muted',
  'color-transparent',
  'radii-none',
  'radii-sm',
  'radii-md',
  'radii-lg',
  'padding-none',
  'padding-xs',
  'padding-sm',
  'padding-md',
  'padding-lg',
  'padding-xl',
  'gap-none',
  'gap-sm',
  'gap-lg',
  'gap-xl',
  'orientation-horizontal',
  'orientation-vertical',
  'align-start',
  'align-center',
  'align-end',
  'has-border',
  'has-shadow',
  'fill-width',
  'fill-height',
  'fixed-width',
];

describe('Panel Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-panel--${variant}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`panel-${variant}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-panel--${variant}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`panel-${variant}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
