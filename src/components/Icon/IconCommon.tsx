/**
 * IconCommon - Maps icon names to components using the Assets system
 * Replaced old manual imports with auto-generated registry
 */

import IconsLight from '@/components/Assets/Icons/system/IconsLight';

// Export all icon names from the registry keys
export const ICON_NAMES = Object.keys(IconsLight) as Array<keyof typeof IconsLight>;

// Export the registry as ICONS_MAP for backward compatibility
export const ICONS_MAP = IconsLight;
