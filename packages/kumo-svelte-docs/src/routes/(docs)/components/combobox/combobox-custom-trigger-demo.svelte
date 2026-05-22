<script lang="ts">
  import { Button, Combobox } from "kumo-svelte";
  import CaretUpDownIcon from "phosphor-svelte/lib/CaretUpDownIcon";
  import { languageItems, languages } from "./combobox-data";

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

<Combobox bind:value bind:open items={languageItems}>
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
</Combobox>
