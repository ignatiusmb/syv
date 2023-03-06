# Syv ![Total npm downloads](https://img.shields.io/npm/dt/syv) &middot; ![Published npm version](https://img.shields.io/npm/v/syv) ![Monthly npm downloads](https://img.shields.io/npm/dm/syv) ![License](https://img.shields.io/github/license/ignatiusmb/syv) [![Made with Svelte](https://img.shields.io/badge/made%20with-Svelte-ff3e00)](https://svelte.dev/)

> The Svelte Complementary Library, a multipurpose library for working with Svelte.

- Provides most of the essential components that are usually rewritten in a new project
  - Need to lazy-load a component? `import { LazyLoad } from 'syv/core';`
  - Need to see if an element is in view? `import { Observe } from 'syv/core';`
- Prepackaged customizable set of icons from various sources, import from `syv/icons`
- Built-in loaders that are ready-to-use anywhere transitions are needed, import from `syv/loader`
- Imports are modularized into their own namespaces and provides intuitive API for a nice usage with Svelte
- All modules works for both client-side and server-side, no need to short-circuit or guard your code with `if (browser)`

## Usage

```bash
pnpm add -D syv
```

## API Documentation

| Module                      | Import         |
| --------------------------- | -------------- |
| [`core`](/src/lib/core)     | `'syv'`        |
| [`action`](/src/lib/api)    | `'syv/action'` |
| [`icons`](/src/lib/icons)   | `'syv/icons'`  |
| [`loader`](/src/lib/loader) | `'syv/loader'` |
| [`store`](/src/lib/store)   | `'syv/store'`  |

***

<h3 align="center"><pre>Syv | <a href="LICENSE">MIT License</a></pre></h3>
