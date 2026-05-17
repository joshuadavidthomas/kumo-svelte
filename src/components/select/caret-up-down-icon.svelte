<script lang="ts">
  export interface CaretUpDownIconProps {
    size?: number;
    class?: string;
  }

  let { size = 16, class: className }: CaretUpDownIconProps = $props();
</script>

<svg
  aria-hidden="true"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  class={className}
  fill="currentColor"
>
  <path
    fill-rule="evenodd"
    d="M4.22 6.28a.75.75 0 0 0 1.06 0L8 3.56l2.72 2.72a.75.75 0 1 0 1.06-1.06L8.53 1.97a.75.75 0 0 0-1.06 0L4.22 5.22a.75.75 0 0 0 0 1.06Zm7.56 3.44a.75.75 0 0 0-1.06 0L8 12.44 5.28 9.72a.75.75 0 1 0-1.06 1.06l3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 0 0 0-1.06Z"
    clip-rule="evenodd"
  />
</svg>
