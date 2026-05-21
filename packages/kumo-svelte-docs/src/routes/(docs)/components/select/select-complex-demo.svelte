<script lang="ts">
  import { Select, SelectOption, Text } from "kumo-svelte";

  const authors = [
    { id: "1", name: "John Doe", title: "Programmer" },
    { id: "2", name: "Alice Smith", title: "Software Engineer" },
    { id: "3", name: "Michael Chan", title: "UI/UX Designer" },
    { id: "4", name: "Sok Dara", title: "DevOps Engineer" },
  ];

  let value = $state("");
</script>

<Select
  label="Author"
  description="Select the primary author for this document"
  placeholder="Select an author"
  class="w-[220px]"
  {value}
  onValueChange={(next) => (value = next as string)}
>
  {#each authors as author (author.id)}
    <SelectOption value={author.id} label={author.name}>
      <div class="flex w-[300px] items-center justify-between gap-2">
        <Text>{author.name}</Text>
        <Text variant="secondary">{author.title}</Text>
      </div>
    </SelectOption>
  {/each}
</Select>
