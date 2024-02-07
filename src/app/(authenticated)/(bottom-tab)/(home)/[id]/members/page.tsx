"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useUsers } from "@/modules/api/client";
import ListItemButton from "@mui/material/ListItemButton";
import Role from "./_page/Role";
import { useUser } from "@/app/_layout/UserProvider";
import Link from "next/link";
import { useLayoutContext } from "../_layout/LayoutProvider";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useDelay from "@/modules/hooks/useDelay";
import Image from "next/image";

export default function Page() {
  const { user } = useUser();
  const [group] = useLayoutContext();

  const userIds = group
    ? [group.ownerId, ...group.hostIds, ...group.memberIds]
    : [];

  const [data = [], isLoading, error] = useUsers(userIds);
  const delayedIsLoading = useDelay(isLoading);

  if (delayedIsLoading) {
    return <ListOfSkeletonItems numOfItems={5} />;
  }

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.message}
      </Alert>
    );
  }

  if (data.length === 0) {
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
            groupId={group.id}
            role={role}
            {...item}
          />
        );
      })}
    </List>
  );
}

const SHARED_LIST_ITEM_PROPS: ListItemProps = {
  disablePadding: true,
  sx: {
    px: 1,
  },
};

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
        secondaryAction={
          <Role
            userRole={userRole}
            memberUid={id}
            memberRole={role}
            groupId={groupId}
          />
        }
        {...SHARED_LIST_ITEM_PROPS}
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
            <Avatar
              sx={{
                position: "relative",
              }}
              alt={`Avatar of ${name}`}
            >
              {photoURL ? (
                <Image
                  src={photoURL}
                  alt={`Avatar of ${name}`}
                  fill
                  sizes="65px"
                />
              ) : (
                name[0] || ""
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>

      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

function MemberListItemSkeleton() {
  return (
    <React.Fragment>
      <ListItem {...SHARED_LIST_ITEM_PROPS}>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton variant="text" width={100} />
        </ListItemText>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

function ListOfSkeletonItems({ numOfItems }: { numOfItems: number }) {
  return (
    <List>
      {Array.from({ length: numOfItems }).map((_, index) => (
        <MemberListItemSkeleton key={index} />
      ))}
    </List>
  );
}
