// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Container
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const containerLocator = '[data-testid="container"]';

const variants = [
  'horizontal',
  'vertical',
  'gap-none',
  'gap-large',
  'padding-large',
  'align-start',
  'align-end',
  'align-stretch',
  'justify-center',
  'justify-space-between',
  'justify-end',
  'fill-width',
  'wrap',
  'grow',
  'fill-height',
];

describe('Container Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`layout-container--${variant}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const container = page.locator(containerLocator).first();
        await expect(container).toBeVisible({ timeout: 10000 });
        await expect(container).toHaveScreenshot(`container-${variant}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const variant of variants) {
      it(`${variant} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`layout-container--${variant}`), {
          waitUntil: 'networkidle',
        });
        const container = page.locator(containerLocator).first();
        await expect(container).toBeVisible({ timeout: 10000 });
        await expect(container).toHaveScreenshot(`container-${variant}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  // Layout props are forwarded to the DOM as inherited CSS custom properties.
  // A nested Container that omits those props must keep its own defaults rather
  // than inheriting the parent's, otherwise a parent with `fillHeight`/`grow`
  // stretches every descendant Container to full height (regression observed in
  // the control-plane alert banner). Assert computed styles directly so the
  // guard does not depend on a pixel baseline.
  describe('isolating layout custom properties from nested Containers', () => {
    it('does not let a nested Container inherit its ancestor’s fillHeight, grow, or overflow', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('layout-container--nested-inheritance', 'light'), {
        waitUntil: 'networkidle',
      });

      const child = page.locator('[data-testid="child-container"]');
      await expect(child).toBeVisible({ timeout: 10000 });

      const { flexGrow, overflowX, fillsParentHeight } = await child.evaluate(node => {
        const el = node as HTMLElement;
        const style = getComputedStyle(el);
        const parent = el.parentElement as HTMLElement;
        return {
          flexGrow: style.flexGrow,
          overflowX: style.overflowX,
          // The parent is 200px tall via fillHeight; the child wraps a single
          // 32px box, so it must hug its content rather than stretch to fill.
          fillsParentHeight: el.clientHeight >= parent.clientHeight,
        };
      });

      expect(flexGrow).toBe('0');
      expect(overflowX).toBe('visible');
      expect(fillsParentHeight).toBe(false);
    });
  });
});
