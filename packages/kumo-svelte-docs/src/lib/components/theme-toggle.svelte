<script lang="ts">
  import { mode, toggleMode } from "mode-watcher";
  import { Button } from "kumo-svelte/components/button";
  import MoonIcon from "phosphor-svelte/lib/MoonIcon";
  import SunIcon from "phosphor-svelte/lib/SunIcon";

  let currentMode = $derived(mode.current ?? "light");

  $effect(() => {
    document.documentElement.setAttribute("data-mode", currentMode);
  });
</script>

<Button
  variant="ghost"
  shape="square"
  aria-label={`Switch to ${currentMode === "light" ? "dark" : "light"} mode`}
  onclick={toggleMode}
>
  {#if currentMode === "light"}
    <MoonIcon size={20} aria-hidden="true" />
  {:else}
    <SunIcon size={20} aria-hidden="true" />
  {/if}
</Button>
