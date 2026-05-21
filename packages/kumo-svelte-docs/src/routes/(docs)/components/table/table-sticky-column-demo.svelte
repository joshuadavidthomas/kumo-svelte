<script lang="ts">
  import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    LayerCard,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "kumo-svelte";
  import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import PencilSimpleIcon from "phosphor-svelte/lib/PencilSimpleIcon";
  import TrashIcon from "phosphor-svelte/lib/TrashIcon";
  import { emailData } from "./table-data";
</script>

<LayerCard class="w-full max-w-md overflow-x-auto p-0">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Subject</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Tags</TableHead>
        <TableHead sticky="right"><span class="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each emailData as row (row.id)}
        <TableRow>
          <TableCell class="whitespace-nowrap">{row.subject}</TableCell>
          <TableCell class="whitespace-nowrap">{row.from}</TableCell>
          <TableCell class="whitespace-nowrap">{row.date}</TableCell>
          <TableCell class="whitespace-nowrap">
            {#if row.tags}
              <div class="inline-flex gap-1">{#each row.tags as tag}<Badge>{tag}</Badge>{/each}</div>
            {:else}
              —
            {/if}
          </TableCell>
          <TableCell sticky="right" class="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {#snippet child({ props })}
                  <Button {...props} variant="ghost" size="sm" shape="square" aria-label="More options" icon={DotsThreeIcon} />
                {/snippet}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  {#snippet icon()}<EyeIcon size={16} />{/snippet}
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {#snippet icon()}<PencilSimpleIcon size={16} />{/snippet}
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="danger">
                  {#snippet icon()}<TrashIcon size={16} />{/snippet}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</LayerCard>
