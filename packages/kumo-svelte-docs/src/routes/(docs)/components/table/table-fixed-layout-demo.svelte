<script lang="ts">
  import * as LayerCard from "kumo-svelte/components/layer-card";
  import * as Table from "kumo-svelte/components/table";

  const emailData = [
    { id: "1", subject: "Kumo v1.0.0 released", from: "Visal In", date: "5 seconds ago" },
    { id: "2", subject: "New Job Offer", from: "Cloudflare", date: "10 minutes ago" },
    {
      id: "3",
      subject: "Daily Email Digest",
      from: "Cloudflare",
      date: "1 hour ago",
      tags: ["promotion"],
    },
    { id: "4", subject: "GitLab - New Comment", from: "Rob Knecht", date: "1 day ago" },
    { id: "5", subject: "Out of Office", from: "Johnnie Lappen", date: "3 days ago" },
  ];
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
