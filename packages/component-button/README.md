<script>
    import Button from "./src/Button.svelte";
</script>

# Component Button

A basic component button component implementation. It supports tailwindcss class names and has a onclick event handler.

## Implementation

| parameter | type     | default    |
| --------- | -------- | ---------- |
| classes   | String   | `""`       |
| onclick   | Function | `() => {}` |

## Example

```<Button classes={"mtn-btn"} onclick={() => {}}>Slot</Button>```

<Button>Slot</Button>