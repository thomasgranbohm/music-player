<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`/api/top?time_range=short_term`, {
            credentials: "same-origin"
        }).catch(err => console.log("Got fetch error"));
        const info = res.json();

        return { info };
    }
</script>

<script>
    export let info;

	import Statistics from "../../components/statistic/Container.svelte";

	let selectedTerm = "short_term";
	
	let fetchStatistics = async (term) => {
		try {
			const res = await fetch(`/api/top?time_range=${term}`, {
				credentials: "same-origin"
			})
			info = res.json();
		} catch (err) {};
	}

	$: fetchStatistics(selectedTerm)
</script>

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	#term {
		color: var(--color);
		background-color: var(--background-color);
		
		padding: 0.5rem;
		border: none;
	}
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>

<nav>
	<h1>Statistics</h1>
	<select bind:value={selectedTerm} name="term" id="term">
		<option value="short_term" selected>About 4 weeks</option>
		<option value="medium_term">About 6 months</option>
		<option value="long_term">All data</option>
	</select>
</nav>
<div class="container">
	{#await info}
		<h2>Loading...</h2>	
	{:then data}
		<Statistics title="Tracks" info={data.tracks} context="tracks" />
		<Statistics title="Artists" info={data.artists} context="artists" />
	{:catch err}
		<h2>got error</h2>
	{/await}
</div>
