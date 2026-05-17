<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  export interface CheckIconProps extends Omit<SVGAttributes<SVGElement>, "children"> {
    size?: number;
  }

  let { size = 16, ...restProps }: CheckIconProps = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  fill="none"
  viewBox="0 0 24 24"
  {...restProps}
>
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="m20 6-11 11-5-5"
  />
</svg>
