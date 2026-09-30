#!/usr/bin/env node
// Validates DTCG (Design Tokens Community Group, format 2025.10) token documents.
// Usage:
//   node validate-dtcg.mjs <dir>             every *.tokens.json in the directory
//   node validate-dtcg.mjs <bundle.json>     { "files": { "<name>.tokens.json": {...} } }, the
//                                            figma-export-dtcg.js result (also accepts the MCP reply)
// Theme files (light, dark) are each checked merged with the shared files, so aliases must resolve
// within primitives + typography + that theme. Exits 1 when there are errors.
import fs from 'node:fs';
import path from 'node:path';

const THEMES = ['light', 'dark'];
const TYPES = new Set([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'strokeStyle',
  'border',
  'transition',
  'shadow',
  'gradient',
  'typography',
]);
const WEIGHT_KEYWORDS = new Set([
  'thin',
  'hairline',
  'extra-light',
  'ultra-light',
  'light',
  'normal',
  'regular',
  'book',
  'medium',
  'semi-bold',
  'demi-bold',
  'bold',
  'extra-bold',
  'ultra-bold',
  'black',
  'heavy',
  'extra-black',
  'ultra-black',
]);
const COLOR_SPACES = new Set([
  'srgb',
  'srgb-linear',
  'hsl',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'display-p3',
  'a98-rgb',
  'prophoto-rgb',
  'rec2020',
  'xyz-d65',
  'xyz-d50',
]);

function load(arg) {
  if (fs.statSync(arg).isDirectory())
    return Object.fromEntries(
      fs
        .readdirSync(arg)
        .filter(f => f.endsWith('.tokens.json'))
        .map(f => [f, JSON.parse(fs.readFileSync(path.join(arg, f), 'utf8'))])
    );
  let data = JSON.parse(fs.readFileSync(arg, 'utf8'));
  if (data.result) data = data.result;
  return data.files || data;
}

const isAlias = v => typeof v === 'string' && /^\{[^{}]+\}$/.test(v);
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

function flatten(doc, file, errors, prefix = [], out = new Map(), inheritedType) {
  const groupType = doc.$type || inheritedType;
  for (const [key, node] of Object.entries(doc)) {
    if (key.startsWith('$')) continue;
    const where = `${file}: ${[...prefix, key].join('.')}`;
    if (/[{}.]/.test(key)) errors.push(`${where}: name contains { } or .`);
    if (!isObj(node)) {
      errors.push(`${where}: not a token or group`);
      continue;
    }
    if ('$value' in node) {
      const children = Object.keys(node).filter(k => !k.startsWith('$'));
      if (children.length)
        errors.push(`${where}: token has child keys (${children.join(', ')})`);
      const unknown = Object.keys(node).filter(
        k =>
          k.startsWith('$') &&
          !['$value', '$type', '$description', '$extensions', '$deprecated'].includes(k)
      );
      if (unknown.length) errors.push(`${where}: unknown keys ${unknown.join(', ')}`);
      out.set([...prefix, key].join('.'), {
        ...node,
        $type: node.$type || groupType,
        where,
      });
    } else flatten(node, file, errors, [...prefix, key], out, groupType);
  }
  return out;
}

