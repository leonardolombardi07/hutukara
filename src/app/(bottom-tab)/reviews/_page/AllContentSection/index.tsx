"use client";

import Section from "../Section";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FAKE_DATA } from "@/app/(bottom-tab)/parties/data";
import ContentRating from "../ContentRating";

export default function AllContentSection() {
  const data = FAKE_DATA.map((item) => item.results).flat();

  return (
    <Section title="Recommendations">
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
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mx: "5px" }}
                >
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
