"use client";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { APP_NAME } from "../constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
        }}
      >
        <Image
          src={"/images/Logo/Logo.jpg"}
          alt={`${APP_NAME} authentication cover`}
          fill={true}
          style={{
            objectFit: "cover",
            objectPosition: "90% 50%",
          }}
        />
      </Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: {
              xs: 3,
              sm: 5,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
