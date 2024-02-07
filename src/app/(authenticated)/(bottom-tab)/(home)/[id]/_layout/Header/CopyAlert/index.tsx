import * as React from "react";
import Alert, { AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CopyToClipboardButton from "./CopyToClipboardButton";

interface CopyAlertProps {
  valueToCopy: string;
  title: string;
  subtitle: string;
  sx?: AlertProps["sx"];
}

export default function CopyAlert({
  valueToCopy,
  title,
  subtitle,
  sx,
}: CopyAlertProps) {
  return (
    <Alert
      severity="info"
      sx={{
        minWidth: 300,
        alignItems: "center",
        ...sx,
      }}
      action={
        <CopyToClipboardButton value={valueToCopy}>Copy</CopyToClipboardButton>
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {subtitle}
    </Alert>
  );
}
