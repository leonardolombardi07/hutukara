"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { createGroup } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function close() {
    router.back();
  }

  async function onFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get("name"));
      const { id } = await createGroup({ ownerId: user.uid, name });
      router.replace(`/${id}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onFormSubmission}>
      <Box sx={{ py: 4, px: 2, flexGrow: 1 }}>
        <TextField autoFocus fullWidth name="name" required label="Name" />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          px: 2,
          pb: 2,
        }}
      >
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          color="primary"
        >
          Host
        </Button>

        <Button onClick={close} size="large" variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </form>
  );
}
