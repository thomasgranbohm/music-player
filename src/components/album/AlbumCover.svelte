<script>
    export let imageURL;
    export let name;
</script>

<style>
	img {
		width: 100%;
	}
</style>

<img src={imageURL} alt="Cover for {name}" />
