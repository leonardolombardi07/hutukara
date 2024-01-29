"use client";

import Grid from "@mui/material/Grid";
import ContentCard from "../ContentCard";
import Section from "../Section";
import Button from "@mui/material/Button";
import ArrowRight from "@mui/icons-material/ArrowRight";

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
  const data = FAKE_CONTENT;

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
          My List
        </Button>
      }
    >
      <Grid container spacing={2}>
        {data.map((item) => {
          return (
            <Grid key={item.id} item xs={6} md={6}>
              <ContentCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
}
