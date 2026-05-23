<script lang="ts">
  import { Badge } from "kumo-svelte/components/badge";
  import { Button } from "kumo-svelte/components/button";
  import * as DropdownMenu from "kumo-svelte/components/dropdown";
  import * as LayerCard from "kumo-svelte/components/layer-card";
  import * as Table from "kumo-svelte/components/table";
  import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";
  import EnvelopeSimpleIcon from "phosphor-svelte/lib/EnvelopeSimpleIcon";
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import PencilSimpleIcon from "phosphor-svelte/lib/PencilSimpleIcon";
  import TrashIcon from "phosphor-svelte/lib/TrashIcon";

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

  let selectedIds = $state(new Set<string>(["2"]));

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  }
</script>

<LayerCard.Root class="w-full overflow-x-auto p-0">
  <Table.Root layout="fixed">
    <colgroup>
      <col />
      <col />
      <col style="width: 150px;" />
      <col style="width: 120px;" />
      <col style="width: 50px;" />
    </colgroup>
    <Table.Header>
      <Table.Row>
        <Table.CheckHead checked={selectedIds.size === emailData.length} indeterminate={selectedIds.size > 0 && selectedIds.size < emailData.length} />
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
        <Table.Head></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each emailData as row (row.id)}
        <Table.Row variant={selectedIds.has(row.id) ? "selected" : "default"}>
          <Table.CheckCell checked={selectedIds.has(row.id)} onCheckedChange={() => toggleRow(row.id)} />
          <Table.Cell>
            <div class="flex items-center gap-2">
              <EnvelopeSimpleIcon size={16} />
              <span class="truncate">{row.subject}</span>
              {#if row.tags}
                <div class="ml-2 inline-flex gap-1">
                  {#each row.tags as tag}<Badge>{tag}</Badge>{/each}
                </div>
              {/if}
            </div>
          </Table.Cell>
          <Table.Cell><span class="truncate">{row.from}</span></Table.Cell>
          <Table.Cell><span class="truncate">{row.date}</span></Table.Cell>
          <Table.Cell class="text-right">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {#snippet child({ props })}
                  <Button {...props} variant="ghost" size="sm" shape="square" aria-label="More options" icon={DotsThreeIcon} />
                {/snippet}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  {#snippet icon()}<EyeIcon size={16} />{/snippet}
                  View
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  {#snippet icon()}<PencilSimpleIcon size={16} />{/snippet}
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item variant="danger">
                  {#snippet icon()}<TrashIcon size={16} />{/snippet}
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</LayerCard.Root>
