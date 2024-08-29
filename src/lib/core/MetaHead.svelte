<script lang="ts">
	interface Props {
		title: string;
		domain: string;

		authors?: string[];
		base?: string;
		canonical?: string;
		description?: string;
		keywords?: string[];
		robots?: `${'no' | ''}index,${'no' | ''}follow`;

		alternate?: Array<{ href: string; hreflang: string; type: string; title: string }>;
		scripts?: Array<string | import('mauss/typings').Falsy>;

		/** https://ogp.me/ */
		og?: {
			/** @default title */
			title?: string;
			type: string;
			image: string;
			url: string;

			description?: string;
			locale?: string;
			site_name?: string;
		};

		children?: import('svelte').Snippet;
	}

	let {
		title,
		domain,

		authors = [],
		base,
		canonical,
		description,
		keywords,
		robots,

		alternate = [],
		scripts = [],
		og,
		children,
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>

	{#if base}<base href={base} />{/if}
	{#if canonical}<link rel="canonical" href="{domain}/{canonical}" />{/if}

	{#if description}<meta name="description" content={description} />{/if}
	{#if keywords}<meta name="keywords" content={keywords.join(',')} />{/if}
	{#if robots}<meta name="robots" content={robots} />{/if}

	{#each authors as author}<meta name="author" content={author} />{/each}
	{#each alternate as { href, hreflang, type, title }}
		<link rel="alternate" {href} {hreflang} {type} {title} />
	{/each}

	{#if og}
		<meta property="og:title" content={og.title || title} />
		<meta property="og:type" content={og.type} />
		<meta property="og:image" content={og.image} />
		<meta property="og:url" content={og.url} />

		{#if og.description}<meta property="og:description" content={og.description} />{/if}
		{#if og.locale}<meta property="og:locale" content={og.locale} />{/if}
		{#if og.site_name}<meta property="og:site_name" content={og.site_name} />{/if}
	{/if}

	{#each scripts.filter((s) => typeof s === 'string') as link}
		<script defer src={link}></script>
	{/each}

	{@render children?.()}
</svelte:head>
