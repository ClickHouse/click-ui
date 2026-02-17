// TODO: Move to .scripts/js once https://github.com/ClickHouse/click-ui/pull/784 is merged, or create a new PR while waiting for approval to introduce the file architecture change earliest

// TODO: rename scripts? decide if dashes or _ for script naming, maybe best _

import fs from 'fs';
import path from 'path';

export const WARNING_AUTO_GENERATED_FILE = `/*
 ** WARNING: Auto-generated file!
 ** Do NOT modify it, your changes will be lost!
 ** If you find need to modify manually,
 ** report the issue immediately.
 */`;

export const filenameToKebabCase = filename => {
  return filename
    .replace(/_/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
};

export const filenameToComponentName = filename => {
  return filename.replace(/-/g, '_');
};

export const getComponentFiles = dir => {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.tsx') && file !== 'index.ts')
    .map(file => path.basename(file, '.tsx'));
};

export const detectExportType = filepath => {
  const content = fs.readFileSync(filepath, 'utf-8');
  if (content.match(/export\s+const\s+\w+/)) {
    return 'named';
  }

  return 'default';
};

export const sortComponentsByKebabName = files => {
  return files
    .map(name => ({ name, kebab: filenameToKebabCase(name) }))
    .sort((a, b) => a.kebab.localeCompare(b.kebab));
};

export const generateTypesContent = (sortedComponents, config) => {
  const names = sortedComponents.map(({ kebab }) => `  | '${kebab}'`);

  return `import { SVGAssetProps } from '../../types';

export type ${config.typeName} =
${names.join('\n')};

export type { SVGAssetProps };
`;
};

export const generateRegistryContent = (sortedComponents, config, iconFiles, isDark) => {
  const imports = sortedComponents
    .map(({ name }) => {
      const iconInfo = iconFiles.find(f => f.filename === name);
      const componentName = filenameToComponentName(name);
      if (iconInfo && iconInfo.exportType === 'named') {
        return `import { ${componentName} } from '../${name}';`;
      }
      return `import ${componentName} from '../${name}';`;
    })
    .join('\n');

  const exports = sortedComponents
    .map(({ kebab, name }) => {
      const componentName = filenameToComponentName(name);
      return `  '${kebab}': ${componentName},`;
    })
    .join('\n');

  return `${WARNING_AUTO_GENERATED_FILE}

${imports}
import { ${config.typeName} } from './types';
import type { SVGAssetProps } from '../../types';
import type { ComponentType } from 'react';

const ${config.registryName}: Record<
  ${config.typeName},
  ComponentType<SVGAssetProps>
> = {
${exports}
};

export default ${config.registryName};
`;
};

export const writeTypesFile = (systemDir, sortedComponents, config) => {
  const content = generateTypesContent(sortedComponents, config);
  fs.writeFileSync(path.join(systemDir, 'types.ts'), content);
};

export const writeRegistryFiles = (systemDir, sortedComponents, config, iconFiles) => {
  const lightContent = generateRegistryContent(
    sortedComponents,
    config,
    iconFiles,
    false
  );
  const darkContent = generateRegistryContent(sortedComponents, config, iconFiles, true);

  fs.writeFileSync(path.join(systemDir, `${config.registryName}.ts`), lightContent);
  fs.writeFileSync(
    path.join(systemDir, `${config.registryName.replace('Light', 'Dark')}.ts`),
    darkContent
  );
};

export const regenerateAssetType = config => {
  const files = getComponentFiles(config.dir);
  const sorted = sortComponentsByKebabName(files);

  writeTypesFile(config.systemDir, sorted, {
    typeName: config.typeName,
    themePropsType: config.themePropsType,
    importPath: config.themeImportPath,
  });

  const iconFiles = sorted.map(({ name, kebab }) => ({
    filename: name,
    componentName: filenameToComponentName(name),
    kebab,
    exportType: 'default',
  }));

  writeRegistryFiles(
    config.systemDir,
    sorted,
    {
      registryName: config.registryName,
      typeName: config.typeName,
      themePropsType: config.themePropsType,
    },
    iconFiles
  );
};
