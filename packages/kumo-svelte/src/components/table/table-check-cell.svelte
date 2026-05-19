<script lang="ts">
  import type { HTMLTdAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import Checkbox, { type CheckboxChangeEventDetails } from "../checkbox/checkbox.svelte";
  import TableCell from "./table-cell.svelte";

  export interface TableCheckCellProps extends Omit<HTMLTdAttributes, "class" | "children"> {
    checked?: boolean;
    class?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    label?: string;
    onCheckedChange?: (checked: boolean, eventDetails?: CheckboxChangeEventDetails) => void;
    onValueChange?: (checked: boolean) => void;
  }

  let {
    checked = false,
    class: className,
    disabled = false,
    indeterminate = false,
    label,
    onCheckedChange,
    onValueChange,
    ...restProps
  }: TableCheckCellProps = $props();

  function handleCheckedChange(newChecked: boolean) {
    onCheckedChange?.(newChecked, newChecked);
    onValueChange?.(newChecked);
  }
</script>

<TableCell class={cn("w-10 leading-none", className)} {...restProps}>
  <Checkbox
    {checked}
    {indeterminate}
    {disabled}
    onCheckedChange={handleCheckedChange}
    aria-label={label ?? "Select row"}
    class="relative before:absolute before:-inset-3 before:content-['']"
  />
</TableCell>
