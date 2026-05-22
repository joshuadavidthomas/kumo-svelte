<script lang="ts">
  import { LinkButton } from "kumo-svelte/components/button";
  import ArrowSquareOutIcon from "phosphor-svelte/lib/ArrowSquareOutIcon";
</script>

<div class="flex flex-wrap items-center gap-2">
  <LinkButton href="/components/link" variant="secondary">
    Read Link docs
  </LinkButton>
  <LinkButton href="https://developers.cloudflare.com"
    variant="ghost"
    icon={ArrowSquareOutIcon}
    external
  >
    Cloudflare docs
  </LinkButton>
</div>
