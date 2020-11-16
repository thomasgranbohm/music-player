<script>
	export let segment;

	import { goto } from "@sapper/app";
	import { onMount } from "svelte";
	import Nav from "../components/Nav.svelte";
	import PlayBar from "../components/PlayBar.svelte";
	import { playbackId, playlists } from "../stores.js";

	let dark = true;
	let iw, ih;

	onMount(async () => {
		if ($playlists.length > 0) return;
		if (segment === "login") return;
		try {
			const resp = await fetch(`/api/playlist?all=true`, {
				credentials: "same-origin",
			});
			const json = await resp.json();
			$playlists = json.items.map((p) => {
				return {
					uri: `/playlist/${p.id}`,
					name: p.name,
				};
			});
		} catch (err) {
			if (err.message === "No cookie") {
				goto("login");
			}
		}
	});

	const changeColorMode = () => {
		dark = !dark;
		console.log(`${dark ? "Dark" : "Light"} mode is now on!`);
	};
</script>

<style>
	main {
		height: 100vh;
		width: 100vw;

		display: grid;
		grid-template-areas: "nav main";
		grid-template-columns: var(--nav-width) 1fr;
		grid-template-rows: 1fr;

		overflow-x: hidden;
		position: relative;
		width: 100%;
		margin: 0;
		box-sizing: border-box;
		color: var(--color);
		background-color: var(--background-color);
	}

	main.shouldPlay {
		grid-template-areas: "nav main" "footer footer";
		grid-template-rows: 1fr var(--footer-height);
	}
	#slotContainer {
		grid-area: main;
		width: 100%;
		overflow-x: hidden;
		z-index: 2;
		padding: 1rem 2rem;
		background-color: var(--background-color);
	}

	#login-container {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>

<svelte:window bind:innerWidth={iw} bind:innerHeight={ih} />

{#if segment == 'login'}
	<section id="login-container">
		<slot />
	</section>
{:else}
	<main class:dark class:shouldPlay={$playbackId !== null}>
		<Nav {changeColorMode} />
		<section id="slotContainer">
			<slot />
		</section>
		{#if $playbackId !== null}
			<PlayBar />
		{/if}
	</main>
{/if}
