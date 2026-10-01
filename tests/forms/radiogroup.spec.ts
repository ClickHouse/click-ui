// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/RadioGroup
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const groupLocator = '[role="radiogroup"]';

describe('RadioGroup Visual Regression', () => {
  describe('Light Theme', () => {
    it('default matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-default-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('checked matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--checked', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-checked-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-disabled-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled checked matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--disabled-checked', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-disabled-checked-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('inline matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--inline', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-inline-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('vertical matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--vertical', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-vertical-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('with label matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--with-label', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      const root = group.locator('../..');
      await expect(root).toHaveScreenshot('radiogroup-with-label-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('with error matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--with-error', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      const root = group.locator('../..');
      await expect(root).toHaveScreenshot('radiogroup-with-error-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('label horizontal dir start matches snapshot', async ({ page }) => {
      await page.goto(
        getStoryUrl('forms-radiogroup--label-horizontal-dir-start', 'light'),
        {
          waitUntil: 'networkidle',
        }
      );
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      const root = group.locator('../..');
      await expect(root).toHaveScreenshot('radiogroup-label-horizontal-start-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme', () => {
    use({ colorScheme: 'dark' });

    it('default matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-default-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('checked matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--checked'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-checked-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--disabled'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-disabled-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled checked matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--disabled-checked'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-disabled-checked-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('vertical matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--vertical'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await expect(group).toHaveScreenshot('radiogroup-vertical-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('with error matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--with-error'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      const root = group.locator('../..');
      await expect(root).toHaveScreenshot('radiogroup-with-error-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Interactive States', () => {
    it('hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      const radio = page.getByRole('radio').first();
      await radio.hover();
      await page.waitForTimeout(100);
      await expect(group).toHaveScreenshot('radiogroup-hover-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('focus state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const group = page.locator(groupLocator);
      await expect(group).toBeVisible({ timeout: 10000 });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('radio').first()).toBeFocused();
      await expect(group).toHaveScreenshot('radiogroup-focus-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Accessibility', () => {
    it('exposes role=radiogroup', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      await expect(page.getByRole('radiogroup')).toBeVisible({ timeout: 10000 });
    });

    it('exposes radio items', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      await expect(page.getByRole('radio')).toHaveCount(3);
    });

    it('arrow keys move focus between radios', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const first = page.getByRole('radio').first();
      const second = page.getByRole('radio').nth(1);
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(first).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(second).toBeFocused();
    });

    it('disabled group radios are not focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('forms-radiogroup--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('radio').first()).not.toBeFocused();
    });
  });
});
