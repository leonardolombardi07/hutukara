import React from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignOutButton from "./SignOutButton";
import RequestChangePasswordButton from "./RequestChangePasswordButton";
import Skeleton from "@mui/material/Skeleton";

interface HeaderProps {
  displayName: string | undefined;
  email: string | null | undefined;
  photoURL: string | undefined;
}

export default function Header({ displayName, email, photoURL }: HeaderProps) {
  return (
    <Paper>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Avatar
              src={photoURL || undefined}
              sx={{ bgcolor: "primary", width: 60, height: 60 }}
            >
              {displayName ? displayName[0].toUpperCase() : "C"}
            </Avatar>

            <Box sx={{ mr: 2 }} />

            <Box>
              <Typography variant="h5" component="div">
                {displayName}
              </Typography>

              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
              >
                {email}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <HeaderCardActions />
      </Card>
    </Paper>
  );
}

export function HeaderSkeleton() {
  return (
    <Paper
      sx={{
        height: 150,
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width={80}
              height={80}
            />

            <Box sx={{ mr: 2 }} />

            <Box>
              <Skeleton width="70%" animation="wave" variant="text" />

              <Skeleton animation="wave" variant="text" width={250} />
            </Box>
          </Box>
        </CardContent>

        <HeaderCardActions />
      </Card>
    </Paper>
  );
}

function HeaderCardActions() {
  return (
    <CardActions>
      <RequestChangePasswordButton />
      <SignOutButton />
    </CardActions>
  );
}
