<script lang="ts">
  import { Empty } from "kumo-svelte/components/empty";
  import FolderOpenIcon from "phosphor-svelte/lib/FolderOpenIcon";
</script>

<Empty
  title="No projects found"
  description="Get started by creating your first project using the command below."
  command="npm create kumo-project"
>
  {#snippet icon()}
    <FolderOpenIcon size={48} class="text-kumo-inactive" />
  {/snippet}
</Empty>
