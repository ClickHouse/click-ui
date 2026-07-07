// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/DatePicker
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const themes = ['light', 'dark'] as const;

// The calendar highlights "today" from `new Date()`; pin the clock so the
// present-day cell is deterministic across the fixed-date stories.
const FIXED_NOW = new Date('2026-07-15T12:00:00');

const TABBED = 'display-datetimerangepicker--set-start-and-end-date';
const ERROR = 'display-datetimerangepicker--invalid-dates';
const PREDEFINED =
  'display-datetimerangepicker--predefined-times-with-set-start-and-end-date';
const popper = '[data-radix-popper-content-wrapper]';
const settleMs = 300;

const goto = async (
  page: import('@playwright/test').Page,
  storyId: string,
  theme: 'light' | 'dark'
) => {
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto(getStoryUrl(storyId, theme), { waitUntil: 'networkidle' });
};

const open = async (page: import('@playwright/test').Page) => {
  const input = page.getByTestId('datetimepicker-input');
  await expect(input).toBeVisible({ timeout: 10000 });
  await input.click();
  const content = page.locator(popper).first();
  await expect(content).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(settleMs);
  return content;
};

describe('DateTimeRangePicker Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      it('closed input matches snapshot', async ({ page }) => {
        await goto(page, TABBED, theme);
        const input = page.getByTestId('datetimepicker-input');
        await expect(input).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(200);
        await expect(input.locator('..')).toHaveScreenshot(
          `datetimerangepicker-input-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('closed error input matches snapshot', async ({ page }) => {
        await goto(page, ERROR, theme);
        const input = page.getByTestId('datetimepicker-input');
        await expect(input).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(200);
        await expect(input.locator('..')).toHaveScreenshot(
          `datetimerangepicker-input-error-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('open tabbed calendar with time input matches snapshot', async ({ page }) => {
        await goto(page, TABBED, theme);
        const content = await open(page);
        await expect(page.getByTestId('date-time-picker-time-input')).toBeVisible();
        await expect(content).toHaveScreenshot(`datetimerangepicker-tabbed-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open error tabbed calendar matches snapshot', async ({ page }) => {
        await goto(page, ERROR, theme);
        const content = await open(page);
        await expect(content).toHaveScreenshot(`datetimerangepicker-tabbed-error-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open predefined times panel matches snapshot', async ({ page }) => {
        await goto(page, PREDEFINED, theme);
        const content = await open(page);
        await expect(page.getByTestId('predefined-times-list')).toBeVisible();
        await expect(content).toHaveScreenshot(
          `datetimerangepicker-predefined-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });
    });
  }
});
