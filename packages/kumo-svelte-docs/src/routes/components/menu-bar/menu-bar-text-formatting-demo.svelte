<script lang="ts">
  import TextBIcon from "phosphor-svelte/lib/TextBIcon";
  import TextItalicIcon from "phosphor-svelte/lib/TextItalicIcon";
  import TextUnderlineIcon from "phosphor-svelte/lib/TextUnderlineIcon";
  import { MenuBar } from "kumo-svelte";

  let active = $state<string | undefined>("bold");

</script>

{#snippet boldIcon()}
  <TextBIcon />
{/snippet}

{#snippet italicIcon()}
  <TextItalicIcon />
{/snippet}

{#snippet underlineIcon()}
  <TextUnderlineIcon />
{/snippet}

<MenuBar
  isActive={active}
  optionIds
  options={[
    {
      icon: boldIcon,
      id: "bold",
      tooltip: "Bold",
      onClick: () => {
        active = active === "bold" ? undefined : "bold";
      },
    },
    {
      icon: italicIcon,
      id: "italic",
      tooltip: "Italic",
      onClick: () => {
        active = active === "italic" ? undefined : "italic";
      },
    },
    {
      icon: underlineIcon,
      id: "underline",
      tooltip: "Underline",
      onClick: () => {
        active = active === "underline" ? undefined : "underline";
      },
    },
  ]}
/>
