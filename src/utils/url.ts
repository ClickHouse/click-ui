const getDocumentBase = (): string | undefined =>
  typeof document === 'undefined' ? undefined : document.baseURI;

/**
 * Returns true when `url` resolves to an http(s) URL.
 *
 * Relative URLs are resolved against `base` (the document base URI in a
 * browser), so `/docs` passes while `javascript:`, `data:` and `mailto:` fail.
 * The URL parser lowercases the scheme, trims leading and trailing whitespace
 * and strips embedded tab/newline characters, so `JAVASCRIPT:`, ` javascript:`
 * and `java\tscript:` variants are rejected too.
 */
export const isHttpUrl = (
  url: string,
  base: string | undefined = getDocumentBase()
): boolean => {
  try {
    const { protocol } = new URL(url, base);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Opens `url` in a new tab.
 *
 * `noopener` stops the new page from reaching back into this one through
 * `window.opener` (reverse tabnabbing). Browsers apply it implicitly for
 * `<a target="_blank">` but not for `window.open`. Non-http(s) URLs are
 * refused with a warning, since a `javascript:` URL would otherwise run in
 * this document's origin.
 */
export const openInNewTab = (url: string): void => {
  if (!isHttpUrl(url)) {
    console.warn(`openInNewTab: refusing to open non-http(s) URL "${url}"`);
    return;
  }
  window.open(url, '_blank', 'noopener');
};
