<script lang="ts">
  import { Button } from "kumo-svelte/components/button";
  import * as Popover from "kumo-svelte/components/popover";
  let open = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  function show() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      open = true;
    }, 200);
  }

  function hide() {
    if (timer) clearTimeout(timer);
    open = false;
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger onmouseenter={show} onmouseleave={hide}>
    {#snippet child({ props })}
      <Button {...props} variant="secondary">Hover Me</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content onmouseenter={show} onmouseleave={hide}>
    <Popover.Title>Hover Triggered</Popover.Title>
    <Popover.Description>
      This popover opens on hover with a 200ms delay. It can still contain interactive content like buttons and links.
    </Popover.Description>
    <div class="mt-3">
      <Popover.Close>
        {#snippet child({ props })}
          <Button {...props} variant="secondary" size="sm">Got it</Button>
        {/snippet}
      </Popover.Close>
    </div>
  </Popover.Content>
</Popover.Root>
