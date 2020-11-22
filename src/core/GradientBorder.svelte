<!-- ref: https://codepen.io/alphardex/pen/vYEYGzp -->
<div class="lmns lmns-gradient-border">
	<slot />
</div>

<style>
	div {
		--border-width: 0.15em;

		position: relative;
		padding: var(--border-width);
		border-radius: var(--border-width);
		background: var(--bg-surface, #2d2f34);
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
	}
	div::after {
		content: '';
		z-index: -1;
		width: calc(100% + var(--border-width) * 2);
		height: calc(100% + var(--border-width) * 2);

		position: absolute;
		top: calc(-1 * var(--border-width));
		left: calc(-1 * var(--border-width));

		background: linear-gradient(60deg, #5f86f2, #a65ff2, #f25fd0, #f25f61, #f2cb5f, #abf25f, #5ff281, #5ff2f0);
		background-size: 300% 300%;
		background-position: 0 50%;
		animation: gradient-move 4s alternate infinite;
	}

	@keyframes gradient-move {
		50% {
			background-position: 100% 50%;
		}
	}
</style>
