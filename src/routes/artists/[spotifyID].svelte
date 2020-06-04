<script context="module">
    export async function preload(page, session) {
        const { spotifyID } = page.params;

        const res = await this.fetch(`/api/artist?id=${spotifyID}`, {
            credentials: "same-origin"
        });
        const info = await res.json();

        return { info };
    }
</script>

<script>
    export let info;

    console.log(info.albums.filter(a => a.album_group == "album").length);

    import Showcase from "../../components/Showcase.svelte";
    import ItemListing from "../../components/item/ItemListing.svelte";
</script>

<style>
    .artist {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .top {
        height: 16rem;
        width: 100%;
        display: flex;
        align-items: flex-end;
        gap: 1rem;
    }
    .top > h1 {
        margin: 0;
        font-size: 3rem;
    }
    .top > img {
        height: 100%;
    }
</style>

<div class="artist" id={info.id}>
    <div class="top">
        <img src={info.images.shift().url} alt="Picture of {info.name}" />
        <h1>{info.name}</h1>
    </div>

    <ItemListing items={info.topTracks} cover={true} />

    <!-- todo den får en del dupes här -->
    <Showcase
        items={info.albums.filter(a => a.album_group == 'album')}
        type="albums"
        title="Albums"
        wrap={false} />

    <Showcase
        items={info.albums.filter(a => a.album_group == 'single')}
        type="albums"
        title="Singles"
        wrap={false} />

</div>
