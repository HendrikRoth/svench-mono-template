<script>
    export let rounded = false;
</script>

<button class:rounded><slot /></button>

<style>
button {
    background: green;
    color: white;
}

.rounded {
    border-radius: 5px;
}
</style>