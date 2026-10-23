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

type Case = { id: string; story: string; expand?: 'click' | 'story' };

const expandAlert = async (page: import('@playwright/test').Page, mode: 'click' | 'story') => {
  const toggle = page.getByTestId('click-alert-toggle');
  await expect(toggle).toBeVisible({ timeout: 10000 });
  if (mode === 'click') {
    await toggle.click();
  }
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
};

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
  { id: 'single-line-text', story: 'display-alert--single-line-text' },
  { id: 'collapsed-newlines', story: 'display-alert--collapsed-newlines' },
  { id: 'multiline-text', story: 'display-alert--multiline-text' },
  { id: 'long-unbroken-token', story: 'display-alert--long-unbroken-token' },
  {
    id: 'collapsed-signatures-error',
    story: 'display-alert--collapsed-signatures-error',
  },
  {
    id: 'preserved-signatures-error',
    story: 'display-alert--preserved-signatures-error',
  },
  { id: 'max-height-fits', story: 'display-alert--max-height-fits' },
  { id: 'max-height-collapsed', story: 'display-alert--max-height-overflow' },
  {
    id: 'max-height-expanded',
    story: 'display-alert--max-height-overflow',
    expand: 'click',
  },
  {
    id: 'max-height-expanded-danger',
    story: 'display-alert--max-height-expanded',
    expand: 'story',
  },
  { id: 'max-height-with-link', story: 'display-alert--max-height-with-link' },
  { id: 'max-height-focus-visible', story: 'display-alert--max-height-focus-visible' },
  { id: 'max-height-on-background', story: 'display-alert--max-height-on-background' },
];

describe('Alert Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { id, story, expand } of cases) {
      it(`${id} matches snapshot`, async ({ page }) => {
        await goto(page, story, 'light');
        const node = alert(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        if (expand) {
          await expandAlert(page, expand);
        }
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

    for (const { id, story, expand } of cases) {
      it(`${id} matches snapshot`, async ({ page }) => {
        await goto(page, story);
        const node = alert(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        if (expand) {
          await expandAlert(page, expand);
        }
        await expect(node).toHaveScreenshot(`alert-${id}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
