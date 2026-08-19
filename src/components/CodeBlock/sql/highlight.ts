// Static SQL syntax highlighting driven by ClickHouse's own lexer (compiled to WASM).
// The token classification, the rainbow parentheses and the digit-group underline are
// ported from the ClickHouse Web UI (programs/server/play.html in ClickHouse/ClickHouse)
// and mirror `clickhouse-client`; the cursor-dependent features of the Web UI (matched
// bracket emphasis, matching-identifier underline) do not apply to a read-only block.

import { Token, TT, tokenizeSync } from './lexer';

// The classification of a single rendered span. Brackets carry their rainbow color
// index instead ('bracket0'..'bracket6').
export type SqlTokenKind =
  | 'keyword'
  | 'identifier'
  | 'function'
  | 'number'
  | 'string'
  | 'quotedIdentifier'
  | 'comment'
  | 'operator'
  | 'error'
  | 'bracket0'
  | 'bracket1'
  | 'bracket2'
  | 'bracket3'
  | 'bracket4'
  | 'bracket5'
  | 'bracket6';

// Stable class names for the rendered spans, the same ones the ClickHouse Web UI uses
// (`q-kw`, `q-id`, ...), so the highlighting can be targeted from tests and user CSS.
export const SQL_KIND_CLASS: Record<SqlTokenKind, string> = {
  keyword: 'q-kw',
  identifier: 'q-id',
  function: 'q-fn',
  number: 'q-num',
  string: 'q-str',
  quotedIdentifier: 'q-qid',
  comment: 'q-com',
  operator: 'q-op',
  error: 'q-err',
  bracket0: 'q-br0',
  bracket1: 'q-br1',
  bracket2: 'q-br2',
  bracket3: 'q-br3',
  bracket4: 'q-br4',
  bracket5: 'q-br5',
  bracket6: 'q-br6',
};

export interface SqlSpan {
  text: string;
  kind?: SqlTokenKind;
  // Digit-group separator inside a number: this single digit is underlined.
  underline?: boolean;
}

// One array of spans per source line; the line break itself is not included.
export type SqlLine = SqlSpan[];

