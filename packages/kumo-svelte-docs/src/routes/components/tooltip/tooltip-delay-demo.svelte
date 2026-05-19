<script lang="ts">
  import { Button, Tooltip, TooltipProvider } from "kumo-svelte";
</script>

<TooltipProvider>
  <div class="flex flex-wrap gap-4">
    <Tooltip content="Opens after 1 second" delay={1000}>
      <Button variant="secondary">1s open delay</Button>
    </Tooltip>
    <Tooltip content="Uses the default close behavior" delay={0}>
      <Button variant="secondary">Instant open</Button>
    </Tooltip>
    <Tooltip content="This tooltip is disabled" disabled>
      <Button variant="secondary">Disabled</Button>
    </Tooltip>
  </div>
</TooltipProvider>
