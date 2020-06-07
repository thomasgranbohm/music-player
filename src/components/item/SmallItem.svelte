<script>
    export let item;
    export let cover = false;

    import ArtistListing from "../artist/ArtistListing.svelte";

    let albumCover;
    if (cover) albumCover = item.album.images.pop();
</script>

<style>
    .track {
        width: 100%;
        height: 3em;

        display: grid;
        grid-template-areas: "left right";
        grid-template-columns: auto 16em;
        grid-gap: 1em;

        align-items: center;
    }

    .track:not(.cover) .left {
        padding-left: 1em;
    }

    .cover {
        grid-template-areas: "cover left right";
        grid-template-columns: 3em auto 16em;
    }

    .track > * {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .left,
    .right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .left {
        grid-area: left;
        justify-content: flex-start;
    }
    .right {
        grid-area: right;
        justify-content: flex-end;
        padding-right: 1em;
    }
    .track-cover {
        height: 100%;
        width: 100%;
    }
    a {
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>

<div class="track hover" id={item.id} class:cover>
    {#if cover}
        <img class="track-cover" src={albumCover.url} alt="" />
    {/if}
    <div class="left">
        {#if cover && item.album}
            <a href="/albums/{item.album.id}">
                <b>{item.name}</b>
            </a>
        {:else}
            <b>{item.name}</b>
        {/if}
        <ArtistListing artists={item.artists} />
    </div>
    <div class="right">
        <b class="explicit" hidden={!item.explicit}>EXPLICIT</b>
        <p class="time">
            {Math.floor(item.duration_ms / (60 * 1000))}:{new String(Math.floor((item.duration_ms % 60000) / 1000)).padStart(2, '0')}
        </p>
    </div>
</div>
