<script lang="ts">
  import { Combobox } from "kumo-svelte";
  import { languageItems, languages } from "./combobox-data";

  let smValue = $state("en");
  let baseValue = $state("fr");
  let smLabel = $derived(languageItems.find((language) => language.value === smValue)?.label);
  let baseLabel = $derived(languageItems.find((language) => language.value === baseValue)?.label);
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox bind:value={smValue} items={languageItems} size="sm">
    <Combobox.TriggerValue class="w-[160px]">{smLabel}</Combobox.TriggerValue>
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
  </Combobox>

  <Combobox bind:value={baseValue} items={languageItems} size="base">
    <Combobox.TriggerValue class="w-[180px]">{baseLabel}</Combobox.TriggerValue>
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
  </Combobox>
</div>
