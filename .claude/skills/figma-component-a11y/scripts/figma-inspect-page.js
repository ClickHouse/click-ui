// Paste into figma_execute (figma-console MCP). Read-only.
// Summarises every solid fill/stroke under a page frame: which variable it is bound to (flagging
// remote/legacy library variables) or which raw color it uses, plus the component sets and their props.

// ---- CONFIG ----
const FRAME_ID = ''; // e.g. '45:11717'
// ---- END CONFIG ----

const to = x =>
  Math.round(x * 255)
    .toString(16)
    .padStart(2, '0');
const hex = c => '#' + to(c.r) + to(c.g) + to(c.b);
const frame = await figma.getNodeByIdAsync(FRAME_ID);
if (!frame) return `No node ${FRAME_ID}`;
let page = frame;
while (page.type !== 'PAGE') page = page.parent;

const usage = {};
const inA11yBlock = n => {
  for (let x = n; x && x !== frame; x = x.parent) if (x.name === 'A11y') return true;
  return false;
};
for (const n of [frame, ...frame.findAll(n => !inA11yBlock(n))]) {
  for (const prop of ['fills', 'strokes']) {
    for (const p of Array.isArray(n[prop]) ? n[prop] : []) {
      if (p.type !== 'SOLID' || p.visible === false) continue;
      const id = p.boundVariables && p.boundVariables.color && p.boundVariables.color.id;
      const v = id ? await figma.variables.getVariableByIdAsync(id) : null;
      const key = `${prop} ${v ? v.name + (v.remote ? ' [remote]' : '') : 'RAW ' + hex(p.color)}`;
      (usage[key] = usage[key] || []).push(
        n.type === 'TEXT'
          ? `TEXT:${n.characters.slice(0, 16)}`
          : `${n.type}:${n.name.slice(0, 24)}`
      );
    }
  }
}

const sets = frame
  .findAll(n => n.type === 'COMPONENT_SET')
  .map(s => {
    const props = {};
    for (const c of s.children)
      for (const part of c.name.split(', ')) {
        const [k, v] = part.split('=');
        (props[k] = props[k] || new Set()).add(v);
      }
    return `${s.id} ${s.name}: ${s.children.length} variants; ${Object.entries(props)
      .map(([k, v]) => `${k}=${[...v].join('|')}`)
      .join('; ')}`;
  });

return {
  frame: `${frame.id} ${frame.name} on page "${page.name}"`,
  otherFramesOnPage: page.children
    .filter(n => n !== frame)
    .map(n => `${n.id} ${n.name} modes=${JSON.stringify(n.explicitVariableModes || {})}`),
  sets,
  bindings: Object.fromEntries(
    Object.entries(usage).map(([k, v]) => [
      k,
      `${v.length}x, e.g. ${[...new Set(v)].slice(0, 3).join(' | ')}`,
    ])
  ),
};
