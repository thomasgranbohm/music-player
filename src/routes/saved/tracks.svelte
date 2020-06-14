<script>
    import Showcase from "../../components/Showcase.svelte";
    import ItemListing from "../../components/item/ItemListing.svelte";
</script>

<h1>Saved tracks</h1>
<ItemListing
    context="list"
    cover={true}
    observerOptions={{ uri: `/api/saved?type=tracks` }} />
