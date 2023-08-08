<script lang="ts">
	import { Link } from '../icons/feather';
	import Feather from '../icons/Feather.svelte';
	import Edit from './lib/Edit.svelte';

	export let sections: Record<'slug' | 'title' | 'content' | 'path', string>[];
	export let repo: string;

	let anchor = false;
</script>

<main>
	<aside>
		{#each sections as { slug, title }, i}
			{@const index = `0${i + 1}`.slice(-2)}
			<a href="#{slug}" data-index={index}>{title}</a>
		{/each}
	</aside>

	<article>
		{#each sections as { slug, title, content, path }}
			<section>
				<h2
					id={slug}
					class:anchor
					on:mouseenter={() => (anchor = true)}
					on:mouseleave={() => (anchor = false)}
				>
					<a href="#{slug}">
						<Feather icon={Link} />
					</a>
					<span>{title}</span>
					<Edit {repo} {path} />
				</h2>
				{@html content}
			</section>
		{/each}
	</article>
</main>

<style>
	main {
		display: grid;
		gap: 2em;
		grid-template-columns: minmax(0, 1fr);
		align-items: flex-start;
		padding: 0 2em;
		margin: 2em auto;
	}
	aside {
		position: sticky;
		top: 0;
		display: none;
		align-content: flex-start;
		padding-top: 2em;
	}
	aside a {
		line-height: 4ch;
	}
	aside a::before {
		content: attr(data-index);
		margin-right: 0.75em;
		font-family: var(--aqua-monospace);
	}
	article {
		padding-top: 2em;
	}
	section:not(:first-child) {
		margin-top: 4em;
		padding-top: 1em;
		border-top: 0.25em solid var(--aqua-primary);
	}
	section h2 {
		position: relative;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5em;
		text-transform: uppercase;
		font-family: var(--aqua-heading);
		font-size: 2rem;
		font-weight: bold;
	}
	section h2 > :global(a:first-child) {
		position: absolute;
		top: 50%;
		left: -0.15em;
		display: flex;
		transform: translate(-95%, -50%);
		transition: opacity 240ms;
		opacity: 0;
	}
	section h2.anchor > :global(a:first-child) {
		opacity: 1;
	}
	section h2 + :global(h3:first-of-type) {
		padding-top: 0;
		margin-top: 0;
		border-top: 0;
	}
	section :global(h3) {
		position: relative;
		display: grid;
		gap: 0.5em;
		grid-template-columns: auto auto 1fr;
		align-items: center;
		margin: 2em 0 1em;
		font-size: 1.5rem;
		font-weight: 500;
	}
	section :global(h3::before) {
		content: '';
		width: 0.5em;
		height: 0.5em;
		border-radius: 50%;
		margin-left: 0.25em;
		box-shadow: 0 0 0 0.25em rgba(0, 112, 187, 0.6);
		background-color: var(--aqua-primary);
	}
	section :global(h3::after) {
		content: '';
		width: 100%;
		height: 0.15em;
		background-color: rgba(0, 112, 187, 0.6);
	}
	section :global(p) {
		margin-bottom: 1em;
		line-height: 1.5;
	}
	section :global(.aqua.code-box) {
		margin-top: 0;
		margin-bottom: 1.5em;
	}
	@media only screen and (min-width: 769px) {
		main {
			grid-template-columns: minmax(12em, 20%) minmax(0, 60em);
		}
		aside {
			display: grid;
		}
	}
</style>
