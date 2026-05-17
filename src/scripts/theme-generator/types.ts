export type ColorMode = {
  dark: string;
  light: string;
};

export type ThemeColors = {
  fedramp?: ColorMode;
  kumo: ColorMode;
  [themeName: string]: ColorMode | undefined;
};

export type TokenDefinition = {
  description?: string;
  newName: string;
  theme: ThemeColors;
};

export type TextTokens = {
  [tokenName: string]: TokenDefinition;
};

export type ColorTokens = {
  [tokenName: string]: TokenDefinition;
};

export type ThemeTypography = {
  fedramp?: string;
  kumo: string;
  [themeName: string]: string | undefined;
};

export type TypographyTokenDefinition = {
  description?: string;
  newName: string;
  theme: ThemeTypography;
};

export type TypographyTokens = {
  [tokenName: string]: TypographyTokenDefinition;
};

export type ThemeConfig = {
  color: ColorTokens;
  text: TextTokens;
  typography?: TypographyTokens;
};

export type GeneratorOptions = {
  outputDir: string;
  themes?: string[];
  useNewNames?: boolean;
};

export type TokenRenameMap = {
  color: Record<string, string>;
  text: Record<string, string>;
};
