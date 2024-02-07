"use client";

import React from "react";
import ImageButton from "./ImageButton";
import { useRouter } from "next/navigation";
import { GROUP_TITLE } from "@/app/constants";

export default function ActionButtonGroup() {
  const router = useRouter();

  return (
    <React.Fragment>
      <ImageButton
        title={`Join a ${GROUP_TITLE}`}
        width="50%"
        onClick={() => router.push("/join")}
        src="/images/Logo/Logo.jpg"
      />

      <ImageButton
        title={`Create a ${GROUP_TITLE}`}
        width="50%"
        onClick={() => router.push("/create")}
        src="/images/CarolWithDrums/CarolWithDrums.jpeg"
      />
    </React.Fragment>
  );
}
