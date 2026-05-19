import type { ComponentProps } from "svelte";
import CloudflareLogoComponent from "./cloudflare-logo.svelte";
import PoweredByCloudflareComponent from "./powered-by-cloudflare.svelte";

export { default as CloudflareLogo } from "./cloudflare-logo.svelte";
export { default as PoweredByCloudflare } from "./powered-by-cloudflare.svelte";
export type CloudflareLogoProps = ComponentProps<typeof CloudflareLogoComponent>;
export type PoweredByCloudflareProps = ComponentProps<typeof PoweredByCloudflareComponent>;
export {
  KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS,
  KUMO_CLOUDFLARE_LOGO_VARIANTS,
  type CloudflareLogoColor,
  type CloudflareLogoSvgColor,
  type CloudflareLogoSvgVariant,
  type CloudflareLogoVariant,
} from "./variants";
export { generateCloudflareLogoSvg, type GenerateCloudflareLogoSvgOptions } from "./svg";
