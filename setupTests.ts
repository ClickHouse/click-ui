// Use the node: prefix explicitly — the browserify `util` package in node_modules
// shadows the built-in module and exports no TextEncoder/TextDecoder, so a plain
// `import from "util"` silently assigns undefined here.
import { TextDecoder, TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
