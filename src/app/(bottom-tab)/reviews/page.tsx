import RatedContentSection from "./_page/RatedContentSection";
import AllContentSection from "./_page/AllContentSection";
import Container from "@mui/material/Container";
import { APP_NAME } from "@/app/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} | Reviews`,
  description: "Visualize and manage your reviews",
};

export default function Page() {
  return (
    <Container
      component={"main"}
      sx={{
        alignItems: "center",
        py: 3,
        pb: 5,
      }}
    >
      <RatedContentSection />
      <AllContentSection />
    </Container>
  );
}
