# syv

> A small but capable Svelte utility library — built from the pieces I kept rewriting

syv provides essential building blocks for common UI and app patterns.

- 🧩 **Core components** for common patterns:
    - Handle meta tags with `import MetaHead from 'syv/core/MetaHead.svelte'`
    - Lazy-load a component with `import LazyLoad from 'syv/core/LazyLoad.svelte'`
    - Observer element visibility with `import Observe from 'syv/core/Observe.svelte'`
- 🗂️ **Modular by design** — imports are organized by namespace
- 🌐 **SSR-safe** — work seamlessly across client and server, no need to guard with `if (browser)`

## Usage

```bash
pnpm add -D syv
```

## API Documentation

| Module                               | Import                  |
| ------------------------------------ | ----------------------- |
| [`core`](/src/lib/core)              | `'syv'`                 |
| [`core/*.svelte`](/src/lib/core)     | `'syv/core/*.svelte'`   |
| [`attachment`](/src/lib/attachment)  | `'syv/attachment'`      |
| [`action`](/src/lib/api)             | `'syv/action'`          |
| [`loader/*.svelte`](/src/lib/loader) | `'syv/loader/*.svelte'` |
| [`store`](/src/lib/store)            | `'syv/store'`           |
