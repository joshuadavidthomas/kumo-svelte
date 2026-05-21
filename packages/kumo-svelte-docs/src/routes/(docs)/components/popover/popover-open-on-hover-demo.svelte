<script lang="ts">
  import {
    Button,
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverDescription,
    PopoverTitle,
    PopoverTrigger,
  } from "kumo-svelte";

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

<Popover bind:open>
  <PopoverTrigger onmouseenter={show} onmouseleave={hide}>
    {#snippet child({ props })}
      <Button {...props} variant="secondary">Hover Me</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent onmouseenter={show} onmouseleave={hide}>
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
