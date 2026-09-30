// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active, or pass it to
// figma_execute_across_files with the v2 file key.
// Draws the Color page from the file's local variables: how color works, the Primitives palettes,
// every Semantic color token in Light and Dark, and contrast ratios for text on each surface and for
// the pairs made to go together. Swatches are bound to the variables and follow value changes, but
// palette steps, hex values and ratios are written as text: run this again after adding or remapping
// a token. Each part replaces its own block, so if a run times out, run the missing parts on their own.

// ---- CONFIG ----
// Every part, as 'section:block', in page order.
const ALL_PARTS = [
  'intro:flow',
  'intro:names',
  'intro:rules',
  'palettes:ramps',
  'semantic:background',
  'semantic:foreground',
  'semantic:border',
  'semantic:solid',
  'semantic:chart',
  'semantic:utility',
  'contrast:surfaces',
  'contrast:pairs',
];
// Parts to draw this run, e.g. ['contrast:pairs'] after changing PAIRS.
const PARTS = ALL_PARTS;
const PAGE = 'Color';
// Any "_Design System / Doc Header" instance in the file; it is cloned once, when the page is first drawn.
const HEADER_SOURCE_ID = '60:42576';
const SECTIONS = {
  intro: [
    'How color works',
    'Color comes from two variable collections. Primitives hold the raw palette. Semantic tokens name each color by what it is for and point at a palette step in Light and another in Dark. Components only use Semantic tokens, so switching the mode re-themes them.',
  ],
  palettes: [
    'Palettes',
    'The Primitives collection: raw color ramps with one value each. Semantic tokens point at these steps, so changing a step changes every token that uses it. Components never bind a palette step directly.',
  ],
  semantic: [
    'Semantic tokens',
    'Every Semantic color token with its Light and Dark value. Swatches are live; the palette step next to each is written when the page is generated. "raw" means the token holds a color instead of pointing at a palette step.',
  ],
  contrast: [
    'Contrast',
    'WCAG AA needs 4.5:1 for text and 3:1 for icons. Ratios are worked out from the resolved values when the page is generated, with translucent colors composited over the page background. Disabled pairs are shown but exempt.',
  ],
};
const RAMPS = [
  'brand-light',
  'brand-dark',
  'gray-light',
  'gray-dark',
  'blue-light',
  'blue-dark',
  'green-light',
  'green-dark',
  'orange-light',
  'orange-dark',
  'red-light',
  'red-dark',
  'black',
  'white',
];
// Translucent ramps are shown over a plate so the alpha is visible.
const RAMP_PLATES = { black: 'palette/white/solid', white: 'palette/gray-dark/300' };
const GROUPS = {
  background: [
    'Background',
    'Fills behind content: pages, cards, menus, fields and controls.',
  ],
  foreground: ['Foreground', 'Text and icons.'],
  border: ['Border', 'Strokes, outlines and dividers.'],
  solid: ['Solid', 'Solid status colors for small shapes such as dots and indicators.'],
  chart: ['Chart', 'Data series colors for charts.'],
  utility: [
    'Utility',
    'Helpers outside the main set: overlay scrims, the shadow color and a utility border.',
  ],
};
const PLAIN_LABEL = { background: 'Surfaces', foreground: 'Text', border: 'Lines' };
// Foreground tokens made for a strong fill are previewed on that fill.
const PREVIEW_PLATES = {
  'color/foreground/interactive/on-primary':
    'color/background/interactive/primary/default',
  'color/foreground/interactive/on-danger': 'color/background/interactive/danger/default',
  'color/foreground/interactive/on-neutral':
    'color/background/interactive/neutral/default',
  'color/foreground/interactive/icon-secondary':
    'color/background/interactive/icon-secondary/default',
};
const MATRIX_TEXT = [
  'color/foreground/strong',
  'color/foreground/default',
  'color/foreground/subtle',
  'color/foreground/placeholder',
  'color/foreground/disabled',
  'color/foreground/interactive/accent/default',
  'color/foreground/feedback/error',
  'color/foreground/feedback/warning',
  'color/foreground/feedback/success',
  'color/foreground/feedback/info',
  'color/foreground/feedback/neutral',
];
const MATRIX_SURFACES = [
  'color/background/base',
  'color/background/subtle',
  'color/background/muted',
  'color/background/raised',
  'color/background/field',
];
// [foreground, background, 'text' | 'icon' | 'disabled']
const states = (fg, bg, list, kind = 'text') => list.map(s => [fg, `${bg}/${s}`, kind]);
const PAIRS = [
  ...states(
    'color/foreground/interactive/on-primary',
    'color/background/interactive/primary',
    ['default', 'hover', 'active']
  ),
  ...states(
    'color/foreground/interactive/on-primary',
    'color/background/interactive/primary/action',
    ['default', 'hover', 'active']
  ),
  ...states('color/foreground/default', 'color/background/interactive/secondary', [
    'default',
    'hover',
    'active',
  ]),
  ...states('color/foreground/default', 'color/background/interactive/secondary/action', [
    'default',
    'hover',
    'active',
  ]),
  ...states('color/foreground/default', 'color/background/interactive/ghost', [
    'hover',
    'active',
  ]),
  ...states(
    'color/foreground/interactive/on-danger',
    'color/background/interactive/danger',
    ['default', 'hover', 'active']
  ),
  ...states(
    'color/foreground/interactive/on-neutral',
    'color/background/interactive/neutral',
    ['default', 'hover', 'active']
  ),
  ...states(
    'color/foreground/interactive/icon-primary',
    'color/background/interactive/icon-primary',
    ['hover', 'active'],
    'icon'
  ),
  ...states(
    'color/foreground/interactive/icon-secondary',
    'color/background/interactive/icon-secondary',
    ['default', 'hover', 'active'],
    'icon'
  ),
  ...states('color/foreground/default', 'color/background/select', ['default', 'hover']),
  ...['error', 'warning', 'success', 'info', 'neutral'].map(f => [
    `color/foreground/feedback/${f}`,
    `color/background/feedback/${f}/subtle`,
    'text',
  ]),
  [
    'color/foreground/interactive/disabled',
    'color/background/interactive/primary/disabled',
    'disabled',
  ],
];
const CONTENT_WIDTH = 1280;
// ---- END CONFIG ----

