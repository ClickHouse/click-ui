// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Assets/Icons/Loading.tsx
// @covers src/components/Assets/Icons/Loading-Animated.tsx
// @covers src/components/Assets/Icons/Horizontal-Loading.tsx
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="loaders-harness"]';

// The animated loaders (loading-animated, horizontal-loading) run infinite CSS
// animations, so their frame is non-deterministic. Playwright's built-in
// `animations: 'disabled'` freezes CSS animations/transitions to their final
// state, giving a stable snapshot — the same freeze convention used in
// tests/buttons/button.spec.ts for the button loading spinner.
describe('Loaders Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('loading matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('assets-loaders--loading-icon', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('loaders-loading-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('loading-animated matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('assets-loaders--loading-animated-icon', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('loaders-loading-animated-light.png', {
        maxDiffPixels: 100,
        animations: 'disabled',
      });
    });

    it('horizontal-loading matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('assets-loaders--horizontal-loading-icon', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('loaders-horizontal-loading-light.png', {
        maxDiffPixels: 100,
        animations: 'disabled',
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('loading matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('assets-loaders--loading-icon'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('loaders-loading-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('loading-animated matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('assets-loaders--loading-animated-icon'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('loaders-loading-animated-dark.png', {
        maxDiffPixels: 100,
        animations: 'disabled',
      });
    });

    it('horizontal-loading matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('assets-loaders--horizontal-loading-icon'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('loaders-horizontal-loading-dark.png', {
        maxDiffPixels: 100,
        animations: 'disabled',
      });
    });
  });
});
