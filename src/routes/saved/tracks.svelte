<script>
    import Showcase from "../../components/Showcase.svelte";
    import Listing from "../../components/item/ItemListing.svelte";
</script>

<h1>Saved tracks</h1>
<Listing cover={true} observerOptions={{ uri: `/api/saved?type=tracks` }} />
