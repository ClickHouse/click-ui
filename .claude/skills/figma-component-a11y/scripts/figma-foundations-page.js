// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active, or pass it to
// figma_execute_across_files with the v2 file key.
// Draws the overview on the Foundations page: what each variable collection holds and a card per
// foundation page with a link to it. Anything else on the page that is not the overview or the
// archive is moved into the archive section, keeping its layout. Run again to refresh the counts.

// ---- CONFIG ----
const PAGE = 'Foundations';
const ARCHIVE = 'Archive (before v2 migration)';
// Any "_Design System / Doc Header" instance in the file; cloned for the overview.
const HEADER_SOURCE_ID = '60:42576';
const LINKS = [
  [
    'Color',
    'Palettes, every Semantic color token in Light and Dark, and which pairs pass contrast.',
  ],
  ['Typography', 'Type styles and the font primitives behind them.'],
  ['Spacers', 'The spacing scale: space primitives and Semantic space tokens.'],
  ['Radii', 'Corner radius tokens.'],
  ['Shadow', 'Shadow styles and the shadow color token.'],
  ['Icons', 'The icon set and icon sizes.'],
  [
    'Start here',
    'How to design components in this file, and how the accessibility check works.',
  ],
];
// ---- END CONFIG ----

await figma.loadAllPagesAsync();
const page = figma.root.children.find(p => p.name === PAGE);
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const sem = cols.find(c => c.name === 'Semantic');
const vars = await figma.variables.getLocalVariablesAsync();
const byName = new Map(vars.map(v => [v.name, v]));
const family = 'Basier Square';
for (const style of ['Regular', 'SemiBold']) await figma.loadFontAsync({ family, style });

const paint = name =>
  figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    byName.get(name)
  );
