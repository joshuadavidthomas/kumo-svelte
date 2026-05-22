import type { ComponentProps } from "svelte";
import InputGroupComponent from "./input-group.svelte";
import InputGroupAddonComponent from "./input-group-addon.svelte";
import InputGroupButtonComponent from "./input-group-button.svelte";
import InputGroupInputComponent from "./input-group-input.svelte";
import InputGroupSuffixComponent from "./input-group-suffix.svelte";

export {
  InputGroupComponent as InputGroup,
  InputGroupComponent as InputGroupRoot,
  InputGroupComponent as Root,
  InputGroupAddonComponent as InputGroupAddon,
  InputGroupAddonComponent as InputGroupLabel,
  InputGroupAddonComponent as Addon,
  InputGroupAddonComponent as Label,
  InputGroupButtonComponent as InputGroupButton,
  InputGroupButtonComponent as Button,
  InputGroupInputComponent as InputGroupInput,
  InputGroupInputComponent as Input,
  InputGroupSuffixComponent as InputGroupSuffix,
  InputGroupSuffixComponent as InputGroupDescription,
  InputGroupSuffixComponent as Suffix,
  InputGroupSuffixComponent as Description,
};

export type InputGroupRootProps = ComponentProps<typeof InputGroupComponent>;
export type InputGroupProps = InputGroupRootProps;
export type InputGroupAddonProps = ComponentProps<typeof InputGroupAddonComponent>;
export type InputGroupButtonProps = ComponentProps<typeof InputGroupButtonComponent>;
export type InputGroupInputProps = ComponentProps<typeof InputGroupInputComponent>;
export type InputGroupSuffixProps = ComponentProps<typeof InputGroupSuffixComponent>;

export {
  KUMO_INPUT_GROUP_DEFAULT_VARIANTS,
  KUMO_INPUT_GROUP_VARIANTS,
  inputGroupVariants,
  type KumoInputGroupSize,
  type KumoInputGroupVariantsProps,
} from "./variants";
export {
  INPUT_GROUP_HAS_CLASSES,
  INPUT_GROUP_SIZE,
  type InputGroupFocusMode,
  type InputGroupSizeTokens,
} from "./context";
