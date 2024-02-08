"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContentRating from "@/components/modules/content/ContentRating";
import Paper from "@mui/material/Paper";
import { useUserRatings } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useUser } from "@/app/_layout/UserProvider";
import Image from "next/image";
import { useContentById } from "./_page/useContentById";

export interface PageProps {
  params: {
    contentId?: string;
  };
}

export default function Page({ params }: PageProps) {
  if (!params.contentId) {
    throw new Error("No id");
  }

  const { user } = useUser();

  const [item, isLoadingContent, contentError] = useContentById(
    params.contentId
  );
  const [ratings, isLoadingRatings, ratingsError] = useUserRatings(user.uid);

  const userRating = ratings?.find(
    (rating) => rating.contentId === params.contentId
  );

  const isLoading = isLoadingContent || isLoadingRatings;
  if (isLoading || !item) {
    return null;
  }

  const error = contentError || ratingsError;
  if (error) {
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
          contentId={params.contentId}
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
          mt: 5,
        }}
      />
    );

  return (
    <Box
      sx={{
        height: 250,
        bgcolor: "grey.700",
        mb: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt={`Content poster`}
        fill={true}
        style={{
          objectFit: "cover",
          objectPosition: "top center",
        }}
        sizes={"(max-width: 600px) 100vw, 600px"}
      />
    </Box>
  );
}
