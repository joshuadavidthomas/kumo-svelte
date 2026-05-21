<script lang="ts">
  import type { Snippet } from "svelte";
  import InfoIcon from "phosphor-svelte/lib/InfoIcon";
  import { Label as BitsLabel } from "bits-ui";
  import { cn } from "../../utils/cn";
  import Button from "../button/button.svelte";
  import Tooltip from "../tooltip/tooltip.svelte";
  import { labelContentVariants, labelVariants } from "./variants";

  export interface LabelProps {
    children: Snippet;
    showOptional?: boolean;
    tooltip?: Snippet;
    class?: string;
    for?: string;
    id?: string;
    asContent?: boolean;
  }

  let {
    children,
    showOptional = false,
    tooltip,
    class: className,
    for: htmlFor,
    id,
    asContent = false,
  }: LabelProps = $props();
</script>

{#snippet content()}
  {@render children()}
  {#if showOptional}
    <span class="font-normal text-kumo-subtle">(optional)</span>
  {/if}
  {#if tooltip}
    {#snippet tooltipTrigger({ props }: { props: Record<string, unknown> })}
      <Button
        {...props}
        variant="ghost"
        size="xs"
        shape="square"
        aria-label="More information"
        class="cursor-default"
      >
        <InfoIcon class="size-4" aria-hidden="true" size={16} weight="fill" />
      </Button>
    {/snippet}
    <Tooltip content={tooltip} render={tooltipTrigger} />
  {/if}
{/snippet}

{#if asContent}
  <span data-slot="label-content" {id} class={cn(labelContentVariants(), className)}>
    {@render content()}
  </span>
{:else}
  <BitsLabel.Root
    data-slot="label"
    {id}
    for={htmlFor}
    class={cn(labelVariants(), labelContentVariants(), className)}
  >
    {@render content()}
  </BitsLabel.Root>
{/if}
