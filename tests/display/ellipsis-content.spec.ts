// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/EllipsisContent
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="ellipsis-content-harness"]';

describe('EllipsisContent Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-truncated-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('not truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--not-truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-not-truncated-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('as span matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--as-span', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-as-span-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('with child element matches snapshot', async ({ page }) => {
      await page.goto(
        getStoryUrl('display-ellipsiscontent--with-child-element', 'light'),
        {
          waitUntil: 'networkidle',
        }
      );
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot(
        'ellipsis-content-with-child-element-light.png',
        {
          maxDiffPixels: 100,
        }
      );
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--truncated'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-truncated-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('not truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--not-truncated'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-not-truncated-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('as span matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--as-span'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-as-span-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('with child element matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--with-child-element'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot(
        'ellipsis-content-with-child-element-dark.png',
        {
          maxDiffPixels: 100,
        }
      );
    });
  });

  describe('Tooltip on overflow', () => {
    const fullText = 'This is a very long line of text that should be truncated';

    // The tooltip panel is portaled by Radix and, once shown, carries both a
    // data-state and a data-side. The trigger also gets data-state (and the same
    // inline text), so we key on data-side — which only the content panel has —
    // to avoid matching the trigger.
    const tooltipPanel = (page: import('@playwright/test').Page) =>
      page.locator(
        '[data-side][data-state="instant-open"], [data-side][data-state="delayed-open"]'
      );

    it('shows the tooltip with the full text on hover when it overflows', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(`${harnessLocator} > *`).first();
      // The native title attribute is no longer used; the tooltip replaces it.
      await expect(content).not.toHaveAttribute('title', /.+/);
      await content.hover();
      const panel = tooltipPanel(page);
      await expect(panel).toBeVisible({ timeout: 10000 });
      await expect(panel).toContainText(fullText);
    });

    it('does not show a tooltip when the text fits', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--not-truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(`${harnessLocator} > *`).first();
      await expect(content).not.toHaveAttribute('title', /.+/);
      await content.hover();
      // Nothing to open — the trigger is not wrapped in a Tooltip at all.
      await expect(
        page.locator('[data-state="instant-open"], [data-state="delayed-open"]')
      ).toHaveCount(0);
    });
  });
});
