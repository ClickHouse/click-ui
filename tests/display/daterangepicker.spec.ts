// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/DatePicker
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const themes = ['light', 'dark'] as const;

// The calendar highlights "today" from `new Date()`; pin the clock so the
// present-day cell is deterministic. The stories select 2026-07-10 – 2026-07-20.
const FIXED_NOW = new Date('2026-07-15T12:00:00');

const PLAIN = 'display-daterangepicker--selected-date';
const PREDEFINED = 'display-daterangepicker--predefined-dates-with-selected-date';
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
  const input = page.getByTestId('daterangepicker-input');
  await expect(input).toBeVisible({ timeout: 10000 });
  await input.click();
  const content = page.locator(popper).first();
  await expect(content).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(settleMs);
  return content;
};

describe('DateRangePicker Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      it('closed input matches snapshot', async ({ page }) => {
        await goto(page, PLAIN, theme);
        const input = page.getByTestId('daterangepicker-input');
        await expect(input).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(200);
        await expect(input.locator('..')).toHaveScreenshot(
          `daterangepicker-input-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('open calendar with range matches snapshot', async ({ page }) => {
        await goto(page, PLAIN, theme);
        const content = await open(page);
        await expect(content).toHaveScreenshot(`daterangepicker-range-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open predefined dates panel matches snapshot', async ({ page }) => {
        await goto(page, PREDEFINED, theme);
        const content = await open(page);
        await expect(page.getByTestId('predefined-dates-list')).toBeVisible();
        await expect(content).toHaveScreenshot(
          `daterangepicker-predefined-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('open custom range calendar matches snapshot', async ({ page }) => {
        await goto(page, PREDEFINED, theme);
        const content = await open(page);
        await page.getByText('Custom time period').click();
        await expect(page.getByTestId('datepicker-calendar-container')).toBeVisible({
          timeout: 10000,
        });
        await page.waitForTimeout(settleMs);
        await expect(content).toHaveScreenshot(
          `daterangepicker-custom-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });
    });
  }
});
