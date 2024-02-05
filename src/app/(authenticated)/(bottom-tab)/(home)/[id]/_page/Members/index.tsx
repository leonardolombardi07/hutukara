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
import ListItemButton from "@mui/material/ListItemButton";
import Role from "./Role";
import { useUser } from "@/app/_layout/UserProvider";
import Link from "next/link";

interface MembersProps {
  id: string;
}

export default function Members({ id }: MembersProps) {
  const { user } = useUser();
  const [group, isLoadingGroup, loadGroupError] = useGroup(id);

  const userIds = group
    ? [group.ownerId, ...group.hostIds, ...group.memberIds]
    : [];

  // TODO: add skeleton loader and error handling
  const [data = [], isLoadingUsers, loadUsersError] = useUsers(userIds);

  const isLoading = isLoadingGroup || isLoadingUsers;
  const error = loadGroupError || loadUsersError;

  if (isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (error || !group) {
    return (
      <Paper>
        <Typography variant="body1" color="textSecondary">
          No members... yet!
        </Typography>
      </Paper>
    );
  }

  const userRole =
    group.ownerId === user.uid
      ? "owner"
      : group.hostIds.includes(user.uid)
      ? "host"
      : "member";

  return (
    <Paper>
      <List disablePadding>
        {data.map((item) => {
          const role =
            item.id === group.ownerId
              ? "owner"
              : group.hostIds.includes(item.id)
              ? "host"
              : "member";
          return (
            <MemberListItem
              userRole={userRole}
              key={item.id}
              groupId={id}
              role={role}
              {...item}
            />
          );
        })}
      </List>
    </Paper>
  );
}

function MemberListItem(props: {
  groupId: string;
  name: string;
  photoURL: string;
  role: "owner" | "host" | "member";
  id: string;
  userRole: "owner" | "host" | "member";
}) {
  const { groupId, userRole, name, photoURL, role, id } = props;

  return (
    <React.Fragment>
      <ListItem
        disablePadding
        secondaryAction={
          <Role
            userRole={userRole}
            memberUid={id}
            memberRole={role}
            groupId={groupId}
          />
        }
      >
        <ListItemButton
          component={Link}
          href={`/user/${id}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <ListItemAvatar>
            <Avatar alt={`Avatar of ${name}`} src={photoURL} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>

      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}
