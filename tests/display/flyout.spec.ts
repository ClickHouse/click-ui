// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Flyout
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

// The flyout content is a Radix dialog (`role="dialog"`).
const dialogLocator = 'role=dialog';

// The open animation (width) runs for 500ms; wait for it to settle before
// screenshotting.
const settleMs = 800;

const stories = [
  { id: 'display-flyout--open-default', name: 'open-default' },
  { id: 'display-flyout--inline-type', name: 'inline-type' },
  { id: 'display-flyout--align-start', name: 'align-start' },
  { id: 'display-flyout--no-shadow', name: 'no-shadow' },
  { id: 'display-flyout--size-narrow', name: 'size-narrow' },
  { id: 'display-flyout--size-wide', name: 'size-wide' },
  { id: 'display-flyout--size-widest', name: 'size-widest' },
  { id: 'display-flyout--body-align-top', name: 'body-align-top' },
] as const;

describe('Flyout Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { id, name } of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(id, 'light'), {
          waitUntil: 'networkidle',
        });
        const dialog = page.locator(dialogLocator).first();
        await expect(dialog).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(settleMs);
        await expect(dialog).toHaveScreenshot(`flyout-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { id, name } of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(id), {
          waitUntil: 'networkidle',
        });
        const dialog = page.locator(dialogLocator).first();
        await expect(dialog).toBeVisible({ timeout: 10000 });
        await page.waitForTimeout(settleMs);
        await expect(dialog).toHaveScreenshot(`flyout-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Accessibility', () => {
    it('exposes a dialog role with an accessible title', async ({ page }) => {
      await page.goto(getStoryUrl('display-flyout--open-default', 'light'), {
        waitUntil: 'networkidle',
      });
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Title').first()).toBeVisible();
    });

    it('renders a header close button', async ({ page }) => {
      await page.goto(getStoryUrl('display-flyout--open-default', 'light'), {
        waitUntil: 'networkidle',
      });
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible({ timeout: 10000 });
      await expect(
        page.getByTestId('flyout-header-close-btn').first()
      ).toBeVisible();
    });
  });
});
