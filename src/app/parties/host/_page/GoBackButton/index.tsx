"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/parties")}
      variant="outlined"
      fullWidth
      sx={{ mt: 1 }}
    >
      Go back
    </Button>
  );
}
