// Paste into figma_execute (figma-console MCP). Edit the CONFIG block first.
// Audits every variant of every component set (or instance holder frame) inside each page frame, in
// that frame's Semantic mode, then draws an "A11y" block below the content. Re-running replaces it.
//   Contrast: text 4.5:1 (3:1 at 24px+), icons 3:1, control borders and focus indicators 3:1 (1.4.11).
//   Focus: interactive sets (with Hover or Active variants) need a Focus variant that looks different
//   from Default (2.4.7).
//   Target size: interactive variants under 24x24 are flagged for review (2.5.8 allows spacing).
//   Library links: remote instances, styles, variables and modes are flagged.

// ---- CONFIG ----
const FRAME_IDS = []; // page frames, e.g. ['45:11717', '45:11846'] (light frame and its dark preview)
const DRY = true; // true: return results only, draw nothing
const REPO_FAILURES = []; // paste the output of: node scripts/repo-contrast.mjs <repo> --failures
// Sets whose border is what shows the control's edge, so it needs 3:1 against the background.
const CONTROL =
  /input|field|checkbox|radio|select|switch|toggle|text ?area|search|combobox|date ?picker|slider|stepper/i;
// Sets that are parts of another control (labels, values, menu rows whose keyboard focus is shown by
// the hover look), so they need no Focus variant or target size of their own.
const NOT_FOCUSABLE = /^[_.]|^(field label|value)$| row$/i;
const MIN_TARGET = 24;
// Printed in the block: what the script can't check.
const MANUAL = [
  'State is not shown by color alone (an icon, text or shape changes too)',
  'Icon-only controls have an accessible name in the annotations',
  'Keyboard order and behavior match the repo component',
];
// ---- END CONFIG ----

const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const LIGHT = sem.modes.find(m => m.name === 'Light').modeId;
const byName = new Map(
  (await figma.variables.getLocalVariablesAsync('COLOR')).map(v => [v.name, v])
);
const varCache = new Map();
const getVar = async id => {
  if (!varCache.has(id)) varCache.set(id, await figma.variables.getVariableByIdAsync(id));
  return varCache.get(id);
};

async function resolvePaint(p, mode) {
  const id = p.boundVariables && p.boundVariables.color && p.boundVariables.color.id;
  let c = p.color,
    a = 1,
    token = null;
  if (id) {
    const first = await getVar(id);
    token = first ? first.name : 'missing variable';
    let v = first && (first.valuesByMode[mode] || Object.values(first.valuesByMode)[0]);
    let guard = 0;
    while (v && v.type === 'VARIABLE_ALIAS' && guard++ < 8) {
      const t = await getVar(v.id);
      v = t && (t.valuesByMode[mode] || Object.values(t.valuesByMode)[0]);
    }
    if (v && typeof v.r === 'number') {
      c = v;
      a = v.a ?? 1;
    }
  }
  return { c: { r: c.r, g: c.g, b: c.b }, a: a * (p.opacity ?? 1), token };
}
const visiblePaint = paints =>
  Array.isArray(paints)
    ? paints.find(p => p.type === 'SOLID' && p.visible !== false && (p.opacity ?? 1) > 0)
    : null;
const blend = (top, a, bottom) => ({
  r: top.r * a + bottom.r * (1 - a),
  g: top.g * a + bottom.g * (1 - a),
  b: top.b * a + bottom.b * (1 - a),
});
const lum = c => {
  const f = x => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};
const ratio = (x, y) => {
  const [h, l] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (h + 0.05) / (l + 0.05);
};
const centerIn = (n, t) => {
  const a = n.absoluteBoundingBox,
    b = t.absoluteBoundingBox;
  if (!a || !b) return false;
  const cx = b.x + b.width / 2,
    cy = b.y + b.height / 2;
  return cx >= a.x && cx <= a.x + a.width && cy >= a.y && cy <= a.y + a.height;
};
const shown = (n, stop) => {
  for (let x = n; x && x !== stop.parent; x = x.parent)
    if (x.visible === false) return false;
  return true;
};
const opacityOf = (n, stop) => {
  let o = 1;
  for (let x = n; x && x !== stop.parent; x = x.parent) o *= x.opacity ?? 1;
  return o;
};

