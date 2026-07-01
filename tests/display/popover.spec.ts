// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Popover
// @covers src/components/EmptyButton
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

// The popover close button is rendered via `<CloseButton as={RadixPopover.Close}>`
// where CloseButton = styled(EmptyButton). The `as` prop bypasses EmptyButton's
// own render, so this spec guards that the close button still renders correctly
// after EmptyButton's CSS Modules migration.
const contentLocator = '[data-radix-popper-content-wrapper]';

// Popover has no open/close animation, but give the portal a beat to mount.
const settleMs = 200;

describe('Popover Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('open popover with close button matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-popover--open-with-close', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('popover-open-with-close-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('open popover with close button matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-popover--open-with-close'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(content).toHaveScreenshot('popover-open-with-close-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('renders the close affordance inside the open popover', async ({ page }) => {
      await page.goto(getStoryUrl('display-popover--open-with-close', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page.locator(contentLocator).first();
      await expect(content).toBeVisible({ timeout: 10000 });
      // CloseButton renders `as={RadixPopover.Close}` with `asChild`, merging the
      // close behavior onto the cross Icon (an svg), so there is no button role.
      await expect(content.locator('svg').first()).toBeVisible();
    });
  });

  // The trigger styles (`width: fit-content`, `cursor: pointer`, and the
  // `background`/`color`/`font: inherit` + `border: none` resets) are applied via
  // `<Popover.Trigger asChild>` onto its wrapping `<div>`. No panel snapshot covers
  // the trigger itself, so these guard the styled(RadixPopover.Trigger) migration.
  describe('Trigger', () => {
    it('trigger matches snapshot (light)', async ({ page }) => {
      await page.goto(getStoryUrl('display-popover--trigger-only', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.getByTestId('popover-trigger-harness');
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(harness).toHaveScreenshot('popover-trigger-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('trigger uses the pointer cursor', async ({ page }) => {
      await page.goto(getStoryUrl('display-popover--trigger-only', 'light'), {
        waitUntil: 'networkidle',
      });
      const trigger = page.getByText('Click Here');
      await expect(trigger).toBeVisible({ timeout: 10000 });
      await expect(trigger).toHaveCSS('cursor', 'pointer');
    });
  });

  describe('Trigger Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('trigger matches snapshot (dark)', async ({ page }) => {
      await page.goto(getStoryUrl('display-popover--trigger-only'), {
        waitUntil: 'networkidle',
      });
      const harness = page.getByTestId('popover-trigger-harness');
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(settleMs);
      await expect(harness).toHaveScreenshot('popover-trigger-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
