"use client";

import Container from "@mui/material/Container";
import Section from "@/components/modules/userRating/Section";
import ItemList from "./_page/ItemList";

export default function ClientPage({ uid }: { uid: string }) {
  return (
    <Container component={"main"} disableGutters maxWidth="md">
      <Section title="Ratings">
        <ItemList uid={uid} />
      </Section>
    </Container>
  );
}
