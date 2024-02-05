import Container from "@mui/material/Container";
import { APP_NAME } from "@/app/constants";
import { Metadata } from "next";
import Section from "@/components/modules/userRating/Section";
import ItemList from "./_page/ItemList";

export const metadata: Metadata = {
  title: `${APP_NAME} | Rated`,
  description: "Visualize and manage your rated content.",
};

export default function Page() {
  return (
    <Container component={"main"} disableGutters maxWidth="md">
      <Section title="Your Ratings">
        <ItemList />
      </Section>
    </Container>
  );
}
