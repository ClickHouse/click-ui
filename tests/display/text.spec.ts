// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Text
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="text-harness"]';

const variants = [
  { story: 'size-xs', name: 'size-xs' },
  { story: 'size-sm', name: 'size-sm' },
  { story: 'size-md', name: 'size-md' },
  { story: 'size-lg', name: 'size-lg' },
  { story: 'weight-normal', name: 'weight-normal' },
  { story: 'weight-medium', name: 'weight-medium' },
  { story: 'weight-semibold', name: 'weight-semibold' },
  { story: 'weight-bold', name: 'weight-bold' },
  { story: 'weight-mono', name: 'weight-mono' },
  { story: 'color-default', name: 'color-default' },
  { story: 'color-muted', name: 'color-muted' },
  { story: 'color-danger', name: 'color-danger' },
  { story: 'color-disabled', name: 'color-disabled' },
  { story: 'align-left', name: 'align-left' },
  { story: 'align-center', name: 'align-center' },
  { story: 'align-right', name: 'align-right' },
  { story: 'fill-width', name: 'fill-width' },
  { story: 'no-wrap', name: 'no-wrap' },
] as const;

describe('Text Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`typography-text--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`text-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`typography-text--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`text-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
