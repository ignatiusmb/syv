<script>
	import Feather from '../icons/Feather.svelte';
	import { mounted } from '../store';

	export { className as class };
	let className = '';

	let y = 0;
</script>

<svelte:window bind:scrollY={y} />
<button
	type="button"
	class:show={y > ($mounted ? document.body.scrollHeight / 3 : y)}
	class="syv-core-scroll-top {className}"
	on:click={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
>
	<Feather icon={import('../icons/feather/chevrons-up')} />
</button>

<style>
	button {
		cursor: pointer;
		position: fixed;
		z-index: 1;
		bottom: 0;
		right: 0;
		width: 3rem;
		height: 3rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: var(--theme-primary, #990000);
		background-color: rgba(0, 0, 0, 0.25);
		transform: translate(-50%, 100%);
		transition: transform var(--t-duration, 300ms);
	}
	button.show {
		transform: translate(-50%, -200%);
	}
	button:hover {
		background-color: rgba(0, 0, 0, 0.5);
	}

	@media only screen and (min-width: 600px) {
		button.show {
			transform: translate(-50%, -50%);
		}
	}
</style>
