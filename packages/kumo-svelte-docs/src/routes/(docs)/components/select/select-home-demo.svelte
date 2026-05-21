<script lang="ts">
  import { Select } from "kumo-svelte";

  const items = {
    all: "All deployed versions",
    active: "Active versions",
    specific: "Specific versions",
  };
</script>

<Select aria-label="Select version" class="w-[200px]" placeholder="Select version" {items} />
