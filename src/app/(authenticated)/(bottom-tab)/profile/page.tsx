"use client";

import React from "react";
import Box from "@mui/material/Box";
import Header, { HeaderSkeleton } from "./_page/Header";
import Container from "@mui/material/Container";
import PersonalPreferences from "./_page/PersonalPreferences";
import { useUser } from "@/app/_layout/UserProvider";
import { useFirestoreUser } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useDelay from "@/modules/hooks/useDelay";

export default function Page() {
  const { user: authUser } = useUser();
  const [firestoreUser, _, error] = useFirestoreUser();

  const delayedIsLoading = useDelay(!Boolean(firestoreUser));

  return (
    <Container
      component={"main"}
      sx={{
        py: 4,
      }}
    >
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error?.message}
        </Alert>
      )}

      {delayedIsLoading ? (
        <HeaderSkeleton />
      ) : (
        <Header
          displayName={firestoreUser?.name}
          email={authUser.email}
          photoURL={firestoreUser?.photoURL}
        />
      )}

      <Box sx={{ my: 3 }} />
      <PersonalPreferences />
    </Container>
  );
}
