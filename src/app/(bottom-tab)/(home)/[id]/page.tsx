import React from "react";
import Container from "@mui/material/Container";
import Header from "./_page/Header";
import Paper from "@mui/material/Paper";
import Tabs from "./_page/Tabs";

interface PageProps {
  params: {
    id?: string;
  };
}

export default function Page({ params }: PageProps) {
  if (!params.id) {
    throw new Error("No group id provided");
  }

  return (
    <Container
      disableGutters
      sx={{
        height: "100%",
        py: {
          xs: 0,
          sm: 3,
        },
      }}
    >
      <Paper
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          height: "100%",
        }}
      >
        <Header id={params.id} />
        <Tabs id={params.id} />
      </Paper>
    </Container>
  );
}
