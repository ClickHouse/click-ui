// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Collapsible
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="collapsible-harness"]';

const variants = [
  { story: 'closed', name: 'closed' },
  { story: 'open', name: 'open' },
  { story: 'indicator-end', name: 'indicator-end' },
  { story: 'with-icon', name: 'with-icon' },
  { story: 'with-icon-end', name: 'with-icon-end' },
];

describe('Collapsible Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-collapsible--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`collapsible-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }

    it('header hover reveals trigger icon matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-collapsible--open', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await harness.hover();
      await page.waitForTimeout(300);
      await expect(harness).toHaveScreenshot('collapsible-hover-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-collapsible--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`collapsible-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }

    it('header hover reveals trigger icon matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-collapsible--open'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await harness.hover();
      await page.waitForTimeout(300);
      await expect(harness).toHaveScreenshot('collapsible-hover-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('toggles content open via the trigger button', async ({ page }) => {
      await page.goto(getStoryUrl('display-collapsible--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const trigger = page.getByRole('button', { name: 'trigger children' });
      await expect(trigger).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('This is a sample content')).toBeHidden();
      await trigger.click();
      await expect(page.getByText('This is a sample content')).toBeVisible();
    });
  });
});
