// @vitest-environment node
import { execFileSync, type SpawnSyncReturns } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import { afterAll, describe, expect, it } from 'vitest';

// Invoked directly (not via `bash <script>`), the way .github/workflows/publish.yml does.
const SCRIPT = fileURLToPath(new URL('./release-changelog', import.meta.url));

const TITLE = '# @clickhouse/click-ui\n\n';
const OLD_SECTIONS = `## 0.14.0

### Minor Changes

- 8f99808: Add the sidebar icons.

## 0.13.0

### Patch Changes

- bf7dca8: Use the change event in \`TextAreaField\`.
`;
// What \`changeset version\` writes on top: its own version, entries with the adding commit's sha.
const NEW_SECTION = `## 1.0.0

### Minor Changes

- 0a7025a: Add 16 flags.

  Also corrects nine existing flags.

- 61f6a5a: Add a Polaris logo for \`@clickhouse/click-ui\` consumers.

### Patch Changes

- 2c9afcd: Fix the \`popin\` icon.

`;
const NEW_BODY = `${NEW_SECTION.replace('## 1.0.0\n\n', '').trimEnd()}\n`;

const dirs: string[] = [];

afterAll(() => {
  for (const dir of dirs) {
    rmSync(dir, { recursive: true, force: true });
  }
});

const files = (
  changelog: string,
  committed: string
): { changelog: string; committed: string } => {
  const dir = mkdtempSync(join(tmpdir(), 'release-changelog-'));
  dirs.push(dir);
  const paths = {
    changelog: join(dir, 'CHANGELOG.md'),
    committed: join(dir, 'CHANGELOG.committed.md'),
  };
  writeFileSync(paths.changelog, changelog);
  writeFileSync(paths.committed, committed);
  return paths;
};

