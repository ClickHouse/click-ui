// WARN: The storage key is shared with .scripts/js/generate-token
// which is a nodejs script. At the moment opted for json instead
// of adding support for `js` files, but json means importing the
// whole file (the file shouldn't grow, so should be alright?)
import config from '@/theme/theme.config.json' with { type: 'json' };

export const CUI_THEME_STORAGE_KEY = config.storageKey;
