<script>
	export let artist;
</script>

<style>
    a {
        color: inherit;
        text-decoration: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        grid-area: artist;
        margin: 0;
    }

    a:hover {
        text-decoration: underline;
    }
</style>

<a href="/artists/{artist.id}">
	<slot></slot>
	{artist.name}
</a>
