<script lang="ts">
	import SearchBar from '$lib/core/SearchBar.svelte';

	import ExampleDialog from './ExampleDialog.svelte';

	import { autoresize, copy } from '$lib/attachment';
	import { page } from '$app/state';

	let value = $state('');
</script>

{#if page.state.dialog}
	<ExampleDialog required />
{/if}

<SearchBar
	oninput={() => {
		// call worker and delegate search
	}}
/>

<textarea bind:value {@attach autoresize}></textarea>

<button {@attach copy({ data: value })}>Copy to Clipboard</button>

<style>
</style>
