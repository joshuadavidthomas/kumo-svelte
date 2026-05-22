<script lang="ts">
  import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
  import { Loader } from "kumo-svelte/components/loader";
  import * as InputGroup from "kumo-svelte/components/input-group";
  let value = $state("kumo");
  let status = $state<"idle" | "loading" | "success">("success");
  let timer: ReturnType<typeof setTimeout> | undefined;

  function handleValueChange(next: string) {
    value = next;
    if (timer) clearTimeout(timer);
    if (next.length > 0) {
      status = "loading";
      timer = setTimeout(() => {
        status = "success";
      }, 1500);
    } else {
      status = "idle";
    }
  }
</script>

<div class="w-full max-w-2xs">
  <InputGroup.Root>
    <InputGroup.Input maxlength={20} {value} onValueChange={handleValueChange} aria-label="Worker subdomain" />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
    {#if status !== "idle"}
      <InputGroup.Addon align="end">
        {#if status === "loading"}
          <Loader />
        {:else}
          <CheckCircleIcon weight="duotone" class="text-kumo-success" />
        {/if}
      </InputGroup.Addon>
    {/if}
  </InputGroup.Root>
</div>
