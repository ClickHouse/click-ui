import { useEffect, useMemo, useState } from 'react';
import { lexerIsReady, loadLexer } from './lexer';
import { highlightSql, SqlLine } from './highlight';

// Highlight `code` with the ClickHouse WASM lexer. Returns null while the lexer is
// still instantiating, when it is unavailable (no WebAssembly) or when tokenization
// fails — the component then falls back to the generic highlight.js rendering, so a
// block is never left unstyled.
const useClickHouseSql = (code: string, enabled: boolean): SqlLine[] | null => {
  const [ready, setReady] = useState(lexerIsReady());

  useEffect(() => {
    if (!enabled || ready) {
      return;
    }
    let cancelled = false;
    loadLexer().then(
      () => {
        if (!cancelled) {
          setReady(true);
        }
      },
      error => {
        // No WebAssembly (or a failed instantiation): keep the fallback rendering.
        console.error('Failed to load the ClickHouse SQL lexer:', error);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [enabled, ready]);

  return useMemo(() => {
    if (!enabled || !ready) {
      return null;
    }
    try {
      return highlightSql(code);
    } catch (error) {
      console.error(
        'SQL tokenization failed, falling back to generic highlighting:',
        error
      );
      return null;
    }
  }, [code, enabled, ready]);
};

export default useClickHouseSql;
