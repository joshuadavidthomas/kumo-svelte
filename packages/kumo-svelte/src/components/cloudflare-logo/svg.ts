import {
  CLOUDFLARE_FULL_LOGO_ORANGE_PATH,
  CLOUDFLARE_FULL_LOGO_VIEWBOX,
  CLOUDFLARE_FULL_LOGO_YELLOW_PATH,
  CLOUDFLARE_GLYPH_ORANGE_PATH,
  CLOUDFLARE_GLYPH_VIEWBOX,
  CLOUDFLARE_GLYPH_YELLOW_PATH,
  CLOUDFLARE_ORANGE,
  CLOUDFLARE_TEXT_GRAY,
  CLOUDFLARE_WORDMARK_PATHS,
  CLOUDFLARE_YELLOW,
} from "./data";
import {
  KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS,
  type CloudflareLogoSvgColor,
  type CloudflareLogoSvgVariant,
} from "./variants";

export interface GenerateCloudflareLogoSvgOptions {
  variant?: CloudflareLogoSvgVariant;
  color?: CloudflareLogoSvgColor;
}

export function generateCloudflareLogoSvg(options: GenerateCloudflareLogoSvgOptions = {}): string {
  const {
    variant = KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS.variant,
    color = KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS.color,
  } = options;

  const fillOrange = color === "color" ? CLOUDFLARE_ORANGE : color;
  const fillYellow = color === "color" ? CLOUDFLARE_YELLOW : color;
  const fillText = color === "color" ? CLOUDFLARE_TEXT_GRAY : color;

  if (variant === "glyph") {
    return `<svg viewBox="${CLOUDFLARE_GLYPH_VIEWBOX}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cloudflare logo">
  <path d="${CLOUDFLARE_GLYPH_ORANGE_PATH}" fill="${fillOrange}"/>
  <path d="${CLOUDFLARE_GLYPH_YELLOW_PATH}" fill="${fillYellow}"/>
</svg>`;
  }

  const wordmarkPaths = CLOUDFLARE_WORDMARK_PATHS.map(
    (d) => `  <path d="${d}" fill="${fillText}"/>`,
  ).join("\n");

  return `<svg viewBox="${CLOUDFLARE_FULL_LOGO_VIEWBOX}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cloudflare logo">
  <path d="${CLOUDFLARE_FULL_LOGO_ORANGE_PATH}" fill="${fillOrange}"/>
  <path d="${CLOUDFLARE_FULL_LOGO_YELLOW_PATH}" fill="${fillYellow}"/>
${wordmarkPaths}
</svg>`;
}
