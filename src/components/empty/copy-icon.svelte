<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  export interface CopyIconProps extends Omit<SVGAttributes<SVGElement>, "children"> {
    size?: number;
  }

  let { size = 16, ...restProps }: CopyIconProps = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  fill="none"
  viewBox="0 0 24 24"
  {...restProps}
>
  <rect
    width="12"
    height="12"
    x="8"
    y="8"
    stroke="currentColor"
    stroke-linejoin="round"
    stroke-width="2"
    rx="2"
  />
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
  />
</svg>
