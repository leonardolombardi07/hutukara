"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { joinGroup } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useDelay from "@/modules/hooks/useDelay";
import { GROUP_TITLE } from "@/app/constants";
import { useSafeGoBack } from "@/modules/navigation";

interface PageProps {
  searchParams: {
    pin?: string;
  };
}

export default function Page(props: PageProps) {
  // See: https://github.com/vercel/next.js/issues/43077#issuecomment-1339112048
  // On why we are using search params from `useSearchParams` instead of props
  const searchParams = useSearchParams();
  const router = useRouter();
  const safeGoBack = useSafeGoBack();

  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const delayedIsLoading = useDelay(isLoading);

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
        <TextField
          defaultValue={searchParams.get("pin") || ""}
          name="pin"
          autoFocus
          fullWidth
          required
          label={`${GROUP_TITLE} PIN`}
        />
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

        <Button onClick={safeGoBack} size="large" variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </form>
  );
}
