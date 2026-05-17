<script lang="ts">
  import type { Snippet } from "svelte";
  import { Label as BitsLabel } from "bits-ui";
  import { cn } from "../../utils/cn";
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
    <Tooltip content={tooltip}>
      <span
        aria-label="More information"
        class="inline-flex size-4 items-center justify-center rounded-full text-kumo-subtle"
      >
        <svg aria-hidden="true" viewBox="0 0 256 256" fill="currentColor">
          <path
            d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm-8-80v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0Zm20-44a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z"
          />
        </svg>
      </span>
    </Tooltip>
  {/if}
{/snippet}

{#if asContent}
  <span {id} class={cn(labelContentVariants(), className)}>
    {@render content()}
  </span>
{:else}
  <BitsLabel.Root
    {id}
    for={htmlFor}
    class={cn(labelVariants(), labelContentVariants(), className)}
  >
    {@render content()}
  </BitsLabel.Root>
{/if}
