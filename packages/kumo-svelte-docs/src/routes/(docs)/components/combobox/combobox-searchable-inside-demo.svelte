<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";
  import { languageItems, languages } from "./combobox-data";

  let value = $state("en");
  let open = $state(false);
  let selectedLabel = $derived(languageItems.find((language) => language.value === value)?.label);
</script>

<Combobox.Root bind:value bind:open items={languageItems}>
  <Combobox.TriggerValue class="w-[200px]">{selectedLabel}</Combobox.TriggerValue>
  <Combobox.Content>
    <Combobox.Input placeholder="Search languages" />
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
