<script>
    export let items = [];
    export let cover = false;
    export let observerOptions;
    export let needsFooter = true;
    export let context = "list";

    import SmallItem from "./SmallItem.svelte";

    import { onMount } from "svelte";

    let removedObserver = observerOptions == undefined;
    let sentinel, observer;

    $: if (observer != undefined && sentinel != undefined) {
        observer.observe(sentinel);
    }

    onMount(async () => {
        if (observerOptions == null) return;
        let token = document.cookie
            .split(";")
            .filter(c => c.startsWith("token"))[0]
            .split("=")[1];

        observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.intersectionRatio > 0)) {
                    console.log("Intersecting...");
                    getNext();
                }
            },
            {
                threshold: 0
            }
        );
        let getNext = async () => {
            try {
                let resp = await fetch(
                    `${observerOptions.uri}&offset=${items.length}`,
                    {
                        credentials: "same-origin"
                    }
                );
                let json = await resp.json();
                let limit, offset, total;
                items = items.concat(json.items.map(i => i.track));
                limit = json.limit;
                offset = json.offset;
                total = json.total;

                if (limit + offset >= total) {
                    removedObserver = true;
                    observer.unobserve(sentinel);
                }
            } catch (err) {
                console.error("It died lmao");
                console.error(err);
            }
        };

        await getNext();
        if (!removedObserver) observer.observe(sentinel);
    });
</script>

<style>
    #trackListing {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-decoration: none;
    }
    footer {
        height: 8rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div id="trackListing">
    <!-- <SmallItem
        item={{ track_number: '#', name: 'Title', artists: ['Artist'], explicit: false, album: { name: 'Album' }, duration_ms: 'Time' }}
        {cover}
        {context} /> -->
    {#each items as item, i (i)}
        <SmallItem {item} {cover} {context} />
        {#if i + 5 == items.length}
            <div id="sentinel" bind:this={sentinel} />
        {/if}
    {/each}
    {#if !removedObserver}
        <h2>Loading...</h2>
    {:else if needsFooter}
        <footer>Bottom. Please insert something nice...</footer>
    {/if}
</div>
