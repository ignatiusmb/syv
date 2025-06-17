<script lang="ts">
	import type { Falsy, Nullish } from 'mauss/typings';

	export interface Props {
		/** The primary domain used to construct absolute URLs. */
		domain: string;
		/** The document title, used in `<title>` and relevant meta tags. */
		title: string;

		/** Base path used to resolve relative URLs, such as images or links. */
		base?: string;
		/**
		 * The canonical path of the current page.
		 * Will be prefixed with `domain` to form the full canonical URL.
		 * Must begin with a leading slash. Use `/` to indicate the root path.
		 *
		 * @example "/posts/article-slug-123"
		 */
		canonical: string;
		/** Short description of the page for SEO and social sharing. */
		description?: string;
		/** List of authors for this page or article. */
		authors?: string[];
		/** Relevant keywords for SEO. */
		keywords?: string[];

		/**
		 * Robots directives for search engines.
		 * Controls indexing and link-following behavior.
		 *
		 * @example "index,follow"
		 * @example "noindex,nofollow"
		 */
		robots?: `${'no' | ''}index,${'no' | ''}follow`;

		/**
		 * List of alternate representations of this page.
		 * Typically used for alternate languages or content types (e.g. RSS, Atom).
		 *
		 * @example [{ href: '/rss.xml', type: 'application/rss+xml', title: 'RSS Feed' }]
		 */
		alternate?: Array<{ href: string; type: string; title: string }>;

		/**
		 * JSON-LD structured data, usually for rich results in search engines.
		 * Passed directly into a `<script type="application/ld+json">` with `JSON.stringify()`.
		 * Should be a valid JSON object.
		 */
		jsonld?: Record<string, any>;

		/**
		 * Additional custom scripts to be injected.
		 * Each key becomes a unique `<script>` tag.
		 * A `Falsy` value (e.g. `false`, `undefined`, `null`) disables that script.
		 * Script tag attributes are defined via an object.
		 *
		 * @example
		 * {
		 * 	'/_vercel/insights/script.js': !dev && { 'data-disable-auto-track': '1' },
		 * 	'/_vercel/speed-insights/script.js': !dev && { 'data-route': page.route.id },
		 * 	'https://static.cloudflareinsights.com/beacon.min.js': !dev && {
		 * 		'data-cf-beacon': '{"token": "<YOUR_CF_TOKEN>"}',
		 * 	},
		 * }
		 */
		scripts?: Record<string, Falsy | { [attributes: string]: string | Nullish }>;

		/** @see https://ogp.me */
		og?: {
			site_name: string;
			url?: string;
			title?: string;
			description?: string;
			type?: string;
			image?: string;
			locale?: string;
		};

		children?: import('svelte').Snippet;
	}

	let {
		domain,
		title,

		base,
		canonical,
		description,
		keywords,
		robots,
		authors = [],

		alternate = [],
		og,
		jsonld = {},
		scripts = {},
		children,
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>

	{#if base}<base href={base} />{/if}
	<link rel="canonical" href={domain + canonical} />

	{#if description}<meta name="description" content={description} />{/if}
	{#if keywords}<meta name="keywords" content={keywords.join(',')} />{/if}
	{#if robots}<meta name="robots" content={robots} />{/if}
	{#each authors as author}<meta name="author" content={author} />{/each}

	{#each alternate as { href, type, title }}
		<link rel="alternate" {href} {type} {title} />
	{/each}

	{#if og}
		{@const { site_name, url, title: heading, type, locale, ...rest } = og}
		<meta property="og:site_name" content={site_name} />
		<meta property="og:url" content={domain + url} />
		<meta property="og:title" content={heading || title} />
		<meta property="og:type" content={type || 'website'} />
		<meta property="og:locale" content={locale || 'en'} />
		{#each Object.entries(rest) as [key, content]}
			<meta property="og:{key}" {content} />
		{/each}
	{/if}

	{#if Object.keys(jsonld).length}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`}
	{/if}

	{#each Object.entries(scripts) as [link, attributes]}
		{#if attributes}<script defer src={link} {...attributes}></script>{/if}
	{/each}

	{@render children?.()}
</svelte:head>
