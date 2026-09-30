// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active.
// Exports the local variables, text styles and effect styles as Design Tokens Community Group
// (DTCG 2025.10) documents. Returns { files: { '<name>.tokens.json': {...} } }:
//   primitives.tokens.json  Primitives collection (one mode)
//   light.tokens.json       Semantic collection, Light mode, plus the shadow styles
//   dark.tokens.json        Semantic collection, Dark mode, plus the shadow styles
//   typography.tokens.json  text styles as typography composites
// Aliases are "{group.token}" references into the merged set (primitives + one theme + typography).
// Check the result with scripts/validate-dtcg.mjs before using it anywhere.

// ---- CONFIG ----
// $type by variable name prefix, for numbers and strings (colors are always "color").
const TYPE_BY_PREFIX = [
  ['alpha/', 'number'],
  ['breakpoint/', 'dimension'],
  ['font/size-', 'dimension'],
  ['font/weight-', 'fontWeight'],
  ['font/family-', 'fontFamily'],
  ['line/height-', 'number'],
  ['motion/duration-', 'duration'],
  ['motion/easing-', 'cubicBezier'],
  ['space/', 'dimension'],
  ['radius/', 'dimension'],
  ['sizing/', 'dimension'],
  ['z/', 'number'],
];
const FONT_WEIGHTS = {
  Thin: 100,
  'Extra Light': 200,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  'Semi Bold': 600,
  SemiBold: 600,
  Bold: 700,
  'Extra Bold': 800,
  ExtraBold: 800,
  Black: 900,
};
// ---- END CONFIG ----

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const byId = new Map(vars.map(v => [v.id, v]));
const collectionName = id => collections.find(c => c.id === id).name;
const path = name => name.split('/');
const ref = name => `{${path(name).join('.')}}`;
const round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;
const errors = [];

function typeOf(v) {
  if (v.resolvedType === 'COLOR') return 'color';
  if (v.resolvedType === 'BOOLEAN') return null;
  const hit = TYPE_BY_PREFIX.find(([p]) => v.name.startsWith(p));
  if (!hit)
    errors.push(`no $type for ${collectionName(v.variableCollectionId)}:${v.name}`);
  return hit ? hit[1] : null;
}
const hex2 = x =>
  Math.round(x * 255)
    .toString(16)
    .padStart(2, '0');
function color({ r, g, b, a = 1 }) {
  const out = {
    colorSpace: 'srgb',
    components: [round(r), round(g), round(b)],
    hex: `#${hex2(r)}${hex2(g)}${hex2(b)}`,
  };
  if (a < 1) out.alpha = round(a);
  return out;
}
function literal(type, value, name) {
  switch (type) {
    case 'color':
      return color(value);
    case 'dimension':
      return { value: round(value), unit: 'px' };
    case 'duration':
      return { value: round(value), unit: 'ms' };
    case 'number':
      return round(value);
    case 'fontWeight':
      return value;
    case 'fontFamily':
      return value
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    case 'cubicBezier': {
      const m = /cubic-bezier\(([^)]+)\)/.exec(value);
      if (!m) {
        errors.push(`${name}: not a cubic-bezier() string`);
        return value;
      }
      return m[1].split(',').map(n => Number(n.trim()));
    }
  }
  return value;
}
function set(doc, name, token) {
  const segs = path(name);
  let node = doc;
  for (const s of segs.slice(0, -1)) node = node[s] = node[s] || {};
  node[segs[segs.length - 1]] = token;
}
function token(v, modeId) {
  const type = typeOf(v);
  if (!type) return null;
  const raw = v.valuesByMode[modeId];
  const t = { $type: type };
  if (raw && raw.type === 'VARIABLE_ALIAS') {
    const target = byId.get(raw.id);
    if (!target) {
      errors.push(`${v.name}: alias to a missing variable`);
      return null;
    }
    t.$value = ref(target.name);
  } else t.$value = literal(type, raw, v.name);
  if (v.description) t.$description = v.description;
  return t;
}
function collectionDoc(name, modeName) {
  const c = collections.find(x => x.name === name);
  const mode = modeName ? c.modes.find(m => m.name === modeName) : c.modes[0];
  const doc = {};
  for (const v of vars.filter(x => x.variableCollectionId === c.id)) {
    const t = token(v, mode.modeId);
    if (t) set(doc, v.name, t);
  }
  return doc;
}

// Styles
const floatByValue = (prefix, value) =>
  vars.find(v => v.name.startsWith(prefix) && Object.values(v.valuesByMode)[0] === value);
const familyVar = family =>
  vars.find(
    v =>
      v.name.startsWith('font/family-') &&
      literal('fontFamily', Object.values(v.valuesByMode)[0])[0] === family
  );
const typography = {};
for (const s of await figma.getLocalTextStylesAsync()) {
  const sizeVar =
    s.boundVariables &&
    s.boundVariables.fontSize &&
    byId.get(s.boundVariables.fontSize.id);
  const weight = FONT_WEIGHTS[s.fontName.style];
  if (!weight) errors.push(`${s.name}: unknown font style "${s.fontName.style}"`);
  const weightVar = floatByValue('font/weight-', weight);
  const fam = familyVar(s.fontName.family);
  if (s.lineHeight.unit === 'AUTO') errors.push(`${s.name}: line height is auto`);
  const lineHeight =
    s.lineHeight.unit === 'PERCENT'
      ? round(s.lineHeight.value / 100, 3)
      : round(s.lineHeight.value / s.fontSize, 3);
  const letterSpacing =
    s.letterSpacing.unit === 'PERCENT'
      ? (s.letterSpacing.value * s.fontSize) / 100
      : s.letterSpacing.value;
  const t = {
    $type: 'typography',
    $value: {
      fontFamily: fam ? ref(fam.name) : [s.fontName.family],
      fontSize: sizeVar ? ref(sizeVar.name) : { value: s.fontSize, unit: 'px' },
      fontWeight: weightVar ? ref(weightVar.name) : weight,
      letterSpacing: { value: round(letterSpacing), unit: 'px' },
      lineHeight,
    },
  };
  if (s.description) t.$description = s.description;
  set(typography, `typography/${s.name}`, t);
}

// Shadow colors alias Semantic tokens, so the same shadow group goes into both theme files.
async function shadows() {
  const doc = {};
  for (const s of await figma.getLocalEffectStylesAsync()) {
    const layers = s.effects
      .filter(
        e =>
          e.visible !== false && (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW')
      )
      .map(e => {
        const bound =
          e.boundVariables &&
          e.boundVariables.color &&
          byId.get(e.boundVariables.color.id);
        const layer = {
          color: bound ? ref(bound.name) : color(e.color),
          offsetX: { value: e.offset.x, unit: 'px' },
          offsetY: { value: e.offset.y, unit: 'px' },
          blur: { value: e.radius, unit: 'px' },
          spread: { value: e.spread || 0, unit: 'px' },
        };
        if (e.type === 'INNER_SHADOW') layer.inset = true;
        return layer;
      });
    if (!layers.length) continue;
    const t = { $type: 'shadow', $value: layers.length === 1 ? layers[0] : layers };
    if (s.description) t.$description = s.description;
    set(doc, s.name.toLowerCase(), t);
  }
  return doc;
}

const shadowDoc = await shadows();
const files = {
  'primitives.tokens.json': collectionDoc('Primitives'),
  'light.tokens.json': { ...collectionDoc('Semantic', 'Light'), ...shadowDoc },
  'dark.tokens.json': { ...collectionDoc('Semantic', 'Dark'), ...shadowDoc },
  'typography.tokens.json': typography,
};
return { files, errors };
