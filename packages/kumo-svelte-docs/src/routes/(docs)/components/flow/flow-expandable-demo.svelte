<script lang="ts">
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
  import * as Flow from "kumo-svelte/components/flow";

  let authOpen = $state(false);
  let rateLimitOpen = $state(false);
</script>

<Flow.Root>
  <Flow.Node>Incoming Request</Flow.Node>
  <Flow.Parallel>
    <Flow.Node class="overflow-hidden rounded-lg p-0">
      <button
        type="button"
        onclick={() => (authOpen = !authOpen)}
        class="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-kumo-default"
      >
        Auth Service
        <CaretDownIcon class={authOpen ? "size-4 rotate-180 text-kumo-subtle" : "size-4 text-kumo-subtle"} />
      </button>
      {#if authOpen}
        <div class="border-t border-kumo-hairline px-3 py-2 text-sm text-kumo-subtle">
          <p>Validates JWT tokens and session cookies.</p>
          <p class="mt-1">Connects to identity provider via OAuth 2.0.</p>
        </div>
      {/if}
    </Flow.Node>
    <Flow.Node class="overflow-hidden rounded-lg p-0">
      <button
        type="button"
        onclick={() => (rateLimitOpen = !rateLimitOpen)}
        class="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-kumo-default"
      >
        Rate Limiter
        <CaretDownIcon class={rateLimitOpen ? "size-4 rotate-180 text-kumo-subtle" : "size-4 text-kumo-subtle"} />
      </button>
      {#if rateLimitOpen}
        <div class="border-t border-kumo-hairline px-3 py-2 text-sm text-kumo-subtle">
          <p>Enforces per-IP request limits.</p>
          <p class="mt-1">Sliding window: 100 req/min.</p>
        </div>
      {/if}
    </Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Route to Origin</Flow.Node>
</Flow.Root>
