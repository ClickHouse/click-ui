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
const inlineLocator = '[data-testid="inline-codeblock-harness"]';

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
      // Force the copy to succeed so the copy button flips to the copied color.
      // This exercises the copy button's copied state. In a
      // headless container `navigator.clipboard.writeText` otherwise rejects, so
      // we stub it to resolve.
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: {
            writeText: () => Promise.resolve(),
          },
        });
      });
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

    it('error state matches snapshot', async ({ page }) => {
      // Force the copy to fail so the copy button flips to the error color.
      // This exercises the copy button's error state.
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: {
            writeText: () => Promise.reject(new Error('denied')),
          },
        });
      });
      await page.goto(getStoryUrl('codeblocks-codeblock--with-wrap-button', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      await page.getByRole('button').last().click();
      await page.waitForTimeout(100);
      await expect(root).toHaveScreenshot('codeblock-error-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('without line numbers matches snapshot', async ({ page }) => {
      await page.goto(
        getStoryUrl('codeblocks-codeblock--without-line-numbers', 'light'),
        { waitUntil: 'networkidle' }
      );
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button').first()).toBeVisible();
      await expect(root).toHaveScreenshot('codeblock-without-line-numbers-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('light code theme matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('codeblocks-codeblock--light-code-theme', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button').first()).toBeVisible();
      await expect(root).toHaveScreenshot('codeblock-light-code-theme.png', {
        maxDiffPixels: 100,
      });
    });

    it('dark code theme matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('codeblocks-codeblock--dark-code-theme', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(rootLocator);
      await expect(root).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button').first()).toBeVisible();
      await expect(root).toHaveScreenshot('codeblock-dark-code-theme.png', {
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

describe('InlineCodeBlock Visual Regression', () => {
  it('light theme matches snapshot', async ({ page }) => {
    await page.goto(getStoryUrl('codeblocks-inline--playground', 'light'), {
      waitUntil: 'networkidle',
    });
    const root = page.locator(inlineLocator);
    await expect(root).toBeVisible({ timeout: 10000 });
    await expect(root).toHaveScreenshot('inline-codeblock-light.png', {
      maxDiffPixels: 100,
    });
  });

  it('dark theme matches snapshot', async ({ page }) => {
    await page.goto(getStoryUrl('codeblocks-inline--playground', 'dark'), {
      waitUntil: 'networkidle',
    });
    const root = page.locator(inlineLocator);
    await expect(root).toBeVisible({ timeout: 10000 });
    await expect(root).toHaveScreenshot('inline-codeblock-dark.png', {
      maxDiffPixels: 100,
    });
  });
});
