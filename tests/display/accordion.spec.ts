// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Accordion
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const harness = '[data-testid="accordion-harness"]';

const variants = [
  { story: 'default', name: 'default' },
  { story: 'small', name: 'small' },
  { story: 'large', name: 'large' },
  { story: 'link', name: 'link' },
  { story: 'with-icon', name: 'with-icon' },
  { story: 'fill-width', name: 'fill-width' },
  { story: 'open', name: 'open' },
] as const;

const themes = ['light', 'dark'] as const;

describe('Accordion Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of variants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(`accordion-accordion--${story}`, theme), {
            waitUntil: 'networkidle',
          });
          const region = page.locator(harness);
          await expect(region).toBeVisible({ timeout: 10000 });
          await expect(region).toHaveScreenshot(`accordion-${name}-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      }
    });
  }

  describe('Interactive States', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('trigger hover matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('accordion-accordion--default', theme), {
            waitUntil: 'networkidle',
          });
          const trigger = page.getByRole('button');
          await expect(trigger).toBeVisible({ timeout: 10000 });
          await trigger.hover();
          await page.waitForTimeout(100);
          await expect(page.locator(harness)).toHaveScreenshot(
            `accordion-trigger-hover-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });

        it('trigger focus matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('accordion-accordion--default', theme), {
            waitUntil: 'networkidle',
          });
          const trigger = page.getByRole('button');
          await expect(trigger).toBeVisible({ timeout: 10000 });
          await page.locator('body').click();
          await page.keyboard.press('Tab');
          await expect(trigger).toBeFocused();
          await page.waitForTimeout(100);
          await expect(page.locator(harness)).toHaveScreenshot(
            `accordion-trigger-focus-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });
      });
    }
  });

  describe('Accessibility', () => {
    it('toggles open and closed with keyboard activation', async ({ page }) => {
      await page.goto(getStoryUrl('accordion-accordion--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const trigger = page.getByRole('button');
      await expect(trigger).toBeVisible({ timeout: 10000 });
      await expect(trigger).toHaveAttribute('data-state', 'closed');

      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(trigger).toHaveAttribute('data-state', 'open');

      await page.keyboard.press('Space');
      await expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('renders an accessible accordion icon label', async ({ page }) => {
      await page.goto(getStoryUrl('accordion-accordion--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const icon = page.getByLabel('accordion icon');
      await expect(icon).toBeVisible({ timeout: 10000 });
    });
  });
});
