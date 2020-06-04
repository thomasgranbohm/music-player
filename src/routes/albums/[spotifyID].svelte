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
</script>

<style>
    #info {
        width: 100%;
        height: 20em;
        display: grid;
        grid-template-areas: "albumcover text";
        grid-template-columns: 20em 1fr;
        grid-template-rows: 1fr;
    }
    #info > img {
        grid-area: albumcover;
        margin: 5% 0;
        height: 90%;
        border: 1px solid gray;
    }
    #text {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>

<div id="info">
    <img src={info.images[0].url} alt="{info.name} cover" />
    <div id="text">
        <h1>{info.name}</h1>
        <ArtistListing artists={info.artists} />
        <h4>{info.genres.join(', ')}</h4>
    </div>
</div>
<ItemListing items={info.tracks.items} />
