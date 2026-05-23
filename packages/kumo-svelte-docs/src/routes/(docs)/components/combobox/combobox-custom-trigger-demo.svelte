<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import * as Combobox from "kumo-svelte/components/combobox";
  import CaretUpDownIcon from "phosphor-svelte/lib/CaretUpDownIcon";

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

{#snippet triggerChild({ props }: { props: Record<string, unknown> })}
  <Button {...props} variant="ghost" size="sm">
    <span class="truncate">{selectedLabel}</span>
    <CaretUpDownIcon size={14} class="shrink-0 text-kumo-subtle" />
  </Button>
{/snippet}

<Combobox.Root bind:value bind:open>
  <Combobox.Trigger child={triggerChild} />
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
