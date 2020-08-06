<script>
    export let info;
    export let marginLeft;
    export let type;
    export let key;
    export let width = 256;

    import { onMount } from "svelte";
    import ArtistListing from "../artist/ArtistListing.svelte";
    let album;
</script>

<style>
    .item {
        width: var(--width);
        height: calc(var(--width) + 6rem);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        margin-left: var(--margin);
    }
    .gray-background {
        width: 100%;
        height: 100%;
        z-index: 3;

        position: absolute;
        top: 0;
        left: 0;

        background-color: rgba(0, 0, 0, 0);
        transition: background-color 0.2s;
    }
    .item-cover-container:hover .gray-background {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .item-cover-container,
    .item-cover {
        width: var(--width);
        height: var(--width);
        transition: box-shadow 0.1s;
        position: relative;
    }
    .item-cover {
        background-color: var(--inverted-background-color);
        object-fit: cover;
        z-index: 2;
        border: 1px solid rgb(126, 126, 126);
    }
    .name:hover,
    .item-cover-container:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    :last-of-type {
        margin-right: var(--margin);
	}
	a {
		width: 100%;
	}
</style>

<div
    bind:this={album}
    class="item"
    id={key}
    style=" --width:{width}px; --margin: {marginLeft}px;">
    <a
        class="item-cover-container"
        href="/albums/{type == 'tracks' ? info.album.id : info.id}">
        <div class="gray-background" />
        <img
            class="item-cover"
            src={type == 'tracks' ? info.album.images[1].url : info.images[1].url}
            alt={info.name} />
    </a>
    <a
        class="name text-no-overflow"
        href="/albums/{type == 'tracks' ? info.album.id : info.id}">
        <b>{info.name}</b>
    </a>
    <ArtistListing artists={info.artists} />
</div>
