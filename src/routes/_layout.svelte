<script>
    export let segment;

    import Nav from "../components/Nav.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import { onMount, setContext, getContext } from "svelte";

    let playlists = [];

    onMount(async () => {
        if (getContext("playlists") != null) return;
        let token = document.cookie
            .split(";")
            .filter(c => c.startsWith("token"))[0]
            .split("=")[1];

        try {
            let resp = await fetch(`/api/playlist?all=true`, {
                credentials: "same-origin"
            });
            let json = await resp.json();
            playlists = json.items.map(p => {
                return {
                    uri: `/playlist/${p.id}`,
                    name: p.name
                };
            });
        } catch (err) {
            console.error("It died lmao");
            console.error(err);
        }
    });

    $: if (playlists.length != 0) {
        setContext("playlists", { playlists });

        // TODO playlists reloading all the time
    }
</script>

<style>
    main {
        height: 100vh;
        width: 100vw;

        display: grid;
        grid-template-areas: "nav nav" "sidebar main";
        grid-template-columns: 16em 1fr;
        grid-template-rows: 6em 1fr;

        overflow-x: hidden;
        position: relative;
        width: 100%;
        background-color: transparent;
        margin: 0;
        box-sizing: border-box;
    }
    #slotContainer {
        grid-area: main;
        width: 100%;
        overflow-x: hidden;
        z-index: 2;
        padding: 1rem 2rem;
        background-color: white;
    }
</style>

<main>
    <Nav {segment} />
    <Sidebar {playlists} />
    <div id="slotContainer">
        <slot />
    </div>
</main>
