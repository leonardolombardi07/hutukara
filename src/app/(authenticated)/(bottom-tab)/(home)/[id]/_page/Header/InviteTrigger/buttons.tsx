import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { InviteButtonProps } from "./InviteButton";
import { APP_NAME } from "@/app/constants";

interface GetMessageArgs {
  name: string;
  pin: string;
}

interface InviteButtonItem {
  id: string;
  button: InviteButtonProps["button"];
  icon: InviteButtonProps["icon"];
  getMessage: ({ name, pin }: GetMessageArgs) => string;
}

function defaultGetMessage({ name, pin }: GetMessageArgs) {
  return `Join my party "${name}" on ${APP_NAME}! The pin is ${pin}.`;
}

export const INVITE_BUTTONS: InviteButtonItem[] = [
  {
    id: "1",
    button: WhatsappShareButton,
    icon: WhatsappIcon,
    getMessage: defaultGetMessage,
  },

  {
    id: "2",
    button: TelegramShareButton,
    icon: TelegramIcon,
    getMessage: defaultGetMessage,
  },
] as const;
