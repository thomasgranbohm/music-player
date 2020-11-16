<script>
	export let changeColorMode;
	export let hidden = false;

	import { playlists } from "../stores.js";
	import List from "./List.svelte";

	let active = false;
	const setActive = (element) => (active = element);
</script>

<style>
	nav {
		border-right: 1px solid var(--alt-background-color);
		width: var(--nav-width);
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-areas: "logo" "rest" "buttons";
		grid-template-rows: auto 1fr 4rem;
		grid-template-columns: 1fr;
	}
	.rest {
		width: 100%;
		height: 100%;
		overflow: hidden auto;
	}
	.buttons {
		display: block;
		position: relative;
	}
	.spotify-link {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5em;
		margin: 0.5rem 0;
	}
	#spotify-logo {
		width: 65%;
	}
	#spotify-logo {
		content: var(--spotify-logo-url);
	}
	.dark-mode {
		--icon-url: var(--mode-logo-url);
	}
	.divider {
		width: 100%;
	}
</style>

<nav class:hidden>
	<a class="spotify-link" href="/">
		<img id="spotify-logo" alt="Back to start" />
	</a>
	<div class="rest">
		<List
			title="Account"
			list={[{ uri: '/account/statistics', name: 'Statistics' }]}
			{setActive}
			{active} />
		<div class="divider" />
		<List
			title="Saved"
			list={[{ uri: '/saved/albums', name: 'Albums' }, { uri: '/saved/tracks', name: 'Tracks' }]}
			{setActive}
			{active} />
		<div class="divider" />
		<List title="Playlists" list={$playlists} {setActive} {active} />
	</div>
	<div class="buttons">
		<div class="divider" />
		<button class="hover dark-mode nav-button" on:click={changeColorMode}>
			Change theme
		</button>
	</div>
</nav>
