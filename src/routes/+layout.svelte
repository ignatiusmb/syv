<script>
	import '@fontsource/rubik/400.css';
	import '@fontsource/karla/400.css';
	import '@fontsource/karla/600.css';
	import '@fontsource/fira-code/400.css';

	import '@ignatiusmb/styles/core.css';
	import '../app.css';
</script>

<slot />

<footer>
	<p>
		<span>Copyright &copy;</span>
		<a href="https://mauss.dev">Ignatius Bagussuputra</a>
		<span>2021 &ndash; {new Date().getFullYear()}</span>
	</p>
	<p>
		<span>Documentation made with</span>
		<span style:color="var(--sky-300)">&#x2764;</span>
		<span>using</span>
		<a href="https://github.com/sveltejs/kit">SvelteKit</a>
		<span>&plus;</span>
		<a href="https://github.com/ignatiusmb/marqua">Marqua</a>
	</p>
</footer>

<style>
	footer {
		width: 100%;
		max-width: 84ch;
		position: relative;
		display: grid;
		gap: 0.5rem;
		padding: 3rem 2rem;
		margin: 0 auto;

		text-align: center;
		font-family: var(--font-mono);
		font-size: clamp(0.8rem, 3vw, 1rem);
	}
</style>
