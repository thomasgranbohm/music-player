<script>
    export let img;
    export let title;
</script>

<style>
    .info {
        width: 100%;
        height: 20rem;

        display: flex;

        justify-content: start;
        align-items: flex-end;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    img {
        height: 20rem;
        width: 20rem;
    }
    .titlecontainer {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: end;
    }
</style>

<div class="info">
    <img src={img} alt={title} />
    <div class="titlecontainer">
        <h1>{title}</h1>
        <slot />
    </div>
</div>
