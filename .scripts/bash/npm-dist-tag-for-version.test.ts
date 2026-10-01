// @vitest-environment node
import { execFileSync, type SpawnSyncReturns } from 'node:child_process';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Invoked directly (not via `bash <script>`), the way .github/workflows/publish.yml does.
const SCRIPT = fileURLToPath(new URL('./npm-dist-tag-for-version', import.meta.url));

const run = (...args: string[]): string =>
  execFileSync(SCRIPT, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

const runExpectingFailure = (...args: string[]): string => {
  try {
    run(...args);
  } catch (error) {
    const { status, stderr } = error as SpawnSyncReturns<string>;
    expect(status).toBe(1);
    expect(stderr).toContain('❌');
    return stderr;
  }
  throw new Error(`expected exit 1 for: ${JSON.stringify(args)}`);
};

describe('npm-dist-tag-for-version', () => {
  it('is executable', () => {
    // A lost exec bit would otherwise fail every test below with a confusing error.
    expect(statSync(SCRIPT).mode & 0o111).not.toBe(0);
  });

  it.each([
    ['0.12.0', 'latest'],
    ['v0.12.0', 'latest'],
    ['0.12.0-rc1', 'rc'],
    ['0.12.0-rc.1', 'rc'],
    ['0.12.0-rc01', 'rc'], // alphanumeric identifier: leading zero is allowed here
    ['0.12.0-rc', 'rc'], // bare channel, no number
    ['v0.12.0-rc1', 'rc'],
    ['0.12.0-beta2', 'rc'], // beta is normalized to rc
    ['0.12.0-beta.1', 'rc'],
    ['0.12.0-beta', 'rc'],
    ['0.12.0-alpha.0', 'alpha'],
    ['0.12.0-alpha', 'alpha'],
    ['0.12.0-canary.g1979c25d.0', 'canary'],
    ['0.12.0-canary.1979c25d.0', 'canary'],
    ['1.0.0-rc2', 'rc'],
  ])('resolves %s to %s', (version, tag) => {
    expect(run(version)).toBe(tag);
  });

  // The expected substring names the failure category, not the exact prose.
  it.each([
    ['0.12.0-next1', 'not one of'],
    ['0.12.0-test.0', 'not one of'],
    ['0.12.0-fix-theme-test1', 'not one of'],
    ['0.12.0-latest', 'not one of'],
    ['0.12.0-LATEST', 'not one of'],
    ['0.12.0-RC1', 'not one of'], // channels are lowercase
    ['0.12.0-1', 'not one of'], // a numeric-only prerelease has no channel
    ['0.12.0-rc-', 'not one of'],
    ['12.0', 'not a semver'],
    ['abc', 'not a semver'],
    ['01.2.3', 'not a semver'],
    ['vv0.12.0', 'not a semver'],
    ['0.12.0 ', 'not a semver'],
    ['0.12.0-rc.', 'not a semver'], // empty identifier
    ['0.12.0-rc..1', 'not a semver'],
    ['0.12.0-rc.01', 'not a semver'], // numeric identifier with a leading zero
    ['0.12.0-canary.01234567.0', 'not a semver'], // an all-digit sha with a leading zero
    ['0.12.0+build.1', 'build metadata'],
    ['0.12.0-rc1+build', 'build metadata'],
    ['', 'is empty'],
  ])('rejects %j (%s)', (version, message) => {
    expect(runExpectingFailure(version)).toContain(message);
  });

  it('fails without arguments', () => {
    expect(runExpectingFailure()).toContain('Usage');
  });

  it('never prints latest for a version with a prerelease suffix', () => {
    const prereleases = [
      '0.12.0-latest',
      '0.12.0-latest.1',
      '0.12.0-rc1',
      '0.12.0-alpha',
      '0.12.0-canary.g1979c25d.0',
      '0.12.0-1',
    ];
    for (const version of prereleases) {
      let output = '(rejected)';
      try {
        output = run(version);
      } catch {
        // rejected inputs print nothing on stdout
      }
      expect(output).not.toBe('latest');
    }
  });

  describe('latest guard', () => {
    it.each([
      ['0.12.0', '0.11.0'],
      ['0.11.1', '0.11.0'],
      ['1.0.0', '0.11.0'],
      ['0.11.10', '0.11.9'],
      ['0.0.1', '0.0.0'],
      ['0.12.0', '0.12.0-rc1'],
    ])('accepts %s as the new latest over %s', (version, current) => {
      expect(run(version, current)).toBe('latest');
    });

    it.each([
      ['0.11.0', '0.11.0'],
      ['0.10.9', '0.11.0'],
      ['0.11.0', '1.0.0'],
    ])('rejects %s as latest when latest is %s', (version, current) => {
      expect(runExpectingFailure(version, current)).toContain('not newer');
    });

    it('fails closed on an empty or malformed current latest', () => {
      expect(runExpectingFailure('0.12.0', '')).toContain('Current latest is empty');
      expect(runExpectingFailure('0.12.0', 'garbage')).toContain('not a semver');
    });

    it('does not run for prerelease versions, even when the current latest is unusable', () => {
      expect(run('0.10.1-rc1', '0.11.0')).toBe('rc');
      expect(run('0.10.1-rc1', '')).toBe('rc');
    });
  });
});
