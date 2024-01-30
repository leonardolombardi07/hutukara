import ItemList from "./_page/ItemList";
import Container from "@mui/material/Container";
import { APP_NAME } from "@/app/constants";
import { Metadata } from "next";
import SearchInput from "./_page/SearchInput";
import Box from "@mui/material/Box";

export const metadata: Metadata = {
  title: `${APP_NAME} | Search`,
  description: "Search for content to rate.",
};

export default function Page() {
  return (
    <Container component={"main"} disableGutters maxWidth="md">
      <Box
        sx={{
          my: 4,
          px: {
            xs: 2,
            md: 0,
          },
        }}
      >
        <SearchInput />
      </Box>

      <Box
        sx={{
          mt: 3,
        }}
      >
        <ItemList />
      </Box>
    </Container>
  );
}
