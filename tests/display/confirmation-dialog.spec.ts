// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/ConfirmationDialog
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const contentLocator = '[data-testid="click-dialog-contentarea"]';

// Animations are 150ms; wait for them to settle before screenshotting.
const settleMs = 300;

const stories = [
  { id: 'display-confirmationdialog--playground', name: 'playground' },
  { id: 'display-confirmationdialog--primary', name: 'primary' },
  { id: 'display-confirmationdialog--danger', name: 'danger' },
  { id: 'display-confirmationdialog--disabled', name: 'disabled' },
  { id: 'display-confirmationdialog--loading', name: 'loading' },
  { id: 'display-confirmationdialog--with-close', name: 'with-close' },
];

describe('ConfirmationDialog Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const story of stories) {
      it(`${story.name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(story.id, 'light'), {
          waitUntil: 'networkidle',
        });
        const content = page.locator(contentLocator).first();
        await expect(content).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(settleMs);
        await expect(content).toHaveScreenshot(
          `confirmation-dialog-${story.name}-light.png`,
          { maxDiffPixels: 100 }
        );
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const story of stories) {
      it(`${story.name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(story.id), {
          waitUntil: 'networkidle',
        });
        const content = page.locator(contentLocator).first();
        await expect(content).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(settleMs);
        await expect(content).toHaveScreenshot(
          `confirmation-dialog-${story.name}-dark.png`,
          { maxDiffPixels: 100 }
        );
      });
    }
  });

  describe('Interactive States', () => {
    it('confirm button shows focus on open', async ({ page }) => {
      await page.goto(getStoryUrl('display-confirmationdialog--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      const confirm = page.getByTestId('confirm-action-button');
      await expect(confirm).toBeFocused();
      await expect(content).toHaveScreenshot(
        'confirmation-dialog-confirm-focus-light.png',
        { maxDiffPixels: 100 }
      );
    });

    it('primary action hover matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-confirmationdialog--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await page.getByTestId('confirm-action-button').hover();
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot(
        'confirmation-dialog-confirm-hover-light.png',
        { maxDiffPixels: 100 }
      );
    });
  });

  describe('Accessibility', () => {
    it('exposes a dialog role with an accessible title', async ({ page }) => {
      await page.goto(getStoryUrl('display-confirmationdialog--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('click-dialog-title')).toHaveText(
        'Example dialog title'
      );
    });

    it('renders the confirm and cancel action buttons', async ({ page }) => {
      await page.goto(getStoryUrl('display-confirmationdialog--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('cancel-action-button')).toBeVisible();
      await expect(page.getByTestId('confirm-action-button')).toBeVisible();
    });
  });
});
