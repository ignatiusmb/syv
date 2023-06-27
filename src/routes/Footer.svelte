<script>
	import Feather from '$lib/icons/Feather.svelte';
</script>

<footer>
	<section class="social-links">
		<a href="https://github.com/ignatiusmb/syv" aria-label="github repository">
			<Feather icon={import('../lib/icons/feather/github')} />
		</a>
	</section>

	<section>
		<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
	</section>
</footer>

<style>
	p {
		margin: 0;
	}
	footer {
		--t-duration: 200ms;

		width: 100%;
		max-width: 53em;
		position: relative;
		display: grid;
		gap: 0.5em;
		padding: 3em 1em;
		margin: auto auto 3em;
		text-align: center;
		line-height: 1.5;
		font-family: var(--font-monospace);
		font-size: clamp(0.8em, 3vw, 1em);
	}
	.social-links {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0 0 0.5em;
		margin: auto;
	}
	.social-links > a {
		flex: 0 1 5em;
		padding-top: 1em;
	}
	.social-links a,
	.social-links a:visited {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--fg-surface);
	}
	.social-links a:hover,
	.social-links a:focus {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--theme-secondary);
	}
	.social-links a:hover:nth-child(odd),
	.social-links a:focus:nth-child(odd) {
		transform: rotate(6deg) scale(1.2) translateY(-20%);
	}
	.social-links a:hover:nth-child(even),
	.social-links a:focus:nth-child(even) {
		transform: rotate(-6deg) scale(1.2) translateY(-20%);
	}
	section:last-of-type {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		place-items: center;
		gap: 0.5em;
	}
</style>
