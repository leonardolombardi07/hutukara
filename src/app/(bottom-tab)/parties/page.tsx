import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ActionButtonGroup from "./_page/ActionButtonGroup";
import Container from "@mui/material/Container";
import { APP_NAME } from "@/app/constants";
import { Metadata } from "next";
import { Item } from "./types";
import FilterChip from "./_page/FilterChip";
import ItemList from "./_page/ItemList";
import { FAKE_DATA } from "./data";

export const metadata: Metadata = {
  title: `${APP_NAME} | Parties`,
  description: "Visualize and manage your parties",
};

interface PageProps {
  searchParams: {
    id?: string;

    // Host
    host?: "true" | string;

    // Join
    join?: "true" | string;

    // Filter
    filter?: "ongoing" | "finished" | string;
  };
}

async function getData(): Promise<{
  data: Item[];
}> {
  return {
    data: FAKE_DATA,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getData();

  return (
    <React.Fragment>
      <Container
        component={"main"}
        disableGutters
        sx={{
          pb: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          <ActionButtonGroup />
        </Box>

        <Container
          component={"section"}
          sx={{
            mt: 5,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3">Your Parties</Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
              }}
            >
              <FilterChip label="Under way" value="ongoing" queryKey="filter" />

              <FilterChip label="Over" value="finished" queryKey="filter" />
            </Box>
          </Box>

          <ItemList data={data} />
        </Container>
      </Container>
    </React.Fragment>
  );
}
