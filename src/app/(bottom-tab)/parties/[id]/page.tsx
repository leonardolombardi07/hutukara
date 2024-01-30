"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Item } from "./types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Members from "./Members";
import Header from "./Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Summary from "./Summary";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { FAKE_DATA } from "@/app/(bottom-tab)/parties/data";

interface PageProps {
  params: {
    id?: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  if (!params.id) {
    throw new Error("No id");
  }

  function close() {
    router.back();
  }

  const item = FAKE_DATA.find((item) => item.id === params.id);

  return (
    <Dialog fullScreen open TransitionComponent={Transition} onClose={close}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={close}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {item?.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        sx={{
          height: "100%",
          pt: {
            xs: 0,
            sm: 3,
          },
        }}
      >
        <TopTabs item={item} />
      </Container>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} timeout={600} />;
});

function TopTabs({ item }: { item: Item | undefined }) {
  const [value, setValue] = React.useState(0);

  function onChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  return (
    <Paper
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Header item={item} />

      <Tabs value={value} onChange={onChange}>
        <Tab value={0} label="Summary" />
        <Tab value={1} label="Members" />
      </Tabs>

      {value === 0 && <Summary data={item?.results || []} />}
      {value === 1 && (
        <Members
          data={[...(item?.members || []), ...(item?.host ? [item.host] : [])]}
        />
      )}
    </Paper>
  );
}
