// Usage: node repo-contrast.mjs [repo path] [--failures]
// Prints JSON of repo contrast pairs per component state. With --failures, only failing pairs,
// in the shape figma-a11y-audit.js expects for REPO_FAILURES.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const onlyFailures = args.includes('--failures');
const repo = args.find(a => !a.startsWith('--')) ?? process.cwd();

function loadVars(file) {
  const vars = new Map();
  for (const m of readFileSync(file, 'utf8').matchAll(/--([\w-]+):\s*([^;]+);/g))
    vars.set(m[1], m[2].trim());
  return vars;
}

function lchToRgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h),
    b = C * Math.sin(h);
  const fy = (L + 16) / 116,
    fx = fy + a / 500,
    fz = fy - b / 200;
  const e = 216 / 24389,
    k = 24389 / 27;
  const inv = f => (f ** 3 > e ? f ** 3 : (116 * f - 16) / k);
  const X50 = inv(fx) * 0.96422,
    Y50 = L > k * e ? fy ** 3 : L / k,
    Z50 = inv(fz) * 0.82521;
  const X =
    0.9554734527042182 * X50 - 0.023098536874261423 * Y50 + 0.0632593086610217 * Z50;
  const Y =
    -0.028369706963208136 * X50 + 1.0099954580058226 * Y50 + 0.021041398966943008 * Z50;
  const Z =
    0.012314001688319899 * X50 - 0.020507696433477912 * Y50 + 1.3303659366080753 * Z50;
  const lin = [
    3.2409699419045226 * X - 1.537383177570094 * Y - 0.4986107602930034 * Z,
    -0.9692436362808796 * X + 1.8759675015077202 * Y + 0.04155505740717559 * Z,
    0.05563007969699366 * X - 0.20397695888897652 * Y + 1.0569715142428786 * Z,
  ];
  return lin.map(v => {
    const c = Math.min(1, Math.max(0, v));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  });
}

function parseColor(raw, vars) {
  let v = raw.trim();
  for (let i = 0; i < 8 && v.startsWith('var('); i++)
    v = vars.get(v.slice(6, -1).trim()) ?? v;
  let m;
  if ((m = /^#([0-9a-f]{3,8})$/i.exec(v))) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map(c => c + c).join('');
    const n = [0, 2, 4, 6].map(i => parseInt(h.slice(i, i + 2) || 'ff', 16) / 255);
    return { rgb: n.slice(0, 3), a: n[3] };
  }
  if ((m = /^rgba?\(([^)]+)\)$/.exec(v))) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    const ch = parts
      .slice(0, 3)
      .map(p => (p.endsWith('%') ? parseFloat(p) / 100 : parseFloat(p) / 255));
    const a =
      parts[3] === undefined
        ? 1
        : parts[3].endsWith('%')
          ? parseFloat(parts[3]) / 100
          : parseFloat(parts[3]);
    return { rgb: ch, a };
  }
  if ((m = /^lch\(([^)]+)\)$/.exec(v))) {
    const parts = m[1]
      .split(/[\s/]+/)
      .filter(Boolean)
      .map(p => (p === 'none' ? 0 : parseFloat(p)));
    return { rgb: lchToRgb(parts[0], parts[1], parts[2]), a: parts[3] ?? 1 };
  }
  return null;
}

