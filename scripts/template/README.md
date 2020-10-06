<script>
    import {{NAME}} from "./src/{{NAME}}.svelte";
</script>

# {{TYPE}} {{NAME}}

{{DESCRIPTION}}

## Implementation

| parameter | type     | default    |
| --------- | -------- | ---------- |
| classes   | String   | `""`       |
| onclick   | Function | `() => {}` |

## Example

```<{{NAME}} classes={"mtn-btn"} onclick={() => {}}>Slot</{{NAME}}>```

<{{NAME}}>Slot</{{NAME}}>