// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/AutoComplete
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const themes = ['light', 'dark'] as const;

const triggerLocator = '[data-testid="autocomplete-trigger"]';

// Closed-state: screenshot the harness region (label + search-field trigger).
const captureClosed = async (
  page: import('@playwright/test').Page,
  storyId: string,
  theme: 'light' | 'dark',
  snapshot: string
) => {
  await page.goto(getStoryUrl(storyId, theme), { waitUntil: 'domcontentloaded' });
  const harness = page.getByTestId('autocomplete-harness');
  await expect(harness).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(200);
  await expect(harness).toHaveScreenshot(snapshot, { maxDiffPixels: 100 });
};

// Open-state: click the trigger, then return the portalled popover dialog.
const openPopover = async (
  page: import('@playwright/test').Page,
  storyId: string,
  theme: 'light' | 'dark'
) => {
  await page.goto(getStoryUrl(storyId, theme), { waitUntil: 'networkidle' });
  const trigger = page.locator(triggerLocator);
  await expect(trigger).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(200);
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(300);
  return dialog;
};

describe('AutoComplete Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      it('default trigger matches snapshot', async ({ page }) => {
        await captureClosed(
          page,
          'display-autocomplete--vr-default',
          theme,
          `autocomplete-default-${theme}.png`
        );
      });

      it('disabled trigger matches snapshot', async ({ page }) => {
        await captureClosed(
          page,
          'display-autocomplete--vr-disabled',
          theme,
          `autocomplete-disabled-${theme}.png`
        );
      });

      it('error trigger matches snapshot', async ({ page }) => {
        await captureClosed(
          page,
          'display-autocomplete--vr-error',
          theme,
          `autocomplete-error-${theme}.png`
        );
      });

      it('open menu matches snapshot', async ({ page }) => {
        const dialog = await openPopover(page, 'display-autocomplete--vr-open', theme);
        await expect(dialog).toHaveScreenshot(`autocomplete-open-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open menu with selected value matches snapshot', async ({ page }) => {
        const dialog = await openPopover(
          page,
          'display-autocomplete--vr-open-selected',
          theme
        );
        await expect(dialog).toHaveScreenshot(`autocomplete-open-selected-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open menu filtered by search matches snapshot', async ({ page }) => {
        const dialog = await openPopover(page, 'display-autocomplete--vr-open', theme);
        await page.getByRole('textbox').fill('content3');
        await page.waitForTimeout(300);
        await expect(dialog).toHaveScreenshot(`autocomplete-open-search-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open menu with no results matches snapshot', async ({ page }) => {
        const dialog = await openPopover(page, 'display-autocomplete--vr-open', theme);
        await page.getByRole('textbox').fill('zzzznomatch');
        await page.waitForTimeout(300);
        await expect(dialog).toHaveScreenshot(`autocomplete-open-nodata-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    });
  }
});
