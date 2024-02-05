"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GROUP_TITLE } from "@/app/constants";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import { useParams, useRouter } from "next/navigation";
import { deleteGroup, useGroup } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";

export default function OwnerActions() {
  const params = useParams();
  if (typeof params.id !== "string") {
    // This should never happen
    throw new Error(`Invalid group ID: ${params.id}`);
  }

  const { user } = useUser();
  const [group, isLoading, error] = useGroup(params.id);
  const router = useRouter();
  const { anchorEl, openMenu, closeMenu } = useMenu();
  const { isOpen, openModal, closeModal } = useModal();

  if (isLoading || error) {
    return null;
  }

  if (!group) {
    return null;
  }

  const userRole =
    group.ownerId === user.uid
      ? "owner"
      : group.hostIds.includes(user.uid)
      ? "host"
      : "member";

  if (userRole !== "owner") {
    return null;
  }

  async function onDelete() {
    if (typeof params.id !== "string") {
      // This should never happen
      return alert(`Invalid group ID: ${params.id}`);
    }

    try {
      await deleteGroup(params.id);
      router.replace("/");
      closeModal();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div>
      <IconButton size="large" onClick={openMenu} color="inherit">
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() => {
            closeMenu();
            openModal();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Delete {GROUP_TITLE}</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        title={`Delete ${GROUP_TITLE}`}
        description="Are you sure you want to delete this group?"
        open={isOpen}
        onConfirm={onDelete}
        onClose={closeModal}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return { isOpen, openModal, closeModal };
}

function useMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function openMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return { anchorEl, openMenu, closeMenu };
}
