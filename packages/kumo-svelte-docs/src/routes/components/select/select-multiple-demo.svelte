<script lang="ts">
  import { Select, SelectOption } from "kumo-svelte";

  let value = $state<string[]>(["Name", "Location", "Size"]);
</script>

<Select
  label="Visible Columns"
  class="w-[250px]"
  multiple
  {value}
  onValueChange={(next) => (value = next as string[])}
>
  <SelectOption value="Name">Name</SelectOption>
  <SelectOption value="Location">Location</SelectOption>
  <SelectOption value="Size">Size</SelectOption>
  <SelectOption value="Read">Read</SelectOption>
  <SelectOption value="Write">Write</SelectOption>
  <SelectOption value="CreatedAt">Created At</SelectOption>
</Select>
