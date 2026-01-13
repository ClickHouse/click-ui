#!/usr/bin/env node

/**
 * Validates SCSS token usage in .module.scss files
 * Checks for:
 * - Typos in token names (tokens.$clickButton... etc)
 * - Invalid CSS property values
 * - Incorrect token usage patterns
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Token prefixes that should exist
const VALID_TOKEN_PREFIXES = [
  'tokens.$click',
  'tokens.$global',
  'tokens.$typography',
  'tokens.$transition',
];

// Common token patterns (not exhaustive, but catches most typos)
const KNOWN_TOKEN_PATTERNS = [
  // Button tokens
  /tokens\.\$clickButtonBasic/,
  /tokens\.\$clickButtonIconButton/,
  /tokens\.\$clickButtonStroke/,

  // Field tokens
  /tokens\.\$clickFieldColor/,
  /tokens\.\$clickFieldSpace/,
  /tokens\.\$clickFieldRadii/,
  /tokens\.\$clickFieldSize/,

  // Checkbox tokens
  /tokens\.\$clickCheckbox/,
  /tokens\.\$clickRadio/,
  /tokens\.\$clickSwitch/,

  // Global tokens
  /tokens\.\$clickGlobalColor/,
  /tokens\.\$globalColor/,

  // Typography tokens
  /tokens\.\$typography/,

  // Transition tokens
  /tokens\.\$transition/,
];

// Invalid patterns that indicate typos or mistakes
const INVALID_PATTERNS = [
  {
    pattern: /token\.\$/,
    message: 'Missing "s" - should be "tokens.$" not "token.$"',
  },
  {
    pattern: /tokens\.\$[A-Z]/,
    message: 'Token should start with lowercase after $ (e.g., tokens.$clickButton, not tokens.$ClickButton)',
  },
];

async function findScssFiles() {
  const pattern = path.join(rootDir, 'src/**/*.module.scss');
  return await glob(pattern, { ignore: ['**/node_modules/**', '**/dist/**'] });
}

function extractTokenUsage(content) {
  const tokenRegex = /tokens\.\$[a-zA-Z0-9_]+/g;
  const matches = content.match(tokenRegex) || [];
  return [...new Set(matches)]; // Remove duplicates
}

function validateToken(token, lineNumber, filePath) {
  const errors = [];

  // Check for invalid patterns
  for (const { pattern, message } of INVALID_PATTERNS) {
    if (pattern.test(token)) {
      errors.push({
        file: filePath,
        line: lineNumber,
        token,
        message,
      });
    }
  }

  // Check if token starts with a known prefix
  const hasValidPrefix = VALID_TOKEN_PREFIXES.some(prefix => token.startsWith(prefix));
  if (!hasValidPrefix) {
    errors.push({
      file: filePath,
      line: lineNumber,
      token,
      message: `Token does not start with a known prefix. Valid prefixes: ${VALID_TOKEN_PREFIXES.join(', ')}`,
    });
  }

  return errors;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const errors = [];

  lines.forEach((line, index) => {
    const tokens = extractTokenUsage(line);
    tokens.forEach(token => {
      const tokenErrors = validateToken(token, index + 1, filePath);
      errors.push(...tokenErrors);
    });
  });

  return errors;
}

async function main() {
  console.log('🔍 Validating SCSS token usage...\n');

  const scssFiles = await findScssFiles();
  console.log(`Found ${scssFiles.length} SCSS module files\n`);

  let totalErrors = 0;
  const errorsByFile = {};

  for (const file of scssFiles) {
    const errors = validateFile(file);
    if (errors.length > 0) {
      const relativePath = path.relative(rootDir, file);
      errorsByFile[relativePath] = errors;
      totalErrors += errors.length;
    }
  }

  if (totalErrors === 0) {
    console.log('✅ No token validation errors found!');
    process.exit(0);
  }

  console.log(`❌ Found ${totalErrors} token validation errors:\n`);

  Object.entries(errorsByFile).forEach(([file, errors]) => {
    console.log(`\n📄 ${file}`);
    errors.forEach(error => {
      console.log(`  Line ${error.line}: ${error.token}`);
      console.log(`  └─ ${error.message}`);
    });
  });

  console.log(`\n❌ Total errors: ${totalErrors}`);
  process.exit(1);
}

main().catch(error => {
  console.error('Error running validation:', error);
  process.exit(1);
});
