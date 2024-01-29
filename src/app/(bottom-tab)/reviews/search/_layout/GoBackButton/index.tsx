"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <IconButton onClick={router.back}>
      <ArrowBackIcon />
    </IconButton>
  );
}
