// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/DateDetails
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="date-details-harness"]';
const contentLocator = '[data-radix-popper-content-wrapper]';

// The trigger is the wrapping `<div>` inside `<Popover.Trigger asChild>` — the
// only direct-child element of the harness (the popover content mounts in a
// portal elsewhere).
const triggerLocator = `${harnessLocator} > div`;

// Popover has no open/close animation, but give the portal a beat to mount.
const settleMs = 200;

describe('DateDetails Visual Regression', () => {
  describe('Trigger Light Theme (Storybook Global)', () => {
    it('trigger matches snapshot (light)', async ({ page }) => {
      await page.goto(getStoryUrl('display-datedetails--trigger', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(harness).toHaveScreenshot('datedetails-trigger-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('trigger hover matches snapshot (light)', async ({ page }) => {
      await page.goto(getStoryUrl('display-datedetails--trigger', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.locator(triggerLocator).hover();
      await page.waitForTimeout(settleMs);
      await expect(harness).toHaveScreenshot('datedetails-trigger-hover-light.png', {
        maxDiffPixels: 100,
      });
    });

    // The trigger reuses the Link component for its styling, but the trigger is
    // a popover button — not a navigation link. It renders as a non-anchor
    // element (no `href`, no link role) so assistive tech doesn't announce a
    // link whose activation opens a popover instead of navigating. Guards that
    // no anchor is emitted and that the reused Link styling still resolves.
    it('trigger renders link styling without an anchor element', async ({ page }) => {
      await page.goto(getStoryUrl('display-datedetails--trigger', 'light'), {
        waitUntil: 'networkidle',
      });
      const trigger = page.locator(triggerLocator);
      await expect(trigger).toBeVisible({ timeout: 10000 });
      await expect(trigger.locator('a')).toHaveCount(0);
      const link = trigger.locator('span').first();
      await expect(link).toHaveCSS('color', 'rgb(67, 126, 239)');
      await expect(link).toHaveCSS('font-weight', '500');
      await expect(link).toHaveCSS('font-size', '12px');
    });
  });

  describe('Trigger Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('trigger matches snapshot (dark)', async ({ page }) => {
      await page.goto(getStoryUrl('display-datedetails--trigger'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(harness).toHaveScreenshot('datedetails-trigger-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Open Content Light Theme (Storybook Global)', () => {
    it('open popover content matches snapshot (light)', async ({ page }) => {
      await page.goto(getStoryUrl('display-datedetails--open', 'light'), {
        waitUntil: 'networkidle',
      });
      await page.locator(triggerLocator).click();
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('datedetails-content-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Open Content Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('open popover content matches snapshot (dark)', async ({ page }) => {
      await page.goto(getStoryUrl('display-datedetails--open'), {
        waitUntil: 'networkidle',
      });
      await page.locator(triggerLocator).click();
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('datedetails-content-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
