// Consumer-override contract for the `clickui` cascade layer.
// @covers src/theme/styles
import { test as it, expect } from '@playwright/test';

const { describe } = it;

// Stand-in for a click-ui theme token: declared inside the `clickui` layer,
// exactly as the build wraps `theme/styles/tokens-*.css`.
const CLICKUI_TOKEN = '@layer clickui { :root { --probe: rgb(255, 0, 0); } }';

// A probe element that renders the token so we can read it back via color.
const PROBE = '<div id="probe" style="color: var(--probe)">probe</div>';

const colorWith = async (
  page: import('@playwright/test').Page,
  css: string
): Promise<string> => {
  await page.setContent(`<style>${css}</style>${PROBE}`);
  return page.$eval('#probe', el => getComputedStyle(el).color);
};

describe('clickui layer — consumer token overrides win', () => {
  it('the layered token applies when the consumer sets nothing', async ({ page }) => {
    expect(await colorWith(page, CLICKUI_TOKEN)).toBe('rgb(255, 0, 0)');
  });

  it('an unlayered consumer token override beats the layered token', async ({ page }) => {
    const css = `${CLICKUI_TOKEN} :root { --probe: rgb(0, 128, 0); }`;
    expect(await colorWith(page, css)).toBe('rgb(0, 128, 0)');
  });

  it('a consumer token override in a layer declared after `clickui` wins', async ({
    page,
  }) => {
    const css = `@layer clickui, app; ${CLICKUI_TOKEN} @layer app { :root { --probe: rgb(0, 0, 255); } }`;
    expect(await colorWith(page, css)).toBe('rgb(0, 0, 255)');
  });
});
