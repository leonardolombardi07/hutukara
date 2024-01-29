"use client";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function GoBackIconButton() {
  const router = useRouter();

  return (
    <IconButton onClick={() => router.push("/parties")}>
      <CloseIcon />
    </IconButton>
  );
}