async function backgroundOf(node, mode, pageFrame) {
  const layers = [];
  let cur = node;
  const fallback =
    mode === LIGHT ? { r: 1, g: 1, b: 1 } : { r: 0.122, g: 0.122, b: 0.11 };
  while (cur.parent && cur !== pageFrame) {
    const sibs = cur.parent.children,
      i = sibs.indexOf(cur);
    for (let j = i - 1; j >= 0; j--) {
      const s = sibs[j],
        p = s.visible !== false && visiblePaint(s.fills);
      if (p && centerIn(s, node)) {
        const r = await resolvePaint(p, mode);
        layers.push({ ...r, a: r.a * (s.opacity ?? 1), token: r.token });
        if (layers[layers.length - 1].a >= 0.999) break;
      }
    }
    if (layers.length && layers[layers.length - 1].a >= 0.999) break;
    cur = cur.parent;
    const p = visiblePaint(cur.fills);
    if (p) {
      const r = await resolvePaint(p, mode);
      layers.push(r);
      if (r.a >= 0.999) break;
    }
  }
  let color = fallback;
  for (let k = layers.length - 1; k >= 0; k--)
    color = blend(layers[k].c, layers[k].a, color);
  const top = layers.find(l => l.a > 0.001);
  return { color, token: top ? top.token : null };
}

