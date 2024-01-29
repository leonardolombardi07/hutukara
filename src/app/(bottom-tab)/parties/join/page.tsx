"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function goBack() {
    router.push("/parties");
  }

  function onFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const pin = String(formData.get("pin"));
    // onClose();
  }

  return <h1>Join page</h1>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} timeout={600} />;
});
