<script>
    export let playlists = [];

    import List from "./List.svelte";

    let active = false;
    let setActive = element => (active = element);
</script>

<style>
    nav {
        border-right: 1px solid gray;
        width: 100%;
    }
</style>

<nav>
    <List
        title="Saved"
        list={[{ uri: '/saved/albums', name: 'Albums' }, { uri: '/saved/tracks', name: 'Tracks' }]}
        {setActive}
        {active} />
    <List title="Playlists" list={playlists} {setActive} {active} />
</nav>
