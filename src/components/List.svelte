<script>
    export let title;
    export let list = [];
    export let setActive;
    export let active;

    import Link from "../components/Link.svelte";
</script>

<style>
    h3 {
        position: sticky;
        top: 0;
        left: 0;

        display: flex;
        justify-content: start;
        align-items: center;

        margin-top: 0.5rem;
        padding: 0.5rem 1rem;

        background-color: var(--background-color);
    }
    .list {
        margin-bottom: 1rem;
    }
</style>

<h3>{title}</h3>
<div class="list">
    {#each list as item}
        <Link {setActive} {active} {item} />
    {/each}
</div>
