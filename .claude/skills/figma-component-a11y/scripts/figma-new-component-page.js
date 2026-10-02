// Paste into figma_execute (figma-console MCP) with the Click UI v2 file active. Edit CONFIG first.
// Sets up a component page: a page named NAME (created if missing), and a light frame with the local
// Doc Header and a "Components" area where the component set goes. A component set already on the
// page with the same name is moved into the frame. Then build the variants, and run
// figma-dark-preview.js and figma-a11y-audit.js on the frame.

// ---- CONFIG ----
const NAME = ''; // e.g. 'Combobox'. Use the repo component name (src/components/<Name>).
const DESCRIPTION = ''; // one sentence, e.g. 'Defines the visual options for comboboxes'
const HEADER_COMPONENT = '_Design System / Doc Header';
const WIDTH = 1440;
// ---- END CONFIG ----

if (!NAME) return 'Set NAME first';
await figma.loadAllPagesAsync();
let page = figma.root.children.find(p => p.name === NAME);
if (!page) {
  page = figma.createPage();
  page.name = NAME;
}
await figma.setCurrentPageAsync(page);
if (
  page.children.some(
    n => n.type === 'FRAME' && n.name.replace(/ \(light\)$/, '') === NAME
  )
)
  return `Page "${NAME}" already has a "${NAME}" frame; edit it instead`;

const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const byName = new Map(
  (await figma.variables.getLocalVariablesAsync('COLOR')).map(v => [v.name, v])
);
const paint = name => [
  figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    byName.get(name)
  ),
];

const frame = figma.createFrame();
frame.name = NAME;
frame.fills = paint('color/background/base');
frame.setExplicitVariableModeForCollection(
  sem,
  sem.modes.find(m => m.name === 'Light').modeId
);
page.appendChild(frame);
frame.x = 0;
frame.y = 0;

const main = figma.root
  .findAllWithCriteria({ types: ['COMPONENT'] })
  .find(n => n.name === HEADER_COMPONENT);
const header = main.createInstance();
header.name = 'Header';
frame.appendChild(header);
header.resize(WIDTH, header.height);
for (const t of header.findAll(n => n.type === 'TEXT')) {
  await Promise.all(
    t.getRangeAllFontNames(0, t.characters.length).map(f => figma.loadFontAsync(f))
  );
  if (t.name.includes('->')) t.characters = `Design components -> ${NAME}`;
  else if (t.name === 'Brand Colours') t.characters = NAME;
  else t.characters = DESCRIPTION || `Defines the visual options for ${NAME}`;
}

const top = header.height + 48;
const existing = page.children.find(n => n.type === 'COMPONENT_SET' && n.name === NAME);
let placed;
if (existing) {
  frame.appendChild(existing);
  placed = existing;
} else {
  await figma.loadFontAsync({ family: 'Basier Square', style: 'Regular' });
  const area = figma.createFrame();
  area.name = 'Components';
  area.layoutMode = 'VERTICAL';
  area.primaryAxisSizingMode = area.counterAxisSizingMode = 'AUTO';
  area.paddingTop = area.paddingBottom = area.paddingLeft = area.paddingRight = 24;
  area.cornerRadius = 8;
  area.fills = [];
  area.strokes = paint('color/border/default');
  area.dashPattern = [6, 6];
  const hint = figma.createText();
  hint.fontName = { family: 'Basier Square', style: 'Regular' };
  hint.characters = `Build the ${NAME} component set here, then delete this frame. Name variant properties after the repo props, and include Default, Hover, Active, Focus and Disabled states.`;
  hint.fontSize = 14;
  hint.fills = paint('color/foreground/subtle');
  hint.textAutoResize = 'HEIGHT';
  hint.resize(640, hint.height);
  area.appendChild(hint);
  frame.appendChild(area);
  placed = area;
}
placed.x = 48;
placed.y = top;
frame.resize(
  Math.max(WIDTH, placed.x + placed.width + 48),
  placed.y + placed.height + 120
);
figma.viewport.scrollAndZoomIntoView([frame]);
return { page: page.id, frame: frame.id, movedExistingSet: Boolean(existing) };
