<script lang="ts">
	import '@ignatiusmb/styles/core.css';
	import '../app.css';

	import Footer from './Footer.svelte';
	import Navigation from './Navigation.svelte';

	const { children } = $props();
</script>

<div>
	<Navigation />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	div {
		--max-content: 80rem;
		--breakout: calc((calc(var(--max-content) + 12rem) - var(--max-content)) / 2);
		--pad: 2rem;

		display: grid;
		gap: 2rem 0;
		align-content: center;
		grid-template-rows: [top-start] auto [content-start] 1fr [content-end] auto [top-end];
		grid-template-columns:
			[full-bleed-start] var(--pad)
			[full-bleed-padding-start] minmax(0, 1fr)
			[breakout-start] minmax(0, var(--breakout))
			[content-start] min(100% - var(--pad) * 2, var(--max-content))
			[content-end] minmax(0, var(--breakout))
			[breakout-end] minmax(0, 1fr)
			[full-bleed-padding-end] var(--pad)
			[full-bleed-end];

		background: #242424;
		font-family: var(--aqua-default);

		> main {
			grid-column: content;
			position: relative;

			display: grid;
			gap: 2rem;
			align-content: start;
		}

		:global(i[data-icon]) {
			width: 1.5rem;
			height: 1.5rem;
			display: inline-block;
			background: currentColor;
			mask: no-repeat center / 100%;
			mask-image: var(--svg);

			&[data-icon='bookmark'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='hand-heart'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='id-badge'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="136" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M80,192a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="32" y="48" width="192" height="160" rx="8" transform="translate(256) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="64" x2="160" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='lifebuoy'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="99.72" y1="99.72" x2="60.12" y2="60.12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="156.28" y1="99.72" x2="195.88" y2="60.12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="156.28" y1="156.28" x2="195.88" y2="195.88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="99.72" y1="156.28" x2="60.12" y2="195.88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='menu'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='x'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
		}
	}
</style>
