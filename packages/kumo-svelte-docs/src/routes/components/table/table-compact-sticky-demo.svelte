<script lang="ts">
  import { Badge, Button, LayerCard, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "kumo-svelte";
  import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";
  import { emailData } from "./table-data";
</script>

<LayerCard class="w-full max-w-md overflow-x-auto p-0">
  <Table>
    <TableHeader variant="compact">
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
          <TableCell class="whitespace-nowrap">{#if row.tags}<Badge>{row.tags[0]}</Badge>{:else}—{/if}</TableCell>
          <TableCell sticky="right" class="text-right">
            <Button variant="ghost" size="sm" shape="square" aria-label="More options" icon={DotsThreeIcon} />
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</LayerCard>
