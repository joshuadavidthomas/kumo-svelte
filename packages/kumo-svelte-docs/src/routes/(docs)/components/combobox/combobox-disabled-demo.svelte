<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTriggerInput, ComboboxTriggerValue } from "kumo-svelte";
  import { fruits, languageItems, languages } from "./combobox-data";

  const fruitItems = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  let selectedLanguageLabel = $derived(languageItems.find((language) => language.value === "en")?.label);
</script>

<div class="flex flex-wrap items-start gap-4">
  <Combobox disabled value="Apple" items={fruitItems}>
    <ComboboxTriggerInput class="w-[200px]" placeholder="Select fruit" />
    <ComboboxContent>
      <ComboboxEmpty />
      <ComboboxList>
        {#each fruits as fruit}
          <ComboboxItem value={fruit}>{fruit}</ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>

  <Combobox disabled value="en" items={languageItems}>
    <ComboboxTriggerValue class="w-[200px]">{selectedLanguageLabel}</ComboboxTriggerValue>
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
