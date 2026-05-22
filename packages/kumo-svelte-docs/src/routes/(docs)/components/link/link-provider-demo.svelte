<script lang="ts">
  import { ExternalIcon, Link } from "kumo-svelte/components/link";
  import { LinkProvider } from "kumo-svelte/utils";
  import CustomRouterLink from "./custom-router-link.svelte";
</script>

<LinkProvider component={CustomRouterLink}>
  <div class="flex flex-col gap-x-6 gap-y-4 text-base md:flex-row">
    <Link href="/components/button" variant="inline">Button docs (via provider)</Link>
    <Link href="https://developers.cloudflare.com" target="_blank" rel="noopener noreferrer" variant="inline">
      Cloudflare Docs <ExternalIcon />
    </Link>
  </div>
</LinkProvider>
