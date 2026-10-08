// @vitest-environment node
import { execFileSync, type SpawnSyncReturns } from 'node:child_process';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Invoked directly (not via `bash <script>`), the way .github/workflows/chromatic-pr-comment.yml does.
const SCRIPT = fileURLToPath(new URL('./chromatic-pr-comment-body', import.meta.url));

const SHA = '20c8935b1817713bd791492e8b490f6cae645e45';
const RUN_URL = 'https://github.com/ClickHouse/click-ui/actions/runs/36156383535';
const STORYBOOK_URL = 'https://6481a2f37ea081d3131e5219-gcmxrpwtps.chromatic.com/';
const BUILD_URL =
  'https://www.chromatic.com/build?appId=6481a2f37ea081d3131e5219&number=5452';

interface Status {
  context: string;
  state: string;
  target_url: string | null;
  description: string | null;
}

// Shape of `gh api repos/<owner>/<repo>/commits/<sha>/status`, trimmed to what the script reads.
const combined = (...statuses: Status[]): string =>
  JSON.stringify({ state: 'success', statuses });

const storybook = (overrides: Partial<Status> = {}): Status => ({
  context: 'Storybook Publish',
  state: 'success',
  target_url: STORYBOOK_URL,
  description: '641 stories published',
  ...overrides,
});

const uiTests = (overrides: Partial<Status> = {}): Status => ({
  context: 'UI Tests',
  state: 'success',
  target_url: BUILD_URL,
  description: '641 tests unchanged',
  ...overrides,
});

const run = (input: string, ...args: string[]): string =>
  execFileSync(SCRIPT, args, {
    encoding: 'utf8',
    input,
    stdio: ['pipe', 'pipe', 'pipe'],
  });

const render = (input: string): string => run(input, SHA, RUN_URL);

const rowFor = (body: string, label: string): string =>
  body.split('\n').find(line => line.startsWith(`| ${label} |`)) ?? '';

const runExpectingFailure = (input: string, ...args: string[]): string => {
  try {
    run(input, ...args);
  } catch (error) {
    const { status, stderr } = error as SpawnSyncReturns<string>;
    expect(status).toBe(1);
    expect(stderr).toContain('❌');
    return stderr;
  }
  throw new Error(`expected exit 1 for: ${JSON.stringify(args)}`);
};

