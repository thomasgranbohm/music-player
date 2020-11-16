<script>
	import { playbackId } from "../stores.js";
	import ArtistListing from "./artist/ArtistListing.svelte";

	let token = undefined,
		deviceId = undefined,
		player = undefined,
		playerState = undefined;

	window.onSpotifyWebPlaybackSDKReady = async () => {
		const resp = await fetch("/api/getAccessToken", {
			credentials: "same-origin",
		});
		token = await resp.text();
		player = new Spotify.Player({
			name: "Spoopify",
			getOAuthToken: (cb) => {
				cb(token);
			},
		});

		const errorListeners = [
			"initialization_error",
			"authentication_error",
			"account_error",
			"playback_error",
		];

		for (const listener of errorListeners) {
			player.addListener(listener, ({ message }) =>
				console.log(listener, message)
			);
		}

		player.addListener(
			"player_state_changed",
			(state) => (playerState = state)
		);

		player.addListener("ready", ({ device_id }) => (deviceId = device_id));

		player.connect();
	};

	$: getTitle = fetch(`/api/track/${$playbackId}`, {
		credentials: "same-origin",
	}).then((resp) => resp.json());

	fetch("/api/getAccessToken", {
		credentials: "same-origin",
	}).then(async (resp) => (token = await resp.text()));

	$: if (!!deviceId && !!token)
		fetch(
			`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
			{
				method: "PUT",
				body: JSON.stringify({
					uris: [`spotify:track:${$playbackId}`],
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

	const controlMedia = () => player.togglePlay();
</script>

<style>
	footer {
		grid-area: footer;
		width: 100%;
		height: 100%;

		color: var(--color);
		border-top: 1px solid var(--alt-background-color);

		display: grid;
		grid-template-areas: "image track-info . .";
		grid-template-rows: 1fr;
		grid-template-columns:
			var(--footer-height) calc(var(--nav-width) + 4rem)
			1fr 1fr;
	}

	footer > *:not(:last-child) {
		padding: 1em 0 1em 1em;
	}

	img {
		grid-area: image;
		height: 100%;
	}

	.track-info {
		grid-area: track-info;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: flex-start;
	}

	.track-info > * {
		margin: 0.25em 0;
	}
</style>

<svelte:head>
	<script src="/scripts/spotify-player.js">
	</script>
</svelte:head>
<footer>
	{#await getTitle then resp}
		<img src={resp.album.images[1].url} alt={resp.name} />
		<aside class="track-info">
			<b>{resp.name}</b>
			<ArtistListing artists={resp.artists} />
		</aside>
		<section>
			<button on:click={controlMedia}>
				{!playerState.paused ? 'Pause' : 'Play'}
			</button>
		</section>
	{/await}
</footer>