// SQL keywords recognized for highlighting. The lexer reports them as BareWord, so we
// disambiguate identifiers from keywords here. Comparisons are case-insensitive.
// Kept in sync with play.html.
const SQL_KEYWORDS = new Set([
  'ADD',
  'AFTER',
  'ALL',
  'ALTER',
  'AND',
  'ANTI',
  'ANY',
  'ARRAY',
  'AS',
  'ASC',
  'ASCENDING',
  'ASOF',
  'AST',
  'ASYNC',
  'ATTACH',
  'BACKUP',
  'BEGIN',
  'BETWEEN',
  'BOTH',
  'BY',
  'CACHE',
  'CASCADE',
  'CASE',
  'CAST',
  'CHANGE',
  'CHANGED',
  'CHECK',
  'CLEAR',
  'CLUSTER',
  'CODEC',
  'COLLATE',
  'COLUMN',
  'COLUMNS',
  'COMMENT',
  'COMMIT',
  'CONSTRAINT',
  'CREATE',
  'CROSS',
  'CUBE',
  'CURRENT',
  'DATABASE',
  'DATABASES',
  'DAY',
  'DEDUPLICATE',
  'DEFAULT',
  'DELETE',
  'DESC',
  'DESCENDING',
  'DESCRIBE',
  'DETACH',
  'DICTIONARIES',
  'DICTIONARY',
  'DISK',
  'DISTINCT',
  'DISTRIBUTED',
  'DROP',
  'ELSE',
  'END',
  'ENGINE',
  'ESTIMATE',
  'EVENTS',
  'EXCEPT',
  'EXCHANGE',
  'EXISTS',
  'EXPLAIN',
  'EXPRESSION',
  'EXTENDED',
  'EXTRACT',
  'FALSE',
  'FETCH',
  'FETCHES',
  'FILE',
  'FILESYSTEM',
  'FINAL',
  'FIRST',
  'FLUSH',
  'FOLLOWING',
  'FOR',
  'FOREIGN',
  'FORMAT',
  'FREEZE',
  'FROM',
  'FULL',
  'FUNCTION',
  'GLOBAL',
  'GRANT',
  'GROUP',
  'GROUPS',
  'HAVING',
  'HIERARCHICAL',
  'HOUR',
  'ID',
  'IDENTIFIED',
  'IF',
  'ILIKE',
  'IN',
  'INDEX',
  'INF',
  'INHERIT',
  'INJECTIVE',
  'INNER',
  'INSERT',
  'INTERSECT',
  'INTERVAL',
  'INTO',
  'INVISIBLE',
  'IS',
  'IS_OBJECT_ID',
  'JOIN',
  'KEY',
  'KEYED',
  'KILL',
  'LAST',
  'LATERAL',
  'LAYOUT',
  'LEADING',
  'LEFT',
  'LIFETIME',
  'LIKE',
  'LIMIT',
  'LIMITS',
  'LIVE',
  'LOCAL',
  'LOGS',
  'MATERIALIZE',
  'MATERIALIZED',
  'MAX',
  'MERGES',
  'MICROSECOND',
  'MILLISECOND',
  'MIN',
  'MINUTE',
  'MODIFY',
  'MONTH',
  'MOVE',
  'MUTATION',
  'NAN_SQL',
  'NEXT',
  'NO',
  'NONE',
  'NOT',
  'NULL',
  'NULLS',
  'OFFSET',
  'ON',
  'ONLY',
  'OPTIMIZE',
  'OPTION',
  'OR',
  'ORDER',
  'OUTER',
  'OUTFILE',
  'OVER',
  'PARTITION',
  'PASTE',
  'PERMANENTLY',
  'PLAN',
  'POPULATE',
  'PRECEDING',
  'PRECISION',
  'PREWHERE',
  'PRIMARY',
  'PROFILE',
  'PROJECTION',
  'QUARTER',
  'QUERY',
  'QUOTA',
  'RANDOMIZED',
  'RANGE',
  'RECURSIVE',
  'REFRESH',
  'REGEXP',
  'RELOAD',
  'REMOTE',
  'RENAME',
  'REPLACE',
  'REPLICA',
  'REPLICAS',
  'RESET',
  'RESTORE',
  'RESTRICT',
  'RESTRICTIVE',
  'RETURNS',
  'REVOKE',
  'RIGHT',
  'ROLE',
  'ROLLBACK',
  'ROLLUP',
  'ROW',
  'ROWS',
  'SAMPLE',
  'SECOND',
  'SELECT',
  'SEMI',
  'SENDS',
  'SET',
  'SETS',
  'SETTINGS',
  'SHARD',
  'SHOW',
  'SIGNED',
  'SOURCE',
  'SQL_SECURITY',
  'START',
  'STEP',
  'STORAGE',
  'STRICT',
  'STRICTLY_ASCENDING',
  'SUBPARTITION',
  'SUBSTRING',
  'SUSPEND',
  'SYNC',
  'SYNTAX',
  'SYSTEM',
  'TABLE',
  'TABLES',
  'TEMPORARY',
  'TEST',
  'THEN',
  'TIES',
  'TIMESTAMP',
  'TO',
  'TOP',
  'TOTALS',
  'TRACKING',
  'TRAILING',
  'TRANSACTION',
  'TRIGGER',
  'TRIM',
  'TRUE',
  'TRUNCATE',
  'TYPE',
  'UNBOUNDED',
  'UNFREEZE',
  'UNION',
  'UNIQUE',
  'UNSIGNED',
  'UPDATE',
  'USE',
  'USING',
  'UUID',
  'VALUES',
  'VARYING',
  'VIEW',
  'VIRTUAL',
  'VISIBLE',
  'WATCH',
  'WEEK',
  'WHEN',
  'WHERE',
  'WINDOW',
  'WITH',
  'WORK',
  'WRITABLE',
  'XOR',
  'YEAR',
  'ZKPATH',
]);

