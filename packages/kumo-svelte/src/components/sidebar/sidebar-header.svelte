<script lang="ts">
  import type { ComponentProps } from "svelte";
  import SidebarSection from "./sidebar-section.svelte";

  export interface SidebarHeaderProps
    extends Omit<ComponentProps<typeof SidebarSection>, "section"> {}

  let props: SidebarHeaderProps = $props();
</script>

<SidebarSection {...props} section="header" />
