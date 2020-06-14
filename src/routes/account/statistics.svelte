<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`/api/top?time_range=medium_term`, {
            credentials: "same-origin"
        });
        const info = await res.json();

        return { info };
    }
</script>

<script>
    export let info;

    import Statistics from "../../components/Statistics.svelte";
</script>

<style>
    .container {
        width: 100%;
        display: flex;
        justify-content: start;
    }
</style>

<h1>Hello!</h1>
<div class="container">
    <Statistics title="Tracks" info={info.tracks} context="tracks" />
    <Statistics title="Artists" info={info.artists} context="artists" />
</div>
