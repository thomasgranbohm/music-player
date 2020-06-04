<script>
    import AlbumShowcase from "../../components/Showcase.svelte";
</script>

<AlbumShowcase
    title="Saved albums"
    type="albums"
    observerOptions={{ uri: `/api/saved?type=albums` }} />