function dim(v, where, errors, units = ['px', 'rem']) {
  if (isAlias(v)) return;
  if (!isObj(v) || typeof v.value !== 'number' || !units.includes(v.unit))
    errors.push(
      `${where}: expected { value: number, unit: ${units.join('|')} }, got ${JSON.stringify(v)}`
    );
}
function checkValue(type, v, where, errors) {
  if (isAlias(v)) return;
  switch (type) {
    case 'color': {
      if (!isObj(v) || !COLOR_SPACES.has(v.colorSpace) || !Array.isArray(v.components))
        return errors.push(`${where}: color needs colorSpace and components`);
      if (
        v.colorSpace === 'srgb' &&
        v.components.some(c => c !== 'none' && (c < 0 || c > 1))
      )
        errors.push(`${where}: srgb components must be 0-1`);
      if ('alpha' in v && (v.alpha < 0 || v.alpha > 1))
        errors.push(`${where}: alpha must be 0-1`);
      if ('hex' in v && !/^#[0-9a-f]{6}$/i.test(v.hex))
        errors.push(`${where}: hex must be #rrggbb`);
      return;
    }
    case 'dimension':
      return dim(v, where, errors);
    case 'duration':
      return dim(v, where, errors, ['ms', 's']);
    case 'number':
      if (typeof v !== 'number') errors.push(`${where}: number expected`);
      return;
    case 'fontWeight':
      if (!(typeof v === 'number' && v >= 1 && v <= 1000) && !WEIGHT_KEYWORDS.has(v))
        errors.push(`${where}: fontWeight must be 1-1000 or a keyword`);
      return;
    case 'fontFamily':
      if (
        !(
          typeof v === 'string' ||
          (Array.isArray(v) && v.length && v.every(s => typeof s === 'string'))
        )
      )
        errors.push(`${where}: fontFamily must be a string or array of strings`);
      return;
    case 'cubicBezier':
      if (
        !Array.isArray(v) ||
        v.length !== 4 ||
        v.some(n => typeof n !== 'number') ||
        [v[0], v[2]].some(x => x < 0 || x > 1)
      )
        errors.push(`${where}: cubicBezier must be [x1, y1, x2, y2] with x in 0-1`);
      return;
    case 'shadow':
      for (const [i, s] of (Array.isArray(v) ? v : [v]).entries()) {
        const w = `${where}[${i}]`;
        if (!isObj(s)) {
          errors.push(`${w}: shadow layer must be an object`);
          continue;
        }
        checkValue('color', s.color, `${w}.color`, errors);
        for (const k of ['offsetX', 'offsetY', 'blur', 'spread'])
          dim(s[k], `${w}.${k}`, errors);
        if ('inset' in s && typeof s.inset !== 'boolean')
          errors.push(`${w}.inset must be boolean`);
      }
      return;
    case 'typography':
      if (!isObj(v)) return errors.push(`${where}: typography must be an object`);
      checkValue('fontFamily', v.fontFamily, `${where}.fontFamily`, errors);
      dim(v.fontSize, `${where}.fontSize`, errors);
      checkValue('fontWeight', v.fontWeight, `${where}.fontWeight`, errors);
      dim(v.letterSpacing, `${where}.letterSpacing`, errors);
      checkValue('number', v.lineHeight, `${where}.lineHeight`, errors);
      return;
  }
}

// Alias targets must exist and have the type the property expects.
const EXPECT = {
  shadow: {
    color: 'color',
    offsetX: 'dimension',
    offsetY: 'dimension',
    blur: 'dimension',
    spread: 'dimension',
  },
  typography: {
    fontFamily: 'fontFamily',
    fontSize: 'dimension',
    fontWeight: 'fontWeight',
    letterSpacing: 'dimension',
    lineHeight: 'number',
  },
};
function resolveType(tokens, name, seen = new Set()) {
  const t = tokens.get(name);
  if (!t || seen.has(name)) return null;
  seen.add(name);
  return (
    t.$type ||
    (isAlias(t.$value) ? resolveType(tokens, t.$value.slice(1, -1), seen) : null)
  );
}
function checkAliases(tokens, errors) {
  const check = (v, expected, where) => {
    if (!isAlias(v)) return;
    const name = v.slice(1, -1);
    if (!tokens.has(name)) return errors.push(`${where}: alias ${v} does not resolve`);
    const type = resolveType(tokens, name);
    if (expected && type && type !== expected)
      errors.push(`${where}: alias ${v} is ${type}, expected ${expected}`);
  };
  for (const t of tokens.values()) {
    check(t.$value, t.$type, t.where);
    const layers =
      t.$type === 'shadow'
        ? Array.isArray(t.$value)
          ? t.$value
          : [t.$value]
        : t.$type === 'typography'
          ? [t.$value]
          : [];
    for (const layer of layers)
      if (isObj(layer))
        for (const [k, type] of Object.entries(EXPECT[t.$type]))
          check(layer[k], type, `${t.where}.${k}`);
  }
}

const files = load(process.argv[2]);
const errors = [];
const flat = {};
for (const [file, doc] of Object.entries(files)) flat[file] = flatten(doc, file, errors);
for (const tokens of Object.values(flat))
  for (const t of tokens.values()) {
    if (!TYPES.has(t.$type))
      errors.push(`${t.where}: missing or unknown $type ${JSON.stringify(t.$type)}`);
    else checkValue(t.$type, t.$value, t.where, errors);
  }
const shared = Object.keys(flat).filter(f => !THEMES.some(th => f.startsWith(th)));
const themes = Object.keys(flat).filter(f => THEMES.some(th => f.startsWith(th)));
for (const theme of themes.length ? themes : [null]) {
  const merged = new Map();
  for (const f of [...shared, ...(theme ? [theme] : [])])
    for (const [name, t] of flat[f]) {
      if (merged.has(name))
        errors.push(`${t.where}: also defined in ${merged.get(name).where}`);
      merged.set(name, t);
    }
  checkAliases(merged, errors);
}

const counts = Object.entries(flat)
  .map(([f, t]) => `${f}: ${t.size}`)
  .join(', ');
if (errors.length) {
  console.error(`${errors.length} DTCG errors (${counts})`);
  for (const e of [...new Set(errors)]) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`Valid DTCG (${counts})`);
