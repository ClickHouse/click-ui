import { afterEach, describe, expect, it, vitest } from 'vitest';
import { isHttpUrl, openInNewTab } from './url';

describe('isHttpUrl', () => {
  it('accepts absolute http and https URLs', () => {
    expect(isHttpUrl('http://example.com')).toBe(true);
    expect(isHttpUrl('http://localhost:3000')).toBe(true);
    expect(isHttpUrl('https://clickhouse.com/docs?x=1#top')).toBe(true);
    expect(isHttpUrl('HTTPS://EXAMPLE.COM')).toBe(true);
  });

  it('accepts relative URLs by resolving them against the document base', () => {
    expect(isHttpUrl('/docs/foo')).toBe(true);
    expect(isHttpUrl('docs/foo')).toBe(true);
    expect(isHttpUrl('?tab=1')).toBe(true);
    expect(isHttpUrl('#top')).toBe(true);
    expect(isHttpUrl('//cdn.example.com/asset')).toBe(true);
  });

  it('treats an empty string as the current document (callers guard for emptiness)', () => {
    expect(isHttpUrl('')).toBe(true);
  });

  it('uses the given base when one is passed', () => {
    expect(isHttpUrl('/docs', 'https://app.example.com')).toBe(true);
    expect(isHttpUrl('/docs', 'ftp://files.example.com')).toBe(false);
  });

  it('rejects non-http(s) schemes, including case and whitespace variants', () => {
    expect(isHttpUrl('javascript:alert(1)')).toBe(false);
    expect(isHttpUrl('JavaScript:alert(1)')).toBe(false);
    expect(isHttpUrl(' javascript:alert(1)')).toBe(false);
    expect(isHttpUrl('java\tscript:alert(1)')).toBe(false);
    expect(isHttpUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isHttpUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isHttpUrl('file:///etc/passwd')).toBe(false);
    expect(isHttpUrl('ftp://example.com')).toBe(false);
    expect(isHttpUrl('mailto:hello@example.com')).toBe(false);
    expect(isHttpUrl('about:blank')).toBe(false);
    expect(isHttpUrl('blob:https://example.com/uuid')).toBe(false);
  });

  it('rejects URLs that cannot be parsed', () => {
    expect(isHttpUrl('https://')).toBe(false);
    expect(isHttpUrl('http://exa mple.com')).toBe(false);
  });

  it('rejects relative URLs when there is no document to resolve against', () => {
    vitest.stubGlobal('document', undefined);
    try {
      expect(isHttpUrl('/docs')).toBe(false);
      expect(isHttpUrl('https://example.com')).toBe(true);
    } finally {
      vitest.unstubAllGlobals();
    }
  });
});

describe('openInNewTab', () => {
  afterEach(() => {
    vitest.restoreAllMocks();
  });

  it('opens http(s) URLs in a new tab without exposing window.opener', () => {
    const openSpy = vitest.spyOn(window, 'open').mockImplementation(() => null);

    openInNewTab('https://clickhouse.com');

    expect(openSpy).toHaveBeenCalledWith('https://clickhouse.com', '_blank', 'noopener');
  });

  it('opens relative URLs', () => {
    const openSpy = vitest.spyOn(window, 'open').mockImplementation(() => null);

    openInNewTab('/docs');

    expect(openSpy).toHaveBeenCalledWith('/docs', '_blank', 'noopener');
  });

  it('refuses non-http(s) URLs and warns', () => {
    const openSpy = vitest.spyOn(window, 'open').mockImplementation(() => null);
    const warnSpy = vitest.spyOn(console, 'warn').mockImplementation(() => undefined);

    openInNewTab('javascript:alert(1)');

    expect(openSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('javascript:alert(1)');
  });
});
