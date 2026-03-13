// NOTE: Using `tsx` instead of `mdx` due to an error
// The Storybook MDX plugin doesn't set moduleType
// which Roldown requires.
// Can revisit and put back mdx later once plugin updated

import type { Meta, StoryObj } from '@storybook/react';

const DocsPage = () => (
  <>
    <div style={{ marginBottom: '20px' }}>
      <img
        src="/clickhouse-backs.png"
        alt="Click UI"
        style={{ width: '100%', borderRadius: '4px' }}
      />
    </div>

    <h1>Click UI</h1>

    <p>
      Click UI is the ClickHouse design system and component library. Our aim with Click UI is to
      provide an accessible, theme-able, modern, and attractive interface with which to experience
      the speed and power of ClickHouse.
    </p>

    <p>
      This site is a reference for inspecting components and their props. Official documentation
      lives at{' '}
      <a href="https://clickhouse.design/click-ui" target="_blank" rel="noopener noreferrer">
        clickhouse.design/click-ui
      </a>
      .
    </p>

    <h2>Resources</h2>

    <ul>
      <li>
        <strong>Source Code:</strong> Available on{' '}
        <a href="https://github.com/ClickHouse/click-ui" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </li>
      <li>
        <strong>Package:</strong> Found on{' '}
        <a
          href="https://www.npmjs.com/package/@clickhouse/click-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          NPM
        </a>
      </li>
      <li>
        <strong>Figma:</strong> We will be publishing Click UI to the Figma community soon.
      </li>
    </ul>

    <p>
      To get started, please refer to the{' '}
      <a
        href="https://github.com/ClickHouse/click-ui?tab=readme-ov-file#quick-start"
        target="_blank"
        rel="noopener noreferrer"
      >
        Quick Start Guide
      </a>
      .
    </p>
  </>
);

const Introduction = () => null;

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
};

export default meta;

type Story = StoryObj<typeof Introduction>;

export const Docs: Story = {};
