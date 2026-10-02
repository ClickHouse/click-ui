// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active.
// Redraws the lists on the Radii and Shadow pages: one row per Semantic `radius/*` token (bound
// corners, value, usage) and one row per local `Shadow/*` effect style (Light and Dark sample, the
// repo CSS value and usage). The page header and frame stay; the list is replaced and the frame
// grows to fit. Run again after changing a radius token or a shadow style.

// ---- CONFIG ----
const RADIUS_USAGE = {
  'radius/none': 'Square corners',
  'radius/sm': 'Buttons and input fields',
  'radius/md': 'Modals and cards',
  'radius/full': 'Avatars and circular elements',
};
// Repo value per style, as written in src/theme/styles/tokens-*.css.
const SHADOWS = [
  [
    'Shadow/default',
    '--shadow-1',
    '0 4px 6px -1px, 0 2px 4px -1px; #151515 at 15% (Light), 60% (Dark)',
    'Cards, dialogs, menus, panels, popovers, toasts',
  ],
  [
    'Shadow/inset',
    '--shadow-2',
    '0 4px 4px 0 rgba(88, 92, 98, 0.06), inset 5px 0 10px 0 rgba(104, 105, 111, 0.1)',
    'Not used by a component yet',
  ],
  [
    'Shadow/flyout',
    '--shadow-3',
    '-5px 0 20px 0 rgba(0, 0, 0, 0.08), -6px 0 10px 0 rgba(0, 0, 0, 0.08)',
    'Flyout on the right edge',
  ],
  [
    'Shadow/flyout-reverse',
    '--shadow-4',
    '5px 0 20px 0 rgba(0, 0, 0, 0.08), 6px 0 10px 0 rgba(0, 0, 0, 0.08)',
    'Flyout on the left edge',
  ],
  [
    'Shadow/subtle',
    '--shadow-5',
    '0 2px 2px 0 rgba(0, 0, 0, 0.03)',
    'Not used by a component yet',
  ],
];
const LIST_X = 64;
const LIST_Y = 320;
// ---- END CONFIG ----

await figma.loadAllPagesAsync();
const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const MODES = Object.fromEntries(sem.modes.map(m => [m.name, m.modeId]));
const vars = await figma.variables.getLocalVariablesAsync();
const byName = new Map(vars.map(v => [v.name, v]));
const family = 'Basier Square';
for (const style of ['Regular', 'SemiBold']) await figma.loadFontAsync({ family, style });
const mono = 'JetBrains Mono';
await figma.loadFontAsync({ family: mono, style: 'Regular' });

const paint = name =>
  figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    byName.get(name)
  );
function text(chars, size, o = {}) {
  const t = figma.createText();
  t.fontName = { family: o.mono ? mono : family, style: o.style || 'Regular' };
  t.characters = chars;
  t.fontSize = size;
  t.fills = [paint(o.color || 'color/foreground/default')];
  if (o.width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(o.width, t.height);
  }
  return t;
}
function box(name, dir, gap, pad = 0) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = dir;
  f.itemSpacing = gap;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = pad;
  f.fills = [];
  return f;
}
function sample(name) {
  const r = figma.createRectangle();
  r.name = name;
  r.resize(80, 80);
  r.fills = [paint('color/background/raised')];
  r.strokes = [paint('color/border/default')];
  return r;
}
const valueOf = v => {
  let val = v.valuesByMode[MODES.Light];
  while (val && val.type === 'VARIABLE_ALIAS') {
    const t = vars.find(x => x.id === val.id);
    val = Object.values(t.valuesByMode)[0];
  }
  return val;
};
async function replaceList(pageName, build) {
  const page = figma.root.children.find(p => p.name === pageName);
  const frame = page.children.find(n => n.type === 'FRAME');
  for (const n of frame.children.filter(n => n.type === 'FRAME' && n.name !== 'Header'))
    n.remove();
  const list = box('List', 'VERTICAL', 32);
  list.setSharedPluginData('clickui', 'generated', 'foundation-list');
  frame.appendChild(list);
  list.x = LIST_X;
  list.y = LIST_Y;
  await build(list);
  frame.resize(
    Math.max(frame.width, list.x + list.width + 64),
    list.y + list.height + 96
  );
  return list.children.length;
}
function details(parent, lines) {
  const d = box('Details', 'VERTICAL', 4);
  lines.forEach(([chars, o]) => d.appendChild(text(chars, o.size || 15, o)));
  parent.appendChild(d);
}

const radii = await replaceList('Radii', list => {
  const tokens = vars
    .filter(v => v.variableCollectionId === sem.id && v.name.startsWith('radius/'))
    .sort((a, b) => valueOf(a) - valueOf(b));
  for (const v of tokens) {
    const px = valueOf(v);
    const row = box(v.name, 'HORIZONTAL', 24);
    row.counterAxisAlignItems = 'CENTER';
    const r = sample('Sample');
    r.fills = [paint('color/background/muted')];
    for (const k of [
      'topLeftRadius',
      'topRightRadius',
      'bottomLeftRadius',
      'bottomRightRadius',
    ])
      r.setBoundVariable(k, v);
    row.appendChild(r);
    details(row, [
      [v.name, { size: 16, mono: true }],
      [
        v.name === 'radius/full' ? `${px}px` : `${px}px / ${px / 16}rem`,
        { color: 'color/foreground/subtle' },
      ],
      ...(RADIUS_USAGE[v.name]
        ? [[RADIUS_USAGE[v.name], { color: 'color/foreground/subtle' }]]
        : []),
    ]);
    list.appendChild(row);
  }
});

const styles = new Map((await figma.getLocalEffectStylesAsync()).map(s => [s.name, s]));
const missing = [];
const shadows = await replaceList('Shadow', async list => {
  for (const [name, repo, css, usage] of SHADOWS) {
    const style = styles.get(name);
    if (!style) {
      missing.push(name);
      continue;
    }
    const row = box(name, 'HORIZONTAL', 32);
    row.counterAxisAlignItems = 'CENTER';
    for (const mode of ['Light', 'Dark']) {
      const plate = box(mode, 'VERTICAL', 12, 24);
      plate.counterAxisAlignItems = 'CENTER';
      plate.cornerRadius = 12;
      plate.fills = [paint('color/background/base')];
      plate.strokes = [paint('color/border/default')];
      plate.setExplicitVariableModeForCollection(sem, MODES[mode]);
      const r = sample('Sample');
      r.cornerRadius = 8;
      await r.setEffectStyleIdAsync(style.id);
      plate.appendChild(r);
      plate.appendChild(text(mode, 12, { color: 'color/foreground/subtle' }));
      row.appendChild(plate);
    }
    details(row, [
      [name, { size: 16, mono: true }],
      [
        `${repo}: ${css}`,
        { size: 13, mono: true, color: 'color/foreground/subtle', width: 560 },
      ],
      [usage, { color: 'color/foreground/subtle' }],
    ]);
    list.appendChild(row);
  }
});
return { radii, shadows, missing };
