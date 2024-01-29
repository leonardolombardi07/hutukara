"use client";

import React from "react";
import { Item } from "../../../types";
import Typography from "@mui/material/Typography";
import Section from "../Section";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

interface MembersProps {
  data: Item["members"];
}

export default function Members({ data }: MembersProps) {
  return (
    <Section title="Members">
      {data.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No members... yet!
        </Typography>
      )}

      <List disablePadding>
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar of ${item.name}`}
                      src={item.avatarUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Section>
  );
}
