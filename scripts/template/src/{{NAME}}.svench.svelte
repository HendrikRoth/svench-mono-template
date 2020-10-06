<script>
    import { View } from 'svench';
    import {{NAME}} from './{{NAME}}.svelte';
</script>

<View name="default" let:knobs knobs={{classes: "mtn-button"}}>
    <{{NAME}} {...knobs}>Text</{{NAME}}>
</View>