// Bracket token types, grouped by kind, for rainbow parentheses (coloring by nesting
// depth).
const OPENING_BRACKETS = new Set<number>([
  TT.OpeningRoundBracket,
  TT.OpeningSquareBracket,
  TT.OpeningCurlyBrace,
]);
const CLOSING_BRACKETS = new Set<number>([
  TT.ClosingRoundBracket,
  TT.ClosingSquareBracket,
  TT.ClosingCurlyBrace,
]);
// The closing type that matches each opening type.
const BRACKET_PAIR: Record<number, number> = {
  [TT.OpeningRoundBracket]: TT.ClosingRoundBracket,
  [TT.OpeningSquareBracket]: TT.ClosingSquareBracket,
  [TT.OpeningCurlyBrace]: TT.ClosingCurlyBrace,
};
// Number of distinct rainbow colors before the cycle repeats.
export const RAINBOW_BRACKET_COUNT = 7;

// Map a single token to its kind. For BareWords we also peek at the next
// non-whitespace, non-comment token to distinguish a function call (`foo(`) from a
// plain identifier — the lexer alone cannot tell them apart. Skipping comments as well
// as whitespace matches `highlightWithLexer` in `src/Client/ClientBaseHelpers.cpp`, so
// `sum/*c*/(x)` is a function name here too.
const tokenKind = (tokens: Token[], i: number): SqlTokenKind | undefined => {
  const elem = tokens[i];
  switch (elem.type) {
    case TT.Comment:
      return 'comment';
    case TT.Number:
      return 'number';
    case TT.StringLiteral:
    case TT.HereDoc:
      return 'string';
    case TT.QuotedIdentifier:
      return 'quotedIdentifier';
    case TT.BareWord: {
      if (SQL_KEYWORDS.has(elem.token.toUpperCase())) {
        return 'keyword';
      }
      for (let j = i + 1; j < tokens.length; j += 1) {
        if (tokens[j].type !== TT.Whitespace && tokens[j].type !== TT.Comment) {
          return tokens[j].type === TT.OpeningRoundBracket ? 'function' : 'identifier';
        }
      }
      return 'identifier';
    }
    case TT.Asterisk:
    case TT.Plus:
    case TT.Minus:
    case TT.Slash:
    case TT.Percent:
    case TT.Arrow:
    case TT.QuestionMark:
    case TT.Colon:
    case TT.DoubleColon:
    case TT.Caret:
    case TT.Equals:
    case TT.NotEquals:
    case TT.Less:
    case TT.Greater:
    case TT.LessOrEquals:
    case TT.GreaterOrEquals:
    case TT.Spaceship:
    case TT.PipeMark:
    case TT.Concatenation:
    case TT.At:
    case TT.DoubleAt:
    case TT.DollarSign:
      return 'operator';
    default:
      return undefined;
  }
};

// Compute, for every token, its rainbow-bracket depth (-1 for non-brackets and for
// unmatched brackets).
//
// Depth is assigned with a type-aware stack, but only once a bracket has a real mate:
// the matching opening and closing brackets both take the pair's nesting depth so they
// share a color. A bracket without a counterpart is left at depth -1 so it keeps the
// default color, mirroring `clickhouse-client`. Once the nesting is broken (a closer
// that does not match the innermost opener), the outstanding openers are discarded so a
// later closer cannot reach over the break — e.g. `SELECT ([)]` colors nothing.
const computeBracketDepth = (tokens: Token[]): number[] => {
  const depth = new Array(tokens.length).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < tokens.length; i += 1) {
    const { type } = tokens[i];
    if (OPENING_BRACKETS.has(type)) {
      stack.push(i);
    } else if (CLOSING_BRACKETS.has(type)) {
      const top = stack.length ? stack[stack.length - 1] : -1;
      if (top >= 0 && BRACKET_PAIR[tokens[top].type] === type) {
        stack.pop();
        depth[i] = stack.length;
        depth[top] = stack.length;
      } else if (top >= 0) {
        stack.length = 0;
      }
    }
  }

  return depth;
};

