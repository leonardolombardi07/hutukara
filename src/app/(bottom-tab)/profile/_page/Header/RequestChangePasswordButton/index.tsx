"use client";

import React from "react";
import Button from "@mui/material/Button";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import ChangePasswordIcon from "@mui/icons-material/Lock";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface RequestChangePasswordButtonProps {
  email: string;
}

export default function RequestChangePasswordButton({
  email,
}: RequestChangePasswordButtonProps) {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);
  const [confirmError, setConfirmError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function onConfirm() {
    setConfirmError(null);
    setIsLoadingConfirm(true);

    const { error } = await sendSetPasswordEmail(email);
    setIsLoadingConfirm(false);

    if (error) return setConfirmError(error);

    setIsConfirming(false);
    setSuccess(true);
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setIsConfirming(true);
        }}
        size="small"
        startIcon={<ChangePasswordIcon />}
      >
        Change password
      </Button>

      <ConfirmDialog
        open={isConfirming}
        onClose={() => setIsConfirming(false)}
        onConfirm={onConfirm}
        title="Do you want to change your password?"
        description="You will receive an e-mail in your inbox with a link to change your password. Remember to check your spam box."
        confirmText={isLoadingConfirm ? "Loading..." : "Send e-mail"}
        cancelText="Cancel"
        error={confirmError}
      />

      <Snackbar
        open={success}
        autoHideDuration={10000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          E-mail enviado com sucesso!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

async function sendSetPasswordEmail(email: string) {
  alert("Not yet implemented.");
  return { error: null };
}