describe('chromatic-pr-comment-body', () => {
  it('is executable', () => {
    // A lost exec bit would otherwise fail every test below with a confusing error.
    expect(statSync(SCRIPT).mode & 0o111).not.toBe(0);
  });

  it('links the Storybook and the build when Chromatic reported both', () => {
    const body = render(combined(storybook(), uiTests()));

    expect(body).toContain('## Chromatic Storybook');
    expect(rowFor(body, 'Storybook')).toBe(
      `| Storybook | ✅ 641 stories published | [Open Storybook](${STORYBOOK_URL}) |`
    );
    expect(rowFor(body, 'UI Tests')).toBe(
      `| UI Tests | ✅ 641 tests unchanged | [Open build](${BUILD_URL}) |`
    );
    expect(body).toContain(`\`${SHA}\``);
    expect(body).toContain(`[Chromatic run](${RUN_URL})`);
  });

  it('accepts the build URL Chromatic sets on fork PRs', () => {
    const forkBuildUrl = `${BUILD_URL}&captureStack=capture-v9`;
    const body = render(combined(storybook(), uiTests({ target_url: forkBuildUrl })));

    expect(rowFor(body, 'UI Tests')).toContain(`[Open build](${forkBuildUrl})`);
  });

  it('says "not reported" for each missing context', () => {
    const body = render(combined());

    expect(rowFor(body, 'Storybook')).toBe('| Storybook | ⏭️ not reported | no link |');
    expect(rowFor(body, 'UI Tests')).toBe('| UI Tests | ⏭️ not reported | no link |');
    // The run link is the way to find out why.
    expect(body).toContain(`[Chromatic run](${RUN_URL})`);
  });

  it('ignores statuses from other contexts', () => {
    const body = render(
      combined({
        context: 'ci/other',
        state: 'success',
        target_url: STORYBOOK_URL,
        description: 'x',
      })
    );

    expect(rowFor(body, 'Storybook')).toContain('not reported');
  });

  it.each([
    ['pending', '⏳'],
    ['failure', '❌'],
    ['error', '❌'],
    ['something-new', '❔'],
  ])('shows state %s as %s', (state, icon) => {
    const body = render(
      combined(storybook(), uiTests({ state, description: 'n changes' }))
    );

    expect(rowFor(body, 'UI Tests')).toContain(`| ${icon} n changes |`);
  });

  it('falls back to the state when the description is empty', () => {
    const body = render(combined(storybook({ description: null }), uiTests()));

    expect(rowFor(body, 'Storybook')).toContain('| ✅ success |');
  });

  it.each([
    ['another host', 'https://evil.example/'],
    [
      'a lookalike host',
      'https://6481a2f37ea081d3131e5219-x.chromatic.com.evil.example/',
    ],
    ['plain http', 'http://6481a2f37ea081d3131e5219-gcmxrpwtps.chromatic.com/'],
    ['a javascript: URL', 'javascript:alert(1)'],
    ['a markdown breakout', `${STORYBOOK_URL}) [x](https://evil.example`],
    ['no URL', null],
  ])('does not link %s', (_label, targetUrl) => {
    const body = render(
      combined(storybook({ target_url: targetUrl }), uiTests({ target_url: targetUrl }))
    );

    expect(rowFor(body, 'Storybook')).toMatch(/\| no link \|$/);
    expect(rowFor(body, 'UI Tests')).toMatch(/\| no link \|$/);
    if (targetUrl) {
      expect(body).not.toContain(targetUrl);
    }
  });

  it('strips markdown from the description', () => {
    const body = render(
      combined(
        storybook({ description: '1 | [click](https://evil.example) <img src=x> `code`' })
      )
    );

    const row = rowFor(body, 'Storybook');
    expect(row).not.toContain('[click]');
    expect(row).not.toContain('<img');
    expect(row).not.toContain('`');
    // Only the three column separators, plus the two outer pipes.
    expect(row.split('|')).toHaveLength(5);
  });

  it('caps the description at 100 characters', () => {
    const body = render(combined(storybook({ description: 'a'.repeat(300) })));

    expect(rowFor(body, 'Storybook')).toContain(`✅ ${'a'.repeat(100)} |`);
  });

  it('links any chromatic.com subdomain, in case the id format changes', () => {
    const url = 'https://new-id-format-2027.chromatic.com/';
    const body = render(combined(storybook({ target_url: url })));

    expect(rowFor(body, 'Storybook')).toContain(`[Open Storybook](${url})`);
  });

  it('leaves no www. host for GitHub to autolink', () => {
    const body = render(combined(storybook({ description: 'see www.evil.example now' })));

    expect(rowFor(body, 'Storybook')).toContain('| ✅ see wwwevilexample now |');
  });

  // LC_ALL=C: tr and cut work on bytes. Every byte of a multi-byte character is
  // >= 0x80, so tr drops the whole character and cut never splits one.
  it.each([
    ['a middle dot', '641 stories · published', '641 stories  published'],
    ['an accented prefix before the cap', `é${'a'.repeat(200)}`, 'a'.repeat(100)],
  ])('drops non-ASCII characters whole: %s', (_label, description, expected) => {
    const body = render(combined(storybook({ description })));

    expect(rowFor(body, 'Storybook')).toContain(`| ✅ ${expected} |`);
  });

  it('falls back to the state when the description is only non-ASCII', () => {
    const body = render(combined(storybook({ description: '🎉' })));

    expect(rowFor(body, 'Storybook')).toContain('| ✅ success |');
  });

  it('keeps a description with a newline on one table row', () => {
    const body = render(combined(storybook({ description: 'line one\n| x | y |' })));

    const row = rowFor(body, 'Storybook');
    expect(row).toContain('| ✅ line one x  y  |');
    expect(row.split('|')).toHaveLength(5);
  });

  // The expected substring names the failure category, not the exact prose.
  it.each([
    [[], 'usage'],
    [[SHA], 'usage'],
    [['abc123', RUN_URL], 'not a commit sha'],
    [[SHA.toUpperCase(), RUN_URL], 'not a commit sha'],
    [[SHA, 'https://evil.example/run'], 'not a GitHub run URL'],
    [[SHA, `${RUN_URL}) [x](https://evil.example`], 'not a GitHub run URL'],
  ])('rejects arguments %j', (args, message) => {
    expect(runExpectingFailure(combined(), ...args)).toContain(message);
  });

  it.each([
    ['empty input', ''],
    ['not JSON', 'nope'],
    ['JSON without statuses', '{"message":"Not Found"}'],
  ])('rejects %s on stdin', (_label, input) => {
    expect(runExpectingFailure(input, SHA, RUN_URL)).toContain('combined-status JSON');
  });
});
