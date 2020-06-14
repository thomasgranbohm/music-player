<script>
    export let setActive;
    export let active;
    export let item;
    let currentItem;
</script>

<style>
    a {
        width: 100%;
        text-decoration: none;
        padding: 0 1rem;
    }
</style>

<a
    bind:this={currentItem}
    on:click={() => setActive(currentItem)}
    class:active={currentItem == active}
    class="list-item hover"
    href={item.uri}>
    {item.name}
</a>
