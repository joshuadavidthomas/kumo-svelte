<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";

  export type SelectGroupProps = SelectPrimitive.GroupProps;

  let props: SelectGroupProps = $props();
</script>

<SelectPrimitive.Group {...props} />
