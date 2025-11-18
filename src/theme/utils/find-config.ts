import * as fs from 'fs';
import * as path from 'path';

/**
 * Find Click UI config file in a directory
 * Searches for click-ui.config with various extensions
 *
 * @param root - Directory to search in (usually process.cwd())
 * @returns Full path to config file, or null if not found
 *
 * @example
 * ```typescript
 * const configPath = findConfigFile(process.cwd());
 * if (configPath) {
 *   console.log('Found config at:', configPath);
 * }
 * ```
 */
export function findConfigFile(root: string): string | null {
  const extensions = ['ts', 'js', 'mjs', 'cjs'];

  for (const ext of extensions) {
    const configPath = path.join(root, `click-ui.config.${ext}`);
    if (fs.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
}
