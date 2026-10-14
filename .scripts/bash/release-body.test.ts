// @vitest-environment node
import { execFileSync, type SpawnSyncReturns } from 'node:child_process';
import { mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';

// Invoked directly (not via `bash <script>`), the way .github/workflows/publish.yml does.
const SCRIPT = fileURLToPath(new URL('./release-body', import.meta.url));

// GitHub's generated notes, as publish.yml gets them from the generate-notes API.
const GENERATED = `## What's Changed
* feat(Logos): add the Amazon S3 Tables for Iceberg logo by @XOP in https://github.com/ClickHouse/click-ui/pull/1251
* fix(TextAreaField): use change event for value updates by @fallintoplace in https://github.com/ClickHouse/click-ui/pull/1243
* chore(deps-dev): bump the dev-dependencies group with 3 updates by @dependabot[bot] in https://github.com/ClickHouse/click-ui/pull/1247

## New Contributors
* @fallintoplace made their first contribution in https://github.com/ClickHouse/click-ui/pull/1243

**Full Changelog**: https://github.com/ClickHouse/click-ui/compare/v0.14.0...v0.15.0
`;
const WHATS_CHANGED = `## What's Changed

- feat(Logos): add the Amazon S3 Tables for Iceberg logo by [@XOP](https://github.com/XOP) in [#1251](https://github.com/ClickHouse/click-ui/pull/1251)
- fix(TextAreaField): use change event for value updates by [@fallintoplace](https://github.com/fallintoplace) in [#1243](https://github.com/ClickHouse/click-ui/pull/1243)
- chore(deps-dev): bump the dev-dependencies group with 3 updates by [@dependabot[bot]](https://github.com/apps/dependabot) in [#1247](https://github.com/ClickHouse/click-ui/pull/1247)
`;
const CONTRIBUTORS = `## New Contributors

- [@fallintoplace](https://github.com/fallintoplace) made their first contribution in [#1243](https://github.com/ClickHouse/click-ui/pull/1243)
`;
const FULL_CHANGELOG =
  '**Full Changelog**: https://github.com/ClickHouse/click-ui/compare/v0.14.0...v0.15.0\n';

// The section body as release-changelog prints it.
const SECTION = `### Major Changes

- 0a02c6b: Remove styled-components as a dependency.

  - \`styled-components\` is no longer a peer dependency.

### Minor Changes

- 8f99808: Adds a new logo type, \`aws-s3-tables-iceberg\`.
- 0b0bdea: **Breaking:** \`Select\` now calls \`onChange\` with the value.

  Migration: \`onChange={(e) => setValue(e.target.value)}\` becomes \`onChange={setValue}\`.

### Patch Changes

- bf7dca8: \`TextAreaField\` uses the change event for value updates.
`;
const UPGRADE_NOTES = `## ⚠️ Upgrade notes

- Remove styled-components as a dependency.

  - \`styled-components\` is no longer a peer dependency.

- **Breaking:** \`Select\` now calls \`onChange\` with the value.

  Migration: \`onChange={(e) => setValue(e.target.value)}\` becomes \`onChange={setValue}\`.
`;
const GOOD_TO_KNOW = `## Good to know

- Adds a new logo type, \`aws-s3-tables-iceberg\`.
- \`TextAreaField\` uses the change event for value updates.
`;

const dirs: string[] = [];

afterAll(() => {
  for (const dir of dirs) {
    rmSync(dir, { recursive: true, force: true });
  }
});

const run = (section: string, generated: string): string => {
  const dir = mkdtempSync(join(tmpdir(), 'release-body-'));
  dirs.push(dir);
  writeFileSync(join(dir, 'section.md'), section);
  writeFileSync(join(dir, 'generated.md'), generated);
  return execFileSync(SCRIPT, [join(dir, 'section.md'), join(dir, 'generated.md')], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
};

const runExpectingFailure = (...args: string[]): string => {
  try {
    execFileSync(SCRIPT, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    const { status, stderr } = error as SpawnSyncReturns<string>;
    expect(status).toBe(1);
    expect(stderr).toContain('❌');
    return stderr;
  }
  throw new Error(`expected exit 1 for: ${JSON.stringify(args)}`);
};

describe('release-body', () => {
  it('is executable', () => {
    // A lost exec bit would otherwise fail every test below with a confusing error.
    expect(statSync(SCRIPT).mode & 0o111).not.toBe(0);
  });

  it('composes the five parts in order', () => {
    expect(run(SECTION, GENERATED)).toBe(
      `${WHATS_CHANGED}\n${UPGRADE_NOTES}\n${GOOD_TO_KNOW}\n${CONTRIBUTORS}\n${FULL_CHANGELOG}`
    );
  });

  it('keeps only the GitHub parts when no changesets were pending', () => {
    expect(run('', GENERATED)).toBe(
      `${WHATS_CHANGED}\n${CONTRIBUTORS}\n${FULL_CHANGELOG}`
    );
  });

  it('keeps only the changeset parts when GitHub generated nothing', () => {
    expect(run(SECTION, '')).toBe(`${UPGRADE_NOTES}\n${GOOD_TO_KNOW}`);
  });

  it('accepts CRLF line endings, as GitHub stores release bodies', () => {
    expect(run(SECTION.replace(/\n/g, '\r\n'), GENERATED.replace(/\n/g, '\r\n'))).toBe(
      `${WHATS_CHANGED}\n${UPGRADE_NOTES}\n${GOOD_TO_KNOW}\n${CONTRIBUTORS}\n${FULL_CHANGELOG}`
    );
  });

  it('leaves out the upgrade notes when nothing is breaking', () => {
    const section =
      '### Patch Changes\n\n- bf7dca8: Fix a thing.\n- 2c9afcd: Fix another thing.\n';
    expect(run(section, FULL_CHANGELOG)).toBe(
      `## Good to know\n\n- Fix a thing.\n- Fix another thing.\n\n${FULL_CHANGELOG}`
    );
  });

  it('leaves out new contributors when GitHub lists none', () => {
    const generated = GENERATED.replace(/## New Contributors\n.*\n\n/, '');
    expect(run('', generated)).toBe(`${WHATS_CHANGED}\n${FULL_CHANGELOG}`);
  });

  it('treats a plain "Breaking:" like the bold one', () => {
    const section = [
      '### Minor Changes',
      '',
      '- 0b0bdea: Breaking: `Select` now calls `onChange` with the value.',
      '- 8f99808: Add a logo.',
      '',
    ].join('\n');
    expect(run(section, '')).toBe(
      [
        '## ⚠️ Upgrade notes',
        '',
        '- Breaking: `Select` now calls `onChange` with the value.',
        '',
        '## Good to know',
        '',
        '- Add a logo.',
        '',
      ].join('\n')
    );
  });

  it('links @user and pull request URLs inside entries, so nobody is mentioned', () => {
    const section = [
      '### Patch Changes',
      '',
      '- bf7dca8: Fix the thing @fallintoplace reported in https://github.com/ClickHouse/click-ui/pull/1240.',
      '- 2c9afcd: Export it from `@clickhouse/click-ui` as before.',
      '',
    ].join('\n');
    expect(run(section, '')).toBe(
      [
        '## Good to know',
        '',
        '- Fix the thing [@fallintoplace](https://github.com/fallintoplace) reported in [#1240](https://github.com/ClickHouse/click-ui/pull/1240).',
        '- Export it from `@clickhouse/click-ui` as before.',
        '',
      ].join('\n')
    );
  });

  it('strips only a sha prefix from an entry', () => {
    const section = [
      '### Patch Changes',
      '',
      '- deadbeef: Eight hex characters are a sha.',
      '- Note: a word before the colon stays.',
      '- added: five hex characters are not a sha.',
      '- No prefix at all.',
      '',
    ].join('\n');
    expect(run(section, '')).toBe(
      [
        '## Good to know',
        '',
        '- Eight hex characters are a sha.',
        '- Note: a word before the colon stays.',
        '- added: five hex characters are not a sha.',
        '- No prefix at all.',
        '',
      ].join('\n')
    );
  });

  it('passes category headings and skips the comment of a configured release.yml', () => {
    const generated = [
      '<!-- Release notes generated using configuration in .github/release.yml at v0.15.0 -->',
      '',
      "## What's Changed",
      '### 🚀 Features',
      '* feat(Icon): add icons by @XOP in https://github.com/ClickHouse/click-ui/pull/1253',
      '',
      '',
      FULL_CHANGELOG,
    ].join('\n');
    expect(run('', generated)).toBe(
      [
        "## What's Changed",
        '',
        '### 🚀 Features',
        '- feat(Icon): add icons by [@XOP](https://github.com/XOP) in [#1253](https://github.com/ClickHouse/click-ui/pull/1253)',
        '',
        FULL_CHANGELOG,
      ].join('\n')
    );
  });

  it('fails when both files are empty', () => {
    const dir = mkdtempSync(join(tmpdir(), 'release-body-'));
    dirs.push(dir);
    writeFileSync(join(dir, 'section.md'), '');
    writeFileSync(join(dir, 'generated.md'), '\n\n');
    expect(
      runExpectingFailure(join(dir, 'section.md'), join(dir, 'generated.md'))
    ).toContain('nothing to write');
  });

  it('fails on a missing file', () => {
    const dir = mkdtempSync(join(tmpdir(), 'release-body-'));
    dirs.push(dir);
    writeFileSync(join(dir, 'section.md'), SECTION);
    expect(
      runExpectingFailure(join(dir, 'section.md'), join(dir, 'generated.md'))
    ).toContain('not found');
  });

  it('fails without two arguments', () => {
    expect(runExpectingFailure()).toContain('Usage');
    expect(runExpectingFailure('one')).toContain('Usage');
  });
});
