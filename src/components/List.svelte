<script>
    export let title;
    export let list = [];
    export let setActive;
    export let active;

    import Item from "./Item.svelte";
</script>

<style>
    h3 {
        margin-top: 1rem;
        padding: 0 1rem;
    }
</style>

<h3>{title}</h3>
<div class="list">
    {#each list as item}
        <Item {setActive} {active} {item} />
    {/each}
</div>
