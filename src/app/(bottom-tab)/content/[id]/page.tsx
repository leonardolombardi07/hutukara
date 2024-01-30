"use client";

import React from "react";
import Box from "@mui/material/Box";
import { FAKE_DATA } from "../../(home)/data";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContentRating from "@/components/surfaces/ContentRating";
import Paper from "@mui/material/Paper";

interface Props {
  params: {
    id?: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    throw new Error("No id");
  }

  const item = FAKE_DATA.map((i) => i.results)
    .flat()
    .find((item) => item.id === params.id);

  if (!item) {
    throw new Error("No item");
  }

  const { Poster, Title } = item;

  const Plot = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec	pretium
  vulputate ligula, vitae aliquet odio rhoncus id. Phasellus vitae
  ullamcorper lorem. Nullam sed nunc ac justo blandit aliquam. Sed
  consectetur, nisl nec pulvinar ultricies, nisl diam venenatis`;

  const Year = "2020";

  return (
    <Container
      sx={{
        height: "100%",
      }}
      disableGutters
      maxWidth="xs"
    >
      <CoverImage src={Poster} />

      <Box sx={{ px: 2 }}>
        <Typography variant="h4">{Title}</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="body1">{Year}</Typography>
        </Box>
      </Box>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          mt: 3,
          mb: 4,
        }}
        elevation={3}
      >
        <Typography variant="h5">Your Rating</Typography>
        <ContentRating size="large" />
      </Paper>

      <Typography variant="body1" sx={{ mx: 1.5 }}>
        {Plot}
      </Typography>
    </Container>
  );
}

function CoverImage({ src }: { src: string | null }) {
  if (!src)
    return (
      <Box
        sx={{
          mt: 2,
          height: 60, // Account for header height
        }}
      />
    );
  return (
    <Box
      sx={{
        height: 250,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        bgcolor: "grey.700",
        mb: 2,
      }}
    />
  );
}
