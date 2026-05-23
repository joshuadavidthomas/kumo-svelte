<script lang="ts">
  import type { Snippet } from "svelte";
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import { cn } from "../../utils/cn";
  import { setCheckboxGroupContext } from "./context";

  export interface CheckboxGroupProps {
    legend?: string;
    children: Snippet;
    error?: string;
    description?: Snippet | string;
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    allValues?: string[];
    disabled?: boolean;
    controlFirst?: boolean;
    class?: string;
    name?: string;
    required?: boolean;
    id?: string;
  }

  let {
    legend,
    children,
    error,
    description,
    defaultValue = [],
    value = $bindable(defaultValue),
    onValueChange,
    disabled = false,
    controlFirst = true,
    class: className,
    name,
    required,
    id,
    allValues: _allValues,
  }: CheckboxGroupProps = $props();

  function handleValueChange(nextValue: string[]) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  setCheckboxGroupContext({
    get controlFirst() {
      return controlFirst;
    },
  });
</script>

<CheckboxPrimitive.Group
  data-slot="checkbox-group"
  {value}
  onValueChange={handleValueChange}
  {disabled}
  {name}
  {required}
  {id}
>
  <fieldset class={cn("flex flex-col gap-4", className)} disabled={disabled}>
    {#if legend}
      <legend class="text-base font-medium text-kumo-default">{legend}</legend>
    {/if}
    <div class="flex flex-col gap-2">
      {@render children()}
    </div>
    {#if error}
      <p class="text-sm text-kumo-danger">{error}</p>
    {/if}
    {#if description}
      <p class="text-sm text-kumo-subtle">
        {#if typeof description === "string"}
          {description}
        {:else}
          {@render description()}
        {/if}
      </p>
    {/if}
  </fieldset>
</CheckboxPrimitive.Group>
