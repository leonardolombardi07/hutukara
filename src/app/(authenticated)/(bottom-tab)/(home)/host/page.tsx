"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { createGroup } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSafeGoBack } from "@/modules/navigation";

export default function Page() {
  const router = useRouter();
  const safeGoBack = useSafeGoBack();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

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
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Host"}
        </Button>

        <Button onClick={safeGoBack} size="large" variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </form>
  );
}
