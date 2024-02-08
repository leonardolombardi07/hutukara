"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContentRating, {
  ContentRatingSkeleton,
} from "@/components/modules/content/ContentRating";
import Paper from "@mui/material/Paper";
import { useUserRatings } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useUser } from "@/app/_layout/UserProvider";
import Image from "next/image";
import { useContentById } from "./_page/useContentById";
import Skeleton from "@mui/material/Skeleton";

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

  const error = contentError || ratingsError;
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No data found"}
      </Alert>
    );
  }

  const isLoading = isLoadingContent || isLoadingRatings;
  if (!isLoading && !item) {
    return (
      <Alert severity="warning">
        <AlertTitle>Content not found</AlertTitle>
        Try again later
      </Alert>
    );
  }

  return (
    <Container
      sx={{
        height: "100%",
      }}
      disableGutters
      maxWidth="xs"
    >
      <CoverImage isLoading={isLoadingContent} src={item?.Poster} />

      <Box sx={{ px: 2 }}>
        {item?.Title ? (
          <Typography variant="h4">{item.Title}</Typography>
        ) : (
          <Skeleton variant="text" width="80%" height={50} />
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          {item?.Year ? (
            <Typography variant="subtitle1">{item.Year}</Typography>
          ) : (
            <Skeleton variant="text" width="20%" height={20} />
          )}
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
        {isLoadingRatings ? (
          <ContentRatingSkeleton size="large" />
        ) : (
          <ContentRating
            value={userRating ? userRating.value : null}
            size="large"
            contentId={params.contentId}
          />
        )}
      </Paper>

      {item?.Plot ? (
        <Typography variant="body1" sx={{ mx: 1.5 }}>
          {item.Plot}
        </Typography>
      ) : (
        <Skeleton variant="text" width="100%" height={100} />
      )}
    </Container>
  );
}

const COVER_IMAGE_HEIGHT = 250;

function CoverImage({
  src,
  isLoading,
}: {
  src: string | null | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={COVER_IMAGE_HEIGHT}
        sx={{
          mb: 3,
        }}
      />
    );
  }

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
        height: COVER_IMAGE_HEIGHT,
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
