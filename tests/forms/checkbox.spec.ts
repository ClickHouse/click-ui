import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const checkboxLocator = '[data-testid="checkbox"]';

describe('Checkbox Visual Regression', () => {
  describe('Light Theme', () => {
    describe('States (default variant)', () => {
      it('default (unchecked) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'checked');
        await expect(checkbox).toHaveScreenshot('checkbox-default-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('indeterminate matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default-indeterminate', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
        await expect(checkbox).toHaveScreenshot(
          'checkbox-default-indeterminate-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).toHaveScreenshot('checkbox-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--disabled-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'checked');
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).toHaveScreenshot('checkbox-disabled-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled indeterminate matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--disabled-indeterminate', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).toHaveScreenshot(
          'checkbox-disabled-indeterminate-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('Color Variants (checked)', () => {
      it('var1 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-1-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var1-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('var2 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-2-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var2-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('var3 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-3-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var3-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('var4 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-4-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var4-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('var5 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-5-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var5-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('var6 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-6-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var6-checked-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Layout', () => {
      it('orientation vertical with dir start matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('forms-checkbox--orientation-vertical-dir-start', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        const wrapper = checkbox.locator('..');
        await expect(wrapper).toHaveScreenshot(
          'checkbox-vertical-start-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('orientation horizontal with dir start matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('forms-checkbox--orientation-horizontal-dir-start', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        const wrapper = checkbox.locator('..');
        await expect(wrapper).toHaveScreenshot(
          'checkbox-horizontal-start-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('without label matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--no-label', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-no-label-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await checkbox.hover();
        await page.waitForTimeout(100);
        await expect(checkbox).toHaveScreenshot('checkbox-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await page.locator('body').click();
        await page.keyboard.press('Tab');
        await expect(checkbox).toBeFocused();
        await expect(checkbox).toHaveScreenshot('checkbox-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme', () => {
    use({ colorScheme: 'dark' });

    describe('States (default variant)', () => {
      it('default (unchecked) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'checked');
        await expect(checkbox).toHaveScreenshot('checkbox-default-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('indeterminate matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--default-indeterminate'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
        await expect(checkbox).toHaveScreenshot(
          'checkbox-default-indeterminate-dark.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--disabled'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).toHaveScreenshot('checkbox-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--disabled-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'checked');
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).toHaveScreenshot('checkbox-disabled-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled indeterminate matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--disabled-indeterminate'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).toHaveScreenshot(
          'checkbox-disabled-indeterminate-dark.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('Color Variants (checked)', () => {
      it('var1 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-1-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var1-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('var2 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-2-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var2-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('var3 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-3-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var3-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('var4 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-4-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var4-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('var5 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-5-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var5-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('var6 checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-checkbox--var-6-checked'), {
          waitUntil: 'networkidle',
        });
        const checkbox = page.locator(checkboxLocator);
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        await expect(checkbox).toHaveScreenshot('checkbox-var6-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('exposes role=checkbox', async ({ page }) => {
      await page.goto(getStoryUrl('forms-checkbox--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const checkbox = page.getByRole('checkbox');
      await expect(checkbox).toBeVisible({ timeout: 10000 });
    });

    it('label clicks toggle the checkbox', async ({ page }) => {
      await page.goto(getStoryUrl('forms-checkbox--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const checkbox = page.getByRole('checkbox');
      await expect(checkbox).toHaveAttribute('data-state', 'unchecked');
      await page.getByText('Accept terms and conditions').click();
      await expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('Space key toggles the checkbox', async ({ page }) => {
      await page.goto(getStoryUrl('forms-checkbox--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const checkbox = page.getByRole('checkbox');
      await expect(checkbox).toHaveAttribute('data-state', 'unchecked');
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(checkbox).toBeFocused();
      await page.keyboard.press('Space');
      await expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('disabled checkbox is not focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('forms-checkbox--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const checkbox = page.getByRole('checkbox');
      await expect(checkbox).toBeDisabled();
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(checkbox).not.toBeFocused();
    });
  });
});