// For a plain decimal number token, return the sorted character indices to underline as
// digit-group separators. Mirrors `clickhouse-client`: only the integer part of a
// regular base-10 number (no exponent, hex/bin prefix, or `_` separators) is
// considered, and only when it has at least 5 digits; then one digit is underlined at
// each group-of-three boundary counting from the right (before the decimal point).
const digitGroupUnderlines = (token: string): number[] => {
  const result: number[] = [];
  let finished = false; // Passed the decimal point.
  let first = -1;
  let last = -1;

  for (let i = 0; i < token.length; i += 1) {
    const c = token[i];
    if (c >= '0' && c <= '9') {
      if (!finished) {
        if (first < 0) {
          first = i;
        }
        last = i;
      }
    } else if (c === '.') {
      finished = true;
    } else if (c !== '-') {
      // Exponent, hex/bin, or `_` separators: not a plain number, do not highlight.
      return [];
    }
  }

  if (first >= 0 && last >= 0) {
    const length = 1 + last - first;
    if (length >= 5) {
      for (let off = length - 4; off >= 0; off -= 3) {
        result.push(first + off);
      }
    }
  }
  return result.sort((a, b) => a - b);
};

// Split a number token into spans so each digit-group separator digit gets its own
// underlined span.
const numberSpans = (token: string): SqlSpan[] => {
  const underlines = digitGroupUnderlines(token);
  if (underlines.length === 0) {
    return [{ text: token, kind: 'number' }];
  }
  const spans: SqlSpan[] = [];
  let from = 0;
  underlines.forEach(idx => {
    if (idx > from) {
      spans.push({ text: token.slice(from, idx), kind: 'number' });
    }
    spans.push({ text: token[idx], kind: 'number', underline: true });
    from = idx + 1;
  });
  if (from < token.length) {
    spans.push({ text: token.slice(from), kind: 'number' });
  }
  return spans;
};

// Append a possibly multi-line span to `lines`, starting a new line at each '\n'.
// The line breaks themselves are not stored.
const pushSpan = (lines: SqlLine[], span: SqlSpan): void => {
  const parts = span.text.split('\n');
  parts.forEach((part, i) => {
    if (i > 0) {
      lines.push([]);
    }
    if (part) {
      lines[lines.length - 1].push({ ...span, text: part });
    }
  });
};

// Tokenize `text` with the ClickHouse lexer (which must already be loaded, see
// `loadLexer`) and classify every token. Any tail the lexer could not process is
// returned as a single 'error' span. Throws when the lexer is not loaded or its
// state is corrupted; the caller falls back to unhighlighted rendering.
export const highlightSql = (text: string): SqlLine[] => {
  const tokens = tokenizeSync(text);
  const depth = computeBracketDepth(tokens);

  const lines: SqlLine[] = [[]];
  let offset = 0;

  for (let i = 0; i < tokens.length; i += 1) {
    const { token, type } = tokens[i];
    offset += token.length;

    if (type === TT.Number) {
      numberSpans(token).forEach(span => pushSpan(lines, span));
      continue;
    }

    // Brackets are colored by nesting depth (rainbow) rather than by the generic
    // token kind.
    const kind =
      depth[i] >= 0
        ? (`bracket${depth[i] % RAINBOW_BRACKET_COUNT}` as SqlTokenKind)
        : tokenKind(tokens, i);
    pushSpan(lines, { text: token, kind });
  }

  // Any tail not covered by tokens (the lexer hit an error) is shown with the error
  // style.
  if (offset < text.length) {
    pushSpan(lines, { text: text.slice(offset), kind: 'error' });
  }

  return lines;
};
