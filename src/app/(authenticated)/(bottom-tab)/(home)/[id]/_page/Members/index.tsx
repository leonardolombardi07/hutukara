import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useGroup, useUsers } from "@/modules/api/client";

interface MembersProps {
  id: string;
}

export default function Members({ id }: MembersProps) {
  const [item, isLoadingItem, itemError] = useGroup(id);

  const userIds = item
    ? [item.ownerId, ...item.hostIds, ...item.memberIds]
    : [];

  // TODO: add skeleton loader and error handling
  const [data = [], isLoadingUsers, loadUsersError] = useUsers(userIds);

  const isLoading = isLoadingItem || isLoadingUsers;
  const error = itemError || loadUsersError;

  if (isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (error || !item) {
    return (
      <Paper>
        <Typography variant="body1" color="textSecondary">
          No members... yet!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <List disablePadding>
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={`Avatar of ${item.name}`} src={item.photoURL} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
}
