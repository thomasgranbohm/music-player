<script>
    export let segment;
</script>

<style>
    nav {
        grid-area: nav;
        font-weight: 300;
        padding: 0 1em;
        border-bottom: 1px solid gray;
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    /* clearfix */
    ul::after {
        content: "";
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: "";
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>

<nav>
    <ul>
        <li>
            <a
                aria-current={segment === undefined ? 'page' : undefined}
                href=".">
                home
            </a>
        </li>
    </ul>
</nav>
