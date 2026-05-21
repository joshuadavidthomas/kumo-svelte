<script lang="ts">
  import {
    Button,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
  } from "kumo-svelte";
  import CaretUpDownIcon from "phosphor-svelte/lib/CaretUpDownIcon";
  import { languageItems, languages } from "./combobox-data";

  let value = $state("en");
  let open = $state(false);
  let selectedLabel = $derived(languageItems.find((language) => language.value === value)?.label);
</script>

{#snippet triggerChild({ props }: { props: Record<string, unknown> })}
  <Button {...props} variant="ghost" size="sm">
    <span class="truncate">{selectedLabel}</span>
    <CaretUpDownIcon size={14} class="shrink-0 text-kumo-subtle" />
  </Button>
{/snippet}

<Combobox bind:value bind:open items={languageItems}>
  <ComboboxTrigger child={triggerChild} />
  <ComboboxContent>
    <ComboboxInput placeholder="Search languages" />
    <ComboboxEmpty />
    <ComboboxList>
      {#each languages as language}
        <ComboboxItem value={language.value} label={`${language.emoji} ${language.label}`}>
          {language.emoji} {language.label}
        </ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
