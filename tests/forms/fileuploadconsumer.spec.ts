// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/FileUpload
// @covers src/components/Text
// @covers src/components/Title
// @covers src/components/Icon
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="fileuploadconsumer-harness"]';

const stories: Array<[string, string]> = [
  ['forms-fileuploadconsumer--area-default', 'area-default'],
  ['forms-fileuploadconsumer--area-unsupported', 'area-unsupported'],
  ['forms-fileuploadconsumer--item-success', 'item-success'],
  ['forms-fileuploadconsumer--item-error', 'item-error'],
];

describe('FileUpload Consumer Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const [storyId, name] of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(storyId, 'light'), { waitUntil: 'networkidle' });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`fileupload-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const [storyId, name] of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(storyId), { waitUntil: 'networkidle' });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`fileupload-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
