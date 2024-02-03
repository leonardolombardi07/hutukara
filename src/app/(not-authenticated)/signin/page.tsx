"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MUILink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import GoogleButton from "@/components/elements/GoogleButton";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Copyright from "../_components/Copyright";
import Backdrop from "@mui/material/Backdrop";
import { useContinueWithProvider } from "../_hooks";
import { useSignInWithForm } from "./_page/hooks";
import PasswordTextField from "@/components/inputs/PasswordTextField";

export default function Page() {
  const {
    refs: { emailRef, passwordRef },
    isLoading,
    submitError,
    onSubmit,
  } = useSignInWithForm();

  const {
    isLoading: isContinuingWithProvider,
    error: continueWithProviderError,
    continueWithProvider,
  } = useContinueWithProvider();

  const error = submitError || continueWithProviderError;

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isContinuingWithProvider}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ mt: 1, width: "100%", px: 5 }}
      >
        <TextField
          inputRef={emailRef}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              passwordRef.current?.focus();
            }
          }}
        />

        <PasswordTextField
          inputRef={passwordRef}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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
            "Sign In"
          )}
        </Button>

        <Grid container>
          <Grid item xs>
            <MUILink component={Link} href="/forgot-password" variant="body2">
              Forgot your password?
            </MUILink>
          </Grid>

          <Grid item>
            <MUILink component={Link} href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </MUILink>
          </Grid>
          {error && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                mt: 2,
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
        </Grid>

        <Divider sx={{ my: 4 }}>OR</Divider>

        <GoogleButton
          onClick={() => continueWithProvider("google")}
          label="Continue with Google"
          style={{
            width: "100%",
          }}
        />

        <Copyright sx={{ mt: 5 }} />
      </Box>
    </React.Fragment>
  );
}
