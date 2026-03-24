import { test as it, expect } from '@playwright/test';

const { describe, beforeEach, afterEach } = it;

const getStory = (id: string) => ({
  id,
  pathname: `/iframe.html?path=/story/${id}`,
});

describe('Buttons', () => {
  describe('Button', () => {
    const { id, pathname } = getStory('buttons-button--playground');

    beforeEach(async ({ page }) => {
      await page.goto(pathname, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
    });

    afterEach(async ({ page }) => {
      await page.close();
    });

    it(`should render ${id}`, async ({ page }) => {
      const button = page.getByRole('button');

      await expect(button).toBeVisible({ timeout: 10_000 });

      await expect(button).toHaveScreenshot(`${id}.png`, {
        timeout: 10_000,
        maxDiffPixels: 100,
      });
    });
  });

  describe('ButtonGroup', () => {
    const { id, pathname } = getStory('buttons-buttongroup--playground');

    beforeEach(async ({ page }) => {
      await page.goto(pathname, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
    });

    afterEach(async ({ page }) => {
      await page.close();
    });

    it(`should render ${id}`, async ({ page }) => {
      const button = page.locator('[class*="ButtonGroupWrapper"]');

      await expect(button).toBeVisible({ timeout: 10_000 });

      await expect(button).toHaveScreenshot(`${id}.png`, {
        timeout: 10_000,
        maxDiffPixels: 100,
      });
    });

    it(`should render ${id}, on first element click`, async ({ page }) => {
      const button = page.locator('[role="button"]:nth-child(1)');

      await expect(button).toBeVisible({ timeout: 10_000 });

      await button.click();

      await expect(button).toHaveScreenshot(`${id}-pressed-first.png`, {
        timeout: 10_000,
        maxDiffPixels: 100,
      });
    });

    it(`should ${id}, on second element click have aria-pressed`, async ({ page }) => {
      const button = page.locator('[role="button"]:nth-child(2)');

      await expect(button).toBeVisible({ timeout: 10_000 });

      await button.click();

      await expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });
});

