<script context="module">
    export async function preload(page, session) {
        const { spotifyID } = page.params;
        const url = `/api/playlist?id=${spotifyID}`;

        const res = await this.fetch(url, {
            credentials: "same-origin"
        });
        const info = await res.json();
        return { info };
    }
</script>

<script>
    export let info;

    // $: {
    //     console.log("New stuff:");
    //     console.log("ID: %s", spotifyID);
    //     console.log("Info: %o", info);
    // }

    import Info from "../../components/Info.svelte";
    import ItemListing from "../../components/item/ItemListing.svelte";
</script>

<svelte:head>
    <title>Playlist - {info.name}</title>
</svelte:head>

<Info img={info.images[0].url} title={info.name} />
<ItemListing
    context="list"
    cover={true}
    items={info.tracks.items.map(i => i.track)} />
