"use client";

import React from "react";
import Box from "@mui/material/Box";
import { FAKE_DATA } from "../../(home)/data";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContentRating from "@/components/surfaces/ContentRating";
import Paper from "@mui/material/Paper";
import { useContent, useUserRatings } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useUser } from "@/app/_layout/UserProvider";

interface Props {
  params: {
    id?: string;
  };
}

export default function Page({ params }: Props) {
  if (!params.id) {
    throw new Error("No id");
  }

  const { user } = useUser();

  const [item, isLoading, error] = useContent(params.id);
  const [ratings, isLoadingRatings, ratingsError] = useUserRatings(user.uid);

  const userRating = ratings?.find((rating) => rating.contentId === params.id);

  if (isLoading || isLoadingRatings) {
    return null;
  }

  if (error || !item || ratingsError || !ratings) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No data found"}
      </Alert>
    );
  }

  const { Poster, Title, Plot, Year } = item;

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
        <ContentRating
          value={userRating ? userRating.value : null}
          size="large"
          contentId={params.id}
        />
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
