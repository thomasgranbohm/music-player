<script>
    import TrackShowcase from "../../components/Showcase.svelte";
</script>

<TrackShowcase
    title="Saved tracks"
    type="tracks"
    observerOptions={{ uri: `/api/saved?type=tracks` }} />
