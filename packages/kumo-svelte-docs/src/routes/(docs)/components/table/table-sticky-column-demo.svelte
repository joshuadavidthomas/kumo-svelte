<script lang="ts">
  import { Badge } from "kumo-svelte/components/badge";
  import { Button } from "kumo-svelte/components/button";
  import * as DropdownMenu from "kumo-svelte/components/dropdown";
  import * as LayerCard from "kumo-svelte/components/layer-card";
  import * as Table from "kumo-svelte/components/table";
  import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";
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
</script>

<LayerCard.Root class="w-full max-w-md overflow-x-auto p-0">
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
        <Table.Head>Tags</Table.Head>
        <Table.Head sticky="right"><span class="sr-only">Actions</span></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each emailData as row (row.id)}
        <Table.Row>
          <Table.Cell class="whitespace-nowrap">{row.subject}</Table.Cell>
          <Table.Cell class="whitespace-nowrap">{row.from}</Table.Cell>
          <Table.Cell class="whitespace-nowrap">{row.date}</Table.Cell>
          <Table.Cell class="whitespace-nowrap">
            {#if row.tags}
              <div class="inline-flex gap-1">{#each row.tags as tag}<Badge>{tag}</Badge>{/each}</div>
            {:else}
              —
            {/if}
          </Table.Cell>
          <Table.Cell sticky="right" class="text-right">
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
