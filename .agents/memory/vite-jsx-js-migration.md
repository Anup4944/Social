---
name: Vite migration for CRA .js JSX files
description: How to configure Vite to handle CRA projects where JSX lives in .js files (not .jsx).
---

## The Rule
When migrating a CRA project to Vite where JSX is written in `.js` files, you need BOTH:
1. A custom Vite plugin using `transformWithEsbuild` with `{ loader: "jsx", jsx: "automatic" }`
2. `optimizeDeps.esbuildOptions.loader: { ".js": "jsx" }` for pre-bundling

## Why
Vite's `@vitejs/plugin-react` only processes `.jsx` files by default. Files with `.js` extension containing JSX are passed directly to esbuild, which fails to parse them. Additionally, if you only use `loader: "jsx"` without `jsx: "automatic"`, esbuild transforms JSX as `React.createElement(...)` — causing "React is not defined" crashes in components that don't explicitly `import React`.

## How to Apply
Use this vite.config.js pattern for any CRA→Vite migration where source files use `.js`:

```js
import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, { loader: "jsx", jsx: "automatic" });
      },
    },
    react({ jsxRuntime: "automatic" }),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: { loader: { ".js": "jsx" } },
  },
});
```
