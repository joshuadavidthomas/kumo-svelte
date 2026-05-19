<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    additionalContent?: Snippet;
    children: Snippet;
    description?: string;
    icon?: Snippet;
    title?: string;
    usage?: Snippet;
  }

  let { additionalContent, children, description, icon, title, usage }: Props = $props();
</script>

<div class="min-h-[400px] w-full rounded-lg bg-kumo-overlay">
  <div class="mx-auto flex max-w-[1400px] flex-col gap-6 p-6 md:p-8">
    <div class="flex flex-col">
      <div class="mb-1.5 flex items-center gap-1.5">
        {@render icon?.()}
        {#if title}<h2 class="m-0 p-0 text-3xl font-semibold">{title}</h2>{/if}
      </div>
      {#if description}
        <p class="m-0 hidden text-lg leading-normal text-pretty text-kumo-subtle md:block">{description}</p>
      {/if}
    </div>

    <div class="flex flex-col-reverse gap-6 xl:flex-row xl:gap-8">
      <div class="min-w-0 grow">{@render children()}</div>

      {#if usage || additionalContent}
        <div class="top-22 flex h-fit w-full shrink-0 flex-col gap-4 xl:sticky xl:w-[380px]">
          {@render usage?.()}
          {#if additionalContent}
            <div class={usage ? "mt-6" : ""}>{@render additionalContent()}</div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>
