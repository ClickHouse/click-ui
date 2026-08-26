// Tokenization of SQL queries with ClickHouse's own lexer compiled to WebAssembly,
// ported from the ClickHouse Web UI (programs/server/play.html in ClickHouse/ClickHouse).

import LEXER_WASM_BASE64 from './lexerWasm';

export interface Token {
  type: number;
  token: string;
}

// Numeric TokenType values, matching the order of the C++ enum in src/Parsers/Lexer.h.
// Only the categories the highlighter classifies are named; the same table is used by
// the Web UI and by the documentation highlighter.
export const TT = {
  Whitespace: 0,
  Comment: 1,
  BareWord: 2,
  Number: 3,
  StringLiteral: 4,
  QuotedIdentifier: 5,
  OpeningRoundBracket: 6,
  ClosingRoundBracket: 7,
  OpeningSquareBracket: 8,
  ClosingSquareBracket: 9,
  OpeningCurlyBrace: 10,
  ClosingCurlyBrace: 11,
  Comma: 12,
  Semicolon: 13,
  Asterisk: 16,
  HereDoc: 17,
  DollarSign: 18,
  Plus: 19,
  Minus: 20,
  Slash: 21,
  Percent: 22,
  Arrow: 23,
  QuestionMark: 24,
  Colon: 25,
  Caret: 26,
  DoubleColon: 27,
  Equals: 28,
  NotEquals: 29,
  Less: 30,
  Greater: 31,
  LessOrEquals: 32,
  GreaterOrEquals: 33,
  Spaceship: 34,
  PipeMark: 35,
  Concatenation: 36,
  At: 37,
  DoubleAt: 38,
} as const;

interface LexerExports {
  memory: WebAssembly.Memory;
  __heap_base: WebAssembly.Global;
  clickhouse_lexer_size: WebAssembly.Global;
  clickhouse_lexer_create: (
    lexer: number,
    queryBegin: number,
    queryEnd: number,
    maxQuerySize: number
  ) => void;
  clickhouse_lexer_next_token: (
    lexer: number,
    tokenBegin: number,
    tokenEnd: number
  ) => number;
  clickhouse_lexer_token_is_error: (tokenType: number) => number;
  clickhouse_lexer_token_is_end: (tokenType: number) => number;
}

let lexerExports: LexerExports | null = null;
let lexerPromise: Promise<void> | null = null;

export const lexerIsReady = (): boolean => {
  return lexerExports !== null;
};

// Instantiate the embedded Lexer.wasm exactly once and cache the exports.
export const loadLexer = (): Promise<void> => {
  if (!lexerPromise) {
    lexerPromise = (async () => {
      if (
        typeof WebAssembly !== 'object' ||
        typeof WebAssembly.instantiate !== 'function'
      ) {
        throw new Error('WebAssembly is not available');
      }
      const binary = atob(LEXER_WASM_BASE64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }
      const module = await WebAssembly.instantiate(bytes);
      lexerExports = module.instance.exports as unknown as LexerExports;
    })();
    // Allow a later caller to retry if instantiation failed.
    lexerPromise.catch(() => {
      lexerPromise = null;
    });
  }
  return lexerPromise;
};

// Tokenize a query with the WASM lexer. The module must already be instantiated
// (await `loadLexer()` first); throws when it is not, or when the token stream is
// corrupted. The returned tokens tile the input exactly, whitespace and comments
// included, except for a tail the lexer could not process (it stops at the first
// error token).
export const tokenizeSync = (query: string): Token[] => {
  if (!lexerExports) {
    throw new Error('The SQL lexer is not loaded');
  }
  const exports = lexerExports;

  // Lay out the buffers this function owns (the lexer object, the query bytes and the
  // two token out-pointers) starting at `__heap_base`, NOT at offset 0: the module's
  // own shadow stack occupies the low memory up to `__heap_base` and its call frames
  // grow DOWN from there, so a buffer placed below that boundary is silently
  // overwritten by the lexer's own calls once the query is large enough to reach the
  // frame region (~64 KiB). See the same layout in play.html.
  const bytes = new TextEncoder().encode(query);
  let memoryOffset = exports.__heap_base.value as number;

  const lexerOffset = memoryOffset;
  memoryOffset += exports.clickhouse_lexer_size.value as number;

  const queryBegin = memoryOffset;
  memoryOffset += bytes.length;
  const queryEnd = memoryOffset;

  const tokenBegin = memoryOffset;
  memoryOffset += 4;
  const tokenEnd = memoryOffset;
  memoryOffset += 4;

  // Grow the memory when the query does not fit above `__heap_base`. Growth detaches
  // the previous `ArrayBuffer`, so the buffer is read only after this point.
  if (memoryOffset > exports.memory.buffer.byteLength) {
    exports.memory.grow(
      Math.ceil((memoryOffset - exports.memory.buffer.byteLength) / 65536)
    );
  }
  const { buffer } = exports.memory;

  new Uint8Array(buffer, queryBegin, bytes.length).set(bytes);

  // `max_query_size = 0` means no limit, so the token stream always covers the whole
  // text instead of flagging every token crossing an arbitrary boundary as an error.
  exports.clickhouse_lexer_create(lexerOffset, queryBegin, queryEnd, 0);

  const decoder = new TextDecoder();
  const result: Token[] = [];
  let previousEnd = queryBegin;

  for (;;) {
    const tokenType = exports.clickhouse_lexer_next_token(
      lexerOffset,
      tokenBegin,
      tokenEnd
    );
    if (
      exports.clickhouse_lexer_token_is_error(tokenType) ||
      exports.clickhouse_lexer_token_is_end(tokenType)
    ) {
      break;
    }

    const view = new DataView(buffer);
    const begin = view.getUint32(tokenBegin, true);
    const end = view.getUint32(tokenEnd, true);

    // The tokens of a query are contiguous, so every token must advance. A token that
    // does not says the lexer state is corrupted; throwing turns a would-be hang into
    // an exception the caller translates into "no highlighting".
    if (end <= previousEnd) {
      throw new Error(
        `SQL lexer stopped advancing at offset ${end - queryBegin} of ${bytes.length}`
      );
    }
    previousEnd = end;

    result.push({
      type: tokenType,
      token: decoder.decode(new Uint8Array(buffer, begin, end - begin)),
    });
  }

  return result;
};
