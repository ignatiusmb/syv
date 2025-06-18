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
| [`options`](/src/lib/options.ts)             | `'syv/options'`         |
| [`types`](/src/lib/types.ts)                 | `'syv/types'`           |

## `syv/core/MetaHead.svelte`

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

## `syv/core/Dialog.svelte`

```svelte
<!-- file: src/lib/MyDialog.svelte -->

<script lang="ts">
	import Dialog from 'syv/core/Dialog.svelte';

	import type { ComponentProps } from 'svelte';
	type Forwarded = ComponentProps<typeof Dialog>;
	interface Props {
		// your own props

		onclose?: Forwarded['onclose'];
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
