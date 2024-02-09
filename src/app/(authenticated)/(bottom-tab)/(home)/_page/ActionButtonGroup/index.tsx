"use client";

import React from "react";
import ImageButton from "./ImageButton";
import { GROUP_TITLE } from "@/app/constants";
import { useNavigateOnlyIfContentRated } from "../../_layout/GoRateContentProvider";
import { useOnboardingContext } from "../../../_layout/OnboardingProvider";

export default function ActionButtonGroup() {
  const { onboardingRefs } = useOnboardingContext();
  const navigateIfContentRated = useNavigateOnlyIfContentRated();

  return (
    <React.Fragment>
      <ImageButton
        ref={onboardingRefs[1]}
        title={`Join a ${GROUP_TITLE}`}
        width="50%"
        onClick={() => navigateIfContentRated("/join")}
        src="/images/Logo/Logo.jpg"
      />

      <ImageButton
        ref={onboardingRefs[2]}
        title={`Create a ${GROUP_TITLE}`}
        width="50%"
        onClick={() => navigateIfContentRated("/create")}
        src="/images/CarolWithDrums/CarolWithDrums.jpeg"
      />
    </React.Fragment>
  );
}
