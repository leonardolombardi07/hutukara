import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { InviteButtonProps } from "./InviteButton";
import { APP_BASE_URL, APP_NAME, GROUP_TITLE } from "@/app/constants";

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

function getUrl({ pin }: { pin: string }) {
  return `${APP_BASE_URL}/join?pin=${pin}`;
}

function defaultGetMessage({ name, pin }: GetMessageArgs) {
  const url = getUrl({ pin });
  return `Join my ${GROUP_TITLE} "${name}" on ${APP_NAME}! The URL is ${url}. The pin is ${pin}.`;
}

export const INVITE_BUTTONS: InviteButtonItem[] = [
  {
    id: "1",
    button: WhatsappShareButton,
    icon: WhatsappIcon,
    getMessage: ({ name, pin }) => {
      const url = getUrl({ pin });
      return `Join my ${GROUP_TITLE} "${name}" on ${APP_NAME}! The URL is ${url}. The pin is *${pin}*.`;
    },
  },

  {
    id: "2",
    button: TelegramShareButton,
    icon: TelegramIcon,
    getMessage: defaultGetMessage,
  },
] as const;