async function variantsOf(unit) {
  if (unit.type === 'COMPONENT_SET')
    return unit.children.map(c => ({ node: c, name: c.name }));
  if (unit.type === 'COMPONENT' || unit.type === 'INSTANCE')
    return [{ node: unit, name: unit.name }];
  const out = [];
  for (const c of unit.children.filter(k => k.type === 'INSTANCE')) {
    const m = await c.getMainComponentAsync();
    out.push({ node: c, name: m ? m.name : c.name });
  }
  return out;
}
// LINE is left out: lines inside instances are separators, which are decorative.
const ICONISH = new Set(['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON']);
const inInstance = (n, stop) => {
  for (let x = n.parent; x && x !== stop; x = x.parent)
    if (x.type === 'INSTANCE') return true;
  return false;
};
// WCAG exempts logotypes; flags and payment marks are brand artwork too.
const EXEMPT_ARTWORK = /^(Logos|Flags|Payment)$|^logo[_-]/i;
const inArtwork = (n, stop) => {
  for (let x = n.parent; x && x !== stop; x = x.parent)
    if (EXEMPT_ARTWORK.test(x.name)) return true;
  return false;
};
// Icon shapes filled with a background or scrim token are surfaces (a tinted plate behind a glyph,
// a tooltip arrow), not the glyph.
const isPlate = async paint => {
  const id =
    paint.boundVariables && paint.boundVariables.color && paint.boundVariables.color.id;
  const v = id && (await getVar(id));
  return Boolean(v && /^(color\/background|utility\/color\/scrim)\//.test(v.name));
};

const DISABLED = /(State|Status)=[^,]*Disabled|Disabled=Yes/i;
const parts = name =>
  Object.fromEntries(name.split(', ').map(p => p.split('=').map(s => s.trim())));
const valuesOf = variants => {
  const out = {};
  for (const v of variants)
    for (const [k, val] of Object.entries(parts(v.name)))
      (out[k] = out[k] || new Set()).add(val);
  return out;
};
// What a focus ring changes: strokes and effects anywhere in the variant.
async function lookOf(node) {
  const sig = [];
  for (const n of [node, ...node.findAll(() => true)]) {
    if (n.visible === false) continue;
    for (const p of Array.isArray(n.strokes) ? n.strokes : [])
      if (p.visible !== false) {
        const id =
          p.boundVariables && p.boundVariables.color && p.boundVariables.color.id;
        sig.push(
          `s${n.strokeWeight === figma.mixed ? 'm' : n.strokeWeight}:${id || JSON.stringify(p.color)}`
        );
      }
    for (const e of Array.isArray(n.effects) ? n.effects : [])
      if (e.visible !== false) sig.push(`e${e.type}:${e.radius}:${e.spread || 0}`);
  }
  return sig.sort().join('|');
}
async function edgeChecks(v, mode, frame) {
  const out = [];
  const nodes = [v.node, ...v.node.findAll(n => n.type !== 'TEXT' && n.type !== 'LINE')];
  for (const n of nodes) {
    if (!shown(n, v.node) || (ICONISH.has(n.type) && inInstance(n, v.node))) continue;
    const stroke = visiblePaint(n.strokes);
    const weight = n.strokeWeight === figma.mixed ? 1 : n.strokeWeight || 0;
    const bg = await backgroundOf(n, mode, frame);
    const fill = visiblePaint(n.fills);
    if (fill) {
      const f = await resolvePaint(fill, mode);
      if (ratio(blend(f.c, f.a, bg.color), bg.color) >= 3) continue;
    }
    if (stroke && weight > 0) {
      const s = await resolvePaint(stroke, mode);
      out.push({
        n,
        r: ratio(blend(s.c, s.a * opacityOf(n, v.node), bg.color), bg.color),
        fg: s.token || 'raw color',
        bg: bg.token || 'raw color',
      });
    }
    for (const e of Array.isArray(n.effects) ? n.effects : [])
      if (e.visible !== false && e.type === 'DROP_SHADOW' && (e.spread || 0) > 0) {
        const c = e.color;
        out.push({
          n,
          r: ratio(blend(c, c.a, bg.color), bg.color),
          fg: 'focus ring effect',
          bg: bg.token || 'raw color',
        });
      }
  }
  return out;
}
async function remoteLinks(frame) {
  const local = new Set(
    (await figma.variables.getLocalVariableCollectionsAsync()).map(c => c.id)
  );
  const found = { instances: 0, styles: 0, variables: 0, modes: 0 };
  const styleCache = new Map();
  const remoteStyle = async id => {
    if (!styleCache.has(id)) {
      const s = await figma.getStyleByIdAsync(id);
      styleCache.set(id, Boolean(s && s.remote));
    }
    return styleCache.get(id);
  };
  for (const n of [frame, ...frame.findAll(() => true)]) {
    for (const id of Object.keys(n.explicitVariableModes || {}))
      if (!local.has(id)) found.modes++;
    if (n.type === 'INSTANCE' && !inInstance(n, frame)) {
      const m = await n.getMainComponentAsync();
      if (m && m.remote) found.instances++;
    }
    for (const key of ['textStyleId', 'fillStyleId', 'strokeStyleId', 'effectStyleId'])
      if (typeof n[key] === 'string' && n[key] && (await remoteStyle(n[key])))
        found.styles++;
    for (const b of Object.values(n.boundVariables || {}))
      for (const a of Array.isArray(b) ? b : [b]) {
        const v = a && a.id && (await getVar(a.id));
        if (v && v.remote) found.variables++;
      }
  }
  return Object.values(found).some(Boolean) ? found : null;
}

async function auditFrame(frame) {
  const mode = (frame.explicitVariableModes || {})[sem.id] || LIGHT;
  // Component sets and standalone components anywhere in the frame, the holders and instances
  // figma-dark-preview.js marks, and (for older dark frames) direct child frames holding instances.
  const units = frame.findAll(
    n =>
      n.type === 'COMPONENT_SET' ||
      (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET') ||
      ((n.type === 'FRAME' || n.type === 'INSTANCE') &&
        n.getSharedPluginData('clickui', 'holder') === '1') ||
      (n.parent === frame &&
        n.type === 'FRAME' &&
        n.name !== 'A11y' &&
        n.children.some(c => c.type === 'INSTANCE'))
  );
  const result = [];
  for (const unit of units) {
    const u = {
      name: unit.name === 'Avatar variants' ? 'Avatar' : unit.name,
      variants: 0,
      checks: [],
      exempt: 0,
      min: null,
      fails: [],
      legacy: new Set(),
      issues: [],
      review: [],
    };
    const variants = await variantsOf(unit);
    const values = valuesOf(variants);
    const all = [...Object.values(values)].flatMap(s => [...s]);
    const interactive =
      !NOT_FOCUSABLE.test(unit.name) && all.some(x => /hover|active|pressed/i.test(x));
    const isControl = CONTROL.test(unit.name);
    if (interactive && !all.some(x => /focus/i.test(x)))
      u.issues.push('No Focus variant (2.4.7)');
    let smallest = null;
    for (const v of variants) {
      u.variants++;
      if (DISABLED.test(v.name)) {
        u.exempt++;
        continue;
      }
      const focus = /=[^,]*focus/i.test(v.name);
      if (focus) {
        const p = parts(v.name);
        const key = Object.keys(p).find(k => /focus/i.test(p[k]));
        const def = [...values[key]].find(x => /^(default|idle|rest|enabled)$/i.test(x));
        const twin =
          def &&
          variants.find(w => {
            const q = parts(w.name);
            return (
              q[key] === def && Object.keys(p).every(k => k === key || q[k] === p[k])
            );
          });
        if (twin && (await lookOf(v.node)) === (await lookOf(twin.node)))
          u.issues.push(`${v.name} looks the same as ${key}=${def} (2.4.7)`);
      }
      if (interactive) {
        const w = Math.round(v.node.width),
          h = Math.round(v.node.height);
        if (Math.min(w, h) < MIN_TARGET && (!smallest || w * h < smallest.w * smallest.h))
          smallest = { w, h, name: v.name };
      }
      if (isControl || focus)
        for (const e of await edgeChecks(v, mode, frame)) {
          const check = {
            variant: v.name,
            kind: focus ? 'focus' : 'border',
            r: e.r,
            need: 3,
            fg: e.fg,
            bg: e.bg,
          };
          u.checks.push(check);
          if (e.r < 3) u.fails.push(check);
        }
      const targets = v.node.findAll(
        n =>
          (n.type === 'TEXT' ||
            (ICONISH.has(n.type) && inInstance(n, v.node) && !inArtwork(n, v.node))) &&
          shown(n, v.node)
      );
      // Mixed-fill text (a sentence with a link) is checked once per fill run.
      const runs = [];
      for (const t of targets)
        if (t.type === 'TEXT' && t.fills === figma.mixed)
          for (const s of t.getStyledTextSegments(['fills']))
            runs.push({ t, paint: visiblePaint(s.fills) });
        else runs.push({ t, paint: null });
      for (const { t, paint: runPaint } of runs) {
        const isText = t.type === 'TEXT';
        const paint =
          runPaint || visiblePaint(t.fills) || (!isText && visiblePaint(t.strokes));
        if (!paint || (!isText && (await isPlate(paint)))) continue;
        const fg = await resolvePaint(paint, mode);
        const bg = await backgroundOf(t, mode, frame);
        const fgColor = blend(fg.c, fg.a * opacityOf(t, v.node), bg.color);
        const r = ratio(fgColor, bg.color);
        const size = typeof t.fontSize === 'number' ? t.fontSize : 14;
        const bold = typeof t.fontWeight === 'number' && t.fontWeight >= 700;
        const need = isText ? (size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5) : 3;
        for (const tok of [fg.token, bg.token])
          if (
            tok &&
            !tok.startsWith('color/') &&
            !tok.startsWith('palette/') &&
            !tok.startsWith('utility/')
          )
            u.legacy.add(tok);
        const check = {
          variant: v.name,
          kind: isText ? 'text' : 'icon',
          r,
          need,
          fg: fg.token || 'raw color',
          bg: bg.token || 'raw color',
        };
        u.checks.push(check);
        if (!u.min || r < u.min.r) u.min = check;
        if (r < need) u.fails.push(check);
      }
    }
    if (smallest)
      u.review.push(
        `Smallest target ${smallest.w}x${smallest.h} (${smallest.name}) is under ${MIN_TARGET}x${MIN_TARGET}: fine only with ${MIN_TARGET}px of spacing or a larger hit area (2.5.8)`
      );
    result.push(u);
  }
  return {
    mode: mode === LIGHT ? 'Light' : 'Dark',
    units: result,
    remote: await remoteLinks(frame),
  };
}

function compareWithRepo(rep) {
  const unitNames = new Set(rep.units.map(u => u.name));
  return REPO_FAILURES.filter(f => f.theme === rep.mode && unitNames.has(f.set)).map(
    f => {
      if (!f.variantRe) return { ...f, status: 'missing' };
      const unit = rep.units.find(u => u.name === f.set);
      const re = new RegExp(f.variantRe);
      const matches = unit.checks.filter(c => re.test(c.variant) && c.kind === f.kind);
      if (!matches.length) return { ...f, status: 'missing' };
      const worst = matches.reduce((a, b) => (b.r < a.r ? b : a));
      return { ...f, status: worst.r >= worst.need ? 'fixed' : 'failing', figma: worst };
    }
  );
}

const reports = [];
for (const id of FRAME_IDS) {
  const frame = await figma.getNodeByIdAsync(id);
  const rep = await auditFrame(frame);
  reports.push({ frame, ...rep, repo: compareWithRepo(rep) });
}

if (DRY) {
  return reports.map(r => ({
    frame: r.frame.name,
    mode: r.mode,
    units: r.units.map(u => ({
      name: u.name,
      variants: u.variants,
      checks: u.checks.length,
      fails: u.fails.length,
      failing: [
        ...new Set(u.fails.map(f => `${f.kind} ${f.r.toFixed(2)} ${f.fg} on ${f.bg}`)),
      ].slice(0, 6),
      min: u.min && `${u.min.r.toFixed(2)} ${u.min.variant}`,
      issues: u.issues,
      review: u.review,
    })),
    remote: r.remote,
    repo: r.repo.map(
      f => `${f.status} ${f.label} ${f.ratio} -> ${f.figma ? f.figma.r.toFixed(2) : '-'}`
    ),
  }));
}

const desc = reports[0].frame.findOne(
  n => n.type === 'TEXT' && typeof n.fontName === 'object'
);
const family = 'Basier Square';
const loaded = [];
for (const style of ['Regular', 'SemiBold']) {
  try {
    await figma.loadFontAsync({ family, style });
    loaded.push(style);
  } catch (e) {}
}
await figma.loadFontAsync(desc.fontName);
const font = style => (loaded.includes(style) ? { family, style } : desc.fontName);
const paint = name => [
  figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    byName.get(name)
  ),
];
function text(chars, size, style, color) {
  const t = figma.createText();
  t.fontName = font(style);
  t.characters = chars;
  t.fontSize = size;
  t.fills = paint(color);
  return t;
}
function autoFrame(name, dir, gap) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = dir;
  f.itemSpacing = gap;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.fills = [];
  return f;
}
function pill(label, tone) {
  const p = autoFrame('Status', 'HORIZONTAL', 0);
  p.paddingLeft = p.paddingRight = 8;
  p.paddingTop = p.paddingBottom = 2;
  p.cornerRadius = 4;
  p.fills = paint(`color/background/feedback/${tone}/subtle`);
  p.appendChild(text(label, 12, 'SemiBold', `color/foreground/feedback/${tone}`));
  return p;
}
const today = new Date().toISOString().slice(0, 10);
const MAX_FAILS = 8;
const STATUS = {
  fixed: ['Fixed in Figma', 'success'],
  failing: ['Still fails in Figma', 'error'],
  missing: ['Not in Figma', 'warning'],
};

