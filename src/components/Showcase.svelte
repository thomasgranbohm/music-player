<script>
    export let items = [];
    export let title;
    export let type;
    export let wrap = true;
    export let observerOptions;

    import ItemMedium from "./item/ItemMedium.svelte";
    import { onMount } from "svelte";
    let clientWidth, container, sentinel;
    let innerWidth, innerHeight, marginLeft;
    let minMarginLeft = 32;

    let vwidth = 16 * 12;
    let amountPerRow;

    $: {
        amountPerRow = Math.floor(clientWidth / (vwidth + minMarginLeft));
        marginLeft =
            (clientWidth / amountPerRow - vwidth) *
            ((amountPerRow - 1) / amountPerRow);
    }

    onMount(async () => {
        if (observerOptions == null) return;
        let token = document.cookie
            .split(";")
            .filter(c => c.startsWith("token"))[0]
            .split("=")[1];

        const observer = new IntersectionObserver(
            entries => {
                console.log("running");
                if (entries.some(entry => entry.intersectionRatio > 0)) {
                    getNextAlbums();
                }
            },
            {
                threshold: 0
            }
        );
        let getNextAlbums = async () => {
            try {
                console.log(items.length);
                let resp = await fetch(
                    `${observerOptions.uri}&offset=${items.length}`,
                    {
                        credentials: "same-origin"
                    }
                );
                let json = await resp.json();
                if (type == "albums")
                    items = items.concat(json.items.map(i => i.album));
                else items = items.concat(json.items.map(i => i.track));
                if (json.limit + json.offset >= json.total) {
                    console.log("Removed observer");
                    observer.unobserve(sentinel);
                }
            } catch (err) {
                console.error("It died lmao");
                console.error(err);
            }
        };

        await getNextAlbums();
        observer.observe(sentinel);
    });
</script>

<style>
    h1 {
        /* position: sticky;
        top: 0;
        left: 0; */
        background-color: transparent;
        z-index: 2;
    }
    .items {
        width: 100%;
        overflow-x: scroll;
        overflow-y: visible;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: flex-start;
    }

    .items > :nth-last-child(2) {
        margin-right: var(--margin);
    }
    footer {
        height: 16rem;
        width: 100%;
    }
</style>

<svelte:window bind:innerWidth bind:innerHeight />

<h1>{title}</h1>
<div
    class="items"
    bind:clientWidth
    bind:this={container}
    style="flex-wrap: {wrap ? 'wrap' : 'no-wrap'}; --margin: {wrap ? marginLeft : 32}">
    {#if marginLeft}
        {#each items as item, i (item.id)}
            <!-- TODO only render new items , think the keyed thing did it-->
            <ItemMedium
                width={vwidth}
                key={i + 1}
                marginLeft={wrap ? marginLeft : 32}
                info={item}
                {type} />
        {/each}
    {/if}
    <footer id="sentinel" bind:this={sentinel}>
        {#if items.length == 0}
            <h2>Loading...</h2>
        {:else}this be da footah{/if}
    </footer>
</div>
