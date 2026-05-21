<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTriggerValue } from "kumo-svelte";
  import { languageItems, languages } from "./combobox-data";

  let smValue = $state("en");
  let baseValue = $state("fr");
  let smLabel = $derived(languageItems.find((language) => language.value === smValue)?.label);
  let baseLabel = $derived(languageItems.find((language) => language.value === baseValue)?.label);
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox bind:value={smValue} items={languageItems} size="sm">
    <ComboboxTriggerValue class="w-[160px]">{smLabel}</ComboboxTriggerValue>
    <ComboboxContent>
      <ComboboxInput placeholder="Search" />
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

  <Combobox bind:value={baseValue} items={languageItems} size="base">
    <ComboboxTriggerValue class="w-[180px]">{baseLabel}</ComboboxTriggerValue>
    <ComboboxContent>
      <ComboboxInput placeholder="Search" />
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
</div>
