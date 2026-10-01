// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/GenericLabel
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const labelLocator = 'label';

describe('GenericLabel Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('States', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await expect(label).toHaveScreenshot('generic-label-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await expect(label).toHaveScreenshot('generic-label-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await label.hover();
        await page.waitForTimeout(100);
        await expect(label).toHaveScreenshot('generic-label-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus-within state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--default', 'light'), {
          waitUntil: 'networkidle',
        });
        await page.locator('body').click();
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await page.locator('#default-input').focus();
        await page.waitForTimeout(100);
        await expect(label).toHaveScreenshot('generic-label-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('States', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--default'), {
          waitUntil: 'networkidle',
        });
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await expect(label).toHaveScreenshot('generic-label-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--disabled'), {
          waitUntil: 'networkidle',
        });
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await expect(label).toHaveScreenshot('generic-label-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--default'), {
          waitUntil: 'networkidle',
        });
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await label.hover();
        await page.waitForTimeout(100);
        await expect(label).toHaveScreenshot('generic-label-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus-within state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-genericlabel--default'), {
          waitUntil: 'networkidle',
        });
        await page.locator('body').click();
        const label = page.locator(labelLocator).first();
        await expect(label).toBeVisible({ timeout: 10000 });
        await page.locator('#default-input').focus();
        await page.waitForTimeout(100);
        await expect(label).toHaveScreenshot('generic-label-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
