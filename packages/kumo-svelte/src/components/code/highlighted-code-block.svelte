<script lang="ts">
  import { cn } from "../../utils/cn";

  export interface CodeBlockProps {
    class?: string;
    html: string;
  }

  let { class: className, html: trustedHtml }: CodeBlockProps = $props();
</script>

<div
  class={cn(
    "group relative w-full min-w-0 rounded-md border border-kumo-fill bg-kumo-base",
    className,
  )}
>
  <div class="overflow-x-auto">
    <div
      class="kumo-shiki [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed"
    >
      <!-- Intended for trusted HTML returned by highlightCode() or createServerHighlighter(). -->
      {@html trustedHtml}
    </div>
  </div>
</div>
