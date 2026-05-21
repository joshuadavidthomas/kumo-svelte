<script lang="ts">
  import TextBIcon from "phosphor-svelte/lib/TextBIcon";
  import TextItalicIcon from "phosphor-svelte/lib/TextItalicIcon";
  import { MenuBar } from "kumo-svelte";

  let active = $state<string | undefined>();

</script>

{#snippet boldIcon()}
  <TextBIcon />
{/snippet}

{#snippet italicIcon()}
  <TextItalicIcon />
{/snippet}

<MenuBar
  isActive={active}
  optionIds
  options={[
    {
      icon: boldIcon,
      id: "bold",
      tooltip: "Bold",
      onSelect: () => {
        active = active === "bold" ? undefined : "bold";
      },
    },
    {
      icon: italicIcon,
      id: "italic",
      tooltip: "Italic",
      onSelect: () => {
        active = active === "italic" ? undefined : "italic";
      },
    },
  ]}
/>