const blend = (top, bottom) => top.rgb.map((c, i) => c * top.a + bottom[i] * (1 - top.a));
const lum = c => {
  const f = x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
};
const ratio = (x, y) => {
  const [h, l] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (h + 0.05) / (l + 0.05);
};
const hex = c =>
  '#' +
  c
    .map(x =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('');

// One add() per component state. `set` is the Figma component set name, `variantRe` matches its
// variant names (null when Figma has no equivalent variant), and fg/bg are repo CSS variables.
const STATES = ['default', 'hover', 'active'];
const cap = s => s[0].toUpperCase() + s.slice(1);
const pairs = [];
const add = (page, set, variantRe, label, fg, bg, kind = 'text') =>
  pairs.push({ page, set, variantRe, label, fg, bg, kind });

for (const s of STATES)
  add(
    'Avatar',
    'Avatar',
    `State=${cap(s)}`,
    `Avatar ${s}`,
    `click-avatar-color-text-${s}`,
    `click-avatar-color-background-${s}`
  );
for (const s of ['success', 'neutral', 'danger', 'warning', 'info']) {
  add(
    'Alert',
    'An alert example',
    `State=${cap(s)}`,
    `Alert ${s} text`,
    `click-alert-color-text-${s}`,
    `click-alert-color-background-${s}`
  );
  add(
    'Alert',
    'An alert example',
    `State=${cap(s)}`,
    `Alert ${s} icon`,
    `click-alert-color-iconForeground-${s}`,
    `click-alert-color-background-${s}`,
    'icon'
  );
  add(
    'Badge',
    'Badge',
    `State=${cap(s)}`,
    `Badge ${s}`,
    `click-badge-opaque-color-text-${s}`,
    `click-badge-opaque-color-background-${s}`
  );
}
add(
  'Badge',
  'Badge',
  'State=Default',
  'Badge default',
  'click-badge-opaque-color-text-default',
  'click-badge-opaque-color-background-default'
);
for (const [type, figmaType] of [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['danger', 'Danger'],
  ['empty', 'Link'],
])
  for (const s of STATES)
    add(
      'Button',
      'Button',
      `Type=${figmaType}, State=${cap(s)}`,
      `Button ${type} ${s}`,
      `click-button-basic-color-${type}-text-${s}`,
      `click-button-basic-color-${type}-background-${s}`
    );
for (const [type, figmaType] of [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['ghost', 'Ghost'],
  ['danger', null],
  ['info', null],
])
  for (const s of STATES)
    add(
      'Button',
      'Icon Button',
      figmaType ? `State=${cap(s)}, Type=${figmaType}` : null,
      `Icon button ${type} ${s}`,
      `click-button-iconButton-color-${type}-text-${s}`,
      `click-button-iconButton-color-${type}-background-${s}`,
      'icon'
    );
for (const s of STATES)
  add(
    'Button',
    'Button Group Item',
    `State=${cap(s)},`,
    `Button group item ${s}`,
    `click-button-group-color-text-${s}`,
    `click-button-group-color-background-${s}`
  );
for (const c of ['default', 'muted']) {
  const variant = `Color=${cap(c)}, Error=`;
  add(
    'BigStat',
    'Big Stat',
    `${variant}False`,
    `Big stat ${c} title`,
    `click-bigStat-color-title-${c}`,
    `click-bigStat-color-background-${c}`
  );
  add(
    'BigStat',
    'Big Stat',
    `${variant}False`,
    `Big stat ${c} label`,
    `click-bigStat-color-label-${c}`,
    `click-bigStat-color-background-${c}`
  );
  add(
    'BigStat',
    'Big Stat',
    `${variant}True`,
    `Big stat ${c} error label`,
    'click-bigStat-color-label-danger',
    `click-bigStat-color-background-${c}`
  );
}
for (const s of STATES)
  add(
    'Button',
    'Aligned Left Button',
    `State=${cap(s)}`,
    `Aligned left button ${s}`,
    `click-button-alignedLeft-color-text-${s}`,
    `click-button-alignedLeft-color-background-${s}`
  );
const PAGE_BG = 'click-global-color-background-default';
for (const s of STATES) {
  add(
    'Accordion',
    'Accordion',
    `State=${cap(s)}`,
    `Accordion ${s} label`,
    `click-accordion-color-default-label-${s}`,
    PAGE_BG
  );
  add(
    'Accordion',
    'Accordion',
    `State=${cap(s)}`,
    `Accordion ${s} icon`,
    `click-accordion-color-default-icon-${s}`,
    PAGE_BG,
    'icon'
  );
}
add(
  'Tooltip',
  'Tooltip',
  '',
  'Tooltip label',
  'click-tooltip-color-label-default',
  'click-tooltip-color-background-default'
);
for (const [s, figma] of [
  ['default', 'State=Default'],
  ['hover', 'State=Hover'],
  ['active', 'State=Selected'],
])
  add(
    'Tab',
    'Tab Item',
    figma,
    `Tab ${s}`,
    `click-tabs-basic-color-text-${s}`,
    `click-tabs-basic-color-background-${s}`
  );
for (const s of STATES)
  add(
    'Tab',
    'File Tab Item',
    `State=${cap(s)}`,
    `File tab ${s}`,
    `click-tabs-fileTabs-color-text-${s}`,
    `click-tabs-fileTabs-color-background-${s}`
  );
add('Toast', 'Toast', '', 'Toast title', 'click-toast-color-title-default', PAGE_BG);
add(
  'Toast',
  'Toast',
  'Description=True',
  'Toast description',
  'click-toast-color-description-default',
  PAGE_BG
);
for (const s of ['success', 'warning', 'danger'])
  add(
    'Toast',
    '_Toast Title Icon',
    `Color=${cap(s)}`,
    `Toast ${s} icon`,
    `click-toast-color-icon-${s}`,
    PAGE_BG,
    'icon'
  );
for (const m of ['light', 'dark']) {
  const v = `click-codeblock-${m}Mode-color`;
  add(
    'Codeblock',
    'Codeblock',
    `Mode=${cap(m)}`,
    `Codeblock ${m} text`,
    `${v}-text-default`,
    `${v}-background-default`
  );
  add(
    'Codeblock',
    'Codeblock',
    `Mode=${cap(m)}, Line Numbers=True`,
    `Codeblock ${m} line numbers`,
    `${v}-numbers-default`,
    `${v}-background-default`
  );
  add(
    'Codeblock',
    'Codeblock',
    `Mode=${cap(m)}`,
    `Codeblock ${m} copy button`,
    `${v}-button-foreground-default`,
    `${v}-button-background-default`,
    'icon'
  );
}
for (const [type, set] of [
  ['primary', 'Primary Card'],
  ['secondary', 'Secondary Card'],
  ['horizontal-default', 'Horizontal Card'],
])
  for (const s of STATES) {
    const variant = `State=${s === 'hover' && type === 'secondary' ? s : cap(s)},`;
    const v = `click-card-${type}-color`;
    add(
      'Card',
      set,
      variant,
      `${set} ${s} title`,
      `${v}-title-${s}`,
      `${v}-background-${s}`
    );
    add(
      'Card',
      set,
      variant,
      `${set} ${s} description`,
      `${v}-description-${s}`,
      `${v}-background-${s}`
    );
  }
for (const s of STATES)
  add(
    'Card',
    'Horizontal Card',
    `State=${cap(s)}, Type=Muted`,
    `Horizontal Card muted ${s} description`,
    `click-card-horizontal-muted-color-description-${s}`,
    `click-card-horizontal-muted-color-background-${s}`
  );
add(
  'FileUpload',
  'File upload',
  'State=Default',
  'File upload title',
  'click-fileUpload-color-title-default',
  'click-fileUpload-color-background-default'
);
add(
  'FileUpload',
  'File upload',
  'State=Default',
  'File upload description',
  'click-fileUpload-color-description-default',
  'click-fileUpload-color-background-default'
);
add(
  'FileUpload',
  'File upload',
  'State=Upload failed',
  'File upload error text',
  'click-fileUpload-color-description-error',
  'click-fileUpload-color-background-error'
);
for (const part of ['title', 'description'])
  add(
    'Flyout',
    'Flyout',
    '',
    `Flyout ${part}`,
    `click-flyout-color-${part}-default`,
    'click-flyout-color-background-default'
  );
for (const s of STATES) {
  const variant = `State=${cap(s)}, `;
  const v = 'click-genericMenu-item-color';
  add(
    'GenericMenu',
    'Item',
    variant,
    `Menu item ${s}`,
    `${v}-default-text-${s}`,
    `${v}-default-background-${s}`
  );
  add(
    'GenericMenu',
    'Item',
    `${variant}.*Type=Two Lines`,
    `Menu item ${s} subtext`,
    `${v}-subtext-${s}`,
    `${v}-default-background-${s}`
  );
  add(
    'GenericMenu',
    'Item',
    `${variant}.*showFormat=Yes`,
    `Menu item ${s} format`,
    `${v}-format-${s}`,
    `${v}-default-background-${s}`
  );
  add(
    'GenericMenu',
    'Item',
    `${variant}.*Type=Danger`,
    `Menu item danger ${s}`,
    `${v}-danger-text-${s}`,
    `${v}-danger-background-${s}`
  );
}
add(
  'GenericMenu',
  'Item - Autoscaling Search',
  'State=Default',
  'Menu search placeholder',
  'click-genericMenu-autocomplete-color-placeholder-default',
  'click-genericMenu-autocomplete-color-background-default'
);
for (const part of ['title', 'description'])
  add(
    'Dialog',
    'Dialog',
    '',
    `Dialog ${part}`,
    `click-dialog-color-${part}-default`,
    'click-dialog-color-background-default'
  );
for (const s of ['complete', 'active', 'incomplete'])
  add(
    'Stepper',
    'Step',
    `State=${cap(s)}, Type=Numbered`,
    `Step ${s} title`,
    `click-stepper-vertical-numbered-color-title-${s}`,
    PAGE_BG
  );
for (const s of ['default', 'hover', 'active', 'error']) {
  const variant = `State=${cap(s)}`;
  const v = 'click-field-color';
  add(
    'FormFields',
    'Text Field',
    variant,
    `Field ${s} text`,
    `${v}-text-${s}`,
    `${v}-background-${s}`
  );
  add(
    'FormFields',
    'Text Field',
    variant,
    `Field ${s} format`,
    `${v}-format-${s}`,
    `${v}-background-${s}`
  );
  add(
    'FormFields',
    'Field label',
    variant,
    `Field label ${s}`,
    `${v}-label-${s}`,
    PAGE_BG
  );
}
add(
  'FormFields',
  'Text Field',
  'State=Default',
  'Field placeholder',
  'click-field-color-placeholder-default',
  'click-field-color-background-default'
);
add(
  'FormFields',
  '_Check Label',
  'Status=Default',
  'Check label',
  'click-field-color-genericLabel-default',
  PAGE_BG
);
for (const part of ['text', 'label', 'link'])
  add(
    'Table',
    'Table cell',
    'State=Default',
    `Table cell ${part}`,
    `click-table-row-color-${part}-default`,
    'click-table-row-color-background-default'
  );
add(
  'Table',
  'Table header',
  'State=Default',
  'Table header title',
  'click-table-header-color-title-default',
  'click-table-header-color-background-default'
);
for (const [s, figma] of [
  ['default', 'State=Default'],
  ['selectIndirect', 'State=Select - Indirect'],
  ['selectDirect', 'State=Select - Direct'],
]) {
  add(
    'Table',
    'Grid header',
    figma,
    `Grid header ${s}`,
    `click-grid-header-cell-color-title-${s}`,
    `click-grid-header-cell-color-background-${s}`
  );
  add(
    'Table',
    'Grid cell',
    figma,
    `Grid cell ${s}`,
    `click-grid-body-cell-color-text-${s}`,
    `click-grid-body-cell-color-background-${s}`
  );
}

const out = [];
for (const theme of ['Light', 'Dark']) {
  const vars = loadVars(join(repo, `src/theme/styles/tokens-${theme.toLowerCase()}.css`));
  const page = parseColor(vars.get('click-global-color-background-default'), vars).rgb;
  for (const p of pairs) {
    const fgRaw = vars.get(p.fg),
      bgRaw = vars.get(p.bg);
    if (!fgRaw || !bgRaw) {
      out.push({ ...p, theme, missing: !fgRaw ? p.fg : p.bg });
      continue;
    }
    const bg = blend(parseColor(bgRaw, vars), page);
    const fg = blend(parseColor(fgRaw, vars), bg);
    const need = p.kind === 'icon' ? 3 : 4.5;
    const r = ratio(fg, bg);
    out.push({
      page: p.page,
      set: p.set,
      variantRe: p.variantRe,
      label: p.label,
      kind: p.kind,
      theme,
      need,
      ratio: +r.toFixed(2),
      pass: r >= need,
      fg: hex(fg),
      bg: hex(bg),
    });
  }
}
console.log(
  JSON.stringify(
    onlyFailures ? out.filter(p => p.missing || !p.pass) : out,
    null,
    onlyFailures ? 0 : 2
  )
);
