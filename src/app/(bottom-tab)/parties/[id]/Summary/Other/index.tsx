import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Item } from "../../types";

export default function Other({ data }: { data: Item["results"] }) {
  return (
    <Box sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
        Other Recommendations
      </Typography>

      <Recommendations data={data} />
    </Box>
  );
}

function Recommendations({ data }: { data: Item["results"] }) {
  return (
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
            subtitle={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "success.main",
                }}
              >
                {item.score * 10}% Match
              </Typography>
            }
            position="below"
            sx={{
              px: "5px",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
