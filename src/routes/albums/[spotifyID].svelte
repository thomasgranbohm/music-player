<script context="module">
    export async function preload(page, session) {
        const { spotifyID } = page.params;

        const res = await this.fetch(`/api/album?id=${spotifyID}`, {
            credentials: "same-origin"
        });
        const info = await res.json();

        return { info };
    }
</script>

<script>
    export let info;

    import ItemListing from "../../components/item/ItemListing.svelte";
    import ArtistListing from "../../components/artist/ArtistListing.svelte";
    import Info from "../../components/Info.svelte";
</script>

<svelte:head>
    <title>Album - {info.name}</title>
</svelte:head>

<Info img={info.images[0].url} title={info.name}>
    <ArtistListing artists={info.artists} />
    <h4>{info.genres.join(', ')}</h4>
</Info>
<ItemListing items={info.tracks.items} />
