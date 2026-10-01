// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Alert
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const alertLocator = '[data-testid="click-alert"]';

const goto = async (
  page: import('@playwright/test').Page,
  story: string,
  theme?: 'light'
) => {
  await page.goto(getStoryUrl(story, theme), { waitUntil: 'networkidle' });
};

const alert = (page: import('@playwright/test').Page) =>
  page.locator(alertLocator).first();

type Case = { id: string; story: string };

const cases: Case[] = [
  { id: 'state-neutral', story: 'display-alert--state-neutral' },
  { id: 'state-success', story: 'display-alert--state-success' },
  { id: 'state-warning', story: 'display-alert--state-warning' },
  { id: 'state-danger', story: 'display-alert--state-danger' },
  { id: 'state-info', story: 'display-alert--state-info' },
  { id: 'size-small', story: 'display-alert--size-small' },
  { id: 'size-medium', story: 'display-alert--size-medium' },
  { id: 'banner-small', story: 'display-alert--banner-small' },
  { id: 'banner-medium', story: 'display-alert--banner-medium' },
  { id: 'no-icon', story: 'display-alert--no-icon' },
  { id: 'custom-icon', story: 'display-alert--custom-icon' },
  { id: 'dismissible', story: 'display-alert--dismissible' },
  { id: 'dismissible-banner', story: 'display-alert--dismissible-banner' },
  { id: 'title-with-link', story: 'display-alert--title-with-link' },
];

describe('Alert Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { id, story } of cases) {
      it(`${id} matches snapshot`, async ({ page }) => {
        await goto(page, story, 'light');
        const node = alert(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot(`alert-${id}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }

    describe('Dismissible behavior', () => {
      it('dismiss button exposes aria-label', async ({ page }) => {
        await goto(page, 'display-alert--dismissible', 'light');
        const closeButton = page.getByLabel('close').first();
        await expect(closeButton).toBeVisible({ timeout: 10000 });
      });

      it('dismissing hides the alert', async ({ page }) => {
        await goto(page, 'display-alert--dismissible', 'light');
        const node = alert(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await page.getByTestId('click-alert-dismiss-button').click();
        await expect(node).toBeHidden({ timeout: 10000 });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { id, story } of cases) {
      it(`${id} matches snapshot`, async ({ page }) => {
        await goto(page, story);
        const node = alert(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot(`alert-${id}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
