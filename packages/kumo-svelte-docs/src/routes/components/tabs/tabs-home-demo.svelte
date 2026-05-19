<script lang="ts">
  import { Tabs } from "kumo-svelte";

  const tabs = [
    { value: "home", label: "Home" },
    { value: "about", label: "About" },
    { value: "contact", label: "Contact" },
  ];
</script>

<Tabs {tabs} selectedValue="home" />
