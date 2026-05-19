<script lang="ts">
  import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTriggerValue } from "kumo-svelte";

  const languages = [
    { value: "en", label: "🇬🇧 English" },
    { value: "fr", label: "🇫🇷 French" },
    { value: "de", label: "🇩🇪 German" },
    { value: "es", label: "🇪🇸 Spanish" },
    { value: "ja", label: "🇯🇵 Japanese" },
  ];

  let value = $state("en");
  let open = $state(false);
  let selectedLabel = $derived(languages.find((language) => language.value === value)?.label);
</script>

<Combobox bind:value bind:open items={languages}>
  <ComboboxTriggerValue class="w-[200px]">{selectedLabel}</ComboboxTriggerValue>
  <ComboboxContent>
    <ComboboxInput placeholder="Search languages" />
    <ComboboxList>
      {#each languages as language}
        <ComboboxItem value={language.value} label={language.label}>{language.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
