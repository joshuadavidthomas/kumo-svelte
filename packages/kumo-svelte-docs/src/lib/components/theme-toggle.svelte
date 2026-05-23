<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "kumo-svelte/components/button";
  import MoonIcon from "phosphor-svelte/lib/MoonIcon";
  import SunIcon from "phosphor-svelte/lib/SunIcon";

  type Theme = "light" | "dark";

  let mounted = $state(false);
  let theme = $state<Theme>("light");

  onMount(() => {
    mounted = true;

    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      theme = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  });

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    theme = newTheme;
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-mode", newTheme);
  }
</script>

{#if mounted}
  <Button
    variant="ghost"
    shape="square"
    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    onclick={toggleTheme}
  >
    {#if theme === "light"}
      <MoonIcon size={20} aria-hidden="true" />
    {:else}
      <SunIcon size={20} aria-hidden="true" />
    {/if}
  </Button>
{:else}
  <Button variant="ghost" shape="square" aria-label="Toggle theme">
    <SunIcon size={20} aria-hidden="true" />
  </Button>
{/if}
