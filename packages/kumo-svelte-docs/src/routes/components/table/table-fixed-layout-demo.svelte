<script lang="ts">
  import { LayerCard, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "kumo-svelte";
  import { emailData } from "./table-data";
</script>

<LayerCard class="p-0">
  <Table layout="fixed">
    <colgroup>
      <col />
      <col class="w-[150px]" />
      <col class="w-[150px]" />
    </colgroup>
    <TableHeader>
      <TableRow>
        <TableHead>Subject</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each emailData as row (row.id)}
        <TableRow>
          <TableCell>{row.subject}</TableCell>
          <TableCell>{row.from}</TableCell>
          <TableCell>{row.date}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</LayerCard>
