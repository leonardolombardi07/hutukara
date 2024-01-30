"use client";

import Section from "../Section";
import Button from "@mui/material/Button";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentRating from "../ContentRating";
import { FAKE_DATA } from "@/app/(bottom-tab)/parties/data";

const FAKE_CONTENT = [
  {
    id: "1",
    title: "Batman",
    description: "Some description",
    bannerImg: "https://picsum.photos/200/300",
  },

  {
    id: "2",
    title: "Joker",
    description: "Some description",
    bannerImg: "https://picsum.photos/200/300",
  },
];

export default function RatedContentSection() {
  const data = FAKE_DATA.map((item) => item.results)
    .flat()
    .slice(0, 2);

  return (
    <Section
      title="Rated Content"
      right={
        <Button
          variant="text"
          onClick={() => {}}
          endIcon={<ArrowRight />}
          sx={{
            color: "text.secondary",
          }}
          size="large"
        >
          See All
        </Button>
      }
    >
      <ImageList>
        {data.map((item) => (
          <ImageListItem key={item.Poster} cols={1}>
            {item.Poster ? (
              <img
                srcSet={`${item.Poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.Poster}?w=248&fit=crop&auto=format`}
                alt={item.Title}
                loading="lazy"
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "grey.700",
                }}
              />
            )}

            <ImageListItemBar
              title={
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {item.Title}
                </Typography>
              }
              subtitle={<ContentRating />}
              position="below"
              sx={{
                px: "5px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>
  );
}
