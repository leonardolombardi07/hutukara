import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ActionButtonGroup from "./_page/ActionButtonGroup";
import Container from "@mui/material/Container";
import { APP_NAME, PLURALIZED_GROUP_TITLE } from "@/app/constants";
import { Metadata } from "next";
import FilterChip from "./_page/FilterChip";
import ItemList from "./_page/ItemList";
import Paper from "@mui/material/Paper";

export const metadata: Metadata = {
  title: `${APP_NAME} | ${PLURALIZED_GROUP_TITLE}`,
  description: `Visualize and manage your ${PLURALIZED_GROUP_TITLE.toLowerCase()}.`,
};

interface PageProps {
  searchParams: {
    filter?: "ongoing" | "finished" | string;
  };
}

export default function Page({ searchParams }: PageProps) {
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
          component={Paper}
          variant="outlined"
          sx={{
            mt: 5,
            height: "100%",
            p: {
              xs: 1,
              sm: 3,
            },
            borderStyle: {
              xs: "none",
              sm: "solid",
            },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3">Your {PLURALIZED_GROUP_TITLE}</Typography>

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

          <ItemList />
        </Container>
      </Container>
    </React.Fragment>
  );
}
