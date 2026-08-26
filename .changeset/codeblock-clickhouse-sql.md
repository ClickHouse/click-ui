---
"@clickhouse/click-ui": minor
---

CodeBlock now highlights SQL with ClickHouse's own lexer compiled to WebAssembly — the same tokenization, classification (keywords, functions vs. identifiers, strings, numbers, quoted identifiers, comments), rainbow brackets and digit-group underlines as the ClickHouse Web UI and clickhouse-client. Other languages, and environments without WebAssembly, keep the previous highlight.js rendering.
