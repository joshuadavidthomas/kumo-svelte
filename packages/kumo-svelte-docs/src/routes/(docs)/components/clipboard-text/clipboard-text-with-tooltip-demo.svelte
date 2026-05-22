<script lang="ts">
  import { ClipboardText } from "kumo-svelte/components/clipboard-text";
</script>

<ClipboardText
  text="npx kumo add button"
  tooltip={{ text: "Copy", copiedText: "Copied!", side: "top" }}
/>
