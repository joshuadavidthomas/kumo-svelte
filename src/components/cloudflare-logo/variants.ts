export const KUMO_CLOUDFLARE_LOGO_VARIANTS = {
  variant: {
    glyph: {
      description: "Cloud glyph only (logomark)",
    },
    full: {
      description: "Full logo with cloud glyph and wordmark stacked",
    },
  },
  color: {
    color: {
      description: "Brand colors (orange/yellow gradient cloud, dark gray text)",
    },
    black: {
      description: "Solid black logo",
    },
    white: {
      description: "Solid white logo (for dark backgrounds)",
    },
  },
} as const;

export const KUMO_CLOUDFLARE_LOGO_DEFAULT_VARIANTS = {
  variant: "full",
  color: "color",
} as const;

export type CloudflareLogoVariant = keyof typeof KUMO_CLOUDFLARE_LOGO_VARIANTS.variant;
export type CloudflareLogoColor = keyof typeof KUMO_CLOUDFLARE_LOGO_VARIANTS.color;
export type CloudflareLogoSvgVariant = CloudflareLogoVariant;
export type CloudflareLogoSvgColor = CloudflareLogoColor;