function text(chars, size, style, color, width) {
  const t = figma.createText();
  t.fontName = { family, style };
  t.characters = chars;
  t.fontSize = size;
  t.fills = [paint(color)];
  if (width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(width, t.height);
  }
  return t;
}
function box(name, dir, gap, pad) {
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
function card(title, width) {
  const c = box(title, 'VERTICAL', 12, 24);
  c.resize(width, c.height);
  c.counterAxisSizingMode = 'FIXED';
  c.cornerRadius = 12;
  c.fills = [paint('color/background/subtle')];
  c.strokes = [paint('color/border/default')];
  c.strokeAlign = 'INSIDE';
  c.appendChild(text(title, 20, 'SemiBold', 'color/foreground/default'));
  return c;
}
function grid(name) {
  const g = box(name, 'HORIZONTAL', 24, 0);
  g.layoutWrap = 'WRAP';
  g.counterAxisSpacing = 24;
  return g;
}

let overview = page.children.find(
  n => n.getSharedPluginData('clickui', 'generated') === 'foundations'
);
let archive = page.children.find(n => n.type === 'SECTION' && n.name === ARCHIVE);
const loose = page.children.filter(n => n !== overview && n !== archive);
if (loose.length) {
  const x0 = Math.min(...loose.map(n => n.x));
  const y0 = Math.min(...loose.map(n => n.y));
  if (!archive) {
    archive = figma.createSection();
    archive.name = ARCHIVE;
    page.appendChild(archive);
  }
  const offset = archive.children.length
    ? Math.max(...archive.children.map(n => n.y + n.height)) + 200
    : 120;
  for (const n of loose) {
    const [x, y] = [n.x - x0 + 120, n.y - y0 + offset];
    archive.appendChild(n);
    n.x = x;
    n.y = y;
  }
  const w = Math.max(...archive.children.map(n => n.x + n.width)) + 120;
  const h = Math.max(...archive.children.map(n => n.y + n.height)) + 120;
  archive.resizeWithoutConstraints(w, h);
}

if (overview) overview.remove();
overview = box('Foundations', 'VERTICAL', 0, 0);
overview.setSharedPluginData('clickui', 'generated', 'foundations');
overview.resize(1440, overview.height);
overview.counterAxisSizingMode = 'FIXED';
overview.fills = [paint('color/background/base')];
overview.setExplicitVariableModeForCollection(
  sem,
  sem.modes.find(m => m.name === 'Light').modeId
);
page.insertChild(0, overview);
overview.x = 0;
overview.y = 0;
const header = (await figma.getNodeByIdAsync(HEADER_SOURCE_ID)).clone();
overview.appendChild(header);
header.layoutSizingHorizontal = 'FILL';
header.name = 'Header';
for (const t of header.findAll(n => n.type === 'TEXT')) {
  await Promise.all(
    t.getRangeAllFontNames(0, t.characters.length).map(f => figma.loadFontAsync(f))
  );
  if (t.fontSize === 48) t.characters = 'Foundations';
  else if (t.fontSize === 24)
    t.characters =
      'The building blocks every component uses: color, type, space, radius, shadow and icons.';
  else if (t.fontSize === 18) t.characters = 'Foundations';
}
const content = box('Content', 'VERTICAL', 80, 80);
content.paddingTop = 64;
content.paddingBottom = 120;
overview.appendChild(content);
content.layoutSizingHorizontal = 'FILL';

const tokens = box('Token collections', 'VERTICAL', 24, 0);
content.appendChild(tokens);
tokens.appendChild(text('Token collections', 32, 'SemiBold', 'color/foreground/strong'));
tokens.appendChild(
  text(
    'Foundations are variables in two collections. Components bind Semantic tokens; Primitives only define what the Semantic tokens point at.',
    18,
    'Regular',
    'color/foreground/subtle',
    960
  )
);
const collections = grid('Collections');
tokens.appendChild(collections);
for (const [name, desc] of [
  [
    'Primitives',
    'Raw values with one mode: color ramps, font families and sizes, space steps, motion and z-index.',
  ],
  [
    'Semantic',
    'Values named by purpose, with a Light and a Dark mode: color, space, radius and sizing.',
  ],
]) {
  const c = cols.find(x => x.name === name);
  const own = vars.filter(v => v.variableCollectionId === c.id);
  const counts = ['COLOR', 'FLOAT', 'STRING']
    .map(t => [t, own.filter(v => v.resolvedType === t).length])
    .filter(([, n]) => n)
    .map(([t, n]) => `${n} ${{ COLOR: 'color', FLOAT: 'number', STRING: 'text' }[t]}`)
    .join(', ');
  const k = card(name, 616);
  k.appendChild(text(desc, 15, 'Regular', 'color/foreground/subtle', 568));
  k.appendChild(
    text(
      `${own.length} variables (${counts}). Modes: ${c.modes.map(m => m.name).join(', ')}.`,
      15,
      'Regular',
      'color/foreground/default',
      568
    )
  );
  collections.appendChild(k);
}

const pages = box('Pages', 'VERTICAL', 24, 0);
content.appendChild(pages);
pages.appendChild(text('Pages', 32, 'SemiBold', 'color/foreground/strong'));
const cards = grid('Cards');
cards.resize(1280, cards.height);
cards.primaryAxisSizingMode = 'FIXED';
pages.appendChild(cards);
const missing = [];
for (const [name, desc] of LINKS) {
  const target = figma.root.children.find(p => p.name === name);
  if (!target) {
    missing.push(name);
    continue;
  }
  const k = card(name, 410);
  k.appendChild(text(desc, 15, 'Regular', 'color/foreground/subtle', 362));
  const link = text(
    'Open page',
    15,
    'SemiBold',
    'color/foreground/interactive/accent/default'
  );
  link.hyperlink = { type: 'NODE', value: target.id };
  k.appendChild(link);
  cards.appendChild(k);
}
if (archive) {
  archive.x = 0;
  archive.y = overview.height + 400;
}
return {
  overview: overview.id,
  archive: archive && archive.id,
  archived: loose.map(n => n.name),
  missing,
};
