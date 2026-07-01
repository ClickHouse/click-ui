// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/CodeBlock
// @covers src/components/EmptyButton
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

// The copy and wrap buttons are rendered via `<CodeButton as={IconButton}>` where
// CodeButton = styled(EmptyButton). The `as` prop bypasses EmptyButton's own
// render, so this spec guards that those buttons still render correctly after
// EmptyButton's CSS Modules migration. The WithWrapButton story shows both.
const rootLocator = '[data-testid="codeblock-harness"]';

describe('CodeBlock Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('with wrap button matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('codeblocks-codeblock--with-wrap-button', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button').first()).toBeVisible();
      await expect(root).toHaveScreenshot('codeblock-with-wrap-button-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('copied state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('codeblocks-codeblock--with-wrap-button', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      // The last button is the copy button; clicking it flips to the copied state.
      await page.getByRole('button').last().click();
      await page.waitForTimeout(100);
      await expect(root).toHaveScreenshot('codeblock-copied-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('with wrap button matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('codeblocks-codeblock--with-wrap-button'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button').first()).toBeVisible();
      await expect(root).toHaveScreenshot('codeblock-with-wrap-button-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('renders copy and wrap buttons', async ({ page }) => {
      await page.goto(getStoryUrl('codeblocks-codeblock--with-wrap-button', 'light'), {
        waitUntil: 'networkidle',
      });
      await expect(page.getByRole('button')).toHaveCount(2);
    });
  });
});
