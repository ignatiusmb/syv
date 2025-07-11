<script lang="ts">
	import '@ignatiusmb/styles/core.css';
	import '../app.css';

	import Logo from './Logo.svelte';
	const { children } = $props();
</script>

<div>
	<header>
		<Logo />

		<a href="https://github.com/ignatiusmb/syv" aria-label="github">
			<i data-image="github"></i>
		</a>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<section>
			<span>&Larr;</span>
			<a href="https://mauss.dev/atelier" aria-label="projects">
				<i data-icon="flask"></i>
			</a>
			<a href="https://mauss.dev/sponsor" aria-label="sponsor">
				<i data-icon="hand-heart"></i>
			</a>
			<a href="https://mauss.dev/help" aria-label="alkamauss guide">
				<i data-icon="lifebuoy"></i>
			</a>
			<span>&Rarr;</span>
		</section>

		<p>
			<i data-icon="copyright"></i>
			<span>2020&ndash;{new Date().getFullYear()} Ignatius Bagus.</span>
		</p>
	</footer>
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

		padding: 0.5rem 0;
		background: var(--color-base);

		/* children styles */

		header {
			grid-column: content;
			z-index: 1;
			width: 100%;
			position: sticky;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			i[data-image] {
				display: flex;
				width: 1.5rem;
				height: 1.5rem;
				background: currentColor var(--svg) no-repeat center / contain;

				&[data-image='github'] {
					background-color: inherit;
					--svg: url('data:image/svg+xml,<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>');
				}
			}
		}

		> main {
			grid-column: content;
			position: relative;

			display: grid;
			gap: 2rem;
			align-content: start;
		}

		footer {
			grid-column: content;
			width: 100%;

			position: relative;
			display: grid;
			gap: 1rem;
			text-align: center;
			line-height: 1.5;
			font-family: var(--font-monospace);
			font-size: 0.875rem;
			section {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: auto;

				span {
					width: 2rem;
					font-size: 1.5rem;

					@media (min-width: 480px) {
						width: 4rem;
					}
				}

				a {
					flex: 0 1 4rem;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					color: var(--color-text);
					outline: none;

					> i {
						transition-duration: var(--transition-base);
						transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
					}

					&:hover > i,
					&:focus > i {
						color: var(--color-accent-primary);
						transform: scale(1.5) translateY(-25%);
					}
				}
			}
			p {
				display: grid;
				gap: 0.5rem;
				grid-auto-flow: column;
				align-items: center;
				justify-content: center;
			}
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
			&[data-icon='copyright'] {
				width: 1rem;
				height: 1rem;
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><path d="M160,152a40,40,0,1,1,0-48"/></svg>');
			}
			&[data-icon='flask'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="88" y1="32" x2="168" y2="32"/><path d="M152,32V99.14l62.85,104.74A8,8,0,0,1,208,216H48a8,8,0,0,1-6.86-12.12L104,99.14V32"/><path d="M71.63,153.08c13.23-2.48,32-1.41,56.37,10.92,32.25,16.33,54.75,12.91,67.5,7.65"/></svg>');
			}
			&[data-icon='hand-heart'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
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
