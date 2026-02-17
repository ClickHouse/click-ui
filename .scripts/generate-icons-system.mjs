#!/usr/bin/env node

// TODO: Move to .scripts/js once https://github.com/ClickHouse/click-ui/pull/784 is merged, or create a new PR while waiting for approval to introduce the file architecture change earliest

// TODO: rename scripts? decide if dashes or _ for script naming, maybe best _

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  filenameToKebabCase,
  filenameToComponentName,
  detectExportType,
  generateTypesContent,
  generateRegistryContent,
  getComponentFiles,
} from './shared/svg-converter-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '..', 'src', 'components', 'Assets', 'Icons');
const SYSTEM_DIR = path.join(ICONS_DIR, 'system');

const getIconFiles = () => {
  const files = getComponentFiles(ICONS_DIR);
  return files.map(filename => {
    const filepath = path.join(ICONS_DIR, `${filename}.tsx`);
    const exportType = detectExportType(filepath);
    return {
      filename,
      componentName: filenameToComponentName(filename),
      kebab: filenameToKebabCase(filename),
      exportType,
    };
  });
};

const generateIconSystem = () => {
  const iconFiles = getIconFiles();

  const sortedIcons = iconFiles.sort((a, b) => a.kebab.localeCompare(b.kebab));

  console.log('📦 Generating Icon system files...\n');
  console.log(`Found ${sortedIcons.length} icons to process`);

  const namedCount = sortedIcons.filter(i => i.exportType === 'named').length;
  const defaultCount = sortedIcons.filter(i => i.exportType === 'default').length;
  console.log(`  - ${namedCount} with named exports`);
  console.log(`  - ${defaultCount} with default exports\n`);

  const typesContent = generateTypesContent(
    sortedIcons.map(({ filename, kebab }) => ({ name: filename, kebab })),
    {
      typeName: 'IconName',
      themePropsType: 'IconThemeProps',
      importPath: '@/theme',
    }
  );
  fs.writeFileSync(path.join(SYSTEM_DIR, 'types.ts'), typesContent);
  console.log('✅ Generated system/types.ts');

  const lightContent = generateRegistryContent(
    sortedIcons.map(({ filename, kebab }) => ({ name: filename, kebab })),
    {
      registryName: 'IconsLight',
      typeName: 'IconName',
      themePropsType: 'IconThemeProps',
    },
    sortedIcons,
    false
  );

  const darkContent = generateRegistryContent(
    sortedIcons.map(({ filename, kebab }) => ({ name: filename, kebab })),
    {
      registryName: 'IconsDark',
      typeName: 'IconName',
      themePropsType: 'IconThemeProps',
    },
    sortedIcons,
    true
  );

  fs.writeFileSync(path.join(SYSTEM_DIR, 'IconsLight.ts'), lightContent);
  console.log('✅ Generated system/IconsLight.ts');

  fs.writeFileSync(path.join(SYSTEM_DIR, 'IconsDark.ts'), darkContent);
  console.log('✅ Generated system/IconsDark.ts');

  console.log('\n👍 Done!');

  console.log('\n📋 Examples of the mapping:');
  sortedIcons.slice(0, 5).forEach(({ filename, kebab, componentName, exportType }) => {
    const importStyle = exportType === 'named' ? `{ ${componentName} }` : componentName;
    console.log(`  ${filename}.tsx -> key: '${kebab}', import: ${importStyle}`);
  });
  if (sortedIcons.length > 5) {
    console.log(`  ... and ${sortedIcons.length - 5} more`);
  }

  return sortedIcons;
};

console.log('🚀 Generating Icon system files...\n');
generateIconSystem();
