// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active.
// Draws the "Start here" page: what the file is, the token rules, light and dark mode, how to read an
// Accessibility block, what to ask the agent, and how changes reach the repo. The page is placed
// first (after the cover when the cover is first) and its frame is replaced on every run. Keep the text in step with docs/figma.md.
// The hero is a scaled copy of the cover thumbnail, so rerun this after changing the thumbnail.

// ---- CONFIG ----
const PAGE = 'Start here';
const OLD_NAMES = ['v2 migration'];
const REPO_DOC = 'https://github.com/ClickHouse/click-ui/blob/main/docs/figma.md';
const HERO = { page: 'Cover', frame: 'Thumbnail · Isometric layers (wireframe)' };
const WIDTH = 1440;
const PAD = 80;
const COLUMNS = 3;
const GAP = 24;
const SECTIONS = [
  [
    'What this file is',
    [
      'Click UI v2 is the design source for the components in the click-ui repo. Every component page has a light frame, a dark preview next to it, and an Accessibility block under both.',
      'Design with an agent (Cursor or Claude Code) that follows the figma-component-a11y skill in the repo. Setup: docs/figma.md.',
    ],
  ],
  [
    'Do and don’t',
    [
      'Do bind colors to Semantic tokens (color/*). Don’t use raw hex or palette colors.',
      'Do use the local text styles (Title, Body, Body-medium, Body-strong, Body-bold, Field, Code) and the Shadow/* styles.',
      'Do use radius/*, space/* and sizing/* tokens for corners, spacing and icon sizes.',
      'Do name components, properties and variants after the repo props.',
      'Do give interactive components Default, Hover, Active, Focus and Disabled states. Focus must look different from Default.',
      'Don’t use components, styles or variables from another library.',
    ],
  ],
  [
    'Light and dark',
    [
      'Semantic tokens have a Light and a Dark mode. Set the mode on a frame (Layer panel, Appearance) to preview it.',
      'Each component page shows “<Name> (dark)” next to the light frame, built from instances. Ask the agent to rebuild it after changing the components.',
    ],
  ],
  [
    'Reading the Accessibility block',
    [
      'Passes or Fails WCAG AA, for that frame’s mode.',
      'Contrast: text 4.5:1 (3:1 when large), icons, control borders and focus indicators 3:1.',
      'Focus: interactive components need a Focus variant that differs from Default.',
      'Target size: under 24x24 is listed for review; fine with 24px of spacing.',
      'Check by hand: state not shown by color alone, names for icon-only controls, keyboard behavior.',
      'Repo today: the same states with the repo tokens. Fixed in Figma means the design is ahead of the code.',
    ],
  ],
  [
    'Ask the agent',
    [
      '“Check a11y on the Tooltip page”',
      '“Create a new Combobox page”',
      '“Add a dark preview for Card”',
      '“How does the Badge in Figma compare with the repo?”',
      '“I added a token, update the Color page and export DTCG”',
      'It asks before adding or changing a token or a text style, and before committing.',
    ],
  ],
  [
    'How changes reach the repo',
    [
      'Figma changes don’t update the repo by themselves. Open a component RFC or a PR with the Figma link, and check that the page’s Accessibility block passes in Light and Dark.',
      'Token sync from Figma to the repo is not automated yet.',
    ],
  ],
];
// ---- END CONFIG ----

await figma.loadAllPagesAsync();
let page = figma.root.children.find(p => p.name === PAGE || OLD_NAMES.includes(p.name));
if (!page) page = figma.createPage();
page.name = PAGE;
figma.root.insertChild(figma.root.children[0].name === HERO.page ? 1 : 0, page);
for (const n of [...page.children]) n.remove();

