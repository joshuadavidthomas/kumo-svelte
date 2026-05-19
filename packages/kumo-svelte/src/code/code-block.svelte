<script lang="ts">
  import { cn } from "../utils/cn";

  export interface CodeBlockProps {
    class?: string;
    className?: string;
    html: string;
  }

  let { class: className, className: legacyClassName, html }: CodeBlockProps =
    $props();
</script>

<div
  class={cn(
    "group relative w-full min-w-0 rounded-md border border-kumo-fill bg-kumo-base",
    className ?? legacyClassName,
  )}
>
  <div class="overflow-x-auto">
    <div
      class="kumo-shiki [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed"
    >
      <!-- Intended for HTML returned by highlightCode() or createServerHighlighter(). -->
      {@html html}
    </div>
  </div>
</div>
