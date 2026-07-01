// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Select
// @covers src/components/MultiSelect
// @covers src/components/CheckboxMultiSelect
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const themes = ['light', 'dark'] as const;

const triggerLocator = '[data-testid="select-trigger"]';

// Closed-state: screenshot the harness region (label + trigger + value).
const captureClosed = async (
  page: import('@playwright/test').Page,
  storyId: string,
  theme: 'light' | 'dark',
  harnessTestId: string,
  snapshot: string
) => {
  await page.goto(getStoryUrl(storyId, theme), { waitUntil: 'domcontentloaded' });
  const harness = page.getByTestId(harnessTestId);
  await expect(harness).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(200);
  await expect(harness).toHaveScreenshot(snapshot, { maxDiffPixels: 100 });
};

// Open-state: click the trigger, then screenshot the portalled popover dialog.
const captureOpen = async (
  page: import('@playwright/test').Page,
  storyId: string,
  theme: 'light' | 'dark',
  snapshot: string
) => {
  await page.goto(getStoryUrl(storyId, theme), { waitUntil: 'networkidle' });
  const trigger = page.locator(triggerLocator);
  await expect(trigger).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(200);
  const dialog = page.getByRole('dialog');
  // The MultiSelect trigger renders draggable value badges whose dismiss
  // buttons (and the sortable list) intercept a centred click; click the sort
  // icon on the far right of the trigger, which always opens the popover.
  const box = await trigger.boundingBox();
  if (box) {
    await trigger.click({ position: { x: box.width - 12, y: box.height / 2 } });
  } else {
    await trigger.click();
  }
  await expect(dialog).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(300);
  await expect(dialog).toHaveScreenshot(snapshot, { maxDiffPixels: 100 });
};

describe('Select family Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      describe('Select', () => {
        it('default trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-select--vr-default',
            theme,
            'select-harness',
            `select-default-${theme}.png`
          );
        });

        it('selected trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-select--vr-selected',
            theme,
            'select-harness',
            `select-selected-${theme}.png`
          );
        });

        it('error trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-select--vr-error',
            theme,
            'select-harness',
            `select-error-${theme}.png`
          );
        });

        it('disabled trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-select--vr-disabled',
            theme,
            'select-harness',
            `select-disabled-${theme}.png`
          );
        });

        it('open menu matches snapshot', async ({ page }) => {
          await captureOpen(
            page,
            'forms-select--vr-open',
            theme,
            `select-open-${theme}.png`
          );
        });

        it('open menu with search matches snapshot', async ({ page }) => {
          await captureOpen(
            page,
            'forms-select--vr-open-with-search',
            theme,
            `select-open-search-${theme}.png`
          );
        });
      });

      describe('MultiSelect', () => {
        it('multi-value trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-multiselect--vr-multi-value',
            theme,
            'multi-select-harness',
            `multi-select-value-${theme}.png`
          );
        });

        it('disabled trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-multiselect--vr-disabled',
            theme,
            'multi-select-harness',
            `multi-select-disabled-${theme}.png`
          );
        });

        it('error trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-multiselect--vr-error',
            theme,
            'multi-select-harness',
            `multi-select-error-${theme}.png`
          );
        });

        it('open menu matches snapshot', async ({ page }) => {
          await captureOpen(
            page,
            'forms-multiselect--vr-open',
            theme,
            `multi-select-open-${theme}.png`
          );
        });
      });

      describe('CheckboxMultiSelect', () => {
        it('selected trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-checkboxmultiselect--vr-selected',
            theme,
            'checkbox-multi-select-harness',
            `checkbox-multi-select-selected-${theme}.png`
          );
        });

        it('disabled trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-checkboxmultiselect--vr-disabled',
            theme,
            'checkbox-multi-select-harness',
            `checkbox-multi-select-disabled-${theme}.png`
          );
        });

        it('error trigger matches snapshot', async ({ page }) => {
          await captureClosed(
            page,
            'forms-checkboxmultiselect--vr-error',
            theme,
            'checkbox-multi-select-harness',
            `checkbox-multi-select-error-${theme}.png`
          );
        });

        it('open menu matches snapshot', async ({ page }) => {
          await captureOpen(
            page,
            'forms-checkboxmultiselect--vr-open',
            theme,
            `checkbox-multi-select-open-${theme}.png`
          );
        });

        it('open menu with search matches snapshot', async ({ page }) => {
          await captureOpen(
            page,
            'forms-checkboxmultiselect--vr-open-with-search',
            theme,
            `checkbox-multi-select-open-search-${theme}.png`
          );
        });

        it('open menu with variants matches snapshot', async ({ page }) => {
          await captureOpen(
            page,
            'forms-checkboxmultiselect--vr-variants',
            theme,
            `checkbox-multi-select-variants-${theme}.png`
          );
        });
      });
    });
  }
});
