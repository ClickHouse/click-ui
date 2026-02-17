// TODO: Move to .scripts/[bash|js|ts] once https://github.com/ClickHouse/click-ui/pull/784 is merged

import fs from 'fs';
import path from 'path';

export const WARNING_AUTO_GENERATED_FILE = `/*
 ** WARNING: Auto-generated file!
 ** Do NOT modify it, your changes will be lost!
 ** If you find need to modify manually,
 ** report the issue immediately.
 */`;

export const toPascalCase = (str: string): string => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
};

export const toKebabCase = (str: string): string => {
  return str.replace(/_/g, '-').toLowerCase();
};

export const getComponentFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.tsx') && file !== 'index.ts')
    .map(file => path.basename(file, '.tsx'));
};

export const sortComponentsByKebabName = (
  files: string[]
): Array<{ name: string; kebab: string }> => {
  return files
    .map(name => ({ name, kebab: toKebabCase(name) }))
    .sort((a, b) => a.kebab.localeCompare(b.kebab));
};

export interface TypeGenerationConfig {
  typeName: string;
  themePropsType: string;
  importPath: string;
}

export const generateTypesContent = (
  sortedComponents: Array<{ name: string; kebab: string }>,
  config: TypeGenerationConfig
): string => {
  const names = sortedComponents.map(({ kebab }) => `  | '${kebab}'`);

  return `import { SVGAttributes } from 'react';
import { ThemeName } from '${config.importPath}';

export type ${config.typeName} =
${names.join('\n')};

export type ${config.themePropsType} = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
};
`;
};

export interface RegistryGenerationConfig {
  registryName: string;
  typeName: string;
  themePropsType: string;
}

export const generateRegistryContent = (
  sortedComponents: Array<{ name: string; kebab: string }>,
  config: RegistryGenerationConfig,
  isDark: boolean
): string => {
  const imports = sortedComponents
    .map(({ name }) => `import ${name} from '../${name}';`)
    .join('\n');

  const exports = sortedComponents
    .map(({ kebab, name }) => `  '${kebab}': ${name},`)
    .join('\n');

  return `${WARNING_AUTO_GENERATED_FILE}

${imports}
import { ${config.typeName}, ${config.themePropsType} } from './types';

const ${config.registryName}: Record<
  ${config.typeName},
  (props: ${config.themePropsType}) => React.JSX.Element
> = {
${exports}
};

export default ${config.registryName};
`;
};

export const writeTypesFile = (
  systemDir: string,
  sortedComponents: Array<{ name: string; kebab: string }>,
  config: TypeGenerationConfig
): void => {
  const content = generateTypesContent(sortedComponents, config);
  fs.writeFileSync(path.join(systemDir, 'types.ts'), content);
};

export const writeRegistryFiles = (
  systemDir: string,
  sortedComponents: Array<{ name: string; kebab: string }>,
  config: RegistryGenerationConfig
): void => {
  const lightContent = generateRegistryContent(sortedComponents, config, false);
  const darkContent = generateRegistryContent(sortedComponents, config, true);

  fs.writeFileSync(path.join(systemDir, `${config.registryName}.ts`), lightContent);
  fs.writeFileSync(
    path.join(systemDir, `${config.registryName.replace('Light', 'Dark')}.ts`),
    darkContent
  );
};

export interface AssetTypeConfig {
  dir: string;
  systemDir: string;
  typeName: string;
  themePropsType: string;
  registryName: string;
  themeImportPath: string;
}

export const regenerateAssetType = (config: AssetTypeConfig): void => {
  const files = getComponentFiles(config.dir);
  const sorted = sortComponentsByKebabName(files);

  writeTypesFile(config.systemDir, sorted, {
    typeName: config.typeName,
    themePropsType: config.themePropsType,
    importPath: config.themeImportPath,
  });

  writeRegistryFiles(config.systemDir, sorted, {
    registryName: config.registryName,
    typeName: config.typeName,
    themePropsType: config.themePropsType,
  });
};
