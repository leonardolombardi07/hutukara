import React from "react";
import Container from "@mui/material/Container";
import Header from "./_page/Header";
import Paper from "@mui/material/Paper";
import { FAKE_DATA } from "../data";
import Tabs from "./_page/Tabs";

interface PageProps {
  params: {
    id?: string;
  };
}

export default function Page({ params }: PageProps) {
  if (!params.id) {
    throw new Error("No id");
  }

  const item = FAKE_DATA.find((item) => item.id === params.id);
  if (!item) {
    throw new Error("No item");
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
        <Header {...item} />
        <Tabs item={item} />
      </Paper>
    </Container>
  );
}
