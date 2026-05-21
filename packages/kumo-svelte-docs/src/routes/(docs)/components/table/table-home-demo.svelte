<script lang="ts">
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "kumo-svelte";
</script>

<Table class="w-[200px] text-sm">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Worker 1</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Worker 2</TableCell>
      <TableCell>Paused</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Worker 3</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
