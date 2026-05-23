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

  let smValue = $state("en");
  let baseValue = $state("fr");
  let smLabel = $derived(languageItems.find((language) => language.value === smValue)?.label);
  let baseLabel = $derived(languageItems.find((language) => language.value === baseValue)?.label);
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox.Root bind:value={smValue} size="sm">
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
  </Combobox.Root>

  <Combobox.Root bind:value={baseValue} size="base">
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
  </Combobox.Root>
</div>
