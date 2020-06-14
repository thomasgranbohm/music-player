<script>
    export let title;
    export let info;
    export let context;
</script>

<style>
    .statistic {
        width: 100%;
        margin-right: 1rem;
    }
</style>

<div class="statistic">
    <h2>{title}</h2>
    {#each info as item, i}
        <pre class="text-no-overflow">
            <b>{i + 1}.{'\t'}</b>
            {item.name}
            {context == 'tracks' ? ` by ${item.artists[0].name}` : ''}
        </pre>
    {/each}
</div>
