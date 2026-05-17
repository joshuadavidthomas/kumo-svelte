<script lang="ts">
  import type { Snippet } from "svelte";
  import { createRoundedPath, type FlowPathOptions } from "./paths";
  import type { FlowConnector } from "./types";

  export interface ConnectorsProps extends FlowPathOptions {
    children?: Snippet;
    connectors: FlowConnector[];
    markerId?: string;
  }

  const generatedMarkerId = $props.id();

  let {
    children,
    connectors,
    markerId = generatedMarkerId,
    orientation = "vertical",
    ...pathOptions
  }: ConnectorsProps = $props();

  let sortedConnectors = $derived(
    [...connectors].sort((a, b) => {
      if (a.disabled && !b.disabled) return -1;
      if (!a.disabled && b.disabled) return 1;
      return 0;
    }),
  );
</script>

<svg width="100%" height="100%" aria-hidden="true" class="overflow-visible text-kumo-inactive">
  <defs>
    <marker
      id={markerId}
      markerWidth="8"
      markerHeight="8"
      refX="0"
      refY="4"
      orient="auto"
      markerUnits="userSpaceOnUse"
    >
      <path
        d="M 0,1.5 Q 0,0 1.5,0 Q 3.5,1 5.8,3.2 Q 6.5,4 5.8,4.8 Q 3.5,7 1.5,8 Q 0,8 0,6.5 Z"
        fill="currentColor"
        stroke="none"
      />
    </marker>
  </defs>
  {#each sortedConnectors as connector, index (connector.fromId && connector.toId ? `${connector.fromId}-${connector.toId}` : index)}
    {@const pathId =
      connector.fromId && connector.toId
        ? `${connector.fromId}-${connector.toId}`
        : `path-${index}`}
    <g class={connector.disabled ? "opacity-40" : undefined}>
      <path
        d={createRoundedPath(connector, {
          ...pathOptions,
          isBottom: connector.isBottom,
          orientation,
          single: connector.single,
        })}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        marker-end={`url(#${markerId})`}
        data-index={index}
        data-testid={pathId}
      />
    </g>
  {/each}
  {@render children?.()}
</svg>
