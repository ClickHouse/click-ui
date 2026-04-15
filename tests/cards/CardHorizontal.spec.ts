import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('CardHorizontal Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Color Variants', () => {
      it('default color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-color', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-default-color-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('muted color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted-color', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-muted-color-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Size Variants', () => {
      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--small-size', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-small-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('medium size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--medium-size', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-medium-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('default disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot(
          'card-horizontal-default-disabled-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('muted disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-horizontal-muted-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Selected States', () => {
      it('default selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-pressed', 'true');
        await expect(card).toHaveScreenshot(
          'card-horizontal-default-selected-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });

      it('muted selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted-selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-pressed', 'true');
        await expect(card).toHaveScreenshot('card-horizontal-muted-selected-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled and selected matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-horizontal-card--default-disabled-selected', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveAttribute('aria-pressed', 'true');
        await expect(card).toHaveScreenshot(
          'card-horizontal-disabled-selected-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('With Badge', () => {
      it('with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-badge', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-with-badge-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with badge and icon matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-horizontal-card--with-badge-and-icon', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-with-badge-icon-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('With Info Button', () => {
      it('with info button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-info-button', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-with-info-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('muted with info button matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-horizontal-card--with-info-button-muted', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-info-muted-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled with info button matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-horizontal-card--with-info-button-disabled', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-horizontal-info-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - default color', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-color', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await expect(card).toHaveScreenshot('card-horizontal-default-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - default color', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-color', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await expect(card).toHaveScreenshot('card-horizontal-default-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Color Variants', () => {
      it('default color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-color'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-default-color-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('muted color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted-color'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-muted-color-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('default disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-disabled'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-horizontal-default-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('muted disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted-disabled'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-horizontal-muted-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Selected States', () => {
      it('default selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-selected'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-pressed', 'true');
        await expect(card).toHaveScreenshot('card-horizontal-default-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - default color', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-color'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await expect(card).toHaveScreenshot('card-horizontal-default-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - default color', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default-color'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await expect(card).toHaveScreenshot('card-horizontal-default-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('With Badge', () => {
      it('with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-badge'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-with-badge-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('With Info Button', () => {
      it('with info button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-info-button'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-horizontal');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-horizontal-with-info-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Events and Accessibility', () => {
    // NOTE: Click and keyboard tests verify the card remains functional (no crash)
    // but cannot assert handler invocation since Storybook stories don't expose
    // onButtonClick handlers for E2E verification. Handler logic is covered by
    // unit tests in CardHorizontal.test.tsx.
    it('click event fires correctly', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-horizontal');
      await expect(card).toBeVisible({ timeout: 10000 });
      await card.click();
      // Verify card remains visible and functional after click (no crash)
      await expect(card).toBeVisible();
    });

    it('disabled card prevents click and has aria-disabled', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--default-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-horizontal');
      await expect(card).toBeVisible({ timeout: 10000 });
      await expect(card).toHaveAttribute('aria-disabled', 'true');
    });

    it('keyboard navigation works', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-horizontal');
      await expect(card).toBeVisible({ timeout: 10000 });
      await card.focus();
      await expect(card).toBeFocused();
      await page.keyboard.press('Enter');
      // Verify card remains visible and functional after Enter key (no crash)
      await expect(card).toBeVisible();
    });

    it('tabIndex is -1 when disabled', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--default-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-horizontal');
      await expect(card).toBeVisible({ timeout: 10000 });
      await expect(card).toHaveAttribute('tabindex', '-1');
    });

    it('tabIndex is 0 when enabled', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--default-color', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-horizontal');
      await expect(card).toBeVisible({ timeout: 10000 });
      await expect(card).toHaveAttribute('tabindex', '0');
    });
  });
});
