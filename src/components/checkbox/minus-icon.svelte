<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  export interface MinusIconProps extends SVGAttributes<SVGSVGElement> {}

  let props: MinusIconProps = $props();
</script>

<svg aria-hidden="true" viewBox="0 0 256 256" fill="currentColor" {...props}>
  <path d="M216 136H40a8 8 0 0 1 0-16h176a8 8 0 0 1 0 16Z" />
</svg>
