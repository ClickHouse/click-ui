// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Skeleton
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const variants = [
  { story: 'small', name: 'small' },
  { story: 'medium', name: 'medium' },
  { story: 'custom-size', name: 'custom-size' },
  { story: 'text-lines', name: 'text-lines' },
] as const;

const themes = ['light', 'dark'] as const;

describe('Skeleton Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of variants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(`display-skeleton--${story}`, theme), {
            waitUntil: 'networkidle',
          });
          const harness = page.getByTestId('skeleton-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`skeleton-${name}-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      }
    });
  }
});
