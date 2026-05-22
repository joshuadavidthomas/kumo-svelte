<script lang="ts">
  import { Table } from "kumo-svelte";
</script>

<Table class="w-[200px] text-sm">
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Worker 1</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Worker 2</Table.Cell>
      <Table.Cell>Paused</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Worker 3</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
