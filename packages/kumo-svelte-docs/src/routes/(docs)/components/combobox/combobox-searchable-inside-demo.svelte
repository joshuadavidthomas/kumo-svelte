<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";

  const languages = [
    { value: "en", label: "English", emoji: "🇬🇧" },
    { value: "fr", label: "French", emoji: "🇫🇷" },
    { value: "de", label: "German", emoji: "🇩🇪" },
    { value: "es", label: "Spanish", emoji: "🇪🇸" },
    { value: "ja", label: "Japanese", emoji: "🇯🇵" },
  ];

  const languageItems = languages.map((language) => ({
    label: `${language.emoji} ${language.label}`,
    value: language.value,
  }));

  let value = $state("en");
  let open = $state(false);
  let selectedLabel = $derived(languageItems.find((language) => language.value === value)?.label);
</script>

<Combobox.Root bind:value bind:open>
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
