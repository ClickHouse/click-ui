import type { PluginContext } from 'rollup';
import fs from 'fs-extra';
import path from 'path';
import { getTempDir } from './utils';

const VIRTUAL_PREFIX = 'virtual:css-module:';
const mappings = new Map<string, string>();

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

  const virtualId = VIRTUAL_PREFIX + mappings.size;
  mappings.set(virtualId, jsonPath);
  return virtualId;
}

export async function loadCssModule(
  id: string,
  ctx: PluginContext
): Promise<string | null> {
  if (!id.startsWith(VIRTUAL_PREFIX)) return null;

  const jsonPath = mappings.get(id);
  if (!jsonPath) return null;

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