const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const byName = new Map(
  (await figma.variables.getLocalVariablesAsync()).map(v => [v.name, v])
);
const family = 'Basier Square';
for (const style of ['Regular', 'SemiBold']) await figma.loadFontAsync({ family, style });
const paint = name => [
  figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    byName.get(name)
  ),
];
function text(chars, size, style, color, width) {
  const t = figma.createText();
  t.fontName = { family, style };
  t.characters = chars;
  t.fontSize = size;
  t.lineHeight = { unit: 'PERCENT', value: 150 };
  t.fills = paint(color);
  if (width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(width, t.height);
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

const root = box(PAGE, 'VERTICAL', 0);
root.setSharedPluginData('clickui', 'generated', 'start-here');
root.resize(WIDTH, root.height);
root.counterAxisSizingMode = 'FIXED';
root.fills = paint('color/background/base');
root.setExplicitVariableModeForCollection(
  sem,
  sem.modes.find(m => m.name === 'Dark').modeId
);
page.appendChild(root);

const thumb = figma.root.children
  .find(p => p.name === HERO.page)
  .findOne(n => n.type === 'FRAME' && n.name === HERO.frame);
if (thumb) {
  const hero = thumb.clone();
  hero.rescale(WIDTH / hero.width);
  hero.name = 'Hero';
  root.appendChild(hero);
}

const content = box('Content', 'VERTICAL', 64, PAD);
content.paddingBottom = 120;
root.appendChild(content);
content.layoutSizingHorizontal = 'FILL';

const inner = WIDTH - 2 * PAD;
const intro = box('Intro', 'VERTICAL', 16);
const eyebrow = text(
  'START HERE',
  14,
  'SemiBold',
  'color/foreground/interactive/accent/default'
);
eyebrow.letterSpacing = { unit: 'PERCENT', value: 12 };
const headline = text(
  'Design Click UI components with accessibility built in',
  48,
  'SemiBold',
  'color/foreground/strong',
  inner * 0.7
);
headline.lineHeight = { unit: 'PERCENT', value: 115 };
intro.appendChild(eyebrow);
intro.appendChild(headline);
intro.appendChild(
  text(
    'Every component page has a light frame, a dark preview and an Accessibility block. Here is how to work in this file, and how the agent helps.',
    20,
    'Regular',
    'color/foreground/default',
    inner * 0.6
  )
);
content.appendChild(intro);

const grid = box('Sections', 'HORIZONTAL', GAP);
grid.layoutWrap = 'WRAP';
grid.counterAxisSpacing = GAP;
content.appendChild(grid);
grid.layoutSizingHorizontal = 'FILL';
const cardWidth = Math.floor((inner - GAP * (COLUMNS - 1)) / COLUMNS);
const radius = byName.get('radius/lg') || byName.get('radius/md');
const cards = SECTIONS.map(([title, lines], i) => {
  const card = box(title, 'VERTICAL', 12, 32);
  card.fills = paint('color/background/raised');
  card.strokes = paint('color/border/default');
  card.strokeWeight = 1;
  if (radius)
    for (const k of [
      'topLeftRadius',
      'topRightRadius',
      'bottomLeftRadius',
      'bottomRightRadius',
    ])
      card.setBoundVariable(k, radius);
  const body = cardWidth - 64;
  card.appendChild(
    text(
      String(i + 1).padStart(2, '0'),
      16,
      'SemiBold',
      'color/foreground/interactive/accent/default'
    )
  );
  card.appendChild(text(title, 24, 'SemiBold', 'color/foreground/strong', body));
  for (const line of lines)
    card.appendChild(text(line, 15, 'Regular', 'color/foreground/default', body));
  grid.appendChild(card);
  card.resize(cardWidth, card.height);
  card.counterAxisSizingMode = 'FIXED';
  return card;
});
for (let r = 0; r < cards.length; r += COLUMNS) {
  const row = cards.slice(r, r + COLUMNS);
  const h = Math.max(...row.map(c => c.height));
  for (const c of row) {
    c.primaryAxisSizingMode = 'FIXED';
    c.resize(c.width, h);
  }
}

const link = text(
  'Full setup and details in docs/figma.md  →',
  18,
  'SemiBold',
  'color/foreground/interactive/accent/default'
);
link.hyperlink = { type: 'URL', value: REPO_DOC };
content.appendChild(link);
return {
  page: page.id,
  frame: root.id,
  index: figma.root.children.indexOf(page),
  hero: !!thumb,
};