const run = (...args: string[]): string =>
  execFileSync(SCRIPT, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const runExpectingExit = (
  status: number,
  ...args: string[]
): SpawnSyncReturns<string> => {
  try {
    run(...args);
  } catch (error) {
    const result = error as SpawnSyncReturns<string>;
    expect(result.status).toBe(status);
    return result;
  }
  throw new Error(`expected exit ${status} for: ${JSON.stringify(args)}`);
};

describe('release-changelog', () => {
  it('is executable', () => {
    // A lost exec bit would otherwise fail every test below with a confusing error.
    expect(statSync(SCRIPT).mode & 0o111).not.toBe(0);
  });

  it('gives the new section the tag version and prints its body', () => {
    const { changelog, committed } = files(
      TITLE + NEW_SECTION + OLD_SECTIONS,
      TITLE + OLD_SECTIONS
    );
    expect(run('v0.15.0', changelog, committed)).toBe(NEW_BODY);
    expect(readFileSync(changelog, 'utf8')).toBe(
      TITLE + NEW_SECTION.replace('## 1.0.0', '## 0.15.0') + OLD_SECTIONS
    );
    expect(readFileSync(committed, 'utf8')).toBe(TITLE + OLD_SECTIONS);
  });

  it.each([
    ['v0.15.0', '0.15.0'],
    ['0.15.0', '0.15.0'],
    ['v0.15.0-rc1', '0.15.0-rc1'],
    ['v1.0.0-beta.2', '1.0.0-beta.2'],
  ])('writes the heading for tag %s as "## %s"', (tag, version) => {
    const { changelog, committed } = files(
      TITLE + NEW_SECTION + OLD_SECTIONS,
      TITLE + OLD_SECTIONS
    );
    run(tag, changelog, committed);
    expect(readFileSync(changelog, 'utf8')).toContain(`\n## ${version}\n`);
    expect(readFileSync(changelog, 'utf8')).not.toContain('## 1.0.0\n');
  });

  it('accepts a file whose heading already carries the tag version', () => {
    // publish runs it a second time on the file build produced.
    const { changelog, committed } = files(
      TITLE + NEW_SECTION + OLD_SECTIONS,
      TITLE + OLD_SECTIONS
    );
    run('v0.15.0', changelog, committed);
    const rewritten = readFileSync(changelog, 'utf8');
    expect(run('v0.15.0', changelog, committed)).toBe(NEW_BODY);
    expect(readFileSync(changelog, 'utf8')).toBe(rewritten);
  });

  it('accepts whatever body the new section has, since build wrote it', () => {
    const section = NEW_SECTION.replace('Add 16 flags.', 'Anything changesets produced.');
    const { changelog, committed } = files(
      TITLE + section + OLD_SECTIONS,
      TITLE + OLD_SECTIONS
    );
    expect(run('v0.15.0', changelog, committed)).toContain(
      'Anything changesets produced.'
    );
  });

  it('finds the committed CHANGELOG.md stable under the prettier pass of changeset version', async () => {
    // @changesets/apply-release-plan formats the whole file this way after prepending the new
    // section; a reformatted older section would make release-changelog reject every release.
    const path = fileURLToPath(new URL('../../CHANGELOG.md', import.meta.url));
    const text = readFileSync(path, 'utf8');
    const formatted = await prettier.format(text, {
      ...((await prettier.resolveConfig(path)) ?? {}),
      filepath: path,
      parser: 'markdown',
    });
    expect(formatted).toBe(text);
  });

  it('accepts a committed changelog that has no section yet', () => {
    const { changelog, committed } = files(TITLE + NEW_SECTION, TITLE);
    expect(run('v0.15.0', changelog, committed)).toBe(NEW_BODY);
    expect(readFileSync(changelog, 'utf8')).toBe(
      TITLE + NEW_SECTION.replace('## 1.0.0', '## 0.15.0')
    );
  });

  it('exits 2 and changes nothing when the files are identical', () => {
    const { changelog, committed } = files(TITLE + OLD_SECTIONS, TITLE + OLD_SECTIONS);
    const result = runExpectingExit(2, 'v0.15.0', changelog, committed);
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain('No new section');
    expect(readFileSync(changelog, 'utf8')).toBe(TITLE + OLD_SECTIONS);
  });

  describe('refuses with exit 1', () => {
    const failing = (changelog: string, committed: string, tag = 'v0.15.0'): string => {
      const paths = files(changelog, committed);
      const result = runExpectingExit(1, tag, paths.changelog, paths.committed);
      expect(result.stdout).toBe('');
      expect(result.stderr).toContain('❌');
      expect(readFileSync(paths.changelog, 'utf8')).toBe(changelog);
      return result.stderr;
    };

    it('an older section that changed', () => {
      expect(
        failing(
          TITLE + NEW_SECTION + OLD_SECTIONS.replace('8f99808', 'deadbee'),
          TITLE + OLD_SECTIONS
        )
      ).toContain('beyond one new section');
    });

    it('a removed older section', () => {
      expect(failing(TITLE + NEW_SECTION, TITLE + OLD_SECTIONS)).toContain(
        'beyond one new section'
      );
    });

    it('two new sections', () => {
      expect(
        failing(
          TITLE +
            NEW_SECTION +
            NEW_SECTION.replace('## 1.0.0', '## 0.99.0') +
            OLD_SECTIONS,
          TITLE + OLD_SECTIONS
        )
      ).toContain('beyond one new section');
    });

    it('a changed title', () => {
      expect(
        failing(`# Changelog\n\n${NEW_SECTION}${OLD_SECTIONS}`, TITLE + OLD_SECTIONS)
      ).toContain('above its first section');
    });

    it('a file without sections', () => {
      expect(failing(`${TITLE}Some text\n`, TITLE)).toContain(
        "no '## <version>' section"
      );
    });

    it('an empty new section', () => {
      expect(
        failing(`${TITLE}## 1.0.0\n\n${OLD_SECTIONS}`, TITLE + OLD_SECTIONS)
      ).toContain('is empty');
    });

    it.each(['vv0.15.0', '0.15', 'latest', '0.15.0 ', ''])('the tag %j', tag => {
      expect(
        failing(TITLE + NEW_SECTION + OLD_SECTIONS, TITLE + OLD_SECTIONS, tag)
      ).toContain('is not vX.Y.Z');
    });

    it('a missing file', () => {
      const { changelog } = files(
        TITLE + NEW_SECTION + OLD_SECTIONS,
        TITLE + OLD_SECTIONS
      );
      expect(
        runExpectingExit(1, 'v0.15.0', changelog, `${changelog}.missing`).stderr
      ).toContain('not found');
    });

    it('the wrong number of arguments', () => {
      expect(runExpectingExit(1, 'v0.15.0').stderr).toContain('Usage');
      expect(runExpectingExit(1).stderr).toContain('Usage');
    });
  });
});
