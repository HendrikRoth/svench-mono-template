<script>
    import { View } from 'svench';
    import Button from './Button.svelte';
</script>

<View name="default" let:knobs knobs={{classes: "mtn-button"}}>
    <Button {...knobs}>Text</Button>
</View>