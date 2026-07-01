// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/BigStat
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="big-stat-harness"]';

const variants = [
  { story: 'state-default', name: 'state-default' },
  { story: 'state-muted', name: 'state-muted' },
  { story: 'state-error', name: 'state-error' },
  { story: 'size-lg', name: 'size-lg' },
  { story: 'size-sm', name: 'size-sm' },
  { story: 'spacing-sm', name: 'spacing-sm' },
  { story: 'spacing-lg', name: 'spacing-lg' },
  { story: 'order-title-top', name: 'order-title-top' },
  { story: 'order-title-bottom', name: 'order-title-bottom' },
  { story: 'fill-width', name: 'fill-width' },
  { story: 'max-width', name: 'max-width' },
  { story: 'custom-height', name: 'custom-height' },
] as const;

describe('BigStat Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-big-stat--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`big-stat-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-big-stat--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`big-stat-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Content', () => {
    it('renders the title and label text', async ({ page }) => {
      await page.goto(getStoryUrl('display-big-stat--state-default', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness.getByText('Percentage complete')).toBeVisible();
      await expect(harness.getByText('100%')).toBeVisible();
    });
  });
});
