"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MUILink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { sendPasswordResetEmail } from "@/modules/api/client";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Copyright from "../_components/Copyright";

function useForm() {
  const emailRef = React.useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>("");
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    if (!email) return emailRef.current?.focus();

    setIsLoading(true);
    setSubmitError(null);
    setShowSuccessMessage(false);
    try {
      await sendPasswordResetEmail(email);
      setShowSuccessMessage(true);
    } catch (error: any) {
      emailRef.current?.focus();

      if (error.code === "auth/invalid-email") {
        setSubmitError("Invalid email");
      } else {
        setSubmitError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    refs: {
      emailRef,
    },
    isLoading,
    submitError,
    showSuccessMessage,
    onSubmit,
  };
}

const SUBMIT_BUTTON_TEXT = "Send reset email";

export default function Page() {
  const {
    refs: { emailRef },
    isLoading,
    submitError,
    showSuccessMessage,
    onSubmit,
  } = useForm();

  return (
    <React.Fragment>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <UserOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Forgot your password?
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ mt: 1, width: "100%", px: 5 }}
      >
        <Alert
          severity="info"
          sx={{
            width: "100%",
            mt: 2,
          }}
        >
          <AlertTitle>Reset your password</AlertTitle>
          To reset your password, enter your email below and click on{" "}
          <strong>{`"${SUBMIT_BUTTON_TEXT}"`}.</strong> You will receive an
          email with instructions to reset your password.
        </Alert>

        <TextField
          inputRef={emailRef}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          {isLoading ? (
            <CircularProgress
              size={24}
              sx={{
                color: (t) => t.palette.getContrastText(t.palette.primary.main),
              }}
            />
          ) : (
            SUBMIT_BUTTON_TEXT
          )}
        </Button>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item>
            <MUILink component={Link} href="/signin" variant="body2">
              {"Go back to sign in"}
            </MUILink>
          </Grid>

          {showSuccessMessage && (
            <Alert
              severity="success"
              sx={{
                width: "100%",
                mt: 2,
              }}
            >
              <AlertTitle>Success</AlertTitle>
              An email has been sent to you with instructions to reset your
              password.
            </Alert>
          )}

          {submitError && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                mt: 2,
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {submitError}
            </Alert>
          )}
        </Grid>

        <Copyright sx={{ mt: 5 }} />
      </Box>
    </React.Fragment>
  );
}
