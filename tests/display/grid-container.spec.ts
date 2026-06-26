// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/GridContainer
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const gridContainerLocator = '[data-testid="grid-container"]';

const variants = [
  'playground',
  'two-columns',
  'three-columns',
  'column-gap',
  'row-gap',
  'inline',
  'align-items-center',
  'justify-content-space-between',
  'not-responsive',
  'hug-width',
  'auto-flow-column',
  'max-height-overflow',
];

describe('GridContainer Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`layout-gridcontainer--${variant}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const gridContainer = page.locator(gridContainerLocator).first();
        await expect(gridContainer).toBeVisible({ timeout: 10000 });
        await expect(gridContainer).toHaveScreenshot(
          `grid-container-${variant}-light.png`,
          {
            maxDiffPixels: 100,
          }
        );
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`layout-gridcontainer--${variant}`), {
          waitUntil: 'networkidle',
        });
        const gridContainer = page.locator(gridContainerLocator).first();
        await expect(gridContainer).toBeVisible({ timeout: 10000 });
        await expect(gridContainer).toHaveScreenshot(
          `grid-container-${variant}-dark.png`,
          {
            maxDiffPixels: 100,
          }
        );
      });
    }
  });
});
