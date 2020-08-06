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

        /* background: linear-gradient(
            0deg,
            var(--background-color) 0%,
            rgba(29, 185, 177, 1) 50%
        ); */
    }
    img {
		height: 20em;
		width: 20em;
		background: transparent;
		object-fit: cover;
		object-position: center;
    }
    .titlecontainer {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
    }
    .titlecontainer > h1 {
        margin: 0;
    }
</style>

<div class="info">
    <img src={img} alt={title} />
    <div class="titlecontainer">
        <h1>{title}</h1>
        <slot />
    </div>
</div>
