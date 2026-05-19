<script lang="ts">
  import { LayerCard, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "kumo-svelte";
  import { emailData } from "./table-data";
</script>

<LayerCard class="p-0">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Subject</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each emailData.slice(0, 3) as row (row.id)}
        <TableRow variant={row.id === "2" ? "selected" : "default"}>
          <TableCell>{row.subject}</TableCell>
          <TableCell>{row.from}</TableCell>
          <TableCell>{row.date}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</LayerCard>
