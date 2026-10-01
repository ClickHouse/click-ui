/**
 * Shared helpers for locating Playwright visual-regression specs.
 *
 * The visual specs navigate to Storybook story URLs by string id rather than
 * importing the component under test, so nothing in the spec source links it
 * back to `src/`. Each spec therefore declares its subject with one or more
 * `@covers <path>` directives, and both consumers of this module read that
 * declaration:
 *
 *   - `.scripts/js/affected-visual-specs`  maps a git diff onto specs (CI).
 *   - `.scripts/js/resolve-visual-specs`   maps a component name onto specs
 *                                          (local `yarn test:visual <name>`).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootDir = path.resolve(__dirname, '../../..');
export const testsDir = path.join(rootDir, 'tests');
export const componentsDir = path.join(rootDir, 'src/components');

export const toPosix = p => p.split(path.sep).join('/');

/** Walk a directory returning absolute paths of files matching `filter`. */
export const walk = (dir, filter, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filter, acc);
    else if (filter(entry.name)) acc.push(full);
  }
  return acc;
};

/** Every spec file, repo-relative and posix-separated, sorted. */
export const listSpecs = () =>
  walk(testsDir, name => name.endsWith('.spec.ts'))
    .map(abs => toPosix(path.relative(rootDir, abs)))
    .sort();

/**
 * Build the coverage map from `@covers` directives.
 * Returns Map<coveredPath (repo-relative posix), Set<spec (repo-relative posix)>>.
 *
 * With `strict` (the default) a spec that lacks a directive or points at a
 * missing path throws, so the map can never silently drift out of sync with the
 * suite. Callers that only need a best-effort lookup pass `strict: false` and
 * get warnings on stderr instead.
 */
export const buildCoverageMap = ({ strict = true } = {}) => {
  const map = new Map();
  const directiveRe = /@covers\s+(\S+)/g;

  for (const specRel of listSpecs()) {
    const src = fs.readFileSync(path.join(rootDir, specRel), 'utf-8');
    const covered = [...src.matchAll(directiveRe)].map(m => m[1]);

    if (covered.length === 0) {
      const message =
        `Spec "${specRel}" has no "@covers <path>" directive. Add one so the ` +
        `affected-spec resolver knows which source it guards (see ` +
        `.scripts/js/affected-visual-specs).`;
      if (strict) throw new Error(message);
      process.stderr.write(`Warning: ${message}\n`);
      continue;
    }

    for (const coveredPath of covered) {
      if (!fs.existsSync(path.join(rootDir, coveredPath))) {
        const message =
          `Spec "${specRel}" declares "@covers ${coveredPath}" but that path ` +
          `does not exist.`;
        if (strict) throw new Error(message);
        process.stderr.write(`Warning: ${message}\n`);
        continue;
      }
      if (!map.has(coveredPath)) map.set(coveredPath, new Set());
      map.get(coveredPath).add(specRel);
    }
  }
  return map;
};

/**
 * Fold a user-typed name down to a comparable key, so `CodeBlock`,
 * `codeblock`, `code-block` and `code_block` all resolve to the same spec.
 */
const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** The last path segment of a `@covers` target, minus any file extension. */
const coveredName = coveredPath => path.basename(coveredPath).replace(/\.tsx?$/, '');

/**
 * Index every name a spec can be addressed by:
 *
 *   - the component (or source) name it `@covers` .... `CodeBlock`, `Loading`
 *   - its own file name ............................... `codeblock`, `date-details`
 *   - the suite directory holding it ................. `codeblocks`, `buttons`
 *
 * Returns { index: Map<normalizedKey, Set<spec>>, labels: Map<normalizedKey, string> }
 * where `labels` keeps the nicest spelling seen for a key, for error messages.
 */
export const buildNameIndex = ({ strict = false } = {}) => {
  const index = new Map();
  const labels = new Map();

  const add = (name, spec) => {
    const key = normalize(name);
    if (!key) return;
    if (!index.has(key)) index.set(key, new Set());
    index.get(key).add(spec);
    // Prefer a capitalised component name over a lowercase file name.
    if (!labels.has(key) || /[A-Z]/.test(name)) labels.set(key, name);
  };

  for (const [coveredPath, specs] of buildCoverageMap({ strict })) {
    for (const spec of specs) add(coveredName(coveredPath), spec);
  }

  for (const spec of listSpecs()) {
    add(path.basename(spec, '.spec.ts'), spec);
    const suite = path.basename(path.dirname(spec));
    if (suite !== 'tests') add(suite, spec);
  }

  return { index, labels };
};

/**
 * Resolve user-typed names to spec paths.
 *
 * An exact (normalized) hit wins. Failing that, names of 3+ characters fall
 * back to a substring match so `card` reaches all four card specs. A name that
 * matches nothing is reported in `notFound` rather than silently dropped —
 * running the whole suite because of a typo is the one outcome worth avoiding.
 *
 * Returns { specs, resolutions, notFound, labels }.
 */
export const resolveNames = (names, { strict = false } = {}) => {
  const { index, labels } = buildNameIndex({ strict });
  const specs = new Set();
  const resolutions = [];
  const notFound = [];

  for (const name of names) {
    const key = normalize(name);
    const exact = index.get(key);

    if (exact) {
      exact.forEach(s => specs.add(s));
      resolutions.push({ name, how: 'exact', specs: [...exact].sort() });
      continue;
    }

    if (key.length >= 3) {
      const partial = new Set();
      for (const [candidate, candidateSpecs] of index) {
        if (candidate.includes(key)) candidateSpecs.forEach(s => partial.add(s));
      }
      if (partial.size > 0) {
        partial.forEach(s => specs.add(s));
        resolutions.push({ name, how: 'partial', specs: [...partial].sort() });
        continue;
      }
    }

    notFound.push(name);
  }

  return { specs: [...specs].sort(), resolutions, notFound, labels };
};
