"use client";

import * as React from "react";
import { PLURALIZED_GROUP_TITLE } from "@/app/constants";
import Typography from "@mui/material/Typography";
import { useOnboardingContext } from "../../../_layout/OnboardingProvider";

const TITLE_TEXT = `Your ${PLURALIZED_GROUP_TITLE}`;
const TITLE_TEXT_SIZE_IN_CH = `${TITLE_TEXT.length}ch`;

export default function ItemListTitle() {
  const { onboardingRefs } = useOnboardingContext();
  return (
    <Typography
      ref={onboardingRefs[0]}
      variant="h3"
      sx={{
        // To make sure the onboarding ref is on the right of the text, we need to set the width - otherwise is 100% of the container
        width: TITLE_TEXT_SIZE_IN_CH,
      }}
    >
      {TITLE_TEXT}
    </Typography>
  );
}
