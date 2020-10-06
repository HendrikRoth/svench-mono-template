<script>
    export let classes = "";
    export let onclick = () => {};
</script>

<button class={classes} on:click={onclick}><slot /></button>