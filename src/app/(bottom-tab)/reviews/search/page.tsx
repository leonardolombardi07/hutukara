import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import { APP_NAME } from "@/app/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | Search`,
  description: "Search for series, movies, and more",
};

export default function Search() {
  return (
    <Box>
      <Typography variant="h6">Search</Typography>
    </Box>
  );
}
