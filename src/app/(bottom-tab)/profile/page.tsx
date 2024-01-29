import React from "react";
import Box from "@mui/material/Box";
import Header from "./_page/Header";
import Container from "@mui/material/Container";
import { Metadata } from "next";
import PersonalPreferences from "./_page/PersonalPreferences";
import { APP_NAME } from "@/app/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | Perfil`,
  description: "Visualize e edite suas informações pessoais",
};

export default async function Page() {
  const user = {
    name: "hey",
    email: "a@email.com",
    avatarUrl: "https://picsum.photos/200/300",
  };

  return (
    <Container
      component={"main"}
      sx={{
        py: 4,
      }}
    >
      <Header user={user} />
      <Box sx={{ my: 3 }} />
      <PersonalPreferences />
    </Container>
  );
}
