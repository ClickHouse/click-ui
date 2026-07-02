// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/FileUpload
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const FILE_UPLOAD_HARNESS = '[data-testid="file-upload-harness"]';
const MULTI_UPLOAD_HARNESS = '[data-testid="file-multi-upload-harness"]';

type Theme = 'light' | 'dark';
const themes: Theme[] = ['light', 'dark'];

describe('FileUpload Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      it('small size empty area matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-fileupload--small-size', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(FILE_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`fileupload-small-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('medium size empty area matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-fileupload--medium-size', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(FILE_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`fileupload-medium-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('restricted file types matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-fileupload--restricted-file-types', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(FILE_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`fileupload-restricted-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    });
  }
});

describe('FileMultiUpload Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      it('empty state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-filemultiupload--empty-state', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(MULTI_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`filemultiupload-empty-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('uploading files matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-filemultiupload--with-uploading-files', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(MULTI_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`filemultiupload-uploading-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('success files matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-filemultiupload--with-success-files', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(MULTI_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`filemultiupload-success-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('error files matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-filemultiupload--with-error-files', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(MULTI_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`filemultiupload-error-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('mixed states matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-filemultiupload--mixed-states', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(MULTI_UPLOAD_HARNESS);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`filemultiupload-mixed-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    });
  }
});
