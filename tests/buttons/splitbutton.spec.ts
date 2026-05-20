import { expect, test as it, type Page } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const openStory = async (page: Page, storyId: string, theme: 'light' | 'dark') => {
  await page.goto(getStoryUrl(storyId, theme), {
    waitUntil: 'networkidle',
  });
};

const getMainButton = (page: Page) => page.getByRole('button', { name: 'Split button' });
const getDropdownTrigger = (page: Page) => page.getByTestId('split-button-dropdown');
const getSplitButtonTrigger = (page: Page) =>
  getDropdownTrigger(page).locator('xpath=..');

describe('SplitButton Visual Regression', () => {
  (['light', 'dark'] as const).forEach(theme => {
    describe(`${theme[0].toUpperCase()}${theme.slice(1)} Theme`, () => {
      it('primary type matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--primary', theme);
        await expect(getMainButton(page)).toBeVisible();
        await expect(getSplitButtonTrigger(page)).toHaveScreenshot(
          `splitbutton-primary-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('secondary type matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--secondary', theme);
        await expect(getMainButton(page)).toBeVisible();
        await expect(getSplitButtonTrigger(page)).toHaveScreenshot(
          `splitbutton-secondary-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('disabled primary type matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--disabled-primary', theme);
        await expect(getMainButton(page)).toBeDisabled();
        await expect(getDropdownTrigger(page)).toHaveAttribute('data-disabled', '');
        await expect(getSplitButtonTrigger(page)).toHaveScreenshot(
          `splitbutton-disabled-primary-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('disabled secondary type matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--disabled-secondary', theme);
        await expect(getMainButton(page)).toBeDisabled();
        await expect(getDropdownTrigger(page)).toHaveAttribute('data-disabled', '');
        await expect(getSplitButtonTrigger(page)).toHaveScreenshot(
          `splitbutton-disabled-secondary-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('fill width primary type matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--fill-width-primary', theme);
        await expect(getMainButton(page)).toBeVisible();
        await expect(getSplitButtonTrigger(page)).toHaveScreenshot(
          `splitbutton-fill-width-primary-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('fill width secondary type matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--fill-width-secondary', theme);
        await expect(getMainButton(page)).toBeVisible();
        await expect(getSplitButtonTrigger(page)).toHaveScreenshot(
          `splitbutton-fill-width-secondary-${theme}.png`,
          { maxDiffPixels: 100 }
        );
      });

      it('opened menu state matches snapshot', async ({ page }) => {
        await openStory(page, 'buttons-splitbutton--open-primary', theme);
        await expect(page.getByRole('menu')).toBeVisible();
        await expect(page.locator('body')).toHaveScreenshot(`splitbutton-open-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Interactive States', () => {
    it('hover state matches snapshot', async ({ page }) => {
      await openStory(page, 'buttons-splitbutton--primary', 'light');
      const mainButton = getMainButton(page);
      await expect(mainButton).toBeVisible();
      await mainButton.hover();
      await page.waitForTimeout(100);
      await expect(getSplitButtonTrigger(page)).toHaveScreenshot('splitbutton-hover-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('focus state matches snapshot', async ({ page }) => {
      await openStory(page, 'buttons-splitbutton--primary', 'light');
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      const mainButton = getMainButton(page);
      await expect(mainButton).toBeFocused();
      await page.waitForTimeout(100);
      await expect(getSplitButtonTrigger(page)).toHaveScreenshot('splitbutton-focus-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Accessibility', () => {
    it('main button can be activated with Enter key', async ({ page }) => {
      await openStory(page, 'buttons-splitbutton--primary', 'light');
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(getMainButton(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('menu')).not.toBeVisible();
    });

    it('main button can be activated with Space key', async ({ page }) => {
      await openStory(page, 'buttons-splitbutton--primary', 'light');
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(getMainButton(page)).toBeFocused();
      await page.keyboard.press('Space');
      await expect(page.getByRole('menu')).not.toBeVisible();
    });
  });
});
