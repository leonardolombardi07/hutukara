import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ActionButtonGroup from "./_page/ActionButtonGroup";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import { APP_NAME } from "@/app/constants";
import { Metadata } from "next";
import Join from "./_page/Join";
import Host from "./_page/Host";
import ItemCard from "./_page/ItemCard";
import ItemModal from "./_page/ItemModal";
import { Item } from "./types";
import FilterChip from "./_page/FilterChip";
import ItemList from "./_page/ItemList";

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

      <Join />
      <Host />
      <ItemModal data={data} />
    </React.Fragment>
  );
}

const FAKE_PERSON: Item["members"][number] = {
  id: "1",
  name: "John Doe",
  avatarUrl: "https://i.pravatar.cc/300?img=1",
};

function getPersonArray(num: number) {
  return Array.from({ length: num }, (_, i) => ({
    ...FAKE_PERSON,
    id: i.toString(),
  }));
}

const FAKE_DATA: Item[] = [
  {
    id: "1",
    title: "With Members",
    description: "Some nice party",
    results: [],
    createdAt: new Date("2021-10-10"),
    members: getPersonArray(3),
    hosts: getPersonArray(1),
    pin: "1234",
  },

  {
    id: "2",
    title: "Some other party",
    description: "Some other nice party",
    results: [],
    createdAt: new Date("2018-10-10"),
    members: [],
    hosts: [],
    pin: "1234",
  },

  {
    id: "3",
    title: "Third party",
    description: "Yes, with results!",
    results: [3, 4, 5],
    createdAt: new Date("2013-10-10"),
    members: [],
    hosts: [],
    pin: "1234",
  },
] as const;
