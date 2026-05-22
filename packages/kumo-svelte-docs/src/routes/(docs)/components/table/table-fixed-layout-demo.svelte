<script lang="ts">
  import * as LayerCard from "kumo-svelte/components/layer-card";
  import * as Table from "kumo-svelte/components/table";
  import { emailData } from "./table-data";
</script>

<LayerCard.Root class="p-0">
  <Table.Root layout="fixed">
    <colgroup>
      <col />
      <col class="w-[150px]" />
      <col class="w-[150px]" />
    </colgroup>
    <Table.Header>
      <Table.Row>
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each emailData as row (row.id)}
        <Table.Row>
          <Table.Cell>{row.subject}</Table.Cell>
          <Table.Cell>{row.from}</Table.Cell>
          <Table.Cell>{row.date}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</LayerCard.Root>
