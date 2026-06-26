// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/GenericMenu
// @covers src/components/Dropdown
// @covers src/components/ContextMenu
// @covers src/components/Popover
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const themes = ['light', 'dark'] as const;

describe('GenericMenu cluster Visual Regression', () => {
  describe('GenericMenu base panels', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('menu panel matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('components-genericmenu--menu-panel', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('generic-menu-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`generic-menu-panel-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('popover panel matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('components-genericmenu--popover-panel', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('generic-menu-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`generic-popover-panel-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('panel with arrow matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('components-genericmenu--with-arrow', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('generic-menu-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`generic-menu-with-arrow-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('menu items matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('components-genericmenu--menu-items', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('generic-menu-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`generic-menu-items-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('item states matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('components-genericmenu--item-states', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('generic-menu-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`generic-menu-item-states-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      });
    }
  });

  describe('Dropdown content extension', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('open content matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-dropdown--open-content', theme), {
            waitUntil: 'domcontentloaded',
          });
          const menu = page.getByRole('menu');
          await expect(menu).toBeVisible({ timeout: 10000 });
          await page.waitForTimeout(200);
          await expect(menu).toHaveScreenshot(`dropdown-open-content-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('open content with arrow matches snapshot', async ({ page }) => {
          await page.goto(
            getStoryUrl('display-dropdown--open-content-with-arrow', theme),
            { waitUntil: 'domcontentloaded' }
          );
          const menu = page.getByRole('menu');
          await expect(menu).toBeVisible({ timeout: 10000 });
          await page.waitForTimeout(200);
          await expect(menu).toHaveScreenshot(
            `dropdown-open-content-arrow-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });

        // Exercises the Dropdown.Trigger width (fit-content) and focus outline.
        it('trigger matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-dropdown--trigger-standalone', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('dropdown-trigger-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`dropdown-trigger-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        // Exercises the Dropdown.Trigger :focus-visible outline.
        it('trigger focus-visible matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-dropdown--trigger-standalone', theme), {
            waitUntil: 'domcontentloaded',
          });
          const harness = page.getByTestId('dropdown-trigger-harness');
          await expect(harness).toBeVisible({ timeout: 10000 });
          await page.locator('body').click();
          await page.keyboard.press('Tab');
          await page.waitForTimeout(200);
          await expect(harness).toHaveScreenshot(
            `dropdown-trigger-focus-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });
      });
    }
  });

  describe('Popover content extension', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('open content matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-popover--open-content', theme), {
            waitUntil: 'domcontentloaded',
          });
          const dialog = page.getByRole('dialog');
          await expect(dialog).toBeVisible({ timeout: 10000 });
          await page.waitForTimeout(200);
          await expect(dialog).toHaveScreenshot(`popover-open-content-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('open content without close matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-popover--open-content-no-close', theme), {
            waitUntil: 'domcontentloaded',
          });
          const dialog = page.getByRole('dialog');
          await expect(dialog).toBeVisible({ timeout: 10000 });
          await page.waitForTimeout(200);
          await expect(dialog).toHaveScreenshot(
            `popover-open-content-no-close-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });
      });
    }
  });

  describe('ContextMenu content extension', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('open content matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-contextmenu--open-content', theme), {
            waitUntil: 'domcontentloaded',
          });
          const trigger = page.getByText('Right-click here');
          await expect(trigger).toBeVisible({ timeout: 10000 });
          await trigger.click({ button: 'right' });
          const menu = page.getByRole('menu');
          await expect(menu).toBeVisible({ timeout: 10000 });
          await page.waitForTimeout(200);
          await expect(menu).toHaveScreenshot(`context-menu-open-content-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      });
    }
  });
});
