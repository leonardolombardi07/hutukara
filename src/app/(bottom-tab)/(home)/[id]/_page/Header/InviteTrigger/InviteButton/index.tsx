import * as React from "react";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

// Share buttons from react-share require a URL, but sometimes we are not sharing one. If we provide a falsy value for the URL (like  an empty string ""), react-share throws an error. To avoid this, we provide an empty space
const FAKE_TRUTHY_URL_PLACEHOLDER = " ";
const DEFAULT_ICON_SIZE = 50;

type InviteButtonContainerProps = React.ComponentProps<
  typeof WhatsappShareButton
>;

type InviteButtonIconProps = React.ComponentProps<typeof WhatsappIcon>;

export interface InviteButtonProps {
  button: React.ComponentType<InviteButtonContainerProps>;
  icon: React.ComponentType<InviteButtonIconProps>;
  message: string;
  disabled: boolean;
}

export default function InviteButton({
  button: Button,
  icon: Icon,
  message,
  disabled,
}: InviteButtonProps) {
  return (
    <Button
      url={FAKE_TRUTHY_URL_PLACEHOLDER}
      title={message}
      disabled={disabled}
    >
      <Icon size={DEFAULT_ICON_SIZE} round />
    </Button>
  );
}