await figma.loadAllPagesAsync();
const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const MODES = Object.fromEntries(sem.modes.map(m => [m.name, m.modeId]));
const colorVars = await figma.variables.getLocalVariablesAsync('COLOR');
const byName = new Map(colorVars.map(v => [v.name, v]));
const byId = new Map(colorVars.map(v => [v.id, v]));
const V = name => {
  const v = byName.get(name);
  if (!v) throw new Error(`No variable ${name}`);
  return v;
};

const family = 'Basier Square';
for (const style of ['Regular', 'SemiBold']) await figma.loadFontAsync({ family, style });
let mono = 'Roboto Mono';
for (const f of ['JetBrains Mono', 'Roboto Mono', 'Inter']) {
  try {
    await figma.loadFontAsync({ family: f, style: 'Regular' });
    mono = f;
    break;
  } catch (e) {}
}

// ---- color maths ----
function valueIn(v, mode) {
  return v.variableCollectionId === sem.id
    ? v.valuesByMode[MODES[mode]]
    : Object.values(v.valuesByMode)[0];
}
function resolve(v, mode) {
  for (let i = 0; i < 10 && v; i++) {
    const val = valueIn(v, mode);
    if (val && val.type === 'VARIABLE_ALIAS') v = byId.get(val.id);
    else return val;
  }
  return null;
}
const hex = c =>
  '#' +
  [c.r, c.g, c.b]
    .map(x =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')
    .toUpperCase() +
  (c.a !== undefined && c.a < 1 ? ` ${Math.round(c.a * 100)}%` : '');
function aliasLabel(v, mode) {
  const val = valueIn(v, mode);
  if (val && val.type === 'VARIABLE_ALIAS') {
    const t = byId.get(val.id);
    if (!t) return 'remote variable';
    return t.variableCollectionId === sem.id
      ? `→ ${t.name.replace(/^color\//, '')}`
      : t.name.replace(/^palette\//, '');
  }
  return val.a === 0 ? 'transparent (raw)' : `${hex(val)} (raw)`;
}
const over = (top, bottom) => {
  const a = top.a === undefined ? 1 : top.a;
  return {
    r: top.r * a + bottom.r * (1 - a),
    g: top.g * a + bottom.g * (1 - a),
    b: top.b * a + bottom.b * (1 - a),
    a: 1,
  };
};
const lum = c =>
  [c.r, c.g, c.b]
    .map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
    .reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0);
function ratio(fg, bg, mode) {
  const base = over(resolve(V('color/background/base'), mode), { r: 1, g: 1, b: 1 });
  const b = over(resolve(V(bg), mode), base);
  const f = over(resolve(V(fg), mode), b);
  const [hi, lo] = [lum(f), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// ---- drawing helpers ----
const paint = name =>
  figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    V(name)
  );
function text(chars, o = {}) {
  const t = figma.createText();
  t.fontName = { family: o.mono ? mono : family, style: o.style || 'Regular' };
  t.characters = chars;
  t.fontSize = o.size || 16;
  t.fills = [paint(o.color || 'color/foreground/default')];
  if (o.width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(o.width, t.height);
  }
  return t;
}
function box(name, dir, o = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.fills = o.fill ? [paint(o.fill)] : [];
  if (dir) {
    f.layoutMode = dir;
    f.itemSpacing = o.gap || 0;
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    if (o.align) f.counterAxisAlignItems = o.align;
  }
  const [py, px] = Array.isArray(o.pad) ? o.pad : [o.pad || 0, o.pad || 0];
  f.paddingTop = f.paddingBottom = py;
  f.paddingLeft = f.paddingRight = px;
  if (o.radius) f.cornerRadius = o.radius;
  if (o.stroke) {
    f.strokes = [paint(o.stroke)];
    f.strokeWeight = o.strokeWeight || 1;
    f.strokeAlign = 'INSIDE';
  }
  if (o.width) {
    f.resize(o.width, Math.max(f.height, 1));
    if (dir === 'HORIZONTAL') f.primaryAxisSizingMode = 'FIXED';
    else if (dir) f.counterAxisSizingMode = 'FIXED';
  }
  if (o.mode) f.setExplicitVariableModeForCollection(sem, MODES[o.mode]);
  return f;
}
function sized(f, w, h) {
  f.resize(w, h);
  if (f.layoutMode !== 'NONE') {
    f.primaryAxisSizingMode = 'FIXED';
    f.counterAxisSizingMode = 'FIXED';
    f.primaryAxisAlignItems = 'CENTER';
    f.counterAxisAlignItems = 'CENTER';
  }
  return f;
}
function add(parent, child, fill) {
  parent.appendChild(child);
  if (fill) child.layoutSizingHorizontal = 'FILL';
  return child;
}
const bottomLine = (f, color = 'color/border/default') => {
  f.strokes = [paint(color)];
  f.strokeAlign = 'INSIDE';
  f.strokeTopWeight = f.strokeLeftWeight = f.strokeRightWeight = 0;
  f.strokeBottomWeight = 1;
};
const short = name => name.replace(/^color\//, '');
function badge(r, kind) {
  const need = kind === 'icon' ? 3 : 4.5;
  const [label, tone] =
    kind === 'disabled'
      ? ['Exempt', 'neutral']
      : r >= need
        ? ['AA', 'success']
        : ['Fails', 'error'];
  const b = box('Badge', 'HORIZONTAL', {
    pad: [2, 6],
    radius: 4,
    fill: `color/background/feedback/${tone}/subtle`,
  });
  b.appendChild(
    text(label, {
      size: 11,
      style: 'SemiBold',
      color: `color/foreground/feedback/${tone}`,
    })
  );
  return { node: b, pass: label !== 'Fails' };
}

// ---- page and sections ----
const page = figma.root.children.find(p => p.name === PAGE);
if (!page) throw new Error(`No page named ${PAGE}`);
let root = page.children.find(
  n => n.getSharedPluginData('clickui', 'generated') === 'color'
);
if (!root) {
  root = box('Color', 'VERTICAL', {
    fill: 'color/background/base',
    width: 1440,
    mode: 'Light',
  });
  root.setSharedPluginData('clickui', 'generated', 'color');
  page.appendChild(root);
  root.x = 0;
  root.y = 0;
  const header = add(
    root,
    (await figma.getNodeByIdAsync(HEADER_SOURCE_ID)).clone(),
    true
  );
  header.name = 'Header';
  for (const t of header.findAll(n => n.type === 'TEXT')) {
    await Promise.all(
      t.getRangeAllFontNames(0, t.characters.length).map(f => figma.loadFontAsync(f))
    );
    if (t.name === 'Brand Colours') t.characters = 'Color';
    else if (t.fontSize === 18) t.characters = 'Foundations -> Color';
    else if (t.fontSize === 24)
      t.characters =
        'Palettes, every Semantic color token in Light and Dark, and which pairs pass contrast. Generated from the file variables by scripts/figma-color-page.js.';
  }
  const content = add(root, box('Content', 'VERTICAL', { gap: 120 }), true);
  content.paddingLeft = content.paddingRight = 80;
  content.paddingTop = 64;
  content.paddingBottom = 160;
}
const content = root.findChild(n => n.name === 'Content');
const sectionOrder = [...new Set(ALL_PARTS.map(p => p.split(':')[0]))];

function section(key) {
  let s = content.children.find(n => n.getSharedPluginData('clickui', 'part') === key);
  if (s) return s;
  s = box(SECTIONS[key][0], 'VERTICAL', { gap: 48 });
  s.setSharedPluginData('clickui', 'part', key);
  const before = content.children.filter(
    n =>
      sectionOrder.indexOf(n.getSharedPluginData('clickui', 'part')) <
      sectionOrder.indexOf(key)
  ).length;
  content.insertChild(before, s);
  s.layoutSizingHorizontal = 'FILL';
  const head = add(s, box('Heading', 'VERTICAL', { gap: 12 }), true);
  head.setSharedPluginData('clickui', 'block', 'heading');
  head.appendChild(
    text(SECTIONS[key][0], {
      size: 40,
      style: 'SemiBold',
      color: 'color/foreground/strong',
    })
  );
  head.appendChild(
    text(SECTIONS[key][1], { size: 18, color: 'color/foreground/subtle', width: 960 })
  );
  return s;
}
function block(part, title, description) {
  const [key, name] = part.split(':');
  const s = section(key);
  const old = s.children.find(n => n.getSharedPluginData('clickui', 'block') === name);
  if (old) old.remove();
  const siblings = ALL_PARTS.filter(p => p.startsWith(`${key}:`)).map(
    p => p.split(':')[1]
  );
  const before = s.children.filter(n => {
    const b = n.getSharedPluginData('clickui', 'block');
    return b === 'heading' || siblings.indexOf(b) < siblings.indexOf(name);
  }).length;
  const b = box(title || name, 'VERTICAL', { gap: 24 });
  b.setSharedPluginData('clickui', 'block', name);
  s.insertChild(before, b);
  b.layoutSizingHorizontal = 'FILL';
  if (title)
    b.appendChild(
      text(title, { size: 24, style: 'SemiBold', color: 'color/foreground/strong' })
    );
  if (description)
    b.appendChild(
      text(description, { size: 16, color: 'color/foreground/subtle', width: 960 })
    );
  return b;
}

function preview(name, kind) {
  const p = box('Preview', kind === 'text' ? 'HORIZONTAL' : null, { radius: 6 });
  sized(p, 48, 32);
  if (kind === 'text') {
    if (PREVIEW_PLATES[name]) p.fills = [paint(PREVIEW_PLATES[name])];
    p.appendChild(text('Aa', { size: 18, style: 'SemiBold', color: name }));
  } else if (kind === 'stroke') {
    p.strokes = [paint(name)];
    p.strokeWeight = 2;
    p.strokeAlign = 'INSIDE';
  } else {
    p.fills = [paint(name)];
    p.strokes = [paint('color/border/default')];
    p.strokeAlign = 'INSIDE';
  }
  return p;
}
function tableRow(cells) {
  const r = box('Row', 'HORIZONTAL');
  for (const [node, width, mode] of cells) {
    const c = box(mode || 'Cell', 'HORIZONTAL', {
      gap: 12,
      pad: [12, 16],
      width,
      align: 'CENTER',
      mode,
      fill: mode ? 'color/background/base' : null,
    });
    bottomLine(c);
    for (const n of [].concat(node)) c.appendChild(n);
    r.appendChild(c);
    c.layoutSizingVertical = 'FILL';
  }
  return r;
}
const headRow = labels =>
  tableRow(
    labels.map(([l, w]) => [
      text(l, { size: 13, style: 'SemiBold', color: 'color/foreground/subtle' }),
      w,
    ])
  );

// ---- parts ----
const failures = [];
const drawn = [];
const DRAW = {
  'intro:flow'(part) {
    const b = block(part);
    const row = add(b, box('Flow', 'HORIZONTAL', { gap: 20, align: 'CENTER' }));
    const token = 'color/background/interactive/primary/default';
    const card = title => {
      const c = box(title, 'VERTICAL', {
        gap: 16,
        pad: 24,
        width: 376,
        radius: 12,
        fill: 'color/background/subtle',
        stroke: 'color/border/default',
      });
      c.appendChild(text(title, { size: 20, style: 'SemiBold' }));
      return add(row, c);
    };
    const caption = (c, chars) =>
      c.appendChild(
        text(chars, { size: 14, color: 'color/foreground/subtle', width: 328 })
      );
    const arrow = () =>
      row.appendChild(
        text('→', { size: 32, mono: true, color: 'color/foreground/subtle' })
      );

    const palette = card('1. Palette step');
    for (const mode of ['Light', 'Dark']) {
      const step = aliasLabel(V(token), mode);
      const line = add(palette, box('Step', 'HORIZONTAL', { gap: 12, align: 'CENTER' }));
      line.appendChild(preview(`palette/${step}`, 'fill'));
      line.appendChild(text(`palette/${step}`, { size: 14, mono: true }));
    }
    caption(
      palette,
      'Primitives collection. Raw values in ramps such as gray-light and brand-dark. One value each, no modes.'
    );
    arrow();
    const semCard = card('2. Semantic token');
    semCard.appendChild(text(token, { size: 14, mono: true, width: 328 }));
    for (const mode of ['Light', 'Dark'])
      semCard.appendChild(
        text(`${mode}: ${aliasLabel(V(token), mode)}`, {
          size: 14,
          mono: true,
          color: 'color/foreground/subtle',
        })
      );
    caption(
      semCard,
      'Semantic collection. Named by purpose, with one value for Light and one for Dark.'
    );
    arrow();
    const comp = card('3. Component');
    const pair = add(comp, box('Modes', 'HORIZONTAL', { gap: 12 }));
    for (const mode of ['Light', 'Dark']) {
      const m = add(
        pair,
        box(mode, 'VERTICAL', {
          gap: 8,
          pad: 16,
          radius: 8,
          fill: 'color/background/base',
          stroke: 'color/border/default',
          mode,
          align: 'CENTER',
        })
      );
      const btn = add(
        m,
        box('Button', 'HORIZONTAL', { pad: [6, 16], radius: 4, fill: token })
      );
      btn.appendChild(
        text('Button', {
          size: 14,
          style: 'SemiBold',
          color: 'color/foreground/interactive/on-primary',
        })
      );
      m.appendChild(text(mode, { size: 12, color: 'color/foreground/subtle' }));
    }
    caption(
      comp,
      'Components bind the Semantic token. The mode set on a frame decides which value shows.'
    );
  },
  'intro:names'(part) {
    const b = block(
      part,
      'Reading a token name',
      'Names go from general to specific. Not every token has every part: color/background/base is a property and a name, color/chart/blue is a property and a series.'
    );
    const chips = add(b, box('Anatomy', 'HORIZONTAL', { gap: 12 }));
    [
      ['color', 'Type'],
      ['background', 'Property'],
      ['interactive', 'Role'],
      ['primary', 'Variant'],
      ['hover', 'State'],
    ].forEach(([seg, label], i) => {
      if (i)
        chips.appendChild(
          text('/', { size: 24, mono: true, color: 'color/foreground/subtle' })
        );
      const c = add(chips, box(label, 'VERTICAL', { gap: 8 }));
      const chip = add(
        c,
        box('Chip', 'HORIZONTAL', {
          pad: [8, 12],
          radius: 6,
          fill: 'color/background/muted',
        })
      );
      chip.appendChild(text(seg, { size: 20, mono: true }));
      c.appendChild(text(label, { size: 13, color: 'color/foreground/subtle' }));
    });
    const list = add(b, box('Properties', 'VERTICAL'));
    for (const [key, [, desc]] of Object.entries(GROUPS)) {
      const r = add(list, box(key, 'HORIZONTAL', { gap: 24, pad: [10, 0] }));
      bottomLine(r);
      r.appendChild(
        text(key === 'utility' ? 'utility/color' : key, {
          size: 15,
          mono: true,
          width: 200,
        })
      );
      r.appendChild(
        text(desc, { size: 15, color: 'color/foreground/subtle', width: 760 })
      );
    }
    b.appendChild(
      text(
        'Roles: interactive is for controls and comes in default, hover, active and disabled states; feedback carries error, warning, success, info and neutral; select marks selected items and rows. Tokens without a role, such as background/base, are plain surfaces.',
        { size: 15, color: 'color/foreground/subtle', width: 960 }
      )
    );
  },
  'intro:rules'(part) {
    const b = block(part, 'Rules');
    [
      'Components use Semantic tokens only. Palette steps are for defining what a Semantic token points at.',
      'Pick by purpose, not by color: text and icons are foreground, fills are background, strokes are border.',
      'Interactive tokens come in sets of default, hover, active and disabled. Use the whole set together.',
      'Text on a strong fill uses its on- token, such as on-primary on the primary background.',
      'Check a new pair against the Contrast section in both modes. If no token fits, ask before adding one so both modes get checked.',
    ].forEach((r, i) => b.appendChild(text(`${i + 1}. ${r}`, { size: 16, width: 960 })));
  },
  'palettes:ramps'(part) {
    const b = block(part);
    const stepKey = s => (s === 'solid' ? 1e6 : Number(s));
    for (const ramp of RAMPS) {
      const vars = colorVars
        .filter(v => v.name.startsWith(`palette/${ramp}/`))
        .sort(
          (x, y) => stepKey(x.name.split('/').pop()) - stepKey(y.name.split('/').pop())
        );
      if (!vars.length) continue;
      const r = add(b, box(ramp, 'VERTICAL', { gap: 12 }), true);
      r.appendChild(text(`palette/${ramp}`, { size: 18, style: 'SemiBold' }));
      const row = add(r, box('Steps', 'HORIZONTAL', { gap: 8 }));
      for (const v of vars) {
        const cell = add(row, box(v.name, 'VERTICAL', { gap: 6, width: 80 }));
        const sw = box('Swatch', null, { radius: 6, stroke: 'color/border/default' });
        sized(sw, 80, 56);
        sw.fills = RAMP_PLATES[ramp]
          ? [paint(RAMP_PLATES[ramp]), paint(v.name)]
          : [paint(v.name)];
        cell.appendChild(sw);
        cell.appendChild(text(v.name.split('/').pop(), { size: 12, style: 'SemiBold' }));
        cell.appendChild(
          text(hex(resolve(v, 'Light')), {
            size: 11,
            mono: true,
            color: 'color/foreground/subtle',
          })
        );
      }
    }
  },
  contrastRow(fg, bg, kind, width) {
    const cells = [];
    for (const mode of ['Light', 'Dark']) {
      const r = ratio(fg, bg, mode);
      const chip = box('Sample', 'HORIZONTAL', {
        pad: [6, 12],
        radius: 6,
        fill: bg,
        stroke: 'color/border/default',
      });
      chip.appendChild(
        text(kind === 'icon' ? '● Icon' : 'Aa Sample', {
          size: 14,
          style: 'SemiBold',
          color: fg,
        })
      );
      const bd = badge(r, kind);
      if (!bd.pass)
        failures.push(`${short(fg)} on ${short(bg)} (${mode}) ${r.toFixed(2)}:1`);
      cells.push([
        [chip, text(`${r.toFixed(2)}:1`, { size: 13, mono: true }), bd.node],
        width,
        mode,
      ]);
    }
    return cells;
  },
  'contrast:surfaces'(part) {
    const b = block(
      part,
      'Text on surfaces',
      'Each text color on each plain surface. Do not use a failing pair for text.'
    );
    const labelW = 280;
    const cellW = (CONTENT_WIDTH - labelW) / MATRIX_SURFACES.length;
    for (const mode of ['Light', 'Dark']) {
      b.appendChild(text(mode, { size: 18, style: 'SemiBold' }));
      const m = add(
        b,
        box(`Matrix (${mode})`, 'VERTICAL', {
          mode,
          radius: 12,
          stroke: 'color/border/default',
        })
      );
      m.clipsContent = true;
      const head = add(m, box('Header', 'HORIZONTAL'));
      const hcell = (node, w, fill) => {
        const c = add(
          head,
          box('Cell', 'HORIZONTAL', {
            pad: [12, 16],
            width: w,
            fill: fill || 'color/background/base',
            align: 'CENTER',
          })
        );
        bottomLine(c);
        c.appendChild(node);
        c.layoutSizingVertical = 'FILL';
      };
      hcell(
        text('Text / surface', {
          size: 13,
          style: 'SemiBold',
          color: 'color/foreground/subtle',
        }),
        labelW
      );
      for (const s of MATRIX_SURFACES)
        hcell(
          text(short(s), {
            size: 12,
            mono: true,
            color: 'color/foreground/subtle',
            width: cellW - 32,
          }),
          cellW,
          s
        );
      for (const fg of MATRIX_TEXT) {
        const kind = /disabled/.test(fg) ? 'disabled' : 'text';
        const r = add(m, box('Row', 'HORIZONTAL'));
        const lc = add(
          r,
          box('Cell', 'HORIZONTAL', {
            pad: [12, 16],
            width: labelW,
            fill: 'color/background/base',
            align: 'CENTER',
          })
        );
        bottomLine(lc);
        lc.appendChild(text(short(fg), { size: 13, mono: true, width: labelW - 32 }));
        lc.layoutSizingVertical = 'FILL';
        for (const s of MATRIX_SURFACES) {
          const rt = ratio(fg, s, mode);
          const c = add(
            r,
            box('Cell', 'HORIZONTAL', {
              gap: 8,
              pad: [12, 16],
              width: cellW,
              fill: s,
              align: 'CENTER',
            })
          );
          bottomLine(c);
          c.layoutSizingVertical = 'FILL';
          c.appendChild(text('Aa', { size: 18, style: 'SemiBold', color: fg }));
          c.appendChild(text(`${rt.toFixed(2)}:1`, { size: 13, mono: true }));
          const bd = badge(rt, kind);
          if (!bd.pass)
            failures.push(`${short(fg)} on ${short(s)} (${mode}) ${rt.toFixed(2)}:1`);
          c.appendChild(bd.node);
        }
      }
    }
  },
  'contrast:pairs'(part) {
    const b = block(
      part,
      'Pairs made to go together',
      'Text and icon colors on the interactive and feedback backgrounds they belong to.'
    );
    const t = add(
      b,
      box('Table', 'VERTICAL', { radius: 12, stroke: 'color/border/default' })
    );
    t.clipsContent = true;
    t.appendChild(
      headRow([
        ['Pair', 480],
        ['Light', 400],
        ['Dark', 400],
      ])
    );
    for (const [fg, bg, kind] of PAIRS) {
      if (!byName.has(fg) || !byName.has(bg)) {
        failures.push(`missing variable in pair ${fg} / ${bg}`);
        continue;
      }
      const label = box('Pair', 'VERTICAL', { gap: 4 });
      label.appendChild(text(short(fg), { size: 13, mono: true }));
      label.appendChild(
        text(`on ${short(bg)}${kind === 'icon' ? ' (icon, needs 3:1)' : ''}`, {
          size: 13,
          mono: true,
          color: 'color/foreground/subtle',
          width: 440,
        })
      );
      t.appendChild(tableRow([[label, 480], ...DRAW.contrastRow(fg, bg, kind, 400)]));
    }
  },
};
for (const g of Object.keys(GROUPS))
  DRAW[`semantic:${g}`] = part => {
    const [title, desc] = GROUPS[g];
    const b = block(part, title, desc);
    const rel = n =>
      g === 'utility'
        ? n.replace(/^utility\/color\//, '')
        : n.replace(/^color\/[^/]+\//, '');
    const prefix = g === 'utility' ? 'utility/color/' : `color/${g}/`;
    const rank = s => ({ default: 0, hover: 1, active: 2, disabled: 3 })[s] ?? 9;
    const vars = colorVars
      .filter(v => v.variableCollectionId === sem.id && v.name.startsWith(prefix))
      .map(v => ({ v, parts: rel(v.name).split('/') }))
      .sort((x, y) => {
        const px = x.parts.slice(0, -1).join('/');
        const py = y.parts.slice(0, -1).join('/');
        if (px !== py) return px.localeCompare(py);
        const lx = x.parts[x.parts.length - 1];
        const ly = y.parts[y.parts.length - 1];
        return rank(lx) - rank(ly) || lx.localeCompare(ly);
      });
    const t = add(
      b,
      box('Table', 'VERTICAL', { radius: 12, stroke: 'color/border/default' })
    );
    t.clipsContent = true;
    t.appendChild(
      headRow([
        ['Token', 480],
        ['Light', 400],
        ['Dark', 400],
      ])
    );
    const kind = g === 'foreground' ? 'text' : g === 'border' ? 'stroke' : 'fill';
    let sub = null;
    for (const { v, parts } of vars) {
      const s =
        g === 'utility' ? parts[0] : parts.length > 1 ? parts[0] : PLAIN_LABEL[g] || '';
      if (s !== sub) {
        sub = s;
        if (s) {
          const h = add(
            t,
            box('Subheading', 'HORIZONTAL', {
              pad: [16, 16],
              fill: 'color/background/subtle',
            }),
            true
          );
          bottomLine(h);
          h.appendChild(
            text(s[0].toUpperCase() + s.slice(1), {
              size: 14,
              style: 'SemiBold',
              color: 'color/foreground/subtle',
            })
          );
        }
      }
      const k = g === 'utility' && parts[0] === 'border' ? 'stroke' : kind;
      t.appendChild(
        tableRow([
          [text(v.name, { size: 14, mono: true, width: 448 }), 480],
          ...['Light', 'Dark'].map(mode => [
            [
              preview(v.name, k),
              text(aliasLabel(v, mode), {
                size: 13,
                mono: true,
                color: 'color/foreground/subtle',
              }),
            ],
            400,
            mode,
          ]),
        ])
      );
    }
  };

for (const part of PARTS) {
  if (!DRAW[part]) throw new Error(`Unknown part ${part}`);
  DRAW[part](part);
  drawn.push(part);
}
return { drawn, rootId: root.id, failures };
