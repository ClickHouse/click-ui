// Paste into figma_execute (figma-console MCP). Edit the CONFIG block first.
// Rebinds every solid fill/stroke under a page frame from one color variable to another by name,
// for example after renaming a Semantic token or moving a component onto a different one. Also
// reports colors that are not bound to a Semantic token (Primitives, remote variables, raw hex).

// ---- CONFIG ----
const FRAME_ID = ''; // light page frame or section, e.g. '45:11717'. Comma-separate to run several.
const DRY = true; // true: report what would change, change nothing
// Old variable name to new variable name.
const MAP = {};
// Optional: pick the target from the node's variant, for variables shared across states
// (e.g. an icon color that should follow each state's text token). Return null to fall back to MAP.
const byVariant = (variableName, variantName) => null;
// Layers whose raw or Primitive colors are intentional (artwork, canvas markers).
const EXEMPT = /^(Logos|Flags|Payment|Spacer)$|^logo[_-]/i;
// ---- END CONFIG ----

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const sem = collections.find(c => c.name === 'Semantic');
const all = await figma.variables.getLocalVariablesAsync('COLOR');
const byName = new Map(all.map(v => [v.name, v]));
for (const target of Object.values(MAP))
  if (!byName.has(target)) return `MAP target does not exist locally: ${target}`;

const variantOf = node => {
  for (let x = node; x && x.type !== 'PAGE'; x = x.parent)
    if (x.type === 'COMPONENT') return x.name;
  return null;
};
const exempt = node => {
  for (let x = node; x && x.type !== 'PAGE'; x = x.parent)
    if (EXEMPT.test(x.name)) return true;
  return false;
};
const varCache = new Map();
const getVar = async id => {
  if (!varCache.has(id)) varCache.set(id, await figma.variables.getVariableByIdAsync(id));
  return varCache.get(id);
};
const changed = {},
  notSemantic = {};
const note = key => (notSemantic[key] = (notSemantic[key] || 0) + 1);
const roots = [];
for (const id of FRAME_ID.split(',').map(s => s.trim())) {
  const root = await figma.getNodeByIdAsync(id);
  if (!root) return `No node ${id}`;
  roots.push(root, ...root.findAll(() => true));
}
async function remap(paints, n) {
  let dirty = false;
  const next = [];
  for (const p of paints) {
    const id =
      p.type === 'SOLID' &&
      p.boundVariables &&
      p.boundVariables.color &&
      p.boundVariables.color.id;
    const v = id && (await getVar(id));
    const target = v && (byVariant(v.name, variantOf(n)) || MAP[v.name]);
    if (!v || !target || target === v.name) {
      if (p.type === 'SOLID' && p.visible !== false && !exempt(n)) {
        if (!v) note('raw color');
        else if (v.remote) note(`remote ${v.name}`);
        else if (v.variableCollectionId !== sem.id) note(v.name);
      }
      next.push(p);
      continue;
    }
    const key = `${v.name} -> ${target}`;
    changed[key] = (changed[key] || 0) + 1;
    next.push(
      DRY ? p : figma.variables.setBoundVariableForPaint(p, 'color', byName.get(target))
    );
    dirty = true;
  }
  return dirty && !DRY ? next : null;
}
for (const n of roots) {
  for (const prop of ['fills', 'strokes']) {
    // Text with several fill runs (e.g. a sentence with a link) reports figma.mixed.
    if (prop === 'fills' && n.type === 'TEXT' && n.fills === figma.mixed) {
      for (const s of n.getStyledTextSegments(['fills'])) {
        const next = await remap(s.fills, n);
        if (!next) continue;
        await Promise.all(
          n.getRangeAllFontNames(0, n.characters.length).map(f => figma.loadFontAsync(f))
        );
        n.setRangeFills(s.start, s.end, next);
      }
      continue;
    }
    if (!Array.isArray(n[prop]) || !n[prop].length) continue;
    const next = await remap(n[prop], n);
    if (next) n[prop] = next;
  }
}
return { dry: DRY, changed, notSemantic };
