<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../utils/cn";
  import { setSwitchGroupContext } from "./context";

  export interface SwitchGroupProps {
    children: Snippet;
    class?: string;
    controlFirst?: boolean;
    description?: Snippet | string;
    disabled?: boolean;
    error?: string;
    legend?: string;
  }

  let {
    children,
    class: className,
    controlFirst = true,
    description,
    disabled = false,
    error,
    legend,
  }: SwitchGroupProps = $props();

  setSwitchGroupContext({
    get controlFirst() {
      return controlFirst;
    },
  });
</script>

<fieldset data-slot="switch-group" class={cn("flex flex-col gap-4", className)} {disabled}>
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
