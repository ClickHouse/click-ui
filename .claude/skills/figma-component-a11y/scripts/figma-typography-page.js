// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active.
// Draws the Typography page from the local product text styles: one group per style family, one
// row per style with a live sample, its font, size token and line height, and the repo CSS variable
// it matches. The frame is replaced on every run; run again after adding or changing a text style.

// ---- CONFIG ----
// [style prefix, group title, description, repo variable prefix]
const GROUPS = [
  ['Title', 'Title', 'Headings inside components and pages.', 'product-titles'],
  ['Body', 'Body', 'Regular (400) running text.', 'product-text-normal'],
  [
    'Body-medium',
    'Body medium',
    'Medium (500) labels and menu items.',
    'product-text-medium',
  ],
  [
    'Body-strong',
    'Body strong',
    'Semi bold (600) emphasis and table headers.',
    'product-text-semibold',
  ],
  ['Body-bold', 'Body bold', 'Bold (700) emphasis.', 'product-text-bold'],
  ['Field', 'Field', 'Text typed into inputs, selects and text areas.', 'field'],
  [
    'Code',
    'Code',
    'Monospace for code blocks, grid cells and values.',
    'product-text-mono',
  ],
];
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const SAMPLE = 'The fastest analytical database';
const HEADER = {
  breadcrumb: 'Foundations -> Typography',
  title: 'Typography',
  description:
    'The product text styles. Each one binds its font size to a font/size-* token and matches a --typography-styles-* variable in the repo.',
};
const HEADER_COMPONENT = '_Design System / Doc Header';
// ---- END CONFIG ----

await figma.loadAllPagesAsync();
const page = figma.root.children.find(p => p.name === 'Typography');
const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const vars = await figma.variables.getLocalVariablesAsync();
const byName = new Map(vars.map(v => [v.name, v]));
const byId = new Map(vars.map(v => [v.id, v]));
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

const styles = await figma.getLocalTextStylesAsync();
const rank = s => SIZES.indexOf(s.name.split('/')[1]);
const lineHeight = lh =>
  lh.unit === 'PERCENT' ? `${Math.round(lh.value)}%` : `${lh.value}px`;

for (const n of page.children.filter(
  n => n.getSharedPluginData('clickui', 'generated') === 'typography'
))
  n.remove();
const root = box('Typography', 'VERTICAL', 0);
root.setSharedPluginData('clickui', 'generated', 'typography');
root.resize(1440, root.height);
root.counterAxisSizingMode = 'FIXED';
root.fills = [paint('color/background/base')];
root.setExplicitVariableModeForCollection(
  sem,
  sem.modes.find(m => m.name === 'Light').modeId
);
page.insertChild(0, root);
root.x = 0;
root.y = 0;

const headerMain = figma.root
  .findAllWithCriteria({ types: ['COMPONENT'] })
  .find(n => n.name === HEADER_COMPONENT);
const header = headerMain.createInstance();
root.appendChild(header);
header.layoutSizingHorizontal = 'FILL';
header.name = 'Header';
for (const t of header.findAll(n => n.type === 'TEXT')) {
  await Promise.all(
    t.getRangeAllFontNames(0, t.characters.length).map(f => figma.loadFontAsync(f))
  );
  if (t.name.includes('->')) t.characters = HEADER.breadcrumb;
  else if (t.name === 'Brand Colours') t.characters = HEADER.title;
  else t.characters = HEADER.description;
}

const content = box('Content', 'VERTICAL', 80, 64);
content.paddingBottom = 120;
root.appendChild(content);
content.layoutSizingHorizontal = 'FILL';

const listed = new Set();
for (const [prefix, title, description, repo] of GROUPS) {
  const members = styles
    .filter(s => s.name.split('/')[0] === prefix)
    .sort((a, b) => rank(a) - rank(b));
  if (!members.length) continue;
  const group = box(prefix, 'VERTICAL', 0);
  content.appendChild(group);
  group.layoutSizingHorizontal = 'FILL';
  const intro = box('Intro', 'VERTICAL', 8);
  intro.paddingBottom = 16;
  intro.appendChild(
    text(title, 32, { style: 'SemiBold', color: 'color/foreground/strong' })
  );
  intro.appendChild(text(description, 18, { color: 'color/foreground/subtle' }));
  group.appendChild(intro);
  for (const s of members) {
    listed.add(s.name);
    await figma.loadFontAsync(s.fontName);
    const row = box(s.name, 'HORIZONTAL', 48);
    row.paddingTop = row.paddingBottom = 20;
    row.counterAxisAlignItems = 'CENTER';
    row.strokes = [paint('color/border/default')];
    row.strokeTopWeight = row.strokeLeftWeight = row.strokeRightWeight = 0;
    row.strokeBottomWeight = 1;
    group.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';

    const sample = figma.createText();
    sample.name = 'Sample';
    await sample.setTextStyleIdAsync(s.id);
    sample.characters = SAMPLE;
    sample.fills = [paint('color/foreground/default')];
    sample.textAutoResize = 'HEIGHT';
    sample.resize(760, sample.height);
    row.appendChild(sample);

    const size = s.boundVariables && s.boundVariables.fontSize;
    const token = size ? byId.get(size.id).name : 'not bound';
    const d = box('Details', 'VERTICAL', 4);
    d.appendChild(text(s.name, 16, { mono: true }));
    d.appendChild(
      text(
        `${s.fontName.family} ${s.fontName.style} · ${s.fontSize}px / ${lineHeight(s.lineHeight)} · ${token}`,
        14,
        { color: 'color/foreground/subtle' }
      )
    );
    d.appendChild(
      text(`--typography-styles-${repo}-${s.name.split('/')[1]}`, 13, {
        mono: true,
        color: 'color/foreground/subtle',
      })
    );
    row.appendChild(d);
  }
}
return {
  frame: root.id,
  listed: listed.size,
  notListed: styles.map(s => s.name).filter(n => !listed.has(n)),
};
