<script lang="ts">
  import * as Combobox from "kumo-svelte/components/combobox";

  const fruits = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Mango", "Orange", "Pear"];

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

  let selectedLanguageLabel = $derived(languageItems.find((language) => language.value === "en")?.label);
</script>

<div class="flex flex-wrap items-start gap-4">
  <Combobox.Root disabled value="Apple">
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

  <Combobox.Root disabled value="en">
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
