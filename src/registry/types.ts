export type ComponentType = "component" | "block";

export interface PropSchema {
  classes?: Record<string, string>;
  default?: string;
  description?: string;
  descriptions?: Record<string, string>;
  optional?: boolean;
  required?: boolean;
  stateClasses?: Record<string, Record<string, string>>;
  type: string;
  values?: readonly string[];
}

export interface SubComponentSchema {
  baseComponent?: string;
  description: string;
  isPassThrough?: boolean;
  name: string;
  props: Record<string, PropSchema>;
  renderElement?: string;
  usageExamples?: string[];
}

export interface ComponentSchema {
  baseStyles?: string;
  category: string;
  colors: string[];
  description: string;
  examples: readonly string[];
  importPath: string;
  name: string;
  props: Record<string, PropSchema>;
  styling?: ComponentStyling;
  subComponents?: Record<string, SubComponentSchema>;
  type: ComponentType;
}

export interface BlockSchema extends ComponentSchema {
  dependencies: string[];
  files: string[];
  type: "block";
}

export interface DimensionConfig {
  borderRadius?: number;
  buttonSize?: number;
  calendarWidth?: number;
  cellHeight?: number;
  cellWidth?: number;
  fontSize?: number;
  fontWeight?: number;
  gap?: number;
  height?: number;
  iconSize?: number;
  inputWidth?: number;
  minHeight?: number;
  minWidth?: number;
  padding?: number;
  paddingRight?: number;
  paddingX?: number;
  paddingY?: number;
  textSize?: number;
  verticalMargin?: number;
  width?: number;
}

export interface SizeVariantConfig {
  buttonSize?: string;
  classes?: string;
  dimensions?: DimensionConfig;
  height?: number;
  minHeight?: number;
  width?: number;
}

export interface PartStyling extends DimensionConfig {
  activeColor?: string;
  background?: string;
  inactiveColor?: string;
  ring?: string;
  shadow?: string;
}

export interface ComponentStyling {
  baseTokens?: string[];
  borderRadius?: string;
  button?: PartStyling;
  container?: PartStyling;
  dimensions?: string;
  icons?: {
    name: string;
    size?: number | string;
    state?: string;
  }[];
  indicator?: PartStyling;
  inputStyles?: {
    base?: string;
    sizes?: Record<string, string>;
  };
  layout?: DimensionConfig;
  option?: PartStyling;
  popup?: PartStyling;
  primary?: PartStyling;
  secondary?: PartStyling;
  sizeVariants?: Record<string, SizeVariantConfig>;
  states?: Record<string, string[]>;
  tab?: PartStyling;
  trigger?: PartStyling;
  [key: string]: unknown;
}

export interface ComponentRegistry {
  blocks?: Record<string, BlockSchema>;
  components: Record<string, ComponentSchema>;
  search: {
    byCategory: Record<string, string[]>;
    byName: string[];
    byType: Record<ComponentType, string[]>;
  };
  version: string;
}
