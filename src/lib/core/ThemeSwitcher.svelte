<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		themes?: string[];
		class?: string;
		children?: import('svelte').Snippet<[current: string]>;
	}

	const { themes = ['light', 'dark'], class: className = '', children }: Props = $props();

	const browser = typeof window !== 'undefined';
	const dark = browser && matchMedia('(prefers-color-scheme: dark)').matches;
	let current = $state(browser ? localStorage.theme || (dark ? 'dark' : 'light') : null);
	let nice = $state(false);

	async function toggle() {
		let switched = false;
		const { classList } = document.querySelector('html') as HTMLHtmlElement;
		for (let i = 0; i < themes.length; i++) {
			if (!switched || themes[i] !== current) classList.remove(themes[i]);
			if (themes[i] === current && !switched) {
				localStorage.theme = current = themes[i + 1] ?? themes[0];
				classList.add(current), (switched = true);
			}
		}
	}

	onMount(() => {
		current = localStorage.theme;
	});
</script>

<button
	class="syv-theme-switcher {className}"
	aria-label="Toggle Theme"
	class:nice
	onclick={toggle}
	onmousedown={() => (nice = true)}
	onblur={() => (nice = false)}
>
	{#if children}
		{@render children(current)}
	{:else}
		<svg viewBox="0 0 24 24">
			{#if current === 'light'}
				<path
					d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1
					12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z"
				/>
			{:else}
				<path
					d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5
					9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1
					12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
				/>
			{/if}
		</svg>
	{/if}
</button>

<style>
	button {
		cursor: pointer;
		height: 1.5em;
	}
	button path {
		transition: var(--t-duration, 300ms);
	}
	button > :global(svg) {
		height: 100%;
	}
	.nice {
		outline: none;
	}
</style>
