// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/VerticalStepper
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const harness = '[data-testid="vertical-stepper-harness"]';

const variants = [
  { story: 'numbered', name: 'numbered' },
  { story: 'bulleted', name: 'bulleted' },
  { story: 'numbered-expanded', name: 'numbered-expanded' },
  { story: 'bulleted-expanded', name: 'bulleted-expanded' },
] as const;

const themes = ['light', 'dark'] as const;

describe('VerticalStepper Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of variants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(`display-verticalstepper--${story}`, theme), {
            waitUntil: 'networkidle',
          });
          const region = page.locator(harness);
          await expect(region).toBeVisible({ timeout: 10000 });
          await expect(region).toHaveScreenshot(`vertical-stepper-${name}-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      }
    });
  }

  describe('Interactive States', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('complete step hover matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-verticalstepper--numbered', theme), {
            waitUntil: 'networkidle',
          });
          const region = page.locator(harness);
          await expect(region).toBeVisible({ timeout: 10000 });
          // The second step ("Label 2") is complete → clickable (cursor: pointer).
          const completeStep = page.getByRole('button').nth(1);
          await completeStep.hover();
          await page.waitForTimeout(100);
          await expect(region).toHaveScreenshot(`vertical-stepper-hover-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('complete step focus matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-verticalstepper--numbered', theme), {
            waitUntil: 'networkidle',
          });
          const region = page.locator(harness);
          await expect(region).toBeVisible({ timeout: 10000 });
          // First step ("Label 1") is complete and rendered first, so the first
          // Tab from page content lands on it.
          await page.locator('body').click();
          await page.keyboard.press('Tab');
          const firstStep = page.getByRole('button').first();
          await expect(firstStep).toBeFocused();
          await page.waitForTimeout(100);
          await expect(region).toHaveScreenshot(`vertical-stepper-focus-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      });
    }
  });

  describe('Accessibility', () => {
    it('disables incomplete steps and keeps complete steps clickable', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('display-verticalstepper--numbered', 'light'), {
        waitUntil: 'networkidle',
      });
      const buttons = page.getByRole('button');
      await expect(buttons.first()).toBeVisible({ timeout: 10000 });
      // Label 1 + Label 2 are complete → enabled; Label 4 is incomplete → disabled.
      await expect(buttons.nth(0)).toBeEnabled();
      await expect(buttons.nth(1)).toBeEnabled();
      await expect(buttons.nth(3)).toBeDisabled();
    });
  });
});
