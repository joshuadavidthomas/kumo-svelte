<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTriggerValue } from "kumo-svelte";
  import { languageItems, languages } from "./combobox-data";

  let value = $state("");
  let open = $state(false);
  let selectedLabel = $derived(languageItems.find((language) => language.value === value)?.label);
</script>

<Combobox bind:value bind:open items={languageItems}>
  <ComboboxTriggerValue class="w-[200px]" placeholder="Select a language">
    {selectedLabel}
  </ComboboxTriggerValue>
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
