<script lang="ts">
	import { hydrate } from 'marqua/browser';
	import { debounce } from 'mauss';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { version } from '../../package.json';

	export let repo: string;
	export let sections: Array<{
		slug: string;
		title: string;
		content: string;
	}>;

	onMount(() => {
		const [html] = Array.from(document.getElementsByTagName('html'));
		html.style.setProperty('scroll-behavior', 'smooth');

		const sections = Array.from(document.querySelectorAll('main h2[id]'));
		const check = debounce(() => {
			const height = document.body.offsetHeight - window.innerHeight;
			for (let i = sections.length - 1; i >= 0; i--) {
				const { top } = sections[i].getBoundingClientRect();
				const multiplied = 256 * (+(i === 0) + 1);
				const heuristics = /* change hash when all applies */ [
					top > multiplied, // top of next sibling is far enough
					window.scrollY < height, // scroll is not at the end of page
				];
				if (heuristics.every((h) => h)) continue;
				if (location.hash !== `#${sections[i].id}`) {
					goto(`#${sections[i].id}`, { keepFocus: true, noScroll: true, replaceState: true });
				}
				return; // exit once hash is changed
			}
			// reset hash when all sections passes all heuristics
			goto('', { keepFocus: true, noScroll: true, replaceState: true });
		}, 100);

		document.addEventListener('scroll', check, true);
		return () => {
			html.style.removeProperty('scroll-behavior');
			document.removeEventListener('scroll', check, true);
		};
	});
</script>

<main use:hydrate={$navigating}>
	<aside>
		<a
			href="https://github.com/{repo}/releases/latest"
			style:letter-spacing="2px"
			style:font-size="1.25rem"
			style:font-family="var(--font-mono)"
			data-prefix="v"
		>
			{version}
		</a>

		{#each sections as { slug, title }, i}
			<a
				href="#{slug}"
				data-index={`0${i + 1}`.slice(-2)}
				class:current={$page.url.hash === `#${slug}`}
			>
				{title}
			</a>
		{/each}
	</aside>

	<article>
		{#each sections as { slug, title, content }}
			<section>
				<h2 id={slug}>
					<a href="#{slug}">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
							<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
						</svg>
					</a>
					<span>{title}</span>
				</h2>

				{@html content}
			</section>
		{/each}
	</article>
</main>

<style>
	main {
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr);
		align-items: flex-start;
		justify-content: center;
		padding: 0 2rem;
		margin: 2rem auto;
	}

	aside {
		display: none;

		position: sticky;
		top: 0;
		gap: 0.25rem;
		align-content: flex-start;
		padding-top: 2rem;
	}
	aside a {
		padding-left: 1rem;
		border-radius: 0.5rem;
		line-height: 4ch;
	}
	aside a[data-prefix]::before {
		content: attr(data-prefix);
		margin: 0 0.75rem 0 0.25rem;
	}
	aside a[data-index]::before {
		content: attr(data-index);
		margin-right: 0.75rem;
		font-family: var(--font-mono);
	}
	aside a[data-index].current,
	aside a[data-index]:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	article {
		padding-top: 2rem;
	}

	section:not(:first-child) {
		margin-top: 4rem;
		padding-top: 1rem;
		border-top: 0.25rem solid var(--rose-700);
	}
	section h2 {
		position: relative;
		display: flex;
		justify-content: space-between;
		margin-bottom: 3rem;
		text-transform: uppercase;
		font-family: 'Karla', sans-serif;
		font-size: 2rem;
		font-weight: bold;
	}
	section h2 > a:first-child {
		position: absolute;
		top: 50%;
		left: -0.15rem;
		display: flex;
		transform: translate(-95%, -50%);
		transition: opacity 240ms;
		opacity: 0;
	}
	section h2 > a:first-child:focus,
	section h2:hover > a:first-child {
		opacity: 1;
	}

	/* ---- @html content ---- */
	section :global([id]) {
		scroll-margin-top: 2rem;
	}

	section > :not(h2:first-child) {
		line-height: 1.5;
	}
	section > :global(h3) {
		position: relative;
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1.25rem auto 1fr;
		align-items: center;
		margin: 2rem 0 1.5rem;
		font-size: 1.5rem;
		font-weight: 500;
	}
	section > :global(h3::before) {
		content: '';
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		margin-left: 0.25rem;
		box-shadow: 0 0 0 0.25rem rgba(0, 112, 187, 0.6);
		background-color: var(--font-700);
	}
	section > :global(h3::after) {
		content: '';
		width: 100%;
		height: 0.15rem;
		background-color: rgba(0, 112, 187, 0.6);
	}
	section h2 + :global(h3:first-of-type) {
		padding-top: 0;
		margin-top: 0;
		border-top: 0;
	}
	section > :global(p) {
		line-height: 1.5;
	}
	section > :global(p:not(:first-child)) {
		margin-top: 1rem;
	}
	section > :global(ul li:not(:first-child)) {
		margin-top: 0.5rem;
	}
	section :global(.mrq[data-mrq='block']) {
		margin: 1rem 0 1.5rem;
	}

	@media only screen and (min-width: 769px) {
		main {
			padding: 0 1rem;
			grid-template-columns: minmax(12rem, 16rem) minmax(0, 60rem);
		}

		aside {
			display: grid;
		}
	}
</style>
