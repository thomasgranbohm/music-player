<script context="module">
	export async function preload(page, session) {
		const { spotifyID } = page.params;

		const res = await this.fetch(`/api/artist?id=${spotifyID}`, {
			credentials: "same-origin",
		});
		const info = await res.json();

		return { info };
	}
</script>

<script>
	export let info;

	import Showcase from "../../components/Showcase.svelte";
	import ItemListing from "../../components/item/ItemListing.svelte";
	import Info from "../../components/Info.svelte";

	let albums = info.albums.filter((a) => a.album_group == "album");
	let singles = info.albums.filter((a) => a.album_group == "single");
</script>

<style>
	.artist {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>

<svelte:head>
	<title>Artist - {info.name}</title>
</svelte:head>

<div class="artist" id={info.id}>
	<Info img={info.images.shift().url} title={info.name} />

	<div>
		<h2>Most popular</h2>
		<ItemListing
			context="album"
			items={info.topTracks}
			cover={true}
			needsFooter={false} />
	</div>

	<!-- todo den får en del dupes här -->
	{#if albums.length > 0}
		<div>
			<h2>Albums</h2>
			<Showcase items={albums} type="albums" needsFooter={false} />
		</div>
	{/if}

	{#if singles.length > 0}
		<div>
			<h2>Singles</h2>
			<Showcase items={singles} type="albums" needsFooter={false} />
		</div>
	{/if}

</div>
