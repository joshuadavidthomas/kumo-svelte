<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";
  import { fruits, languageItems, languages } from "./combobox-data";

  const fruitItems = fruits.map((fruit) => ({ label: fruit, value: fruit }));
  let selectedLanguageLabel = $derived(languageItems.find((language) => language.value === "en")?.label);
</script>

<div class="flex flex-wrap items-start gap-4">
  <Combobox.Root disabled value="Apple" items={fruitItems}>
    <Combobox.TriggerInput class="w-[200px]" placeholder="Select fruit" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#each fruits as fruit}
          <Combobox.Item value={fruit}>{fruit}</Combobox.Item>
        {/each}
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>

  <Combobox.Root disabled value="en" items={languageItems}>
    <Combobox.TriggerValue class="w-[200px]">{selectedLanguageLabel}</Combobox.TriggerValue>
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#each languages as language}
          <Combobox.Item value={language.value} label={`${language.emoji} ${language.label}`}>
            {language.emoji} {language.label}
          </Combobox.Item>
        {/each}
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>
</div>
