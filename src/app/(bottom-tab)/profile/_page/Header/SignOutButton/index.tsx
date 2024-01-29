"use client";

import React from "react";
import Button from "@mui/material/Button";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import SignOutIcon from "@mui/icons-material/Logout";

function SignOutButton() {
  const [isConfirming, setIsConfirming] = React.useState(false);

  function onConfirm() {
    alert("Not yet implemented.");
    setIsConfirming(false);
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setIsConfirming(true);
        }}
        size={"small"}
        startIcon={<SignOutIcon />}
        sx={{ ml: 1 }}
      >
        Sign out
      </Button>

      <ConfirmDialog
        open={isConfirming}
        onClose={() => setIsConfirming(false)}
        onConfirm={onConfirm}
        title="Do you want to sign out?"
        // description="Você será redirecionado para a página de login."
        description="You will be redirected to the login page."
        confirmText="Sign out"
        cancelText="Cancel"
      />
    </React.Fragment>
  );
}

export default SignOutButton;
