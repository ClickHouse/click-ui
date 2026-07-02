// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/InputWrapper
// @covers src/components/TextField
// @covers src/components/NumberField
// @covers src/components/PasswordField
// @covers src/components/TextAreaField
// @covers src/components/SearchField
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

// The InputWrapper-based fields render no stable test-id. `#storybook-root`
// itself reports as hidden, so we screenshot its first child element — the
// rendered field's outermost node (FormRoot, or the story decorator wrapping
// it) — which carries the full composed widget (label + wrapper + control +
// content). This is what proves the shared InputWrapper styling.
const ROOT = '#storybook-root > *';

type Case = {
  name: string;
  storyId: string;
};

const cases: Record<string, Case[]> = {
  TextField: [
    { name: 'playground', storyId: 'forms-input-textfield--playground' },
    { name: 'label-color', storyId: 'forms-input-textfield--label-color' },
    { name: 'disabled', storyId: 'forms-input-textfield--disabled' },
    { name: 'error', storyId: 'forms-input-textfield--error' },
    { name: 'start-content', storyId: 'forms-input-textfield--with-start-content' },
    { name: 'clear', storyId: 'forms-input-textfield--with-clear' },
  ],
  NumberField: [
    { name: 'playground', storyId: 'forms-input-numberfield--playground' },
    { name: 'end-content', storyId: 'forms-input-numberfield--with-end-content' },
    { name: 'start-content', storyId: 'forms-input-numberfield--with-start-content' },
    { name: 'disabled', storyId: 'forms-input-numberfield--disabled' },
    { name: 'error', storyId: 'forms-input-numberfield--error' },
  ],
  PasswordField: [
    { name: 'playground', storyId: 'forms-input-passwordfield--playground' },
    { name: 'with-value', storyId: 'forms-input-passwordfield--with-value' },
    { name: 'disabled', storyId: 'forms-input-passwordfield--disabled' },
    { name: 'error', storyId: 'forms-input-passwordfield--error' },
  ],
  TextAreaField: [
    { name: 'playground', storyId: 'forms-input-textarea--playground' },
    { name: 'disabled', storyId: 'forms-input-textarea--disabled' },
    { name: 'error', storyId: 'forms-input-textarea--error' },
  ],
  SearchField: [
    { name: 'playground', storyId: 'forms-input-searchfield--playground' },
    { name: 'with-value', storyId: 'forms-input-searchfield--with-value' },
    { name: 'filter', storyId: 'forms-input-searchfield--filter' },
    { name: 'disabled', storyId: 'forms-input-searchfield--disabled' },
  ],
};

const themes = ['light', 'dark'] as const;

describe('InputWrapper-based fields Visual Regression', () => {
  for (const [component, componentCases] of Object.entries(cases)) {
    describe(component, () => {
      for (const theme of themes) {
        describe(`${theme} theme`, () => {
          for (const { name, storyId } of componentCases) {
            it(`${name} matches snapshot`, async ({ page }) => {
              await page.goto(getStoryUrl(storyId, theme), {
                waitUntil: 'networkidle',
              });
              const root = page.locator(ROOT).first();
              await expect(root).toBeVisible({ timeout: 10000 });
              await expect(root).toHaveScreenshot(
                `${component.toLowerCase()}-${name}-${theme}.png`,
                { maxDiffPixels: 100 }
              );
            });
          }
        });
      }
    });
  }

  describe('Interactive states (light theme)', () => {
    it('text field focus-within matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-input-textfield--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(ROOT).first();
      await expect(root).toBeVisible({ timeout: 10000 });
      await page.getByRole('textbox').focus();
      await expect(root).toHaveScreenshot('textfield-focus-within-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('text field hover matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('forms-input-textfield--playground', 'light'), {
        waitUntil: 'networkidle',
      });
      const root = page.locator(ROOT).first();
      await expect(root).toBeVisible({ timeout: 10000 });
      await page.getByRole('textbox').hover();
      await expect(root).toHaveScreenshot('textfield-hover-light.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
