<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  let value = $state<string[]>(["Name", "Location", "Size"]);
</script>

<Select.Root
  label="Visible Columns"
  class="w-[250px]"
  multiple
  {value}
  onValueChange={(next) => (value = next as string[])}
>
  <Select.Option value="Name">Name</Select.Option>
  <Select.Option value="Location">Location</Select.Option>
  <Select.Option value="Size">Size</Select.Option>
  <Select.Option value="Read">Read</Select.Option>
  <Select.Option value="Write">Write</Select.Option>
  <Select.Option value="CreatedAt">Created At</Select.Option>
</Select.Root>
