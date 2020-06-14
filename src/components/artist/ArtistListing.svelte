<script>
    export let artists;

    import ArtistLink from "./ArtistLink.svelte";
</script>

<style>
    p {
        width: 100%;
    }
</style>

<p class="text-no-overflow">
    {#each artists as artist, i}
        <ArtistLink {artist} />
        {#if i < artists.length - 1}{i == 0 ? 'feat. ' : '& '}{/if}
    {/each}
</p>
