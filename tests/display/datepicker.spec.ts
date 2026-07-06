// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/DatePicker
import { test as it, expect, Page } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const themes = ['light', 'dark'] as const;

// The calendar highlights "today" from `new Date()`, so pin the clock to keep
// the present-day cell deterministic across CI runs. Mid-day mid-month so tz
// offsets can't cross a day boundary. The story selects 2026-07-20.
const FIXED_NOW = new Date('2026-07-15T12:00:00');

const STORY = 'display-datepicker--vr-date-picker';
const popper = '[data-radix-popper-content-wrapper]';
const settleMs = 300;

const openCalendar = async (page: Page, theme: 'light' | 'dark') => {
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto(getStoryUrl(STORY, theme), { waitUntil: 'networkidle' });
  const input = page.getByTestId('datepicker-input');
  await expect(input).toBeVisible({ timeout: 10000 });
  await input.click();
  const content = page.locator(popper).first();
  await expect(content).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(settleMs);
  return content;
};

describe('DatePicker Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      it('closed input matches snapshot', async ({ page }) => {
        await page.clock.setFixedTime(FIXED_NOW);
        await page.goto(getStoryUrl(STORY, theme), { waitUntil: 'networkidle' });
        const input = page.getByTestId('datepicker-input');
        await expect(input).toBeVisible({ timeout: 10000 });
        const wrapper = input.locator('..');
        await page.waitForTimeout(200);
        await expect(wrapper).toHaveScreenshot(`datepicker-input-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('open days view matches snapshot', async ({ page }) => {
        const content = await openCalendar(page, theme);
        await expect(content).toHaveScreenshot(`datepicker-days-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('years view matches snapshot', async ({ page }) => {
        const content = await openCalendar(page, theme);
        await page.getByTestId('calendar-title').click();
        await expect(page.getByTestId('years-grid')).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(settleMs);
        await expect(content).toHaveScreenshot(`datepicker-years-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });

      it('months view matches snapshot', async ({ page }) => {
        const content = await openCalendar(page, theme);
        await page.getByTestId('calendar-title').click();
        await expect(page.getByTestId('years-grid')).toBeVisible({ timeout: 10000 });
        await page.getByTestId('year-cell-2026').click();
        await expect(page.getByTestId('months-grid')).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(settleMs);
        await expect(content).toHaveScreenshot(`datepicker-months-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    });
  }

  describe('Behavior', () => {
    it('exposes the day grid via gridcell roles', async ({ page }) => {
      await openCalendar(page, 'light');
      await expect(page.getByRole('gridcell').first()).toBeVisible();
    });

    it('exposes month and year selection grids', async ({ page }) => {
      await openCalendar(page, 'light');
      await page.getByTestId('calendar-title').click();
      await expect(page.getByRole('grid', { name: 'Select year' })).toBeVisible();
      await page.getByTestId('year-cell-2026').click();
      await expect(page.getByRole('grid', { name: 'Select month' })).toBeVisible();
    });
  });
});
