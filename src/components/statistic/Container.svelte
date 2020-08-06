<script>
    export let title;
    export let info;
	export let context;
	
	import Item from "./Item.svelte";

	
    let active = undefined;
    let setActive = number => {
		if (active == number) active = undefined;
		else active = number;
	};

</script>

<style>
    .statistic {
        width: 25rem;
        margin-right: 1rem;
    }
</style>

<div class="statistic">
    <h2>{title}</h2>
	{#each info as item, i}
		<Item {setActive} isActive={active == i} {item} {i} {context} />
    {/each}
</div>
