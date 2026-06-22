// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/ButtonGroup
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('ButtonGroup Visual Regression', () => {
  describe('Light Theme', () => {
    describe('Type Variants', () => {
      it('default type matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('borderless type matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--borderless', 'light'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-borderless-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('iconOnly type matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--icon-only', 'light'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-icon-only-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Selection States', () => {
      it('default type with selection matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default-selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const activeButton = page.getByRole('button', { pressed: true });
        await expect(activeButton).toBeVisible();
        await expect(group).toHaveScreenshot('buttongroup-default-selected-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('borderless type with selection matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--borderless-selected', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const activeButton = page.getByRole('button', { pressed: true });
        await expect(activeButton).toBeVisible();
        await expect(group).toHaveScreenshot(
          'buttongroup-borderless-selected-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('iconOnly type with selection matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--icon-only-selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const activeButton = page.getByRole('button', { pressed: true });
        await expect(activeButton).toBeVisible();
        await expect(group).toHaveScreenshot('buttongroup-icon-only-selected-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('with disabled button matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--with-disabled-button', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const disabledButton = page.getByRole('button', { name: 'Disabled' });
        await expect(disabledButton).toBeDisabled();
        await expect(group).toHaveScreenshot('buttongroup-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with disabled and selected button matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--with-disabled-selected-button', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const disabledActiveButton = page.getByRole('button', {
          name: 'Disabled Active',
        });
        await expect(disabledActiveButton).toBeDisabled();
        await expect(disabledActiveButton).toHaveAttribute('aria-pressed', 'true');
        await expect(group).toHaveScreenshot('buttongroup-disabled-active-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Layout Variants', () => {
      it('fill width default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--fill-width-default', 'light'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-fill-width-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('fill width borderless matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--fill-width-borderless', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot(
          'buttongroup-fill-width-borderless-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('Multi-select', () => {
      it('multi-select default matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--multi-select-selected', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const pressedButtons = page.getByRole('button', { pressed: true });
        await expect(pressedButtons).toHaveCount(2);
        await expect(group).toHaveScreenshot('buttongroup-multi-select-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('multi-select borderless matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--multi-select-borderless', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const pressedButtons = page.getByRole('button', { pressed: true });
        await expect(pressedButtons).toHaveCount(2);
        await expect(group).toHaveScreenshot(
          'buttongroup-multi-select-borderless-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });
  });

  describe('Dark Theme', () => {
    describe('Type Variants', () => {
      it('default type matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('borderless type matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--borderless', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-borderless-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('iconOnly type matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--icon-only', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-icon-only-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Selection States', () => {
      it('default type with selection matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default-selected', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const activeButton = page.getByRole('button', { pressed: true });
        await expect(activeButton).toBeVisible();
        await expect(group).toHaveScreenshot('buttongroup-default-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('borderless type with selection matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--borderless-selected', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const activeButton = page.getByRole('button', { pressed: true });
        await expect(activeButton).toBeVisible();
        await expect(group).toHaveScreenshot('buttongroup-borderless-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('iconOnly type with selection matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--icon-only-selected', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const activeButton = page.getByRole('button', { pressed: true });
        await expect(activeButton).toBeVisible();
        await expect(group).toHaveScreenshot('buttongroup-icon-only-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('with disabled button matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--with-disabled-button', 'dark'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const disabledButton = page.getByRole('button', { name: 'Disabled' });
        await expect(disabledButton).toBeDisabled();
        await expect(group).toHaveScreenshot('buttongroup-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with disabled and selected button matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--with-disabled-selected-button', 'dark'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const disabledActiveButton = page.getByRole('button', {
          name: 'Disabled Active',
        });
        await expect(disabledActiveButton).toBeDisabled();
        await expect(disabledActiveButton).toHaveAttribute('aria-pressed', 'true');
        await expect(group).toHaveScreenshot('buttongroup-disabled-active-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Layout Variants', () => {
      it('fill width default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--fill-width-default', 'dark'), {
          waitUntil: 'networkidle',
        });
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot('buttongroup-fill-width-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('fill width borderless matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--fill-width-borderless', 'dark'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        await expect(group).toHaveScreenshot(
          'buttongroup-fill-width-borderless-dark.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('Multi-select', () => {
      it('multi-select default matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--multi-select-selected', 'dark'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const pressedButtons = page.getByRole('button', { pressed: true });
        await expect(pressedButtons).toHaveCount(2);
        await expect(group).toHaveScreenshot('buttongroup-multi-select-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('multi-select borderless matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('buttons-buttongroup--multi-select-borderless', 'dark'),
          {
            waitUntil: 'networkidle',
          }
        );
        const group = page.getByRole('group');
        await expect(group).toBeVisible({ timeout: 10000 });
        const pressedButtons = page.getByRole('button', { pressed: true });
        await expect(pressedButtons).toHaveCount(2);
        await expect(group).toHaveScreenshot(
          'buttongroup-multi-select-borderless-dark.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });
  });

  describe('Interactive States', () => {
    describe('Light Theme', () => {
      it('hover state on button', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('buttongroup-button-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state on button', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('buttongroup-button-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Dark Theme', () => {
      it('hover state on button', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default', 'dark'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('buttongroup-button-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state on button', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-buttongroup--default', 'dark'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('buttongroup-button-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('keyboard navigation works with Tab', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-buttongroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const buttons = page.getByRole('button');
      await expect(buttons.first()).toBeVisible({ timeout: 10000 });

      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(buttons.first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttons.nth(1)).toBeFocused();
    });

    it('button can be activated with Space key', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-buttongroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const firstButton = page.getByRole('button').first();
      await expect(firstButton).toBeVisible({ timeout: 10000 });

      // Focus the button and activate with Space
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(firstButton).toBeFocused();
      await page.keyboard.press('Space');

      // Verify the button is now selected (aria-pressed="true")
      await expect(firstButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('button can be activated with Enter key', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-buttongroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const secondButton = page.getByRole('button').nth(1);
      await expect(secondButton).toBeVisible({ timeout: 10000 });

      // Focus the second button and activate with Enter
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(secondButton).toBeFocused();
      await page.keyboard.press('Enter');

      // Verify the button is now selected (aria-pressed="true")
      await expect(secondButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('aria-pressed reflects selection', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-buttongroup--default-selected', 'light'), {
        waitUntil: 'networkidle',
      });
      const activeButton = page.getByRole('button', { name: 'Option 1' });
      await expect(activeButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('group has accessible name when aria-label is provided', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-buttongroup--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.getByRole('group');
      await expect(group).toBeVisible({ timeout: 10000 });

      await expect(group).toHaveAttribute('aria-label');
    });
  });
});
