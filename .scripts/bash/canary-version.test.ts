// @vitest-environment node
import { execFileSync, type SpawnSyncReturns } from 'node:child_process';
import { mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';

// Invoked directly (not via `bash <script>`), the way the workflows do.
const SCRIPT = fileURLToPath(new URL('./canary-version', import.meta.url));
const DIST_TAG_SCRIPT = fileURLToPath(
  new URL('./npm-dist-tag-for-version', import.meta.url)
);
const PACKAGE = '@clickhouse/click-ui';
const SHA = '1979c25d4e5f60718293a4b5c6d7e8f901234567';

const projectDirs: string[] = [];

afterAll(() => {
  for (const dir of projectDirs) {
    rmSync(dir, { recursive: true, force: true });
  }
});

// A project dir whose own `yarn` (first on PATH) runs the given shell body.
const project = (version: string, yarnBody: string): string => {
  const dir = mkdtempSync(join(tmpdir(), 'canary-version-'));
  projectDirs.push(dir);
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: PACKAGE, version }));
  writeFileSync(join(dir, 'yarn'), `#!/bin/sh\n${yarnBody}\n`, { mode: 0o755 });
  return dir;
};

// `yarn changeset status --output <file>` writes a release plan with these bump types,
// with some stdout noise that must not end up in the version.
const withChangesets = (version: string, ...bumps: string[]): string => {
  const plan = JSON.stringify({
    changesets: [],
    releases: bumps.map(type => ({ name: PACKAGE, type })),
  });
  return project(
    version,
    `[ "$1 $2 $3" = "changeset status --output" ] || exit 64\necho "yarn noise"\nprintf '%s' '${plan}' > "$4"`
  );
};

const run = (dir: string, ...args: string[]): string =>
  execFileSync(SCRIPT, args, {
    cwd: dir,
    encoding: 'utf8',
    env: { ...process.env, PATH: `${dir}:${process.env.PATH}` },
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

const runExpectingFailure = (dir: string, ...args: string[]): string => {
  try {
    run(dir, ...args);
  } catch (error) {
    const { status, stderr } = error as SpawnSyncReturns<string>;
    expect(status).toBe(1);
    expect(stderr).toContain('❌');
    return stderr;
  }
  throw new Error(`expected exit 1 for: ${JSON.stringify(args)}`);
};

describe('canary-version', () => {
  it('is executable', () => {
    // A lost exec bit would otherwise fail every test below with a confusing error.
    expect(statSync(SCRIPT).mode & 0o111).not.toBe(0);
  });

  it.each([
    ['0.12.0', 'minor', '0.13.0'],
    ['0.12.0', 'patch', '0.12.1'],
    ['0.12.0', 'major', '0.13.0'], // major counts as minor below 1.0.0
    ['0.12.0', 'none', '0.12.1'],
    ['1.2.3', 'major', '2.0.0'],
    ['1.2.3', 'minor', '1.3.0'],
    ['0.13.0-rc1', 'major', '0.13.0'], // a prerelease bumps to the release it precedes
    ['0.13.0-rc1', 'patch', '0.13.0'],
    ['0.13.1-rc1', 'minor', '0.14.0'],
    ['1.0.0-rc1', 'major', '1.0.0'],
    ['1.1.0-rc1', 'major', '2.0.0'],
  ])('%s with a %s changeset gives %s', (version, bump, next) => {
    expect(run(withChangesets(version, bump), SHA)).toBe(`${next}-canary.g1979c25d.0`);
  });

  it('bumps patch when there are no changesets', () => {
    expect(run(withChangesets('0.12.0'), SHA)).toBe('0.12.1-canary.g1979c25d.0');
  });

  it('uses the first 8 characters of a full or a short sha', () => {
    expect(run(withChangesets('0.12.0', 'minor'), SHA.slice(0, 8))).toBe(
      '0.13.0-canary.g1979c25d.0'
    );
  });

  it('keeps an all-digit sha valid semver', () => {
    expect(
      run(withChangesets('0.12.0', 'minor'), '0123456789012345678901234567890123456789')
    ).toBe('0.13.0-canary.g01234567.0');
  });

  it('prints versions that npm-dist-tag-for-version publishes to canary', () => {
    const versions = [
      run(withChangesets('0.12.0', 'minor'), SHA),
      run(withChangesets('0.13.0-rc1', 'major'), SHA),
      run(withChangesets('0.12.0'), '0123456789abcdef0123456789abcdef01234567'),
    ];
    for (const version of versions) {
      expect(execFileSync(DIST_TAG_SCRIPT, [version], { encoding: 'utf8' }).trim()).toBe(
        'canary'
      );
    }
  });

  it.each([
    [[]],
    [['']],
    [['xyz']],
    [['1979C25D']], // uppercase
    [['1979c25']], // 7 characters
    [[SHA, SHA]],
  ])('rejects the arguments %j', args => {
    expect(runExpectingFailure(withChangesets('0.12.0', 'minor'), ...args)).toContain(
      'Usage'
    );
  });

  it('fails when changeset status fails', () => {
    expect(runExpectingFailure(project('0.12.0', 'exit 1'), SHA)).toContain(
      'changeset status failed'
    );
  });

  it('fails on a package version that is not semver', () => {
    expect(runExpectingFailure(withChangesets('garbage', 'minor'), SHA)).toContain(
      'is not X.Y.Z'
    );
  });

  it('fails on an unknown bump type', () => {
    expect(runExpectingFailure(withChangesets('0.12.0', 'weird'), SHA)).toContain(
      "'weird'"
    );
  });
});
