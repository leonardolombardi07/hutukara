"use client";

import Chip, { ChipProps } from "@mui/material/Chip";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { changeMemberRole } from "@/modules/api/client/groups/members";
import { useUser } from "@/app/_layout/UserProvider";

const ITEM_HEIGHT = 48;

type Role = "owner" | "host" | "member";

const OPTIONS: Role[] = ["host", "member"] as const;

interface RoleProps {
  memberRole: Role;
  memberUid: string;
  groupId: string;
  userRole: Role;
}

export default function Role({
  userRole,
  memberRole,
  memberUid,
  groupId,
}: RoleProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function openMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function onMenuItemClick(selectedRole: Role) {
    if (selectedRole === memberRole) {
      return closeMenu();
    }

    if (selectedRole === "owner") {
      alert("You can't make someone the owner here");
      return;
    }

    if (memberRole === "owner") {
      alert("You can't change the owner's role");
      return;
    }

    changeMemberRole(memberUid, {
      groupId,
      oldRole: memberRole,
      newRole: selectedRole,
    });
    closeMenu();
  }

  function undefinedIfOwner(fn: (...args: any[]) => void) {
    return memberRole === "owner" ? undefined : fn;
  }

  return (
    <React.Fragment>
      {userRole === "member" ? (
        <BaseRoleChip memberRole={memberRole} memberUid={memberUid} />
      ) : (
        <BaseRoleChip
          memberRole={memberRole}
          memberUid={memberUid}
          deleteIcon={memberRole === "owner" ? undefined : <MoreVertIcon />}
          onClick={undefinedIfOwner(openMenu)}
          onDelete={undefinedIfOwner(openMenu)}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {OPTIONS.map((option) => (
          <MenuItem
            key={option}
            selected={memberRole === option}
            onClick={() => onMenuItemClick(option)}
          >
            {mapRoleToLabel(option)}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

function BaseRoleChip(
  props: ChipProps & {
    memberRole: Role;
    memberUid: string;
  }
) {
  const { user } = useUser();
  const { memberRole, memberUid, ...rest } = props;

  return (
    <Chip
      size="medium"
      disabled={memberUid === user.uid}
      label={mapRoleToLabel(memberRole)}
      variant={mapRoleToVariant(memberRole)}
      color={mapRoleToColor(memberRole)}
      {...rest}
    />
  );
}

function mapRoleToLabel(value: Role) {
  switch (value) {
    case "owner":
      return "Owner";
    case "host":
      return "Host";
    case "member":
      return "Member";
  }
}

function mapRoleToVariant(value: Role) {
  switch (value) {
    case "owner":
      return "filled";
    case "host":
      return "outlined";
    case "member":
      return "outlined";
  }
}

function mapRoleToColor(value: Role) {
  switch (value) {
    case "owner":
      return "primary";
    case "host":
      return "default";
    case "member":
      return "default";
  }
}
