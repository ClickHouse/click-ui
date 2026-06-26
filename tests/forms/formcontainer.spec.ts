// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/FormContainer
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="formcontainer-harness"]';

const stories = [
  ['default', 'forms-formcontainer--default'],
  ['vertical-dir-start', 'forms-formcontainer--vertical-dir-start'],
  ['vertical-dir-end', 'forms-formcontainer--vertical-dir-end'],
  ['horizontal-dir-start', 'forms-formcontainer--horizontal-dir-start'],
  ['horizontal-dir-end', 'forms-formcontainer--horizontal-dir-end'],
  [
    'horizontal-dir-start-label-padding',
    'forms-formcontainer--horizontal-dir-start-label-padding',
  ],
  ['with-error', 'forms-formcontainer--with-error'],
  ['no-label', 'forms-formcontainer--no-label'],
] as const;

describe('FormContainer Visual Regression', () => {
  describe('Light Theme', () => {
    for (const [name, storyId] of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(storyId, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`formcontainer-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme', () => {
    use({ colorScheme: 'dark' });

    for (const [name, storyId] of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(storyId), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`formcontainer-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
