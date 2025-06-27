# syv

> practical svelte components and utilities

**syv** is a minimal yet powerful utility library for Svelte — built from patterns I found myself rewriting again and again. It offers a focused set of _essential building blocks_ for UI and app logic, _organized by namespace_ for clean imports, and _fully compatible with both client and server_, without needing to guard with `if (browser)`.

```bash
pnpm add -D syv
```

| Module                                       | Import                  |
| -------------------------------------------- | ----------------------- |
| [`core`](/src/lib/core/index.ts)             | `'syv'`                 |
| [`core/*.svelte`](/src/lib/core)             | `'syv/core/*.svelte'`   |
| [`attachment`](/src/lib/attachment/index.ts) | `'syv/attachment'`      |
| [`loader/*.svelte`](/src/lib/loader)         | `'syv/loader/*.svelte'` |
| [`worker`](/src/lib/worker)                  | `'syv/worker'`          |
| [`options`](/src/lib/options.ts)             | `'syv/options'`         |
| [`types`](/src/lib/types.ts)                 | `'syv/types'`           |

## API

### `syv/worker` - `spawn`/`commander`

The `/worker` submodule provides `spawn` and `commander` functions for creating and managing web workers in Svelte, along with `type Dispatch` for type-safe communication. Use `spawn` to create a worker instance in your `.svelte` file, and `commander` to register commands that the worker can handle.

```ts
// file: src/routes/search.worker.ts
// note: having `.worker` in the filename is optional
//       it just helps to identify the file as a worker
import { commander } from 'syv/worker';

// example of a command payload
type Query = {
	search: string;
	category: string;
	genres: string[];
	sort_by: 'newest' | 'oldest' | 'popular';
};

let dataset: Item[] = [];
const commands = {
	init(payload: Item[]) {
		dataset = payload;
		return true;
	},
	search(payload: Query) {
		// @TODO: do your search logic here
		// `sift` is the helper function
		return sift(dataset, payload);
	},
};

export type Commands = Dispatch<typeof commands>;
addEventListener('message', commander(commands));
```

with the worker defined, you can now use it in your Svelte component(s):

```svelte
<!-- file: src/routes/+page.svelte -->
<script lang="ts">
	import type { Commands } from './search.worker';
	import { spawn } from 'syv/worker';

	const { data } = $props();
	// `invoke` is type-safe with `Commands`
	const invoke = spawn<Commands>(
		new URL('./search.worker', import.meta.url), // relative worker URL
		(invoke) => invoke('init', data.items), // optional, initial call
	);

	// do not call `invoke` directly in the script tag, it will
	// throw a "Worker not ready" error unless you disable SSR.
	// and, make sure to `await` any subsequent `invoke` calls.
</script>

<!-- use `invoke` anywhere inside a function in your markup -->
```

## `*.svelte`

### `syv/core/MetaHead.svelte`

A Svelte component for managing meta tags and custom scripts in the `<head>` of your document. Designed to live in your root `+layout.svelte`, it automatically handles metadata like `title`, `description`, `canonical`, and `alternate` links.

It also supports conditionally loading any external scripts for analytics, performance tracking, and more. Just pass the script URLs and attributes via the `scripts` prop; only entries with truthy values will be included, this is useful for conditionally loading scripts in development or production environments.

```svelte
<!-- file: src/routes/+layout.svelte -->

<script>
	import MetaHead from 'syv/core/MetaHead.svelte';

	// `dev` and `afterNavigate` are optional, only for loading scripts
	import { dev } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	afterNavigate(() => {
		// @ts-expect-error - optional, if you use Vercel Analytics in the scripts
		window.va?.('pageview', { route: page.route.id, url: page.url.pathname });
	});
</script>

<MetaHead
	domain="https://<YOUR_DOMAIN>"
	title="{page.data.meta?.title || page.status} | <YOUR_SITE_NAME>"
	canonical={page.data.meta?.canonical}
	description={page.data.meta?.description}
	authors={['<YOUR_NAME>']}
	alternate={[
		{ type: 'application/rss+xml', href: '/rss.xml', title: 'RSS Feed' },
	]}
	scripts={{
		'/_vercel/insights/script.js': !dev && { 'data-disable-auto-track': '1' },
		'/_vercel/speed-insights/script.js': !dev && { 'data-route': page.route.id },
		'https://static.cloudflareinsights.com/beacon.min.js': !dev && {
			'data-cf-beacon': '{"token": "<YOUR_CF_TOKEN>"}',
		},
	}}
>
	<!-- optionally, define any additional tags manually if you need it  -->
</MetaHead>
```

### `syv/core/Dialog.svelte`

```svelte
<!-- file: src/lib/MyDialog.svelte -->

<script lang="ts">
	import Dialog from 'syv/core/Dialog.svelte';

	import type { ComponentProps } from 'svelte';
	type Props = Omit<ComponentProps<typeof Dialog>, 'children'> & {
		// your own props
	}
	let props: Props = $props();
</script>

<Dialog
	{...props}
	styles={{
		'--backdrop-filter': 'none', // or 'blur(10px)' for a blurred background
		'--background': 'var(--color-base)', // use your own css variables
		'--border-radius': 'var(--rounding-box)', // same as above
		'--padding': '1rem 1.5rem 1.5rem', // adjust padding as needed
	}}
>
	{#snippet children({ forward })}
		<!-- structure your own dialog content here -->
	{/snippet}
</Dialog>

<style>
	/* style your own dialog */
</style>
```
