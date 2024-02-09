"use client";

import * as React from "react";
import OnboardingPopoverContent from "./OnboardingPopoverContent";
import { OnboardingStep } from "./types";
import { GROUP_TITLE, PLURALIZED_GROUP_TITLE } from "@/app/constants";
import Link from "next/link";
import MUILink from "@mui/material/Link";

export default function useSteps() {
  const onboardingRef0 = React.useRef(null);
  const onboardingRef1 = React.useRef(null);
  const onboardingRef2 = React.useRef(null);
  const onboardingRef3 = React.useRef(null);
  const onboardingRef4 = React.useRef(null);
  const onboardingRef5 = React.useRef(null);

  const steps: OnboardingStep[] = [
    {
      popoverContent: (
        <OnboardingPopoverContent>
          {PLURALIZED_GROUP_TITLE} are for people who are tired of getting
          together with friends and having to fight over what to watch - or even
          worse, having to watch something they don&apos;t like (Love at First
          Sight, I&apos;m looking at you! 😒) . A {GROUP_TITLE} is a place where
          you and your friends can share your favorite movies and series, and
          then get nice <b>recommendations</b> based on your tastes.
        </OnboardingPopoverContent>
      ),
      anchorElRef: onboardingRef0,
      popoverProps: TITLE_POPOVER_PROPS,
    },

    {
      popoverContent: (
        <OnboardingPopoverContent>
          To join a {GROUP_TITLE} created by a friend, you need to click in the{" "}
          <b>Join</b> button above and fill an unique PIN given by a friend.
          🔓🐱‍👤
        </OnboardingPopoverContent>
      ),
      anchorElRef: onboardingRef1,
      popoverProps: IMAGE_BUTTONS_POPOVER_PROPS,
    },

    {
      popoverContent: (
        <OnboardingPopoverContent>
          Or... if you want to be more in control, you can create your own{" "}
          {GROUP_TITLE} - and then invite your friends to join it. 👨‍👨‍👧‍👧👩‍❤️‍💋‍👩👨‍❤️👩🏿‍🤝‍👩🏻
        </OnboardingPopoverContent>
      ),
      anchorElRef: onboardingRef2,
      popoverProps: IMAGE_BUTTONS_POPOVER_PROPS,
    },

    {
      popoverContent: (
        <OnboardingPopoverContent>
          But... how can we give recommendations if we don&apos;t know what you
          like 🤔? That&apos;s why we need you to rate some content first. Go to{" "}
          <MUILink component={Link} href="/search">
            search
          </MUILink>{" "}
          and rate movies and series you like - or dislike. (So sorry, we
          won&apos;t let you rate Love at First Sight 😅)
        </OnboardingPopoverContent>
      ),
      anchorElRef: onboardingRef3,
      popoverProps: BOTTOM_TAB_MENU_ITEM_POPOVER_PROPS,
    },

    {
      popoverContent: (
        <OnboardingPopoverContent>
          You can view all the content you have rated in the{" "}
          <MUILink component={Link} href="/search">
            rated
          </MUILink>{" "}
          page (by the way, if you join or create a {GROUP_TITLE}, you will be
          able to see the ratings of your friends too 😉)
        </OnboardingPopoverContent>
      ),
      anchorElRef: onboardingRef4,
      popoverProps: BOTTOM_TAB_MENU_ITEM_POPOVER_PROPS,
    },

    {
      popoverContent: (
        <OnboardingPopoverContent>
          Oh, and last but not least... you can also edit your profile - or
          maybe put a dark theme on this uggly app? 😏🌃
        </OnboardingPopoverContent>
      ),
      anchorElRef: onboardingRef5,
      popoverProps: BOTTOM_TAB_MENU_ITEM_POPOVER_PROPS,
    },
  ];

  return steps;
}

const TITLE_POPOVER_PROPS: OnboardingStep["popoverProps"] = {
  anchorOrigin: {
    vertical: "center",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "center",
    horizontal: "left",
  },
};

const BOTTOM_TAB_MENU_ITEM_POPOVER_PROPS: OnboardingStep["popoverProps"] = {
  anchorOrigin: {
    vertical: -20,
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
};

const IMAGE_BUTTONS_POPOVER_PROPS: OnboardingStep["popoverProps"] = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  sx: {
    mt: 2,
  },
};