const drawn = [];
for (const rep of reports) {
  const frame = rep.frame;
  const old = frame.findChild(n => n.name === 'A11y');
  if (old) old.remove();
  const pass = rep.units.every(u => u.fails.length === 0 && u.issues.length === 0);
  const block = autoFrame('A11y', 'VERTICAL', 12);
  block.paddingTop = block.paddingBottom = block.paddingLeft = block.paddingRight = 16;
  block.cornerRadius = 8;
  block.fills = paint('color/background/subtle');
  block.strokes = paint('color/border/default');
  block.strokeWeight = 1;
  const head = autoFrame('Heading', 'HORIZONTAL', 8);
  head.counterAxisAlignItems = 'CENTER';
  head.appendChild(text('Accessibility', 16, 'SemiBold', 'color/foreground/default'));
  head.appendChild(
    pill(pass ? 'Passes WCAG AA' : 'Fails WCAG AA', pass ? 'success' : 'error')
  );
  block.appendChild(head);
  block.appendChild(
    text(
      `Contrast in ${rep.mode} mode: text 4.5:1 (3:1 at 24px+), icons, control borders and focus indicators 3:1. Interactive components need a Focus variant that differs from Default, and targets of ${MIN_TARGET}x${MIN_TARGET} or more. Disabled states, separators and logos are exempt. Checked ${today}.`,
      12,
      'Regular',
      'color/foreground/subtle'
    )
  );
  for (const u of rep.units) {
    const ok = u.fails.length === 0 && u.issues.length === 0;
    const row = autoFrame('Row', 'HORIZONTAL', 16);
    row.appendChild(
      text(
        ok ? 'Pass' : 'Fail',
        12,
        'SemiBold',
        'color/foreground/feedback/' + (ok ? 'success' : 'error')
      )
    );
    const lowest = u.min ? `, lowest ${u.min.r.toFixed(2)}:1 (${u.min.variant})` : '';
    const exempt = u.exempt ? `, ${u.exempt} disabled skipped` : '';
    row.appendChild(
      text(
        `${u.name}: ${u.checks.length} checks across ${u.variants} variants${exempt}${lowest}`,
        12,
        'Regular',
        'color/foreground/default'
      )
    );
    block.appendChild(row);
    const unique = [
      ...new Map(
        u.fails.map(f => [`${f.kind}|${f.fg}|${f.bg}|${f.r.toFixed(2)}`, f])
      ).values(),
    ];
    for (const f of unique.slice(0, MAX_FAILS))
      block.appendChild(
        text(
          `      ${f.variant}: ${f.kind} ${f.r.toFixed(2)}:1, needs ${f.need}:1. ${f.fg} on ${f.bg}`,
          12,
          'Regular',
          'color/foreground/subtle'
        )
      );
    if (unique.length > MAX_FAILS)
      block.appendChild(
        text(
          `      and ${unique.length - MAX_FAILS} more failing combinations`,
          12,
          'Regular',
          'color/foreground/subtle'
        )
      );
    if (u.legacy.size)
      block.appendChild(
        text(
          `      Uses non-Semantic tokens that won't switch modes: ${[...u.legacy].join(', ')}`,
          12,
          'Regular',
          'color/foreground/feedback/warning'
        )
      );
    for (const [lines, color] of [
      [u.issues, 'color/foreground/feedback/error'],
      [u.review, 'color/foreground/feedback/warning'],
    ])
      for (const line of lines)
        block.appendChild(text(`      ${line}`, 12, 'Regular', color));
  }
  if (rep.remote)
    block.appendChild(
      text(
        `Links to another library: ${Object.entries(rep.remote)
          .filter(([, n]) => n)
          .map(([k, n]) => `${n} ${k}`)
          .join(', ')}. Swap them to local components, styles and variables.`,
        12,
        'Regular',
        'color/foreground/feedback/warning'
      )
    );
  block.appendChild(text('Check by hand', 12, 'SemiBold', 'color/foreground/default'));
  for (const line of MANUAL)
    block.appendChild(text(`- ${line}`, 12, 'Regular', 'color/foreground/subtle'));

  const divider = figma.createFrame();
  divider.name = 'Divider';
  divider.resize(10, 1);
  divider.fills = paint('color/border/default');
  block.appendChild(divider);
  divider.layoutAlign = 'STRETCH';
  const repoHead = autoFrame('Repo heading', 'HORIZONTAL', 8);
  repoHead.counterAxisAlignItems = 'CENTER';
  repoHead.appendChild(text('Repo today', 14, 'SemiBold', 'color/foreground/default'));
  repoHead.appendChild(
    pill(
      rep.repo.length
        ? `${rep.repo.length} failing in ${rep.mode} mode`
        : `Passes in ${rep.mode} mode`,
      rep.repo.length ? 'error' : 'success'
    )
  );
  block.appendChild(repoHead);
  block.appendChild(
    text(
      'Contrast of the same states using the click-ui repo tokens (src/theme/styles/tokens-*.css), and what the Figma tokens change.',
      12,
      'Regular',
      'color/foreground/subtle'
    )
  );
  for (const f of rep.repo) {
    const [label, tone] = STATUS[f.status];
    const row = autoFrame('Repo row', 'HORIZONTAL', 12);
    row.counterAxisAlignItems = 'CENTER';
    row.appendChild(pill(label, tone));
    const name = f.label.replace('Button empty', 'Button empty (Link in Figma)');
    const repoPart = `${name}: repo ${f.ratio}:1, needs ${f.need}:1 (${f.fg} on ${f.bg})`;
    const figmaPart = f.figma
      ? `.   Figma now: ${f.figma.r.toFixed(2)}:1 with ${f.figma.fg} on ${f.figma.bg}`
      : '.   No matching Figma variant, needs a fix in the repo';
    row.appendChild(
      text(repoPart + figmaPart, 12, 'Regular', 'color/foreground/default')
    );
    block.appendChild(row);
  }

  const content = frame.children.filter(
    n => n.name !== 'A11y' && n.name !== 'Header' && n.type !== 'TEXT'
  );
  const left = Math.min(...content.map(n => n.x));
  const bottom = Math.max(
    ...frame.children.filter(n => n.name !== 'A11y').map(n => n.y + n.height)
  );
  frame.appendChild(block);
  if (frame.layoutMode && frame.layoutMode !== 'NONE')
    block.layoutPositioning = 'ABSOLUTE';
  block.x = left;
  block.y = bottom + 40;
  if (block.y + block.height + 80 > frame.height)
    (frame.type === 'SECTION' ? frame.resizeWithoutConstraints : frame.resize).call(
      frame,
      frame.width,
      block.y + block.height + 80
    );
  drawn.push({
    frame: frame.name,
    mode: rep.mode,
    pass,
    repo: rep.repo.map(
      f => `${f.status} ${f.label} ${f.ratio} -> ${f.figma ? f.figma.r.toFixed(2) : '-'}`
    ),
  });
}
return drawn;
