<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  export interface CheckIconProps extends SVGAttributes<SVGSVGElement> {}

  let props: CheckIconProps = $props();
</script>

<svg aria-hidden="true" viewBox="0 0 256 256" fill="currentColor" {...props}>
  <path
    d="M229.7 77.7l-128 128a8.2 8.2 0 0 1-11.4 0l-56-56a8 8 0 0 1 11.4-11.4L96 188.7 218.3 66.3a8 8 0 0 1 11.4 11.4Z"
  />
</svg>
