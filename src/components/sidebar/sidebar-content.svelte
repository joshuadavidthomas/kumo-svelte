<script lang="ts">
  import type { ComponentProps } from "svelte";
  import SidebarSection from "./sidebar-section.svelte";

  export interface SidebarContentProps
    extends Omit<ComponentProps<typeof SidebarSection>, "section"> {}

  let props: SidebarContentProps = $props();
</script>

<SidebarSection {...props} section="content" />
