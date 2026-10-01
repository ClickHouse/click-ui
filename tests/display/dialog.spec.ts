// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Dialog
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const contentLocator = '[data-testid="click-dialog-contentarea"]';

// Animations are 150ms; wait for them to settle before screenshotting.
const settleMs = 300;

describe('Dialog Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('modal dialog matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--modal-dialog', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-modal-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('with description matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--with-description', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-with-description-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('title only matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--title-only', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-title-only-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('only close matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--only-close', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-only-close-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('no header matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--no-header', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-no-header-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('reduce padding matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--reduce-padding', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-reduce-padding-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('chat dialog matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--chat-dialog', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-chat-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('modal dialog matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--modal-dialog'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-modal-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('with description matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--with-description'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-with-description-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('title only matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--title-only'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-title-only-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('only close matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--only-close'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-only-close-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('no header matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--no-header'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-no-header-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('reduce padding matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--reduce-padding'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-reduce-padding-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('chat dialog matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--chat-dialog'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('dialog-chat-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Accessibility', () => {
    it('exposes a dialog role with an accessible title', async ({ page }) => {
      await page.goto(getStoryUrl('display-dialog--modal-dialog', 'light'), {
        waitUntil: 'networkidle',
      });
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('click-dialog-title')).toHaveText(
        'Example dialog title'
      );
    });

    it('renders a close button inside the dialog when showClose is set', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('display-dialog--only-close', 'light'), {
        waitUntil: 'networkidle',
      });
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible({ timeout: 10000 });
      await expect(dialog.getByRole('button').first()).toBeVisible();
    });
  });
});
