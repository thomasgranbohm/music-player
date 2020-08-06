<script>
    export let items = [];
    export let type;
    export let wrap = true;
    export let observerOptions;
    export let needsFooter = true;

    import MediumItem from "./item/MediumItem.svelte";
    import { onMount } from "svelte";
    let clientWidth, container, sentinel, observer;
    let innerWidth, innerHeight, marginLeft;
    let minMarginLeft = 32;

    let removedObserver = observerOptions == undefined;

    $: if (observer != undefined && sentinel != undefined) {
        observer.observe(sentinel);
    }

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
                let resp = await fetch(
                    `${observerOptions.uri}&offset=${items.length}`,
                    {
                        credentials: "same-origin"
                    }
                );
                let json = await resp.json();
                let limit, offset, total;
                if (type == "albums" || type == "tracks") {
                    if (type == "albums")
                        items = items.concat(json.items.map(i => i.album));
                    else items = items.concat(json.items.map(i => i.track));
                    limit = json.limit;
                    offset = json.offset;
                    total = json.total;
                } else if (type == "playlist") {
                    items = json.tracks.items;
                    limit = json.tracks.limit;
                    offset = json.tracks.offset;
                    total = json.tracks.total;
                }
                if (limit + offset >= total) {
                    removedObserver = true;
                    observer.unobserve(sentinel);
                }
            } catch (err) {
                console.error("It died lmao");
                console.error(err);
            }
        };

        await getNextAlbums();
        if (!removedObserver) observer.observe(sentinel);
    });
</script>

<style>
    .items {
        width: 100%;
        overflow-x: auto;
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
        height: 8rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<svelte:window bind:innerWidth bind:innerHeight />

<div
    class="items"
    bind:clientWidth
    bind:this={container}
    style="flex-wrap: {wrap ? 'wrap' : 'no-wrap'}; --margin: {wrap ? marginLeft : 32}">
    {#if marginLeft}
        {#each items as item, i (i)}
            <!-- TODO only render new items , think the keyed thing did it-->

            <MediumItem
                width={vwidth}
                key={i + 1}
                marginLeft={wrap ? marginLeft : 32}
                info={item}
                {type} />
            {#if i + 5 == items.length}
                <div id="sentinel" bind:this={sentinel} />
            {/if}
        {/each}
    {/if}
    {#if !removedObserver}
        <img class="loading-spinner" preload src="/images/image-loading.svg" alt="Loading">
    {:else if needsFooter}
        <footer>Bottom. Please insert something nice...</footer>
    {/if}
</div>
