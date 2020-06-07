<script>
    import AlbumShowcase from "../../components/Showcase.svelte";
</script>

<h1>Saved albums</h1>
<AlbumShowcase
    type="albums"
    observerOptions={{ uri: `/api/saved?type=albums` }} />
