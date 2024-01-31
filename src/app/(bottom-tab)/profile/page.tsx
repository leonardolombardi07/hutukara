"use client";

import React from "react";
import Box from "@mui/material/Box";
import Header from "./_page/Header";
import Container from "@mui/material/Container";
import PersonalPreferences from "./_page/PersonalPreferences";
import { useUser } from "@/app/_layout/UserProvider";
import { useFirestoreUser } from "@/modules/api/client";

export default function Page() {
  const { user: authUser } = useUser();
  const [firestoreUser] = useFirestoreUser();

  return (
    <Container
      component={"main"}
      sx={{
        py: 4,
      }}
    >
      {authUser && firestoreUser && (
        <Header
          user={{
            displayName: firestoreUser.name,
            email: authUser.email,
            photoURL: firestoreUser.photoURL,
          }}
        />
      )}
      <Box sx={{ my: 3 }} />
      <PersonalPreferences />
    </Container>
  );
}
