<script lang="ts">
  import { Select } from "kumo-svelte";

  const languages = [
    { value: "en", label: "English", emoji: "🇬🇧" },
    { value: "fr", label: "French", emoji: "🇫🇷" },
    { value: "de", label: "German", emoji: "🇩🇪" },
    { value: "es", label: "Spanish", emoji: "🇪🇸" },
  ];

  let value = $state("en");
</script>

<Select label="Language" class="w-[200px]" {value} onValueChange={(next) => (value = next as string)}>
  {#each languages as language (language.value)}
    <Select.Option value={language.value} label={`${language.emoji} ${language.label}`}>
      {language.emoji} {language.label}
    </Select.Option>
  {/each}
</Select>
