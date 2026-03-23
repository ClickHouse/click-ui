---
'@clickhouse/click-ui': minor
---

Removes `react-dom/server` `renderToStaticMarkup` from copy grid elements of `Grid` to favour the recommended `createRoot` approach suggested by React's official documentation.

According to React [renderToStaticMarkup](https://react.dev/reference/react-dom/server/renderToStaticMarkup#caveats) "The renderToStaticMarkup works in the browser, but using it in the client code is not recommended. If you need to render a component to HTML in the browser" and React [renderToString](https://react.dev/reference/react-dom/server/renderToString) "Importing react-dom/server on the client unnecessarily increases your bundle size and should be avoided. If you need to render some component to HTML in the browser, use createRoot and read HTML from the DOM".
