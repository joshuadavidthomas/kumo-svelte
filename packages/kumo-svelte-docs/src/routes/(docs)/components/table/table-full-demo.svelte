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
    TableCheckCell,
    TableCheckHead,
    TableHead,
    TableHeader,
    TableRow,
  } from "kumo-svelte";
  import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";
  import EnvelopeSimpleIcon from "phosphor-svelte/lib/EnvelopeSimpleIcon";
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import PencilSimpleIcon from "phosphor-svelte/lib/PencilSimpleIcon";
  import TrashIcon from "phosphor-svelte/lib/TrashIcon";
  import { emailData } from "./table-data";

  let selectedIds = $state(new Set<string>(["2"]));

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  }
</script>

<LayerCard class="w-full overflow-x-auto p-0">
  <Table layout="fixed">
    <colgroup>
      <col />
      <col />
      <col style="width: 150px;" />
      <col style="width: 120px;" />
      <col style="width: 50px;" />
    </colgroup>
    <TableHeader>
      <TableRow>
        <TableCheckHead checked={selectedIds.size === emailData.length} indeterminate={selectedIds.size > 0 && selectedIds.size < emailData.length} />
        <TableHead>Subject</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Date</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each emailData as row (row.id)}
        <TableRow variant={selectedIds.has(row.id) ? "selected" : "default"}>
          <TableCheckCell checked={selectedIds.has(row.id)} onCheckedChange={() => toggleRow(row.id)} />
          <TableCell>
            <div class="flex items-center gap-2">
              <EnvelopeSimpleIcon size={16} />
              <span class="truncate">{row.subject}</span>
              {#if row.tags}
                <div class="ml-2 inline-flex gap-1">
                  {#each row.tags as tag}<Badge>{tag}</Badge>{/each}
                </div>
              {/if}
            </div>
          </TableCell>
          <TableCell><span class="truncate">{row.from}</span></TableCell>
          <TableCell><span class="truncate">{row.date}</span></TableCell>
          <TableCell class="text-right">
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
