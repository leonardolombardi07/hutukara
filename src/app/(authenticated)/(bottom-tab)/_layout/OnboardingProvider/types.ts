import { PopoverProps } from "@mui/material/Popover";

export type OnboardingStep = {
  anchorElRef: React.RefObject<any> | null; // TODO: we need to find a way to type this without any
  popoverContent: React.ReactNode; // TODO: somehow we need to make sure this is a OnboardingPopoverContent component
  popoverProps?: Omit<
    PopoverProps,
    "anchorEl" | "open" | "anchorReference" | "anchorPosition"
  >;
};
