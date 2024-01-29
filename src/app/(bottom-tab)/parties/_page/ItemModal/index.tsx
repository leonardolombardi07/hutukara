"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryState } from "nuqs";
import { Item } from "../../types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Members from "./Members";
import Hosts from "./Hosts";
import Divider from "@mui/material/Divider";
import PinInfo from "../PinInfo";
import Box from "@mui/material/Box";

interface ItemModalProps {
  data: Item[];
}

export default function ItemModal({ data }: ItemModalProps) {
  const [id, setId] = useQueryState("id", {
    history: "push",
  });

  function close() {
    setId("");
  }

  const item = data.find((item) => item.id === id);

  if (id && !item) {
    // TODO: this should be impossible...
    // But we should handle it anyway, maybe with an error boundary
    throw new Error("Item not found");
  }

  return (
    <Dialog
      fullScreen
      open={Boolean(item)}
      TransitionComponent={Transition}
      onClose={close}
    >
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
        sx={{
          py: 4,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <PinInfo pin={item?.pin} />
          <Divider />
        </Box>

        <Hosts data={item?.hosts || []} />
        <Members data={item?.members || []} />
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
