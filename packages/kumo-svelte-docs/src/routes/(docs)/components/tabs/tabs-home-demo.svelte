<script lang="ts">
  import * as Tabs from "kumo-svelte/components/tabs";
  const tabs = [
    { value: "home", label: "Home" },
    { value: "about", label: "About" },
    { value: "contact", label: "Contact" },
  ];
</script>

<Tabs.Root {tabs} selectedValue="home" />
