import type { Meta, StoryObj } from '@storybook/react';

const IntroductionPage = () => (
  <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '20px' }}>
    <div style={{ marginBottom: '20px' }}>
      <img
        src="/clickhouse-backs.png"
        alt="Click UI"
        style={{ width: '100%', borderRadius: '4px' }}
      />
    </div>

    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Click UI</h1>

    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
      Click UI is the ClickHouse design system and component library. Our aim with Click UI is to
      provide an accessible, theme-able, modern, and attractive interface with which to experience
      the speed and power of ClickHouse.
    </p>

    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
      This site is a reference for inspecting components and their props. Official documentation
      lives at{' '}
      <a
        href="https://clickhouse.design/click-ui"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#faff69' }}
      >
        clickhouse.design/click-ui
      </a>
      .
    </p>

    <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Resources</h2>

    <ul style={{ fontSize: '1.1rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
      <li>
        <strong>Source Code:</strong> Available on{' '}
        <a
          href="https://github.com/ClickHouse/click-ui"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#faff69' }}
        >
          GitHub
        </a>
      </li>
      <li>
        <strong>Package:</strong> Found on{' '}
        <a
          href="https://www.npmjs.com/package/@clickhouse/click-ui"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#faff69' }}
        >
          NPM
        </a>
      </li>
      <li>
        <strong>Figma:</strong> We will be publishing Click UI to the Figma community soon.
      </li>
    </ul>

    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginTop: '1.5rem' }}>
      To get started, please refer to the{' '}
      <a
        href="https://github.com/ClickHouse/click-ui?tab=readme-ov-file#quick-start"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#faff69' }}
      >
        Quick Start Guide
      </a>
      .
    </p>
  </div>
);

const meta: Meta<typeof IntroductionPage> = {
  title: 'Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof IntroductionPage>;

export const Welcome: Story = {};
