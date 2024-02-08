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
import useDelay from "@/modules/hooks/useDelay";

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

  const isLoading = isLoadingContent || isLoadingRatings;
  const delayedIsLoading = useDelay(isLoading);

  const error = contentError || ratingsError;
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No data found"}
      </Alert>
    );
  }

  if (!isLoading && !item) {
    return (
      <Alert severity="warning">
        <AlertTitle>Content not found</AlertTitle>
        Try again later
      </Alert>
    );
  }

  const userRating = ratings?.find(
    (rating) => rating.contentId === params.contentId
  );

  return (
    <Container
      sx={{
        height: "100%",
      }}
      disableGutters
      maxWidth="xs"
    >
      <WithDelayedLoading
        isLoading={isLoading}
        delayedIsLoading={delayedIsLoading}
        loadingComponent={
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={COVER_IMAGE_HEIGHT}
            sx={{
              mb: 3,
            }}
          />
        }
      >
        <CoverImage src={item?.Poster} />
      </WithDelayedLoading>

      <Box sx={{ px: 2 }}>
        <WithDelayedLoading
          isLoading={isLoading}
          delayedIsLoading={delayedIsLoading}
          loadingComponent={
            <Skeleton variant="text" width="100%" height={50} />
          }
        >
          <Typography variant="h4">{item?.Title}</Typography>
        </WithDelayedLoading>

        <Box sx={{ display: "flex", gap: 1 }}>
          <WithDelayedLoading
            isLoading={isLoading}
            delayedIsLoading={delayedIsLoading}
            loadingComponent={
              <Skeleton variant="text" width="20%" height={20} />
            }
          >
            <Typography variant="subtitle1">{item?.Year}</Typography>
          </WithDelayedLoading>
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

        <WithDelayedLoading
          isLoading={isLoading}
          delayedIsLoading={delayedIsLoading}
          loadingComponent={<ContentRatingSkeleton size="large" />}
        >
          <ContentRating
            value={userRating ? userRating.value : null}
            size="large"
            contentId={params.contentId}
          />
        </WithDelayedLoading>
      </Paper>

      <WithDelayedLoading
        isLoading={isLoading}
        delayedIsLoading={delayedIsLoading}
        loadingComponent={<Skeleton variant="text" width="100%" height={100} />}
      >
        <Typography variant="body1" sx={{ mx: 1.5 }}>
          {item?.Plot}
        </Typography>
      </WithDelayedLoading>
    </Container>
  );
}

function WithDelayedLoading({
  isLoading,
  delayedIsLoading,
  loadingComponent,
  children,
}: {
  isLoading: boolean;
  delayedIsLoading: boolean;
  loadingComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  if (delayedIsLoading) {
    return loadingComponent;
  }

  if (isLoading) {
    return null;
  }

  return children;
}

const COVER_IMAGE_HEIGHT = 250;

function CoverImage({ src }: { src: string | null | undefined }) {
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
