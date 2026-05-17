<script lang="ts">
  import type { ComponentProps } from "svelte";
  import SidebarSection from "./sidebar-section.svelte";

  export interface SidebarFooterProps
    extends Omit<ComponentProps<typeof SidebarSection>, "section"> {}

  let props: SidebarFooterProps = $props();
</script>

<SidebarSection {...props} section="footer" />
