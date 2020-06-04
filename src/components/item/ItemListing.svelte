<script>
    export let items;
    export let cover = false;
    import SmallItem from "./SmallItem.svelte";
</script>

<style>
    #trackListing {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-decoration: none;
    }
</style>

<div id="trackListing">
    <!-- {#if items instanceof Object}
        <SmallItem {items} {cover} />
    {:else} -->
    {#each items as item}
        <SmallItem {item} {cover} />
    {/each}
    <!-- {/if} -->
</div>
