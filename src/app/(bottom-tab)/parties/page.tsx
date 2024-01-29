import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PartyCard from "./_page/PartyCard";
import ActionButtonGroup from "./_page/ActionButtonGroup";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import { APP_NAME } from "@/app/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} | Parties`,
  description: "Visualize and manage your parties",
};

interface Party {
  id: string;
  title: string;
  description: string;
  results: [];
  createdAt: Date;
  members: any[];
  hosts: any[];
}

export default function Page() {
  const data = FAKE_PARTIES;

  return (
    <Container component={"main"} disableGutters>
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
            <Chip label="Order by" variant="outlined" size="medium" />
            <Chip label="Under way" variant="outlined" size="medium" />
            <Chip label="Over" variant="outlined" size="medium" />
          </Box>
        </Box>

        <Grid container spacing={2}>
          {data.map((item) => {
            return (
              <Grid item key={item.id} xs={12} md={6} xl={4}>
                <PartyCard {...item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
}

const FAKE_PARTIES: Party[] = [
  {
    id: "1",
    title: "Some party",
    description: "Some nice party",
    results: [],
    createdAt: new Date("2021-10-10"),
    members: [1, 2],
    hosts: [3],
  },

  {
    id: "2",
    title: "Some other party",
    description: "Some other nice party",
    results: [],
    createdAt: new Date("2018-10-10"),
    members: [1],
    hosts: [4],
  },
] as const;
