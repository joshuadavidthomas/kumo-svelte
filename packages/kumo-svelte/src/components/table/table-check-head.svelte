<script lang="ts">
  import type { HTMLThAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import Checkbox, { type CheckboxChangeEventDetails } from "../checkbox/checkbox.svelte";
  import TableHead from "./table-head.svelte";

  export interface TableCheckHeadProps extends Omit<HTMLThAttributes, "class" | "children"> {
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
  }: TableCheckHeadProps = $props();

  function handleCheckedChange(newChecked: boolean) {
    onCheckedChange?.(newChecked, newChecked);
    onValueChange?.(newChecked);
  }
</script>

<TableHead class={cn("w-10 leading-none", className)} {...restProps}>
  <Checkbox
    {checked}
    {indeterminate}
    {disabled}
    onCheckedChange={handleCheckedChange}
    aria-label={label ?? "Select all rows"}
    class="relative before:absolute before:-inset-3 before:content-['']"
  />
</TableHead>
