'use client';

import { createContext, useContext } from 'react';
import type { Theme } from './theme.types';
import { themes } from './theme.core';

export const ThemeContext = createContext<Theme>(themes.light);

/**
 * Returns the active click-ui theme object. Replaces styled-components'
 * `useTheme` as the runtime theme-delivery mechanism.
 */
export const useTheme = (): Theme => useContext(ThemeContext);
