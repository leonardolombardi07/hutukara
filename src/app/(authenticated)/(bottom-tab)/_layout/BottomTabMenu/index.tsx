"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StarRateIcon from "@mui/icons-material/StarRate";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { usePathname } from "next/navigation";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";

const PATHNAME = {
  HOME: "",
  PROFILE: "profile",
  RATED: "rated",
  SEARCH: "search",
} as const;

export default function BottomTabMenu({
  sx,
}: {
  sx?: React.ComponentProps<typeof Paper>["sx"];
}) {
  const pathname = usePathname();

  const value = pathname.includes(PATHNAME.RATED)
    ? PATHNAME.RATED
    : pathname.includes(PATHNAME.PROFILE)
    ? PATHNAME.PROFILE
    : pathname.includes(PATHNAME.SEARCH)
    ? PATHNAME.SEARCH
    : pathname === "/"
    ? PATHNAME.HOME
    : null;

  return (
    <Paper sx={sx}>
      <Divider />
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          LinkComponent={Link}
          href={`/${PATHNAME.HOME}`}
          value={PATHNAME.HOME}
        />

        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          LinkComponent={Link}
          href={PATHNAME.SEARCH}
          value={PATHNAME.SEARCH}
        />

        <BottomNavigationAction
          label="Rated"
          icon={<StarRateIcon />}
          LinkComponent={Link}
          href={PATHNAME.RATED}
          value={PATHNAME.RATED}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<ProfileIcon />}
          LinkComponent={Link}
          href={PATHNAME.PROFILE}
          value={PATHNAME.PROFILE}
        />
      </BottomNavigation>
    </Paper>
  );
}
