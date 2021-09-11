<script>
	import '../app.postcss';
	import '@ignatiusmb/aqua/lib/aqua.cbs.js';
	import '@ignatiusmb/aqua/lib/aqua.min.css';

	import { ScrollTop } from '$lib';
</script>

<ScrollTop />

<slot />

<style>
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--aqua-default);
		background-color: #242424;
	}
</style>
