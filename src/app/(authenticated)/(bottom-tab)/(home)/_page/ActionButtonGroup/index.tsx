"use client";

import React from "react";
import ImageButton from "./ImageButton";
import { GROUP_TITLE } from "@/app/constants";
import { useNavigateOnlyIfContentRated } from "../../_layout/GoRateContentProvider";

export default function ActionButtonGroup() {
  const navigateIfContentRated = useNavigateOnlyIfContentRated();

  return (
    <React.Fragment>
      <ImageButton
        title={`Join a ${GROUP_TITLE}`}
        width="50%"
        onClick={() => navigateIfContentRated("/join")}
        src="/images/Logo/Logo.jpg"
      />

      <ImageButton
        title={`Create a ${GROUP_TITLE}`}
        width="50%"
        onClick={() => navigateIfContentRated("/create")}
        src="/images/CarolWithDrums/CarolWithDrums.jpeg"
      />
    </React.Fragment>
  );
}
