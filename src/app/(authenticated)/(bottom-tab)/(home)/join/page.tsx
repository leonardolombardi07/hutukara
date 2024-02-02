"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { joinGroup } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useDelay from "@/modules/hooks/useDelay";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const delayedIsLoading = useDelay(isLoading);

  function close() {
    router.back();
  }

  async function onFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const pin = String(formData.get("pin"));
      if (!pin) return setError("PIN is required");
      const group = await joinGroup({ userId: user.uid, pin });
      router.replace(`/${group.id}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onFormSubmission}>
      <Box sx={{ py: 4, px: 2 }}>
        <TextField name="pin" autoFocus fullWidth required label="Party PIN" />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
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
          disabled={delayedIsLoading}
        >
          {delayedIsLoading ? "Loading..." : "Join"}
        </Button>

        <Button onClick={close} size="large" variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </form>
  );
}
