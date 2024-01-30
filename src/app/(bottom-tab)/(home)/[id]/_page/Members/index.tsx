import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

interface Item {
  id: string;
  name: string;
  avatarUrl: string;
}

interface MembersProps {
  data: Item[];
}

export default function Members({ data }: MembersProps) {
  return (
    <Paper>
      {data.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No guests... yet!
        </Typography>
      )}

      <List disablePadding>
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={`Avatar of ${item.name}`} src={item.avatarUrl} />
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
