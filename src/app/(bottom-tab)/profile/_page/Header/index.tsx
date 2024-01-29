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

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export default function Header({ user }: HeaderProps) {
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
              src={user?.avatarUrl || undefined}
              sx={{ bgcolor: "primary", width: 60, height: 60 }}
            >
              {user?.name ? user?.name[0].toUpperCase() : "C"}
            </Avatar>

            <Box sx={{ mr: 2 }} />

            <Box>
              <Typography variant="h5" component="div">
                {user?.name || user?.email || "-"}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          <RequestChangePasswordButton email={user?.email} />

          <SignOutButton />
        </CardActions>
      </Card>
    </Paper>
  );
}
