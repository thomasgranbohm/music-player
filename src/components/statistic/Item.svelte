<script>
	export let context, item, i, setActive, isActive;

	let element;

	import ArtistListing from '../artist/ArtistListing.svelte';
	import ArtistLink from '../artist/ArtistLink.svelte';

	let directToLink = (link) => {
		if (isActive) window.location.href = link;
	}
</script>

<style>
	.item {
		position: relative;
		width: 100%;
		height: 4rem;
		
		transition: height 0.25s;
		overflow: hidden;
	}

	.artists.selected {
		height: 16rem;
	}

	.tracks.selected {
		height: 18em;
	}

	.front {
		height: 4rem;
		width: 100%;
		padding-right: 0.8rem;
		z-index: 2;

		background-color: var(--background-color);
		position: absolute;
		bottom: 0;
		left: 0;

		display: grid;
		grid-template-columns: 4rem 1fr;
		justify-items: start;
		align-items: center;

		overflow: hidden;

		transition: all 0.25s;
	}

	.front > * {
		width: auto;
		height: auto;
		min-width: 0;
		min-height: 0;
	}

	.tracks .front {
		grid-template-areas: "number title" ". artists";
		grid-template-rows: 4rem 2rem;
	}

	.tracks.selected .front {
		height: 5rem;
	
		grid-template-areas: "number title" "number artists";
		grid-template-rows: 3rem 2rem;
	}

	.tracks .title {
		grid-area: title;
		width: 100%;

		cursor: default;
	}
	.tracks .front .artists {
		grid-area: artists;
		padding-right: 1rem;
		font-size: 0.9em;
	}

	.artists .front {
		grid-template-areas: "number artist";
		grid-template-rows: 4rem;
	}

	.item:not(:first-of-type) .front {
		border-top: 1px solid var(--alt-background-color);
	}

	.selected .front, .front:hover {
		background-color: var(--alt-background-color);
	}

	.back {
		height: 16rem;
		width: 100%;
		z-index: 1;

		position: absolute;
		top: 0;
		left: 0;

		object-fit: cover;
		object-position: center;
	}

	.number {
		color: var(--spotify-green);
		
		width: 100%;
		height: 100%;		

		display: flex;
		justify-content: center;
		align-items: center;

		flex-shrink: 0;

		grid-area: number;
	}
	.selected .title {
		cursor: pointer;
	}
	.selected .title:hover {
		text-decoration: underline;
	}
</style>

<div id="{item.id}" class="{context} item" class:selected={isActive} on:click={() => setActive(i)}>
	<div class="front">
		{#if context == 'tracks'}
			<span class="number">{i + 1}. </span>
			<!-- TODO LINK TO LONG. it overflows -->
			<p class="title text-no-overflow" on:click={() => directToLink(`/albums/${item.album.id}`)}>
				{item.name}
			</p>
			<div class="artists">
				<ArtistListing artists={item.artists}/>
			</div>
		{:else}
			<span class="number">{i + 1}. </span>	
			<ArtistLink artist={item}></ArtistLink>
		{/if}
	</div>
	{#if context == 'tracks'}
		<img class="back" src="{item.album.images[0].url}" alt="{item.album.name}">
	{:else}
		<img class="back" src="{item.images[0].url}" alt="{item.name}">
	{/if}
</div>
