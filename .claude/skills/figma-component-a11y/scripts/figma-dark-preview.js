// Paste into figma_execute (figma-console MCP). Edit the CONFIG block first.
// Creates "<name> (dark)" to the right of a light page frame: a copy with the Semantic collection set to
// Dark, where every component set is replaced by a frame of instances (so no duplicate components are
// created). Re-running replaces an existing "<name> (dark)" frame on the same page.

// ---- CONFIG ----
const LIGHT_FRAME_ID = ''; // e.g. '45:11717'
const GAP = 80;
// ---- END CONFIG ----

const sem = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  c => c.name === 'Semantic'
);
const darkMode = sem.modes.find(m => m.name === 'Dark').modeId;
const light = await figma.getNodeByIdAsync(LIGHT_FRAME_ID);
const baseName = light.name.replace(/ \((light|dark)\)$/, '');
light.name = baseName;

const previous = light.parent.children.find(
  n => n !== light && n.name === `${baseName} (dark)`
);
const position = previous
  ? { x: previous.x, y: previous.y }
  : { x: light.x + light.width + GAP, y: light.y };
if (previous) previous.remove();

const dark = light.clone();
light.parent.appendChild(dark);
dark.name = `${baseName} (dark)`;
dark.x = position.x;
dark.y = position.y;
dark.findChild(n => n.name === 'A11y')?.remove();

// The clone has the same tree as the light frame, so walk both together. Component sets and
// components anywhere in the tree become instances of the light originals.
function place(parent, index, node, like) {
  parent.insertChild(index, node);
  node.x = like.x;
  node.y = like.y;
}
function swap(source, cloned) {
  const parent = cloned.parent;
  const index = parent.children.indexOf(cloned);
  if (source.type === 'COMPONENT_SET') {
    const holder = figma.createFrame();
    holder.name = cloned.name;
    holder.fills = [];
    holder.clipsContent = false;
    holder.setSharedPluginData('clickui', 'holder', '1');
    holder.resize(cloned.width, cloned.height);
    place(parent, index, holder, cloned);
    for (const comp of source.children) {
      const inst = comp.createInstance();
      holder.appendChild(inst);
      inst.x = comp.x;
      inst.y = comp.y;
    }
  } else {
    const inst = source.createInstance();
    inst.setSharedPluginData('clickui', 'holder', '1');
    place(parent, index, inst, cloned);
  }
  cloned.remove();
}
function walk(source, cloned) {
  if (source.type === 'COMPONENT_SET' || source.type === 'COMPONENT')
    return swap(source, cloned);
  if (!('children' in source) || source.type === 'INSTANCE') return;
  const pairs = source.children.map((s, i) => [s, cloned.children[i]]);
  for (const [s, c] of pairs) if (c) walk(s, c);
}
const lightChildren = light.children.filter(n => n.name !== 'A11y');
dark.children.forEach((c, i) => walk(lightChildren[i], c));
dark.setExplicitVariableModeForCollection(sem, darkMode);

async function retitle(frame, suffix) {
  const header = frame.findChild(n => n.name === 'Header') || frame;
  const texts = header.findAll(n => n.type === 'TEXT' && typeof n.fontSize === 'number');
  if (!texts.length) return 'no title found';
  const title = texts.reduce((a, b) => (b.fontSize > a.fontSize ? b : a));
  await figma.loadFontAsync(title.fontName);
  title.characters = `${title.characters.replace(/ \((light|dark)\)$/, '')} (${suffix})`;
  return title.characters;
}
return {
  light: light.id,
  dark: dark.id,
  titles: [await retitle(light, 'light'), await retitle(dark, 'dark')],
};
