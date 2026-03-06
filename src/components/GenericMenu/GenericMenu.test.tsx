import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import {
  GenericMenuPanel,
  GenericPopoverMenuPanel,
  GenericMenuItem,
} from './GenericMenu';
import { themes } from '@/theme/theme.core';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={themes.dark}>{component}</ThemeProvider>);
};

describe('GenericMenu', () => {
  describe('GenericMenuPanel', () => {
    it('renders with dropdown-menu type', () => {
      renderWithTheme(
        <GenericMenuPanel
          $type="dropdown-menu"
          data-testid="menu-panel"
        >
          Content
        </GenericMenuPanel>
      );
      expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    });

    it('renders with popover type', () => {
      renderWithTheme(
        <GenericMenuPanel
          $type="popover"
          data-testid="menu-panel"
        >
          Content
        </GenericMenuPanel>
      );
      expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    });

    it('renders with context-menu type', () => {
      renderWithTheme(
        <GenericMenuPanel
          $type="context-menu"
          data-testid="menu-panel"
        >
          Content
        </GenericMenuPanel>
      );
      expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    });
  });

  describe('GenericPopoverMenuPanel', () => {
    it('renders correctly', () => {
      renderWithTheme(
        <GenericPopoverMenuPanel
          $type="popover"
          data-testid="popover-panel"
        >
          Popover Content
        </GenericPopoverMenuPanel>
      );
      expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
    });

    it('renders with hover-card type', () => {
      renderWithTheme(
        <GenericPopoverMenuPanel
          $type="hover-card"
          data-testid="hover-panel"
        >
          Hover Content
        </GenericPopoverMenuPanel>
      );
      expect(screen.getByTestId('hover-panel')).toBeInTheDocument();
    });
  });

  describe('GenericMenuItem', () => {
    it('renders with default type', () => {
      renderWithTheme(
        <GenericMenuItem data-testid="menu-item">Menu Item</GenericMenuItem>
      );
      expect(screen.getByTestId('menu-item')).toBeInTheDocument();
      expect(screen.getByText('Menu Item')).toBeInTheDocument();
    });

    it('renders with danger type', () => {
      renderWithTheme(
        <GenericMenuItem
          $type="danger"
          data-testid="danger-item"
        >
          Danger Item
        </GenericMenuItem>
      );
      expect(screen.getByTestId('danger-item')).toBeInTheDocument();
    });

    it('renders when disabled', () => {
      renderWithTheme(
        <GenericMenuItem
          data-disabled
          data-testid="disabled-item"
        >
          Disabled Item
        </GenericMenuItem>
      );
      expect(screen.getByTestId('disabled-item')).toBeInTheDocument();
    });
  });
});
