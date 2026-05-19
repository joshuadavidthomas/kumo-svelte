<script lang="ts">
  import { Button, Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle } from "kumo-svelte";

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

<div role="presentation" onmouseenter={show} onmouseleave={hide}>
  <Button variant="secondary" aria-haspopup="dialog">Hover Me</Button>
  <Popover bind:open>
    <PopoverContent>
      <PopoverTitle>Hover Triggered</PopoverTitle>
      <PopoverDescription>
        This popover opens on hover with a 200ms delay. It can still contain interactive content like buttons and links.
      </PopoverDescription>
      <div class="mt-3">
        <PopoverClose>
          {#snippet child({ props })}
            <Button {...props} variant="secondary" size="sm">Got it</Button>
          {/snippet}
        </PopoverClose>
      </div>
    </PopoverContent>
  </Popover>
</div>
