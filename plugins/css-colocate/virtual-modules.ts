import type { PluginContext } from 'rollup';
import fs from 'fs-extra';
import path from 'path';
import { getTempDir } from './utils';

const VIRTUAL_PREFIX = 'virtual:css-module:';

export async function resolveCssModule(
  id: string,
  importer: string | undefined,
  rootDir: string
): Promise<string | null> {
  if (!id.endsWith('.module.css') || !importer) return null;

  const resolved = path.resolve(path.dirname(importer), id);
  const relative = path.relative(path.join(rootDir, 'src'), resolved);
  const jsonPath = path.join(
    getTempDir(rootDir),
    relative.replace('.module.css', '.module.json')
  );

  if (!(await fs.pathExists(jsonPath))) return null;

  return VIRTUAL_PREFIX + relative;
}

export async function loadCssModule(
  id: string,
  ctx: PluginContext,
  rootDir: string
): Promise<string | null> {
  if (!id.startsWith(VIRTUAL_PREFIX)) return null;

  const relative = id.slice(VIRTUAL_PREFIX.length);
  const jsonPath = path.join(
    getTempDir(rootDir),
    relative.replace('.module.css', '.module.json')
  );

  try {
    const json = await fs.readJson(jsonPath);
    const exports = Object.entries(json)
      .map(([k, v]) => `"${k}": "${v}"`)
      .join(',\n  ');
    return `export default {\n  ${exports}\n};`;
  } catch (e: any) {
    ctx.error(`Failed to load CSS module from ${jsonPath}: ${e.message}`);
    return null;
  }
}
