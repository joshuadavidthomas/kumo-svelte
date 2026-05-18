<script lang="ts">
  import { componentItems } from "$lib/component-docs";
  import AutocompleteDemo from "./components/autocomplete/autocomplete-demo.svelte";
  import ButtonDemo from "./components/button/button-home-demo.svelte";

  const previews = {
    autocomplete: AutocompleteDemo,
    button: ButtonDemo,
  };
</script>

<svelte:head>
  <title>Kumo Svelte</title>
  <meta name="description" content="A SvelteKit documentation site for the Kumo Svelte component library." />
</svelte:head>

<ul class="grid auto-rows-min grid-cols-1 gap-px bg-[var(--kumo-line)] md:grid-cols-2 xl:grid-cols-3">
  {#each componentItems as item (item.href)}
    {@const Preview = previews[item.slug as keyof typeof previews]}
    <li class="relative grid aspect-square bg-[var(--kumo-black)] p-4">
      <a class="absolute top-4 left-4 z-10 text-sm font-semibold text-[var(--kumo-text)] no-underline" href={item.href}>
        {item.label}
      </a>

      <div class="flex min-w-0 items-center justify-center p-8">
        {#if Preview}
          <Preview />
        {:else}
          <p class="max-w-56 text-center text-sm leading-6 text-[var(--kumo-muted)]">{item.description}</p>
        {/if}
      </div>
    </li>
  {/each}
</ul>
