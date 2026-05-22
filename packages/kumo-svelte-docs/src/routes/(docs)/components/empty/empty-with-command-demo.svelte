<script lang="ts">
  import { Empty } from "kumo-svelte/components/empty";
  import FolderOpenIcon from "phosphor-svelte/lib/FolderOpenIcon";
</script>

{#snippet folderIcon()}
  <FolderOpenIcon size={48} class="text-kumo-inactive" />
{/snippet}

<Empty
  icon={folderIcon}
  title="No projects found"
  description="Get started by creating your first project using the command below."
  commandLine="npm create kumo-project"
/>
