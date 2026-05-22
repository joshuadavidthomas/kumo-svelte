<script lang="ts">
  import * as Select from "kumo-svelte/components/select";
  const items = {
    all: "All deployed versions",
    active: "Active versions",
    specific: "Specific versions",
  };
</script>

<Select.Root aria-label="Select version" class="w-[200px]" placeholder="Select version" {items} />
