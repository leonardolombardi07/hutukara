"use client";

import React from "react";
import Button from "@mui/material/Button";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import SignOutIcon from "@mui/icons-material/Logout";
import { signOut } from "@/modules/api/client";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = React.useState(false);

  async function onConfirm() {
    await signOut();
    setIsConfirming(false);
    router.push("/signin");
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
