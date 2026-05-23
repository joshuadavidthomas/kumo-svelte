<script lang="ts">
  interface Props {
    size?: number;
  }

  let { size = 20 }: Props = $props();
</script>

<svg width={size} height={size} viewBox="-6 -6 62 62" fill="currentColor" aria-hidden="true">
  <path d="M13.8889 13.8889H25V22.2222H13.8889V13.8889Z" />
  <path d="M36.1111 36.1111V27.7778H13.8889V36.1111H36.1111Z" />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M38.8889 0H0V50H50V13.8889H38.8889V0ZM8.33333 41.6667V8.33333H30.5556V22.2222H41.6667V41.6667H8.33333Z"
  />
</svg>
