<footer>
	<section>
		<em>Read the help page for more information</em>
	</section>

	<section class="social-links">
		<a href="https://www.facebook.com/ignatiusmb" aria-label="facebook profile">
			<i data-icon="facebook"></i>
		</a>
		<a href="https://www.instagram.com/ignatiusmb" aria-label="instagram profile">
			<i data-icon="instagram"></i>
		</a>
		<a href="https://www.linkedin.com/in/ignatiusmb" aria-label="linkedin profile">
			<i data-icon="linkedin"></i>
		</a>
		<a href="https://keybase.io/mauss" aria-label="keybase profile">
			<i data-icon="keyhole"></i>
		</a>
		<a href="https://github.com/ignatiusmb" aria-label="github profile">
			<i data-icon="github"></i>
		</a>
		<a href="https://gitlab.com/ignatiusmb" aria-label="gitlab profile">
			<i data-icon="gitlab"></i>
		</a>
		<a href="https://twitch.tv/alchemauss" aria-label="twitch profile">
			<i data-icon="twitch"></i>
		</a>
		<a href="https://www.youtube.com/user/Ignapure/playlists" aria-label="youtube playlist profile">
			<i data-icon="youtube"></i>
		</a>
	</section>

	<section>
		<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
		<p>Handcrafted with ❤️ using SvelteKit &plus; Aubade</p>
	</section>
</footer>

<style>
	p {
		margin: 0;
	}
	footer {
		--t-duration: 200ms;

		width: 100%;
		max-width: 53rem;
		position: relative;
		display: grid;
		gap: 0.5rem;
		padding: 3rem 1rem;
		margin: auto auto 3rem;
		text-align: center;
		line-height: 1.5;
		font-family: var(--font-monospace);
		font-size: clamp(0.8rem, 3vw, 1rem);
	}
	.social-links {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0 0 0.5rem;
		margin: auto;
	}
	.social-links > a {
		flex: 0 1 5rem;
		padding-top: 1rem;
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
		gap: 0.5rem;
	}
</style>
